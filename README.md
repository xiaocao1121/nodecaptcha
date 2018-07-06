# nodecaptcha

pure nodejs captcha
-------
```javascript
//eg
//for koa 
var VerifyImage=require("./index.js");
module.exports=async (ctx,next)=>{
    await next();
    var vImage=new VerifyImage();
    vImage.init();
    var code=vImage.create();
    //保存code 到session 以待使用 output得到的是一个 Buffer
    ctx.body=vImage.output();
};

//a test

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
```
