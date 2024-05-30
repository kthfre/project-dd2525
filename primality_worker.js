function isPrime(n) {
    let threshold = Math.ceil(Math.sqrt(n));

    if (n === 2 || n === 3) {
        return true;
    }

    if (n % 2 === 0) {
        return false;
    }

    for (let i = 3; i < threshold; i += 2) {
        if (n % i === 0) {
            return false;
        }
    }

    return true;
}

const t0 = performance.now();

for (let i = 0; i < 2500; i++) {
    isPrime(87178291199)
    isPrime(78736136153)
}

const t1 = performance.now();
const t = (t1 - t0);
// console.log("Duration: " + t + " ms")

self.postMessage("exit");

if (Object.keys(self).indexOf("Deno") !== -1) {
    self.close();
} else {
    process.exit();
}
    