const express = require('../node_modules/express');
const app = express();
const { performance } = require('perf_hooks');
const hardTask = require('../hard-task'); 

const port = 3000;
const host = 'localhost';

app.listen(port, host, () => {
    console.log(`listen server ${host}:${port}`)
})

app.get('/', (req, res) => {
    const startTime = performance.now()

    const result = hardTask(5000,1000000)

    const endTime = performance.now() 
    const totalTime = endTime - startTime;
    res.status(200).send({ ...result, totalTime })
})

app.get('/test', (req, res) => {
    res.status(200).send(`hurray, i'm unlocked`)
})