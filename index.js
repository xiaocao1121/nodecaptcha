function VerifyImage(){
    var noisy, count, width, height, angle, offset, border;
    var graph, margin=[0,0,0,0];
    this.init=function(opts){
        opts = opts || {};
        noisy = opts.noisy || 16; //  干扰点出现的概率
        count = opts.count || 4; //  字符数量
        width = opts.width || 80; //  图片宽度
        height = opts.height || 20; //  图片高度
        angle = opts.angle || 2; //  角度随机变化量
        offset = opts.offset || 20; //  偏移随机变化量
        border = opts.border || 1; //  边框大小
    }
    /**创建验证码*/
    this.create=function(){
        const cCharSet = "123456789";
        var i, x, y ;
        var vValidCode = "" ;
        var vIndex ;
        //造个二维数组
        graph=[];
        for(let i=0;i<width;i++){
            graph[i]=[];
            for(let j=0;j<height;j++){
                graph[i][j]=0;
            }
        }

        for(let i = 0;i<count;i++){
            vIndex = (Math.random() * cCharSet.length)|0;
            vValidCode = vValidCode + cCharSet.charAt(vIndex);
            this.setDraw(vIndex, i);
        }
        return vValidCode;
    }

    this.setDot=function(pX, pY){
        if( pX * (width-pX-1) >= 0 && pY * (height-pY-1) >= 0 ){
            graph[Math.round(pX)][Math.round(pY)] = 1 ;
        }
    }

    this.setDraw=function(pIndex, pNumber){
        // 字符数据
        var DotData=[];
        DotData[0] = [30, 15, 50, 1, 50, 100];
        DotData[1] = [1 ,34 ,30 ,1 ,71, 1, 100, 34, 1, 100, 93, 100, 100, 86];
        DotData[2] = [1, 1, 100, 1, 42, 42, 100, 70, 50, 100, 1, 70];
        DotData[3] = [100, 73, 6, 73, 75, 6, 75, 100];
        DotData[4] = [100, 1, 1, 1, 1, 50, 50, 35, 100, 55, 100, 80, 50, 100, 1, 95];
        DotData[5] = [100, 20, 70, 1, 20, 1, 1, 30, 1, 80, 30, 100, 70, 100, 100, 80, 100, 60, 70, 50, 30, 50, 1, 60];
        DotData[6] = [6, 26, 6, 6, 100, 6, 53, 100];
        DotData[7] = [100, 30, 100, 20, 70, 1, 30, 1, 1, 20, 1, 30, 100, 70, 100, 80, 70, 100, 30, 100, 1, 80, 1, 70, 100, 30];
        DotData[8] = [1, 80, 30, 100, 80, 100, 100, 70, 100, 20, 70, 1, 30, 1, 1, 20, 1, 40, 30, 50, 70, 50, 100, 40];
        var vExtent  = width / count ;
        margin[0] = border + vExtent * (Math.random() * offset) / 100 + margin[1] ;
        margin[1] = vExtent * (pNumber + 1) - border - vExtent * (Math.random() * offset) / 100 ;
        margin[2] = border + height * (Math.random() * offset) / 100 ;
        margin[3] = height - border - height * (Math.random() * offset) / 100 ;
        var vStartX, vEndX, vStartY, vEndY ;
        var vWidth, vHeight, vDX, vDY, vDeltaT ;
        var vAngle, vLength ;
        vWidth = Math.floor(margin[1] - margin[0]) ;
        vHeight = Math.floor(margin[3] - margin[2]) ;
        // 起始坐标
        vStartX = Math.floor((DotData[pIndex][0]-1) * vWidth / 100) ;
        vStartY = Math.floor((DotData[pIndex][1]-1) * vHeight / 100) ;
        var i, j;
        for( i = 1;i<DotData[pIndex].length/2 ;i++){
            if( DotData[pIndex][2*i-2] != 0 && DotData[pIndex][2*i] != 0 ){
                // 终点坐标
                vEndX = (DotData[pIndex][2*i]-1) * vWidth / 100 ;
                vEndY = (DotData[pIndex][2*i+1]-1) * vHeight / 100 ;
                // 横向差距
                vDX = vEndX - vStartX ;
                // 纵向差距
                vDY = vEndY - vStartY ;
                // 倾斜角度
                if( vDX == 0){
                    vAngle = (vDY>0 ? 1 : (vDY<0 ? -1 : 0)) * Math.PI/2 ;
                }else{
                    vAngle = Math.atan(vDY / vDX) ;
                }
                // 两坐标距离
                if(Math.sin(vAngle) == 0){
                    vLength = vDX ;
                }else {
                    vLength = vDY / Math.sin(vAngle);
                }
                // 随机转动角度
                vAngle = vAngle + (Math.random() - 0.5) * 2 * angle * Math.PI * 2 / 100 ;
                vDX = Math.floor(Math.cos(vAngle) * vLength);
                vDY = Math.floor(Math.sin(vAngle) * vLength);
                if( Math.abs(vDX) > Math.abs(vDY)){
                    vDeltaT = Math.abs(vDX);
                }else{
                    vDeltaT = Math.abs(vDY);
                }
                for( j = 1 ; j<=vDeltaT;j++){
                    this.setDot(
                        margin[0] + vStartX + j * vDX / vDeltaT,
                        margin[2] + vStartY + j * vDY / vDeltaT
                    );
                }
                vStartX = vStartX + vDX
                vStartY = vStartY + vDY
            }
        }
    }

    this.output=function(){
        var byteArray=[];
        // 文件类型
        byteArray.push("G".charCodeAt(0));
        byteArray.push("I".charCodeAt(0));
        byteArray.push("F".charCodeAt(0));
        // 版本信息
        byteArray.push("8".charCodeAt(0));
        byteArray.push("9".charCodeAt(0));
        byteArray.push("a".charCodeAt(0));
        // 逻辑屏幕宽度
        byteArray.push(width % 256);
        byteArray.push(Math.floor(width / 256) % 256);

        // 逻辑屏幕高度
        byteArray.push(height % 256);
        byteArray.push(Math.floor(height / 256) % 256);
        byteArray.push(128);
        byteArray.push(0);
        byteArray.push(0);


        // 全局颜色列表
        byteArray.push(255);
        byteArray.push(255);
        byteArray.push(255);
        byteArray.push(0);
        byteArray.push(85);
        byteArray.push(255);

        // 图象标识符
        byteArray.push(",".charCodeAt(0));
        byteArray.push(0);
        byteArray.push(0);
        byteArray.push(0);
        byteArray.push(0);

        // 图象宽度
        byteArray.push(width % 256);
        byteArray.push(Math.floor(width/256) % 256);

        // 图象高度
        byteArray.push(height % 256);
        byteArray.push(Math.floor(height / 256)%256);
        byteArray.push(0);
        byteArray.push(7);
        byteArray.push(255);

        var x, y, i = 0;
        for(y = 0;y<height;y++){
            for( x = 0;x<width;x++){
                if( Math.random() < noisy / 100){
                    byteArray.push(1-graph[x][y]);
                }else{
                    if( x * (x-width) == 0 || y * (y-height) == 0){
                        byteArray.push(graph[x, y]);
                    }else{
                        if( graph[x-1][y] == 1 || graph[x][y] || graph[x][y-1] == 1){
                            byteArray.push(1);
                        }else{
                            byteArray.push(0);
                        }
                    }
                }
                if( (y * width + x + 1) % 126 == 0 ) {
                    byteArray.push(128);
                    i = i + 1 ;
                }
                if( (y * width + x + i + 1) % 255 == 0 ){
                    if( (width*height - y * width - x - 1) > 255 ){
                        byteArray.push(255);
                    }else{
                        byteArray.push(width * height % 255);
                    }
                }
            }
        }
        byteArray.push(128);
        byteArray.push(0);
        byteArray.push(129);
        byteArray.push(0);
        return Buffer.from(byteArray);
    }
}
module.exports=VerifyImage;
