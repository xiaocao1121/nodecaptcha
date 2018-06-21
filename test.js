const VerifyImage=require("./index.js");
const fs=require("fs");

var img=new VerifyImage();
img.init();
var code=img.create();
console.log('生成的验证码是:',code);
var bf=img.output();

fs.writeFile("code.gif",bf,function(){
    console.log('保存验证码图片到code.gif');
});