 // PREPEARING
 require('../../initialize').page
 require('../../initialize').browser
 
 beforeAll(async() => {
     browser = await puppeteer.launch({
         headless: headless,
         args: [ '--ignore-certificate-errors','--no-sandbox']
     })
     page = await browser.newPage()
},10000)
 
 afterAll(() => {
     browser.close()
 })

// START TO TESTING
describe("testt kesamaan untuk lactogorw produk page",() => {
    test("test kesamaan thumbnail dengan detail image lactogrow 3 1-3 tahun 180g madu ", async () => { 
        await page.goto('https://lacto.wtid.dev/product/',{waitUntil: 'networkidle2'})
        const imgsA = await page.$$eval('.media img[src]', imgs => imgs.map(img => img.getAttribute('src')));
        await page.click('a[href="https://lacto.wtid.dev//lactogrow-3-madu-180g"]')
        await page.waitFor(1000)
        const imgsB = await page.$$eval('.card-body img[src]', imgs => imgs.map(img => img.getAttribute('src')));
        await expect(imgsA[0]).toMatch(imgsB[0])
        const a = await page.$eval('h3[class="h1 mb-0 font-weight-bold"]', el => el.innerText);
        await expect(a).toMatch('LACTOGROW 3 Madu')
        const b = await page.$eval('p[class="text-primary font-weight-bold"]', el => el.innerText);
        await expect(b).toMatch('1-3 Tahun - 180g')
    },100000);

    test("test kesamaan thumbnail dengan detail image lactogrow 3 1-3 tahun 1kg madu ", async () => { 
        await page.goto('https://lacto.wtid.dev/product/',{waitUntil: 'networkidle2'})
        const imgsA = await page.$$eval('.media img[src]', imgs => imgs.map(img => img.getAttribute('src')));
        await page.click('a[href="https://lacto.wtid.dev//lactogrow-3-madu-1kg"]')
        await page.waitFor(1000)
        const imgsB = await page.$$eval('.card-body img[src]', imgs => imgs.map(img => img.getAttribute('src')));
        await expect(imgsA[1]).toMatch(imgsB[0])
        const a = await page.$eval('h3[class="h1 mb-0 font-weight-bold"]', el => el.innerText);
        await expect(a).toMatch('LACTOGROW 3 Madu')
        const b = await page.$eval('p[class="text-primary font-weight-bold"]', el => el.innerText);
        await expect(b).toMatch('1-3 Tahun - 1kg')
    },100000);
    
    test("test kesamaan thumbnail dengan detail image untuk lactogrow 3 1-3 tahun 1kg vanila ", async () => { 
        await page.goto('https://lacto.wtid.dev/product/',{waitUntil: 'networkidle2'})
        const imgsA = await page.$$eval('.media img[src]', imgs => imgs.map(img => img.getAttribute('src')));
        await page.click('a[href="https://lacto.wtid.dev//lactogrow-3-vanila-1kg"]')
        await page.waitFor(1000)
        const imgsB = await page.$$eval('.card-body img[src]', imgs => imgs.map(img => img.getAttribute('src')));
        await expect(imgsA[2]).toMatch(imgsB[0])
        const a = await page.$eval('h3[class="h1 mb-0 font-weight-bold"]', el => el.innerText);
        await expect(a).toMatch('LACTOGROW 3 Vanila')
        const b = await page.$eval('p[class="text-primary font-weight-bold"]', el => el.innerText);
        await expect(b).toMatch('1-3 Tahun - 1kg')
    },100000);

    test("test kesamaan thumbnail dengan detail image untuk lactogrow 4 prasekolah tahun 1kg vanila ", async () => { 
        await page.goto('https://lacto.wtid.dev/product/',{waitUntil: 'networkidle2'})
        const imgsA = await page.$$eval('.media img[src]', imgs => imgs.map(img => img.getAttribute('src')));
        await page.click('a[href="https://lacto.wtid.dev//lactogrow-4-vanila-1kg"]')
        await page.waitFor(1000)
        const imgsB = await page.$$eval('.card-body img[src]', imgs => imgs.map(img => img.getAttribute('src')));
        await expect(imgsA[3]).toMatch(imgsB[0])
        const a = await page.$eval('h3[class="h1 mb-0 font-weight-bold"]', el => el.innerText);
        await expect(a).toMatch('LACTOGROW 4 Vanila')
        const b = await page.$eval('p[class="text-primary font-weight-bold"]', el => el.innerText);
        await expect(b).toMatch('Pra Sekolah - 1kg')
    },100000);

    test("test kesamaan thumbnail dengan detail image untuk lactogrow 4 prasekolah tahun 1kg madu ", async () => { 
        await page.goto('https://lacto.wtid.dev/product/',{waitUntil: 'networkidle2'})
        const imgsA = await page.$$eval('.media img[src]', imgs => imgs.map(img => img.getAttribute('src')));
        await page.click('a[href="https://lacto.wtid.dev//lactogrow-4-madu-1kg"]')
        await page.waitFor(1000)
        const imgsB = await page.$$eval('.card-body img[src]', imgs => imgs.map(img => img.getAttribute('src')));
        await expect(imgsA[4]).toMatch(imgsB[0])
        const a = await page.$eval('h3[class="h1 mb-0 font-weight-bold"]', el => el.innerText);
        await expect(a).toMatch('LACTOGROW 4 Madu')
        const b = await page.$eval('p[class="text-primary font-weight-bold"]', el => el.innerText);
        await expect(b).toMatch('Pra Sekolah - 1kg')
    },100000);

    test("test kesamaan thumbnail dengan detail image untuk lactogrow 3 prasekolah tahun 350g madu ", async () => { 
        await page.goto('https://lacto.wtid.dev/product/',{waitUntil: 'networkidle2'})
        const imgsA = await page.$$eval('.media img[src]', imgs => imgs.map(img => img.getAttribute('src')));
        await page.click('a[href="https://lacto.wtid.dev//lactogrow-3-madu-350g"]')
        await page.waitFor(1000)
        const imgsB = await page.$$eval('.card-body img[src]', imgs => imgs.map(img => img.getAttribute('src')));
        await expect(imgsA[5]).toMatch(imgsB[0])
        const a = await page.$eval('h3[class="h1 mb-0 font-weight-bold"]', el => el.innerText);
        await expect(a).toMatch('LACTOGROW 3 Madu')
        const b = await page.$eval('p[class="text-primary font-weight-bold"]', el => el.innerText);
        await expect(b).toMatch('Pra Sekolah - 350g')
    },100000);

    test("test kesamaan thumbnail dengan detail image untuk lactogrow 3 1-3 tahun 350g original", async () => { 
        await page.goto('https://lacto.wtid.dev/product/',{waitUntil: 'networkidle2'})
        const imgsA = await page.$$eval('.media img[src]', imgs => imgs.map(img => img.getAttribute('src')));
        await page.click('a[href="https://lacto.wtid.dev//lactogrow-3-original-350g"]')
        await page.waitFor(1000)
        const imgsB = await page.$$eval('.card-body img[src]', imgs => imgs.map(img => img.getAttribute('src')));
        await expect(imgsA[6]).toMatch(imgsB[0])
        const a = await page.$eval('h3[class="h1 mb-0 font-weight-bold"]', el => el.innerText);
        await expect(a).toMatch('LACTOGROW 3 Original')
        const b = await page.$eval('p[class="text-primary font-weight-bold"]', el => el.innerText);
        await expect(b).toMatch('1-3 Tahun - 350g')
    },100000);

    test("test kesamaan thumbnail dengan detail image untuk lactogrow 3 1-3 tahun 350g vanila", async() => {
        await page.goto('https://lacto.wtid.dev/product/',{waitUntil: 'networkidle2'})
        const imgsA = await page.$$eval('.media img[src]', imgs => imgs.map(img => img.getAttribute('src')));
        await page.click('a[href="https://lacto.wtid.dev//lactogrow-3-vanila-350g"]')
        await page.waitFor(1000)
        const imgsB = await page.$$eval('.card-body img[src]', imgs => imgs.map(img => img.getAttribute('src')));
        await expect(imgsA[7]).toMatch(imgsB[0])
        const a = await page.$eval('h3[class="h1 mb-0 font-weight-bold"]', el => el.innerText);
        await expect(a).toMatch('LACTOGROW 3 Vanila')
        const b = await page.$eval('p[class="text-primary font-weight-bold"]', el => el.innerText);
        await expect(b).toMatch('1-3 Tahun - 350g')
    },100000)
   
    test("test kesamaan thumbnail dengan detail image untuk lactogrow 3 1-3 tahun 750g original", async() => {
        await page.goto('https://lacto.wtid.dev/product/',{waitUntil: 'networkidle2'})
        const imgsA = await page.$$eval('.media img[src]', imgs => imgs.map(img => img.getAttribute('src')));
        await page.click('a[href="https://lacto.wtid.dev//lactogrow-3-original-750g"]')
        await page.waitFor(1000)
        const imgsB = await page.$$eval('.card-body img[src]', imgs => imgs.map(img => img.getAttribute('src')));
        await expect(imgsA[8]).toMatch(imgsB[0])
        const a = await page.$eval('h3[class="h1 mb-0 font-weight-bold"]', el => el.innerText);
        await expect(a).toMatch('LACTOGROW 3 Original')
        const b = await page.$eval('p[class="text-primary font-weight-bold"]', el => el.innerText);
        await expect(b).toMatch('1-3 Tahun - 750g')
    },100000)
    
    test("test kesamaan thumbnail dengan detail image untuk lactogrow 4 prasekolah tahun 750g vanila", async() => {
        await page.goto('https://lacto.wtid.dev/product/',{waitUntil: 'networkidle2'})
        const imgsA = await page.$$eval('.media img[src]', imgs => imgs.map(img => img.getAttribute('src')));
        await page.click('a[href="https://lacto.wtid.dev//lactogrow-4-vanila-750g"]')
        await page.waitFor(1000)
        const imgsB = await page.$$eval('.card-body img[src]', imgs => imgs.map(img => img.getAttribute('src')));
        await expect(imgsA[9]).toMatch(imgsB[0])
        const a = await page.$eval('h3[class="h1 mb-0 font-weight-bold"]', el => el.innerText);
        await expect(a).toMatch('LACTOGROW 4 Vanila')
        const b = await page.$eval('p[class="text-primary font-weight-bold"]', el => el.innerText);
        await expect(b).toMatch('Pra Sekolah - 750g')
    },100000)
   
    test("test kesamaan thumbnail dengan detail image untuk lactogrow 4 prasekolah tahun 750g madu", async() => {
        await page.goto('https://lacto.wtid.dev/product/',{waitUntil: 'networkidle2'})
        const imgsA = await page.$$eval('.media img[src]', imgs => imgs.map(img => img.getAttribute('src')));
        await page.click('a[href="https://lacto.wtid.dev//lactogrow-4-madu-750g"]')
        await page.waitFor(1000)
        const imgsB = await page.$$eval('.card-body img[src]', imgs => imgs.map(img => img.getAttribute('src')));
        await expect(imgsA[10]).toMatch(imgsB[0])
        const a = await page.$eval('h3[class="h1 mb-0 font-weight-bold"]', el => el.innerText);
        await expect(a).toMatch('LACTOGROW 4 Madu')
        const b = await page.$eval('p[class="text-primary font-weight-bold"]', el => el.innerText);
        await expect(b).toMatch('Pra Sekolah - 750g')
    },100000)

    test("test kesamaan thumbnail dengan detail image untuk lactogrow 3 1-3 tahun 750g madu", async() => {
        await page.goto('https://lacto.wtid.dev/product/',{waitUntil: 'networkidle2'})
        const imgsA = await page.$$eval('.media img[src]', imgs => imgs.map(img => img.getAttribute('src')));
        await page.click('a[href="https://lacto.wtid.dev//lactogrow-3-madu-750g"]')
        await page.waitFor(1000)
        const imgsB = await page.$$eval('.card-body img[src]', imgs => imgs.map(img => img.getAttribute('src')));
        await expect(imgsA[11]).toMatch(imgsB[0])
        const a = await page.$eval('h3[class="h1 mb-0 font-weight-bold"]', el => el.innerText);
        await expect(a).toMatch('LACTOGROW 3 Madu')
        const b = await page.$eval('p[class="text-primary font-weight-bold"]', el => el.innerText);
        await expect(b).toMatch('1-3 Tahun - 750g')
    },100000)

    test("test kesamaan thumbnail dengan detail image untuk lactogrow 3 1-3 tahun 750g vanila", async() => {
        await page.goto('https://lacto.wtid.dev/product/',{waitUntil: 'networkidle2'})
        const imgsA = await page.$$eval('.media img[src]', imgs => imgs.map(img => img.getAttribute('src')));
        await page.click('a[href="https://lacto.wtid.dev//lactogrow-3-vanila-750g"]')
        await page.waitFor(1000)
        const imgsB = await page.$$eval('.card-body img[src]', imgs => imgs.map(img => img.getAttribute('src')));
        await expect(imgsA[12]).toMatch(imgsB[0])
        const a = await page.$eval('h3[class="h1 mb-0 font-weight-bold"]', el => el.innerText);
        await expect(a).toMatch('LACTOGROW 3 Vanila')
        const b = await page.$eval('p[class="text-primary font-weight-bold"]', el => el.innerText);
        await expect(b).toMatch('1-3 Tahun - 750g')
    },100000)

})
 
   
 
   
 