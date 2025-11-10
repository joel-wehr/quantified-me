#!/usr/bin/env node

/**
 * Copy Phoenix theme assets to Quantified Me frontend
 *
 * This script copies necessary assets from the Phoenix theme directory
 * to the Quantified Me frontend public directory.
 */

const fs = require('fs');
const path = require('path');

const PHOENIX_PATH = 'C:\\Users\\joelw\\Documents\\GitHub\\phoenix-theme\\phoenix-v1.23.0\\public';
const FRONTEND_PATH = path.join(__dirname, '..', 'frontend', 'public');

console.log('📦 Copying Phoenix Theme Assets\n');

// Helper to copy directory recursively
function copyDirectory(src, dest, filter = null) {
  if (!fs.existsSync(src)) {
    console.error(`  ❌ Source not found: ${src}`);
    return false;
  }

  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    // Apply filter if provided
    if (filter && !filter(entry.name, srcPath)) {
      continue;
    }

    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath, filter);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }

  return true;
}

// Helper to copy single file
function copyFile(src, dest) {
  const destDir = path.dirname(dest);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  fs.copyFileSync(src, dest);
}

try {
  // 1. Copy CSS assets
  console.log('✅ Step 1: Copying CSS assets...');
  const cssSource = path.join(PHOENIX_PATH, 'assets', 'css');
  const cssDest = path.join(FRONTEND_PATH, 'assets', 'css');

  const cssFilter = (name) => {
    // Only copy minified CSS files
    return name.endsWith('.min.css') || name.endsWith('.css.map');
  };

  if (copyDirectory(cssSource, cssDest, cssFilter)) {
    console.log('  ✓ CSS files copied\n');
  }

  // 2. Copy JS assets
  console.log('✅ Step 2: Copying JavaScript assets...');
  const jsSource = path.join(PHOENIX_PATH, 'assets', 'js');
  const jsDest = path.join(FRONTEND_PATH, 'assets', 'js');

  const jsFilter = (name) => {
    // Copy config.js and minified JS files
    return name === 'config.js' ||
           name.endsWith('.min.js') ||
           name.endsWith('.js.map');
  };

  if (copyDirectory(jsSource, jsDest, jsFilter)) {
    console.log('  ✓ JavaScript files copied\n');
  }

  // 3. Copy image assets
  console.log('✅ Step 3: Copying image assets...');
  const imgSource = path.join(PHOENIX_PATH, 'assets', 'img');
  const imgDest = path.join(FRONTEND_PATH, 'assets', 'img');

  const imgFilter = (name) => {
    // Skip large files, only copy essential images
    return !name.endsWith('.tar.gz');
  };

  if (copyDirectory(imgSource, imgDest, imgFilter)) {
    console.log('  ✓ Image files copied\n');
  }

  // 4. Copy essential vendor libraries
  console.log('✅ Step 4: Copying vendor libraries...');
  const vendorsSource = path.join(PHOENIX_PATH, 'vendors');
  const vendorsDest = path.join(FRONTEND_PATH, 'vendors');

  const essentialVendors = [
    'simplebar',
    'feather-icons',
  ];

  essentialVendors.forEach(vendor => {
    const src = path.join(vendorsSource, vendor);
    const dest = path.join(vendorsDest, vendor);
    if (fs.existsSync(src)) {
      copyDirectory(src, dest);
      console.log(`  ✓ Copied ${vendor}`);
    } else {
      console.log(`  ⚠️  ${vendor} not found, skipping`);
    }
  });
  console.log();

  // 5. Copy sample data (if needed for development)
  console.log('✅ Step 5: Copying sample data...');
  const dataSource = path.join(PHOENIX_PATH, 'assets', 'data');
  const dataDest = path.join(FRONTEND_PATH, 'assets', 'data');

  if (fs.existsSync(dataSource)) {
    copyDirectory(dataSource, dataDest);
    console.log('  ✓ Sample data copied\n');
  } else {
    console.log('  ⚠️  No sample data found, skipping\n');
  }

  // 6. Create custom CSS file for Quantified Me specific styles
  console.log('✅ Step 6: Creating custom styles file...');
  const customCssPath = path.join(FRONTEND_PATH, 'assets', 'css', 'custom.css');
  const customCssContent = `/* Quantified Me Custom Styles */

/* Brand Colors */
:root {
  --qm-primary: #3b82f6;
  --qm-secondary: #8b5cf6;

  /* Health Metric Colors */
  --health-activity: #10b981;
  --health-sleep: #3b82f6;
  --health-recovery: #8b5cf6;
  --health-nutrition: #f59e0b;
  --health-mental: #ec4899;

  /* Status Colors */
  --status-good: #10b981;
  --status-warning: #f59e0b;
  --status-alert: #ef4444;
}

/* Custom metric cards */
.metric-card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.metric-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Health metric specific styles */
.metric-activity {
  border-left: 4px solid var(--health-activity);
}

.metric-sleep {
  border-left: 4px solid var(--health-sleep);
}

.metric-recovery {
  border-left: 4px solid var(--health-recovery);
}

.metric-nutrition {
  border-left: 4px solid var(--health-nutrition);
}

.metric-mental {
  border-left: 4px solid var(--health-mental);
}

/* Chart containers */
.chart-container {
  position: relative;
  height: 300px;
}

/* Loading states */
.loading-skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s ease-in-out infinite;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .chart-container {
    height: 250px;
  }
}
`;

  fs.writeFileSync(customCssPath, customCssContent);
  console.log('  ✓ Custom CSS file created\n');

  // Summary
  console.log('✨ Asset copy complete!\n');
  console.log('Next steps:');
  console.log('  1. Update frontend/index.html to include Phoenix assets');
  console.log('  2. Create layout components (Navbar, Sidebar, Footer)');
  console.log('  3. Build dashboard page with Phoenix styling');
  console.log('  4. Test the theme in development mode\n');

} catch (error) {
  console.error('❌ Error copying assets:', error.message);
  process.exit(1);
}
