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
        headless: false,
        args: [ '--ignore-certificate-errors' ]
    })
    page = await browser.newPage()
    await page.authenticate({ 
        username: 'grt' , 
        password:'pina2019' 
    });
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
    await browser.close()
})

  // START TO TESTING
  describe("unit testing",() => {
    test("user input the code", async() => { 
        await page.goto('https://nukrazytea.mrmbdg.com/')
        await page.waitFor(3000)
        await page.screenshot({
            path: path.join(__dirname,'../../../Renders/Unit/'+resolusi+'/get nutea.png'),
            fullpage: true,
            waitUntil :'networkidle2'
        })
        await page.type('input[id="unique_code"]',unique_codes())
        console.log(unique_codes())
        await page.waitForSelector('button[id="submitCode"]', {visible: true,timeout: 60000});
        await page.waitFor(3000)
        await page.click('button[id="submitCode"]')
        await page.waitForSelector('button[id="setujuPopupTerm"]', {visible: true,timeout: 60000});
        await page.waitFor(3000)
        await page.click('button[id="setujuPopupTerm"]')
        const setuju = await page.$eval('button[id="setujuPopupTerm"]', el => el.innerText);
        await expect(setuju).toMatch('Setuju');   
        await page.waitFor(3000)  
        await page.screenshot({
            path: path.join(__dirname,'../../../Renders/Unit/'+resolusi+'/post input unique_code.png'),
            fullpage: true,
            waitUntil :'networkidle2'
        })
        pageTitle = await page.title()
      await expect(pageTitle).toMatch('NuKrazy - Prize')
    },100000)

    test("user login",async () => {
      await page.goto('https://nukrazytea.mrmbdg.com/login')
      await page.waitFor(3000)
      await page.screenshot({
          path: path.join(__dirname,'../../../Renders/Unit/'+resolusi+'/get login nutea.png'),
          fullpage: true,
          waitUntil :'networkidle2'
      })
      await page.type('input[id="username"]',name+'9')
      await page.type('input[id="password"]',password)
      await page.waitFor(3000)
      await page.screenshot({
        path: path.join(__dirname,'../../../Renders/Unit/'+resolusi+'/post login nutea.png'),
        fullpage: true,
        waitUntil :'networkidle2'
      })
      pageTitle = await page.title()
      await expect(pageTitle).toMatch('NuKrazy - Game')
    },90000)

    test('user can register through free trial',async() => {
      await page.goto('https://nukrazytea.mrmbdg.com/')
      await page.click('a[href="/register"]')
      await page.waitForSelector('input[id="name"]', {visible: true,timeout: 60000});
      await page.waitFor(3000)
      await page.screenshot({
        path: path.join(__dirname,'../../../Renders/Unit/'+resolusi+'/get register nutea free trial.png'),
        fullpage: true,
        waitUntil :'networkidle2'
      })
      await page.type('input[name="name"]',name)
      await page.type('input[name="phone"]',mapString('08AAAAAAAAAA', randChar))
      await page.type('input[name="username"]',name+'9')
      await page.type('input[name="email"]',name+'@mailinator.com')
      await page.type('input[name="password"]',password)
      await page.click('input[id="termCheck"]');
      await page.waitFor(3000)
      await page.click('button[type="submit"]')
      try {
        await page.waitForSelector('div[class="token"]', {visible: true,timeout: 30000});
        await page.waitFor(3000)
        await page.screenshot({
          path: path.join(__dirname,'../../../Renders/Unit/'+resolusi+'/post register nutea free trial.png'),
          fullpage: true,
          waitUntil :'networkidle2'
        })
      }
      catch(err) {
        await page.screenshot({
          path: path.join(__dirname,'../../../Renders/Unit/'+resolusi+'/post register nutea free trial.png'),
          fullpage: true,
          waitUntil :'networkidle2'
        })
      }
    },90000)

  });

  

  
