const puppeteer = require('puppeteer');

(async() => {
const browser = await puppeteer.launch();

try {
    const page = await browser.newPage();
    await page.goto('https://nukrazytea.mrmbdg.com/');
    console.log('success')
    await page.screenshot({path: 'example.png'});
    browser.close();
    browser.disconnect()
}
catch(err) {
    console.log('failed')
    await page.screenshot({path: 'error.png'});
    browser.close();
    browser.disconnect()
}

},10000)();