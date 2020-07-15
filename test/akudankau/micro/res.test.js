 // PREPEARING
 let init = require('../../initialize')
 require('../../initialize').page
 require('../../initialize').browser
 const playwright = require('playwright');
 let browserType

 
 beforeAll(async() => {
    for (browserType of ['webkit']) {
      browser = await playwright[browserType].launch({  
        headless: headless
      });
      const context = await browser.newContext();
      page = await context.newPage();
    }
},90000);
 
beforeEach(async()=>{
    await page.setViewportSize({
      width: 1440,
      height: height_mac
  })
})
 
 afterAll(() => {
     browser.close()
 })
   // START TO TESTING
   describe("micro testing",() => {
     test("testing home layout", async () => { 
       console.log(browserType)
       await page.goto('https://dpc.wtid.dev/dongengakudankau',{waitUntil: 'networkidle2'})
       await page.waitFor(20000)
       await init.optmimal_ss('akudankau','Laptop','HOME',1440,browserType)
       await init.optmimal_ss('akudankau','Mobile','HOME',360,browserType)
     },100000)
   });
 
   
 
   
 