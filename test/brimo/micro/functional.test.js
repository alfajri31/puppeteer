//initialize library
const puppeteer = require('../../initialize').puppeteer
let page =require('../../initialize').page
let browser =require('../../initialize').browser
let init = require('../../initialize');
let fs = require('../../initialize').fs;
let match
const playwright = require('playwright');
const { fullPageScreenshot } = require('../../initialize');

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
const URL = 'https://brimo.wtid.dev/registration?step=1&token=e6762e017030f37aad05503e2f48aca6'
const phone = mapString('08AAAAAAAAAA', randChar)
const email = init.lead.email
const name = init.lead.name

//preapering chromium launch
beforeAll(async() => {
     browser = await playwright['chromium'].launch({  
        headless: headless,
        args: ['--use-fake-ui-for-media-stream']
    });
    const context = await browser.newContext();
    page = await context.newPage();

    await page.setViewportSize({
        width: 1440
    })
},90000);

//close all chromium
afterEach(async() => {
    // await browser.close();
})

 async function getSelfie () {
    //input selfie
    await page.click('svg[data-icon="portrait"]');
    await page.waitFor(2000);
    await page.click('button[class="btn mr-4 ml-4 btn-capture"]');
    await page.waitForSelector('svg[data-icon="check"]',{
        visible: true,
        timeout: 3600000,
    })  
    await page.click('svg[data-icon="check"]');
}

async function getKtp() {
    await page.click('svg[data-icon="address-card"]');
    await page.waitFor(2000);
    await page.click('button[class="btn mr-4 ml-4 btn-capture"]');
    await page.waitForSelector('svg[data-icon="check"]',{
        visible: true,
        timeout: 3600000,
    })  
    await page.click('svg[data-icon="check"]');
}

async function getSlipGaji() {
    await page.click('svg[data-icon="money-check-alt"]');
    await page.waitFor(2000);
    await page.click('button[class="btn mr-4 ml-4 btn-capture"]');
    await page.waitForSelector('svg[data-icon="check"]',{
        visible: true,
        timeout: 3600000,
    })  
    await page.click('svg[data-icon="check"]');
}

async function getNpwp() {
    await page.click('svg[data-icon="id-card"]');
    await page.waitFor(2000);
    await page.click('button[class="btn mr-4 ml-4 btn-capture"]');
    await page.waitForSelector('svg[data-icon="check"]',{
        visible: true,
        timeout: 3600000,
    })  
    await page.click('svg[data-icon="check"]');
}

async function isiNamaLengkap() {
    
}



//start testing
describe("brimo form fills",() => {
    test("step 1 should be success", async() =>{
        await page.goto(URL);
        await getSelfie();
        await getKtp();
        await getSlipGaji()
        await getNpwp()
    },3600000)
})