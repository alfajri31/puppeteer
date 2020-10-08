const playwright = require('playwright');
const path = require('path');
 
(async () => {
  for (const browserType of ['webkit']) {
    const browser = await playwright[browserType].launch({
      args: ['--no-sandbox']
    });
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('http://whatsmyuseragent.org/');
    await page.screenshot({ path: `example-${browserType}.png` });
    await browser.close();
  }
})();