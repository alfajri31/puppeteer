 // PREPEARING
 let init = require('../../initialize')
 require('../../initialize').page
 require('../../initialize').browser
 
 beforeAll(async() => {
     browser = await puppeteer.launch({
         headless: false,
         executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        //  executablePath: path.join(__dirname,'../','../','../','/node_modules/puppeteer/.local-chromium/MacOS/Chromium'),
         args: [ '--ignore-certificate-errors','--no-sandbox']
     })
     page = await browser.newPage()
     await page.setViewport({width: width_laptop,height: height_laptop});
//    beforeEach(async()=>{
//      await page.setViewport({
//        width: width,
//        height: height
//    })
},10000)
 
 afterAll(() => {
     browser.close()
 })

// START TO TESTING
describe("load testing",() => {
    test("testing video running", async () => { 
        console.log(__dirname)
        await page.goto('https://wondr.space/milo-pmgm/',{waitUntil: 'networkidle2'})
        await page.waitForFunction(
            'document.querySelector("body").innerText.includes("PLAY")',{timeout: 660000}
        );
        await page.click('button[class="vjs-control vjs-button vjs-custom-play-button"]')
        await page.waitForFunction(
            'document.querySelector("body").innerText.includes("true")',{timeout: 660000}
        );
        await page.click('button[class="vjs-control vjs-button vjs-custom-opt-button-true"]')
        await page.waitForFunction(
            'document.querySelector("body").innerText.includes("true")',{timeout: 660000}
        );
        await page.click('button[class="vjs-control vjs-button vjs-custom-opt-button-true"]')
        await page.waitForFunction(
            'document.querySelector("body").innerText.includes("true")',{timeout: 660000}
        );
        await page.click('button[class="vjs-control vjs-button vjs-custom-opt-button-true"]')
    },100000);
})
 
   
 
   
 