const EXPERIMENT_SCRIPT = "./fib_worker.js"; // "./primality_worker.js"
const NUM_EXPERIMENTS = 10;
const NUM_PROCESSES = 4;
let time_measure = [];

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

function runExperiment(k) {
    const threads = new Set();
    let count = 0;

    const t0 = performance.now();
    for (let i = 0; i < NUM_PROCESSES; i++) {
        threads.add(new Worker(import.meta.resolve(EXPERIMENT_SCRIPT), { type: "module" }));
    }

    threads.forEach((thread) => {
        thread.onerror = err => {
            throw err;
        };
        thread.onmessage = msg => {
            // console.log(msg.data);

            if (msg.data === "exit") {
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
            }
        };
    });
}

runExperiment(1);

// let c = mean_std(time_measure);
// let mean = c[0];
// let stdev = c[1];
// console.log("Number of runs: " );
// console.log("Mean running time: " + mean + " ms.");
// console.log("Standard deviation running time: " + stdev);