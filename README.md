# BabyBillion Kids Learning Super App

A production-oriented, mobile-first educational application for children, built as a Progressive Web App (PWA).

## 📋 Overview

This is an original implementation inspired by the BabyBillion Kids Learning Super App, built with:
- **Frontend**: React + TypeScript + Vite + Tailwind CSS + PWA
- **Backend**: Fastify + Prisma + PostgreSQL/SQLite
- **State Management**: Zustand + TanStack Query

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- pnpm

### Installation

```bash
# Clone and install dependencies
pnpm install

# Setup database (SQLite for development)
cd server
npx prisma db push
npx tsx src/seed.ts

# Start development servers
# Terminal 1: Backend API
pnpm dev:server

# Terminal 2: Frontend PWA
pnpm dev:client
```

### Access
- Frontend: http://localhost:5173
- API: http://localhost:3001

## 📱 PWA Installation

The app is fully installable as a Progressive Web App:
1. Open the app in Chrome/Edge on mobile or desktop
2. Tap the install button or use browser menu → "Install"
3. The app will be saved to your device's home screen

## 💾 Project Structure

```
├── client/              # React + Vite frontend
│   ├── src/pages/       # Application pages
│   │   ├── SplashScreen.tsx
│   │   ├── WelcomeScreen.tsx
│   │   ├── LoginScreen.tsx
│   │   ├── RegisterScreen.tsx
│   │   └── children/    # Kids' learning features
│   │   └── parent/      # Parent dashboard features
│   ├── tailwind.css
│   └── vite.config.ts
├── server/              # Fastify backend API
│   ├── src/
│   │   ├── index.ts     # Main API server
│   │   └── seed.ts      # Seed data
│   ├── prisma/
│   │   └── schema.prisma
│   └── package.json
└── shared/              # Shared TypeScript types
    └── src/index.ts
```

## 🔐 Authentication

### Default Test Account
- **Email**: `parent@example.com`
- **Password**: `parent123`
- **Parental PIN**: `1234`

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/register` | Register new parent account |
| POST | `/api/login` | Login with email/password |
| GET | `/api/categories` | Get learning categories |
| GET | `/api/videos/:categorySlug` | Get videos by category |
| GET | `/api/games` | Get all learning games |

## 🎮 Features Implemented (MVP)

### Phase 1 - Core PWA
- ✅ Splash screen with animated transition
- ✅ Welcome and onboarding screens
- ✅ Email/password authentication
- ✅ Parent/Child profile management
- ✅ Kids Home Dashboard
- ✅ Learning Categories browser
- ✅ Video playback interface
- ✅ Educational games (5 games):
  - Match the Pair
  - Alphabet Tracing
  - Number Tracing
  - Burst the Balloon
  - Number Counting
- ✅ Parent Dashboard
- ✅ Screen time controls
- ✅ Subscription management
- ✅ PWA manifest and service worker

## 🎨 Design System

Colors:
- `primary`: #FF6B35 (Orange)
- `secondary`: #4ECDC4 (Teal)
- `accent`: #FFE66D (Yellow)

Fonts:
- Sans-serif: Inter
- Kids: Comic Neue

## 🛠️ Development Commands

```bash
# Build frontend
pnpm build:client

# Build backend
pnpm build:server

# Run database migrations
pnpm db:migrate

# Seed test data
pnpm db:seed
```

## 📊 Database Schema

The PostgreSQL/SQLite schema includes:
- Users (Parent accounts)
- Child Profiles
- Learning Categories
- Video Lessons
- Educational Games
- Watch History
- Game Results
- Subscriptions

## ⚠️ Known Limitations

1. **Video Content**: Uses placeholder URLs - requires licensed educational videos for production
2. **Offline**: Basic PWA support - video downloads not implemented (per requirements)
3. **Premium Content**: Subscription system ready - payment integration not enabled
4. **Admin Panel**: Schema and endpoints exist - admin UI not implemented in MVP

## 📄 Documentation

- [REA Report](./docs/REA_REPORT.md) - Reverse Engineering Analysis
- [Architecture](./docs/ARCHITECTURE.md) - System design
- [API Reference](./docs/API.md) - API endpoints
- [Development Guide](./docs/DEVELOPMENT.md) - Setup instructions

## 🤝 Contributing

This is the MVP implementation. Future contributions welcome for:
- Additional educational games
- Admin dashboard UI
- Payment integration
- Video content management

## 📝 License

All code is original. Video content must be properly licensed or public domain.