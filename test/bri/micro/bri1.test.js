require('../../initialize')

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


let dir= path.join(__dirname,'../../../Renders/Unit/bri/'+resolusi)
fs.readdir(dir, (err, files) => {
    for (const file of files) {
        fs.unlink(path.join(dir, file), err => {
          if (err) throw err;
        });
    }
})

beforeAll(async() => {
  browser = await puppeteer.launch({
    headless: headless,
    // slowMo: 20,
    // executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: [ '--ignore-certificate-errors' ]
  })
  page = await browser.newPage()
  await page.authenticate({ 
      username: 'grt' , 
      password:'pina2019' 
  });
  await page.setViewport({
      width: width,
      height: height
  })
  // await page.emulate(device)
  name = name
  email = email
  password = password
  confirm_password = confirm_pass
  await page.setUserAgent(useragent)
},90000)


afterAll(() => {
  browser.close()
})

  // START TO TESTING
  describe("input form tanpa privyID",() => {

    test("checklist tnc", async() => { 
      await page.goto('https://britouch.mrmbdg.com/apply');
      await page.waitForSelector('a[data-id="9"]', 
      {
        visible : true,
        timeout: 20000
      });
      await page.waitFor(1000)
      await page.click('a[data-id="9"]');
      await page.waitForSelector('a[class="btn btn-bri btn-bri__orange btn-cta btn-continue"]', 
      {
        visible : true,
        timeout: 20000
      });
      await page.waitFor(1000)
      await page.click('a[class="btn btn-bri btn-bri__orange btn-cta btn-continue"]');
      await page.waitForSelector('label[for="tnc-agreement-check"]', 
      {
        visible : true,
        timeout: 20000
      });
      await page.waitFor(1000)
      await page.click('label[for="tnc-agreement-check"]');
      await page.waitFor(1000)
      await page.click('p[class="text-center btn-wrapper"]');
    },900000)

    test('fill form step one', async() =>{

      try {
        await page.waitForSelector('label[for="selfie_scan"]', 
        {
          visible: true,
          timeout: 20000
        });
        await page.screenshot({
          path: path.join(__dirname,'../../../Renders/Unit/bri/'+resolusi+'/'+no+'-step 1.png'),
          fullpage: true
        })
      }
      catch(err) {
        await page.screenshot({
          path: path.join(__dirname,'../../../Renders/Unit/bri/'+resolusi+'/'+no+'-step 1.png'),
          fullpage: true
        })
      }
      await page.waitFor(1000)
      // await page.click('label[for="selfie_scan"]')
      // await page.waitForSelector('div[class="file-input-wrapper is-uploaded"] > label[for="selfie_scan"] > span', {
      //   visible: true,
      // });
      // await page.click('label[for="ktp_scan"]')
      // await page.waitForSelector('div[class="file-input-wrapper is-uploaded"] > label[for="ktp_scan"] > span', {
      //   visible: true,
      // });
      // await page.click('label[for="npwp_scan"]')
      // await page.waitForSelector('div[class="file-input-wrapper is-uploaded"] > label[for="npwp_scan"] > span', {
      //   visible: true,
      // });
  
      // let input = await page.$('input[id="selfie_scan"]')
      // await page.click('label[for="selfie_scan"]')
      // await input.uploadFile('/pictures/sample1.png')
      
      filePath = path.join(process.cwd()+'/pictures/sample1.png');
      console.log(filePath)
      futureFileChooser = page.waitForFileChooser();
      await page.click('label[for="selfie_scan"]')
      fileChooser = await futureFileChooser;
      await fileChooser.accept([filePath]);

      console.log(filePath)
      futureFileChooser = page.waitForFileChooser();
      await page.click('label[for="ktp_scan"]')
      fileChooser = await futureFileChooser;
      await fileChooser.accept([filePath]);

      console.log(filePath)
      futureFileChooser = page.waitForFileChooser();
      await page.click('label[for="npwp_scan"]')
      fileChooser = await futureFileChooser;
      await fileChooser.accept([filePath]);

      // name = "Erik"
      await page.type('input[name="nama_lengkap"]','el'+' '+name)
      await page.type('input[name="nama_pada_kartu"]',name)

      //pilih gender
      const gender = Math.floor(Math.random() * 2)
      if (gender == 0) {
        const pria = 'pria'
        await page.click('label[for="inputGenderPria"]')
        console.log(pria)
      }
      else {
        await page.click('label[for="inputGenderWanita"]')
        const wanita = 'wanita'
        console.log(wanita);
      }
      
      //pilih nation
      const nation = Math.floor(Math.random() * 2)
      if (nation == 0) {
        await page.click('label[for="inputNationalityWNI"]')
        const nation = 'wni'
        console.log(nation)
      }
      else {
        await page.click('label[for="inputNationalityWNA"]')
        const wna = 'wna'
        console.log(wna)
      }

      //input nomor KTP
      const ktp = mapString('AAAAAAAAAAAAAAAEE', randChar)
      await page.type('input[id="inputID"]',ktp)
      console.log(ktp)
      
      //input npwp
      const npwp = mapString('AEAEAEAEAEAEAEAEAEE', randChar)
      await page.type('input[id="inputNPWPID"]',npwp)
      console.log(npwp);

      //input name tempat lahir
      const tempat = 'bandung'
      await page.type('input[name="tempat_lahir"]',tempat)
      console.log(tempat)
      await page.click('input[name="tanggal_lahir"]')
      await page.click('a[class="ui-state-default ui-state-hover"]');

      //input no hp 
      const hp = mapString('08AAAAAAAAAA', randChar)
      await page.type('input[name="nomor_hp"]',hp)
      // console.log(hp)

      //input no email
      // await page.type('input[name="email"]','udin55@mailinator.com')
      await page.type('input[name="email"]',name+'@mailinator.com')
      console.log(email)

      fs.writeFileSync('./logs user registration',name+'@mailinator.com', function(err) {
        if (err) {
          console.log(err);
        }
      })

      //status rumah
      const status_rm = Math.floor(Math.random() * 5)
      if (status_rm == 0) {
        const pemilik = 'milik sendiri'
        await page.click('label[for="inputHomeStatusMilik Sendiri"]')
        console.log('milik sendiri')
      }
      else if(status_rm == 1) {
        const pemilik = 'perusahaan'
        await page.click('label[for="inputHomeStatusMilik Perusahaan"]')
        console.log(pemilik)
      }
      else if(status_rm == 2) {  
        const lain = 'lain lain juga' 
        await page.type('input[name="status_rumah_other"]','lain lain juga',{delay: '0'})
        console.log(lain)
      } 
      else if(status_rm == 3) {
        const sewa = 'sewa/kost'
        await page.click('label[for="inputHomeStatusSewa/Kost"]')
        console.log(sewa);
      }
      else if(status_rm == 4) {
        const keluarga = 'keluarga'
        await page.click('label[for="inputHomeStatusMilik Keluarga"]')
        console.log(keluarga);
      }

      //lama_menempati_tahun
      const tahun = mapString('A', randChar)
      await page.type('input[name="lama_menempati_tahun"]',tahun)
      console.log(tahun);
      const bulan = mapString('A', randChar)
      await page.type('input[name=lama_menempati_bulan]',bulan)
      console.log(bulan)

      //alamat rumah sekarang
      const current_rm = Math.floor(Math.random() * 2)
      if (current_rm == 0) {
        const alamat = 'domisili'
        await page.click('label[for="address_type_dom"]')
        console.log(alamat)
      }
      else {
        const alamat = 'sesuai ktp'
        await page.click('label[for="address_type_ktp"]')
        console.log(alamat)
      }

      //alamat lengkap
      const full_address = 'Jl. Pangarang No.24, Cikawao'
      await page.type('textarea[name="rumah_alamat"]',full_address)
      console.log(full_address)

      //pilih nama kota 
      const kota ='Baluwarti'
      await page.click('a[class="select2-choice"]');
      await page.click('div[id="select2-result-label-10"]');
      console.log(kota)

      //input rt rw
      const rt = "09"
      await page.type('input[name="rumah_rt"]', "09", {delay:'0'})
      console.log(rt);
      const rw = "06"
      await page.type('input[name="rumah_rw"]',"06", {delay:'0'})
      console.log(rw)

      //input kodepos
      const kode_post = "22122"
      await page.type('input[name="rumah_kode_pos"]',kode_post)
      console.log(kode_post)

      //input no telepon
      const tlp_rmh = '222222'
      await page.type('input[name="rumah_telepon_nomor"]',tlp_rmh)
      console.log(tlp_rmh)

      //pilih status 
      const status = Math.floor(Math.random()*3)
      if (status == 0) {
        const stat = 'single'
        await page.click('label[for="inputMaritalStatusSingle"]')
        console.log(stat)
      }
      else if(status == 1) {
        const stat = 'menikah'
        await page.click('label[for="inputMaritalStatusMenikah"]')
        console.log(stat)
      }
      else if(status == 2) {
        const dj = 'duda/janda'
        await page.click('label[for="inputMaritalStatusDuda/Janda"]')
        console.log(dj)
      }

      //input jumlah tanggungan
      const tang = '5'
      await page.type('input[name="jumlah_tanggungan"]',tang)
      console.log(tang)

      //input penghasilan pertahun
      const peng = '20000000'
      await page.type('input[name="perusahaan_gaji"]',peng)
      console.log(peng)

      //pilih pendidikan 
      const pend = Math.floor(Math.random()*6)
      if (pend == 0) {
        const stud = "SD/SMP"
        await page.click('label[for="inputEducationSD/SMP"]')
        console.log(stud)
      }
      else if(pend == 1) {
        const stud = "Diploma"
        await page.click('label[for="inputEducationDiploma"]')
        console.log(stud)
      }
      else if(pend == 2) {
        const stud = "S2"
        await page.click('label[for="inputEducationS2"]')
        console.log(stud)
      }
      else if(pend == 3) {
        const stud = "SMA"
        await page.click('label[for="inputEducationSMA"]')
        console.log(stud)
      }
      else if(pend == 4) {
        const stud = "S1"
        await page.click('label[for="inputEducationUniv/S1"]')
        console.log(stud)
      }
      else if(pend == 5) {
        const stud ='lain lain juga'
        await page.type('label[for="inputEducationOther"]','lain lain juga')
        console.log(stud)
      }

      //input nama ibu 
      const nama_ibu = "sumiarti"
      await page.type('input[name="nama_ibu"]',nama_ibu)
      console.log(nama_ibu)

      //submit 
      // await page.click('button[type="button"]')
      await page.evaluate(() => {
        document.querySelector('button[type=submit]').click();
      });

    },900000)


      test('fill form step two', async() => {
      
        try {
          await page.waitForSelector('input[id="inputFamilyName"]', 
          {
            visible: true,
            timeout: 20000,
            waitUntil : "domcontentloaded"
          });
          await page.waitFor(1000)
          await page.screenshot({
            path: path.join(__dirname,'../../../Renders/Unit/bri/'+resolusi+'/'+no+'-step 2.png'),
            fullpage: true
          })
        }
        catch(err) {
            await page.screenshot({
            path: path.join(__dirname,'../../../Renders/Unit/bri/'+resolusi+'/'+no+'-step 2.png'),
            fullpage: true
          })
    
        }

      await page.type('input[id="inputFamilyName"]',"mira")

      //input hubungan keluarga
      const hub = Math.floor(Math.random()*4)
      if (hub == 0 ) {
        await page.click('label[for="inputFamilyRelationshipSaudara Kandung"]')
      }
      else if(hub == 1) {
        await page.click('label[for="inputFamilyRelationshipAnak"]')
      }
      else if(hub == 2) {
        await page.click('label[for="inputFamilyRelationshipOrang Tua"]')
      }
      else if(hub ==3) {
        await page.type('input[id="inputFamilyRelationshipInput"]', 'lain lain juga')
      }

      //input alamat runah sekarang 
      await page.type('textarea[id="inputFamilyAddress"]','Perumahan Griya Mandala, Jl. Kehormatan Blok A No.19')

      //input kota 
      // await page.click('select[id="inputFamilyCity"]');
      await page.select('select[id="inputFamilyCity"]', 'Bekasi Timur')

      //input RT dan RW 
      await page.type('input[id="inputFamilyRT"]',mapString('0A', randChar))
      await page.type('input[id="inputFamilyRW"]',mapString('0A', randChar))

      //input kode pos
      await page.type('input[id="inputFamilyPostalCode"]',mapString('AAAAAA', randChar))

      //telepon_rumah 
      await page.type('input[id="inputFamilyPhoneNumber"]',mapString('0266AAAAAA', randChar))

      //input no hp 
      await page.type('input[id="inputFamilyCellPhoneNumber"]', mapString('08AAAAAAAA', randChar))

      //input telepon kantor 
      await page.type('input[id="inputFamilyWorkNumber"]', mapString('22AAA', randChar))

      //submit 
      await page.click('input[type="submit"]')

      },900000)

      test('fill form step three', async() => {

        try {
          await page.waitForSelector('input[id="inputWorkName"]', 
          {
            visible: true,
            timeout: 20000
          });
          await page.waitFor(1000)
  
          await page.screenshot({
            path: path.join(__dirname,'../../../Renders/Unit/bri/'+resolusi+'/'+no+'-step 3.png'),
            fullpage: true
          })
        }
        catch(err) {
          await page.screenshot({
            path: path.join(__dirname,'../../../Renders/Unit/bri/'+resolusi+'/'+no+'-step 3.png'),
            fullpage: true
          })
        }
      

        //input nama kantor
        const kantor = Math.floor(Math.random() * 9)
        await page.type('input[id="inputWorkName"]', 'kantor'+kantor)

        //input alamat kantor
        await page.type('textarea[id="inputWorkAddress"]','jl.abcd, provinsi jawa barat, 1234')

        //input kode pos kantor
        await page.type('input[id="inputWorkPostalCode"]','1234')

        //input telepon kantor
        await page.type('input[name="perusahaan_telepon_kode_area"]','0432')
        await page.type('input[id="inputWorkNumber"]','277777')

        //input EXT 
        await page.type('input[name="perusahaan_telepon_ext"]','666')

        //input fax kantor
        await page.type('input[name="perusahaan_fax_kode"]','0444')
        await page.type('input[name="perusahaan_fax_nomor"]','543211')

        //input kota kantor
        await page.click('a[class="select2-choice"]');
        await page.click('div[id="select2-result-label-11"]','021');

        //input status pekerjaan
        const pekerjaan = Math.floor(Math.random() * 5)
        if(pekerjaan == 0 ) {
          await page.click('label[for="inputOccupationKaryawan"]')
        }
        else if(pekerjaan == 1) {
          await page.click('label[for="inputOccupationPensiunan"]')
        }
        else if(pekerjaan == 2) {
          await page.click('label[for="inputOccupationWiraswasta"]')
        }
        else if(pekerjaan == 3) {
          await page.click('label[for="inputOccupationProfesional"]')
        }
        else if(pekerjaan == 4) {
          await page.click('label[for="inputOccupationTNI/Polri"]')
        }

        //input bidang pekerjaan
        const bidang = Math.floor((Math.random() * 20) +1  )
        await page.click('select[id="inputWorkField"]')
        await page.select('select[name="perusahaan_bidang_usaha"]', bidang.toString());

        //status pekerjaan 
        const status_pek = Math.floor(Math.random() * 3)
        if(status_pek == 0) {
          await page.click('label[for="inputWorkStatusPemilik"]');
        }
        else if(status_pek == 1) {
          await page.click('label[for="inputWorkStatusKaryawan Kontrak"]');
        }
        else if(status_pek == 2) {
          await page.click('label[for="inputWorkStatusKaryawan Tetap"]');
        }

        //input lama bekerja 
        const tahun_bek = Math.floor(Math.random() * 9)
        await page.type('input[id="inputWorkTimeYear"]','0'+tahun_bek.toString())
        const bulan_bek = Math.floor(Math.random() * 9)
        await page.type('input[id="inputWorkTimeMonth"]','0'+bulan_bek.toString())

        //input pangkat atau jabatan
        const pangkat = Math.floor(Math.random() * 9)
        await page.type('input[id="inputWorkPosition"]','posisi'+' '+pangkat.toString())

        //input jumlah karyawan 
        const jml_kar = Math.floor(Math.random() * 4) 
        if (jml_kar == 0 ) {
          await page.click('label[for="inputEmployee1-9"]')
        }
        else if(jml_kar == 1) {
          await page.click('label[for="inputEmployee51-100"]')
        }
        else if(jml_kar == 2) {
          await page.click('label[for="inputEmployee10-50"]')
        }
        else if(jml_kar == 3) {
          await page.click('label[for="inputEmployeeLebih dari 100"]')
        }

        //input penghasilan tambahan
        await page.type('input[id="inputAdditionalIncome"]','5000000')

        //submit form 
        await page.click('input[type="submit"]')

      },90000)

      test('fill form step fourth', async() => {


        try {
          await page.waitForSelector('input[name="cc_nama_bank_1"]', 
          {
            visible: true,
            timeout: 20000
          });
          await page.waitFor(1000)
          await page.screenshot({
            path: path.join(__dirname,'../../../Renders/Unit/bri/'+resolusi+'/'+no+'-step 4.png'),
            fullpage: true
          })
        }
        catch(err) {
          await page.screenshot({
            path: path.join(__dirname,'../../../Renders/Unit/bri/'+resolusi+'/'+no+'-step 4.png'),
            fullpage: true
          })
        }

        //nama bank 1 
        //input nama bank
        let nama_bank = ['bni','bca','mandiri','etc']
        let bank = Math.floor(Math.random() * 4)
        await page.type('input[name="cc_nama_bank_1"]',nama_bank[bank].toString())

        //input no kartu 
        await page.type('input[name="cc_no_kartu_1"]',mapString('AAAAAAAAAAAA',randChar))

        //sejak bulan
        let sejak_bul = Math.floor((Math.random() * 9)+1)
        await page.type('input[name="cc_sejak_bulan_1"]','0'+sejak_bul.toString())

        //sejak tahun
        let sejak_tahun = Math.floor((Math.random() * 9)+1)
        // await page.type('input[name="cc_sejak_tahun_1"]', '200'+sejak_tahun.toString())
        await page.type('input[name="cc_sejak_tahun_1"]', '0'+sejak_tahun.toString())

        //limit 1
        let limit_1 = Math.floor((Math.random()*9)+1)
        await page.type('input[name="cc_limit_1"]',limit_1.toString()+'000000')

        //nama bank 2
        //input nama bank
        nama_bank = ['bni','bca','mandiri','etc']
        bank = Math.floor(Math.random() * 4)
        await page.type('input[name="cc_nama_bank_2"]',nama_bank[bank].toString())

        //input no kartu 
        await page.type('input[name="cc_no_kartu_2"]',mapString('AAAAAAAAAAAA',randChar))

        //sejak bulan
        sejak_bul = Math.floor((Math.random() * 9)+1)
        await page.type('input[name="cc_sejak_bulan_2"]','0'+sejak_bul.toString())

        //sejak tahun
        sejak_tahun = Math.floor((Math.random() * 9)+1)
        // await page.type('input[name="cc_sejak_tahun_2"]', '200'+sejak_tahun.toString())
        await page.type('input[name="cc_sejak_tahun_2"]', '0'+sejak_tahun.toString())

        //limit 2
        limit_1 = Math.floor((Math.random()*9)+1)
        await page.type('input[name="cc_limit_2"]',limit_1.toString()+'000000')


        /*informasi rekening optional
        */

        //penagihan kartu
        const penag_card = Math.floor(Math.random() * 2)
        if (penag_card == 0) {
          await page.click('label[for="inputBillingAddressHome"]')
        }
        else {
          await page.click('label[for="inputBillingAddressWork"]')
        }

        //pembayaran auto debet
        await page.type('input[name="auto_debet_no_rekening"]',mapString('AAAAAAAAAAA',randChar))

        //sebesar auto debet
        const sebesar = Math.floor(Math.random() * 2)
        if(sebesar == 0) {
          await page.click('label[for="inputAutoDebetNominalMinimum"]')
        }
        else {
          await page.click('label[for="inputAutoDebetNominalFull"]')
        }

        //bri protection plus
        const protect = Math.floor(Math.random() * 2)
        if(protect == 0 ) {
          await page.click('label[for="inputProtectionPlusAgree"]')
        }
        else {
          await page.click('label[for="inputProtectionPlusDisagree"]')
        }

        //tambahan kartu advanced
       // const advance = Math.floor(Math.random() * 2)
        const advance = 1
        if(advance == 0 ) {
          
        //kartu tambahan (advanded)
        await page.click('label[for="inputAddAdditionalCardAgree"]')

        //OR kartu tambahan (advanded)
        // await page.click('label[for="inputAddAdditionalCardDisagree"]')

        //alamat penagihan kartu(advanced)
        await page.waitForSelector('label[for="inputBillingAddressAdditionalCard"]', {
          visible: true,
        });

        const penag_card_adv = Math.floor(Math.random() *2)
        if(penag_card_adv ==  0) {
          await page.click('label[for="inputBillingAddressAdditionalCardHome"]')
        }
        else {
          await page.click('label[for="inputBillingAddressAdditionalCardWork"]')
        }

        //nama lengkap(adv)
        name = faker.name.firstName() + faker.name.lastName()
        const nama_lengkap_adv = name
        await page.type('input[name="kt_nama_lengkap"]',nama_lengkap_adv)

        //jenis kelamin
        const jenis_kel = Math.floor(Math.random()*2)
        if(jenis_kel==0) {
          await page.click('label[for="inputGenderAdditionalCardPria"]')
        } 
        else {
          await page.click('label[for="inputGenderAdditionalCardWanita"]')
        }

        //kewarganegaraan(adva)
        const kewar_adv = Math.floor(Math.random()*2)
        if(kewar_adv==0) {
          await page.click('label[for="inputNationalityAdditionalCardWNI"]')
        } 
        else {
          await page.click('label[for="inputNationalityAdditionalCardWNA"]')
        }

        //nomor KTP/passport(adva)
        await page.type('input[name="kt_nomor_identitas"]',mapString('AAAAAAAAAAAAAAAE',randChar))

        //ttl (advanced)
        await page.type('input[name="kt_tempat_lahir"]','sumedang')
        await page.click('input[name="kt_tanggal_lahir"]')
        await page.click('a[class="ui-state-default ui-state-hover"]');

        //hubungan kartu(adva)
        await page.waitForSelector('label[for="inputFamilyRelationshipAdditionalCard"]', {
          visible: true,
        });
        await page.waitFor(5000)
        const hub_kartu = Math.floor(Math.random()*5)
        if(hub_kartu == 0) {
          await page.click('label[for="inputFamilyRelationshipAdditionalCardSuami/Istri"]')
        } 
        else if(hub_kartu == 1) {
          await page.click('label[for="inputFamilyRelationshipAdditionalCardOrang Tua"]')
        }
        else if(hub_kartu == 2) {
          await page.type('input[name="kt_hubungan_other"]','lain lain juga')
        }
        else if(hub_kartu == 3) {
          await page.click('label[for="inputFamilyRelationshipAdditionalCardSaudara"]')
        }
        else {
          await page.click('label[for="inputFamilyRelationshipAdditionalCardAnak"]')
        }

        //maksimum limit(adva)
        await page.click('label[for="inputCardLimitAdditionalCardDifferent"]')

        //jumlah dikehendaki jika berbeda
        await page.type('input[name="kt_limit_rupiah"]','7000000')

        }
        else {
          // await page.click('label[for="inputProtectionPlusDisagree"]')
           await page.click('label[for="inputAddAdditionalCardDisagree"]')
        }

        //submit form 
        await page.click('input[type="submit"]')

        fs.writeFileSync('./logs user registration',JSON.stringify(users), function(err) {
            if (err) {
              console.log(err);
            }
        })

      },90000)

  });

  

  
