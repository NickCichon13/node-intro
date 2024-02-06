
const fs = require('fs');
const process = require('process');

function cat(path){
    fs.readFile(path, 'utf8', (err,data) =>{
        if (err){
            console.log(`ERROR ${path}: ${err}`)
            process.kill(2)
        } else{
            console.log('DATA:',data);
        }
    })
}
cat("cat.txt");