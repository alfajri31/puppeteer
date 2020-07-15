const pptr = require('puppeteer');
(async() => {
  const browser = await pptr.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--unlimited-storage', '--full-memory-crash-report','--force-gpu-mem-available-mb','--disable-setuid-sandbox'],
    ignoreHTTPSErrors: true ,
    dumpio: false,
    headless: true,
    timeout: 1000000
  });
  const page = await browser.newPage();
  const urls = [];

    await page.setRequestInterception(true,);
    page.on('request', request => {
      urls.push(request.url());
      request.continue(); 
    }); 

    await page.setDefaultNavigationTimeout(0);
    await page.goto('https://wondr.space/milo-pmgm/', {
        waitUntil: ['load', 'networkidle2'],
        timeout: 1000000
    })
   
  await page.waitForFunction(
      'document.querySelector("body").innerText.includes("PLAY")',{timeout: 6660000}
  );
  await page.click('button[class="vjs-control vjs-button vjs-custom-play-button"]')

  await page.waitForFunction(
      'document.querySelector("body").innerText.includes("true")',{timeout: 6660000}
  );  
  await page.click('button[class="vjs-control vjs-button vjs-custom-opt-button-true"]')
 
  // await page.waitForFunction(
  //     'document.querySelector("body").innerText.includes("true")',{timeout: 6660000}
  // );
  // await page.click('button[class="vjs-control vjs-button vjs-custom-opt-button-true"]')

  // await page.waitForFunction(
  //     'document.querySelector("body").innerText.includes("true")',{timeout: 6660000}
  // );
  // await page.click('button[class="vjs-control vjs-button vjs-custom-opt-button-true"]')

  console.log(urls[urls.length-1]);

  await browser.close();
})();