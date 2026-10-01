import { expect, test } from '@playwright/test';

test('create, edit, complete, filter, and delete a todo', async ({ page }) => {
  const uniqueSuffix = Date.now();
  const initialTitle = `Study agents ${uniqueSuffix}`;
  const updatedTitle = `Study AGENTS.md ${uniqueSuffix}`;

  await page.goto('/');

  await page.getByLabel('New todo title').fill(initialTitle);
  await page.getByRole('button', { name: 'Add Todo' }).click();

  await expect(page.getByText(initialTitle)).toBeVisible();

  await page.getByRole('button', { name: new RegExp(`Edit ${initialTitle}`, 'i') }).click();
  const editField = page.getByLabel(new RegExp(`Edit title for ${initialTitle}`, 'i'));
  await editField.fill(updatedTitle);
  await editField.press('Enter');

  await expect(page.getByText(updatedTitle)).toBeVisible();

  await page.getByRole('checkbox', { name: new RegExp(`Mark ${updatedTitle} complete`, 'i') }).check();
  await page.getByRole('button', { name: /^Completed$/i }).click();
  await expect(page.getByText(updatedTitle)).toBeVisible();

  await page.getByRole('button', { name: /^All$/i }).click();
  await page.getByRole('button', { name: new RegExp(`Delete ${updatedTitle}`, 'i') }).click();

  await expect(page.getByText(updatedTitle)).not.toBeVisible();
});
