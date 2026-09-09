#!/usr/bin/env node
// Astro copies public/ → dist/, but Bluehost needs .htaccess in the upload
// root. Fail the build if it is missing so a silent omission cannot ship.
import { copyFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const src = join('public', '.htaccess');
const dest = join('dist', '.htaccess');

if (!existsSync(src)) {
  console.error('ensure-htaccess: missing public/.htaccess');
  process.exit(1);
}

copyFileSync(src, dest);

if (!existsSync(dest)) {
  console.error('ensure-htaccess: dist/.htaccess missing after copy');
  process.exit(1);
}

console.log('ensure-htaccess: dist/.htaccess present');
