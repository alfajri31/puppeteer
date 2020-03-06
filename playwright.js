// const playwright = require('playwright');
 
// (async () => {
//   for (const browserType of ['webkit']) {
//     const browser = await playwright[browserType].launch();
//     const context = await browser.newContext();
//     const page = await context.newPage();
//     await page.goto('http://whatsmyuseragent.org/');
//     await page.screenshot({ path: `example-${browserType}.png` });
//     await browser.close();
//   }
// })();

// const webkit = require('playwright');
 
// (async () => {
//   const browser = await webkit.launch();
//   const context = await browser.newContext({
//     viewport: iPhone11.viewport,
//     userAgent: iPhone11.userAgent,
//     geolocation: { longitude: 12.492507, latitude: 41.889938 },
//     permissions: { 'https://www.google.com': ['geolocation'] }
//   });
//   const page = await context.newPage();
//   await page.goto('https://maps.google.com');
//   await page.click('text="Your location"');
//   await page.waitForRequest(/.*preview\/pwa/);
//   await page.screenshot({ path: 'colosseum-iphone.png' });
//   await browser.close();
// })();