const fs = require('fs').promises;
const path = require('path');
const matter = require('gray-matter');

// Read the list of missing articles from our JSON file
async function getMissingArticles() {
  const missingArticlesFile = await fs.readFile(
    path.join(__dirname, 'missing-articles.json'),
    'utf8'
  );
  return JSON.parse(missingArticlesFile).missingArticles;
}

async function copyArticle(articleName) {
  try {
    // Source folder path
    const sourceFolderPath = path.join(
      __dirname,
      '../articles/posts-in-folders',
      articleName
    );

    // Source file path (index.md in the folder)
    const sourceFilePath = path.join(sourceFolderPath, 'index.md');

    // Destination file path (.md file in articles directory)
    const destFilePath = path.join(
      __dirname,
      '../articles',
      `${articleName}.md`
    );

    // Read the source file
    const sourceContent = await fs.readFile(sourceFilePath, 'utf8');
    const { data: frontmatter, content } = matter(sourceContent);

    // Create new file content with the same frontmatter and content
    const newFileContent = matter.stringify(content, frontmatter);

    // Write the new file
    await fs.writeFile(destFilePath, newFileContent);
    console.log(`✅ Copied ${articleName}`);
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.log(`⚠️ Source article not found: ${articleName}`);
    } else {
      console.error(`❌ Error processing ${articleName}:`, err);
    }
  }
}

async function copyMissingArticles() {
  try {
    const missingArticles = await getMissingArticles();

    for (const articleName of missingArticles) {
      await copyArticle(articleName);
    }

    console.log('Done copying missing articles!');
  } catch (err) {
    console.error('Error:', err);
  }
}

copyMissingArticles();
