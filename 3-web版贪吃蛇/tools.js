var Tool = {
    //获取min~max的随机整数
    getRandom: function(min, max){
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }