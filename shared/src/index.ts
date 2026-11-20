export interface ParentUser {
  id: string;
  email: string;
  name: string;
  pinHash?: string;
  isVerified: boolean;
  createdAt: string;
}

export interface ChildProfile {
  id: string;
  parentId: string;
  nickname: string;
  ageGroup: '0-3' | '3-6' | '6-9';
  language: 'en' | 'hi';
  avatar: string;
  dailyScreenTimeMinutes: number;
  todayScreenTimeUsed: number;
  pinProtected?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  ageGroup: string;
  isPremium: boolean;
  order: number;
}

export interface VideoLesson {
  id: string;
  categoryId: string;
  title: string;
  description: string;
  durationSeconds: number;
  videoUrl: string;
  thumbnailUrl: string;
  isPremium: boolean;
  ageGroup: string;
}

export interface LearningGame {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  minAge: number;
  maxAge: number;
  thumbnailUrl: string;
}

export interface GameResultPayload {
  childId: string;
  gameId: string;
  score: number;
  maxScore: number;
  completed: boolean;
  timeSpentSeconds: number;
}

export interface WatchHistoryPayload {
  childId: string;
  videoId: string;
  progressSeconds: number;
  completed: boolean;
}
