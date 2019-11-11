// PREPEARING
require('../../initialize')
require('../../initialize').page

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
      var result = jsonQuery('unique_code[*period=KFAKE1].code', {data: obj}).value
    
      //go to the random true code 
      const values = Object.values(result)
      return randomValue = values[parseInt(Math.random() * values.length)]

}

let dir= path.join(__dirname,'../../Renders/Unit/'+resolusi)
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
        // slowMo: 20,
        // executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
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
    // await page.emulate(device)
    name = name
    email = email
    password = password
    confirm_password = confirm_pass
    await page.setUserAgent(useragent)
  });

afterAll(async() => {
    await browser.close()
})
  // START TO TESTING
  describe("skenario 1",() => {

    test("Input code", async() => { 
        await page.waitFor(3000)
        await page.goto('https://nukrazytea.mrmbdg.com/')
        await page.screenshot({
            path: path.join(__dirname,'../../Renders/Unit/'+resolusi+'/get nutea.png'),
            fullpage: true,
            waitUntil :'networkidle2'
        })
        await page.type('input[id="unique_code"]',unique_codes())
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
            path: path.join(__dirname,'../../Renders/Unit/'+resolusi+'/post input unique_code.png'),
            fullpage: true,
            waitUntil :'networkidle2'
        })
    },100000)

    test("registrasi user", async() => { 
      await page.waitFor(3000)
      await page.goto('https://nukrazytea.mrmbdg.com/register')
      await page.waitForSelector('input[name="name"]', {visible: true,timeout: 60000});
      await page.waitFor(3000)
      await page.screenshot({
        path: path.join(__dirname,'../../Renders/Unit/'+resolusi+'/get register nutea.png'),
        fullpage: true,
        waitUntil :'networkidle2'
      })
      await page.type('input[name="name"]',name)
      await page.type('input[name="phone"]',mapString('08AAAAAAAAAA', randChar))
      await page.type('input[name="username"]',name+'9')
      await page.type('input[name="email"]',name+'@mailinator.com')
      await page.type('input[name="password"]',password)
      await page.click('input[id="termCheck"]');
      await page.click('button[type="submit"]')
      await page.waitFor(3000)
      await page.screenshot({
        path: path.join(__dirname,'../../Renders/Unit/'+resolusi+'/post register nutea.png'),
        fullpage: true,
        waitUntil :'networkidle2'
      })
      const request = page.url()
      const cookie = await page.cookies(request)
      fs.writeFileSync('./nutea',JSON.stringify(cookie), function(err) {
          if (err) {
            console.log(err);
          }
      })
    },100000)

    test("login user", async() => {
      await page.waitFor(3000)
      await page.goto('https://nukrazytea.mrmbdg.com/login')
      await page.screenshot({
        path: path.join(__dirname,'../../Renders/Unit/'+resolusi+'/get login nutea.png'),
        fullpage: true,
        waitUntil :'networkidle2'
      }) 
      await page.type('input[name="username"]',name+'9')
      await page.type('input[name="password"]',password) 
      await page.click('button[type="submit"]') 
      await page.waitFor(3000)
      await page.screenshot({
        path: path.join(__dirname,'../../Renders/Unit/'+resolusi+'/post login nutea.png'),
        fullpage: true,
        waitUntil :'networkidle2'
      }) 
    },90000)

    test("top up token di profil", async() => {
      await page.waitFor(3000)
      await page.goto('https://nukrazytea.mrmbdg.com/profil')
      await page.screenshot({
        path: path.join(__dirname,'../../Renders/Unit/'+resolusi+'/get profil nutea.png'),
        fullpage: true,
        waitUntil :'networkidle2'
      }) 
      await page.waitForSelector('a[href="/topuptoken"]', {visible: true,timeout: 60000});
      await page.waitFor(3000)
      await page.click('a[href="/topuptoken"]')
      await page.waitForSelector('input[id="unique_code"]', {visible: true,timeout: 60000});
      await page.waitFor(3000)
      await page.screenshot({
        path: path.join(__dirname,'../../Renders/Unit/'+resolusi+'/get token profil nutea.png'),
        fullpage: true,
        waitUntil :'networkidle2'
      }) 
      await page.type('input[id="unique_code"]',unique_codes())
      await page.waitForSelector('button[id="submitCode"]', {visible: true,timeout: 60000});
      await page.waitFor(3000)
      await page.click('button[id="submitCode"]')
      await page.waitFor(3000)
      await page.screenshot({
        path: path.join(__dirname,'../../Renders/Unit/'+resolusi+'/post token profil nutea.png'),
        fullpage: true,
        waitUntil :'networkidle2'
      }) 
    },90000)    
  });

  

  
