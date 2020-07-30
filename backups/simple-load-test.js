import http from 'k6/http';
import {check, group, sleep} from 'k6';

export let options = {
  stages: [
    { duration: "10s", target: 100 },// simulate ramp-up of traffic from 1 to 100 users over 5 minutes.
    { duration: "1m", target: 100 }, // stay at 50 users for 5 minutes
    { duration: "10s", target: 0 }, // ramp-down to 0 users
  ],
  thresholds: {
    'http_req_duration': ['p(99)<5500'], // 99% of requests must complete below 1.5s
    'logged in successfully': ['p(99)<5500'], // 99% of requests must complete below 1.5s
  }
};

const BASE_URL = 'https://nutea.co.id/'; 
// const USERNAME = 'admin@bri.co.id';
// const PASSWORD = 'admin';

export default () => {
  // let loginRes = http.post(`${BASE_URL}/admin/signin`, JSON.stringify( {
  //   email: USERNAME,
  //   password: PASSWORD
  // }),{headers: {'Content-Type' : 'application/json'}});  

  // //check response headeers
  // for (var p in loginRes.headers) {
  //   if (loginRes.headers.hasOwnProperty(p)) {
  //     console.log(p + ' : ' + loginRes.headers[p]);
  //   }
  // }
  

  // check(loginRes, {
  //   'status is 200': r => r.status === 200,
  //   'title is correct': r => r.html('title').text() == 'Admin BRI Digisig',
  // });



  //check res code 
  check(loginRes, {
    "is status 200": r => r.status === 200
  });

  // let authHeaders = { headers: {
  //   Authorization: `Bearer ${loginRes.json('access')}`
  // }};
  // let myObjects = http.get(`${BASE_URL}/customer?page=1&limit=25&sort=desc`, authHeaders).json();
  // check(myObjects, { 'retrieved customer': (obj) => obj.length > 0 });

  sleep(1);
}