 // PREPEARING
let init = require('../../initialize')
require('../../initialize').page
require('../../initialize').browser

let dir1,dir2,dir3,dir4;

dir1 = path.join(__dirname,'../../../Renders/Unit/milo/'+res_mobile)
fs.readdir(dir1, (err, files) => {
    for (const file of files) {
        fs.unlink(path.join(dir1, file), err => {
          if (err) throw err;
        });
    }
})


dir2= path.join(__dirname,'../../../Renders/Unit/milo/'+res_desktop)
fs.readdir(dir2, (err, files) => {
    for (const file of files) {
        fs.unlink(path.join(dir2, file), err => {
          if (err) throw err;
        });
    }
})


dir3= path.join(__dirname,'../../../Renders/Unit/milo/'+res_retina)
fs.readdir(dir3, (err, files) => {
    for (const file of files) {
        fs.unlink(path.join(dir3, file), err => {
          if (err) throw err;
        });
    }
})

dir4= path.join(__dirname,'../../../Renders/Unit/milo/'+res_tablet)
fs.readdir(dir4, (err, files) => {
    for (const file of files) {
        fs.unlink(path.join(dir4, file), err => {
          if (err) throw err;
        });
    }
})

const url = ['https://newmilo.wtid.dev/','https://newmilo.wtid.dev/produk','https://newmilo.wtid.dev/artikel','https://newmilo.wtid.dev/activ-indonesia','https://newmilo.wtid.dev/whats-happening','https://newmilo.wtid.dev/activ-go','https://newmilo.wtid.dev/artikel/4-alasan-anak-perlu-minum-coklat-milo-saat-sarapan','https://newmilo.wtid.dev/artikel/6-cara-mendidik-anak-agar-mandiri-dan-berani-lewat-olahraga','https://newmilo.wtid.dev/whats-happening/promosi-milo-3in1','https://newmilo.wtid.dev/whats-happening/event-milo-3in1','https://newmilo.wtid.dev/produk?category=milo-bubuk','https://newmilo.wtid.dev/produk?category=milo-siap-minum','https://newmilo.wtid.dev/produk?category=milo-sereal','https://newmilo.wtid.dev/produk/milo-activ-go-pouch-1-kg','https://newmilo.wtid.dev/produk/milo-activ-go-pouch-800-g','https://newmilo.wtid.dev/produk/milo-activ-go-polybag-11x22g','https://newmilo.wtid.dev/produk/milo-activ-go-sachet-22-g','https://newmilo.wtid.dev/produk/milo-activ-go-pouch-300g','https://newmilo.wtid.dev/produk/milo-3in1-pouch-300g','https://newmilo.wtid.dev/produk/milo-3in1-pouch-1kg','https://newmilo.wtid.dev/produk/milo-3in1-polybag-20x35g','https://newmilo.wtid.dev/produk/milo-3in1-polybag-10x35g','https://newmilo.wtid.dev/produk/milo-3in1-polybag-4x35g','https://newmilo.wtid.dev/produk/milo-3in1-sachet-35g','https://newmilo.wtid.dev/produk/milo-3in1-pouch-800g','https://newmilo.wtid.dev/artikel/inspirasi-bekal-piknik-anak-yang-sehat-praktis','https://newmilo.wtid.dev/artikel/manfaat-susu-coklat-yang-mengandung-vitamin-d-kalsium-untuk-anak','https://newmilo.wtid.dev/artikel/minuman-coklat-bubuk-untuk-atasi-masalah-stres-pada-anak','https://newmilo.wtid.dev/artikel/yuk-tetap-aktif-dengan-ajak-anak-senam-aerobik','https://newmilo.wtid.dev/artikel/manfaat-lari-untuk-kesehatan-emosional-anak','https://newmilo.wtid.dev/artikel/anak-sering-lemas-amati-tanda-kekurangan-vitamin-b-berikut','https://newmilo.wtid.dev/artikel/tinggi-vitamin-b-complex-ini-alasan-milo-baik-untuk-lengkapi-sarapan-anak','https://newmilo.wtid.dev/artikel/4-cara-untuk-bantu-anak-percaya-diri-dengan-olahraga','https://newmilo.wtid.dev/artikel/manfaat-minum-coklat-saat-sarapan-untuk-tunjang-aktivitas-anak','https://newmilo.wtid.dev/whats-happening/event-tokopedia-shopee','https://newmilo.wtid.dev/whats-happening/milo-di-mid-year-sale-shopee-tokopedia','https://newmilo.wtid.dev/artikel/perhatikan-4-hal-ini-saat-memilih-bubuk-coklat-untuk-minuman-anak','https://newmilo.wtid.dev/produk/milo-uht-kotak-190ml','https://newmilo.wtid.dev/produk/milo-uht-kotak-115ml','https://newmilo.wtid.dev/produk/milo-kaleng-calcium-240ml','https://newmilo.wtid.dev/produk/milo-kaleng-original-240-ml','https://newmilo.wtid.dev/produk/milo-nutri-botol-225ml','https://newmilo.wtid.dev/produk/milo-sereal-combo-pack-32g','https://newmilo.wtid.dev/produk/milo-sereal-sachet-15g','https://newmilo.wtid.dev/produk/milo-sereal-boks-170g','https://newmilo.wtid.dev/produk/milo-sereal-boks-330g']
let i = 0;

beforeAll(async() => {
    browser = await puppeteer.launch({
        headless: headless,
        args: [ '--ignore-certificate-errors' ]
    })

    page = await browser.newPage()
    await page.setViewport({
        width: width_mobile,
        height: height_mobile
    })

    name = name
    email = email
    password = password
    confirm_password = confirm_pass
    await page.setUserAgent(useragent)
  },90000);

      beforeEach(async()=>{
        await page.setViewport({
          width: width_mac,
          height: height_mac
      })
  })


afterAll(() => {
    browser.close()
})
  // START TO TESTING
  describe("e2e testing",() => {
    test("testing responsive in mobile", async () => { 
      while (i<=url.length-1) {
        await page.goto(url[i],{waitUntil: 'networkidle2'})
        await init.src_height().then(async (value)=>{
            await page.setViewport({width: width_mobile,height : value})
            await page.screenshot({
                path: path.join(__dirname,'../../../Renders/Unit/milo/'+res_mobile+'/'+i+'.png'),
                fullpage: true,
                waitUntil : 'networkidle2'
            })
        }) 
        console.log(url[i]);
        i = i + 1;
      }
    },3600000)

    test("testing responsive in retina", async () => { 
      i=0;
      while (i<=url.length-1) {
        await page.goto(url[i],{waitUntil: 'networkidle2'})
        await init.src_height().then(async (value)=>{
            await page.setViewport({width: width_retina,height : value})
            await page.screenshot({
                path: path.join(__dirname,'../../../Renders/Unit/milo/'+res_retina+'/'+i+'.png'),
                fullpage: true,
                waitUntil : 'networkidle2'
            })
        }) 
        console.log(url[i]);
        i = i + 1;
      }
    },3600000)

    test("testing responsive in desktop", async () => { 
      i=0;
      while (i<=url.length-1) {
        await page.goto(url[i],{waitUntil: 'networkidle2'})
        await init.src_height().then(async (value)=>{
            await page.setViewport({width: width_desktop,height : value})
            await page.screenshot({
                path: path.join(__dirname,'../../../Renders/Unit/milo/'+res_desktop+'/'+i+'.png'),
                fullpage: true,
                waitUntil : 'networkidle2'
            })
        }) 
        console.log(url[i]);
        i = i + 1;
      }
    },3600000)

    
    test("testing responsive in tablet", async () => { 
      i=0;
      while (i<=url.length-1) {
        await page.goto(url[i],{waitUntil: 'networkidle2'})
        await init.src_height().then(async (value)=>{
            await page.setViewport({width: width_tablet,height : value})
            await page.screenshot({
                path: path.join(__dirname,'../../../Renders/Unit/milo/'+res_tablet+'/'+i+'.png'),
                fullpage: true,
                waitUntil : 'networkidle2'
            })
        }) 
        console.log(url[i]);
        i = i + 1;
      }
    },3600000)
  });

  

  
