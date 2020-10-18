 // PREPEARING
 const playwright = require('playwright');
 const {devices} = require('playwright')
 const device = devices['Iphone X'];
 let init = require('../../initialize')
 require('../../initialize').page
 require('../../initialize').browser
 const ndata = [];
 const jsonFormat = require('json-format');

 //request and response
 const cheerio = require('cheerio');
 const request = require('request');
 const { fs } = require('../../initialize');


 //important
 const target = 'https://www.milo.co.id/'
 const last_path = ''
 const folder_name = "miloprod"
 const crawling_lvl = 2;
 const exclude = {
   '1' : 'facebook',
   '2' : 'youtube',
   '3' : 'instagram',
   '4' : 'sahabatnestle',
   '5' : 'twitter'
 } 

 const regex = /([\b\/])\1/g;
 const regex2 = /[:]/g;
 const regex3 = /([\b\..])\1/g


 let source= '[{"p":[{}]}]';

 let dir3,dir4

 dir3 = path.join(__dirname,'../../../Renders/OneDrive - WPP Cloud/Unit/'+folder_name+'/'+device.name+'/chromium/Landscape')
  fs.readdir(dir3, (err, files) => {
     for (const file of files) {
         fs.unlink(path.join(dir3, file), err => {
           if (err) throw err;
         });
     }
 })

 dir4 = path.join(__dirname,'../../../Renders/OneDrive - WPP Cloud/Unit/'+folder_name+'/'+device.name+'/chromium/Potrait')
 fs.readdir(dir4, (err, files) => {
    for (const file of files) {
        fs.unlink(path.join(dir4, file), err => {
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
  
   afterAll(async() => {
     await browser.close();
    //  await chrome.kill();
   })
 
    // START TO TESTING
    describe("e2e testing",() => {

        const yy = async()=>{
 
            let anchors = [];
            let anchors2 = [];
            let tmp=[];
            let j = 0;
            let k = 0;
         
            let lvl = 1;
            let count;

            function checkRegex(value) {
              try {
                  if(value.match(regex)=='//') {
                        tmp.push(value)
                  }
                  else {
                
                    if(value.match(regex2)==':') {
                      //do nothing
                    }
                    else {
                      tmp.push(target+value) 
                    }
                  }
              }
              catch(e) {
                  // console.log(e)
              }
            }

            function singleCheckregex(value,p) {

              try {
                if(value.match(regex)=='//') {
                      // console.log(value)
                      return value
                }
                else {
                  if(value.match(regex2)==':') {
                    //do nothing
                  }
                  else {
                      // console.log(target+value)
                      return target+value 
                  }
                }
              }
              catch(e) {
                  // console.log(e)
              } 
            }

            function getRidExternal(tmp,k) {
              // let op = tmp
              // for (let [keyExternal,valueExclude] of Object.entries(exclude)) {
              //   op = op.filter(x => !x.includes(valueExclude))
              //   op = op.filter(x => !x.includes(valueExclude))
              // }
              // tmp = op
              // return tmp

              // let index = k; 
              // for  (let [keyExternal,valueExclude] of Object.entries(exclude)) {
              //   if(tmp[k].includes(valueExclude)) {
              //     tmp.splice(index,1)
              //   }
              // }
            }

            function clearJsonObject(value) {
              let a = 0;
              let b = 0;
              let c = 0
              count = value.length
              while(c <= 1) {
                while(a <= count - 1) {
                  while(b <= value[a][tmp[a]].length - 1) {
                    if(JSON.stringify(value[a][tmp[a]][b])=='{}') {
                      delete value[a][tmp[a][b]]
                      source[a][tmp[a]].splice(b,1)
                    }
                    b++;
                  }
                  b = 0;
                  a++;
                }
              c++;
              }
            
            }
    
            while(lvl<=crawling_lvl) {
              if(lvl == 1) {

                //crawling level up from only once
                let response = await request(target);
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
        
                while(j<=anchors.length-1) {
                    checkRegex(anchors[j])
                    j++;
                }
                lvl++;
              }
              else {

                count = tmp.length
                source = '[{"'+tmp[k]+'":[{}]}]'
                source = JSON.parse(source)
                while(k <= count - 1 ) {
                  anchors=[];anchors2=[];i=0;j=0;
                  if (tmp[k].match(regex3)=='..') {
                    // console.log('is have problem? '+tmp[k])
                    let gg = tmp[k].split('..')
                    try {
                      response = await request(gg[0]+gg[1])                                            
                    }
                    catch(err) {
                      console.log(gg[0]+gg[1]+' this page maybe 404 not found')
                    }
                  }
                  else {
                    try {
                      response = await request(tmp[k])
                    }
                    catch(e) {
                      console.log(tmp[k]+' this page maybe 404 not found') 
                    }
                  }

                  $ = cheerio.load(response); 
                  $("a").each(function(i, link){
                     anchors[i] = $(link).attr("href");
                      // //{new code} source trace
                      source[k][tmp[k]].push({'href':singleCheckregex(anchors[i])})
                  });

                  let bb;
                  $("div").each(function(i, link){
                     anchors2[i] = $(link).attr("data-url");
                     if(anchors2[i]!==undefined) {
                       bb = anchors2[i].split(last_path)
                       bb = bb[1]
                       anchors.push(bb)
                       //{new code} source trace
                       source[k][tmp[k]].push({'href': singleCheckregex(bb)})
                     }
                  });
                  // source[k][tmp[k]] = remove_duplicate(source[k][tmp[k]]);
                  while(j<=anchors.length-1) {  
                      checkRegex(anchors[j])
                      j++;
                  }
                 k++;
                 source.push(JSON.parse('{"'+tmp[k]+'":[{}]}'))
                }      
              lvl++;
              }
            }
            clearJsonObject(source)
             /* using config default, indent with tabs */
            fs.writeFile(__dirname+'/example_tabs.json', jsonFormat(source), function(err){
              if (err) throw err;
                  console.log('saved');
            });
            tmp = remove_duplicate(tmp)
            return tmp
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

           test("TEST CRAWLING",async() => {
            await yy().then(result => {
            console.log(result)
            
          })
        },3600000)

           test.skip("optimal ss", async() => {
            await yy().then(async (result) => {
     
              //  print all sitemap
              //  console.log(result)
     
               //initialize step
               let url = [];
               url = result;
              
               //remove the dulicate strings
               //url = remove_duplicate(url)

               console.log(url);

               //loop the test
               i=0

               while(i<=url.length-1) {
                 console.log(url[i])
                 try {
                  await page.goto(url[i], {waitUntil: 'domcontentloaded'});
                  if(url[i].includes('"')) { 
                    url[i] = url[i].replace('"','ada-tanda-kutip')
                  }
                  if(url[i].includes('&')) { 
                    url[i] = url[i].replace('"','ada-simbol-dan')
                  }
                  if (url[i].includes('%')) {
                    url[i] = url[i].replace('%','ada-simbol-percent')
                  }
                  await init.optmimal_ss(folder_name,device.name,i+url[i].split(/[,\/:.?]/g),device.viewport.width,device.viewport.height,browserType);
                  i = i + 1;
                 }
                 catch(err) {
                  await init.optmimal_ss(folder_name,device.name,i+url[i].split(/[,\/:.?]/g),device.viewport.width,device.viewport.height,browserType);
                  i = i + 1;
                 }
               }
             })
           
           },3600000)

           test.skip("test performance in mobile", async() => {

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

                 //excel convert
                 let data = [];
                 let ndata= [];
              

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

           test.skip("test performance in desktop", async() => {

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

           test.skip("convert to excel", async() => {

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
 