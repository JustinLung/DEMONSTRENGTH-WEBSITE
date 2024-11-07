import path from 'path';
import { fileURLToPath } from 'url';

// Dir and filenames
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.resolve(path.dirname(__filename), '..');


// Folders
export const publicRoute = '/static';
export const videoFolder = path.join(__dirname, `${publicRoute}/videos`);
export const imageFolder = path.join(__dirname, `${publicRoute}/cms-images`);

// FFMPEG
export const QUALITY = 70;
