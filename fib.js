const NUM_EXPERIMENTS = 10;
const FIB_NUM = 44;

function fibonacci(num) {
    if (num === 1 || num === 2) {
        return 1;
    } else {
        return fibonacci(num - 1) + fibonacci(num - 2);
    }
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
let f;

for (let k = 0; k < NUM_EXPERIMENTS; k++) {
    const t0 = performance.now();

    f = fibonacci(FIB_NUM);

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
console.log("Fibonacci number " + FIB_NUM + " is " + f);