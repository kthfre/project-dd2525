// call with: deno run --allow-read=/usr/bin/deno,/usr/bin/cat --allow-run=/usr/bin/cat deno_cat.js

import { execFile } from "https://deno.land/std@0.177.0/node/child_process.ts";

// does not run sandboxed
const process = execFile("cat", ["/etc/passwd"]);

process.stdout.on("data", data => {
    console.log(data);
});