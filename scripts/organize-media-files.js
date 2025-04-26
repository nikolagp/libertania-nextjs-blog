const fs = require('fs').promises;
const path = require('path');
const matter = require('gray-matter');

async function findAllMediaFiles(content) {
  // Regular expressions to match different types of media references
  const patterns = [
    // Markdown image syntax
    /!\[.*?\]\((.*?)\)/g,
    // HTML img tags
    /<img.*?src=["'](.*?)["']/g,
    // PDF or other document links
    /\[.*?\]\((.*\.(?:pdf|doc|docx|xlsx))\)/g,
    // Cover images from frontmatter
    /coverImage: ["'](.*?)["']/g,
  ];

  let mediaFiles = new Set();

  for (const pattern of patterns) {
    const matches = content.matchAll(pattern);
    for (const match of matches) {
      const file = match[1];
      if (file && !file.startsWith('http')) {
        mediaFiles.add(file.split('/').pop()); // Get just the filename
      }
    }
  }

  return Array.from(mediaFiles);
}

async function createDirectory(dir) {
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch (err) {
    if (err.code !== 'EEXIST') {
      throw err;
    }
  }
}

async function processArticles() {
  try {
    const articlesDir = path.join(__dirname, '../articles');
    const sourceImagesDir = path.join(articlesDir, 'images');
    const mediaDir = path.join(articlesDir, 'media');

    // Create media directory
    await createDirectory(mediaDir);

    // Get all markdown files
    const files = await fs.readdir(articlesDir);
    const markdownFiles = files.filter((file) => file.endsWith('.md'));

    let allMediaFiles = new Set();

    // First pass: collect all media references
    for (const file of markdownFiles) {
      const filePath = path.join(articlesDir, file);
      const content = await fs.readFile(filePath, 'utf8');

      const mediaFiles = await findAllMediaFiles(content);
      mediaFiles.forEach((file) => allMediaFiles.add(file));
    }

    console.log(
      `Found ${allMediaFiles.size} unique media files referenced in articles`
    );

    // Second pass: copy files from images to media directory
    for (const mediaFile of allMediaFiles) {
      try {
        const sourcePath = path.join(sourceImagesDir, mediaFile);
        const destPath = path.join(mediaDir, mediaFile);

        try {
          await fs.copyFile(sourcePath, destPath);
          console.log(`✅ Copied ${mediaFile}`);
        } catch (err) {
          if (err.code === 'ENOENT') {
            console.log(`⚠️ File not found: ${mediaFile}`);
          } else {
            throw err;
          }
        }
      } catch (err) {
        console.error(`❌ Error processing ${mediaFile}:`, err);
      }
    }

    console.log('Done organizing media files!');
  } catch (err) {
    console.error('Error:', err);
  }
}

processArticles();
