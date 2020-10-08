 // PREPEARING
 const playwright = require('playwright');
 const {devices} = require('playwright')
 const device = devices['Iphone X landscape'];
 let init = require('../../initialize')
 require('../../initialize').page
 require('../../initialize').browser

 //request and response
 const cheerio = require('cheerio');
 const request = require('request');
 const superagent = require('superagent');
 var https = require('https');

 //important
 const target = 'https://www.milo.co.id/'
 const last_path = ''
 const folder_name = "miloprod"

 const regex = /([\b\/])\1/g;
 const regex2 = /[:]/g;

 let dir1,dir2,dir3,dir4;


 dir3 = path.join(__dirname,'../../../Renders/OneDrive - WPP Cloud/Unit/'+folder_name+'/'+device.name+'/chromium/Landscape')
 fs.readdir(dir3, (err, files) => {
     for (const file of files) {
         fs.unlink(path.join(dir3, file), err => {
           if (err) throw err;
         });
     }
 })


 let i = 0  ;
beforeAll(async() => {
    for (browserType of ['chromium']) {
      browser = await playwright[browserType].launch({
        headless: headless,
        args: ['--no-sandbox']
      });
      const context = await browser.newContext({
        ...device
      });
      page = await context.newPage();
    }
    },90000);
  
   afterAll(() => {
      browser.close()
   })
 
    // START TO TESTING
    describe("e2e testing",() => {

        const yy = async()=>{
 
            let anchors = [];
            let anchors2 = [];
            let tmp=[];
            let j=0;
     
            const response = await request(target);
            let $ = cheerio.load(response);
      
            $("a").each(function(i, link){
               anchors[i] = $(link).attr("href");
            });
     
            let bb;
            $("div").each(function(i, link){
               anchors2[i] = $(link).attr("data-url");
               if(anchors2[i]!==undefined) {
                 bb = anchors2[i].split(last_path)
                 bb = bb[1]
                 anchors.push(bb)
               }
            });
     
              function checkRegex(value,i) {
                try {
                    if(value.match(regex)=='//') {
                        tmp.push(value)
                    }
                    else {
                      console.log(i+' '+value+' '+value.match(regex2))
                      if(value.match(regex2)==':') {
                        //do nothing
                      }
                      else {
                        tmp.push(target+value) 
                      }
                     
                    }
                }
                catch(e) {
                    console.log(e)
                }
              }
      
              while(j<=anchors.length-1) {
                  checkRegex(anchors[j],j)
                  j++;
              }
              
              return tmp;
          }

          
          test("optimal ss", async() => {
            await yy().then(async (result) => {
     
               //print all sitemap
               console.log(result)
     
               //initialize step
               let url = [];
               url = result;
     
               //loop the test
               i=0 
               while(i<=url.length-1) {
                 console.log(url[i])
                 await page.goto(url[i], {waitUntil: 'domcontentloaded'});
                 await init.optmimal_ss(folder_name,device.name,i+url[i].split(/[,\/:.?]/g),device.viewport.width,device.viewport.height,browserType);
                 i = i + 1;
               }
     
             })
           
           },3600000)
    })
 