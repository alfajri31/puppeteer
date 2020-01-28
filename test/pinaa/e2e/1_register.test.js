let init = require('../../initialize')
require('../../initialize').page
require('../../initialize').browser



let dir= path.join(__dirname,'../../../Renders/Unit/pinaa/'+res_mobile)
fs.readdir(dir, (err, files) => {
    for (const file of files) {
        fs.unlink(path.join(dir, file), err => {
          if (err) throw err;
        });
    }
})

beforeAll(async() => {
    browser = await puppeteer.launch({
        path: '',
        headless: headless,
        executablePath: path.join(__dirname,'../','../','../','/node_modules/puppeteer/.local-chromium/linux-706915/chrome-linux/chrome'),
        slowMo: slowMo,
        args: [ '--ignore-certificate-errors','--no-sandbox'],
    })
    page = await browser.newPage()
    await page.authenticate({ 
        username: 'grt' , 
        password:'pina2019' 
    });
    await page.setViewport({width: width_mobile,height:height_mobile})
    confirm_password = password
},90000)

afterAll(async () => {
    await browser.close()
},5000)


describe('Register Scoope',() => {
    test('Register success', async() => {
        await page.goto('http://pinaapp.id/register',{waitUntil:'networkidle2'})
        await init.src_height().then(async (value)=>{
            await page.setViewport({width: width_mobile,height : value})
            await page.screenshot({
                path: path.join(__dirname,'../../../Renders/Unit/pinaa/'+res_mobile+'/get register-successfully.png'),
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
            await page.setViewport({width: width_mobile,height : value})
            await page.screenshot({
                path: path.join(__dirname,'../../../Renders/Unit/pinaa/'+res_mobile+'/post register-successfully.png'),
                fullpage: true
            })
        })
        pageTitle = await page.title();
        await expect(pageTitle).toMatch('Login | PINA')
    },90000)

    test('Register with email with wrong format', async() => {
        await page.goto('http://pinaapp.id/register')
        await page.goBack();
        await page.goForward();
        await page.type('input[name="email"]','test123com')
        await page.type('input[name="name"]',name+uniq)
        await page.type('input[name="password"]',password)
        await page.type('input[name="confirm password"]',confirm_password)
        await page.click('input[id="cb"]')
        await page.click('a[class="button full"]')
        await init.src_height().then(async (value)=>{
            await page.setViewport({width: width_mobile,height : value})
            await page.screenshot({
                path: path.join(__dirname,'../../../Renders/Unit/pinaa/'+res_mobile+'/post register - wrong format email.png'),
                fullpage: true
            })
        })
      
        pageTitle = await page.title();
        await expect(pageTitle).toMatch('Register | PINA')
    },90000)

    test('Register without checklist the TnC', async() => {
        await page.goto('http://pinaapp.id/register',{waitUntil:'networkidle2'})
        await page.goBack();
        await page.goForward();
        await page.type('input[name="email"]',name+uniq+'@mailinator.com')
        await page.type('input[name="name"]',name+uniq)
        await page.type('input[name="password"]',password)
        await page.type('input[name="confirm password"]',confirm_password)
        await page.click('a[class="button full"]')
        await init.src_height().then(async (value)=>{
            await page.setViewport({width: width_mobile,height : value})
            await page.screenshot({
                path: path.join(__dirname,'../../../Renders/Unit/pinaa/'+res_mobile+'/post register - tnc not checklisted.png'),
                fullpage: true
            })
        })
  
        pageTitle = await page.title();
        await expect(pageTitle).toMatch('Register | PINA')
    },90000)

    test('Register with different confirm password', async() => {
        await page.goto('http://pinaapp.id/register',{waitUntil:'networkidle2'})
        await page.goBack();
        await page.goForward();
        await page.type('input[name="email"]',name+uniq+'@mailinator.com')
        await page.type('input[name="name"]',name+uniq)
        await page.type('input[name="password"]',password)
        await page.type('input[name="confirm password"]','abc123')
        await page.click('a[class="button full"]')
        await init.src_height().then(async (value)=>{
            await page.setViewport({width: width_mobile,height : value})
            await page.screenshot({
                path: path.join(__dirname,'../../../Renders/Unit/pinaa/'+res_mobile+'/post register - without different confirm password.png'),
                fullpage: true
            })
        })
        pageTitle = await page.title();
        await expect(pageTitle).toMatch('Register | PINA')
    },90000)

    test('Register with blank form fields', async() => {
        await page.goto('http://pinaapp.id/register',{waitUntil:'networkidle2'})
        await page.goBack();
        await page.goForward();
        await page.click('a[class="button full"]')   
        await init.src_height().then(async (value)=>{
            await page.setViewport({width: width_mobile,height : value})
            await page.screenshot({
                path: path.join(__dirname,'../../../Renders/Unit/pinaa/'+res_mobile+'/post register - without fill form fields.png'),
                fullpage: true
            })
        })
        pageTitle = await page.title();
        await expect(pageTitle).toMatch('Register | PINA')
    },90000)

    test('Duplicate the register', async() => {  
        await page.goto('http://pinaapp.id/register',{waitUntil:'networkidle2'})
        await page.goBack();
        await page.goForward();
        await page.type('input[name="email"]',name+uniq+'@mailinator.com')
        await page.type('input[name="name"]',name+uniq)
        await page.type('input[name="password"]',password)
        await page.type('input[name="confirm password"]',confirm_password)
        await page.click('input[id="cb"]')
        await page.click('a[class="button full"]')
        await init.src_height().then(async (value)=>{
            await page.setViewport({width: width_mobile,height : value})
            await page.screenshot({
                path: path.join(__dirname,'../../../Renders/Unit/pinaa/'+res_mobile+'/post register - duplicate register.png'),
                fullpage: true,
            })
        })
        pageTitle = await page.title();
        await expect(pageTitle).toMatch('Registrasi | PINA')
    },90000)

})