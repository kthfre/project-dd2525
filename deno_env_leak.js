// call with: deno run --allow-read deno_env_leak.js

const text = await Deno.readTextFile("/proc/self/environ");
console.log("Leaking environment variables equivalent to --allow-env");
console.log(text);