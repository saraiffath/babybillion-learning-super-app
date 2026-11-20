# BabyBillion Architecture

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT (PWA)                              │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐   │
│  │   React App     │  │  Tailwind CSS   │  │  PWA Support    │   │
│  │  + Vite Build   │  │   Components    │  │  Manifest/Web   │   │
│  └─────────────────┘  └─────────────────┘  │  App Manifest   │   │
│         │                        │         │  ServiceWorker  │   │
│         ▼                        ▼         └─────────────────┘   │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │                   React Router                          │  │
│  └─────────────────────────────────────────────────────────┘  │
│         │                                                  │   │
│         ▼                                                  │   │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │               TanStack Query (Data)                   │  │
│  └─────────────────────────────────────────────────────────┘  │
│         │                                                  │   │
│         ▼                                                  │   │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │              Zustand (State)                            │  │
│  └─────────────────────────────────────────────────────────┘  │
└────────────────────────┬───────────────────────────────────────┘
                         │ API Calls
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                        SERVER                                     │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐   │
│  │   Fastify API   │  │   Auth (JWT)    │  │   Error Handler │   │
│  │   REST Routes   │  │   Bcrypt Hash   │  │   Logging       │   │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘   │
│         │                        │                            │
│         ▼                        ▼                            │
│  ┌─────────────────────────────────────────────────────────┐  │
│  │                Prisma ORM (Database)                      │  │
│  └─────────────────────────────────────────────────────────┘  │
│         │                                                  │   │
│         ▼                                                  │   │
│  ┌─────────────────┐                                      │   │
│  │   SQLite/PostgreSQL│                                     │   │
│  │   (Dev: SQLite)  │                                     │   │
│  └─────────────────┘                                      │   │
└─────────────────────────────────────────────────────────────────┘
```

## Technology Choices

### Frontend
| Technology | Reason |
|------------|--------|
| React 18 | Component-based UI, hooks, mature ecosystem |
| TypeScript | Type safety, shared types with backend |
| Vite | Fast HMR, modern build tool |
| Tailwind CSS | Rapid UI development, responsive design |
| TanStack Query | Server state management, caching |
| Zustand | Lightweight client state management |
| React Router v6 | SPA navigation |
| vite-plugin-pwa | PWA generation |

### Backend
| Technology | Reason |
|------------|--------|
| Fastify | Fast, low-overhead, modern API framework |
| Prisma | Type-safe database client, migrations |
| SQLite | Zero-config dev database |
| @fastify/jwt | Authentication middleware |
| bcrypt | Secure password hashing |

### Build System
| Component | Tool |
|-----------|------|
| Package Manager | pnpm (workspace monorepo) |
| Type Checking | TypeScript |
| Formatting | Prettier (recommended) |
| Linting | ESLint (recommend to add) |

## Database Design

### Core Entities

```
Parent
├── id (PK)
├── email (unique)
├── passwordHash
├── name
├── isVerified
└── createdAt

ChildProfile
├── id (PK)
├── parentId (FK → Parent)
├── nickname
├── ageGroup
├── language
├── avatar
├── dailyScreenTimeMinutes
└── createdAt

Category
├── id (PK)
├── name
├── slug (unique)
├── description
├── icon
├── ageGroup
├── isPremium
└── order

VideoLesson
├── id (PK)
├── categoryId (FK → Category)
├── title
├── description
├── durationSeconds
├── videoUrl
├── thumbnailUrl
├── isPremium
└── ageGroup

Game
├── id (PK)
├── slug (unique)
├── title
├── description
├── category
├── minAge
├── maxAge
├── thumbnailUrl
└── createdAt

SubscriptionPlan
├── id (PK)
├── name
├── price
├── currency
├── durationDays
└── createdAt

Subscription
├── id (PK)
├── parentId (FK → Parent)
├── planId (FK → SubscriptionPlan)
├── startDate
├── endDate
└── status
```

### Junction Tables (for tracking)
- `WatchHistory` - tracks child video viewing
- `Favorites` - child's favorite videos
- `GameResult` - game completion results

## API Design

### Authentication Flow
```
Client                    Server
   │                         │
   │── POST /api/register ──→│
   │                         │
   │←── { id, email, name } -│
   │                         │
   │── POST /api/login ────→│
   │   { email, password }   │
   │                         │
   │←── { token } ──────────│
   │                         │
   │── GET /api/profiles ──→│ (with Bearer token)
   │                         │
   │←── [children...] ──────│
```

### Key Endpoints

#### Public
- `GET /health` - Health check
- `GET /api/categories` - List categories
- `GET /api/games` - List games

#### Auth Required
- `POST /api/register` - Create parent account
- `POST /api/login` - Authenticate
- `GET /api/profiles` - Get child profiles
- `POST /api/profiles` - Create child profile
- `GET /api/videos/:categorySlug` - Get videos
- `GET /api/history/:childId` - Get watch history
- `POST /api/history` - Update watch progress
- `GET /api/favorites/:childId` - Get favorites
- `POST /api/games/:gameId/results` - Save game result

## Security Considerations

1. **Authentication**: JWT tokens, bcrypt password hashing
2. **Authorization**: Parent-child relationship validation
3. **Data Privacy**: Minimal child data collection
4. **Input Validation**: TypeScript types + runtime checks
5. **Rate Limiting**: Add in production
6. **CORS**: Configured for client-server communication

## PWA Features

- ✅ Web App Manifest
- ✅ Service Worker (Workbox)
- ✅ Installable on mobile/desktop
- ✅ Standalone display mode
- ✅ Responsive to all screen sizes
- ✅ Touch-friendly UI (48px minimum targets)
- ❌ Offline video downloads (disabled per requirements)
- ❌ Offline gameplay (basic shell caching)

## Deployment Architecture

```
CDN (Static Assets)
    │
    ▼
Load Balancer (Optional)
    │
    ├── Client (React Build) ──→ HTTPS
    │
    └── API Server (Fastify) ──→ HTTPS
         │
         ▼
    PostgreSQL / SQLite
```

## Environment Variables

```bash
# Server
JWT_SECRET=your-secret-key-here
PORT=3001
DATABASE_URL="prisma://..."

# Client
VITE_API_URL=http://localhost:3001
```