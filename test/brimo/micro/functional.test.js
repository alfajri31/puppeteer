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
const URL = 'https://brimo.wtid.dev/registration?step=1&token=f1cdd81a5d5a92c132764759f092e016'
const phone = mapString('08AAAAAAAAAA', randChar)
const email = init.lead.email
const name = init.lead.name

//preapering chromium launch
beforeAll(async() => {
    browser = await playwright['chromium'].launch({  
        headless: false,
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
    await browser.close();
})

 async function getSelfie () {
    //input selfie
    await page.click('svg[data-icon="portrait"]');
    await page.waitFor(4000);
    await page.click('button[class="btn mr-4 ml-4 btn-capture"]');
    await page.waitForSelector('svg[data-icon="check"]',{
        visible: true,
        timeout: 3600000,
    })  
    await page.click('svg[data-icon="check"]');
}

async function getKtp() {
    await page.click('svg[data-icon="address-card"]');
    await page.waitFor(4000);
    await page.click('button[class="btn mr-4 ml-4 btn-capture"]');
    await page.waitForSelector('svg[data-icon="check"]',{
        visible: true,
        timeout: 3600000,
    })  
    await page.click('svg[data-icon="check"]');
}

async function getSlipGaji() {
    await page.click('svg[data-icon="money-check-alt"]');
    await page.waitFor(4000);
    await page.click('button[class="btn mr-4 ml-4 btn-capture"]');
    await page.waitForSelector('svg[data-icon="check"]',{
        visible: true,
        timeout: 3600000,
    })  
    await page.click('svg[data-icon="check"]');
}

async function getNpwp() {
    await page.click('svg[data-icon="id-card"]');
    await page.waitFor(4000);
    await page.click('button[class="btn mr-4 ml-4 btn-capture"]');
    await page.waitForSelector('svg[data-icon="check"]',{
        visible: true,
        timeout: 3600000,
    })  
    await page.click('svg[data-icon="check"]');
}

async function isiNamaLengkap() {
    await page.type('input[id="nama_lengkap"]','Raden Muhammad Alfajri')
}

async function isiNamaSesuaiID(){
    await page.type('input[id="nama_sesuai_id"]','Raden Muhammad Alfajri')
}

async function jenisKelamin(){
    await page.click('input[id="jk-1"]');
}

async function jenisIdentitas(){
    await page.select('select[id="jenis_identitas"]', 'KTP');
}

async function nomorIdentitas() {
    await page.type('input[id="nomor_identitas"]','1234567890123456');
}

async function nomorNPWP(){
    await page.type('input[id="nomor_npwp"]','1234567890123456789');
}

async function tempatLahir(){
    await page.type('input[id="tempat_lahir"]','sukabumi');
}

async function tanggalLahir(){
    await page.type('input[id="tanggal_lahir"]','20/12/1993');
}

async function kewarganegaraan() {
    await page.click('input[id="kewarganegaraan-1"]'););
}

async function email() {
    await page.type('input[id="email"]','test1@mailinator.com');
}

async function nohp() {
    await page.type('input[id="nohp"]','087564783765');
}

//start testing
describe("brimo form fills",() => {
    test("step 1 should be success", async() =>{
        await page.goto(URL);
        await getSelfie();
        await getKtp();
        await getSlipGaji()
        await getNpwp()
        await isiNamaLengkap();
        await isiNamaSesuaiID();
        await jenisKelamin();
        await jenisIdentitas();
        await nomorIdentitas();
        await nomorNPWP();
        await tempatLahir();
        await tanggalLahir();
        await kewarganegaraan();
        await email();
        await nohp();
    },3600000)
})