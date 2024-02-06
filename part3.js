const fs = require('fs');
const process = require('process');
const axios = require('axios');


function writeCat(text, out){
    if (out){
        fs.writeFile(text, out, 'utf8', (err) =>{
            if (err){
                console.error(`ERROR ${out}: ${err}`);
                process.exit(1);
            }
        });
    }else{
        console.log(text);
    }
}


function cat(path , out){
    fs.readFile(path, out, 'utf8', (err, data) => {
        if (err){
            console.error(`ERROR ${out}: ${err}`);
            process.exit(1);
        } else{
            writeCat(data, out);
        }
    });
} 
    

async function webCat(url, out){
    try{
        let res = await axios.get(url);
        writeCat(res.data, out);
    }catch(err){
        console.error(`ERROR ${url}: ${err}`);
        process.exit(1);
    }
}

let path;
let out;

if (process.argv[2] === '--out') {
  out = process.argv[3];
  path = process.argv[4];
} else {
  path = process.argv[2];
}

if (path.slice(0, 4) === 'http') {
  webCat(path, out);
} else {
  cat(path, out);
}

