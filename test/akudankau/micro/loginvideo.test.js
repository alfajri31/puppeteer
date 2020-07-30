//initialize library
const puppeteer = require('../../initialize').puppeteer
let page =require('../../initialize').page
let browser =require('../../initialize').browser
let init = require('../../initialize');
let fs = require('../../initialize').fs;
const playwright = require('playwright');

//initialize function random number
CHAR_SETS = {
    A: '123456789',
    B: '01234',
    C: 'ab',
    D: 'AB',
    E: '.',
    F: '@!'
}
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

//initialize variables
let match
const today = new Date();
const currentDate = today.getDate() + '/' + today.getMonth() + '/' + today.getFullYear() + '/' + today.getHours() + ':' + today.getMinutes()
const URL = 'https://www.dancow.co.id/dpc/dongengakudankau/'
const phone = mapString('08AAAAAAAAAA', randChar)
const email = init.lead.email
const name = init.lead.name

//preapering chromium launch
beforeAll(async() => {
    browser = await playwright['chromium'].launch({  
        headless: headless
    });
    const context = await browser.newContext();
    page = await context.newPage();

    await page.setViewportSize({
        width: 1440,
        height: height_mac
    })
},90000);

//close all chromium
afterEach(async() => {
    await browser.close();
})


//start testing
describe("validasi login dan video kasuari dan mahkota",() => {
    test("register pada video kasuari dan mahkota should be success", async() => {
        browser = await puppeteer.launch({headless: false})
        page = await browser.newPage()
        await page.goto(URL+'galeri-video',{waitUntil: 'networkidle2'})
        await page.click('a[href="'+URL+'galeri-video/detail/kasuari-dan-dara-makota"]')
        await page.waitFor(5000);
        await page.type('input[name="phone"]',phone)
        await page.type('input[name="email"]', email)
        await page.type('input[name="fullname"]',name)
        await page.type('input[name="code"]','VB4N6MCZCE6')
        await page.click('input[id="dongeng-disclaimer-input"]')
        fs.appendFile('./test/akudankau/micro/logs users','\n'+phone +' '+ init.lead.email +' '+init.lead.name + ' ' + 'VB4N6MCZCE6' + currentDate, function(err) {
            if (err) {
              console.log(err);
            }
          })
        await page.waitForSelector('h1[class="section-title title-styled text-center mb-3"]',{
            visible: true,
            timeout: 3600000,
        })  
        match = await page.$eval('h1[class="section-title title-styled text-center mb-3"]', el => el.innerText);
        await expect(match).toMatch('Kasuari dan Dara Makota'); 
    },3600000)

        test('login with email video kasuari dan mahkota should be success', async() => {
            await page.goto(URL+'galeri-video',{waitUntil: 'networkidle2'})
            await page.click('a[href="'+URL+'galeri-video/detail/kasuari-dan-dara-makota"]')
            await page.waitFor(5000);
            await page.type('input[name="phone"]',phone)
            await page.waitForSelector('h1[class="section-title title-styled text-center mb-3"]',{
                visible: true,
                timeout: 3600000,
            })  
            match = await page.$eval('h1[class="section-title title-styled text-center mb-3"]', el => el.innerText);
            await expect(match).toMatch('Kasuari dan Dara Makota'); 

            await page.goto(URL+'/galeri-video',{waitUntil: 'networkidle2'})
            await page.click('a[href="'+URL+'galeri-video/detail/kasuari-dan-dara-makota"]')
            await page.waitFor(5000);
            await page.type('input[name="email"]',email)
            await page.waitForSelector('h1[class="section-title title-styled text-center mb-3"]',{
                visible: true,
                timeout: 3600000,
            })  
            match = await page.$eval('h1[class="section-title title-styled text-center mb-3"]', el => el.innerText);
            await expect(match).toMatch('Kasuari dan Dara Makota'); 
        },3600000)

        test('login with phone video kasuari dan mahkota should be success', async() => {
            await page.goto(URL+'/galeri-video/detail/kasuari-dan-dara-makota',{waitUntil: 'networkidle2'})
            await page.click('a[href="href="'+URL+'galeri-video"]')
            await page.waitFor(5000);
            await page.click('image[alt="Alt Katak dalam Sumur Small"]')
            await page.waitFor(2000);
            await page.click('a[href="'+URL+'galeri-video/detail/katak-dalam-sumur"]')
            await page.type('input[name="phone"]',phone)
            await page.waitForSelector('h1[class="section-title title-styled text-center mb-3"]',{
                visible: true,
                timeout: 3600000,
            })  
            match = await page.$eval('h1[class="section-title title-styled text-center mb-3"]', el => el.innerText);
            await expect(match).toMatch('Katak Dalam Sumur'); 

        },3600000)
})