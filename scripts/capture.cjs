const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const ARTIFACT_DIR = 'C:\\Users\\user\\.gemini\\antigravity\\brain\\86735cbf-56a8-4419-8634-3fd99089063d';

async function main() {
  console.log('[Runner] Launching headless Chromium browser...');
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1.5
  });

  const page = await context.newPage();

  console.log('[Runner] Navigating to http://localhost:3000 ...');
  try {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  } catch (e) {
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
  }
  
  // Clear any existing session to capture clean login page
  await page.evaluate(() => {
    localStorage.clear();
  });
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  // 1. Screenshot of Unified Login Page
  const loginPath = path.join(ARTIFACT_DIR, 'actual_login_page.png');
  await page.screenshot({ path: loginPath, fullPage: false });
  console.log('[Runner] Saved login page screenshot to:', loginPath);

  // 2. Sign in as Citizen
  console.log('[Runner] Testing Citizen sign in...');
  const citizenBtn = await page.$('button:has-text("Citizen Portal")');
  if (citizenBtn) {
    await citizenBtn.click();
  } else {
    const submitBtn = await page.$('button[type="submit"]');
    if (submitBtn) await submitBtn.click();
  }
  await page.waitForTimeout(2500);

  const citizenPath = path.join(ARTIFACT_DIR, 'actual_citizen_dashboard.png');
  await page.screenshot({ path: citizenPath, fullPage: false });
  console.log('[Runner] Saved citizen dashboard screenshot to:', citizenPath);

  // 3. Switch to Admin Dashboard
  console.log('[Runner] Switching to Municipal Admin Command Center...');
  const roleDropdown = await page.$('header button:has-text("Citizen Portal")');
  if (roleDropdown) {
    await roleDropdown.click();
    await page.waitForTimeout(600);
    const adminOption = await page.$('button:has-text("Municipal Command Center")');
    if (adminOption) {
      await adminOption.click();
      await page.waitForTimeout(3000);
    }
  }

  const adminPath = path.join(ARTIFACT_DIR, 'actual_admin_dashboard.png');
  await page.screenshot({ path: adminPath, fullPage: false });
  console.log('[Runner] Saved admin dashboard screenshot to:', adminPath);

  // 4. Switch to Driver Dashboard
  console.log('[Runner] Switching to Driver Route & Manifest view...');
  const roleDropdown2 = await page.$('header button:has-text("Municipal"), header button:has-text("Admin")');
  if (roleDropdown2) {
    await roleDropdown2.click();
    await page.waitForTimeout(600);
    const driverOption = await page.$('button:has-text("Collection Driver Suite")');
    if (driverOption) {
      await driverOption.click();
      await page.waitForTimeout(3000);
    }
  }

  const driverPath = path.join(ARTIFACT_DIR, 'actual_driver_dashboard.png');
  await page.screenshot({ path: driverPath, fullPage: false });
  console.log('[Runner] Saved driver dashboard screenshot to:', driverPath);

  // 5. Switch to Facility Dashboard
  console.log('[Runner] Switching to Recycling Facility Terminal...');
  const roleDropdown3 = await page.$('header button:has-text("Driver"), header button:has-text("Collection")');
  if (roleDropdown3) {
    await roleDropdown3.click();
    await page.waitForTimeout(600);
    const facilityOption = await page.$('button:has-text("Recycling Facility Hub")');
    if (facilityOption) {
      await facilityOption.click();
      await page.waitForTimeout(3000);
    }
  }

  const facilityPath = path.join(ARTIFACT_DIR, 'actual_facility_dashboard.png');
  await page.screenshot({ path: facilityPath, fullPage: false });
  console.log('[Runner] Saved facility dashboard screenshot to:', facilityPath);

  await browser.close();
  console.log('[Runner] All 5 actual screenshots captured successfully!');
}

main().catch((err) => {
  console.error('[Runner Error]:', err);
  process.exit(1);
});
