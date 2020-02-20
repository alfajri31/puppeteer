const puppeteer = require('puppeteer')
const fullPageScreenshot = require('puppeteer-full-page-screenshot')
let browser,page,input

(async() => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto("http://example.com/");
 
    await fullPageScreenshot(page, { path: "./page.png" });
 
    await browser.close();
})()

