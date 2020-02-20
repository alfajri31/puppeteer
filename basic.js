(async() => {
    const puppeteer = require('puppeteer')
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://example.com');
    await page.screenshot({path: 'example.png'});
    const performanceMetrics = await page._client.send('Performance.getMetrics'); 
    console.log(performanceMetrics);
    console.log("success");
    browser.close();
})()