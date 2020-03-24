(function(){
    // 1.创建存储贪吃蛇食物数据的对象
    //--------------------------------------------------
    var foodblock;

    function food(obj){
        obj = obj || {};
        this.width = obj.width || 20;
        this.height = obj.height || 20;
        this.Color = obj.Color || 'green';
        this.x = obj.x;
        this.y = obj.y;
    }
    //--------------------------------------------------

    // 2.把食物对象渲染到页面上（在函数里利用食物的数据创建出相关盒子，把这盒子渲染在页面上）
    //--------------------------------------------------
    food.prototype.render = function(){ 
        // 清除吃掉的盒子
        if(foodblock){
            confine.removeChild(foodblock);
        }
        // 创建一个食物盒子
        var fooddiv = document.createElement('div');

        foodblock = fooddiv;

        fooddiv.style.width = this.width + 'px';
        fooddiv.style.height = this.height + 'px';
        fooddiv.style.backgroundColor = this.Color;
        fooddiv.style.position = 'absolute';

        this.x = Tool.getRandom(0, confine.offsetWidth/this.width - 1) * this.width;
        this.y = Tool.getRandom(0, confine.offsetHeight/this.height - 1) * this.height;
        fooddiv.style.left  = this.x + 'px';
        fooddiv.style.top = this.y + 'px';

        confine.appendChild(fooddiv);
 
    }

    window.food = food;

})()