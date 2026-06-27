const { chromium, devices } = require("playwright");
const fs = require("fs");
const path = require("path");

const LIVE_DEMO_URL =
  process.env.SCREENSHOT_URL || "https://drive-radar-dmv.vercel.app/";
const OUTPUT_DIR = path.join(__dirname, "..", "docs", "assets", "screenshots");

const SCREENSHOTS = [
  {
    filename: "homepage-desktop.png",
    label: "desktop",
    contextOptions: {
      viewport: { width: 1280, height: 800 }
    }
  },
  {
    filename: "homepage-mobile.png",
    label: "mobile",
    contextOptions: {
      ...devices["iPhone 14"]
    }
  }
];

async function captureScreenshot(browser, { filename, label, contextOptions }) {
  const context = await browser.newContext(contextOptions);
  const page = await context.newPage();

  console.log(`Capturing ${label} screenshot from ${LIVE_DEMO_URL}`);

  await page.goto(LIVE_DEMO_URL, { waitUntil: "load", timeout: 60_000 });
  await page.waitForTimeout(1500);

  const outputPath = path.join(OUTPUT_DIR, filename);
  await page.screenshot({ path: outputPath, fullPage: true });

  await context.close();
  console.log(`Saved ${outputPath}`);
}

async function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const browser = await chromium.launch();

  try {
    for (const screenshot of SCREENSHOTS) {
      await captureScreenshot(browser, screenshot);
    }
  } finally {
    await browser.close();
  }

  console.log("\nDone. Commit the PNG files and uncomment images in README.md if needed.");
}

main().catch((error) => {
  console.error("Screenshot capture failed:", error.message);
  process.exit(1);
});
