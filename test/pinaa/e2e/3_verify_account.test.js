let init = require('../../initialize')
require('../../initialize').page

let uniq = Math.floor(Math.random() * 100)

beforeAll(async() => {
    browser = await puppeteer.launch({
        headless: headless,
        //executablePath: path.join(__dirname,'../','../','../','/node_modules/puppeteer/.local-chromium/linux-722234/chrome-linux/chrome'),
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
    // var shell = require('shelljs');
    // shell.exec('pkill Chromium')
},5000)

describe('Verify_account',() => {
    
    test("Coockie is avtive", async() => {  
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
            await page.setViewport({width: width_mobile,height : value})
            await page.screenshot({
                path: path.join(__dirname,'../../../Renders/Unit/pinaa/'+res_mobile+'/cookie always working.png'),
                fullpage: true,
                waitUntil :'domcontentloaded',
              })
        })
      },90000)

      test("Verify account with checklist npwp",async() => {
        await page.waitFor(2000)
        await page.goBack();
        await page.goForward();
        await page.click('a[class="button no-margin"]')
        await page.waitForFunction(
            'document.querySelector("body").innerText.includes("Your ID")',{timeout: 20000}
        );
        
        await init.src_height().then(async (value)=>{
            await page.setViewport({width: width_mobile,height : value})
            await page.screenshot({
                path: path.join(__dirname,'../../../Renders/Unit/pinaa/'+res_mobile+'/get verify account.png'),
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
            await page.setViewport({width: width_mobile,height : value})
            await page.screenshot({
                path: path.join(__dirname,'../../../Renders/Unit/pinaa/'+res_mobile+'/post verify account with checklist npwp- static.png'),
                fullpage: true,
                waitUntil :'domcontentloaded',
            }) 
        })  
        await page.click('a[class="button yellow full"]')
        await page.waitFor(2000)

        await init.src_height().then(async (value)=>{
            await page.setViewport({width: width_mobile,height : value})
            await page.screenshot({
                path: path.join(__dirname,'../../../Renders/Unit/pinaa/'+res_mobile+'/post verify account with checklist npwp - successfully.png'),
                fullpage: true,
                waitUntil :'domcontentloaded',
            }) 
        })
        pageTitle = await page.title();
        await expect(pageTitle).toMatch('PINA')
      },90000)
})