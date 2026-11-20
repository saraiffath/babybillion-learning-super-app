import React, { useState, useRef } from 'react';
import ShortVideoPlayer from '../../components/ShortVideoPlayer';

const videos = [
  {
    id: 'sheru-bhai-grand-entry',
    title: 'Sheru Bhai Grand Entry 🦁',
    videoUrl: '/videos/sheru-bhai-grand-entry.mp4',
    description: 'Sheru Bhai makes a grand royal entry!',
  },
  {
    id: 'sheru-bhai-school-principal',
    title: 'Sheru Bhai Meets the Principal 🦁😎',
    videoUrl: '/videos/sheru-bhai-school-principal.mp4',
    description: 'Sheru Bhai arrives at school to meet the principal!',
  },
  {
    id: 'sheru-bhai-tadpan-tadap',
    title: 'Sheru Bhai Tadpan Tadap 🗿',
    videoUrl: '/videos/sheru-bhai-tadpan-tadap.mp4',
    description: 'Sheru Bhai dances and shows off his attitude!',
  },
  {
    id: 'sheru-bhai-vs-cm-vijay',
    title: 'Sheru Bhai vs CM Vijay 😱🔥',
    videoUrl: '/videos/sheru-bhai-vs-cm-vijay.mp4',
    description: 'Sheru Bhai vs CM Vijay - Episode 1',
  },
  {
    id: 'sheru-bhai-king-taj',
    title: 'Sheru Bhai Buys King Ka TAJ 👑🔥',
    videoUrl: '/videos/sheru-bhai-king-taj.mp4',
    description: 'Sheru Bhai buys the King Ka TAJ!',
  },
];

const ShortsFeed: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (containerRef.current) {
      const index = Math.round(containerRef.current.scrollTop / window.innerHeight);
      setActiveIndex(index);
    }
  };

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="w-full h-screen overflow-y-scroll snap-y snap-mandatory bg-black"
    >
      {videos.map((video, index) => (
        <ShortVideoPlayer
          key={video.id}
          video={video}
          isActive={index === activeIndex}
        />
      ))}
    </div>
  );
};

export default ShortsFeed;