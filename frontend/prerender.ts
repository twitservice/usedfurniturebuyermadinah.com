import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './src/App';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

try {
  // 1. Read the built index.html from dist
  const templatePath = path.resolve(__dirname, 'dist/index.html');
  const template = fs.readFileSync(templatePath, 'utf-8');

  // 2. Render the React App to a string
  const appHtml = renderToString(React.createElement(App));

  // 3. Inject the rendered HTML into the template
  const finalHtml = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

  // 4. Write back the updated index.html
  fs.writeFileSync(templatePath, finalHtml);
  
  console.log('Successfully prerendered for SEO.');
} catch (e) {
  console.error('Prerendering failed:', e);
  process.exit(1);
}
