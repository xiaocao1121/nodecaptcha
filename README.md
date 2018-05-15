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
    ctx.app.debug('verify code is %o',code);
    ctx.body=vImage.output();
};
</pre>
