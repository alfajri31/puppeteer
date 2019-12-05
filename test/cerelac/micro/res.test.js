// PREPEARING
require('../../initialize')
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
      await page.screenshot({
        path: path.join(__dirname,'../../../Renders/Unit/'+resolusi+'/landing page.png'),
        fullpage: true,
        waitUntil :'networkidle2'
      })
      
      await page.goto('https://www.awalsehat.nestle.co.id/cerelacmamamyuk#beranda')
      await page.waitForFunction(
        'document.querySelector("body").innerText.includes("Promo CERELAC, Belanja Yuk!")',{timeout: 20000}
      );
      await page.screenshot({
        path: path.join(__dirname,'../../../Renders/Unit/'+resolusi+'/beranda.png'),
        fullpage: true,
        waitUntil :'networkidle2'
      })

      await page.goto('https://www.awalsehat.nestle.co.id/mamamyukplanner')
      await page.waitForFunction(
        'document.querySelector("body").innerText.includes("Menentukan nutrisi dari makanan yang dikonsumsi Si Kecil setiap harinya adalah hal yang penting supaya mendukung tumbuh kembangnya. Di sini Ibu bisa menemukan makanan yang tepat untuk dikonsumsi Si Kecil")',{timeout: 20000}
      );
      await page.screenshot({
        path: path.join(__dirname,'../../../Renders/Unit/'+resolusi+'/mamayukplanner.png'),
        fullpage: true,
        waitUntil :'networkidle2'
      })

      await page.goto('https://www.awalsehat.nestle.co.id/experts')
      await page.waitForFunction(
        'document.querySelector("body").innerText.includes("Hubungi Ahli ")',{timeout: 20000}
      );
      await page.screenshot({
        path: path.join(__dirname,'../../../Renders/Unit/'+resolusi+'/ahli gizi.png'),
        fullpage: true,
        waitUntil :'networkidle2'
      })

      await page.goto('https://connect.sahabatnestle.co.id/sso/auth/register?response_type=code&client_id=12_5fmup40d13swoo8k4okkg08cowcko444wks4owwgo4c8kksk80&redirect_uri=https%3A//www.awalsehat.nestle.co.id/nin-sso-login/callback&scope=user&utm_source=astswebsite&utm_medium=link&utm_campaign=registration')
      await page.waitForFunction(
        'document.querySelector("body").innerText.includes("Registrasi")',{timeout: 20000}
      );
      await page.screenshot({
        path: path.join(__dirname,'../../../Renders/Unit/'+resolusi+'/daftar disini.png'),
        fullpage: true,
        waitUntil :'networkidle2'
      })

      await page.goto('https://connect.sahabatnestle.co.id/sso/auth/login?response_type=code&client_id=12_5fmup40d13swoo8k4okkg08cowcko444wks4owwgo4c8kksk80&redirect_uri=https%3A%2F%2Fwww.awalsehat.nestle.co.id%2Fnin-sso-login%2Fcallback&scope=user')
      await page.waitForFunction(
        'document.querySelector("body").innerText.includes("Masuk")',{timeout: 20000}
      );
      await page.screenshot({
        path: path.join(__dirname,'../../../Renders/Unit/'+resolusi+'/masuk.png'),
        fullpage: true,
        waitUntil :'networkidle2'
      })

      await page.goto('https://www.awalsehat.nestle.co.id/contact')
      await page.waitForFunction(
        'document.querySelector("body").innerText.includes("Kami siap membantu & menjawab pertanyaan Anda")',{timeout: 20000}
      );
      await page.screenshot({
        path: path.join(__dirname,'../../../Renders/Unit/'+resolusi+'/hubungi kami.png'),
        fullpage: true,
        waitUntil :'networkidle2'
      })
    },100000)

  });

  

  
