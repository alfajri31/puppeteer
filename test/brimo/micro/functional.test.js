//initialize library
const puppeteer = require('../../initialize').puppeteer
require('../../initialize').page
require('../../initialize').browser
const moment = require('moment-timezone');
const playwright = require('playwright');
<<<<<<< HEAD
let init = require('../../initialize');
=======
>>>>>>> c43c1fff362b2188e252325bc9f2ce0e84ff652a

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
<<<<<<< HEAD
=======
const URL = 'https://brimo.wtid.dev/intro?step=1&token=6aa10b3e9f1482e49b7eb716b8a1a174'
>>>>>>> c43c1fff362b2188e252325bc9f2ce0e84ff652a
const phone = mapString('08AAAAAAAAAA', randChar)

//preapering chromium launch
beforeAll(async() => {
    browser = await playwright['chromium'].launch({  
        headless: headless,
<<<<<<< HEAD
        args: ['--no-sandbox','--use-fake-ui-for-media-stream','--use-fake-device-for-media-stream']
=======
        args: ['--use-fake-ui-for-media-stream'],
        executablePath: path.join(__dirname,'../','../','../','/node_modules/playwright-core/.local-chromium/linux-740847/chrome-linux/chrome')
>>>>>>> c43c1fff362b2188e252325bc9f2ce0e84ff652a
    });
    const context = await browser.newContext();
    page = await context.newPage();
},90000);

beforeEach(async()=>{
    await page.setViewportSize({
      width: 1440,
      height: height_mac
  })
})

//close all chromium
afterEach(async() => {
    // await browser.close();
})

async function getTestedTime() {
    console.log(moment().tz('Asia/jakarta').format('MMMM Do YYYY, h:mm:ss a'));
}

async function hitToken() {
    const request = require('request');

    const options = {
        url: 'https://api-brimonew.wtid.dev/api/device/access',
        method: 'POST',
        headers: {
            'Authorization':  'Bearer 5LGae5Q7fMmnRwDBthmgdBkb7',
            'Accept': 'application/json',
            'Accept-Charset': 'utf-8'
        },
        json: {
            "email" : "test321@gmail.com",
            "phone" : "086756524123",
            "cif_no" : "12345678"
        }
    };


    let newurl = request(options,function(err, res, body){})
    .then( result => {
        return result
    })
   return Promise.resolve(newurl).then(result => { return result.data.url});

}

//start testing
describe("brimo testing",() => {
    
    test("step 1 should be success", async() =>{
        async function getSelfie() {
            //input selfie
            await page.click('#form-upload > div.tablist > div > div > div:nth-child(1) > div:nth-child(1) > div > div > div > div:nth-child(2) > button')
            await page.waitFor(3000);
            await page.click('button[class="btn mr-4 ml-4 btn-capture"]')
            await page.click('svg[data-icon="check"]')
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
            let namaLengkap= await page.$('input[id="nama_lengkap"]');
            await namaLengkap.click({clickCount: 7});
            await namaLengkap.press('Backspace'); 
            await page.type('input[id="nama_lengkap"]','Raden Muhammad Alfajri')
        }
        
        async function isiNamaSesuaiID(){
            await page.type('input[id="nama_sesuai_id"]','Raden Muhammad Alfajri')
        }
        
        async function jenisKelamin(){
            await page.click('.full-width #jk-2')
        }
        
        async function jenisIdentitas(){
            await page.waitForSelector('.col-12 > #jenis_identitas > #vs1__combobox > .vs__actions > .vs__open-indicator')
            await page.click('.col-12 > #jenis_identitas > #vs1__combobox > .vs__actions > .vs__open-indicator')
            await page.waitForSelector('span > #form-upload > .tablist > .card > .card-body')
            await page.click('span > #form-upload > .tablist > .card > .card-body')
        }
        
        async function nomorIdentitas() {
            let nomorIdentitas= await page.$('input[id="nomor_identitas"]');
            await nomorIdentitas.click({clickCount: 20});
            await nomorIdentitas.press('Backspace'); 
            await page.type('input[id="nomor_identitas"]','1502111910090001');
        }
        
        async function nomorNPWP(){
            await page.type('input[id="nomor_npwp"]','09.254.294.3-407.000');
        }
        
        async function tempatLahir(){
            let tempatLahir= await page.$('input[id="tempat_lahir"]');
            await tempatLahir.click({clickCount: 20});
            await tempatLahir.press('Backspace'); 
            await page.type('input[id="tempat_lahir"]','sukabumi');
        }
        
        async function tanggalLahir(){
            await page.type('input[id="tanggal_lahir"]','20/12/1993');
        }
        
        async function kewarganegaraan() {
            await page.click('input[id="kewarganegaraan-1"]');
        }
        
        async function email() {
            let email= await page.$('input[id="email"]');
            await email.click({clickCount: 20});
            await email.press('Backspace'); 
            await page.type('input[id="email"]','test1@mailinator.com');
        }
        
        async function nohp() {
            let nohp= await page.$('input[id="nohp"]');
            await nohp.click({clickCount: 20});
            await nohp.press('Backspace'); 
            await page.type('input[id="nohp"]','087564783765');
        }
        
        async function domisili() {
            let email= await page.$('textarea[id="alamat"]');
            await email.click({clickCount: 20});
            await email.press('Backspace'); 
            await page.type('textarea[id="alamat"]','Jalan Arteri Raya 17, RT 06 RW 07, Kelurahan Macanan, Kecamatan Bumiayu, Kota Surabaya, Jawa Timur, 224352');
        }
        
        async function kota() {
            await page.click('.col-12 > #kota > #vs2__combobox > .vs__actions > .vs__open-indicator')
            await page.type('span[class="vs__selected"]','Kab. Aceh Barat')
            await page.keyboard.press('Enter');
        }
        
        async function rt() {
            await page.type('input[id="rt"]','09')
        }
        
        async function rw() {
            await page.type('input[id="rw"]','08')
        }
        
        async function kodePos() {
            await page.type('input[id="kode_pos"]','22122')
        }
        
        async function KodeTelepon() {
            await page.type('input[id="telepon_kode_area"]','266')
        }
        
        async function telepon() {
            await page.type('input[id="telepon_nomor"]','215428')
        }
        
        async function statusRumah() {
            await page.click('input[id="status-rumah-3"]')
        }
        
        async function lamaTahun() {
            await page.type('input[id="lama_tahun"]','5')
        }
        
        async function lamaBulan() {
            await page.type('input[id="lama_bulan"]','2')
        }
        
        async function statusNikah() {
            await page.click('#status_pernikahan > #vs3__combobox > .vs__actions > .vs__open-indicator > path')
            await page.type('span[class="vs__selected"]','Single')
            await page.keyboard.press('Enter');
        }
        
        async function jumlahTanggung() {
            await page.type('input[id="jumlah_tanggungan"]','4')
        }
        
        async function pendidikan() {
            await page.click('#pendidikan_terakhir > #vs4__combobox > .vs__actions > .vs__open-indicator > path');
            await page.type('span[class="vs__selected"]','S1')
            await page.keyboard.press('Enter');
        }
        
        async function namaIbu() {
            let namaIbu = await page.$('input[id="nama_ibu_kandung"]');
            await namaIbu.click({clickCount: 20});
            await namaIbu.press('Backspace'); 
            await page.type('input[id="nama_ibu_kandung"]','Loremaum')
        }
        getTestedTime()
        await hitToken().then( result => console.log(result));
        await hitToken().then( async result => await page.goto(result));
        await getSelfie();
        await getKtp();
        await getSlipGaji();
        await getNpwp();
        await isiNamaLengkap();
        await isiNamaSesuaiID()
        await jenisKelamin()
        await jenisIdentitas()
        await nomorIdentitas()
        await nomorNPWP()
        await tempatLahir()
        await tanggalLahir()
        await kewarganegaraan()
        await email()
        await nohp()
        await domisili()
        await kota()
        await rt()
        await rw()
        await kodePos()
        await KodeTelepon()
        await telepon()
        await statusRumah()
        await lamaTahun()
        await lamaBulan()
        await statusNikah()
        await jumlahTanggung()
        await pendidikan();
        await namaIbu()
        await init.optmimal_ss('brimo','mobile','step-1',400,'chromium')
        await init.optmimal_ss('brimo','tablet','step-1',800,'chromium')
        await init.optmimal_ss('brimo','desktop','step-1',1400,'chromium')
        await init.optmimal_ss('brimo','extra desktop','step-1',2000,'chromium')
        await page.click('button[type="submit"]');
        await expect('sukses').toMatch('gagal')
    },3600000)

    test.skip('nomor telepon tidak perlu prefix 0 atau kode area', async() => {
        
    },3600000)

    test.skip('gaji pertahun gunakan formatter thousand', async() => {

    },3600000)

    test.skip('Perusahaan lama bekerja validasi error, padahal field "Lama Bekerja Tahun"dan "Lama Bekerja Bulan"sudah diisi', async() => {

    },3600000)

<<<<<<< HEAD
    test.skip('Update Data Kota', async() => {
=======
async function kewarganegaraan() {
    await page.click('input[id="kewarganegaraan-1"]');
}
>>>>>>> c43c1fff362b2188e252325bc9f2ce0e84ff652a

    },3600000)

    test.skip('Rekening BRI limit 15 digit (min. 15 digit, maks. 15 digit). Hanya 15 Digit', async() => {

<<<<<<< HEAD
    },3600000)

    test.skip('NPWP di-sanitize dan length nya adalah 15 digit', async() => {

    },3600000)

    test.skip('NPWP menggunakan formatter dengan format NPWP', async() => {

    },3600000)

    test.skip('Image kartu di Halaman intro untuk device yang kecil overflow', async() => {

    },3600000)

    test.skip('Setelah user memilih kamera, lalu klik "Foto NPWP". Kamera tidak muncul', async() => {

    },3600000)

    test.skip('Jika kamera tidak ditemukan, layar hanya akan menampilkan bar loading saja. Munculkan pesan notifikasi "Kamera tidak ditemukan. Silakan enable Kamera Anda"', async() => {

    },3600000)

    test.skip('Pilihan "Status Rumah" memanjang kebawah', async() => {

    },3600000)

    test.skip('Field "Jumlah Tanggungan" dibatasi maksimal 2 digit saja. Dengan validasi range antara "0-99" dan tidak perlu pakai format thousand', async() => {

    },3600000)

    test.skip('Field "Lama Menempati" dibatasi maksimal 2 digit angka saja. Dengan validasi range antara "0-99" ', async() => {

    },3600000)

    test.skip('Field "RT" dibatasi maksimal 3 digit angka saja. Dengan validasi range antara "000 - 999"', async() => {

    },3600000)

    test.skip('Field "RW" dibatasi maksimal 3 digit angka saja. Dengan validasi range antara "000 - 999"', async() => {

    },3600000)

    test.skip('Field "Kode Pos" dibatasi maksimal 5 digit angka saja', async() => {

    },3600000)

    test.skip('Field "Kode Area Rumah" dibatas maksimal 4 digit angka saja', async() => {

    },3600000)

    test.skip('Field "Nomor Telepon Rumah" dibatasi maksimal 10 digit angka saja', async() => {

    },3600000)

    test.skip('Field "Nomor NPWP" masih bisa dimasukkan lebih dari 15 digit', async() => {

    },3600000)



=======
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
>>>>>>> c43c1fff362b2188e252325bc9f2ce0e84ff652a
})
