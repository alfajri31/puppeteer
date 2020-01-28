let init = require('../../initialize')
require('../../initialize').page


beforeAll(async() => {
    browser = await puppeteer.launch({
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
},90000)

afterAll(async () => {
    await browser.close()
},5000)

describe('Login Scoope',() => {
    test('Login', async() => {
        console.log(name)
        await page.goto('http://pinaapp.id/login/',{waitUntil:'networkidle2'})
        await page.goBack();
        await page.goForward();
        await page.screenshot({
            path: path.join(__dirname,'../../../Renders/Unit/pinaa/'+res_mobile+'/get login-successfully.png'),
            fullpage: true,
        })
        await page.type('input[name="email"]',name+uniq+'@mailinator.com')
        await page.type('input[name="password"]',password)
        await init.src_height().then(async (value)=>{
            await page.setViewport({width: width_mobile,height : value})
            await page.screenshot({
                path: path.join(__dirname,'../../../Renders/Unit/pinaa/'+res_mobile+'/get login-successfully[static].png'),
                fullpage: true
            })
        })
        await page.click('a[class="button full"]') 
        try {
            await page.waitForSelector('a[class="button capitalize"]', {visible: true,timeout: 60000});
            await page.waitFor(3000)
            await init.src_height().then(async (value)=>{
                await page.setViewport({width: width_mobile,height : value})
                await page.screenshot({
                    path: path.join(__dirname,'../../../Renders/Unit/pinaa/'+res_mobile+'/post login-successfully.png'),
                    fullpage: true
                })
            })
           
        }
        catch(err) {
            await init.src_height().then(async (value)=>{
                await page.setViewport({width: width_mobile,height : value})
                await page.screenshot({
                    path: path.join(__dirname,'../../../Renders/Unit/pinaa/'+res_mobile+'/post login-successfull error.png'),
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

})