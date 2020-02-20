const pptr = require('puppeteer');

(async() => {
  const browser = await pptr.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true,
  });
  const page = await browser.newPage();
  const urls = [];
  await page.setRequestInterception(true);
  page.on('request', request => {
    urls.push(request.url());
    request.continue();
  });

  await page.goto('https://wondr.space/milo-pmgm/', {timeout: 10000000,waitUntil: 'networkidle2'})

  await page.waitForFunction(
      'document.querySelector("body").innerText.includes("PLAY")',{timeout: 6660000}
  );
  await page.click('button[class="vjs-control vjs-button vjs-custom-play-button"]')

  await page.waitForFunction(
      'document.querySelector("body").innerText.includes("true")',{timeout: 6660000}
  );
  await page.click('button[class="vjs-control vjs-button vjs-custom-opt-button-true"]')
 
  await page.waitForFunction(
      'document.querySelector("body").innerText.includes("true")',{timeout: 6660000}
  );
  await page.click('button[class="vjs-control vjs-button vjs-custom-opt-button-true"]')

  await page.waitForFunction(
      'document.querySelector("body").innerText.includes("true")',{timeout: 6660000}
  );
  await page.click('button[class="vjs-control vjs-button vjs-custom-opt-button-true"]')
  console.log(urls[urls.length-1]);

  await browser.close();
})();