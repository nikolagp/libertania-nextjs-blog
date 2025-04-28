import * as fs from 'fs';
import * as path from 'path';
import matter from 'gray-matter';

const articlesDirectory = path.join(process.cwd(), 'articles');

// Function to update metadata
const updateMetadata = () => {
  const getAllMarkdownFiles = (dir: string): string[] => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    const files = entries
      .filter(
        (file: fs.Dirent) => !file.isDirectory() && file.name.endsWith('.md')
      )
      .map((file: fs.Dirent) => path.join(dir, file.name));

    const folders = entries.filter((folder: fs.Dirent) => folder.isDirectory());

    for (const folder of folders) {
      files.push(...getAllMarkdownFiles(path.join(dir, folder.name)));
    }

    return files;
  };

  const allMarkdownFiles = getAllMarkdownFiles(articlesDirectory);

  allMarkdownFiles.forEach((filePath) => {
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContents);

    // Update metadata fields
    data.author = data.author || 'Default Author'; // Add default author if missing
    if (data.category === 'Old Category') {
      data.category = 'New Category'; // Update category value
    }

    // Write the updated metadata back to the file
    const updatedContent = matter.stringify(content, data);
    fs.writeFileSync(filePath, updatedContent, 'utf-8');
    console.log(`Updated metadata for: ${filePath}`);
  });
};

updateMetadata();
