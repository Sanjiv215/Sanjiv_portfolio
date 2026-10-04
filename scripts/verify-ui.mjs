import { chromium } from "playwright";
import http from "http";

async function main() {
  const browser = await chromium.launch();
  const results = [];

  for (const [w, h, name] of [
    [1440, 900, "desktop"],
    [390, 844, "mobile"],
  ]) {
    const page = await browser.newPage({ viewport: { width: w, height: h } });
    const consoleErrors = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });
    page.on("pageerror", (err) => consoleErrors.push(err.message));

    await page.goto("http://localhost:3005", { waitUntil: "networkidle" });
    await page.waitForTimeout(500);

    // Scroll through to trigger all IntersectionObservers
    await page.evaluate(async () => {
      const distance = 400;
      const delay = 100;
      while (document.scrollingElement.scrollTop + window.innerHeight < document.scrollingElement.scrollHeight) {
        document.scrollingElement.scrollBy(0, distance);
        await new Promise((r) => setTimeout(r, delay));
      }
      await new Promise((r) => setTimeout(r, 400));
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 400));
    });

    const isNoOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth === window.innerWidth;
    });

    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const innerWidth = await page.evaluate(() => window.innerWidth);

    await page.screenshot({ path: `screenshot-${name}.png`, fullPage: true });

    results.push({
      name,
      viewport: `${w}x${h}`,
      scrollWidth,
      innerWidth,
      isNoOverflow,
      consoleErrors,
    });
    await page.close();
  }

  await browser.close();
  console.log(JSON.stringify(results, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
