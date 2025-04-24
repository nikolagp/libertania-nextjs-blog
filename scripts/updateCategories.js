const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const folderPath = path.join(__dirname, '../articles');

const categoryMap = {
  blog: 'блог',
  tekstovi: 'текстови',
  novosti: 'новости',
  prevodi: 'преводи',
  slobodari: 'слободари',
  serijali: 'серијали',
  razgovori: 'разговори',
  blogen: 'блог-ен',
  indeksi: 'индекси',
  // tekstovi: 'текстови',
  // novosti: 'новости',
  // vesti: 'вести',
  // blog: 'blog', // normalized for easy filtering
  // блог: 'blog',
};

fs.readdirSync(folderPath).forEach((file) => {
  if (!file.endsWith('.md')) return;

  const filePath = path.join(folderPath, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  const parsed = matter(content);

  let { categories } = parsed.data;

  // Normalize to array
  if (!categories) return;
  if (!Array.isArray(categories)) {
    categories = [categories];
  }

  // Convert known category names to Cyrillic
  let updated = categories.map((cat) => {
    const key = cat.toLowerCase();
    return categoryMap[key] || cat;
  });

  // Remove 'blog' if other categories exist
  if (updated.length > 1) {
    updated = updated.filter(
      (cat) => cat.toLowerCase() !== 'blog' && cat.toLowerCase() !== 'блог'
    );
  }

  // Replace only 'blog' with 'uncategorized'
  if (
    updated.length === 1 &&
    ['blog', 'блог'].includes(updated[0].toLowerCase())
  ) {
    updated = ['uncategorized'];
  }

  // Replace 'categories' with 'category' and use a string
  parsed.data.category = updated[0] || 'uncategorized';
  delete parsed.data.categories;

  const newContent = matter.stringify(parsed.content, parsed.data);
  fs.writeFileSync(filePath, newContent, 'utf-8');
  console.log(`Updated: ${file}`);
});
