

let init = require('../../initialize')
require('../../initialize').page


let dir= path.join(__dirname,'../../../Renders/Unit/'+resolusi)
fs.readdir(dir, (err, files) => {
    for (const file of files) {
        fs.unlink(path.join(dir, file), err => {
          if (err) throw err;
        });
    }
})

let uniq = Math.floor(Math.random() * 100)

beforeAll(async() => {
    browser = await puppeteer.launch({
        headless: headless,
        args: [ '--ignore-certificate-errors','--no-sandbox'],
    })
    page = await browser.newPage()
    await page.authenticate({ 
        username: 'grt' , 
        password:'pina2019' 
    });
    await page.setViewport({
        width: width,
        height:  height
    })
    name = name
    email = email
    password = password
    confirm_password = confirm_pass

},90000)

afterAll(() => {
    browser.close()
})

describe('Unit register',() => {

    test('register success', async() => {
        await page.goto('http://pinaapp.id/register',{waitUntil:'networkidle2'})
        await init.src_height().then(async (value)=>{
            await page.setViewport({width: width,height : value})
            await page.screenshot({
                path: path.join(__dirname,'../../../Renders/Unit/'+resolusi+'/get register-successfully.png'),
                fullpage: true
            })
        })
        await page.type('input[name="email"]',name+uniq+'@mailinator.com')
        await page.type('input[name="name"]',name+uniq)
        await page.type('input[name="password"]',password)
        await page.type('input[name="confirm password"]',confirm_password)
        await page.click('input[id="cb"]')
        await page.click('a[class="button full"]')
        await page.waitForFunction(
            'document.querySelector("body").innerText.includes("Forgot Password?")',{timeout: 25000}
        );
        await init.src_height().then(async (value)=>{
            await page.setViewport({width: width,height : value})
            await page.screenshot({
                path: path.join(__dirname,'../../../Renders/Unit/'+resolusi+'/post register-successfully.png'),
                fullpage: true
            })
        })
        pageTitle = await page.title();
        await expect(pageTitle).toMatch('Login | PINA')
    },90000)

    test('email with wrong format', async() => {
        await page.goto('http://pinaapp.id/register')
        await page.goBack();
        await page.goForward();
        await page.type('input[name="email"]','test123com')
        await page.type('input[name="name"]',name)
        await page.type('input[name="password"]',password)
        await page.type('input[name="confirm password"]',confirm_password)
        await page.click('input[id="cb"]')
        await page.click('a[class="button full"]')
        await init.src_height().then(async (value)=>{
            await page.setViewport({width: width,height : value})
            await page.screenshot({
                path: path.join(__dirname,'../../../Renders/Unit/'+resolusi+'/post register - wrong format email.png'),
                fullpage: true
            })
        })
      
        pageTitle = await page.title();
        await expect(pageTitle).toMatch('Register | PINA')
    },90000)

    test('register without checklist TnC', async() => {
        await page.goto('http://pinaapp.id/register',{waitUntil:'networkidle2'})
        await page.goBack();
        await page.goForward();
        await page.type('input[name="email"]',name+'@mailinator.com')
        await page.type('input[name="name"]',name)
        await page.type('input[name="password"]',password)
        await page.type('input[name="confirm password"]',confirm_password)
        await page.click('a[class="button full"]')
        await init.src_height().then(async (value)=>{
            await page.setViewport({width: width,height : value})
            await page.screenshot({
                path: path.join(__dirname,'../../../Renders/Unit/'+resolusi+'/post register - tnc not checklisted.png'),
                fullpage: true
            })
        })
  
        pageTitle = await page.title();
        await expect(pageTitle).toMatch('Register | PINA')
    },90000)

    test('register with different confirm password', async() => {
        await page.goto('http://pinaapp.id/register',{waitUntil:'networkidle2'})
        await page.goBack();
        await page.goForward();
        await page.type('input[name="email"]',name+'@mailinator.com')
        await page.type('input[name="name"]',name)
        await page.type('input[name="password"]',password)
        await page.type('input[name="confirm password"]','abc123')
        await page.click('a[class="button full"]')
        await init.src_height().then(async (value)=>{
            await page.setViewport({width: width,height : value})
            await page.screenshot({
                path: path.join(__dirname,'../../../Renders/Unit/'+resolusi+'/post register - without different confirm password.png'),
                fullpage: true
            })
        })
       
        pageTitle = await page.title();
        await expect(pageTitle).toMatch('Register | PINA')
    },90000)

    test('register without fill the form fields', async() => {
        await page.goto('http://pinaapp.id/register',{waitUntil:'networkidle2'})
        await page.goBack();
        await page.goForward();
        await page.click('a[class="button full"]')   
        await init.src_height().then(async (value)=>{
            await page.setViewport({width: width,height : value})
            await page.screenshot({
                path: path.join(__dirname,'../../../Renders/Unit/'+resolusi+'/post register - without fill form fields.png'),
                fullpage: true
            })
        })
     
        pageTitle = await page.title();
        await expect(pageTitle).toMatch('Register | PINA')
    },90000)

    test('duplicate the register', async() => {  
        await page.goto('http://pinaapp.id/register',{waitUntil:'networkidle2'})
        await page.goBack();
        await page.goForward();
        await page.type('input[name="email"]',name+'@mailinator.com')
        await page.type('input[name="name"]',name)
        await page.type('input[name="password"]',password)
        await page.type('input[name="confirm password"]',confirm_password)
        await page.click('input[id="cb"]')
        await page.click('a[class="button full"]')
        await init.src_height().then(async (value)=>{
            await page.setViewport({width: width,height : value})
            await page.screenshot({
                path: path.join(__dirname,'../../../Renders/Unit/'+resolusi+'/post register - duplicate register.png'),
                fullpage: true,
            })
        })
        pageTitle = await page.title();
        await expect(pageTitle).toMatch('Registrasi | PINA')
    },90000)

    test('login success', async() => {
        await page.goto('http://pinaapp.id/login/',{waitUntil:'networkidle2'})
        await page.goBack();
        await page.goForward();
        await page.screenshot({
            path: path.join(__dirname,'../../../Renders/Unit/'+resolusi+'/get login-successfully.png'),
            fullpage: true,
        })
        await page.type('input[name="email"]',name+'@mailinator.com')
        await page.type('input[name="password"]',password)
        await init.src_height().then(async (value)=>{
            await page.setViewport({width: width,height : value})
            await page.screenshot({
                path: path.join(__dirname,'../../../Renders/Unit/'+resolusi+'/get login-successfully[static].png'),
                fullpage: true
            })
        })
        await page.click('a[class="button full"]') 
        try {
            await page.waitForSelector('a[class="button capitalize"]', {visible: true,timeout: 60000});
            await page.waitFor(3000)
            await init.src_height().then(async (value)=>{
                await page.setViewport({width: width,height : value})
                await page.screenshot({
                    path: path.join(__dirname,'../../../Renders/Unit/'+resolusi+'/post login-successfully.png'),
                    fullpage: true
                })
            })
           
        }
        catch(err) {
            await init.src_height().then(async (value)=>{
                await page.setViewport({width: width,height : value})
                await page.screenshot({
                    path: path.join(__dirname,'../../../Renders/Unit/'+resolusi+'/post login-successfull error.png'),
                    fullpage: true
                })
            })
          
        }
       
        const localStorageData = await page.evaluate(() => {
            let json = {};
            for (let i = 0; i < localStorage.length; i++) {
              const key = localStorage.key(i);
              json[key] = localStorage.getItem(key);
            }
            return json;
          });
          
        // console.log(localStorageData)
        const myString1 = JSON.stringify(localStorageData)
        const myString2 = myString1.replace(/\\/g, '');
        const myString3 = myString2.replace(/"{"/g,'{"')
        const myString4 = myString3.replace(/}"/g,'}')
        const myString5 = myString4.replace(/"}"/g,'}"')
        fs.writeFileSync(__dirname+'/pina',myString5, function(err) {
            if (err) {
              console.log(err);
            }
        })
        pageTitle = await page.title();
        await expect(pageTitle).toMatch('Dashboard | PINA')
    },90000)

    test("go to profile based on cookie", async() => {  
        await page.waitFor(2000)
        await page.goBack();
        await page.goForward();
        const client = await page.target().createCDPSession();
        await client.send('Network.clearBrowserCookies');
        await client.send('Network.clearBrowserCache');
        file = fs.readFileSync(__dirname+'/pina','utf8',(err,data) => {
          if(data) {  
              console.log(data)   
              return data
          }
        })
        inusers = JSON.parse(file)
        await page.evaluateOnNewDocument (
        ({inusers}) => {
          console.log(JSON.stringify(inusers.session_auth)) //lihat di log browser 
          localStorage.setItem('session_auth',JSON.stringify(inusers.session_auth));
          localStorage.setItem('us',JSON.stringify(inusers.us))
        },{inusers});
        await page.goto('http://pinaapp.id/dashboard',{waitUntil:'networkidle2'})
        await page.waitFor(3000)
        await init.src_height().then(async (value)=>{
            await page.setViewport({width: width,height : value})
            await page.screenshot({
                path: path.join(__dirname,'../../../Renders/Unit/'+resolusi+'/cookie always working.png'),
                fullpage: true,
                waitUntil :'domcontentloaded',
              })
        })
     
      },90000)

      test("verify account with checklist npwp",async() => {
        await page.waitFor(2000)
        await page.goBack();
        await page.goForward();
        await page.click('a[class="button no-margin"]')
        await page.waitForFunction(
            'document.querySelector("body").innerText.includes("Your ID")',{timeout: 20000}
        );
        
        await init.src_height().then(async (value)=>{
            await page.setViewport({width: width,height : value})
            await page.screenshot({
                path: path.join(__dirname,'../../../Renders/Unit/'+resolusi+'/get verify account.png'),
                fullpage: true,
                waitUntil :'domcontentloaded',
            }) 
        })
       
        await page.click('label[for="cb"]') 
        await page.waitFor(1500)

        //input ktp etc ...
        filePath = path.join(process.cwd()+'/pictures/sample1.png');
        futureFileChooser = page.waitForFileChooser();
        await page.click('label[for="item-upload-ktp"]')
        fileChooser = await futureFileChooser;
        await fileChooser.accept([filePath]);
        await page.waitFor(2000)

        futureFileChooser = page.waitForFileChooser();
        await page.click('label[for="item-upload-selfie-ktp"]')
        fileChooser = await futureFileChooser;
        await fileChooser.accept([filePath]);
        await page.waitFor(2000)

        futureFileChooser = page.waitForFileChooser();
        await page.click('label[for="item-upload-ttd"]')
        fileChooser = await futureFileChooser;
        await fileChooser.accept([filePath]);
        await page.waitFor(2000)

        futureFileChooser = page.waitForFileChooser();
        await page.click('label[for="item-upload-npwp"]')
        fileChooser = await futureFileChooser;
        await fileChooser.accept([filePath]);
        await page.waitFor(2000)

        await init.src_height().then(async (value)=>{
            await page.setViewport({width: width,height : value})
            await page.screenshot({
                path: path.join(__dirname,'../../../Renders/Unit/'+resolusi+'/post verify account with checklist npwp- static.png'),
                fullpage: true,
                waitUntil :'domcontentloaded',
            }) 
        })  
        await page.click('a[class="button yellow full"]')
        await page.waitFor(2000)

        await init.src_height().then(async (value)=>{
            await page.setViewport({width: width,height : value})
            await page.screenshot({
                path: path.join(__dirname,'../../../Renders/Unit/'+resolusi+'/post verify account with checklist npwp - successfully.png'),
                fullpage: true,
                waitUntil :'domcontentloaded',
            }) 
        })
        pageTitle = await page.title();
        await expect(pageTitle).toMatch('PINA')
      },90000)

      test("verify account without checklisted npwp",async() => {
        await page.goto('http://pinaapp.id/verification/upload')
        await page.goBack();
        await page.goForward();
        await page.waitForFunction(
            'document.querySelector("body").innerText.includes("Your ID")',{timeout: 20000}
        );
        await init.src_height().then(async (value)=>{
            await page.setViewport({width: width,height : value})
            await page.screenshot({
                path: path.join(__dirname,'../../../Renders/Unit/'+resolusi+'/get verify account without checklisted npwp - successfully.png'),
                fullpage: true,
                waitUntil :'domcontentloaded'
            }) 
    
        })
          //input ktp etc ...
          futureFileChooser = page.waitForFileChooser();
          await page.click('label[for="item-upload-ktp"]')
          fileChooser = await futureFileChooser;
          await fileChooser.accept([filePath]);
          await page.waitFor(2000)
          futureFileChooser = page.waitForFileChooser();
          await page.click('label[for="item-upload-selfie-ktp"]')
          fileChooser = await futureFileChooser;
          await fileChooser.accept([filePath]);
          await page.waitFor(2000)
          futureFileChooser = page.waitForFileChooser();
          await page.click('label[for="item-upload-ttd"]')
          fileChooser = await futureFileChooser;
          await fileChooser.accept([filePath]);
          await page.waitFor(2000)
          futureFileChooser = page.waitForFileChooser();
          await page.click('label[for="item-upload-npwp"]')
          fileChooser = await futureFileChooser;
          await fileChooser.accept([filePath]);
          await page.waitFor(2000)
          await init.src_height().then(async (value)=>{
            await page.setViewport({width: width,height : value})
            await page.screenshot({
                path: path.join(__dirname,'../../../Renders/Unit/'+resolusi+'/post verify account without checklist npwp  - static.png'),
                fullpage: true,
                waitUntil :'domcontentloaded'
            }) 
        })
          await page.click('a[class="button yellow full"]')
          await init.src_height().then(async (value)=>{
            await page.setViewport({width: width,height : value})
            await page.screenshot({
                path: path.join(__dirname,'../../../Renders/Unit/'+resolusi+'/post verify account without checklist npwp - successfully.png'),  
                fullpage: true,
                waitUntil :'domcontentloaded'
            }) 
        })
        pageTitle = await page.title();
        await expect(pageTitle).toMatch('PINA')
       
      },90000)



})