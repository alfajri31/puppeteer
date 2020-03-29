import { group, sleep } from 'k6';
import http from 'k6/http';

// Version: 1.2
// Creator: Load Impact v4.0 - k6 JS Test Script Recorder

export let options = {
    stages: [
        {
            "duration": "1m0s",
            "target": 10
        },
        {
            "duration": "8m0s",
            "target": 10
        },
        {
            "duration": "1m0s",
            "target": 0
        }
    ],
    maxRedirects: 0,
    discardResponseBodies: true,
};

export default function() {

	group("page_0 - https://wondr.space/milo-pmgm/", function() {
		let req, res;
		req = [{
			"method": "get",
			"url": "https://powerupgame.s3-ap-southeast-1.amazonaws.com/milo-pmgm/v2/fileSequence1.ts",
			"params": {
				"headers": {
					"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.116 Safari/537.36",
					"Sec-Fetch-Dest": "empty",
					"Accept": "*/*"
				}
			}
		}];
		res = http.batch(req);
		sleep(1.11);
		req = [{
			"method": "get",
			"url": "https://powerupgame.s3-ap-southeast-1.amazonaws.com/milo-pmgm/v2/fileSequence2.ts",
			"params": {
				"headers": {
					"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.116 Safari/537.36",
					"Sec-Fetch-Dest": "empty",
					"Accept": "*/*"
				}
			}
		}];
		res = http.batch(req);
		sleep(0.56);
		req = [{
			"method": "get",
			"url": "https://powerupgame.s3-ap-southeast-1.amazonaws.com/milo-pmgm/v2/fileSequence3.ts",
			"params": {
				"headers": {
					"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.116 Safari/537.36",
					"Sec-Fetch-Dest": "empty",
					"Accept": "*/*"
				}
			}
		}];
		res = http.batch(req);
		sleep(0.96);
		req = [{
			"method": "get",
			"url": "https://powerupgame.s3-ap-southeast-1.amazonaws.com/milo-pmgm/v2/fileSequence4.ts",
			"params": {
				"headers": {
					"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.116 Safari/537.36",
					"Sec-Fetch-Dest": "empty",
					"Accept": "*/*"
				}
			}
		}];
		res = http.batch(req);
		sleep(0.99);
		req = [{
			"method": "get",
			"url": "https://powerupgame.s3-ap-southeast-1.amazonaws.com/milo-pmgm/v2/fileSequence5.ts",
			"params": {
				"headers": {
					"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.116 Safari/537.36",
					"Sec-Fetch-Dest": "empty",
					"Accept": "*/*"
				}
			}
		},{
			"method": "get",
			"url": "https://powerupgame.s3-ap-southeast-1.amazonaws.com/milo-pmgm/v2/fileSequence6.ts",
			"params": {
				"headers": {
					"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.116 Safari/537.36",
					"Sec-Fetch-Dest": "empty",
					"Accept": "*/*"
				}
			}
		}];
		res = http.batch(req);
		sleep(2.90);
		req = [{
			"method": "get",
			"url": "https://powerupgame.s3-ap-southeast-1.amazonaws.com/milo-pmgm/v2/fileSequence7.ts",
			"params": {
				"headers": {
					"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.116 Safari/537.36",
					"Sec-Fetch-Dest": "empty",
					"Accept": "*/*"
				}
			}
		}];
		res = http.batch(req);
		sleep(2.54);
		req = [{
			"method": "get",
			"url": "https://powerupgame.s3-ap-southeast-1.amazonaws.com/milo-pmgm/v2/fileSequence8.ts",
			"params": {
				"headers": {
					"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.116 Safari/537.36",
					"Sec-Fetch-Dest": "empty",
					"Accept": "*/*"
				}
			}
		}];
		res = http.batch(req);
		sleep(4.07);
		req = [{
			"method": "get",
			"url": "https://powerupgame.s3-ap-southeast-1.amazonaws.com/milo-pmgm/v2/fileSequence9.ts",
			"params": {
				"headers": {
					"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.116 Safari/537.36",
					"Sec-Fetch-Dest": "empty",
					"Accept": "*/*"
				}
			}
		}];
		res = http.batch(req);
		sleep(2.86);
		req = [{
			"method": "get",
			"url": "https://powerupgame.s3-ap-southeast-1.amazonaws.com/milo-pmgm/v2/fileSequence10.ts",
			"params": {
				"headers": {
					"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.116 Safari/537.36",
					"Sec-Fetch-Dest": "empty",
					"Accept": "*/*"
				}
			}
		}];
		res = http.batch(req);
		sleep(2.83);
		req = [{
			"method": "get",
			"url": "https://powerupgame.s3-ap-southeast-1.amazonaws.com/milo-pmgm/v2/fileSequence11.ts",
			"params": {
				"headers": {
					"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.116 Safari/537.36",
					"Sec-Fetch-Dest": "empty",
					"Accept": "*/*"
				}
			}
		}];
		res = http.batch(req);
		sleep(4.04);
		req = [{
			"method": "get",
			"url": "https://powerupgame.s3-ap-southeast-1.amazonaws.com/milo-pmgm/v2/fileSequence12.ts",
			"params": {
				"headers": {
					"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.116 Safari/537.36",
					"Sec-Fetch-Dest": "empty",
					"Accept": "*/*"
				}
			}
		}];
		res = http.batch(req);
		sleep(2.92);
		req = [{
			"method": "get",
			"url": "https://powerupgame.s3-ap-southeast-1.amazonaws.com/milo-pmgm/v2/fileSequence13.ts",
			"params": {
				"headers": {
					"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.116 Safari/537.36",
					"Sec-Fetch-Dest": "empty",
					"Accept": "*/*"
				}
			}
		}];
		res = http.batch(req);
		sleep(2.90);
		req = [{
			"method": "get",
			"url": "https://powerupgame.s3-ap-southeast-1.amazonaws.com/milo-pmgm/v2/fileSequence14.ts",
			"params": {
				"headers": {
					"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.116 Safari/537.36",
					"Sec-Fetch-Dest": "empty",
					"Accept": "*/*"
				}
			}
		}];
		res = http.batch(req);
		sleep(3.15);
		req = [{
			"method": "get",
			"url": "https://powerupgame.s3-ap-southeast-1.amazonaws.com/milo-pmgm/v2/fileSequence15.ts",
			"params": {
				"headers": {
					"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.116 Safari/537.36",
					"Sec-Fetch-Dest": "empty",
					"Accept": "*/*"
				}
			}
		}];
		res = http.batch(req);
		sleep(6.68);
		req = [{
			"method": "get",
			"url": "https://powerupgame.s3-ap-southeast-1.amazonaws.com/milo-pmgm/v2/fileSequence16.ts",
			"params": {
				"headers": {
					"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.116 Safari/537.36",
					"Sec-Fetch-Dest": "empty",
					"Accept": "*/*"
				}
			}
		}];
		res = http.batch(req);
		// Random sleep between 5s and 10s
		sleep(Math.floor(Math.random()*5+5));
	});

}