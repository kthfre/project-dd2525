const EXPERIMENT_SCRIPT = "./fib_worker.js"; // "./primality_worker.js"

const {
    Worker,
    isMainThread,
    parentPort,
    workerData,
} = require("worker_threads");

const NUM_EXPERIMENTS = 10;
let time_measure = [];

function fibonacci(num) {
    if (num === 1 || num === 2) {
        return 1;
    } else {
        return fibonacci(num - 1) + fibonacci(num - 2);
    }
}

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

function populate(num, numThreads = 4) {
    let arr = [];
    for (let i = 0; i < numThreads; i++) {
        arr.push({num});
    }

    return arr;
}

function runExperiment(k) {
    const threads = new Set();

    if (isMainThread) {
        const parts = populate(44);
        let count = 0;

        const t0 = performance.now();
        for (let i = 0; i < parts.length; i++) {
            threads.add(
                new Worker(__filename, {
                workerData: {
                    num: parts[i].num
                },
            })
        );
        }

        threads.forEach((thread) => {
            thread.on("error", (err) => {
                throw err;
            });
            thread.on("exit", () => {
                threads.delete(thread);
                // console.log(`Thread exiting, ${threads.size} running...`);

                if (++count == 4) {
                    const t1 = performance.now();
                    const t = (t1 - t0);
                    time_measure.push(t);
                    // console.log("Duration " + t + " ms.")

                    if (k == NUM_EXPERIMENTS) {
                        let c = mean_std(time_measure);
                        let mean = c[0];
                        let stdev = c[1];

                        console.log("Number of runs: " + NUM_EXPERIMENTS);
                        console.log("Mean running time: " + mean + " ms.");
                        console.log("Standard deviation running time: " + stdev);
                    } else {
                        runExperiment(k + 1);
                    }
                }
            });
            thread.on("message", (msg) => {
                console.log(msg);
            });
        });
    } else {
        if (EXPERIMENT_SCRIPT.indexOf("fib_worker.js") !== -1) {
            const f = fibonacci(workerData.num);
        } else if (EXPERIMENT_SCRIPT.indexOf("primality_worker.js") !== -1) {
            for (let i = 0; i < 2500; i++) {
                isPrime(87178291199);
                isPrime(78736136153);
            }
        }
        

        // parentPort.postMessage(
        // `Fibonnaci ${workerData.num}: ${f}`
        // );
    }
}

runExperiment(1);