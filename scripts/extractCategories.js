const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const folderPath = path.join(__dirname, '../articles');
const categorySet = new Set();

fs.readdirSync(folderPath).forEach((file) => {
  if (file.endsWith('.md')) {
    const content = fs.readFileSync(path.join(folderPath, file), 'utf-8');
    const parsed = matter(content);

    const categories = parsed.data.categories;
    if (Array.isArray(categories)) {
      categories.forEach((cat) => categorySet.add(cat));
    } else if (typeof categories === 'string') {
      categorySet.add(categories);
    }
  }
});

const categoryArray = Array.from(categorySet);

// Option 1: Log to console
console.log(categoryArray);

// Option 2: Write to file
fs.writeFileSync('categories.json', JSON.stringify(categoryArray, null, 2));
console.log('Categories written to categories.json');

// const categories = [
//   'блог',      'tekstovi',
//   'novosti',   'prevodi',
//   'slobodari', 'serijali',
//   'razgovori', 'blog-en',
//   'indeksi'
// ]
