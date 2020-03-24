
  canvas = document.getElementById("canvasId");

  oRange = 56;//传入的百分比值
  swiperInfo = '在线率';
  circleDataDisplay(canvas, oRange, swiperInfo);

  function circleDataDisplay(canvas, oRange, swiperInfo) {
    ctx = canvas.getContext("2d");
    M = Math;
    Sin = M.sin;
    Cos = M.cos;
    Sqrt = M.sqrt;
    Pow = M.pow;
    PI = M.PI;
    Round = M.round;
    oW = canvas.width = 150;
    oH = canvas.height = 150;
    // 线宽
    lineWidth = 1;
    // 大半径
    r = (oW / 2);
    cR = r - 10 * lineWidth;
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    // 水波动画初始参数
    axisLength = 2 * r - 16 * lineWidth;  // Sin 图形长度
    unit = axisLength / 9; // 波浪宽
    range = .4 // 浪幅
    nowrange = range;
    xoffset = 8 * lineWidth; // x 轴偏移量
    data = ~~(oRange) / 100;   // 数据量
    sp = 0; // 周期偏移量
    nowdata = 0;
    waveupsp = 0.006; // 水波上涨速度
    // 圆动画初始参数
    arcStack = [];  // 圆栈
    bR = r - 8 * lineWidth;
    soffset = -(PI / 2); // 圆动画起始位置
    circleLock = true; // 起始动画锁
    // 获取圆动画轨迹点集
    for (var i = soffset; i < soffset + 2 * PI; i += 1 / (8 * PI)) {
      arcStack.push([
        r + bR * Cos(i),
        r + bR * Sin(i)
      ])
    }
    // 圆起始点
    cStartPoint = arcStack.shift();
    ctx.strokeStyle = "#426DCC";
    ctx.moveTo(cStartPoint[0], cStartPoint[1]);
    // 开始渲染
    render();



    function drawSine() {
      ctx.beginPath();
      ctx.save();
      var Stack = []; // 记录起始点和终点坐标
      for (var i = xoffset; i <= xoffset + axisLength; i += 20 / axisLength) {
        var x = sp + (xoffset + i) / unit;
        var y = Sin(x) * nowrange;
        var dx = i;
        var dy = 2 * cR * (1 - nowdata) + (r - cR) - (unit * y);
        ctx.lineTo(dx, dy);
        Stack.push([dx, dy])
      }
      // 获取初始点和结束点
      //第一个浪
      var startP = Stack[0];
      var endP = Stack[Stack.length - 1];
      ctx.lineTo(xoffset + axisLength, oW);
      ctx.lineTo(xoffset, oW);
      ctx.lineTo(startP[0], startP[1]);
      //ctx.fillStyle = "#436ECD";
      ctx.globalAlpha = .6;
      var grd = ctx.createLinearGradient(startP[0], startP[1], endP[0], endP[1]);
      grd.addColorStop(0, "#0500FF");
      grd.addColorStop(.4, "#436ECD");
      grd.addColorStop(1, "#FFFFFF");
      ctx.fillStyle = grd;
      ctx.fill();
      ctx.restore();
      ctx.closePath();
      //设置重叠效果
      ctx.globalCompositeOperation = "source-over";
      //第二个浪
      ctx.lineTo(endP[0], endP[1]);
      ctx.lineTo(xoffset, oW);
      ctx.fillStyle = "skyblue";
      ctx.globalAlpha = .3;
      ctx.fill();
      ctx.restore();
      ctx.closePath();
    }


    //文字
    function drawText() {
      ctx.globalCompositeOperation = 'source-over';
      //第一行（百分比）
      var size = .4 * cR;
      ctx.font = size + 'px Microsoft Yahei';
      txt = (nowdata.toFixed(2) * 100).toFixed(0) + '%';
      ctx.globalAlpha = 1;
      var fonty = r + size / 2;
      var fontx = r - size * 1;
      ctx.fillStyle = "#EADCFF";
      ctx.textAlign = 'center';
      ctx.fillText(txt, r + 2, r);
      //第二行（百分比说明）
      var size = .2 * cR;
      ctx.globalAlpha = .7;
      ctx.fillStyle = "#ffffff";
      ctx.font = size + 'px Microsoft Yahei';
      var fixedTxt = swiperInfo;
      ctx.fillText(fixedTxt, r + 2, r + 20)

    }

    //圆圈（底层）
    function innerCircle() {
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#262C42';
      ctx.arc(r, r, cR - 5, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.restore();
      ctx.beginPath();
    }


    //进度圈（外层）
    function outCircle() {
      ctx.beginPath();
      // var CircleColor = ctx.createLinearGradient(0,0,180,0);  //创建渐变对象  渐变开始点和渐变结束点
      // CircleColor.addColorStop(0, '#40DFD5'); //添加颜色点
      // CircleColor.addColorStop(1, '#139AC5'); //添加颜色点
      //ctx.strokeStyle = CircleColor;   //使用渐变对象作为圆环的颜色
      ctx.lineWidth = 1;
      ctx.strokeStyle = '#ffffff';
      ctx.lineCap = 'round';
      ctx.arc(r, r, cR - 5, 0 * (Math.PI / 180.0) - (Math.PI / 2), (nowdata * 360) * (Math.PI / 180.0) - (Math.PI / 2));
      ctx.stroke();
      ctx.save();

    }


    //裁剪中间水圈(填充画的圆)
    function centerCircle() {
      ctx.beginPath();
      ctx.arc(r, r, cR - 15, 0, 2 * Math.PI, false);
      ctx.clip();
      var grd = ctx.createRadialGradient(r, r, cR - 15, r, r, 0);
      grd.addColorStop(0, '#426DCB');
      grd.addColorStop(.4, '#252851');
      grd.addColorStop(1, '#1C2238');
      //使用径向渐变
      ctx.fillStyle = grd;
      ctx.globalAlpha = .3;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }


    //渲染canvas
    function render() {
      ctx.clearRect(0, 0, oW, oH);
      //底层圆圈  
      innerCircle();
      //外层进度圈
      outCircle();
      //裁剪中间水圈  
      centerCircle();
      // // 控制波幅
      // oRange.addEventListener("change", function () {
      //     data = ~~(oRange.value) / 100;
      //     //console.log("data="+data)
      //   },0);
      if (data >= 0.85) {
        if (nowrange > range / 4) {
          var t = range * 0.01;
          nowrange -= t;
        }
      } else if (data <= 0.1) {
        if (nowrange < range * 1.5) {
          var t = range * 0.01;
          nowrange += t;
        }
      } else {
        if (nowrange <= range) {
          var t = range * 0.01;
          nowrange += t;
        }
        if (nowrange >= range) {
          var t = range * 0.01;
          nowrange -= t;
        }
      }
      if ((data - nowdata) > 0) {
        nowdata += waveupsp;
      }
      if ((data - nowdata) < 0) {
        nowdata -= waveupsp
      }
      sp += 0.07;
      // 开始水波动画
      drawSine();
      // 写字
      drawText();
      requestAnimationFrame(render)
    }
  }
