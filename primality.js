const NUM_EXPERIMENTS = 10;

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

function mean_std(vals) {
    let sum = 0, mean, std = 0;

    for (let i = 0; i < vals.length; i++) {
        sum += vals[i];
    }
    mean = sum / vals.length;

    for (let i = 0; i < vals.length; i++) {
        std += Math.pow((vals[i] - mean), 2);
    }
    std = Math.sqrt(std / (vals.length));

    return [mean, std];
}

let time_measure = [];

for (let k = 0; k < NUM_EXPERIMENTS; k++) {
    const t0 = performance.now();

    for (let i = 0; i < 2500; i++) {
        isPrime(87178291199);
        isPrime(78736136153);
    }
    
    const t1 = performance.now();
    const t = (t1 - t0);
    time_measure.push(t);
    // console.log("Duration: " + t + " ms")
}

let c = mean_std(time_measure);
let mean = c[0];
let stdev = c[1];
console.log("Number of runs: " + NUM_EXPERIMENTS);
console.log("Mean running time: " + mean + " ms.");
console.log("Standard deviation running time: " + stdev);