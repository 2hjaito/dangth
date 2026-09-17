import { mkdir, readdir, stat, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const supportedExtensions = new Set([
  '.jpg',
  '.jpeg',
  '.png',
  // '.gif',
  // '.tif',
  // '.tiff',
  // '.avif',
  // '.heic',
]);

const args = process.argv.slice(2);
const inputIndex = args.indexOf('--input');
const inputDir = path.resolve(
  inputIndex >= 0 && args[inputIndex + 1] ? args[inputIndex + 1] : 'public/change'
);
const qualityIndex = args.indexOf('--quality');
const qualityValue = qualityIndex >= 0 ? Number(args[qualityIndex + 1]) : 82;
const quality = Number.isInteger(qualityValue) && qualityValue >= 1 && qualityValue <= 100
  ? qualityValue
  : 82;
const manifestIndex = args.indexOf('--manifest');
const manifestPath = path.resolve(
  manifestIndex >= 0 && args[manifestIndex + 1] ? args[manifestIndex + 1] : 'converted-webp.txt'
);
const replaceOriginals = args.includes('--replace');
const dryRun = args.includes('--dry-run');

if (args.includes('--help')) {
  console.log(`Usage: node scripts/convert-images-to-webp.mjs [options]

Options:
  --input <folder>   Source folder, default: public/change
  --quality <1-100>  WebP quality, default: 82
  --manifest <file>  Converted path list, default: converted-webp.txt
  --replace          Delete the source after a successful conversion
  --dry-run          List files without converting them
  --help             Show this help
`);
  process.exit(0);
}

if (qualityValue !== quality) {
  console.warn(`Invalid quality "${qualityValue}". Using ${quality}.`);
}

async function collectImages(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...await collectImages(entryPath));
      continue;
    }

    if (entry.isFile() && supportedExtensions.has(path.extname(entry.name).toLowerCase())) {
      files.push(entryPath);
    }
  }

  return files;
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 ** 2).toFixed(1)} MB`;
}

async function convertImage(sourcePath) {
  const extension = path.extname(sourcePath);
  const outputPath = path.join(sourcePath.slice(0, -extension.length) + '.webp');
  const sourceStats = await stat(sourcePath);

  if (dryRun) {
    console.log(`${path.relative(process.cwd(), sourcePath)} -> ${path.relative(process.cwd(), outputPath)}`);
    return { sourceBytes: sourceStats.size, outputBytes: 0, outputPath: null };
  }

  await sharp(sourcePath, { animated: extension.toLowerCase() === '.gif' })
    .webp({ quality, effort: 6, smartSubsample: true })
    .toFile(outputPath);

  const outputStats = await stat(outputPath);
  if (replaceOriginals) await unlink(sourcePath);

  console.log(
    `${path.relative(process.cwd(), sourcePath)} -> ${path.relative(process.cwd(), outputPath)} `
    + `(${formatBytes(sourceStats.size)} -> ${formatBytes(outputStats.size)})`
  );

  return { sourceBytes: sourceStats.size, outputBytes: outputStats.size, outputPath };
}

try {
  const images = await collectImages(inputDir);
  console.log(images.length
    ? `${dryRun ? 'Would convert' : 'Converting'} ${images.length} image(s) from ${inputDir}`
    : `No supported images found in ${inputDir}`);
  let sourceBytes = 0;
  let outputBytes = 0;
  const convertedPaths = [];

  for (const imagePath of images) {
    try {
      const result = await convertImage(imagePath);
      sourceBytes += result.sourceBytes;
      outputBytes += result.outputBytes;
      if (result.outputPath) {
        convertedPaths.push(path.relative(process.cwd(), result.outputPath));
      }
    } catch (error) {
      console.error(`Failed: ${imagePath}`);
      console.error(error instanceof Error ? error.message : error);
    }
  }

  if (!dryRun) {
    await mkdir(path.dirname(manifestPath), { recursive: true });
    await writeFile(manifestPath, convertedPaths.length ? `${convertedPaths.join('\n')}\n` : '', 'utf8');
    console.log(`Manifest: ${path.relative(process.cwd(), manifestPath)} (${convertedPaths.length} path(s))`);
  }

  if (!dryRun && convertedPaths.length > 0) {
    const savedBytes = sourceBytes - outputBytes;
    const savedPercent = sourceBytes ? ((savedBytes / sourceBytes) * 100).toFixed(1) : '0.0';
    console.log(`Done: ${convertedPaths.length} converted, ${formatBytes(Math.max(savedBytes, 0))} saved (${savedPercent}%).`);
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}