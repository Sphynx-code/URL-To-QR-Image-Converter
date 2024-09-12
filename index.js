const inquirer = require("inquirer");
const qr_image = require("qr-image");
const fs = require("node:fs");
const os = require('node:os');
const { exec } = require('node:child_process');
inquirer
 .prompt(
    {
        message: "Type in your URL: ",
        name: "URL",
      }
 ).then((answers)=>{
    const url = answers.URL;
    const qr_svg = qr_image.image(url);
    const writeSvgToPng = fs.createWriteStream("qr-image.png");
    qr_svg.pipe(writeSvgToPng);
    fs.writeFile("Url.txt",url,(err)=>{
        if(err){
            throw err;
        }
        console.log("The file has been saved!");
    })
    openFile();
 })
 function openFile(){
    const os_type = os.type();
    if(os_type === 'Windows_NT'){
        exec(`start qr-image.png`);
    }
    else if(os_type === 'Darwin'){
        exec(`open qr-image.png`);
    }
    else if(os_type === 'Linux'){
        exec(`xdg-open qr-image.png`);
    }
 }