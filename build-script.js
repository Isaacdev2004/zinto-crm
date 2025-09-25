const { execSync } = require('child_process');

console.log('Starting build with ESLint disabled...');

// Set environment variables to disable ESLint
process.env.DISABLE_ESLINT_PLUGIN = 'true';
process.env.GENERATE_SOURCEMAP = 'false';
process.env.NODE_OPTIONS = '--max-old-space-size=6144';

try {
  // Change to frontend directory and run build
  process.chdir('./frontend');
  execSync('npm run build', { stdio: 'inherit' });
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}
