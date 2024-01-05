const GSBNode = require('../GSBNode.js'); // require('gsb-node');
const URLS_TO_CHECK = [
  'http://testsafebrowsing.appspot.com/apiv4/CHROME/MALWARE/URL/',
  'https://ernane.dev/'
];

(function main(){
  const gsb = new GSBNode({ apiKey: 'YOUR_API_KEY_HERE' });
  gsb.lookup(URLS_TO_CHECK).then((res) => {
    console.log(res);
  });
})();