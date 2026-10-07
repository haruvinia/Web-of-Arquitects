import { expect, test } from '@playwright/test';

const pages = [
  ['/', 'PROJECT'],
  ['/galeria', 'Gallery'],
  ['/projetos', 'Projects'],
  ['/certificacoes', 'Certifications'],
  ['/sobre', 'About'],
  ['/contato', 'Information'],
  ['/projetos/1', 'Project 1'],
  ['/projetos/2', 'Project 1'],
  ['/projetos/3', 'Project 1'],
];

for (const [path, title] of pages) {
  test(`route ${path} loads directly and survives a refresh without broken images or browser errors`, async ({
    page,
  }) => {
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(path);
    await expect(page.locator('h1')).toContainText(title);
    await page.reload();
    await expect(page.locator('h1')).toContainText(title);
    await page.locator('img').evaluateAll(async (images) => {
      await Promise.all(
        images.map((image) => {
          image.loading = 'eager';
          return image.decode();
        }),
      );
    });
    expect(
      await page
        .locator('img')
        .evaluateAll((images) => images.every((image) => image.naturalWidth > 0)),
    ).toBe(true);
    expect(errors).toEqual([]);
  });
}

test('navigation follows the requested order and project cards use dynamic URLs', async ({
  page,
}) => {
  await page.goto('/');
  const navigation = page.getByRole('navigation', { name: 'Main navigation', exact: true });
  await expect(navigation.getByRole('link')).toHaveText([
    'Main',
    'Gallery',
    'Projects',
    'Certifications',
    'About',
    'Contact',
  ]);
  await navigation.getByRole('link', { name: 'Projects', exact: true }).click();
  await expect(page).toHaveURL(/\/projetos$/);
  await expect(navigation.getByRole('link', { name: 'Projects', exact: true })).toHaveAttribute(
    'aria-current',
    'page',
  );
  const cards = page.locator('.project-card');
  await expect(cards).toHaveCount(3);
  for (let index = 0; index < 3; index++)
    await expect(cards.nth(index).getByRole('link')).toHaveAttribute(
      'href',
      `/projetos/${index + 1}`,
    );
  await cards.nth(1).getByRole('link').click();
  await expect(page).toHaveURL(/\/projetos\/2$/);
  await expect(page.locator('.project-detail')).toBeVisible();
});

test('featured slider changes image, counter and project destination', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Next project' }).click();
  await expect(page.locator('.hero h1')).toContainText('Sample Project 2');
  await expect(page.locator('.hero .page-count')).toHaveAttribute('aria-label', 'Page 2 of 2');
  await expect(page.locator('.hero').getByRole('link', { name: 'View Project' })).toHaveAttribute(
    'href',
    '/projetos/2',
  );
  await page.getByRole('button', { name: 'Next project' }).click();
  await expect(page.locator('.hero h1')).toContainText('Lorum');
  await page.getByRole('button', { name: 'Previous project' }).click();
  await expect(page.locator('.hero h1')).toContainText('Sample Project 2');
});

test('single-page lists disable pagination', async ({ page }) => {
  for (const path of ['/projetos', '/galeria']) {
    await page.goto(path);
    await expect(page.locator('.page-count')).toHaveAttribute('aria-label', 'Page 1 of 1');
    await expect(page.getByRole('button', { name: 'Previous project' })).toBeDisabled();
    await expect(page.getByRole('button', { name: 'Next project' })).toBeDisabled();
  }
});

test('unknown routes and IDs redirect to Main', async ({ page }) => {
  for (const path of ['/unknown', '/projetos/99']) {
    await page.goto(path);
    await expect(page).toHaveURL('http://127.0.0.1:5173/');
    await expect(page.locator('h1')).toContainText('Lorum');
  }
});

test('contact button reaches the form and validation prevents empty or invalid submissions', async ({
  page,
}) => {
  await page.goto('/contato');
  await page.getByRole('link', { name: 'Contact Us', exact: true }).click();
  await expect(page).toHaveURL(/\/#contact-form$/);
  await expect(page.locator('#contact-form')).toBeInViewport();
  await page.getByRole('button', { name: 'Send Email' }).click();
  await expect(page.getByLabel('Phone Number (required)', { exact: true })).toBeFocused();
  await page.getByLabel('Phone Number (required)', { exact: true }).fill('abcdef');
  expect(await page.locator('#contact-phone').evaluate((input) => input.checkValidity())).toBe(
    false,
  );
  await page.getByLabel('Phone Number (required)', { exact: true }).fill('+55 (11) 99999-9999');
  await page.getByLabel('E-mail (required)', { exact: true }).fill('invalid');
  expect(await page.locator('#contact-email').evaluate((input) => input.checkValidity())).toBe(
    false,
  );
  await page.getByLabel('E-mail (required)', { exact: true }).fill('visitor@example.com');
  await page
    .getByLabel('Message (required)', { exact: true })
    .fill('I would like to discuss an architecture project.');
  expect(await page.locator('form').evaluate((form) => form.checkValidity())).toBe(true);
  await expect(page.locator('form')).toContainText('Opens your email app');
  await expect(page.getByRole('status')).toHaveCount(0);
});

for (const width of [1440, 768, 375]) {
  test(`all pages fit the viewport at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const [path] of pages) {
      await page.goto(path);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
      ).toBe(true);
    }
  });
}

test('mobile menu opens, closes after navigation and supports Escape', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Open navigation' }).click();
  await page
    .getByRole('navigation', { name: 'Main navigation', exact: true })
    .getByRole('link', { name: 'Gallery' })
    .click();
  await expect(page).toHaveURL(/\/galeria$/);
  await expect(page.getByRole('button', { name: 'Open navigation' })).toHaveAttribute(
    'aria-expanded',
    'false',
  );
  await page.getByRole('button', { name: 'Open navigation' }).click();
  await page
    .getByRole('navigation', { name: 'Main navigation', exact: true })
    .getByRole('link', { name: 'Projects', exact: true })
    .focus();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'Open navigation' })).toBeFocused();
});

test('keyboard users can skip the navigation', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();
});
