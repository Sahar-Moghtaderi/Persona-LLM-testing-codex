import { chromium } from 'playwright';

const SCREENSHOTS_DIR = 'screenshots';
const BASE_URL = 'http://localhost:5173';
const FALL_NR = process.argv[2] || '1';
const PREFIX = `nadine-krueger-fall${FALL_NR}`;

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1920, height: 1080 },
  locale: 'de-DE',
});
const page = await context.newPage();

let actionCount = 0;
const startTime = new Date();

async function screenshot(name, fullPage = false) {
  const path = `${SCREENSHOTS_DIR}/${PREFIX}-${name}.png`;
  await page.screenshot({ path, fullPage });
  actionCount++;
  console.log(`Screenshot: ${path}`);
}

function log(msg) {
  console.log(`\n=== ${msg} ===`);
}

async function expandSection(headingText) {
  const btn = page.getByRole('button', { name: new RegExp(headingText) }).first();
  const visible = await btn.isVisible().catch(() => false);
  if (!visible) { console.log(`(Abschnitt "${headingText}" nicht gefunden)`); return; }
  await btn.click();
  actionCount++;
  await page.waitForTimeout(300);
}

try {
  log(`Schritt 1: Uebersicht aufrufen (Fall ${FALL_NR})`);
  await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 30000 });
  actionCount++;
  await page.waitForTimeout(1500);
  await screenshot('schritt-1-uebersicht');

  log(`Schritt 2: Fall ${FALL_NR} auswaehlen`);
  let fallCard = page.getByRole('button', { name: new RegExp(`Fall ${FALL_NR}:`) }).first();
  let fallVisible = await fallCard.isVisible().catch(() => false);
  if (!fallVisible) {
    console.log(`Fall ${FALL_NR} nicht in "Offene Faelle" sichtbar (evtl. schon geprueft) - wechsle zu "Alle Faelle"`);
    const filterBox = page.getByText(/^Offene Fälle$/).first();
    await filterBox.click();
    actionCount++;
    await page.waitForTimeout(300);
    const allOption = page.getByText(/^Alle Fälle$/).last();
    await allOption.click();
    actionCount++;
    await page.waitForTimeout(800);
    fallCard = page.getByRole('button', { name: new RegExp(`Fall ${FALL_NR}:`) }).first();
    fallVisible = await fallCard.isVisible().catch(() => false);
    console.log(`Fall ${FALL_NR} nach Filterwechsel sichtbar:`, fallVisible);
  }
  await fallCard.click();
  actionCount++;
  await page.waitForTimeout(1000);
  await screenshot('schritt-2-fall-ausgewaehlt');

  log('Schritt 3: Analysieren klicken');
  const analyzeBtn = page.getByRole('button', { name: /^Analysieren$/ }).first();
  await analyzeBtn.click();
  actionCount++;

  const maxWaitMs = 30000;
  const pollStart = Date.now();
  let finished = false;
  while (Date.now() - pollStart < maxWaitMs) {
    await page.waitForTimeout(1500);
    const bodyText = await page.evaluate(() => document.body.textContent || '');
    if (!bodyText.includes('Prüft')) { finished = true; break; }
  }
  actionCount++;
  console.log('Analyse abgeschlossen:', finished);
  await screenshot('schritt-3-analyse-ergebnis');

  log('Schritt 4: EBD-Treffer & Fachliche Ansicht');
  await expandSection('Fachliche Ansicht');
  await screenshot('schritt-4-ebd-treffer', true);
  const ebdText = await page.evaluate(() => document.body.textContent || '');
  const ebdIdx = ebdText.indexOf('Gefundene EBD Einträge');
  console.log('EBD/Fachliche Ansicht (Ausschnitt):', ebdText.slice(ebdIdx, ebdIdx + 800).replace(/\s+/g, ' '));

  log('Schritt 5: KI-Erklaerung lesen');
  await expandSection('KI Erklärung');
  await screenshot('schritt-5-ki-erklaerung', true);
  const kiText = await page.evaluate(() => document.body.textContent || '');
  const kiIdx = kiText.lastIndexOf('KI Erklärung');
  console.log('KI Erklaerung (Ausschnitt):', kiText.slice(kiIdx, kiIdx + 2500).replace(/\s+/g, ' '));

  log('Schritt 6: Pruefpfad (Entscheidungsbaum)');
  const pruefpfadHeading = page.getByText('Prüfpfad (Entscheidungsbaum)').first();
  await pruefpfadHeading.scrollIntoViewIfNeeded().catch(() => {});
  actionCount++;
  await page.waitForTimeout(500);
  await screenshot('schritt-6-pruefpfad', true);
  const pfadText = await page.evaluate(() => document.body.textContent || '');
  const pfadIdx = pfadText.indexOf('Vollständiger Prüfpfad');
  console.log('Pruefpfad (Ausschnitt):', pfadText.slice(pfadIdx, pfadIdx + 1200).replace(/\s+/g, ' '));

  log('Schritt 8: Als geprueft markieren');
  const markBtn = page.getByRole('button', { name: /Als geprüft markieren/ }).first();
  const markBtnVisible = await markBtn.isVisible().catch(() => false);
  const markBtnEnabled = markBtnVisible ? await markBtn.isEnabled().catch(() => false) : false;
  console.log('Button sichtbar:', markBtnVisible, '| aktiv:', markBtnEnabled);
  if (markBtnVisible && markBtnEnabled) {
    await markBtn.click();
    actionCount++;
    await page.waitForTimeout(1000);
    await screenshot('schritt-8-abschluss');
    const bodyTextAfter = await page.evaluate(() => document.body.textContent || '');
    console.log('Enthaelt "geprüft" nach Klick:', bodyTextAfter.includes('geprüft'));
  } else {
    await screenshot('schritt-8-abschluss-button-inaktiv');
  }

  const endTime = new Date();
  const durationSec = Math.round((endTime - startTime) / 1000);
  console.log(`\n=== FERTIG ===`);
  console.log(`Dauer: ${Math.floor(durationSec / 60)}m ${durationSec % 60}s`);
  console.log(`Aktionen: ${actionCount}`);

} catch (err) {
  console.error('FEHLER:', err.message);
  await screenshot('fehler');
} finally {
  await browser.close();
}
