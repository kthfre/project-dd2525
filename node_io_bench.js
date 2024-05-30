const fs = require('node:fs/promises');
const path = require('node:path');

const NUM_EXPERIMENTS = 10;
const NUM_ITERATIONS = 100000;
const PATHS = ["./path/1/test.txt", "./path/2/test.txt", "./path/3/test.txt", "./path/4/test.txt", "./path/5/test.txt"];
let count;

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

function bench(k) {
    count = 0;

    const t0 = performance.now();
    for (let i = 0; i < NUM_ITERATIONS; i++) {
        fs.readFile(path.resolve(__dirname, PATHS[Math.floor(Math.random() * 5)]), {encoding: 'utf8'}).then(res => {
            count++;

            if (count === NUM_ITERATIONS) {
                const t1 = performance.now();
                const t = (t1 - t0);
                time_measure.push(t);
                
                if (k === NUM_EXPERIMENTS) {
                    let c = mean_std(time_measure);
                    let mean = c[0];
                    let stdev = c[1];

                    console.log("Number of runs: " + NUM_EXPERIMENTS);
                    console.log("Mean running time: " + mean + " ms.");
                    console.log("Standard deviation running time: " + stdev);
                } else {
                    bench(k + 1);
                }
            }
        }).catch(err => {
            console.log("err")
        });  
    }
}

bench(1);