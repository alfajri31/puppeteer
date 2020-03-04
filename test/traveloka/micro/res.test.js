 // PREPEARING
 let init = require('../../initialize')
 require('../../initialize').page
 require('../../initialize').browser

 

 let dir= path.join(__dirname,'../../../Renders/Unit/traveloka/'+res_mac)
 fs.readdir(dir, (err, files) => {
     for (const file of files) {
         fs.unlink(path.join(dir, file), err => {
           if (err) throw err;
         });
     }
 })
 
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
      width: width_mac,
      //width: 1440,
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
       await scrollPageToBottom(page)
       await page.evaluate(_ => {
           window.scrollTo(0, 0);
       });
      //  await page.waitFor(5000)
       await init.src_height().then(async (value)=>{
          // console.log(value)
          //await page.setViewport({width: width_mac,height : 4193})
           await page.setViewport({width: width_mac,height : value})
           await page.waitFor(5000)
           await page.screenshot({
               path: path.join(__dirname,'../../../Renders/Unit/traveloka/'+res_mac+'/HOME.png'),
               fullpage: true,
               waitUntil : 'networkidle2'
           })
       })
      await page.setViewport({
        width: width_mobile,
        height: height_mobile
      })
       await init.src_height().then(async (value)=>{
         await page.setViewport({width: width_mobile,height : value})
         await page.waitFor(5000)
         await page.screenshot({
             path: path.join(__dirname,'../../../Renders/Unit/traveloka/'+res_mobile+'/HOME.png'),
             fullpage: true,
             waitUntil : 'networkidle2'
         })
      })  
     },100000)

    //  test("testing live traveloka layout", async () => { 
    //   await page.goto('http://159.65.142.237:3000/traveloka-life',{waitUntil: 'networkidle2'})
    //   await page.waitFor(5000)
    //   await scrollPageToBottom(page)
    //   await page.evaluate(_ => {
    //     window.scrollTo(0, 0);
    //   });
    //   await init.src_height().then(async (value)=>{
    //      // console.log(value)
    //      // await page.setViewport({width: width_mac,height : 4414})
    //      await page.setViewport({width: width_mac,height : value})
    //       await page.waitFor(5000)
    //       await page.screenshot({
    //           path: path.join(__dirname,'../../../Renders/Unit/traveloka/'+res_mac+'/LIVE AT TRAVELOKA.png'),
    //           fullpage: true,
    //           waitUntil : 'networkidle2'
    //       })
    //   })
    //   await page.setViewport({
    //     width: width_mobile,
    //     height: height_mobile
    //   })
    //   await init.src_height().then(async (value)=>{
    //     // console.log(value)
    //     //await page.setViewport({width: width_mac,height : 4193})
    //      await page.setViewport({width: width_mobile,height : value})
    //      await page.waitFor(5000)
    //      await page.screenshot({
    //          path: path.join(__dirname,'../../../Renders/Unit/traveloka/'+res_mobile+'/LIVE AT TRAVELOKA.png'),
    //          fullpage: true,
    //          waitUntil : 'networkidle2'
    //      })
    //   })   
    // },100000)

    // test("testing student-graduate accelecation program layout", async () => { 
    //   await page.goto('http://159.65.142.237:3000/student-graduate/acceleration-program',{waitUntil: 'networkidle2'})
    //   await page.waitFor(5000)
    //   await scrollPageToBottom(page)
    //   await page.evaluate(_ => {
    //     window.scrollTo(0, 0);
    //   });
    //   await init.src_height().then(async (value)=>{
    //     //  console.log(value)
    //     // await page.setViewport({width: width_mac,height : 2724})
    //       await page.setViewport({width: width_mac,height : value})
    //       await page.waitFor(5000)
    //       await page.screenshot({
    //           path: path.join(__dirname,'../../../Renders/Unit/traveloka/'+res_mac+'/STUDENT PMAP.png'),
    //           fullpage: true,
    //           waitUntil : 'networkidle2'
    //       })
    //   })
    //   await page.setViewport({
    //     width: width_mobile,
    //     height: height_mobile
    //   })
    //   await init.src_height().then(async (value)=>{
    //     // console.log(value)
    //     //await page.setViewport({width: width_mac,height : 4193})
    //      await page.setViewport({width: width_mobile,height : value})
    //      await page.waitFor(5000)
    //      await page.screenshot({
    //          path: path.join(__dirname,'../../../Renders/Unit/traveloka/'+res_mobile+'/STUDENT PMAP.png'),
    //          fullpage: true,
    //          waitUntil : 'networkidle2'
    //      })
    //   })   
    // },100000)

    // test("testing student-graduate intership layout", async () => { 
    //   await page.goto('http://159.65.142.237:3000/student-graduate/internship-program',{waitUntil: 'networkidle2'})
    //   await page.waitFor(5000)
    //   await scrollPageToBottom(page)
    //   await page.evaluate(_ => {
    //     window.scrollTo(0, 0);
    //   });
    //   // await page.waitFor(5000)
    //   await init.src_height().then(async (value)=>{
    //     //  console.log(value)
    //     // await page.setViewport({width: width_mac,height : 2899})
    //       await page.setViewport({width: width_mac,height : value})
    //       await page.waitFor(5000)
    //       await page.screenshot({
    //           path: path.join(__dirname,'../../../Renders/Unit/traveloka/'+res_mac+'/STUDENT INTERSHIP 1.png'),
    //           fullpage: true,
    //           waitUntil : 'networkidle2'
    //       })
    //   })
    //   await page.setViewport({
    //     width: width_mobile,
    //     height: height_mobile
    //   })
    //   await init.src_height().then(async (value)=>{
    //     // console.log(value)
    //     //await page.setViewport({width: width_mac,height : 4193})
    //      await page.setViewport({width: width_mobile,height : value})
    //      await page.waitFor(5000)
    //      await page.screenshot({
    //          path: path.join(__dirname,'../../../Renders/Unit/traveloka/'+res_mobile+'/STUDENT INTERSHIP 1.png'),
    //          fullpage: true,
    //          waitUntil : 'networkidle2'
    //      })
    //   })   
    // },100000)

    // test("testing vacancies layout", async () => { 
    //   await page.goto('http://159.65.142.237:3000/vacancies',{waitUntil: 'networkidle2'})
    //   await page.waitFor(5000)
    //   await scrollPageToBottom(page)
    //   await page.evaluate(_ => {
    //     window.scrollTo(0, 0);
    //   });
    //   await page.waitFor(5000)
    //   await init.src_height().then(async (value)=>{
    //     //  console.log(value)
    //       await page.setViewport({width: width_mac,height : value})
    //       await page.waitFor(5000)
    //       await page.screenshot({
    //           path: path.join(__dirname,'../../../Renders/Unit/traveloka/'+res_mac+'/JOBS.png'),
    //           fullpage: true,
    //           waitUntil : 'networkidle2'
    //       })
    //   })
    //   await page.setViewport({
    //     width: width_mobile,
    //     height: height_mobile
    //   })
    //   await init.src_height().then(async (value)=>{
    //     // console.log(value)
    //     //await page.setViewport({width: width_mac,height : 4193})
    //      await page.setViewport({width: width_mobile,height : value})
    //      await page.waitFor(5000)
    //      await page.screenshot({
    //          path: path.join(__dirname,'../../../Renders/Unit/traveloka/'+res_mobile+'/JOBS.png'),
    //          fullpage: true,
    //          waitUntil : 'networkidle2'
    //      })
    //   })   
    // },100000)

   });
 
   
 
   
 