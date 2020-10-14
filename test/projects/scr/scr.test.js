 // PREPEARING
 const playwright = require('playwright');
 const {devices} = require('playwright')
 const device = devices['Iphone X'];
 let init = require('../../initialize')
 require('../../initialize').page
 require('../../initialize').browser
 const ndata = [];

 //request and response
 const cheerio = require('cheerio');
 const request = require('request');
const { NODATA } = require('dns');
const { fs } = require('../../initialize');



 //important
 const target = 'https://www.milo.co.id/'
 const last_path = ''
 const folder_name = "miloprod"

 const regex = /([\b\/])\1/g;
 const regex2 = /[:]/g;

 let dir1,dir2,dir3,dir4,pp;


//  dir3 = path.join(__dirname,'../../../Renders/OneDrive - WPP Cloud/Unit/'+folder_name+'/'+device.name+'/chromium/Landscape')
//   fs.readdir(dir3, (err, files) => {
//      for (const file of files) {
//          fs.unlink(path.join(dir3, file), err => {
//            if (err) throw err;
//          });
//      }
//  })


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
  
   afterAll(async() => {
     await browser.close();
     await chrome.kill();
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

        const remove_duplicate = (x) => {
          return Array.from(new Set(x))
        }

        function pushScore (output)  {
          data = output
          ndata.push(data)
          fs.writeFileSync(__dirname+'/prexl-mobile.json',JSON.stringify(ndata),(err)=> {
            if (err) {
              console.log(err)
            }
          })
          return ndata
        }
          
           test("optimal ss", async() => {
            await yy().then(async (result) => {
     
               //print all sitemap
               //console.log(result)
     
               //initialize step
               let url = [];
               url = result;
              
               //remove the dulicate strings
               url = remove_duplicate(url)

               console.log(url);

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

           test("test performance in mobile", async() => {

            const chromeLauncher = require('chrome-launcher');
            const puppeteer = require('puppeteer');
            const lighthouse = require('lighthouse');
            const config = require('lighthouse/lighthouse-core/config/lr-mobile-config.js');
            const reportGenerator = require('lighthouse/lighthouse-core/report/report-generator');
            const request = require('request');
            const util = require('util');
            const fs = require('fs');
           
            
            opts = {
              args: [ '--ignore-certificate-errors','--no-sandbox'],
              chromeFlags: ['--disable-gpu','--disable-mobile-emulation','--incognito'],
              disableDeviceEmulation: true,
            }
          
            // Launch chrome using chrome-launcher
            chrome = await chromeLauncher.launch(opts);
            opts.port = chrome.port;
        
            // Connect to it using puppeteer.connect().
            const resp = await util.promisify(request)(`http://localhost:${opts.port}/json/version`);
            const {webSocketDebuggerUrl} = JSON.parse(resp.body);
            browser = await puppeteer.connect({browserWSEndpoint: webSocketDebuggerUrl});
            page = (await browser.pages())[0]

            await yy().then(async (result) => {

                  //print all sitemap
                  console.log(result)
     
                  //initialize step
                  let url = [];
                  url = result;

                  //remove the dulicate strings
                  url = remove_duplicate(url)

                  //loop the test
                  i = 0

                  //init report.json
                  fs.writeFileSync(__dirname+'/report.json', function(err) {
                    if (err) {
                      console.log(err);
                    }
                  })

                  while (i <=url.length) {
                    await page.goto('https://www.youtube.com/channel/UCJU1oph89LKXryQwUItT1Bw?nohtml5=False',{waitUntil : 'networkidle2'}).catch(e => void 0)
                    const report = await lighthouse(page.url(), opts, config).then(results => {
                        return results;
                    });
            
                    const json = reportGenerator.generateReport(report.lhr, 'json');
                    const html = reportGenerator.generateReport(report.lhr, 'html');
                                   
                    //Write report json to the file                    
                    fs.unlinkSync(path.join(__dirname,'/report.json'), err => {
                      console.log(err)
                    });

                    fs.writeFileSync(__dirname+'/report.json', json, (err) => {
                        if (err) {
                            console.error(err);
                        }
                    });

                    fs.readFile(__dirname+'/report.json', {encoding: 'utf8', flag:'r'},function(err,data) {
                      if (err) {
                        console.log(err)
                      }
                      else {
                        output = JSON.parse(data)
                        
                        // checkMsite(url[i])

                        let score = new pushScore({"no":i, "url":url[i],"mobile performance": output.categories.performance.score * 100})
                        console.log(score)
                       
                        chrome.kill
                      }
                    })

                  i = i + 1;
                  }
            })

           },3600000)

           test("test performance in desktop", async() => {

            const chromeLauncher = require('chrome-launcher');
            const puppeteer = require('puppeteer');
            const lighthouse = require('lighthouse');
            const config = require('lighthouse/lighthouse-core/config/lr-desktop-config.js');
            const reportGenerator = require('lighthouse/lighthouse-core/report/report-generator');
            const request = require('request');
            const util = require('util');
            const fs = require('fs');
            
  
            opts = {
              args: [ '--ignore-certificate-errors','--no-sandbox'],
              chromeFlags: ['--disable-gpu','--disable-mobile-emulation','--incognito'],
              disableDeviceEmulation: true,
            }
          
            // Launch chrome using chrome-launcher
            chrome = await chromeLauncher.launch(opts);
            opts.port = chrome.port;
        
            // Connect to it using puppeteer.connect().
            const resp = await util.promisify(request)(`http://localhost:${opts.port}/json/version`);
            const {webSocketDebuggerUrl} = JSON.parse(resp.body);
            browser = await puppeteer.connect({browserWSEndpoint: webSocketDebuggerUrl});
            page = (await browser.pages())[0]

            await yy().then(async (result) => {

                  //print all sitemap
                  console.log(result)
     
                  //initialize step
                  let url = [];
                  url = result;

                  //remove the dulicate strings
                  url = remove_duplicate(url)

                  //loop the test
                  i = 0

                  //init report.json
                  fs.writeFileSync(__dirname+'/report.json', function(err) {
                    if (err) {
                      console.log(err);
                    }
                  })

                  while (i <=url.length -1) {
                    await page.goto(url[i],{waitUntil : 'networkidle2'}).catch(e => void 0)
                    const report = await lighthouse(page.url(), opts, config).then(results => {
                        return results;
                    });
            
                    const json = reportGenerator.generateReport(report.lhr, 'json');
                    const html = reportGenerator.generateReport(report.lhr, 'html');
                    
               
                    //Write report json to the file                    
                    fs.unlinkSync(path.join(__dirname,'/report.json'), err => {
                      console.log(err)
                    });

                    fs.writeFileSync(__dirname+'/report.json', json, (err) => {
                        if (err) {
                            console.error(err);
                        }
                    });

                    fs.readFile(__dirname+'/report.json', {encoding: 'utf8', flag:'r'},function(err,data) {
                      if (err) {
                        console.log(err)
                      }
                      else {
                        output = JSON.parse(data)
                        let score = new pushScore({"no":i, "url":url[i],"desktop performance": output.categories.performance.score * 100})
                        console.log(score)
                        chrome.disconnected;
                        chrome.kill
                      }
                    })
                    

                  i = i + 1;
                  }
            })
           },3600000)

           test("convert to excel", async() => {

            const fs = require('fs');

            // First I want to read the file
            fs.readFile(__dirname+'/prexl-mobile.json', function read(err, data) {
                if (err) {
                    throw err;
                }
                const content = data;

                // Invoke the next step here however you like
                console.log(content);   // Put all of the code here (not the best solution)
                // processFile(content);   // Or put the next step in a function and invoke it

                if(typeof XLSX == 'undefined') XLSX = require('xlsx');

                /* make the worksheet */
                var ws = XLSX.utils.json_to_sheet(JSON.parse(data));
                
                /* add to workbook */
                var wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
                
                /* generate an XLSX file */
                XLSX.writeFile(wb, "performance-score.xlsx");
            });            
          },3600000)

          
    })
 