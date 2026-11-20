import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SplashScreen from './pages/SplashScreen';
import WelcomeScreen from './pages/WelcomeScreen';
import LoginScreen from './pages/LoginScreen';
import RegisterScreen from './pages/RegisterScreen';
import ProfilesScreen from './pages/ProfileSelection';
import CreateProfileScreen from './pages/CreateProfile';
import KidsHome from './pages/kids/KidsHome';
import CategoryList from './pages/kids/CategoryList';
import VideoPlayer from './pages/kids/VideoPlayer';
import GameDashboard from './pages/kids/GameDashboard';
import MatchPairGame from './pages/kids/games/MatchPairGame';
import AlphabetTracingGame from './pages/kids/games/AlphabetTracingGame';
import NumberTracingGame from './pages/kids/games/NumberTracingGame';
import BurstBalloonsGame from './pages/kids/games/BurstBalloonsGame';
import NumberCountingGame from './pages/kids/games/NumberCountingGame';
import ColorMatchingGame from './pages/kids/games/ColorMatchingGame';
import ConnectTheDotsGame from './pages/kids/games/ConnectTheDotsGame';
import EggSurpriseGame from './pages/kids/games/EggSurpriseGame';
import MissingNumberGame from './pages/kids/games/MissingNumberGame';
import ParentDashboard from './pages/parent/ParentDashboard';
import SettingsScreen from './pages/parent/SettingsScreen';
import SubscriptionScreen from './pages/parent/SubscriptionScreen';
import ShortsFeed from './pages/kids/ShortsFeed';
import AdminUploadScreen from './pages/admin/AdminUploadScreen';
import TalkingBabyScreen from './pages/kids/TalkingBabyScreen';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-pink-50">
      <Routes>
        <Route path="/" element={<Navigate to="/splash" replace />} />
        <Route path="/splash" element={<SplashScreen />} />
        <Route path="/welcome" element={<WelcomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/profiles" element={<ProfilesScreen />} />
        <Route path="/profiles/create" element={<CreateProfileScreen />} />
        <Route path="/kids/home" element={<KidsHome />} />
        <Route path="/kids/categories" element={<CategoryList />} />
        <Route path="/kids/video/:videoId" element={<VideoPlayer />} />
        <Route path="/kids/shorts" element={<ShortsFeed />} />
        <Route path="/kids/talking-baby" element={<TalkingBabyScreen />} />
        <Route path="/kids/games" element={<GameDashboard />} />
        <Route path="/kids/games/match-pair" element={<MatchPairGame />} />
        <Route path="/kids/games/alphabet-tracing" element={<AlphabetTracingGame />} />
        <Route path="/kids/games/number-tracing" element={<NumberTracingGame />} />
        <Route path="/kids/games/burst-balloons" element={<BurstBalloonsGame />} />
        <Route path="/kids/games/number-counting" element={<NumberCountingGame />} />
        <Route path="/kids/games/color-matching" element={<ColorMatchingGame />} />
        <Route path="/kids/games/connect-dots" element={<ConnectTheDotsGame />} />
        <Route path="/kids/games/egg-surprise" element={<EggSurpriseGame />} />
        <Route path="/kids/games/missing-number" element={<MissingNumberGame />} />
        <Route path="/parent/dashboard" element={<ParentDashboard />} />
        <Route path="/parent/settings" element={<SettingsScreen />} />
        <Route path="/parent/subscription" element={<SubscriptionScreen />} />
        <Route path="/admin/upload" element={<AdminUploadScreen />} />
      </Routes>
    </div>
  );
}

export default App;