import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function addSheruBhaiVideos() {
  const category = await prisma.category.findFirst({ where: { slug: 'stories' } });
  if (!category) {
    console.error('Category "stories" not found');
    return;
  }

  const videos = Array.from({ length: 500 }, (_, i) => ({
    categoryId: category.id,
    title: `Sheru Bhai Adventure ${i + 1}`,
    description: `Join Sheru Bhai on his amazing adventures episode ${i + 1}. Learning fun for kids!`,
    durationSeconds: 120 + (i % 60),
    videoUrl: `/videos/sheru-bhai-${i + 1}.mp4`,
    thumbnailUrl: `/thumbnails/sheru-bhai-${i + 1}.jpg`,
    isPremium: i > 50, // First 50 free
    ageGroup: '3-6',
  }));

  console.log(`Adding ${videos.length} Sheru Bhai videos...`);
  
  // Batch insertion to avoid memory overflow for 500 records
  const batchSize = 100;
  for (let i = 0; i < videos.length; i += batchSize) {
    await prisma.videoLesson.createMany({
      data: videos.slice(i, i + batchSize),
    });
    console.log(`Added batch ${i / batchSize + 1}`);
  }

  console.log('Sheru Bhai videos added successfully!');
}

addSheruBhaiVideos()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());