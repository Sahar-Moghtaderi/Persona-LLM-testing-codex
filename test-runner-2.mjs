import { chromium } from 'playwright';

const SCREENSHOTS_DIR = 'screenshots';
const BASE_URL = 'http://localhost:5173';

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1920, height: 1080 },
  locale: 'de-DE',
});
const page = await context.newPage();

async function screenshot(name) {
  const path = `${SCREENSHOTS_DIR}/sandra-hoffmann-${name}.png`;
  await page.screenshot({ path, fullPage: false });
  console.log(`Screenshot: ${path}`);
}

function log(msg) {
  console.log(`\n=== ${msg} ===`);
}

try {
  // --- Startseite: Fullpage Screenshot ---
  log('Startseite Fullpage');
  await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: `${SCREENSHOTS_DIR}/sandra-hoffmann-schritt-1-startseite-fullpage.png`, fullPage: true });
  console.log('Fullpage Screenshot erstellt');

  // --- Registrierungsseite testen ---
  log('Registrierungsseite');

  // Klicke auf Registrieren-Button in der Navigation
  const regBtn = await page.$('button:has-text("Registrieren"), a:has-text("Registrieren")');
  if (regBtn) {
    await regBtn.click();
    await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
    await page.waitForTimeout(2000);
    console.log('URL:', page.url());
    await screenshot('schritt-2-registrierung');

    // Formularfelder analysieren
    const formFields = await page.evaluate(() => {
      const inputs = document.querySelectorAll('input, select, textarea');
      return Array.from(inputs).map(i => ({
        type: i.type,
        name: i.name || i.id,
        placeholder: i.placeholder,
        label: i.labels?.[0]?.textContent?.trim() || '',
        required: i.required,
      }));
    });
    console.log('\nRegistrierungsfelder:');
    formFields.forEach(f => console.log(`  [${f.type}] ${f.name || f.label} ${f.placeholder ? '("' + f.placeholder + '")' : ''} ${f.required ? '(Pflicht)' : ''}`));

    // Sichtbare Texte
    const texts = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('h1, h2, h3, p, label, a, button')).map(el => ({
        tag: el.tagName,
        text: el.textContent?.trim().substring(0, 150),
      })).filter(e => e.text);
    });
    console.log('\nSichtbare Texte:');
    texts.forEach(t => console.log(`  [${t.tag}] ${t.text}`));
  }

  // --- Login-Seite: Fehlermeldungen testen ---
  log('Login-Fehlermeldungen testen');
  await page.goto(`${BASE_URL}/login`, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1000);

  // Leeres Formular absenden
  const submitBtn = await page.$('button:has-text("Weiter"), button[type="submit"]');
  if (submitBtn) {
    await submitBtn.click();
    await page.waitForTimeout(1500);
    await screenshot('schritt-2-login-fehlermeldung-leer');

    // Fehlermeldungen sammeln
    const errors = await page.evaluate(() => {
      const errorEls = document.querySelectorAll('.mat-mdc-form-field-error, .error, [role="alert"], .mat-error, .mdc-text-field--invalid, mat-error');
      return Array.from(errorEls).map(e => e.textContent?.trim()).filter(Boolean);
    });
    console.log('Fehlermeldungen (leeres Formular):', errors);

    // Ungültige E-Mail eingeben
    const emailInput = await page.$('input[type="email"]');
    if (emailInput) {
      await emailInput.fill('keine-email');
      await page.click('body'); // Focus lost
      await page.waitForTimeout(500);

      await submitBtn.click();
      await page.waitForTimeout(1500);
      await screenshot('schritt-2-login-fehlermeldung-email');

      const errors2 = await page.evaluate(() => {
        const errorEls = document.querySelectorAll('.mat-mdc-form-field-error, .error, [role="alert"], .mat-error, mat-error, .ng-invalid ~ mat-error');
        return Array.from(errorEls).map(e => e.textContent?.trim()).filter(Boolean);
      });
      console.log('Fehlermeldungen (ungültige E-Mail):', errors2);
    }
  }

  // --- Responsiveness: Mobile Viewport ---
  log('Mobile Ansicht testen');
  await page.setViewportSize({ width: 375, height: 812 }); // iPhone X
  await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  await screenshot('mobile-startseite');

  // Navigation im Mobile-Modus
  const hamburger = await page.$('button[aria-label*="menu"], button[aria-label*="Menu"], .hamburger, .menu-toggle, button:has(.mat-icon):near(nav)');
  if (hamburger) {
    console.log('Hamburger-Menü gefunden');
  } else {
    console.log('Kein Hamburger-Menü gefunden');
    // Check if nav is visible
    const navVisible = await page.evaluate(() => {
      const nav = document.querySelector('nav');
      if (!nav) return 'Keine Nav gefunden';
      const style = window.getComputedStyle(nav);
      return `Nav display: ${style.display}, visibility: ${style.visibility}`;
    });
    console.log(navVisible);
  }

} catch (err) {
  console.error('FEHLER:', err.message);
  await screenshot('fehler-2');
} finally {
  await browser.close();
}
