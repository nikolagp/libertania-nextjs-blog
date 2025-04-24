import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Directory containing the markdown files
const articlesDir = path.join(process.cwd(), 'articles');

// Function to extract the last part of the image path
const extractCoverImage = (content: string): string | null => {
  const imageRegex = /!\[.*?\]\((.*?)\)/g;
  let match;
  let lastImage = null;

  while ((match = imageRegex.exec(content)) !== null) {
    lastImage = match[1];
  }

  if (lastImage) {
    return path.basename(lastImage);
  }
  return null;
};

// Function to process all markdown files
const processMarkdownFiles = (dir: string): void => {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    if (file.endsWith('.md')) {
      const filePath = path.join(dir, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(fileContent);

      // Extract cover image
      const coverImage = extractCoverImage(content);

      if (coverImage) {
        data.coverImage = coverImage;

        // Write updated content back to the file
        const updatedContent = matter.stringify(content, data);
        fs.writeFileSync(filePath, updatedContent, 'utf-8');
        console.log(`Updated coverImage for: ${file}`);
      }
    }
  });
};

// Start processing
processMarkdownFiles(articlesDir);
