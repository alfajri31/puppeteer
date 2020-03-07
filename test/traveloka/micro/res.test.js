 // PREPEARING
 let init = require('../../initialize')
 require('../../initialize').page
 require('../../initialize').browser


 
 beforeAll(async() => {
     browser = await puppeteer.launch({
         headless: headless,
         args: [ '--ignore-certificate-errors' ]
     })
     page = await browser.newPage()
     await page.setUserAgent(useragent)
},90000);
 
beforeEach(async()=>{
    await page.setViewport({
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
       await page.goto('http://159.65.142.237:3000/',{waitUntil: 'networkidle2'})
       await page.waitFor(8000)
       await init.optmimal_ss('traveloka','Laptop','HOME',1440)
       await init.optmimal_ss('traveloka','Mobile','HOME',360)
     },100000)

     test("testing live traveloka layout", async () => { 
      await page.goto('http://159.65.142.237:3000/traveloka-life',{waitUntil: 'networkidle2'})
      await page.waitFor(5000)
      await init.optmimal_ss('traveloka','Laptop','LIVE AT TRAVELOKA',1440)
      await init.optmimal_ss('traveloka','Mobile','LIVE AT TRAVELOKA',360)
     
    },100000)

    test("testing student-graduate accelecation program layout", async () => { 
      await page.goto('http://159.65.142.237:3000/student-graduate/acceleration-program',{waitUntil: 'networkidle2'})
      await page.waitFor(5000)
      await init.optmimal_ss('traveloka','Laptop','STUNDENT PMAP',1440)
      await init.optmimal_ss('traveloka','Mobile','STUNDET PMAP',360)
      
    },100000)

    test("testing student-graduate intership layout", async () => { 
      await page.goto('http://159.65.142.237:3000/student-graduate/internship-program',{waitUntil: 'networkidle2'})
      await page.waitFor(5000)
      await init.optmimal_ss('traveloka','Laptop','STUNDENT INERSHIP',1440)
      await init.optmimal_ss('traveloka','Mobile','STUNDENT INTERSHIP',360)
    
    },100000)

    test("testing vacancies layout", async () => { 
      await page.goto('http://159.65.142.237:3000/vacancies',{waitUntil: 'networkidle2'})
      await page.waitFor(5000)
      await init.optmimal_ss('traveloka','Laptop','JOBS',1440)
      await init.optmimal_ss('traveloka','Mobile','JOBS',360)
    },100000)
   });
 
   
 
   
 