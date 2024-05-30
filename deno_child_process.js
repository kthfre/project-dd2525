import { execFile } from "https://deno.land/std@0.177.0/node/child_process.ts";

const EXPERIMENT_SCRIPT = "./primality_process.js"; // "./fib_process.js"
const NUM_EXPERIMENTS = 10;
const NUM_PROCESSES = 4;
let time_measure = [];

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

function runExperiment(k) {
    const processes = new Set();
        let count = 0;

        const t0 = performance.now();
        for (let i = 0; i < NUM_PROCESSES; i++) {
            processes.add(execFile("deno", ["run", EXPERIMENT_SCRIPT]));
        }

        processes.forEach(process => {
            process.stdout.on("data", data => {
            //   console.log(`data from process ${data}`)
            });
            process.on("close", code => {
            //   console.log(`close from process ${code}`)

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
            })
        });
}

runExperiment(1);