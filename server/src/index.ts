import Fastify, { FastifyRequest, FastifyReply } from 'fastify';
import fastifyjwt from '@fastify/jwt';
import fastifycors from '@fastify/cors';
import fastifymultipart from '@fastify/multipart';
import fastifystatic from '@fastify/static';
import { PrismaClient } from '@prisma/client';
import path from 'path';
import fs from 'fs';
import { pipeline } from 'stream/promises';

const prisma = new PrismaClient();
const app = Fastify({ logger: true });

app.register(fastifycors, { origin: true });
app.register(fastifymultipart);

const UPLOADS_DIR = path.join(__dirname, '../../client/public');
app.register(fastifystatic, {
  root: UPLOADS_DIR,
  prefix: '/public/',
});

// Serve the built frontend (production) - falls back to public for dev
const DIST_DIR = path.join(__dirname, '../../client/dist');
if (fs.existsSync(DIST_DIR)) {
  app.register(fastifystatic, {
    root: DIST_DIR,
    prefix: '/',
  });
}

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-in-production';
app.register(fastifyjwt, { secret: JWT_SECRET as string });

// Simple auth check decorator
declare module '@fastify/jwt' {
  export interface Fastifyjwt {
    jwtVerify(request: FastifyRequest, reply?: FastifyReply): Promise<{ parentId: string; iat: number; exp: number }>;
    jwtSign(payload: object): string;
  }
  export interface FastifyRequest {
    parentId?: string;
  }
}

app.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) throw new Error('No token');
    await request.jwtVerify();
  } catch (err) {
    reply.status(401).send({ error: 'Unauthorized' });
  }
});

// Root
app.get('/', async (request, reply) => {
  return { message: 'BabyBillion Learning API v1.0' };
});

// Health check
app.get('/health', async () => ({ status: 'healthy' }));

// ==================== AUTH ====================
app.post('/api/register', async (request, reply) => {
  const { email, name, password, pin } = request.body as {
    email: string;
    name: string;
    password: string;
    pin: string;
  };

  const existing = await prisma.parent.findUnique({ where: { email } });
  if (existing) return reply.status(409).send({ error: 'Email already registered' });

  const bcrypt = await import('bcrypt');
  const passwordHash = await bcrypt.hash(password, 10);
  const pinHash = await bcrypt.hash(pin, 10);

  const parent = await prisma.parent.create({
    data: { email, name, passwordHash, pinHash },
  });

  return { id: parent.id, email: parent.email, name: parent.name };
});

app.post('/api/login', async (request, reply) => {
  const { email, password } = request.body as { email: string; password: string };
  const bcrypt = await import('bcrypt');

  const parent = await prisma.parent.findUnique({ where: { email } });
  if (!parent) return reply.status(401).send({ error: 'Invalid credentials' });

  const valid = await bcrypt.compare(password, parent.passwordHash);
  if (!valid) return reply.status(401).send({ error: 'Invalid credentials' });

  const token = app.jwt.sign({ parentId: parent.id });
  return { token };
});

// ==================== PROFILES ====================
app.post('/api/profiles', { preValidation: app.authenticate }, async (request, reply) => {
  const { nickname, ageGroup, language, avatar, dailyScreenTimeMinutes } = request.body as {
    nickname: string;
    ageGroup: '0-3' | '3-6' | '6-9';
    language: 'en' | 'hi';
    avatar: string;
    dailyScreenTimeMinutes: number;
  };

  const child = await prisma.childProfile.create({
    data: {
      parentId: (request as any).user.parentId,
      nickname,
      ageGroup,
      language,
      avatar,
      dailyScreenTimeMinutes,
    },
  });

  return child;
});

app.get('/api/profiles', { preValidation: app.authenticate }, async (request, reply) => {
  const children = await prisma.childProfile.findMany({
    where: { parentId: (request as any).user.parentId },
  });
  return children;
});

// ==================== CATEGORIES ====================
app.get('/api/categories', async () => {
  return prisma.category.findMany({ orderBy: { order: 'asc' } });
});

// ==================== VIDEOS ====================
app.get('/api/videos/:categorySlug', async (request, reply) => {
  const { categorySlug } = request.params as { categorySlug: string };
  const videos = await prisma.videoLesson.findMany({
    where: { category: { slug: categorySlug } },
    orderBy: { title: 'asc' },
  });
  return videos;
});

// ==================== ADMIN UPLOAD ====================
app.post('/api/admin/upload', async (request, reply) => {
  const parts = request.parts();
  let title = '';
  let description = '';
  let categoryId = '';
  let ageGroup = '3-6';
  let isPremium = false;
  let videoPath = '';
  let thumbPath = '';

  for await (const part of parts) {
    if (part.type === 'file') {
      const fileName = `${Date.now()}-${part.filename}`;
      const folder = part.fieldname === 'video' ? 'videos' : 'thumbnails';
      const savePath = path.join(UPLOADS_DIR, folder, fileName);
      
      if (!fs.existsSync(path.join(UPLOADS_DIR, folder))) {
        fs.mkdirSync(path.join(UPLOADS_DIR, folder), { recursive: true });
      }

      await pipeline(part.file, fs.createWriteStream(savePath));
      
      if (part.fieldname === 'video') videoPath = `/${folder}/${fileName}`;
      if (part.fieldname === 'thumbnail') thumbPath = `/${folder}/${fileName}`;
    } else {
      if (part.fieldname === 'title') title = part.value as string;
      if (part.fieldname === 'description') description = part.value as string;
      if (part.fieldname === 'categoryId') categoryId = part.value as string;
      if (part.fieldname === 'ageGroup') ageGroup = part.value as string;
      if (part.fieldname === 'isPremium') isPremium = part.value === 'true';
    }
  }

  if (!videoPath || !title || !categoryId) {
    return reply.status(400).send({ error: 'Missing required fields' });
  }

  const video = await prisma.videoLesson.create({
    data: {
      title,
      description,
      categoryId,
      ageGroup,
      isPremium,
      videoUrl: videoPath,
      thumbnailUrl: thumbPath || '/thumbnails/default.jpg',
    }
  });

  return video;
});

// SPA fallback: serve index.html for any non-API, non-static route
app.setNotFoundHandler((request, reply) => {
  if (fs.existsSync(DIST_DIR) && !request.url.startsWith('/api') && !request.url.startsWith('/public')) {
    return reply.type('text/html').sendFile('index.html', { root: DIST_DIR });
  }
  reply.status(404).send({ error: 'Not found' });
});

// ==================== GAMES ====================
const GAME_DATA = [
  { slug: 'match-pair', title: 'Match the Pair', description: 'Find matching images', category: 'memory', minAge: 3, maxAge: 8, thumbnailUrl: '/avatars/game-1.png' },
  { slug: 'alphabet-tracing', title: 'Alphabet Tracing', description: 'Trace letters with touch', category: 'writing', minAge: 3, maxAge: 6, thumbnailUrl: '/avatars/game-2.png' },
  { slug: 'number-tracing', title: 'Number Tracing', description: 'Trace numbers', category: 'writing', minAge: 3, maxAge: 6, thumbnailUrl: '/avatars/game-3.png' },
  { slug: 'burst-balloons', title: 'Burst the Balloon', description: 'Pop the correct answer balloons', category: 'quick-thinking', minAge: 4, maxAge: 8, thumbnailUrl: '/avatars/game-4.png' },
  { slug: 'egg-surprise', title: 'Egg Surprise', description: 'Count the eggs', category: 'counting', minAge: 2, maxAge: 5, thumbnailUrl: '/avatars/game-5.png' },
  { slug: 'connect-dots', title: 'Connect the Dots', description: 'Connect numbered dots to reveal an image', category: 'drawing', minAge: 3, maxAge: 7, thumbnailUrl: '/avatars/game-6.png' },
  { slug: 'missing-number', title: 'Identify the Missing Number', description: 'Pick the missing number from options', category: 'math', minAge: 4, maxAge: 8, thumbnailUrl: '/avatars/game-7.png' },
  { slug: 'color-matching', title: 'Color Matching', description: 'Match colors to objects', category: 'colors', minAge: 2, maxAge: 5, thumbnailUrl: '/avatars/game-8.png' },
  { slug: 'number-counting', title: 'Number Counting', description: 'Count objects and select the right number', category: 'counting', minAge: 2, maxAge: 6, thumbnailUrl: '/avatars/game-9.png' },
  { slug: 'memory-matching', title: 'Basic Memory Matching', description: 'Classic memory card flip game', category: 'memory', minAge: 3, maxAge: 8, thumbnailUrl: '/avatars/game-10.png' },
];

app.get('/api/games', async () => GAME_DATA);

// ... remaining endpoints

// Run server
const PORT = process.env.PORT || 3001;
app.listen({ port: Number(PORT), host: '0.0.0.0' }).then(() => {
  console.log(`Server running on http://localhost:${PORT}`);
});