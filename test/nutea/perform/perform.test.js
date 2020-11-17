require('../../initialize')
require('../../initialize').page

const chromeLauncher = require('chrome-launcher');
const puppeteer = require('puppeteer');
const lighthouse = require('lighthouse');
const config = require('lighthouse/lighthouse-core/config/lr-mobile-config.js');
const reportGenerator = require('lighthouse/lighthouse-core/report/report-generator');
const request = require('request');
const util = require('util');
const fs = require('fs');

let opts
let chrome 

beforeAll(async() => {
    opts = {
        headless: headless,
        args: [ '--ignore-certificate-errors','--no-sandbox'],
        chromeFlags: ['--headless', '--disable-gpu']
    }
    
    // Launch chrome using chrome-launcher
    chrome = await chromeLauncher.launch(opts);
    opts.port = chrome.port;

    // Connect to it using puppeteer.connect().
    const resp = await util.promisify(request)(`http://localhost:${opts.port}/json/version`);
    const {webSocketDebuggerUrl} = JSON.parse(resp.body);
    browser = await puppeteer.connect({browserWSEndpoint: webSocketDebuggerUrl});
    page = (await browser.pages())[0]
    await page.setViewport({ width: 1200, height: 900});
},90000)

afterAll(async() => {
    await browser.disconnect();
    await chrome.kill();
})


describe('E2E Automation Test', () => {
    test('test performance home use lighthouse', async() => {
        await page.goto('http://pinaapp.id/',{waitUntil : 'networkidle2'}) 
        const report = await lighthouse(page.url(), opts, config).then(results => {
            return results;
        });
        const html = reportGenerator.generateReport(report.lhr, 'html');
        const json = reportGenerator.generateReport(report.lhr, 'json');
        
        //Write report html to the file
        fs.writeFile(__dirname+'/report.html', html, (err) => {
            if (err) {
                console.error(err);
            }
        });
        //Write report json to the file
        fs.writeFile(__dirname+'/report.json', json, (err) => {
            if (err) {
                console.error(err);
            }
        });

    },90000)
})