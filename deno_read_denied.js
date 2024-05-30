// call with: deno run --allow-read=/usr/bin/deno,./ --allow-run=/usr/bin/deno deno_read_denied.js

const text = await Deno.readTextFile("/etc/test.txt");
console.log("Unable to read as no permissions for this path.");
console.log(text);