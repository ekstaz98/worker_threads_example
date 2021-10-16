const express = require('express');
const app = express();
const { performance } = require('perf_hooks');
const { Worker } = require('worker_threads');

const port = 3000;
const host = 'localhost';

app.listen(port, host, () => {
    console.log(`listen server ${host}:${port}`)
})

app.get('/', (req, res) => {
    const worker = new Worker('./worker.js')
    const startTime = performance.now()

    worker.postMessage({ 
        iterations: 5000,
        multiplier: 1000000
    })

    worker.once("message", result => {
        const totalTime = performance.now() - startTime;
        res.status(200).send({
          ...result,
          time: totalTime + "ms"
        });
    });
})

app.get('/test', (req, res) => {
    res.send('I am not blocking')
})