 // PREPEARING
 let init = require('../../initialize')
 require('../../initialize').page
 require('../../initialize').browser
 const playwright = require('playwright');

 

 let dir= path.join(__dirname,'../../../Renders/Unit/olx/'+res_mac)
 fs.readdir(dir, (err, files) => {
     for (const file of files) {
         fs.unlink(path.join(dir, file), err => {
           if (err) throw err;
         });
     }
 })
 
 beforeAll(async() => {

      for (const browserType of ['webkit']) {
        browser = await playwright[browserType].launch({
          headless: false
        });
        const context = await browser.newContext();
        page = await context.newPage();
      }
    //  browser = await puppeteer.launch({
    //      headless: false,
    //      args: [ '--ignore-certificate-errors']
    //  })
    //  page = await browser.newPage()
    //  await page.setUserAgent(useragent)
},90000);
 
beforeEach(async()=>{
    await page.setViewportSize({
      width: width_mac,
      height: height_mac
  })
})
 
 afterAll(() => {
     browser.close()
 })
   // START TO TESTING
   describe("micro testing",() => {
     test("testing home layout", async () => { 
       await page.goto('https://www.olx.co.id',{waitUntil: 'networkidle2'})
       await page.waitFor(8000)
       await scrollPageToBottom(page)
       await page.evaluate(_ => {
           window.scrollTo(0, 0);
       });
      //  await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });
      //  await page.waitFor(5000)
       await init.src_height().then(async (value)=>{
          // console.log(value)
          //await page.viewportSize({width: width_mac,height : 4193})
           await page.setViewportSize({width: width_mac,height : value})
           await page.waitFor(5000)
           await page.screenshot({
               path: path.join(__dirname,'../../../Renders/Unit/olx/'+res_mac+'/HOME.png'),
               fullpage: true,
               waitUntil : 'networkidle2'
           })
       })
      await page.setViewportSize({
        width: width_mobile,
        height: height_mobile
      })
       await init.src_height().then(async (value)=>{
         await page.setViewportSize({width: width_mobile,height : value})
         await page.waitFor(5000)
         await page.screenshot({
             path: path.join(__dirname,'../../../Renders/Unit/olx/'+res_mobile+'/HOME.png'),
             fullpage: true,
             waitUntil : 'networkidle2'
         })
      })  
     },100000)
   });
 
   
 
   
 