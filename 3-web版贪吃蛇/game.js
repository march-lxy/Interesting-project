(function(){
  
  
    function Game(){
      this.Food = new food();
      this.Snake = new snake();
    }
    
    Game.prototype.start = function(){
      // 1. 蛇和食物渲染到页面上
      this.Food.render();
      this.Snake.render();
      timeid = setInterval(function(){
        //2. 让蛇自己动起来
        this.Snake.move();
        // 3.判断蛇是否超出，超出就停止游戏。
        //3.1 获取蛇x,y轴上能动的最大距离
        var maxX = confine.offsetWidth / this.Snake.width - 1;
        var maxY = confine.offsetHeight / this.Snake.height - 1;

        var head = this.Snake.body[0];
        //3.2 判断是否超出
        if(head.x < 0 || head.x > maxX || head.y < 0 || head.y > maxY){
          alert('game over !');
          clearInterval(timeid);
          return;
        }


        //4.蛇吃食物,蛇边长
        //4.1 获取蛇头坐标
        var headX = this.Snake.body[0].x * this.Snake.width;
        var headY = this.Snake.body[0].y * this.Snake.height;
         //4.2判断蛇头与食物是否重合
         if(headX == this.Food.x && headY == this.Food.y){
           this.Food.render();

           var last = this.Snake.body[this.Snake.body.length - 1];
           this.Snake.body.push({
             x : last.x,
             y : last.y,
             color : last.color
           });
         }

        this.Snake.render();
      }.bind(this),150);


      //5.监听键盘数据
      document.onkeydown = function(e){
        switch(e.keyCode){
          case 37:
            if(this.Snake.direction === 'right') break;//如果在向右走按左键不响应
            this.Snake.direction = 'left';
            break;
          case 38:
              if(this.Snake.direction === 'bottom') break;//如果在向下走按上键不响应
            this.Snake.direction = 'top';
            break;
          case 39:
              if(this.Snake.direction ==='left') break;//如果在向左走按右键不响应
            this.Snake.direction = 'right';
            break;
          case 40:
              if(this.Snake.direction === 'top') break;//如果在向上走按下键不响应
            this.Snake.direction = 'bottom';
            break;
        }
        // console.log(this.Snake.direction );
      }.bind(this);
      

    }

    window.Game = Game;
    
  })();