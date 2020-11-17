
 // PREPEARING
 let init = require('../../initialize');
 const playwright = require('playwright');
 
 require('../../initialize').page
 require('../../initialize').browser
 

 init.clear_dir('Laptop')
 init.clear_dir('Mobile')


 beforeAll(async() => {
    for (browserType of ['chromium']) {
      browser = await playwright[browserType].launch({
        headless: headless,
        args: ['--no-sandbox']
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
 
 afterAll(async () => {
     await browser.close()
 })
   // START TO TESTING
   describe("micro testing",() => {
     test("testing home layout", async () => { 
       console.log(browserType)
       await page.goto('http://159.65.142.237:3000/',{waitUntil: 'networkidle2'})
       await page.waitFor(8000)
       await init.optmimal_ss('traveloka','Laptop','HOME',1440,browserType)
       await init.optmimal_ss('traveloka','Mobile','HOME',360,browserType)
     },100000)

     test("testing live traveloka layout", async () => { 
      await page.goto('http://159.65.142.237:3000/traveloka-life',{waitUntil: 'networkidle2'})
      await page.waitFor(5000)
      await init.optmimal_ss('traveloka','Laptop','LIVE AT TRAVELOKA',1440,browserType)
      await init.optmimal_ss('traveloka','Mobile','LIVE AT TRAVELOKA',360,browserType)
     
    },100000)

    test("testing student-graduate accelecation program layout", async () => { 
      await page.goto('http://159.65.142.237:3000/student-graduate/acceleration-program',{waitUntil: 'networkidle2'})
      await page.waitFor(5000)
      await init.optmimal_ss('traveloka','Laptop','STUNDENT PMAP',1440,browserType)
      await init.optmimal_ss('traveloka','Mobile','STUNDET PMAP',360,browserType)
      
    },100000)

    test("testing student-graduate intership layout", async () => { 
      await page.goto('http://159.65.142.237:3000/student-graduate/internship-program',{waitUntil: 'networkidle2'})
      await page.waitFor(5000)
      await init.optmimal_ss('traveloka','Laptop','STUNDENT INERSHIP',1440,browserType)
      await init.optmimal_ss('traveloka','Mobile','STUNDENT INTERSHIP',360,browserType)
    
    },100000)

    test("testing vacancies layout", async () => { 
      await page.goto('http://159.65.142.237:3000/vacancies',{waitUntil: 'networkidle2'})
      await page.waitFor(5000)
      await init.optmimal_ss('traveloka','Laptop','JOBS',1440,browserType)
      await init.optmimal_ss('traveloka','Mobile','JOBS',360,browserType)
    },100000)
   });
 
   
 
   
 