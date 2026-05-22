import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const FRONTEND_DIR = path.resolve('.');
const SRC_DIR = path.join(FRONTEND_DIR, 'src');
const ASSETS_DIR = path.join(SRC_DIR, 'assets');
const IMAGES_DIR = path.join(ASSETS_DIR, 'images');

// Paths to compress logo
const LOGO_PATHS = [
  path.join(ASSETS_DIR, 'logo.png'),
  path.join(FRONTEND_DIR, 'public', 'logo.png'),
];

// Helper to recursively list files in a directory
function getFilesRecursively(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getFilesRecursively(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  }
  return fileList;
}

// Compress Logo
async function optimizeLogos() {
  console.log('\n--- Optimizing Logos ---');
  for (const logoPath of LOGO_PATHS) {
    if (fs.existsSync(logoPath)) {
      const stats = fs.statSync(logoPath);
      console.log(`Original Logo size (${path.basename(logoPath)}): ${(stats.size / 1024 / 1024).toFixed(2)} MB`);

      // Read, compress, and save in-place as a highly optimized PNG
      const tempPath = logoPath + '.tmp.png';
      await sharp(logoPath)
        .png({ compressionLevel: 9, quality: 75, effort: 10 })
        .toFile(tempPath);

      fs.renameSync(tempPath, logoPath);
      const newStats = fs.statSync(logoPath);
      console.log(`Optimized Logo size: ${(newStats.size / 1024).toFixed(2)} KB (Saved: ${((1 - newStats.size / stats.size) * 100).toFixed(1)}%)`);
    } else {
      console.warn(`Logo not found at: ${logoPath}`);
    }
  }
}

// Convert other images to WebP
async function optimizeProjectImages() {
  console.log('\n--- Converting Project Images to WebP ---');
  const allImages = getFilesRecursively(IMAGES_DIR);
  
  const targetExtensions = ['.png', '.jpg', '.jpeg'];
  let count = 0;
  let totalSavedBytes = 0;

  for (const imgPath of allImages) {
    const ext = path.extname(imgPath).toLowerCase();
    // Do not re-optimize files that are already webp, or files that aren't target formats
    if (!targetExtensions.includes(ext) || imgPath.endsWith('.webp')) continue;

    const baseName = path.basename(imgPath, ext);
    const dirName = path.dirname(imgPath);
    const webpPath = path.join(dirName, `${baseName}.webp`);

    const stats = fs.statSync(imgPath);
    
    // Skip tiny files if they are already small (e.g. less than 10KB)
    if (stats.size < 10240) continue;

    console.log(`Optimizing: ${path.relative(IMAGES_DIR, imgPath)} (${(stats.size / 1024).toFixed(1)} KB)`);

    try {
      const pipeline = sharp(imgPath);
      const metadata = await pipeline.metadata();

      // Limit width to 1920px (standard full HD/2K) for large images to save substantial space
      if (metadata.width && metadata.width > 1920) {
        pipeline.resize({ width: 1920, withoutEnlargement: true });
      }

      await pipeline
        .webp({ quality: 80, effort: 6 })
        .toFile(webpPath);

      const webpStats = fs.statSync(webpPath);
      const saved = stats.size - webpStats.size;
      totalSavedBytes += saved;
      count++;

      console.log(`  -> WebP created: ${path.basename(webpPath)} (${(webpStats.size / 1024).toFixed(1)} KB, Saved: ${((saved / stats.size) * 100).toFixed(1)}%)`);
    } catch (err) {
      console.error(`Failed to optimize ${imgPath}:`, err.message);
    }
  }

  console.log(`\nOptimization summary:`);
  console.log(`- Converted ${count} images to WebP.`);
  console.log(`- Total disk space saved: ${(totalSavedBytes / 1024 / 1024).toFixed(2)} MB.`);
}

async function main() {
  try {
    await optimizeLogos();
    await optimizeProjectImages();
    console.log('\nAsset optimization complete!');
  } catch (err) {
    console.error('Error during optimization:', err);
  }
}

main();
