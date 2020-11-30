 // PREPEARING
 const playwright = require('playwright');
 const {devices} = require('playwright')
 const device = devices['iPhone 7'];
 let init = require('../../initialize')
 require('../../initialize').page
 require('../../initialize').browser
 const ndata = [];
 const jsonFormat = require('json-format');
 const jp = require('jsonpath');

 //request and response
 const cheerio = require('cheerio');
 const request = require('request');
 const { fs, headless } = require('../../initialize');


 //important
 const target = 'http://fortigro.dancow.co.id/'
 const last_path = ''
 const folder_name = "fortigo"
 const browser_type = 'chromium'
 const crawling_lvl = 1;

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
 let name = '';
 let score;
 let issues = [];
 let itr_m,itr_d;

 let dir3,dir4,dir5,dir6,dir7,dir8


  let i = 0  ;
  beforeAll(async() => {
    for (browserType of [browser_type]) {
      browser = await playwright[browserType].launch({
        headless: headless,
        args: ['--no-sandbox','--disable-features=ImprovedCookieControls']
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

            function clearJsonObject(value) {
              let a = 0;
              let b = 0;
            

              count = value.length
         
                while(a <= count - 1) {
                  while(b <= value[a][tmp[a]].length - 1) {
                    if(JSON.stringify(value[a][tmp[a]][b]) == '{}') {
                      delete value[a][tmp[a]][b]
                      source[a][tmp[a]].splice(b,1)
                    }
                    b++;
                  }
                  b = 0;
                  a++;
                }
            
            }
    
            while(lvl<=crawling_lvl) {
              if(lvl == 1) {

                //crawling level up from only once
                let response = await request(target+last_path);
                let $ = cheerio.load(response);
 
                $("a").each(function(i, link){
                  anchors[i] = $(link).attr("href");
                });
                
                let bb;
                $("div").each(function(i, link){
                   anchors2[i] = $(link).attr("data-url");
                   console.log(anchors2[i])
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

            if(crawling_lvl >= 2) {
              clearJsonObject(source)
              clearJsonObject(source)
               /* using config default, indent with tabs */
              fs.writeFile(__dirname+'/example_tabs.json', jsonFormat(source), function(err){
                if (err) throw err;
                    console.log('saved');
              });
            }
           
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

        function renameHtml(value) {
          return name
        }

        function arrayMax(array) {
          return array.reduce((a, b) => Math.max(a, b));
        }
        
        function arrayMin(array) {
          return array.reduce((a, b) => Math.min(a, b));
        }

           test.skip("TEST CRAWLING",async() => {
            await yy().then(result => {
                console.log(result)
            })
        },3600000)

           test.skip('form selection url', async() => {

            await yy().then(async (result) => {

              console.log(result) 

              //initialize step
              let url = [];
              url = result;
              let forms = []
              let nonForms = []
              let i = 0;

              fs.unlinkSync(path.join(__dirname,'/forms-link'), err => {
                console.log(err)
              });
              fs.unlinkSync(path.join(__dirname,'/non-forms-link'), err => {
                console.log(err)
              });

               while(i <= url.length - 1  ) {
                await page.goto(url[i], {waitUntil: 'domcontentloaded'}).catch(e => void 0)
                console.log(url[i])
                try {
                  await page.waitForSelector('input[type="text"]', {
                    waitFor: "visible",
                  }) 
                  // console.log('that page is have')
                  forms.push(url[i])
                }
                catch(err) {
                  // console.log('that page is doesnt have');
                  nonForms.push(url[i])
                }
                i++;
                //visi._remoteObject.type == 'object'
               }
               

              console.log(forms)
              
              // i=0
              // while(i<=3) {
                fs.writeFileSync(__dirname+'/forms-link', forms, (err) => {
                  if (err) {
                      console.error(err);
                  }
                });
              //   i++;
              // }
              
              // i=0
              // while(i<=3) {
                fs.writeFileSync(__dirname+'/non-forms-link', nonForms, (err) => {
                  if (err) {
                      console.error(err);
                  }
                });
              //   i++;
              // }
         
            })


           
           },3600000)

           test.skip("optimal screenshot", async() => {
            await yy().then(async (result) => {

              dir3 = path.join(__dirname,'../../../Renders/OneDrive - WPP Cloud/Unit/'+folder_name+'/'+device.name+'/'+browser_type+'/Landscape')
              fs.readdir(dir3, (err, files) => {
                 for (const file of files) {
                     fs.unlink(path.join(dir3, file), err => {
                       if (err) throw err;
                     });
                 }
             })
            
              dir4 = path.join(__dirname,'../../../Renders/OneDrive - WPP Cloud/Unit/'+folder_name+'/'+device.name+'/'+browser_type+'/Potrait')
              fs.readdir(dir4, (err, files) => {
                for (const file of files) {
                    fs.unlink(path.join(dir4, file), err => {
                      if (err) throw err;
                    });
                }
            })
     
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

               while(i <= url.length - 1) {
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

           test.skip('test performance', async() => {
            await page.goto('',{waitUntil : 'networkidle2'}) 
            const report = await lighthouse(page.url(), opts, config).then(results => {
                return results;
            });
            const html = reportGenerator.generateReport(report.lhr, 'html');
            const json = reportGenerator.generateReport(report.lhr, 'json');
            
            //Write report html to the file
            fs.writeFile(__dirname+'/report.html', html, (err) => {
                if (err) {
                    console.error(err);
                }
            });
            //Write report json to the file
            fs.writeFile(__dirname+'/report.json', json, (err) => {
                if (err) {
                    console.error(err);
                }
            });
           })

           test.skip("test performance in mobile", async() => {

            const chromeLauncher = require('chrome-launcher');
            const puppeteer = require('puppeteer');
            const lighthouse = require('lighthouse');
            const config = require('lighthouse/lighthouse-core/config/lr-mobile-config.js');
            const reportGenerator = require('lighthouse/lighthouse-core/report/report-generator');
            const request = require('request');
            const util = require('util');
            const fs = require('fs');

            dir5 = path.join(__dirname,'/report/mobile')
            fs.readdir(dir5, (err, files) => {
             for (const file of files) {
                 fs.unlink(path.join(dir5, file), err => {
                   if (err) throw err;
                 });
             }
            })

           dir7 = path.join(__dirname,'/json/mobile')
           fs.readdir(dir7, (err, files) => {
            for (const file of files) {
               fs.unlink(path.join(dir7, file), err => {
                 if (err) throw err;
               });
           }
          })
          
            
            opts = {
              chromeFlags: ['--headless'],
              onlyCategories: ["performance"],
              throttling: {
                cpuSlowdownMultiplier: 1
              }
              // args: ['--ignore-certificate-errors','--no-sandbox'],
              // chromeFlags: ['--disable-gpu','--disable-mobile-emulation','--incognito','--disable-extensions','--disable-renderer-backgrounding','--enable-automation','--disable-dev-shm-usage']
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
                  i = 0;
                  itr_m = 0;

                 //excel convert
                 let data = [];
                 let ndata= [];
                 let compare = [];

               
                  while (i <= url.length ) {
                    // console.log(url[6])
                    let u = 1;
                    compare = [];

// while(u <= 2) {
              
                      try {
                    
                        await page.goto(url[i],{waitUntil : 'networkidle2'}).catch(e => void 0)
                        const report = await lighthouse(page.url(), opts, config).then(results => {
                            return results;
                        });
                        const json = reportGenerator.generateReport(report.lhr, 'json');
                        const html = reportGenerator.generateReport(report.lhr, 'html');
                                       
                        // //remove old json                
                        // fs.unlinkSync(path.join(__dirname,'/json/mobile/report'+i+'.json'), err => {
                        //   console.log(err)
                        // });
    
          
                        //Write report json to the file
                        fs.writeFileSync(__dirname+'/json/mobile/report'+itr_m+'.json', json, (err) => {
                            if (err) {
                                console.error(err);
                            }
                        });
                        
    
                        fs.readFile(__dirname+'/json/mobile/report'+itr_m+'.json', {encoding: 'utf8', flag:'r'},function(err,data) {
                          if (err) {
                            console.log(err)
                          }
                          else {
                            output = JSON.parse(data)
                            // compare.push(output.categories.performance.score * 100)
                            // console.log(compare)

                            // check min and max score
                            // if (u == 2 ) {
                                
                                // min = arrayMin(compare)
                                // max = arrayMax(compare)
                                // console.log(compare)

                                //push score
                                score = new pushScore({"no":itr_m, "url":output.finalUrl,"mobile performance": output.categories.performance.score * 100})
                                console.log(score)

                                //Write report html to the file
                                name = output.finalUrl;
                                fs.writeFile(__dirname+'/report/mobile/'+itr_m+name.split(/[,\/:.?]/g)+'mobile-report.html', html, (err) => {
                                  if (err) {
                                      console.error(err);
                                  }
                                });

                                itr_m = itr_m + 1;
                            // }
                             chrome.kill
                             chrome.kill
                             chrome.kill
                          }
                        })
                      }
                      catch(err) {
                        console.log(err)
                      }
// u=u+1;}                        
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
            let compare = [];

          
            dir6 = path.join(__dirname,'/report/desktop')
            fs.readdir(dir6, (err, files) => {
              for (const file of files) {
               fs.unlink(path.join(dir6, file), err => {
                 if (err) throw err;
               });
              }
          })

            dir8 = path.join(__dirname,'/json/desktop')
            fs.readdir(dir8, (err, files) => {
           for (const file of files) {
               fs.unlink(path.join(dir8, file), err => {
                 if (err) throw err;
               });
           }
        })
          
          
    
            opts = {
              chromeFlags: ['--headless '],
              onlyCategories: ["performance"],
              throttling: {
                cpuSlowdownMultiplier: 1
              }
              // args: [ '--ignore-certificate-errors','--no-sandbox'],
              // chromeFlags: ['--disable-gpu','--disable-mobile-emulation','--incognito','--disable-renderer-backgrounding','--enable-automation','--disable-dev-shm-usage']
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
                  itr_d = 0

                  while (i <= url.length) {
                    let u = 1;
                    compare = [];
// while(u<=2) {
                    try {

                    await page.goto(url[i],{waitUntil : 'networkidle2'}).catch(e => void 0)
                    const report = await lighthouse(page.url(), opts, config).then(results => {
                        return results;
                    });
            
                    const json = reportGenerator.generateReport(report.lhr, 'json');
                    const html = reportGenerator.generateReport(report.lhr, 'html');
                    
          
                    // remove old report json                  
                    // fs.unlinkSync(path.join(__dirname,'/report.json'), err => {
                    //   console.log(err)
                    // });

                    //Write report json to the file
                    fs.writeFileSync(__dirname+'/json/desktop/report'+itr_d+'.json', json, (err) => {
                        if (err) {
                            console.error(err);
                        }
                    });

                    fs.readFile(__dirname+'/json/desktop/report'+itr_d+'.json', {encoding: 'utf8', flag:'r'},function(err,data) {
                      if (err) {
                        console.log(err)
                      }
                      else {
                        output = JSON.parse(data)
                        // compare.push(output.categories.performance.score * 100)

                        // check min and max score
                        // if (u == 2 ) {
                            // min = arrayMin(compare)
                            // max = arrayMax(compare)
                            // console.log(compare)
                        
                            //check push score
                            score = new pushScore({"no":itr_d, "url":output.finalUrl,"desktop performance": output.categories.performance.score * 100})
                            console.log(score)

                            //Write report html to the file
                            name = output.finalUrl;
                            fs.writeFile(__dirname+'/report/desktop/'+itr_d+name.split(/[,\/:.?]/g)+'desktop-report.html', html, (err) => {
                              if (err) {
                                console.error(err);
                              }    
                            });

                            itr_d = itr_d + 1;
                        // }
                        // chrome.disconnected;
                         chrome.kill
                         chrome.kill
                         chrome.kill
                      
                      }
                    })

                  }
                  catch(err) {
                    console.log(err)
                  }
// u = u + 1;}
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
                
                // /* add to workbook */
                var wb = XLSX.utils.book_new();
               
                wb.SheetNames.push("Overview");  
                var ws = XLSX.utils.json_to_sheet(JSON.parse(data));  
                wb.Sheets["Overview"] = ws;  
                XLSX.writeFile(wb, 'performance-score-'+folder_name+'.xlsx');

                const dir = __dirname+'/json/mobile/';
                fs.readdir(dir, (err, files) => {

                  let j = 0;
                  while(j<=files.length - 1) {
                    wb.SheetNames.push(JSON.stringify(j)); 
                    j=j+1
                  }

                  /////// NEW CODE
                  let i = 0;
                  fs.readFile(__dirname+'/json/mobile/report'+i+'.json', {encoding: 'utf8', flag:'r'},function(err,data) {
                    if (err) {
                      console.log(err)
                    }
                    else {
      
                      try {
                        let issue = []
                        let sdata
                          for(let j = 0; j <= files.length-1;j++) {
                            sdata = fs.readFile(__dirname+'/json/mobile/report'+j+'.json', {encoding: 'utf8', flag:'r'},function(err,data) {
                              if (err) {
                                console.log(err)
                              }
                              console.log('data ke '+ j )
                              let issue = []
                              let output  = JSON.parse(data)
                              issue[0] = output.audits['uses-webp-images'].title
                              // console.log(webp)
                              issue[1] = output.audits['uses-optimized-images'].title
                              // console.log(optimized_img)
                              issue[2] = output.audits['uses-responsive-images'].title
                              // console.log(unresponsive_images)
                              issue[3] = output.audits['uses-rel-preload'].title
                              // console.log(preload)
                              issue[4] = output.audits['no-document-write'].title
                              // console.log(non_doc_write)
                              issue[5] = output.audits['uses-long-cache-ttl'].title
                              // console.log(cache_ttl)
                              issue[6] = output.audits['unsized-images'].title
                              // console.log(unsized_img)
      
                              locateissue0(1,output)
                              locateissue1(2,output)
                              locateissue2(3,output)
                              locateissue3(4,output)
                              locateissue4(5,output)
                              locateissue5(6,output)
                              locateissue6(7,output)
                                        
                              ws = XLSX.utils.json_to_sheet(issues);
                              wb.Sheets[JSON.stringify(j)] = ws;  
                              issues = []
                        
                              //write excel
                              XLSX.writeFile(wb, 'performance-score-'+folder_name+'.xlsx');

                            })     
                          }
                    
                      }catch(err) {
                        console.log(err)
                      }
                    }
                  })  
                })
            });            
          },3600000)
          
           test.skip("add to excel for performance", async() => {
             
            let i = 1;
            fs.readFile(__dirname+'/json/mobile/report'+i+'.json', {encoding: 'utf8', flag:'r'},function(err,data) {
              if (err) {
                console.log(err)
              }
              else {
                let output  = JSON.parse(data)
                // let webp = output.audits['uses-webp-images'].details.items
                // console.log(webp)
                // let optimized_img = output.audits['uses-optimized-images'].details.items
                // console.log(optimized_img)
                // let unresponsive_images = output.audits['uses-responsive-images'].details.items
                // console.log(unresponsive_images)
                // let preload = output.audits['uses-rel-preload'].details.items
                // console.log(preload)
                // let non_doc_write = output.audits['no-document-write'].details.items
                // console.log(non_doc_write)
                // let cache_ttl = output.audits['uses-long-cache-ttl'].details.items
                // console.log(cache_ttl)
                // let unsized_img = output.audits['unsized-images'].details.items
                // console.log(unsized_img)
                
              }
            })

           },3600000)
           
           function locateissue0(j,output) {  
try { 
            issues.push({"no":j,"issue title": output.audits['uses-webp-images'].title,"location": output.audits['uses-webp-images'].details.items[0].url,
              "total in MB" : (output.audits['uses-webp-images'].details.items[0].totalBytes) / 125000,
              "wasted in MB" : (output.audits['uses-webp-images'].details.items[0].wastedBytes) / 125000,
            })
         
              let l = 1
              while (l <= output.audits['uses-webp-images'].details.items.length - 1 ) {
                issues.push({"location" :output.audits['uses-webp-images'].details.items[l].url,
                  "total in MB" : (output.audits['uses-webp-images'].details.items[l].totalBytes) / 125000,
                  "wasted in MB" : (output.audits['uses-webp-images'].details.items[l].wastedBytes) / 125000,
                })
                l++;
              }
              issues.push({})
           
              return issues
}catch(err) {
              //do nothing
}
           }

           function locateissue1(j,output) {  
try {      
            issues.push({"no":j,"issue title": output.audits['uses-optimized-images'].title,"location": output.audits['uses-optimized-images'].details.items[0].url,
            "total in MB" : (output.audits['uses-optimized-images'].details.items[0].totalBytes) / 125000,
            "wasted in MB" : (output.audits['uses-optimized-images'].details.items[0].wastedBytes) / 125000,
          })
         
              let l = 1
              while (l <= output.audits['uses-optimized-images'].details.items.length - 1 ) {
                issues.push({"location" :output.audits['uses-optimized-images'].details.items[l].url,
                "total in MB" : (output.audits['uses-optimized-images'].details.items[l].totalBytes) / 125000,
                "wasted in MB" : (output.audits['uses-optimized-images'].details.items[l].wastedBytes) / 125000,
              })
                l++;
              }
              issues.push({})

              return issues
}catch(err) {
  //do nothing
}
           }

           function locateissue2(j,output) {  
            try {              
            issues.push({"no":j,"issue title": output.audits['uses-responsive-images'].title,"location": output.audits['uses-responsive-images'].details.items[0].url,
            "total in MB" : (output.audits['uses-responsive-images'].details.items[0].totalBytes) / 125000,
            "wasted in MB" : (output.audits['uses-responsive-images'].details.items[0].wastedBytes) / 125000,     
          })
         
              let l = 1
              while (l <= output.audits['uses-responsive-images'].details.items.length - 1 ) {
                issues.push({"location" :output.audits['uses-responsive-images'].details.items[l].url,
                "total in MB" : (output.audits['uses-responsive-images'].details.items[l].totalBytes) / 125000,
                "wasted in MB" : (output.audits['uses-responsive-images'].details.items[l].wastedBytes) / 125000,
              })
                l++;
              }
              issues.push({})
           
           return issues
          }catch(err) {
            //do nothing
          }
           }

           function locateissue3(j,output) {  
            try { 
              issues.push({"no":j,"issue title": output.audits['uses-rel-preload'].title,"location": output.audits['uses-rel-preload'].details.items[0].url,
              "wasted in second" : (output.audits['uses-rel-preload'].details.items[0].wastedMs) / 1000
            })
           
                let l = 1
                while (l <= output.audits['uses-rel-preload'].details.items.length - 1 ) {
                  issues.push({"location" :output.audits['uses-rel-preload'].details.items[l].url,
                  "wasted in second" : (output.audits['uses-rel-preload'].details.items[l].wastedMs) / 1000
                })
                  l++;
                }
                issues.push({})
             
             return issues
            }catch(err) {
              //do nothing
            }
           }

           function locateissue4(j,output) {  
            try { 
            //  let j = 0;
            //  while(j <= 7 - 1) {
              issues.push({"no":j,"issue title": output.audits['no-document-write'].title,"location": output.audits['no-document-write'].details.items[0].url,
              "label" : output.audits['no-document-write'].details.items[0].label
            })
              // if(j == 4) {
                let l = 1
                while (l <= output.audits['no-document-write'].details.items.length - 1 ) {
                  issues.push({"location" :output.audits['no-document-write'].details.items[l].url,
                  "label" : output.audits['no-document-write'].details.items[l].label
                })
                  l++;
                }
              // }
            //   j++;
            //  }
             console.log(issues)
             issues.push({})
             return issues
            }catch(err) {
              //do nothing
            }
           }

           function locateissue5(j,output) {  
            try {   
            issues.push({"no":j,"issue title": output.audits['uses-long-cache-ttl'].title,"location": output.audits['uses-long-cache-ttl'].details.items[0].url,
            "total in MB" : (output.audits['uses-long-cache-ttl'].details.items[0].totalBytes) /  125000,
            "wasted in MB" : (output.audits['uses-long-cache-ttl'].details.items[0].wastedBytes) /  125000,
            "cache lifetime in minute" : (output.audits['uses-long-cache-ttl'].details.items[0].cacheLifetimeMs) / 60000
          })
         
              let l = 1
              while (l <= output.audits['uses-long-cache-ttl'].details.items.length - 1 ) {
                issues.push({"location" :output.audits['uses-long-cache-ttl'].details.items[l].url,
                "total in MB" : (output.audits['uses-long-cache-ttl'].details.items[l].totalBytes) /  125000,
                "wasted in MB" : (output.audits['uses-long-cache-ttl'].details.items[l].wastedBytes) /  125000,
                "cache lifetime in minute" : (output.audits['uses-long-cache-ttl'].details.items[l].cacheLifetimeMs) / 60000
              })
                l++;
              }
              issues.push({})
           
           return issues
          }catch(err) {
            //do nothing
          }
           }

           function locateissue6(j,output) {  
            try {  
            issues.push({"no":j,"issue title": output.audits['unsized-images'].title,"location": output.audits['unsized-images'].details.items[0].url,
            "snippet" : output.audits['unsized-images'].details.items[0].node.snippet
          })
         
              let l = 1
              while (l <= output.audits['unsized-images'].details.items.length - 1 ) {
                issues.push({"location" :output.audits['unsized-images'].details.items[l].url,
                "snippet" : output.audits['unsized-images'].details.items[l].node.snippet
              })
                l++;
              }
              issues.push({})
           
           return issues
          }catch(err) {
            //do nothing
          }
           }

          
    })
 