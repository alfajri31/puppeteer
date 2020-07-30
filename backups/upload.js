const puppeteer = require('puppeteer')
const path = require('path')
const fullPageScreenshot = require('puppeteer-full-page-screenshot')
let browser,page,input



(async() => {
    browser = await puppeteer.launch({
        headless: false,
        args: [ '--ignore-certificate-errors' ]
      })
      page = await browser.newPage()
      await page.setViewport({
          width: 1366,
          height: 768
      })
      
    await page.goto("https://gofile.io/?t=welcome")
    await page.waitFor(3000)
    const text = await page.waitForFunction('document.URL');
    const aa = await page.evaluate((text) => {
        return text
    },text)
    console.log(aa)
    await page.click('button[class="btn btn-lg"]')
    await page.waitFor(3000)
    await page.click('button[class="swal2-cancel btn"]')
    await page.waitFor(3000)
    var filePath = path.join(process.cwd()+'/sample1.png');
    console.log(filePath)
    var futureFileChooser = page.waitForFileChooser();
    await page.click('button[id="btnChooseFiles"]')
    const fileChooser = await futureFileChooser;
    await fileChooser.accept([filePath]);
    await page.waitFor(3000)
    await page.click('button[id="btnUpload"]')

})()


