// call with: node --experimental-permission --allow-fs-read=./ --allow-child-process node_read.js

const fs = require('node:fs');

fs.readFile('/etc/test.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    
    console.log("Reading from unallowed path in main thread.");
    console.log(data);
});