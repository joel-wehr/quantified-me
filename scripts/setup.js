#!/usr/bin/env node

/**
 * Setup script for Quantified Me
 * Initializes the project, installs dependencies, and configures environment
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Quantified Me Setup\n');

// Helper function to execute commands
function run(command, cwd = process.cwd()) {
  console.log(`  Running: ${command}`);
  try {
    execSync(command, { cwd, stdio: 'inherit' });
  } catch (error) {
    console.error(`  ❌ Failed: ${command}`);
    throw error;
  }
}

// Helper function to check if file exists
function fileExists(filePath) {
  return fs.existsSync(filePath);
}

// Step 1: Check prerequisites
console.log('✅ Step 1: Checking prerequisites...');
try {
  run('node --version');
  run('npm --version');
  console.log('  ✓ Node.js and npm are installed\n');
} catch (error) {
  console.error('  ❌ Node.js and npm are required. Please install them first.');
  process.exit(1);
}

// Step 2: Install root dependencies
console.log('✅ Step 2: Installing root dependencies...');
if (fileExists('package.json')) {
  run('npm install');
  console.log('  ✓ Root dependencies installed\n');
} else {
  console.error('  ❌ package.json not found');
  process.exit(1);
}

// Step 3: Install backend dependencies
console.log('✅ Step 3: Installing backend dependencies...');
const backendPath = path.join(__dirname, '..', 'backend');
if (fileExists(path.join(backendPath, 'package.json'))) {
  run('npm install', backendPath);
  console.log('  ✓ Backend dependencies installed\n');
} else {
  console.log('  ⚠️  Backend package.json not found, skipping\n');
}

// Step 4: Install frontend dependencies
console.log('✅ Step 4: Installing frontend dependencies...');
const frontendPath = path.join(__dirname, '..', 'frontend');
if (fileExists(path.join(frontendPath, 'package.json'))) {
  run('npm install', frontendPath);
  console.log('  ✓ Frontend dependencies installed\n');
} else {
  console.log('  ⚠️  Frontend package.json not found, skipping\n');
}

// Step 5: Create .env file if it doesn't exist
console.log('✅ Step 5: Setting up environment variables...');
const envPath = path.join(__dirname, '..', '.env');
const envExamplePath = path.join(__dirname, '..', '.env.example');

if (!fileExists(envPath) && fileExists(envExamplePath)) {
  fs.copyFileSync(envExamplePath, envPath);
  console.log('  ✓ Created .env file from .env.example');
  console.log('  ⚠️  Please edit .env with your configuration\n');
} else if (fileExists(envPath)) {
  console.log('  ✓ .env file already exists\n');
} else {
  console.log('  ⚠️  .env.example not found, skipping\n');
}

// Step 6: Initialize git repository if needed
console.log('✅ Step 6: Checking git repository...');
const gitPath = path.join(__dirname, '..', '.git');
if (!fileExists(gitPath)) {
  console.log('  ⚠️  Not a git repository. Run these commands to initialize:');
  console.log('      git init');
  console.log('      git add .');
  console.log('      git commit -m "Initial commit"');
  console.log('      git branch -M main');
  console.log('      git remote add origin <your-repo-url>');
  console.log('      git push -u origin main\n');
} else {
  console.log('  ✓ Git repository exists\n');
}

// Final instructions
console.log('✨ Setup complete!\n');
console.log('Next steps:');
console.log('  1. Edit .env with your configuration (API keys, database URLs, etc.)');
console.log('  2. Set up your AWS account and configure credentials');
console.log('  3. Review ARCHITECTURE.md for system design details');
console.log('  4. Run development servers:');
console.log('     - Backend:  cd backend && npm run dev');
console.log('     - Frontend: cd frontend && npm run dev');
console.log('  5. Create GitHub repository and push code');
console.log('  6. Configure GitHub Actions secrets for CI/CD\n');
console.log('Happy coding! 🎉');
