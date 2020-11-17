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

let dir= path.join(__dirname,'../../../Renders/Unit/nutea/'+resolusi)
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

afterAll(async () => {
    await browser.close()
})
  // START TO TESTING
  describe("e2e testing",() => {
    test("user input the code", async() => { 
        await page.waitFor(3000)
        await page.goto('https://nukrazytea.mrmbdg.com/',{waitUntil:'domcontentloaded'})
        await page.screenshot({
            path: path.join(__dirname,'../../../Renders/Unit/nutea/'+resolusi+'/get nutea.png'),
            fullpage: true,
            waitUntil :'networkidle2'
        })
        await page.type('input[id="unique_code"]',unique_codes())
        console.log(unique_codes())
        await page.waitForSelector('button[id="submitCode"]', {visible: true,timeout: 20000});
        await page.waitFor(3000)
        await page.click('button[id="submitCode"]')
        await page.waitForSelector('button[id="setujuPopupTerm"]', {visible: true,timeout: 20000});
        await page.waitFor(3000)
        await page.click('button[id="setujuPopupTerm"]')
        const setuju = await page.$eval('button[id="setujuPopupTerm"]', el => el.innerText);
        await expect(setuju).toMatch('Setuju');   
        await page.waitFor(3000)  
        await page.screenshot({
            path: path.join(__dirname,'../../../Renders/Unit/nutea/'+resolusi+'/post input unique_code.png'),
            fullpage: true,
            waitUntil :'networkidle2'
        })
        pageTitle = await page.title()
      await expect(pageTitle).toMatch('NuKrazy - Prize')
    },100000)

    test("user register through input code", async() => { 
      await page.goBack();
      await page.goForward();
      await page.waitForFunction(
        'document.querySelector("body").innerText.includes("Daftar")',{timeout: 10000}
      );
      await page.waitFor(3000)
      await page.click('a[href="/register"]')
      await page.waitForSelector('input[id="name"]', {visible: true,timeout: 20000});
      await page.waitFor(3000)
      await page.screenshot({
        path: path.join(__dirname,'../../../Renders/Unit/nutea/'+resolusi+'/get register nutea through input code.png'),
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
      try {
        const request = page.url()
        const cookie = await page.cookies(request)
        fs.writeFileSync(__dirname+'/nutea',JSON.stringify(cookie), function(err) {
            if (err) {
              console.log(err);
            }
        })
        await page.waitForSelector('div[class="token"]', {visible: true,timeout: 20000});
        await page.waitFor(3000)
        await page.screenshot({
          path: path.join(__dirname,'../../../Renders/Unit/nutea/'+resolusi+'/post register nutea through input code.png'),
          fullpage: true,
          waitUntil :'networkidle2'
        })
        pageTitle = await page.title()
        await expect(pageTitle).toMatch('NuKrazy - Game')
      }
      catch(err) {
        await page.screenshot({
          path: path.join(__dirname,'../../../Renders/Unit/nutea/'+resolusi+'/post register nutea through input code.png'),
          fullpage: true,
          waitUntil :'networkidle2'
        })
      }
    },100000)

    test("user register through free trial",async() => {
      await page.goto('https://nukrazytea.mrmbdg.com/')
      await page.goBack();
      await page.goForward();
      await page.waitFor(3000)
      await page.click('a[href="/register"]')
      await page.waitForSelector('input[id="name"]', {visible: true,timeout: 20000});
      await page.waitFor(3000)
      await page.screenshot({
        path: path.join(__dirname,'../../../Renders/Unit/nutea/'+resolusi+'/get register nutea through free trial.png'),
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
      try {
        const request = page.url()
        const cookie = await page.cookies(request)
        fs.writeFileSync(__dirname+'/nutea',JSON.stringify(cookie), function(err) {
            if (err) {
              console.log(err);
            }
        })
        await page.waitForSelector('div[class="token"]', {visible: true,timeout: 20000});
        await page.waitFor(3000)
        await page.screenshot({
          path: path.join(__dirname,'../../../Renders/Unit/nutea/'+resolusi+'/post register nutea through free trial.png'),
          fullpage: true,
          waitUntil :'networkidle2'
        })
        pageTitle = await page.title()
        await expect(pageTitle).toMatch('NuKrazy - Game')
      }
      catch(err) {
        await page.screenshot({
          path: path.join(__dirname,'../../../Renders/Unit/nutea/'+resolusi+'/post register nutea through free trial.png'),
          fullpage: true,
          waitUntil :'networkidle2'
        })
      }
     
    },90000)

    test("too many ivalid codes", async() => {
      await page.goto('https://nukrazytea.mrmbdg.com/',{waitUntil: 'domcontentloaded'})
      await page.goBack();
      await page.goForward();
      await page.type('input[id="unique_code"]','4c5adf48')
      await page.waitForSelector('button[id="submitCode"]', {visible: true,timeout: 20000});
      await page.waitFor(5000)
      await page.click('button[id="submitCode"]')
      await page.waitFor(5000)
      await page.type('input[id="unique_code"]','')
      await page.type('input[id="unique_code"]','4c5adf48')
      await page.waitForSelector('button[id="submitCode"]', {visible: true,timeout: 20000});
      await page.waitFor(5000)
      await page.click('button[id="submitCode"]')
      await page.waitFor(5000)
      await page.type('input[id="unique_code"]','')
      await page.type('input[id="unique_code"]','4c5adf48')
      await page.waitForSelector('button[id="submitCode"]', {visible: true,timeout: 20000});
      await page.waitFor(5000)
      await page.click('button[id="submitCode"]')
      await page.waitFor(5000)
      await page.screenshot({
        path: path.join(__dirname,'../../../Renders/Unit/nutea/'+resolusi+'/post input code too many invalid code.png'),
        fullpage: true,
        waitUntil :'networkidle2'
      })
      await page.waitForFunction(
        'document.querySelector("body").innerText.includes("Too many invalid code wait in 10 minutes")',{timeout: 10000}
      );
    },90000)

    test('wrong formated code', async() => {
      await page.goto('https://nukrazytea.mrmbdg.com/',{waitUntil: 'domcontentloaded'})
      await page.goBack();
      await page.goForward();
      await page.type('input[id="unique_code"]','13ccdc5bs')
      await page.waitForSelector('button[id="submitCode"]', {visible: true,timeout: 20000});
      await page.waitFor(3000)
      await page.click('button[id="submitCode"]')
      await page.waitForFunction(
        'document.querySelector("body").innerText.includes("Wrong Format")',{timeout: 10000}
      );
      await page.waitFor(3000)
      await page.screenshot({
        path: path.join(__dirname,'../../../Renders/Unit/nutea/'+resolusi+'/post input code wrong format.png'),
        fullpage: true,
        waitUntil :'networkidle2'
      })
    },90000)

    test('login through input code', async() => {
      await page.waitFor(3000)
      await page.goto('https://nukrazytea.mrmbdg.com/',{waitUntil:'domcontentloaded'})
      await page.goBack();
      await page.goForward();
      await page.screenshot({
          path: path.join(__dirname,'../../../Renders/Unit/nutea/'+resolusi+'/get nutea.png'),
          fullpage: true,
          waitUntil :'networkidle2'
      })
      await page.type('input[id="unique_code"]',unique_codes())
      console.log(unique_codes())
      await page.waitForSelector('button[id="submitCode"]', {visible: true,timeout: 20000});
      await page.waitFor(3000)
      await page.click('button[id="submitCode"]')
      await page.waitForSelector('button[id="setujuPopupTerm"]', {visible: true,timeout: 20000});
      await page.waitFor(3000)
      await page.click('button[id="setujuPopupTerm"]')
      const setuju = await page.$eval('button[id="setujuPopupTerm"]', el => el.innerText);
      await expect(setuju).toMatch('Setuju');   
      await page.waitFor(3000)  
      pageTitle = await page.title()
      await expect(pageTitle).toMatch('NuKrazy - Prize')
      await page.waitForFunction(
        'document.querySelector("body").innerText.includes("Daftar")',{timeout: 10000}
      );
      await page.waitFor(3000)
      await page.click('a[href="/login"]')  
      await page.screenshot({
        path: path.join(__dirname,'../../../Renders/Unit/nutea/'+resolusi+'/get login through input code.png'),
        fullpage: true,
        waitUntil :'networkidle2'
      })
    },90000)

  test("login through home",async() => {
    await page.goto('https://nukrazytea.mrmbdg.com/')
    await page.goBack();
    await page.goForward();
    await page.waitFor(3000)
    await page.click('a[href="https://nukrazytea.mrmbdg.com/login"]')
    await page.click(3000)
    await page.screenshot({
        path: path.join(__dirname,'../../../Renders/Unit/nutea/'+resolusi+'/get login nutea home.png'),
        fullpage: true,
        waitUntil :'networkidle2'
    })
    await page.type('input[id="username"]',name+'9')
    await page.type('input[id="password"]',password)
    await page.waitFor(3000)
    await page.screenshot({
      path: path.join(__dirname,'../../../Renders/Unit/nutea/'+resolusi+'/post login nutea home.png'),
      fullpage: true,
      waitUntil :'networkidle2'
    })
    pageTitle = await page.title()
    await expect(pageTitle).toMatch('NuKrazy - Game')
  },90000)
      
  test("go to profile based on cookie", async() => {  
      const client = await page.target().createCDPSession();
      await client.send('Network.clearBrowserCookies');
      await client.send('Network.clearBrowserCache');
      file = fs.readFileSync(__dirname+'/nutea','utf8',(err,data) => {
        if(data) {  
            console.log(data)   
            return data
        }
      })
      console.log(file)
      inusers = JSON.parse(file)
      await page.setCookie(...inusers);
      await page.goto('https://nukrazytea.mrmbdg.com/profil')
      await page.goBack();
      await page.goForward();
      await page.waitFor(3000)
      await page.screenshot({
        path: path.join(__dirname,'../../../Renders/Unit/nutea/'+resolusi+'/cookie is working.png'),
        fullpage: true,
        waitUntil :'networkidle2'
      }) 
    },90000)

    test("user can enter uljima in mobile",async() => { 
    await page.goto('https://nukrazytea.mrmbdg.com/game')
     let modifiedNavigator =  'Linux i686'
     let mm
      await page.evaluateOnNewDocument(({modifiedNavigator},{mm})=> {
        mm = Object.defineProperty(window.navigator,'platform',{
          value: modifiedNavigator,
          configurable: false,
          enumerable: false,
          writable: false
        })
        console.log(mm)
  
      },{modifiedNavigator},{mm})
      await page.goto('https://nukrazytea.mrmbdg.com/game')
      await page.waitForFunction(
        'document.querySelector("body").innerText.includes("Uljima, Oppa!")',{timeout: 10000}
      );
      await page.click('a[href="https://nukrazytea.mrmbdg.com/howtogame_1"]')
      await page.waitFor(3000)
      await page.screenshot({
        path: path.join(__dirname,'../../../Renders/Unit/nutea/'+resolusi+'/get can enter uljima in mobile.png'),
        fullpage: true,
        waitUntil :'networkidle2'
      }) 
    },90000)

    test.skip('user can enter yukmubang in mobile',async()=> {

    },90000)

    test.skip('user can enter oppa in mobile',async() => {

    },90000)

    test.skip('user can see leaderboard',async() => {

    },90000)

    test.skip('user can change their profile picture',async() => {

    },90000)

    test.skip('user can edit their profile account',async() => {

    },90000)

    test.skip("user can't play uljima in desktop mode",async() => {

    },90000)

    test.skip("user can't play yukmubang in desktop mode",async() => {

    },90000)

    test.skip("user can't play oppa in desktop mode",async() => {

    },90000)

    test.skip("user can top up token from gopay token",async() => {

    },90000)

    test.skip("user can top up token from bottlecap token",async() => {

    },90000)

    test.skip("user can see their score",async() => {

    },90000)

    test.skip('user logout after register through input code', async() => {
      await page.click('div[class="avatar -ml-5"]')
      await page.waitFor(3000)
      await page.click('a[data-request="onLogout"]')   
      await page.waitFor(3000)
      await page.screenshot({
        path: path.join(__dirname,'../../../Renders/Unit/nutea/'+resolusi+'/post logout through input code.png'),
        fullpage: true,
        waitUntil :'networkidle2'
      })   
    },90000)

  });

  

  
