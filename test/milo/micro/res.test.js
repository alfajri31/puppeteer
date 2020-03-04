 // PREPEARING
let init = require('../../initialize')
require('../../initialize').page
require('../../initialize').browser

let dir= path.join(__dirname,'../../../Renders/Unit/milo/'+res_mobile)
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
    await page.setViewport({
        width: width,
        height: height
    })
    name = name
    email = email
    password = password
    confirm_password = confirm_pass
    await page.setUserAgent(useragent)
  },90000);

  beforeEach(async()=>{
    await page.setViewport({
      width: width,
      height: height
  })
  })


afterAll(() => {
    browser.close()
})
  // START TO TESTING
  describe("e2e testing",() => {

    test("testing responsive", async () => { 
      await page.goto('https://milo.mrmbdg.com/product/',{waitUntil: 'networkidle2'})
      await init.src_height().then(async (value)=>{
          await page.setViewport({width: width,height : value})
          await page.screenshot({
              path: path.join(__dirname,'../../../Renders/Unit/milo/'+res_mobile+'/get beranda.png'),
              fullpage: true,
              waitUntil : 'networkidle2'
          })
      }) 
    },100000)

    test("testing responsive", async () => { 
      await page.goto('https://milo.mrmbdg.com/product/detail.php',{waitUntil: 'networkidle2'})
      await init.src_height().then(async (value)=>{
          await page.setViewport({width: width,height : value})
          await page.screenshot({
              path: path.join(__dirname,'../../../Renders/Unit/milo/'+res_mobile+'/get detail.png'),
              fullpage: true,
              waitUntil : 'networkidle2'
          })
      }) 
    },100000)

    test("testing responsive", async () => { 
      await page.goto('https://milo.mrmbdg.com/product/category-detail.php',{waitUntil: 'networkidle2'})
      await init.src_height().then(async (value)=>{
          console.log(value)
          await page.setViewport({width: width,height : value})
          await page.screenshot({
              path: path.join(__dirname,'../../../Renders/Unit/milo/'+res_mobile+'/get category-detail.png'),
              fullpage: true,
              waitUntil : 'networkidle2'
          })
      }) 
    },100000)
    


  });

  

  
