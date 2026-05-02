const fs = require('fs');
const path = require('path');

const rootDir = process.argv[2] || process.cwd();
const outputFile = 'structure.txt';

// folders/files to ignore
const ignore = ['node_modules', '.git', '.next', 'dist', 'build'];

function generateTree(dir, prefix = '') {
    let result = '';

    const items = fs.readdirSync(dir);

    items.forEach((item, index) => {
        if (ignore.includes(item)) return;

        const fullPath = path.join(dir, item);
        const isLast = index === items.length - 1;
        const connector = isLast ? '└── ' : '├── ';

        result += prefix + connector + item + '\n';

        if (fs.statSync(fullPath).isDirectory()) {
            const newPrefix = prefix + (isLast ? '    ' : '│   ');
            result += generateTree(fullPath, newPrefix);
        }
    });

    return result;
}

const tree = `${path.basename(rootDir)}\n` + generateTree(rootDir);

fs.writeFileSync(outputFile, tree);

console.log(`✅ Folder structure saved to ${outputFile}`);