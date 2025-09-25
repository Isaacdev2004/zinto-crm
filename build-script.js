const { execSync } = require('child_process');

console.log('Starting build with ESLint completely disabled...');

// Set environment variables to disable ESLint completely
process.env.DISABLE_ESLINT_PLUGIN = 'true';
process.env.GENERATE_SOURCEMAP = 'false';
process.env.NODE_OPTIONS = '--max-old-space-size=6144';
process.env.CI = 'false'; // This is the key - disable CI mode
process.env.ESLINT_NO_DEV_ERRORS = 'true';

try {
  // Change to frontend directory and run build with ESLint disabled
  process.chdir('./frontend');
  
  // Run craco build directly with ESLint disabled
  execSync('npx craco build --no-eslint', { 
    stdio: 'inherit',
    env: {
      ...process.env,
      DISABLE_ESLINT_PLUGIN: 'true',
      CI: 'false',
      ESLINT_NO_DEV_ERRORS: 'true'
    }
  });
  
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}
