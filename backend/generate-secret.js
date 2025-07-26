// generate-secret.js
const crypto = require('crypto');

// Generate a secure random string
const generateSecret = () => {
  return crypto.randomBytes(64).toString('hex');
};

// Generate multiple options
console.log('Here are 3 secure JWT secret options:');
console.log('1:', generateSecret());
console.log('2:', generateSecret());
console.log('3:', generateSecret());

// Generate a base64 version (alternative format)
const base64Secret = crypto.randomBytes(64).toString('base64');
console.log('\nBase64 format option:');
console.log('4:', base64Secret);