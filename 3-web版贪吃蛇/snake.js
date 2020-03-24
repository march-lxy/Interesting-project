(function(){

    //1、 创建蛇身体
    // ------------------------------------------------------------
    var arr = [];//创建个数组存储蛇身体

    function snake(obj){
        obj = obj || {};
        this.width = obj.width || 20;
        this.height = obj.height || 20;
        this.direction = obj.direction || 'right';
        this.body = [
            //x，y代表蛇身体的坐标，对象中的每一个元素都代表蛇身体的一节的参数
            {x : 3,y : 3,color : 'red'},//蛇头部分
            {x : 2,y : 3,color : 'lime'},//第一节
            {x : 1,y : 3,color : 'lime'}//第二节
        ]
    }
    // ------------------------------------------------------------

    //2、 将蛇身体渲染到页面上（根据蛇身体数据动态创建出盒子)
    // ------------------------------------------------------------

    snake.prototype.render = function(){
        for(var i = 0,leng = arr.length;i < leng;i++){
            confine.removeChild(arr[0]);
            arr.splice(0,1);
        }

        // 根据snake里面body里面的元素创建蛇身体，有几个创建几个
        this.body.forEach(function (item){

            var div = document.createElement('div'); //蛇身体每一节的盒子
            arr.push(div);

            //根据蛇身体数据给div盒子赋值
            div.style.width = this.width + 'px';
            div.style.height = this.height + 'px';
            div.style.backgroundColor = item.color;

            // 设置蛇每节身体所在位置
            div.style.position = 'absolute';
            div.style.left = this.width * item.x + 'px';
            div.style.top = this.height * item.y + 'px';
            // 把蛇身体添加到confine盒子里面去
            confine.appendChild(div);

        }.bind(this))//指定函数内部this指向snake,并调用函数; 
    }

    // 3、设置蛇移动(动态的修改蛇身体每一节位置)
    snake.prototype.move = function(){
        for(var i = this.body.length - 1 ; i > 0 ; i--){
            this.body[i].x = this.body[i-1].x;
            this.body[i].y = this.body[i-1].y;
        }
        // this.body[0].x += 1;
        switch(this.direction){
            case 'left':
                this.body[0].x -= 1;
                break;
            case 'top':
                this.body[0].y -= 1;
                break;
            case 'right':
                this.body[0].x += 1;
                break;
            case 'bottom':
                this.body[0].y += 1;
                break;
        }
        // console.log(this.body[0].y);
        
    }  



    window.snake = snake;

})()