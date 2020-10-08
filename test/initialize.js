module.exports = {
    fs : fs = require('fs'),
    puppeteer : puppeteer = require('puppeteer'),
    puppeteer_core : puppeteer_core = require('puppeteer-core'),
    mydevices : mydevices = puppeteer.devices['Pixel 2 XL landscapes'],
    pptrFox : pptrFox = require('puppeteer-firefox'),
    devices : devices = require('puppeteer/DeviceDescriptors'),
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
   /** 
    * width_mobile: width_mobile = 414,
    height_mobile : height_mobile = 736,
   */
    width_mobile: width_mobile = 414,
    height_mobile : height_mobile = 892,
    width_retina: width_retina =  3840,
    height_retina : height_retina = 2160,
    width_desktop: width_desktop = 1800,
    height_desktop: height_desktop = 900,
    width_tablet: width_tablet = 1024,
    height_tablet: height_tablet = 1366,
    width_mac: width_mac = 2048,
    height_mac: height_mac = 1152 ,
    scrollHeight : this.scrollHeight,
    innerHeight : this.innerHeight,
    clientHeight : this.clientHeight,
    value : this.value,
    orientation: this.orientation,
    res_mobile: res_mobile = 'Mobile',
    res_retina: res_retina = 'Retina',
    res_mac: res_mac = 'iMac',
    res_desktop: res_desktop = 'Desktop',
    res_tablet: res_tablet = 'Tablet',
    useragent: useragent ="Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Mobile Safari/537.36",
    headless : headless = true,
    slowMo : slowMo = 0,
    clear_dir : function (res) {
        console.log('..waiting directory be cleared')
        const browser3= []
        browser3.push(
            'chromium',
            'firefox',
            'webkit'
        )
        
        for(const browser in browser3) {
            let dirBrowser = path.join(__dirname,'../Renders/Unit/traveloka/'+res+'/'+browser3[browser])
            if (fs.existsSync(dirBrowser)){
                fs.readdir(dirBrowser, (err, files) => {             
                    for (const file of files) {
                        fs.unlink(path.join(dirBrowser, file), err => {
                            if (err) throw err;
                        });
                    }
                })
            } else {
                console.log('folder tidak ada')
            }
            fs.rmdir(dirBrowser, function(err) {
                if (err) {
                    throw err
                } else {
                    console.log('Successfully removed the empty directory '+browser3[browser])
                }
            })
        }            
        dir = path.join(__dirname,'../Renders/Unit/traveloka/'+res+'/')
        fs.rmdir(dir, function(err) {
            if (err) {
                throw err
            } else {
                console.log('Successfully removed the empty directory '+res)
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
    optmimal_ss : async function (folder,res,name,default_width,default_height,browserType) {

        if(default_width > default_height) {
            this.orientation = 'Landscape'
            if (browserType == 'webkit') {
                if (!fs.existsSync('Renders'+'/OneDrive - WPP Cloud'+'/Unit'+'/'+folder)){
                    fs.mkdirSync('Renders'+'/OneDrive - WPP Cloud'+'/Unit'+'/'+folder, (err) => {
                        console.log(err)
                    });
                }
                if (!fs.existsSync('Renders'+'/OneDrive - WPP Cloud'+'/Unit'+'/'+folder+'/'+res)){
                    fs.mkdirSync('Renders'+'/OneDrive - WPP Cloud'+'/Unit'+'/'+folder+'/'+res, (err) => {
                        console.log(err)
                    });
                }
                if (!fs.existsSync('Renders'+'/OneDrive - WPP Cloud'+'/Unit'+'/'+folder+'/'+res+'/'+browserType)){
                    fs.mkdirSync('Renders'+'/OneDrive - WPP Cloud'+'/Unit'+'/'+folder+'/'+res+'/'+browserType, (err) => {
                        console.log(err)
                    });
                }
    
                if (!fs.existsSync('Renders'+'/OneDrive - WPP Cloud'+'/Unit'+'/'+folder+'/'+res+'/'+browserType+'/'+this.orientation)){
                    fs.mkdirSync('Renders'+'/OneDrive - WPP Cloud'+'/Unit'+'/'+folder+'/'+res+'/'+browserType+'/'+this.orientation, (err) => {
                        console.log(err)
                    });
                }  
            }
    
            if (browserType == 'chromium') {
                if (!fs.existsSync('Renders'+'/OneDrive - WPP Cloud'+'/Unit'+'/'+folder)){
                    fs.mkdirSync('Renders'+'/OneDrive - WPP Cloud'+'/Unit'+'/'+folder, (err) => {
                        console.log(err)
                    });
                } 
                if (!fs.existsSync('Renders'+'/OneDrive - WPP Cloud'+'/Unit'+'/'+folder+'/'+res)){
                    fs.mkdirSync('Renders'+'/OneDrive - WPP Cloud'+'/Unit'+'/'+folder+'/'+res, (err) => {
                        console.log(err)
                    });
                }
    
                if (!fs.existsSync('Renders'+'/OneDrive - WPP Cloud'+'/Unit'+'/'+folder+'/'+res+'/'+browserType)){
                    fs.mkdirSync('Renders'+'/OneDrive - WPP Cloud'+'/Unit'+'/'+folder+'/'+res+'/'+browserType, (err) => {
                        console.log(err)
                    });
                }
    
                if (!fs.existsSync('Renders'+'/OneDrive - WPP Cloud'+'/Unit'+'/'+folder+'/'+res+'/'+browserType+'/'+this.orientation)){
                    fs.mkdirSync('Renders'+'/OneDrive - WPP Cloud'+'/Unit'+'/'+folder+'/'+res+'/'+browserType+'/'+this.orientation, (err) => {
                        console.log(err)
                    });
                }        
    
            }
        }
        else {
            this.orientation = "Potrait"
            if (browserType == 'webkit') {
                if (!fs.existsSync('Renders'+'/OneDrive - WPP Cloud'+'/Unit'+'/'+folder)){
                    fs.mkdirSync('Renders'+'/OneDrive - WPP Cloud'+'/Unit'+'/'+folder, (err) => {
                        console.log(err)
                    });
                }
                if (!fs.existsSync('Renders'+'/OneDrive - WPP Cloud'+'/Unit'+'/'+folder+'/'+res)){
                    fs.mkdirSync('Renders'+'/OneDrive - WPP Cloud'+'/Unit'+'/'+folder+'/'+res, (err) => {
                        console.log(err)
                    });
                }
                if (!fs.existsSync('Renders'+'/OneDrive - WPP Cloud'+'/Unit'+'/'+folder+'/'+res+'/'+browserType)){
                    fs.mkdirSync('Renders'+'/OneDrive - WPP Cloud'+'/Unit'+'/'+folder+'/'+res+'/'+browserType, (err) => {
                        console.log(err)
                    });
                }
    
                if (!fs.existsSync('Renders'+'/OneDrive - WPP Cloud'+'/Unit'+'/'+folder+'/'+res+'/'+browserType+'/'+this.orientation)){
                    fs.mkdirSync('Renders'+'/OneDrive - WPP Cloud'+'/Unit'+'/'+folder+'/'+res+'/'+browserType+'/'+this.orientation, (err) => {
                        console.log(err)
                    });
                }  
            }
    
            if (browserType == 'chromium') {
                if (!fs.existsSync('Renders'+'/OneDrive - WPP Cloud'+'/Unit'+'/'+folder)){
                    fs.mkdirSync('Renders'+'/OneDrive - WPP Cloud'+'/Unit'+'/'+folder, (err) => {
                        console.log(err)
                    });
                } 
                if (!fs.existsSync('Renders'+'/OneDrive - WPP Cloud'+'/Unit'+'/'+folder+'/'+res)){
                    fs.mkdirSync('Renders'+'/OneDrive - WPP Cloud'+'/Unit'+'/'+folder+'/'+res, (err) => {
                        console.log(err)
                    });
                }
    
                if (!fs.existsSync('Renders'+'/OneDrive - WPP Cloud'+'/Unit'+'/'+folder+'/'+res+'/'+browserType)){
                    fs.mkdirSync('Renders'+'/OneDrive - WPP Cloud'+'/Unit'+'/'+folder+'/'+res+'/'+browserType, (err) => {
                        console.log(err)
                    });
                }
    
                if (!fs.existsSync('Renders'+'/OneDrive - WPP Cloud'+'/Unit'+'/'+folder+'/'+res+'/'+browserType+'/'+this.orientation)){
                    fs.mkdirSync('Renders'+'/OneDrive - WPP Cloud'+'/Unit'+'/'+folder+'/'+res+'/'+browserType+'/'+this.orientation, (err) => {
                        console.log(err)
                    });
                }        
    
            }
        }
      

        await page.setViewportSize({
            width: default_width,
            height: 352
        })
        await scrollPageToBottom(page)
        await page.evaluate(_ => {
            window.scrollTo(0, 0);
        });
        await this.src_height().then(async (value)=>{
            await page.setViewportSize({width: default_width,height : value})
            await page.waitFor(5000)
            await page.screenshot({
                path: path.join(__dirname,'../Renders/OneDrive - WPP Cloud/Unit/'+folder+'/'+res+'/'+browserType+'/'+this.orientation+'/'+name+'.png'),
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
