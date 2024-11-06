import path from 'path';
import fs from 'fs';
import { imageFolder, videoFolder } from './constants.mjs';

export function createVideoPaths(videoData) {
  // Check if video folder exists
  if (!fs.existsSync(videoFolder)) {
    fs.mkdirSync(videoFolder);
  }

  const paths = videoData.reduce((acc, [url, size, duration]) => {
    const fileName = path.basename(url);


    const localPath = path.join(videoFolder, fileName);
    acc.push([localPath, url, { size, duration }]);

    return acc;
  }, []);

  return paths;
}

export function createImagePaths(imageData) {
  const paths = [];

  // Check if image folder exists
  if (!fs.existsSync(imageFolder)) {
    fs.mkdirSync(imageFolder);
  }

  for (const images of imageData) {
    const imgArr = Object.entries(images);

    const isSvg = images.svg.endsWith('svg');

    if (isSvg) {
      const firstSvg = images.svg;
      const fileName = path.basename(firstSvg);

      const localPath = path.join(imageFolder, fileName);
      paths.push([localPath, firstSvg]);
    } else {
      const imagePaths = imgArr
        .filter(([type]) => type !== 'svg')
        .map(([type, url]) => {
          const baseURL = new URL(url);
          baseURL.search = '';

          const regex = /\.(jpg|jpeg|png|webp|avif|svg)$/i;
          const finalBase = baseURL.href.replace(regex, `.${type}`);

          const fileName = path.basename(finalBase);
          const localPath = path.join(imageFolder, fileName);

          return [localPath, url];
        });
      paths.push(...imagePaths);
    }
  }
  return paths;
}
