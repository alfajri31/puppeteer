import http from 'k6/http';
import { sleep,check } from 'k6';


export let options = {
  stages: [
    {duration: "1m",target: 100}//1 user looping in 1 minute
  ],
  thresholds: {
    'http_req_duration': ['p(99)<1500'], // 99% of requests must complete below 1.5s
  }

};



const BASE_URL = 'https://nutea.co.id';


export default function() {
  
  let res = http.get(`${BASE_URL}`)

  check(res, {
    'is status 200': (r) => r.status === 200,
  })
  sleep(1);

  // let res= http.batch([
  //   [
  //     'GET', 'https://id.simplesite.com/default.aspx'
  //   ],
  //   [
  //     'GET',
  //     'https://id.simplesite.com/pages/startwizard.aspx'
  //   ]
  // ]);
  //   check(res[0], {
  //   'is status 200': (r) => r.status === 200,
  // })
}