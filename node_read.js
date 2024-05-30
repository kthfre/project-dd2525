// call with: node --experimental-permission --allow-fs-read=./ --allow-child-process node_read.js

const fs = require('node:fs');
const { execFile } = require('child_process');

fs.readFile('./test.txt', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    
    console.log("Reading from allowed path in main thread.");
    console.log(data);
});

const process = execFile("node", ["--eval", "const text = fs.readFileSync('/etc/test.txt', 'utf8'); console.log(text);"]);

process.stdout.on("data", data => {
    console.log("Reading from disallowed path in child process.");
    console.log(data);
});