const fs = require('fs').promises;
const path = require('path');
const matter = require('gray-matter');

async function findMarkdownFiles(dir) {
  const items = await fs.readdir(dir, { withFileTypes: true });
  let files = [];

  for (const item of items) {
    if (item.isFile() && item.name.endsWith('.md')) {
      files.push(path.join(dir, item.name));
    }
  }

  return files;
}

async function processArticles() {
  try {
    // Get all .md files from articles directory
    const articlesDir = path.join(__dirname, '../articles');
    const articleFiles = await findMarkdownFiles(articlesDir);

    const coverImages = {};

    for (const articlePath of articleFiles) {
      // Read the article file
      const fileContent = await fs.readFile(articlePath, 'utf8');
      const { data: frontmatter } = matter(fileContent);

      if (frontmatter.coverImage) {
        // Get the article name without extension
        const articleName = path.basename(articlePath, '.md');
        coverImages[articleName] = frontmatter.coverImage;
      }
    }

    // Write to article-cover-images.json
    const jsonPath = path.join(__dirname, '../article-cover-images.json');
    await fs.writeFile(jsonPath, JSON.stringify(coverImages, null, 2));

    console.log('Done updating article-cover-images.json!');
  } catch (err) {
    console.error('Error:', err);
  }
}

processArticles();
