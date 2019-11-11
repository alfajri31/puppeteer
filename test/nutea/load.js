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
    test("go to profile based on cookie", async() => {  
      file = fs.readFileSync('./nutea','utf8',(err,data) => {
        if(data) {  
            console.log(data)   
            return data
        }
      })
      inusers = JSON.parse(file)
      await page.setCookie(...inusers);
      await page.goto('https://nukrazytea.mrmbdg.com/profil')
      await page.waitFor(3000)
      await page.screenshot({
        path: path.join(__dirname,'../../Renders/Unit/'+resolusi+'/cookie is working.png'),
        fullpage: true,
        waitUntil :'networkidle2'
      }) 
    },90000)
<<<<<<< HEAD
=======
    
>>>>>>> a7e6270c31db03d533ea20fd733f9421cf3019cb
  });

  

  
