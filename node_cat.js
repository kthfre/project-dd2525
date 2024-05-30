// call with: node --experimental-permission --allow-fs-read=./ --allow-child-process node_cat.js

const fs = require('node:fs');
const { execFile } = require('child_process');

const process = execFile("cat", ["/etc/passwd"]);

process.stdout.on("data", data => {
    console.log(data);
});