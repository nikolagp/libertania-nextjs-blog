const fs = require('fs').promises;
const path = require('path');
const matter = require('gray-matter');

async function findFolderArticles(dir) {
  const items = await fs.readdir(dir, { withFileTypes: true });
  let folders = [];

  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      folders.push(item.name);
    }
  }

  return folders;
}

async function findExistingArticles(dir) {
  const items = await fs.readdir(dir, { withFileTypes: true });
  let articles = [];

  for (const item of items) {
    if (item.isFile() && item.name.endsWith('.md')) {
      articles.push(item.name.replace('.md', ''));
    }
  }

  return articles;
}

async function copyArticle(folderName) {
  try {
    // Source folder path
    const sourceFolderPath = path.join(
      __dirname,
      '../articles/posts-in-folders',
      folderName
    );

    // Source file path (index.md in the folder)
    const sourceFilePath = path.join(sourceFolderPath, 'index.md');

    // Destination file path (.md file in articles directory)
    const destFilePath = path.join(
      __dirname,
      '../articles',
      `${folderName}.md`
    );

    // Read the source file
    const sourceContent = await fs.readFile(sourceFilePath, 'utf8');
    const { data: frontmatter, content } = matter(sourceContent);

    // Create new file content with the same frontmatter and content
    const newFileContent = matter.stringify(content, frontmatter);

    // Write the new file
    await fs.writeFile(destFilePath, newFileContent);
    console.log(`✅ Copied ${folderName}`);
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log(`⚠️ Source article not found: ${folderName}`);
    } else {
      console.error(`❌ Error processing ${folderName}:`, err);
    }
  }
}

async function findAndCopyMissingArticles() {
  try {
    const postsDir = path.join(__dirname, '../articles/posts-in-folders');
    const articlesDir = path.join(__dirname, '../articles');

    const folderArticles = await findFolderArticles(postsDir);
    const existingArticles = await findExistingArticles(articlesDir);

    let missingArticles = folderArticles.filter(
      (folder) => !existingArticles.includes(folder)
    );

    console.log(`Found ${missingArticles.length} missing articles`);

    for (const article of missingArticles) {
      await copyArticle(article);
    }

    console.log('Done processing missing articles!');
  } catch (err) {
    console.error('Error:', err);
  }
}

findAndCopyMissingArticles();
