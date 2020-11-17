const puppeteer = require('puppeteer');

(async() => {
        const browser = await puppeteer.launch(
            {
                headless: true
            }
        );
        const page = await browser.newPage();
        await page.authenticate({ 
            username: 'grt' , 
            password:'pina2019' 
        });
        await page.goto('http://pinaapp.id/',{waitUntil:'networkidle2'});
        console.log('success')
        await page.screenshot({path: 'example.png'});
        await page.close();
        await browser.close();
        await browser.disconnect()
        let shell = require('shelljs');
        shell.exec('pkill Chromium')
})();