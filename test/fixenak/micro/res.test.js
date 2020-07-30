 // PREPEARING
 let init = require('../../initialize')
 require('../../initialize').page
 require('../../initialize').browser
 const playwright = require('playwright');
 let browserType




 
 beforeAll(async() => {
    for (browserType of ['chromium']) {
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
       await page.goto('https://nutea.co.id/',{waitUntil: 'networkidle2'})
       await page.waitFor(60000)
       await init.optmimal_ss('fixenak','Laptop','HOME',1440,browserType)
       await init.optmimal_ss('fixenak','Mobile','HOME',360,browserType)
     },100000)

     test("testing exclusivelockscreen layout", async () => { 
      console.log(browserType)
      await page.goto('https://nutea.co.id/exclusivelockscreen',{waitUntil: 'networkidle2'})
      await page.waitFor(60000)
      await init.optmimal_ss('fixenak','Laptop','exclusivelockscreen',1440,browserType)
      await init.optmimal_ss('fixenak','Mobile','exclusivelockscreen',360,browserType)
    },100000)

    test("testing syaratdanketentuan layout", async () => { 
      console.log(browserType)
      await page.goto('https://nutea.co.id/exclusivelockscreen-tnc',{waitUntil: 'networkidle2'})
      await page.waitFor(60000)
      await init.optmimal_ss('fixenak','Laptop','syaratdanketentuan',1440,browserType)
      await init.optmimal_ss('fixenak','Mobile','syaratdanketentuan',360,browserType)
    },100000)

    test("testing syaratdanketentuan layout", async () => { 
      console.log(browserType)
      await page.goto('https://nutea.co.id/exclusivelockscreen-form',{waitUntil: 'networkidle2'})
      await page.waitFor(60000)
      await init.optmimal_ss('fixenak','Laptop','exclusivelockscreen-form',1440,browserType)
      await init.optmimal_ss('fixenak','Mobile','exclusivelockscreen-form',360,browserType)
    },100000)

   });
 
   
 
   
 