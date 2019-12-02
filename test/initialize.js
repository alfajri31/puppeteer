module.exports = {
    fs : fs = require('fs'),
    puppeteer : puppeteer = require('puppeteer'),
    pptrFox : pptrFox = require('puppeteer-firefox'),
    devices : devices = require('puppeteer/DeviceDescriptors'),
    device : device = devices['iPhone X'],
    path : path = require('path'),
    faker : faker = require('faker'),
    cheerio : cheerio = require('cheerio'),
    request : request = require('request-promise'),
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

    no : no = 0,
    width: width = 375,
    hegith: height = 812,
    resolusi: resolusi = 'Mobile',
    useragent: useragent ="Mozilla/5.0 (Linux; Android 7.0; SM-G930V Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.125 Mobile Safari/537.36",
    headless : headless = true,
}


/*
resolution 
Iphone X : 375 x 812
Desktop : 1366 x 768
Tablet :
Retina :

user agent Android : Mozilla/5.0 (Linux; U; Android 4.4.2; en-us; SCH-I535 Build/KOT49H) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30
user agent : Mozilla/5.0 (Linux; Android 7.0; SM-G930V Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.125 Mobile Safari/537.36
user agent : Opera/9.80 (Android 4.1.2; Linux; Opera Mobi/ADR-1305251841) Presto/2.11.355 Version/12.10
*/