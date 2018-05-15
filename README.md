# nodecaptcha
pure nodejs captcha
<pre>
//eg
//for koa 
var VerifyImage=require("./index.js");
module.exports=async (ctx,next)=>{
    await next();
    var vImage=new VerifyImage();
    vImage.init();
    var code=vImage.create();
    //保存code 到session 以待使用
    ctx.body=vImage.output();
};
</pre>
