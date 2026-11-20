import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Video component for playing educational content
// This is a simplified implementation - production version would include:
// - HLS streaming support
// - Progress tracking
// - Fullscreen mode
// - Subtitle support

interface VideoLesson {
  id: string;
  categoryId: string;
  title: string;
  description: string;
  durationSeconds: number;
  videoUrl: string;
  thumbnailUrl: string;
}

const VideoPlayer: React.FC = () => {
  const { videoId } = useParams<{ videoId: string }>();
  const navigate = useNavigate();

  // Generate placeholder video URL for demo
  const videoUrl = `/videos/sample-video-${videoId?.substring(0, 8)}.mp4`;
  const title = 'Sample Educational Video';
  const description = 'Learn something amazing! 🎓';

  return (
    <div className="min-h-screen bg-black">
      {/* Video Player */}
      <div className="aspect-video bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🎬</div>
          <div className="text-white text-lg mb-2">{title}</div>
          <div className="text-gray-400 text-sm mb-4">{description}</div>
          <video 
            src={videoUrl} 
            controls 
            className="w-full max-w-2xl rounded-lg"
            onEnded={() => console.log('Video completed')}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* Next Recommended */}
      <div className="p-4 bg-gray-50">
        <h2 className="text-lg font-bold mb-3">Up Next</h2>
        <div className="bg-white rounded-2xl p-3 shadow">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
              <span className="text-xl">📖</span>
            </div>
            <div className="flex-1">
              <div className="font-medium">Alphabet Tracing: Letter B</div>
              <div className="text-sm text-gray-500">3 min • Recommended</div>
            </div>
            <button className="bg-primary text-white px-3 py-2 rounded-full text-sm">
              Play
            </button>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-4 right-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center"
      >
        ✕
      </button>
    </div>
  );
};

export default VideoPlayer;