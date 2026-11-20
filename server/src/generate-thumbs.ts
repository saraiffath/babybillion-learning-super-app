import { PrismaClient } from '@prisma/client';
import ffmpeg from 'fluent-ffmpeg';
import path from 'path';
import fs from 'fs';

const prisma = new PrismaClient();

async function generateThumbnailsForMissing() {
  const videos = await prisma.videoLesson.findMany({
    where: {
      thumbnailUrl: { contains: 'sheru-bhai' }
    }
  });

  const VIDEOS_DIR = path.join(__dirname, '../../client/public/videos');
  const THUMBS_DIR = path.join(__dirname, '../../client/public/thumbnails');

  if (!fs.existsSync(THUMBS_DIR)) fs.mkdirSync(THUMBS_DIR, { recursive: true });

  for (const video of videos) {
    const videoFileName = path.basename(video.videoUrl);
    const videoPath = path.join(VIDEOS_DIR, videoFileName);
    const thumbFileName = videoFileName.replace('.mp4', '.jpg');
    const thumbPath = path.join(THUMBS_DIR, thumbFileName);

    if (fs.existsSync(videoPath) && !fs.existsSync(thumbPath)) {
      console.log(`Generating thumbnail for ${video.title}...`);
      try {
        await new Promise((resolve, reject) => {
          ffmpeg(videoPath)
            .screenshots({
              timestamps: ['1'],
              filename: thumbFileName,
              folder: THUMBS_DIR,
              size: '320x240'
            })
            .on('end', resolve)
            .on('error', reject);
        });
        console.log(`Thumbnail created: ${thumbFileName}`);
      } catch (err) {
        console.error(`Error generating thumbnail for ${video.title}:`, err);
      }
    }
  }
}

generateThumbnailsForMissing()
  .catch(console.error)
  .finally(async () => await prisma.$disconnect());