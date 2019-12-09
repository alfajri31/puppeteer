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
function randChar(charType) {
  var chars = CHAR_SETS[charType];
  if (chars) {
      return chars.charAt(parseInt(Math.random() * chars.length));
  } else {
      return charType;
  }
}

function unique_codes() {
    const source = fs.readFileSync('./codes/unique_codes.json', 'utf8', (err, jsonString) => {
        if (err) {
            return
        }
        else {
          return jsonString;
        }
      }) 
      const code = JSON.parse(source) 
    
      const obj = {
        unique_code: code
      }
      var result = jsonQuery('unique_code[*period=TFAKE1].code', {data: obj}).value
    
      //go to the random true code 
      const values = Object.values(result)
      return randomValue = values[parseInt(Math.random() * values.length)]
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

afterAll(async() => {
    // await browser.close()
})
  // START TO TESTING
  describe("e2e testing",() => {
    test("testing responsive", async() => { 
      await page.goto('http://cerelac.mrmbdg.com/risenutri.php')
      await page.waitForFunction(
        'document.querySelector("body").innerText.includes("Dengan Tekstur yang Pas")',{timeout: 20000}
      );
      init.src_height().then(async (value)=>{
        await page.setViewport({width: width,height : value})
        await page.screenshot({
          path: path.join(__dirname,'../../../Renders/Unit/'+resolusi+'/landing page.png'),
          fullpage: true,
          waitUntil :'networkidle2'
        })
      })     
    },100000)

  });

  

  
