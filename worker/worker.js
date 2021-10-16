const { parentPort } = require('worker_threads');
const hardTask = require('../hard-task'); 

parentPort.on('message', ({ iterations, multiplier }) => {
    const result = hardTask(iterations, multiplier)

    parentPort.postMessage(result)
})