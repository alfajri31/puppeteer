// PREPEARING
require('../../../initialize')
require('../../../initialize').page


let dir= path.join(__dirname,'../../../Renders/Unit/'+resolusi)
fs.readdir(dir, (err, files) => {
    for (const file of files) {
        fs.unlink(path.join(dir, file), err => {
          if (err) throw err;
        });
    }
})

console.log(path.join(__dirname,'../','../','../'))
beforeAll(async() => {
    browser = await puppeteer.launch({
        headless: true,
        executablePath: path.join(__dirname,'../','../','../','/node_modules/puppeteer/.local-chromium/linux-706915/chrome-linux/chrome'),
        args: [ '--ignore-certificate-errors','--no-sandbox']
    })
    page = await browser.newPage()
    await page.authenticate({ 
        username: 'grt' , 
        password:'pina2019' 
    });
    await page.setViewport({
        width: width,
        height: 1200
    })
    await page.setUserAgent(useragent)
});

afterAll(async() => {
    await browser.close()
})
  
  // START TO TESTING
  describe("leaderboard",() => {
    test("check leaderboard", async() => { 
        await page.waitFor(3000)
        await page.goto('https://nutea.co.id/leaderboard')
        await page.screenshot({
            path: path.join(__dirname,'../../../Renders/Unit/'+resolusi+'/get leaderboard 1'+' '+date.toDateString()+'.png'),
            fullpage: true,
            waitUntil :'networkidle2'
        })
        await page.waitForSelector('img[src="https://nutea.co.id/themes/nukrazy/assets/images/game-2.png?v=1.0.2"]', {visible: true,timeout: 60000});
        await page.waitFor(3000)
        await page.screenshot({
            path: path.join(__dirname,'../../../Renders/Unit/'+resolusi+'/get leaderboard 2'+' '+date.toDateString()+'.png'),
            fullpage: true,
            waitUntil :'networkidle2'
        })
        await page.waitForSelector('img[src="https://nutea.co.id/themes/nukrazy/assets/images/game-3.png?v=1.0.2"]', {visible: true,timeout: 60000});
        await page.waitFor(3000)
        await page.screenshot({
            path: path.join(__dirname,'../../../Renders/Unit/'+resolusi+'/get leaderboard 3'+' '+date.toDateString()+'.png'),
            fullpage: true,
            waitUntil :'networkidle2'
        })
        fs.writeFileSync('./test/nutea/tanggal',date.toDateString(), function(err) {
            if (err) {
              console.log(err);
            }
        })
       
    },100000)  
  });

  

  
