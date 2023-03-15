import { test, expect } from '@playwright/test';
import { locators } from './locators';

test.describe.configure({ mode: 'parallel' });

test.beforeEach(async ({ page }) => {
  await page.goto('https://mail.ru');
});

test('grid menu', async ({ page }) => {
  await expect(page.locator(locators.gridMenu)).toBeVisible();

  await expect(
    page.locator(locators.gridMenu, { hasText: 'Облако' })
  ).toBeVisible();
  await expect(
    page.locator(locators.gridMenu, { hasText: 'Одноклассники' })
  ).toBeVisible();
  await expect(
    page.locator(locators.gridMenu, { hasText: 'ВКонтакте' })
  ).toBeVisible();
  await expect(
    page.locator(locators.gridMenu, { hasText: 'Новости' })
  ).toBeVisible();
  await expect(
    page.locator(locators.gridMenu, { hasText: 'Знакомства' })
  ).toBeVisible();

  await page.getByText('Все проекты').click();
  await expect(page.locator(locators.gridAllProjects)).toBeVisible();
});

test('logo', async ({ page }) => {
  await page.locator(locators.logoBtn).hover();
  await expect(page.locator(locators.logoBtn), {
    hasText: locators.logoPopover,
  }).toBeVisible();
});

test('left menu', async ({ page }) => {
  await expect(page.locator(locators.leftMenu)).toBeVisible();

  await expect(
    page.locator(locators.leftMenu, { hasText: 'Почта' })
  ).toBeVisible();
  await expect(
    page.locator(locators.leftMenu, { hasText: 'Облако' })
  ).toBeVisible();
  await expect(
    page.locator(locators.leftMenu, { hasText: 'Календарь' })
  ).toBeVisible();
  await expect(
    page.locator(locators.leftMenu, { hasText: 'Войти' })
  ).toBeVisible();
  await expect(
    page.locator(locators.leftMenu, { hasText: 'Создать почту' })
  ).toBeVisible();

  await expect(
    page.locator(locators.leftMenu, { hasText: 'Задачи' })
  ).toBeHidden();
  await expect(
    page.locator(locators.leftMenu, { hasText: 'Видеозвонки' })
  ).toBeHidden();
  await expect(
    page.locator(locators.leftMenu, { hasText: 'Оплата' })
  ).toBeHidden();

  await page.click(locators.leftMenuMoreServicesBtn);
  await expect(
    page.locator(locators.leftMenu, { hasText: 'Задачи' })
  ).toBeVisible();
  await expect(
    page.locator(locators.leftMenu, { hasText: 'Видеозвонки' })
  ).toBeVisible();
  await expect(
    page.locator(locators.leftMenu, { hasText: 'Оплата' })
  ).toBeVisible();
});

test('widgets', async ({ page }) => {
  await expect(
    page.locator(locators.widgetCloud, { hasText: 'Облако' })
  ).toBeVisible();
  await expect(page.locator(locators.widgetCloud)).toHaveJSProperty(
    'href="https://trk.mail.ru/c/y5n060?mt_sub1=mail.ru&mt_sub2=0&mt_sub3=78128559&mt_sub4=824018"'
  );
  await expect(page.locator(locators.widgetCloud)).toHaveText(
    /Сохраните файлы/
  );

  await expect(
    page.locator(locators.widgetTV, { hasText: 'Сейчас по ТВ' })
  ).toBeVisible();
  await expect(page.locator(locators.widgetTV)).toHaveJSProperty(
    'href="https://trk.mail.ru/c/ozn1v4?mt_sub1=mail.ru&mt_sub2=0&mt_sub3=78433929&mt_sub4=824014"'
  );
});

test('footer', async ({ page }) => {
  await expect(page.locator(locators.footerMenu)).toBeVisible();
  await expect(
    page.locator(locators.footerMenu, {
      hasText: 'Политика конфиденциальности',
    })
  ).toBeVisible();
  await expect(
    page.locator(locators.footerMenu, { hasText: 'О компании' })
  ).toBeVisible();

  await page.click(locators.footerMoreBtn);
  await expect(page.locator(locators.footerDropdown)).toBeVisible();

  await page.click(locators.footerHelpBtn);
  await expect(page).toHaveURL('https://help.mail.ru/');
  await expect(page.locator(locators.helpPageInput)).toBeVisible();
});
