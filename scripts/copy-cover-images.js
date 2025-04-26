const fs = require('fs').promises;
const path = require('path');
const matter = require('gray-matter');

async function findMarkdownFiles(dir) {
  const items = await fs.readdir(dir, { withFileTypes: true });
  let files = [];

  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      files = files.concat(await findMarkdownFiles(fullPath));
    } else if (item.name === 'index.md') {
      files.push(fullPath);
    }
  }

  return files;
}

async function processFiles() {
  try {
    // Get all index.md files from posts-in-folders
    const postsDir = path.join(__dirname, '../articles/posts-in-folders');
    const articlesDir = path.join(__dirname, '../articles');

    const indexFiles = await findMarkdownFiles(postsDir);

    for (const indexFile of indexFiles) {
      // Read the index.md file
      const fileContent = await fs.readFile(indexFile, 'utf8');
      const { data: frontmatter } = matter(fileContent);

      if (frontmatter.coverImage) {
        // Get the folder name which corresponds to the article name
        const folderName = path.basename(path.dirname(indexFile));
        const articlePath = path.join(articlesDir, `${folderName}.md`);

        try {
          // Check if corresponding article exists
          const articleContent = await fs.readFile(articlePath, 'utf8');
          const { data: articleFrontmatter, content } = matter(articleContent);

          // Add coverImage to the article's frontmatter
          articleFrontmatter.coverImage = frontmatter.coverImage;

          // Write back the updated article
          const updatedArticle = matter.stringify(content, articleFrontmatter);
          await fs.writeFile(articlePath, updatedArticle);

          console.log(`✅ Updated coverImage for ${folderName}`);
        } catch (err) {
          if (err.code === 'ENOENT') {
            console.log(`⚠️ Article not found: ${folderName}`);
          } else {
            console.error(`❌ Error processing ${folderName}:`, err);
          }
        }
      }
    }

    console.log('Done processing files!');
  } catch (err) {
    console.error('Error:', err);
  }
}

processFiles();
