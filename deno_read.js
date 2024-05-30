// call with: deno run --allow-read=/usr/bin/deno,./ --allow-run=/usr/bin/deno deno_read.js

const text = await Deno.readTextFile("./test.txt");
console.log("Reading from allowed path in main thread.");
console.log(text);

// eval allows bypassing restrictions
const command = new Deno.Command(Deno.execPath(), {args: ["eval", "const text = await Deno.readTextFile(\"/etc/test.txt\"); console.log(text);"]});
    
const { code, stdout, stderr } = await command.output();

console.log("Reading from disallowed path in child process.");
console.log(new TextDecoder().decode(stdout));