const fs = require('fs');

const packageJsonPath = './package.json';

// Read package.json
const packageData = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

console.log(`📂 Read package.json successfully. Current version: ${packageData.version}`);

// Split version into parts and increment the last number
let versionParts = packageData.version.split('.').map(Number);
versionParts[versionParts.length - 1] += 1; // Increment last digit

// Update the version
packageData.version = versionParts.join('.');

// Write updated package.json
fs.writeFileSync(packageJsonPath, JSON.stringify(packageData, null, 2));

console.info(`✅ New version: ${packageData.version}`);
console.log(`🎉 Version updated successfully!`);
