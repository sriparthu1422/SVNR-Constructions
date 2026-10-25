const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const SCREENSHOTS_DIR = path.resolve('screenshots');
if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

const FRONTEND_URL = 'https://svnr-frontend.vercel.app';
const ADMIN_URL = 'https://svnr-admin.vercel.app';

async function run() {
  console.log('🚀 Launching Microsoft Edge via Playwright...');
  const browser = await chromium.launch({
    channel: 'msedge',
    headless: true,
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1.5,
  });

  const page = await context.newPage();

  async function capture(url, filename, options = {}) {
    console.log(`📸 Capturing: ${filename} from ${url}...`);
    try {
      await page.goto(url, { waitUntil: 'load', timeout: 30000 });
    } catch (e) {
      console.log(`Navigation load warning: ${e.message}`);
    }

    await page.waitForTimeout(options.wait || 2000);

    if (options.action) {
      try {
        await options.action(page);
      } catch (err) {
        console.error(`Action error on ${filename}:`, err.message);
      }
    }

    const savePath = path.join(SCREENSHOTS_DIR, filename);
    await page.screenshot({ path: savePath, fullPage: options.fullPage || false });
    console.log(`✅ Saved: ${filename}`);
  }

  // 11: Interactive Book Site Visit Modal (Open from /about-us)
  await capture(`${FRONTEND_URL}/about-us`, '11_site_visit_modal.png', {
    fullPage: false,
    wait: 2500,
    action: async (p) => {
      // Find "Book Site Visit" button
      const btn = await p.waitForSelector('button:has-text("Book Site Visit")', { timeout: 8000 });
      if (btn) {
        await btn.click();
        await p.waitForTimeout(2000);
      }
    },
  });

  // 12: WhatsApp Floating Action Button & Tooltip
  await capture(`${FRONTEND_URL}/`, '12_chat_widget.png', {
    fullPage: false,
    wait: 2500,
    action: async (p) => {
      // Hover over WhatsApp button to reveal tooltip
      const fab = await p.waitForSelector('.svnr-whatsapp-fab', { timeout: 5000 });
      if (fab) {
        await fab.hover();
        await p.waitForTimeout(1000);
      }
    },
  });

  // ─── ADMIN DASHBOARD CAPTURES ─────────────────────────────────

  // 13: Admin Login Portal
  await capture(`${ADMIN_URL}/login`, '13_admin_login.png', {
    fullPage: false,
    wait: 2000,
  });

  // Perform login
  console.log('🔑 Authenticating as administrator...');
  await page.goto(`${ADMIN_URL}/login`, { waitUntil: 'load', timeout: 30000 });
  await page.waitForTimeout(1500);
  await page.fill('input[type="email"]', 'svnr@constructions.com');
  await page.fill('input[type="password"]', 'svnrConstruction@1234');
  await page.click('button[type="submit"]');
  await page.waitForTimeout(4000);
  console.log(`🔐 Logged in! Current URL: ${page.url()}`);

  // 14: Admin Dashboard Overview
  await capture(`${ADMIN_URL}/`, '14_admin_dashboard.png', {
    fullPage: true,
    wait: 2500,
  });

  // 15: Bookings Management
  await capture(`${ADMIN_URL}/bookings`, '15_admin_bookings.png', {
    fullPage: true,
    wait: 2500,
  });

  // 16: Inquiries Lead Pipeline
  await capture(`${ADMIN_URL}/inquiries`, '16_admin_inquiries.png', {
    fullPage: true,
    wait: 2500,
  });

  // 17: Projects CRUD Manager
  await capture(`${ADMIN_URL}/projects`, '17_admin_projects.png', {
    fullPage: true,
    wait: 3000,
  });

  // 18: Testimonials Manager
  await capture(`${ADMIN_URL}/testimonials`, '18_admin_testimonials.png', {
    fullPage: true,
    wait: 2500,
  });

  // 19: Founders & Leadership Manager
  await capture(`${ADMIN_URL}/founders`, '19_admin_founders.png', {
    fullPage: true,
    wait: 2500,
  });

  // 20: Real-time Stats Manager
  await capture(`${ADMIN_URL}/stats`, '20_admin_stats.png', {
    fullPage: true,
    wait: 2500,
  });

  await browser.close();
  console.log('🎉 All admin and interactive screenshots captured successfully!');
}

run().catch((err) => {
  console.error('❌ Error during capture:', err);
  process.exit(1);
});
