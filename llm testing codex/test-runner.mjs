import { chromium } from 'playwright';

const SCREENSHOTS_DIR = 'screenshots';
const BASE_URL = 'http://localhost:5173';

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1920, height: 1080 },
  locale: 'de-DE',
});
const page = await context.newPage();

// Helper: Screenshot mit Konsolenausgabe
async function screenshot(name) {
  const path = `${SCREENSHOTS_DIR}/sandra-hoffmann-${name}.png`;
  await page.screenshot({ path, fullPage: false });
  console.log(`Screenshot: ${path}`);
}

// Helper: Warte und logge
function log(msg) {
  console.log(`\n=== ${msg} ===`);
}

try {
  // --- Schritt 1: Startseite aufrufen ---
  log('Schritt 1: Startseite aufrufen');
  await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(2000);
  console.log('URL:', page.url());
  console.log('Titel:', await page.title());
  await screenshot('schritt-1-startseite');

  // Sichtbare Texte auf der Startseite sammeln
  const visibleText = await page.evaluate(() => {
    const elements = document.querySelectorAll('h1, h2, h3, p, a, button, [role="button"], nav a, .mat-mdc-button, .mdc-button');
    return Array.from(elements).map(el => ({
      tag: el.tagName,
      text: el.textContent?.trim().substring(0, 200),
      href: el.href || '',
    })).filter(e => e.text);
  });
  console.log('\nSichtbare Elemente:');
  visibleText.forEach(e => console.log(`  [${e.tag}] ${e.text}${e.href ? ' -> ' + e.href : ''}`));

  // CTA-Buttons und Navigation suchen
  const buttons = await page.evaluate(() => {
    const btns = document.querySelectorAll('a, button, [role="button"]');
    return Array.from(btns).map(b => ({
      text: b.textContent?.trim().substring(0, 100),
      href: b.href || '',
      tag: b.tagName,
    })).filter(b => b.text);
  });
  console.log('\nButtons/Links:');
  buttons.forEach(b => console.log(`  [${b.tag}] "${b.text}" ${b.href ? '-> ' + b.href : ''}`));

  // --- Schritt 2: Registrierung / Login ---
  log('Schritt 2: Registrierung / Login');

  // Suche nach Login/Registrieren-Button
  const loginLink = await page.$('a[href*="login"], a[href*="anmeld"], a[href*="registr"], a[href*="sign"], button:has-text("Anmelden"), button:has-text("Login"), button:has-text("Registrieren"), a:has-text("Anmelden"), a:has-text("Login"), a:has-text("Registrieren")');

  if (loginLink) {
    const linkText = await loginLink.textContent();
    console.log(`Login-Link gefunden: "${linkText.trim()}"`);
    await loginLink.click();
    await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
    await page.waitForTimeout(2000);
    console.log('URL nach Klick:', page.url());
    await screenshot('schritt-2-login-seite');

    // Login-Formular analysieren
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
    console.log('\nFormularfelder:');
    formFields.forEach(f => console.log(`  [${f.type}] ${f.name || f.label} ${f.placeholder ? '("' + f.placeholder + '")' : ''} ${f.required ? '(Pflicht)' : ''}`));
  } else {
    console.log('PROBLEM: Kein Login/Registrieren-Button auf der Startseite gefunden!');

    // Versuche alle Links zu listen
    const allLinks = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('a')).map(a => ({
        text: a.textContent?.trim().substring(0, 80),
        href: a.href
      })).filter(a => a.text);
    });
    console.log('Alle Links auf der Seite:');
    allLinks.forEach(l => console.log(`  "${l.text}" -> ${l.href}`));
  }

  // --- Schritt 3: Navigation zur App (falls Login-Seite) ---
  log('Schritt 3: Neue Modellierungssession');

  // Prüfe ob wir auf einer Login-Seite sind und versuche den Zugang
  const currentUrl = page.url();
  console.log('Aktuelle URL:', currentUrl);

  // Suche nach "Neuen Prozess erstellen" oder ähnlichem
  const newProcessBtn = await page.$('button:has-text("Prozess"), a:has-text("Prozess"), button:has-text("Neu"), a:has-text("Neu"), button:has-text("Start"), a:has-text("Start")');
  if (newProcessBtn) {
    const btnText = await newProcessBtn.textContent();
    console.log(`Button gefunden: "${btnText.trim()}"`);
    await screenshot('schritt-3-modellierung');
  } else {
    console.log('Kein "Neuen Prozess"-Button gefunden (vermutlich Login erforderlich)');
    await screenshot('schritt-3-aktueller-zustand');
  }

  // Vollständige Seitenanalyse
  log('Abschluss: Gesamtanalyse');
  const pageAnalysis = await page.evaluate(() => {
    return {
      title: document.title,
      metaDescription: document.querySelector('meta[name="description"]')?.content || '',
      h1: Array.from(document.querySelectorAll('h1')).map(h => h.textContent?.trim()),
      h2: Array.from(document.querySelectorAll('h2')).map(h => h.textContent?.trim()),
      forms: document.querySelectorAll('form').length,
      inputs: document.querySelectorAll('input').length,
      images: document.querySelectorAll('img').length,
      iframes: document.querySelectorAll('iframe').length,
    };
  });
  console.log('Seitenanalyse:', JSON.stringify(pageAnalysis, null, 2));

} catch (err) {
  console.error('FEHLER:', err.message);
  await screenshot('fehler');
} finally {
  await browser.close();
}
