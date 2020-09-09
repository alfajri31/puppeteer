module.exports = {
    fs : fs = require('fs'),
    puppeteer : puppeteer = require('puppeteer'),
    puppeteer_core : puppeteer_core = require('puppeteer-core'),
    pptrFox : pptrFox = require('puppeteer-firefox'),
    devices : devices = require('puppeteer/DeviceDescriptors'),
    device : device = devices['iPhone X'],
    path : path = require('path'),
    faker : faker = require('faker'),
    cheerio : cheerio = require('cheerio'),
    request : request = require('request-promise'),
    fullPageScreenshot :  fullPageScreenshot = require('puppeteer-full-page-screenshot'),
    browser : this.browser,
    page : this.page,
    lead : lead = {
        name: faker.name.lastName(),
        email: faker.internet.email(),
        phone: faker.phone.phoneNumber(),
        message: faker.random.words(),
        code: '123Asbc'
    },
    jsonQuery : jsonQuery= require('json-query'),
    pageTitle : this.pageTitle,
    selector : this.selector,
    text : this.text,
    code : this.code,
    name : name = lead.name,
    email : email = lead.email,
    phone : this.phone,
    password : password = '12345678',
    confirm_pass : confirm_pass = '12345678',
    date : date = new Date(),
    dir : this.dir,
    user : this.user,
    users : users = [],
    inusers : this.inusers,
    file : this.file,
    list : this.list,
    filePath : this.filePath,
    futureFileChooser : this.futureFileChooser,
    fileChooser : this.fileChooser,
    scrollPageToBottom : scrollPageToBottom = require('puppeteer-autoscroll-down'),
    no : no = 0,
    /*
    cek browserszie.com
    */ 
    width_mobile: width_mobile = 360,
    height_mobile : height_mobile = 812,
    width_laptop: width_laptop = 1440,
    height_laptop: height_laptop = 768,
    width_mac: width_mac = 2048,
    height_mac: height_mac = 1152 ,
    scrollHeight : this.scrollHeight,
    innerHeight : this.innerHeight,
    clientHeight : this.clientHeight,
    value : this.value,
    res_mobile: res_mobile = 'Mobile',
    res_laptop: res_laptop = 'Laptop',
    res_mac: res_mac = 'Mac',
    useragent: useragent ="Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Mobile Safari/537.36",
    headless : headless = false,
    slowMo : slowMo = 0,
    dir : this.dir,
    clear_dir : function (dir) {
        dir = path.join(__dirname,'../Renders/Unit/traveloka/'+res)
        fs.readdir(dir, (err, files) => {
            for (const file of files) {
                fs.unlink(path.join(dir, file), err => {
                  if (err) throw err;
                });
            }
        })
    },
    uniq : uniq = Math.floor(Math.random() * 100),
    src_height : async function () {
        scrollHeight = await page.waitForFunction('document.body.scrollHeight');
            return value = await page.evaluate((scrollHeight)=>{
                console.log(scrollHeight)
                    return scrollHeight
            },scrollHeight)     
    },
    optmimal_ss : async function (folder,res,name,default_width,browserType) {

        if (browserType == 'webkit') {
            if (!fs.existsSync('Renders'+'/Unit'+'/'+folder)){
                fs.mkdirSync('Renders'+'/Unit'+'/'+folder, (err) => {
                    console.log(err)
                });
            }
            if (!fs.existsSync('Renders'+'/Unit'+'/'+folder+'/'+res)){
                fs.mkdirSync('Renders'+'/Unit'+'/'+folder+'/'+res, (err) => {
                    console.log(err)
                });
            }
            if (!fs.existsSync('Renders'+'/Unit'+'/'+folder+'/'+res+'/'+browserType)){
                fs.mkdirSync('Renders'+'/Unit'+'/'+folder+'/'+res+'/'+browserType, (err) => {
                    console.log(err)
                });
            }
        }

        if (browserType == 'chromium') {
            if (!fs.existsSync('Renders'+'/Unit'+'/'+folder)){
                fs.mkdirSync('Renders'+'/Unit'+'/'+folder, (err) => {
                    console.log(err)
                });
            }
            if (!fs.existsSync('Renders'+'/Unit'+'/'+folder+'/'+res)){
                fs.mkdirSync('Renders'+'/Unit'+'/'+folder+'/'+res, (err) => {
                    console.log(err)
                });
            }
            if (!fs.existsSync('Renders'+'/Unit'+'/'+folder+'/'+res+'/'+browserType)){
                fs.mkdirSync('Renders'+'/Unit'+'/'+folder+'/'+res+'/'+browserType, (err) => {
                    console.log(err)
                });
            }
        }

        // await page.setViewportSize({
        //     width: default_width,
        //     height: height_mac
        // })
        await scrollPageToBottom(page)
        await page.evaluate(_ => {
            window.scrollTo(0, 0);
        });
        await this.src_height().then(async (value)=>{
            await page.setViewportSize({width: default_width,height : value})
            await page.waitFor(5000)
            await page.screenshot({
                path: path.join(__dirname,'../Renders/Unit/'+folder+'/'+res+'/'+browserType+'/'+name+'.png'),
                fullpage: true,
                waitUntil : 'networkidle2'
            })
        })
    },
    /*
    resolution custom display
    */
   width_iphonex: width_iphonex = 375,
   height_iphonex : height_iphonex = 812,
}


/*
resolution 
Iphone X : 375 x 812
Desktop : 1366 x 768
Tablet :
Retina : 2048 = 1073

user agent Android : Mozilla/5.0 (Linux; U; Android 4.4.2; en-us; SCH-I535 Build/KOT49H) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30
user agent : Mozilla/5.0 (Linux; Android 7.0; SM-G930V Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.125 Mobile Safari/537.36
user agent : Opera/9.80 (Android 4.1.2; Linux; Opera Mobi/ADR-1305251841) Presto/2.11.355 Version/12.10

src height
jika innerheight != scrollHeight maka pilih innerHeight 
jika sama maka pilih scrollHeight
*/