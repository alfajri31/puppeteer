 // PREPEARING
 let init = require('../../initialize')
require('../../initialize').page
require('../../initialize').browser

const CHAR_SETS = {
  A: '0123456789',
  B: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  K: 'abcdefghijklmnopqrstuvwxyz',
  S: '!@#$%^&*()_+'
};
function mapString(s, func) {
  return Array.prototype.map.call(s, func).join('')
}
let dir= path.join(__dirname,'../../../Renders/Unit/'+resolusi)
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

afterAll(() => {
    browser.close()
})
  // START TO TESTING
  describe("e2e testing",() => {
    test("testing responsive", async() => { 
      await page.goto('https://milo.mrmbdg.com/product/')
      await page.waitForFunction(
        'document.querySelector("body").innerText.includes("MILO Bubuk")',{timeout: 20000}
      );
      init.src_height().then(async (value)=>{
        await page.setViewport({width: width,height : value})
        await page.screenshot({
          path: path.join(__dirname,'../../../Renders/Unit/'+resolusi+'/Beranda.png'),
          fullpage: true,
          waitUntil :'networkidle2'
        })
      })     
    },100000)

    test('testing responsive',async() => {
        await page.goto('https://milo.mrmbdg.com/product/detail.php')
        await page.waitForFunction(
          'document.querySelector("body").innerText.includes("Nutritional Info")',{timeout: 20000}
        );
        init.src_height().then(async (value)=>{
          await page.setViewport({width: width,height : value})
          await page.screenshot({
            path: path.join(__dirname,'../../../Renders/Unit/'+resolusi+'/Beranda II.png'),
            fullpage: true,
            waitUntil :'networkidle2'
          })
        })
    },10000)

  });

  

  
