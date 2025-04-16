var fs = require('fs');
var path = require('path');
var matter = require('gray-matter');
var articlesDirectory = path.join(process.cwd(), 'articles');
// Function to update metadata
var updateMetadata = function () {
    var getAllMarkdownFiles = function (dir) {
        var entries = fs.readdirSync(dir, { withFileTypes: true });
        var files = entries
            .filter(function (file) { return !file.isDirectory() && file.name.endsWith('.md'); })
            .map(function (file) { return path.join(dir, file.name); });
        var folders = entries.filter(function (folder) { return folder.isDirectory(); });
        for (var _i = 0, folders_1 = folders; _i < folders_1.length; _i++) {
            var folder = folders_1[_i];
            files.push.apply(files, getAllMarkdownFiles(path.join(dir, folder.name)));
        }
        return files;
    };
    var allMarkdownFiles = getAllMarkdownFiles(articlesDirectory);
    allMarkdownFiles.forEach(function (filePath) {
        var fileContents = fs.readFileSync(filePath, 'utf-8');
        var _a = matter(fileContents), data = _a.data, content = _a.content;
        // Update metadata fields
        data.author = data.author || 'Default Author'; // Add default author if missing
        if (data.category === 'Old Category') {
            data.category = 'New Category'; // Update category value
        }
        // Write the updated metadata back to the file
        var updatedContent = matter.stringify(content, data);
        fs.writeFileSync(filePath, updatedContent, 'utf-8');
        console.log("Updated metadata for: ".concat(filePath));
    });
};
updateMetadata();
