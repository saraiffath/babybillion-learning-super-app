import React, { useRef, useState, useEffect } from 'react';

interface ShortVideo {
  id: string;
  title: string;
  videoUrl: string;
  description: string;
}

interface Props {
  video: ShortVideo;
  isActive: boolean;
}

const ShortVideoPlayer: React.FC<Props> = ({ video, isActive }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isActive) {
      videoRef.current?.play().catch(console.error);
    } else {
      videoRef.current?.pause();
      if (videoRef.current) videoRef.current.currentTime = 0;
    }
  }, [isActive]);

  return (
    <div className="relative w-full h-screen bg-black flex items-center justify-center snap-start">
      <video
        ref={videoRef}
        src={video.videoUrl}
        className="w-full h-full object-contain"
        loop
        playsInline
      />
      <div className="absolute bottom-16 left-4 text-white p-4 bg-black/30 rounded-lg">
        <h3 className="text-xl font-bold">{video.title}</h3>
        <p className="text-sm">{video.description}</p>
      </div>
    </div>
  );
};

export default ShortVideoPlayer;