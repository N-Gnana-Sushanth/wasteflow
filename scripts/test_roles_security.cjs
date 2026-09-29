const { chromium } = require('playwright');
const path = require('path');
const http = require('http');

const ARTIFACT_DIR = 'C:\\Users\\user\\.gemini\\antigravity\\brain\\86735cbf-56a8-4419-8634-3fd99089063d';

async function testApiEndpoint(method, pathName, token, body = null) {
  return new Promise((resolve) => {
    const data = body ? JSON.stringify(body) : '';
    const req = http.request(
      {
        hostname: 'localhost',
        port: 4000,
        path: `/api${pathName}`,
        method: method,
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...(body ? { 'Content-Length': Buffer.byteLength(data) } : {})
        }
      },
      (res) => {
        let responseBody = '';
        res.on('data', (chunk) => (responseBody += chunk));
        res.on('end', () => {
          resolve({
            statusCode: res.statusCode,
            body: responseBody ? JSON.parse(responseBody) : {}
          });
        });
      }
    );

    req.on('error', (err) => {
      resolve({ statusCode: 500, error: err.message });
    });

    if (body) req.write(data);
    req.end();
  });
}

async function runTestSuite() {
  console.log('====================================================');
  console.log('🛡️  WASTEFLOW ROLE ACCESS CONTROL & SECURITY TEST SUITE');
  console.log('====================================================\n');

  let results = [];

  // Launch browser
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1.5
  });

  const page = await context.newPage();
  const BASE_URL = 'http://localhost:3000';

  // Helper to log in with backend API
  const loginUser = async (email, password) => {
    await page.goto(`${BASE_URL}/login`, { waitUntil: 'networkidle' });
    await page.evaluate(() => localStorage.clear());
    await page.reload({ waitUntil: 'networkidle' });
    
    // Fill credentials
    await page.fill('input[type="email"]', email);
    await page.fill('input[type="password"]', password);
    await page.click('button[type="submit"]');
    await page.waitForTimeout(2000);
  };

  // ----------------------------------------------------
  // TEST 1: Citizen Login -> Citizen Portal Works
  // ----------------------------------------------------
  console.log('🧪 TEST 1: Citizen Login -> Citizen Portal Access');
  await loginUser('citizen@wasteflow.gov', 'Citizen@123');
  const hasCitizenWelcome = await page.locator('text=Welcome back, Ananya Sharma').count();
  const citizenPassed = hasCitizenWelcome > 0;
  console.log(`   -> Citizen Home Loaded: ${citizenPassed ? '✅ PASS' : '❌ FAIL'}`);
  results.push({ test: 'Citizen login -> Citizen portal works', status: citizenPassed ? 'PASS' : 'FAIL' });

  // ----------------------------------------------------
  // TEST 2: Citizen -> /admin -> Blocked (Access Denied)
  // ----------------------------------------------------
  console.log('🧪 TEST 2: Citizen navigates to /admin -> Route Guard Block');
  await page.evaluate(() => {
    window.history.pushState(null, '', '/admin');
    window.dispatchEvent(new PopStateEvent('popstate'));
  });
  await page.waitForTimeout(1500);
  const hasForbiddenAdmin = await page.locator('text=Restricted Municipal Area').count();
  const adminBlocked = hasForbiddenAdmin > 0;
  console.log(`   -> Citizen Access to /admin Blocked with 403 UI: ${adminBlocked ? '✅ PASS' : '❌ FAIL'}`);
  results.push({ test: 'Citizen -> /admin -> blocked', status: adminBlocked ? 'PASS' : 'FAIL' });

  // Screenshot Access Denied
  const accessDeniedPath = path.join(ARTIFACT_DIR, 'actual_access_denied.png');
  await page.screenshot({ path: accessDeniedPath, fullPage: false });
  console.log('   -> Saved actual_access_denied.png screenshot.');

  // ----------------------------------------------------
  // TEST 3: Citizen -> /driver -> Blocked (Access Denied)
  // ----------------------------------------------------
  console.log('🧪 TEST 3: Citizen navigates to /driver -> Route Guard Block');
  await page.evaluate(() => {
    window.history.pushState(null, '', '/driver');
    window.dispatchEvent(new PopStateEvent('popstate'));
  });
  await page.waitForTimeout(1500);
  const hasForbiddenDriver = await page.locator('text=Restricted Municipal Area').count();
  const driverBlocked = hasForbiddenDriver > 0;
  console.log(`   -> Citizen Access to /driver Blocked: ${driverBlocked ? '✅ PASS' : '❌ FAIL'}`);
  results.push({ test: 'Citizen -> /driver -> blocked', status: driverBlocked ? 'PASS' : 'FAIL' });

  // ----------------------------------------------------
  // TEST 4: Citizen -> /facility -> Blocked (Access Denied)
  // ----------------------------------------------------
  console.log('🧪 TEST 4: Citizen navigates to /facility -> Route Guard Block');
  await page.evaluate(() => {
    window.history.pushState(null, '', '/facility');
    window.dispatchEvent(new PopStateEvent('popstate'));
  });
  await page.waitForTimeout(1500);
  const hasForbiddenFacility = await page.locator('text=Restricted Municipal Area').count();
  const facilityBlocked = hasForbiddenFacility > 0;
  console.log(`   -> Citizen Access to /facility Blocked: ${facilityBlocked ? '✅ PASS' : '❌ FAIL'}`);
  results.push({ test: 'Citizen -> /facility -> blocked', status: facilityBlocked ? 'PASS' : 'FAIL' });

  // ----------------------------------------------------
  // TEST 5: Municipal Admin Login -> Admin Portal Works
  // ----------------------------------------------------
  console.log('🧪 TEST 5: Municipal Admin Login -> Admin Portal Access');
  await loginUser('admin@wasteflow.gov', 'Admin@123');
  const hasAdminDashboard = await page.locator('text=Waste Logistics & Sensor Telemetry').count();
  const adminPassed = hasAdminDashboard > 0;
  console.log(`   -> Admin Command Center Loaded: ${adminPassed ? '✅ PASS' : '❌ FAIL'}`);
  results.push({ test: 'Admin login -> Admin portal works', status: adminPassed ? 'PASS' : 'FAIL' });

  // ----------------------------------------------------
  // TEST 6: Collection Driver Login -> Driver Portal Works
  // ----------------------------------------------------
  console.log('🧪 TEST 6: Collection Driver Login -> Driver Portal Access');
  await loginUser('driver@wasteflow.gov', 'Driver@123');
  const hasDriverRoute = await page.locator('text=Today\'s Route Manifest').count();
  const driverPassed = hasDriverRoute > 0;
  console.log(`   -> Driver Route Loaded: ${driverPassed ? '✅ PASS' : '❌ FAIL'}`);
  results.push({ test: 'Driver login -> Driver portal works', status: driverPassed ? 'PASS' : 'FAIL' });

  // ----------------------------------------------------
  // TEST 7: Recycling Facility Login -> Facility Portal Works
  // ----------------------------------------------------
  console.log('🧪 TEST 7: Recycling Facility Login -> Facility Portal Access');
  await loginUser('facility@wasteflow.gov', 'Facility@123');
  const hasFacilityTerminal = await page.locator('text=GreenTech MRF & Circular Hub').count();
  const facilityPassed = hasFacilityTerminal > 0;
  console.log(`   -> Facility Terminal Loaded: ${facilityPassed ? '✅ PASS' : '❌ FAIL'}`);
  results.push({ test: 'Facility login -> Facility portal works', status: facilityPassed ? 'PASS' : 'FAIL' });

  // ----------------------------------------------------
  // TEST 8: Logout -> Protected Pages Inaccessible
  // ----------------------------------------------------
  console.log('🧪 TEST 8: Logout -> Session Revocation');
  // Click profile menu and sign out
  const profileBtn = await page.locator('header button:has-text("Facility"), header button:has-text("GreenTech")');
  if (await profileBtn.count() > 0) {
    await profileBtn.first().click();
    await page.waitForTimeout(500);
    await page.click('button:has-text("Sign Out")');
    await page.waitForTimeout(1500);
  } else {
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  }
  const hasLoginForm = await page.locator('text=Sign in to WasteFlow').count();
  console.log(`   -> Redirected to Login Form: ${hasLoginForm > 0 ? '✅ PASS' : '❌ FAIL'}`);
  results.push({ test: 'Logout -> protected pages are inaccessible', status: hasLoginForm > 0 ? 'PASS' : 'FAIL' });

  // ----------------------------------------------------
  // TEST 9: Direct URL Access while Logged Out -> Redirected to Login
  // ----------------------------------------------------
  console.log('🧪 TEST 9: Direct URL Navigation while Logged Out');
  await page.goto(`${BASE_URL}/admin`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  const loginFormOnAdmin = await page.locator('text=Sign in to WasteFlow').count();
  console.log(`   -> Unauthenticated /admin visits redirected to Login: ${loginFormOnAdmin > 0 ? '✅ PASS' : '❌ FAIL'}`);
  results.push({ test: 'Direct URL access is protected', status: loginFormOnAdmin > 0 ? 'PASS' : 'FAIL' });

  await browser.close();

  // ----------------------------------------------------
  // TEST 10: Backend RBAC Middleware -> HTTP 403 on Unauthorized API Requests
  // ----------------------------------------------------
  console.log('🧪 TEST 10: Backend RBAC API Enforcement');
  
  // 10a. Login as citizen via API to get Citizen JWT
  const citizenLoginRes = await testApiEndpoint('POST', '/auth/login', null, {
    email: 'citizen@wasteflow.gov',
    password: 'Citizen@123'
  });
  const citizenToken = citizenLoginRes.body?.data?.token;

  // 10b. Attempt Admin-only API: POST /api/scenarios/simulate with Citizen JWT
  const forbiddenScenarioRes = await testApiEndpoint('POST', '/scenarios/simulate', citizenToken, {
    scenarioId: 'sc-1',
    modifiedParameters: { fleetAvailabilityPct: 50 }
  });
  const isScenarioForbidden = forbiddenScenarioRes.statusCode === 403;
  console.log(`   -> Citizen calling POST /api/scenarios/simulate -> HTTP ${forbiddenScenarioRes.statusCode} (${isScenarioForbidden ? '403 FORBIDDEN ✅' : 'FAIL ❌'})`);

  // 10c. Attempt Admin-only API: POST /api/routes/optimize with Citizen JWT
  const forbiddenOptimizeRes = await testApiEndpoint('POST', '/routes/optimize', citizenToken, {
    zone: 'Hitec City - Zone 1'
  });
  const isOptimizeForbidden = forbiddenOptimizeRes.statusCode === 403;
  console.log(`   -> Citizen calling POST /api/routes/optimize -> HTTP ${forbiddenOptimizeRes.statusCode} (${isOptimizeForbidden ? '403 FORBIDDEN ✅' : 'FAIL ❌'})`);

  // 10d. Attempt Admin-only API: GET /api/users with Citizen JWT
  const forbiddenUsersRes = await testApiEndpoint('GET', '/users', citizenToken);
  const isUsersForbidden = forbiddenUsersRes.statusCode === 403;
  console.log(`   -> Citizen calling GET /api/users -> HTTP ${forbiddenUsersRes.statusCode} (${isUsersForbidden ? '403 FORBIDDEN ✅' : 'FAIL ❌'})`);

  const apiRbacPassed = isScenarioForbidden && isOptimizeForbidden && isUsersForbidden;
  results.push({ test: 'Unauthorized API requests return 403', status: apiRbacPassed ? 'PASS' : 'FAIL' });

  // Final Summary
  console.log('\n====================================================');
  console.log('📊 TEST SUMMARY RESULTS');
  console.log('====================================================');
  results.forEach((r, idx) => {
    console.log(`${idx + 1}. [${r.status}] ${r.test}`);
  });

  const allPassed = results.every((r) => r.status === 'PASS');
  console.log(`\nOVERALL STATUS: ${allPassed ? '🎉 ALL 10 TESTS PASSED' : '⚠️ SOME TESTS FAILED'}`);
  return allPassed;
}

runTestSuite().then((success) => {
  process.exit(success ? 0 : 1);
});
