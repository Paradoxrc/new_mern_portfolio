const fs = require('fs');
const path = require('path');

// Create uploads directory and subdirectories
const createDirectories = () => {
  const directories = [
    'uploads',
    'uploads/skills',
    'uploads/projects',
    'uploads/profiles'
  ];

  directories.forEach(dir => {
    const dirPath = path.join(__dirname, dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      console.log(`✓ Created directory: ${dir}`);
    }
  });
};

// Create default placeholder images
const createPlaceholders = () => {
  // Create a simple SVG placeholder for skills
  const svgPlaceholder = `<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50">
    <rect width="50" height="50" fill="#667eea"/>
    <text x="25" y="30" text-anchor="middle" fill="white" font-family="Arial" font-size="12">IMG</text>
  </svg>`;

  const placeholderFiles = [
    { path: 'uploads/default-profile.jpg', content: 'placeholder' },
    { path: 'uploads/skills/react-icon.svg', content: svgPlaceholder },
    { path: 'uploads/skills/javascript-icon.svg', content: svgPlaceholder },
    { path: 'uploads/skills/html5-icon.svg', content: svgPlaceholder },
    { path: 'uploads/skills/css3-icon.svg', content: svgPlaceholder },
    { path: 'uploads/skills/nodejs-icon.svg', content: svgPlaceholder },
    { path: 'uploads/skills/express-icon.svg', content: svgPlaceholder },
    { path: 'uploads/skills/mongodb-icon.svg', content: svgPlaceholder },
    { path: 'uploads/projects/portfolio-project.jpg', content: 'placeholder' }
  ];

  placeholderFiles.forEach(file => {
    const filePath = path.join(__dirname, file.path);
    if (!fs.existsSync(filePath)) {
      if (file.content === 'placeholder') {
        // Create a simple text file as placeholder for now
        fs.writeFileSync(filePath, 'This is a placeholder image file');
      } else {
        fs.writeFileSync(filePath, file.content);
      }
      console.log(`✓ Created placeholder: ${file.path}`);
    }
  });
};

// Run setup
console.log('🚀 Setting up portfolio server...');
createDirectories();
createPlaceholders();
console.log('✅ Setup complete!');

module.exports = { createDirectories, createPlaceholders };
