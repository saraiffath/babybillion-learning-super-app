# Development Guide

## Prerequisites

1. **Node.js**: v18 or higher
2. **pnpm**: `npm install -g pnpm`

## Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd baby-billion-learning-app
```

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Configure Environment
Create `.env` in the `server` directory:
```bash
JWT_SECRET=development-secret-key
DATABASE_URL="file:./dev.db"
PORT=3001
```

### 4. Setup Database
```bash
cd server
npx prisma generate
npx prisma db push
```

### 5. Seed Sample Data
```bash
pnpm db:seed
```

This creates:
- Parent account: `parent@example.com` / `parent123` (PIN: `1234`)
- 2+ child profiles
- Sample categories and videos
- Subscription plans

## Development Servers

### Start Both Servers
```bash
# Terminal 1: Backend API
pnpm dev:server

# Terminal 2: Frontend PWA
pnpm dev:client
```

### Access
- Frontend: http://localhost:5173
- API: http://localhost:3001
- API Docs: http://localhost:3001

## Project Structure

```
baby-billion-learning-app/
├── client/                  # React frontend
│   ├── src/
│   │   ├── pages/          # Main screens
│   │   │   ├── SplashScreen.tsx      # Splash screen
│   │   │   ├── WelcomeScreen.tsx     # Onboarding welcome
│   │   │   ├── LoginScreen.tsx       # Auth login
│   │   │   ├── RegisterScreen.tsx  # Parent registration
│   │   │   ├── ProfileSelection.tsx # Child profile picker
│   │   │   ├── CreateProfile.tsx   # Profile creation
│   │   │   ├── kids/               # Children's learning features
│   │   │   │   ├── KidsHome.tsx
│   │   │   │   ├── CategoryList.tsx
│   │   │   │   ├── VideoPlayer.tsx
│   │   │   │   ├── GameDashboard.tsx
│   │   │   │   └── games/
│   │   │   │       ├── MatchPairGame.tsx
│   │   │   │       ├── AlphabetTracingGame.tsx
│   │   │   │       ├── NumberTracingGame.tsx
│   │   │   │       ├── BurstBalloonsGame.tsx
│   │   │   │       ├── NumberCountingGame.tsx
│   │   │   │       ├── ColorMatchingGame.tsx
│   │   │   │       ├── ConnectTheDotsGame.tsx
│   │   │   │       ├── EggSurpriseGame.tsx
│   │   │   │       └── MissingNumberGame.tsx
│   │   │   └── parent/               # Parent dashboard
│   │   │       ├── ParentDashboard.tsx
│   │   │       ├── SettingsScreen.tsx
│   │   │       └── SubscriptionScreen.tsx
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── index.html
│   ├── vite.config.ts
│   └── tailwind.css
├── server/                  # Fastify backend
│   ├── src/
│   │   ├── index.ts         # API routes and server
│   │   └── seed.ts          # Seed data
│   ├── prisma/
│   │   └── schema.prisma    # Database schema
│   └── package.json
└── shared/                  # Shared types
    └── src/index.ts
```

## Available Scripts

### Monorepo Root
```bash
pnpm install        # Install dependencies
pnpm dev:server     # Start API server
pnpm dev:client     # Start frontend dev server
pnpm build:server   # Build backend
pnpm build:client   # Build frontend
pnpm db:migrate     # Run migrations
pnpm db:seed        # Seed database
```

### Client
```bash
pnpm dev            # Start Vite dev server
pnpm build          # Production build
pnpm preview        # Preview production build
```

### Server
```bash
pnpm dev            # Start with tsx watch
pnpm build          # TypeScript compilation
pnpm start          # Run compiled JS
pnpm db:push        # Push schema to database
pnpm db:generate    # Generate Prisma client
```

## Testing

### Health Checks
```bash
# API health check
curl http://localhost:3001/health

# Categories endpoint
curl http://localhost:3001/api/categories
```

### Login Test
```bash
curl -X POST http://localhost:3001/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"parent@example.com","password":"parent123"}'
```

## Building for Production

```bash
# Build frontend
pnpm build:client

# Build backend
pnpm build:server

# Output directories:
# client/dist/ - Static files for deployment
# server/dist/ - Compiled API server
```

## Deployment

### Frontend (Vite Static Build)
Deploy `client/dist/` to any static hosting:
- Netlify
- Vercel
- Firebase Hosting
- AWS S3 + CloudFront

### Backend
Deploy as a Node.js server:
```bash
cd server
pnpm build
pnpm start
```

### Docker (Recommended for Production)
```bash
# Create Dockerfile and docker-compose.yml
docker build -t baby-billion-server ./server
docker build -t baby-billion-client ./client
```

## Troubleshooting

### Port Already in Use
```bash
# Change port in .env
PORT=3002
```

### Database Issues
```bash
# Reset SQLite
rm server/dev.db
cd server
npx prisma db push
pnpm db:seed
```

### CORS Errors
Ensure `fastifycors` is configured:
```javascript
app.register(fastifycors, { origin: true });
```

### JWT Token Issues
Check JWT_SECRET is consistent:
```bash
echo $JWT_SECRET
```