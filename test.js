const { cycleMonth, cycleYear } = require('./index');

const date = new Date();

// Get results
const mm = cycleMonth(date)
const my = cycleYear(date)

// Print results
console.log(`\nDate = ${date.toISOString()}\nMatch Moon Image URLs to Date..\n`)
console.log(`MM = /mm/${mm}`);
console.log(`MY = /my/${my}`);
