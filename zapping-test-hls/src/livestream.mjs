import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const manifestPath = path.join(__dirname, 'videos/segment.m3u8');

// Format the manifest (m3u8) file
const formatManifest = (filepath) => {
  fs.readFile(filepath, 'utf8', (err, data) => {
    if (err) throw err;
    
    if (data.includes('#EXT-X-ENDLIST')) {
      const lines = data.split('\n');
      lines.pop();
      const newFile = lines.join('\n');
      fs.writeFile(filepath, newFile, 'utf8', err => {
        if (err) throw err;
      });
    }
  });
}

// Simulate live stream
function simulateLiveStream(filepath) {
  fs.readFile(filepath, 'utf8', (err, data) => {
    if (err) throw err;

    const lines = data.split('\n');
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('#EXT-X-MEDIA-SEQUENCE:')) {
        const sequenceNumber = parseInt(lines[i].split(':')[1]) + 1;
        lines[i] = `#EXT-X-MEDIA-SEQUENCE:${sequenceNumber % 64}`;
        break;
      }
    }

    const firstSegment = lines.splice(4, 2);
    lines.push(firstSegment[0]);
    lines.push(firstSegment[1]);

    const newData = lines.join('\n');
    fs.writeFile(filepath, newData, 'utf8', err => {
      if (err) throw err;
    });
  });
}

export const livestream = () => {
  formatManifest(manifestPath);
  setInterval(() => {
    simulateLiveStream(manifestPath);
  }, 10 * 1000);
}
