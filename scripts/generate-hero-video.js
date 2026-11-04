const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { execFileSync } = require('child_process');
const ffmpegPath = require('ffmpeg-static');

async function generateHeroVideo() {
  console.log('=== MINDSPARK 2026 HERO VIDEO REEL GENERATOR ===');
  
  const tmpDir = path.join(process.cwd(), '.tmp_video_frames');
  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir, { recursive: true });
  }

  const outDir = path.join(process.cwd(), 'public', 'videos');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const imgDir = path.join(process.cwd(), 'public', 'images');
  
  // List all 36 authentic event images in chronological ceremony order
  const imageFiles = [
    'inauguration-dignitaries.jpg',
    'STARTING-IMAGE-01.JPG',
    'STARTING-IMAGE-02.JPG',
    ...Array.from({ length: 33 }, (_, i) => `EVENT-IMAGES-${String(i + 1).padStart(2, '0')}.JPG`)
  ];

  console.log(`Processing ${imageFiles.length} photos into 1280x720 cinematic frames...`);

  const validFrames = [];

  for (let idx = 0; idx < imageFiles.length; idx++) {
    const filename = imageFiles[idx];
    const srcPath = path.join(imgDir, filename);

    if (!fs.existsSync(srcPath)) {
      console.warn(`File not found: ${filename}`);
      continue;
    }

    const frameFile = `frame_${String(validFrames.length).padStart(3, '0')}.jpg`;
    const framePath = path.join(tmpDir, frameFile);

    try {
      const meta = await sharp(srcPath).metadata();

      if (meta.width < meta.height) {
        // Portrait image: render full photo centered with ambient blurred wings
        const bg = await sharp(srcPath)
          .resize(1280, 720, { fit: 'cover' })
          .blur(30)
          .modulate({ brightness: 0.6 })
          .toBuffer();

        const fg = await sharp(srcPath)
          .resize(null, 700, { fit: 'contain' })
          .toBuffer();

        await sharp(bg)
          .composite([{ input: fg, gravity: 'center' }])
          .jpeg({ quality: 92, mozjpeg: true })
          .toFile(framePath);
      } else {
        // Landscape image: perfect 1280x720 16:9 crop centered
        await sharp(srcPath)
          .resize(1280, 720, { fit: 'cover', position: 'center' })
          .jpeg({ quality: 92, mozjpeg: true })
          .toFile(framePath);
      }

      validFrames.push(framePath);
    } catch (err) {
      console.error(`Error processing ${filename}:`, err.message);
    }
  }

  console.log(`Total valid frames ready: ${validFrames.length}`);

  // Create concat demuxer text file for ffmpeg with duration per frame
  // 2.2 seconds per frame = ~79 seconds total video
  const concatFile = path.join(tmpDir, 'frames.txt');
  let concatContent = '';
  for (let i = 0; i < validFrames.length; i++) {
    const p = validFrames[i].replace(/\\/g, '/');
    concatContent += `file '${p}'\n`;
    concatContent += `duration 2.2\n`;
  }
  // Repeat last frame to avoid truncation
  if (validFrames.length > 0) {
    const lastP = validFrames[validFrames.length - 1].replace(/\\/g, '/');
    concatContent += `file '${lastP}'\n`;
  }
  fs.writeFileSync(concatFile, concatContent);

  // Output video paths
  const outMp4 = path.join(outDir, 'mindspark-hero-reel.mp4');
  const outWebm = path.join(outDir, 'mindspark-hero-reel.webm');

  console.log('Encoding MP4 (H.264 / faststart)...');
  // Use concat demuxer with framerate 30, x264 crf 23, preset fast, faststart for instant streaming
  const mp4Args = [
    '-y',
    '-f', 'concat',
    '-safe', '0',
    '-i', concatFile,
    '-vf', 'fps=25,format=yuv420p',
    '-c:v', 'libx264',
    '-crf', '23',
    '-preset', 'fast',
    '-movflags', '+faststart',
    outMp4
  ];

  execFileSync(ffmpegPath, mp4Args, { stdio: 'inherit' });

  const mp4Stat = fs.statSync(outMp4);
  console.log(`MP4 successfully generated! Path: ${outMp4} (${(mp4Stat.size / 1024 / 1024).toFixed(2)} MB)`);

  console.log('Encoding WebM (VP9 for modern browsers)...');
  const webmArgs = [
    '-y',
    '-f', 'concat',
    '-safe', '0',
    '-i', concatFile,
    '-vf', 'fps=25,format=yuv420p',
    '-c:v', 'libvpx-vp9',
    '-crf', '30',
    '-b:v', '0',
    outWebm
  ];

  try {
    execFileSync(ffmpegPath, webmArgs, { stdio: 'inherit' });
    const webmStat = fs.statSync(outWebm);
    console.log(`WebM successfully generated! Path: ${outWebm} (${(webmStat.size / 1024 / 1024).toFixed(2)} MB)`);
  } catch (e) {
    console.warn('WebM encoding optional, skipped or had error:', e.message);
  }

  // Cleanup tmp frames
  try {
    const tmpFiles = fs.readdirSync(tmpDir);
    for (const f of tmpFiles) {
      fs.unlinkSync(path.join(tmpDir, f));
    }
    fs.rmdirSync(tmpDir);
    console.log('Cleaned up temporary frames.');
  } catch (e) {
    // Ignore cleanup err
  }

  console.log('=== HERO VIDEO GENERATION COMPLETE ===');
}

generateHeroVideo().catch((err) => {
  console.error('Fatal generator error:', err);
  process.exit(1);
});
