import { mkdir } from 'node:fs/promises';
import { chromium } from '@playwright/test';

await mkdir('.cache/previews', { recursive: true });
const browser = await chromium.launch({ channel: 'chrome' });
try {
  const page = await browser.newPage();
  const routes = [
    ['home', '/'],
    ['gallery', '/galeria'],
    ['projects', '/projetos'],
    ['detail', '/projetos/1'],
    ['certifications', '/certificacoes'],
    ['about', '/sobre'],
    ['contact', '/contato'],
  ];
  for (const width of [1440, 768, 375]) {
    await page.setViewportSize({ width, height: 900 });
    for (const [name, route] of routes) {
      await page.goto(`http://127.0.0.1:5173${route}`);
      await page.locator('img').evaluateAll(async (images) => {
        await Promise.all(
          images.map((image) => {
            image.loading = 'eager';
            return image.decode();
          }),
        );
      });
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({ path: `.cache/previews/${name}-${width}.png`, fullPage: true });
    }
  }
} finally {
  await browser.close();
}
