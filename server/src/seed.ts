import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Create subscription plans
  const monthlyPlan = await prisma.subscriptionPlan.upsert({
    where: { id: 'seed-monthly' },
    update: {},
    create: { id: 'seed-monthly', name: 'Monthly Premium', price: 199, currency: 'INR', durationDays: 30 },
  });

  await prisma.subscriptionPlan.upsert({
    where: { id: 'seed-annual' },
    update: {},
    create: { id: 'seed-annual', name: 'Annual Premium', price: 1999, currency: 'INR', durationDays: 365 },
  });

  // Create categories
  await prisma.category.createMany({
    skipDuplicates: true,
    data: [
      { name: 'English Alphabet', slug: 'alphabet', description: 'ABC, phonics, vocabulary', ageGroup: '0-3', icon: '📘', order: 1 },
      { name: 'Counting Numbers', slug: 'counting', description: 'Numbers, counting, addition, subtraction', ageGroup: '0-3', icon: '🔢', order: 2 },
      { name: 'Hindi Varnamala', slug: 'hindi', description: 'Vowels, consonants, rhymes', ageGroup: '0-3', icon: '📕', order: 3 },
      { name: 'Colors & Shapes', slug: 'colors-shapes', description: 'Colors, shapes, patterns', ageGroup: '0-3', icon: '🎨', order: 4 },
      { name: 'Animal Friends', slug: 'animals', description: 'Animals, birds, insects', ageGroup: '3-6', icon: '🐾', order: 5 },
      { name: 'Vehicles & Transport', slug: 'vehicles', description: 'Cars, planes, boats, trains', ageGroup: '3-6', icon: '🚗', order: 6 },
      { name: 'Fruits & Vegetables', slug: 'food', description: 'Healthy eating, growing food', ageGroup: '3-6', icon: '🥦', order: 7 },
      { name: 'Weather', slug: 'weather', description: 'Sun, rain, wind, seasons', ageGroup: '3-6', icon: '☀️', order: 8 },
      { name: 'Safety Awareness', slug: 'safety', description: 'Good habits, safety rules', ageGroup: '0-3', icon: '🛡️', order: 9 },
      { name: 'Moral Stories', slug: 'stories', description: 'Stories for values and ethics', ageGroup: '3-6', icon: '📖', order: 10 },
      { name: 'Science Basics', slug: 'science', description: 'Simple science experiments', ageGroup: '6-9', icon: '🔬', order: 11 },
      { name: 'Memory Games', slug: 'memory', description: 'Memory matching activities', ageGroup: '3-9', icon: '🧠', order: 12 },
    ],
  });

  // Create sample videos
  const videoTemplates = [
    { categoryId: (await prisma.category.findFirst({ where: { slug: 'alphabet' } }))?.id, title: 'Learn the Letter A', description: 'Watch the letter A come to life!', durationSeconds: 45, ageGroup: '0-3', isPremium: false },
    { categoryId: (await prisma.category.findFirst({ where: { slug: 'alphabet' } }))?.id, title: 'Phonics Sound - A', description: 'Practice the A sound', durationSeconds: 60, ageGroup: '3-6', isPremium: true },
    { categoryId: (await prisma.category.findFirst({ where: { slug: 'counting' } }))?.id, title: 'Counting 1-10', description: 'Count with us!', durationSeconds: 50, ageGroup: '0-3', isPremium: false },
    { categoryId: (await prisma.category.findFirst({ where: { slug: 'counting' } }))?.id, title: 'Addition for Kids', description: 'Simple addition games', durationSeconds: 90, ageGroup: '3-6', isPremium: true },
    { categoryId: (await prisma.category.findFirst({ where: { slug: 'animals' } }))?.id, title: 'Farm Animals Song', description: 'Sing along with farm friends', durationSeconds: 54, ageGroup: '0-3', isPremium: false },
    { categoryId: (await prisma.category.findFirst({ where: { slug: 'animals' } }))?.id, title: 'Jungle Safari Adventure', description: 'Explore the jungle', durationSeconds: 120, ageGroup: '3-6', isPremium: true },
    { categoryId: (await prisma.category.findFirst({ where: { slug: 'weather' } }))?.id, title: 'What is the Weather?', description: 'Learn about sun, rain, and clouds', durationSeconds: 65, ageGroup: '3-6', isPremium: false },
    { categoryId: (await prisma.category.findFirst({ where: { slug: 'safety' } }))?.id, title: 'Looking Both Ways', description: 'Safe crossing teaches', durationSeconds: 48, ageGroup: '0-3', isPremium: false },
  ];

  for (const v of videoTemplates) {
    if (v.categoryId) {
      const id = `seed-video-${v.title.toLowerCase().replace(/\s+/g, '-')}`;
      await prisma.videoLesson.upsert({
        where: { id },
        update: {},
        create: {
          id,
          categoryId: v.categoryId,
          title: v.title,
          description: v.description,
          durationSeconds: v.durationSeconds,
          videoUrl: `/videos/${v.title.toLowerCase().replace(/\s+/g, '-')}.mp4`,
          thumbnailUrl: `/thumbnails/${v.title.toLowerCase().replace(/\s+/g, '-')}.jpg`,
          ageGroup: v.ageGroup,
          isPremium: v.isPremium,
        },
      });
    }
  }

  // Add the 5 Sheru Bhai videos from the Videos folder
  const sheruCategory = await prisma.category.findFirst({ where: { slug: 'stories' } });
  if (sheruCategory) {
    const sheruVideos = [
      { title: 'Sheru Bhai Grand Entry', description: 'Sheru Bhai makes a grand royal entry!', videoUrl: '/videos/sheru-bhai-grand-entry.mp4', durationSeconds: 60, ageGroup: '3-6', isPremium: false },
      { title: 'Sheru Bhai Meets the Principal', description: 'Sheru Bhai arrives at school to meet the principal!', videoUrl: '/videos/sheru-bhai-school-principal.mp4', durationSeconds: 120, ageGroup: '3-6', isPremium: false },
      { title: 'Sheru Bhai Tadpan Tadap', description: 'Sheru Bhai dances and shows off his attitude!', videoUrl: '/videos/sheru-bhai-tadpan-tadap.mp4', durationSeconds: 90, ageGroup: '3-6', isPremium: false },
      { title: 'Sheru Bhai vs CM Vijay', description: 'Sheru Bhai vs CM Vijay - Episode 1', videoUrl: '/videos/sheru-bhai-vs-cm-vijay.mp4', durationSeconds: 150, ageGroup: '6-9', isPremium: false },
      { title: 'Sheru Bhai Buys King Ka TAJ', description: 'Sheru Bhai buys the King Ka TAJ!', videoUrl: '/videos/sheru-bhai-king-taj.mp4', durationSeconds: 100, ageGroup: '3-6', isPremium: false },
    ];
    for (const v of sheruVideos) {
      const id = `seed-video-${v.videoUrl.split('/').pop()}`;
      await prisma.videoLesson.upsert({
        where: { id },
        update: {},
        create: {
          id,
          categoryId: sheruCategory.id,
          title: v.title,
          description: v.description,
          durationSeconds: v.durationSeconds,
          videoUrl: v.videoUrl,
          thumbnailUrl: '/thumbnails/default.jpg',
          ageGroup: v.ageGroup,
          isPremium: v.isPremium,
        },
      });
    }
    console.log(`Seeded ${sheruVideos.length} Sheru Bhai videos`);
  }

  if (process.env.NODE_ENV === 'production') return;

  // Seed parent account with password 'parent123' and PIN '1234'
  const parentPassword = await bcrypt.hash('parent123', 10);
  const parentPin = await bcrypt.hash('1234', 10);

  const parent = await prisma.parent.create({
    data: {
      email: 'parent@example.com',
      name: 'Test Parent',
      passwordHash: parentPassword,
      pinHash: parentPin,
    },
  });

  // Create child profiles
  await prisma.childProfile.createMany({
    data: [
      { parentId: parent.id, nickname: 'Emma', ageGroup: '0-3', language: 'en', avatar: 'bear', dailyScreenTimeMinutes: 30 },
      { parentId: parent.id, nickname: 'Noah', ageGroup: '3-6', language: 'en', avatar: 'lion', dailyScreenTimeMinutes: 60 },
      { parentId: parent.id, nickname: 'Amit', ageGroup: '6-9', language: 'hi', avatar: 'elephant', dailyScreenTimeMinutes: 90 },
    ],
  });

  // Gift subscription to parent
  await prisma.subscription.create({
    data: {
      parentId: parent.id,
      planId: monthlyPlan.id,
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      status: 'active',
    },
  });

  console.log('Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });