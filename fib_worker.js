const FIB_NUM = 44;

function fibonacci(num) {
    if (num === 1 || num === 2) {
        return 1;
    } else {
        return fibonacci(num - 1) + fibonacci(num - 2);
    }
}

const t0 = performance.now();

fibonacci(FIB_NUM);

const t1 = performance.now();
const t = (t1 - t0);
// console.log("Duration: " + t + " ms")

self.postMessage("exit");

if (Object.keys(self).indexOf("Deno") !== -1) {
    self.close();
} else {
    process.exit();
}
    