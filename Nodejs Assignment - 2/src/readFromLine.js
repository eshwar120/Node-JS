//readLine function

//approach - 1
// const read = require('readline');

// const readLine = read.createInterface({
//     input : process.stdin,
//     output : process.stdout
// });

// readLine.question('Please enter your name:' , name => {
//     console.log(`Hello ${name}`);
// })


//approach - 2
process.stdin.on('name', (name) => {
    console.log(true)
    console.log(`Hello ${name}`);
    process.exit();
})

console.log('Please enter your name:')