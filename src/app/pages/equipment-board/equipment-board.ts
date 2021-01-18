// 引入jquery
declare var $:any;

//生成rgb 减少红色
export const rgb_del_red = ()=> {//rgb颜色随机
    var r = Math.floor(Math.random()*255);
    var g = Math.floor(Math.random()*256);
    var b = Math.floor(Math.random()*256);
    var rgb = 'rgba('+r+','+g+','+b+',0.8)';
    return rgb;
}

/**
 * 生成16比9的尺寸 写不出来
 */
export const create_img_16_9=()=>{
  let center_img = $('.center_img');
  if(!center_img.length)return;
  let img = $('#img');

  let height;
  let i = 9;
  for(i;i>0;i--){
    height = center_img.width()*i*0.1/16*9;
    if(height<center_img.height())break;
  }
  img.height(height);
  img.width(height/9*16);
  console.log('图片收缩16/9');
  // let w  = 16/9*center_img.width();
  // img.width(w)
}

//颜色
export const colors = [
    'rgba(5,116,232,1)',
    'rgba(0,252,248,0.8)',
    'rgba(248,0,248,0.8)',
    'rgba(200,204,20,0.8)',
    'rgba(64,192,64,0.8)',
    'rgba(200,204,64,0.8)',
    'rgba( 112,184,184,0.8)',
    'rgba( 56,112,160,0.8)',
    'rgba( 216,112,88,0.8)',
    'rgba( 152,120,88,0.8)',
    'rgba( 120,120,184,0.8)',
    'rgba( 208,152,72,0.8)',
    'rgba( 128,72,120,0.8)',
    'rgba( 144,172,88,0.8)',
    'rgba( 80,80,168,0.8)',
    'rgba( 112,48,160,0.8)',
    'rgba( 32,36,32,0.8)',
    'rgba( 248,252,248,0.8)',
    'rgba( 0,0,248,0.8)',
    'rgba( 0,252,0,0.8)',
    'rgba( 248,252,0,0.8)',
    'rgba( 40,100,40,0.8)',
    'rgba( 64,204,200,0.8)',

]


 //rgb转换16进制
 export const colorRgb=(sColor,transparency)=>{
  sColor = sColor.toLowerCase();
  //十六进制颜色值的正则表达式
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  // 如果是16进制颜色
  if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
          var sColorNew = "#";
          for (var i=1; i<4; i+=1) {
              sColorNew += sColor.slice(i, i+1).concat(sColor.slice(i, i+1));    
          }
          sColor = sColorNew;
      }
      //处理六位的颜色值
      var sColorChange = [];
      for (var i=1; i<7; i+=2) {
          sColorChange.push(parseInt("0x"+sColor.slice(i, i+2)));    
      }
      sColor = "RGB(" + sColorChange.join(",") + ","+transparency+")";
  }
  return sColor;
};





//时间格式转换
export const dateformat=(date:Date,format:string)=>{
    let timer = {
        'M+':date.getMonth()+1,//月
        'd+':date.getDate(),//日
        'h+':date.getHours(),//小时
        'm+':date.getMinutes(),//分钟
        's+':date.getSeconds(),//秒
        'S+':date.getMilliseconds(),//毫秒
    }
    if((/(y+)/i.test(format))){
        format = format.replace(RegExp.$1,(date.getFullYear()+ '').substr(4-RegExp.$1.length));
    }
    for(let k in timer){
        if(RegExp('('+k+')').test(format)){
            format = format.replace(RegExp.$1,RegExp.$1.length === 1?timer[k]:('00'+timer[k]).substr(('' + timer[k]).length));
        }
    }

    return format;
}




export const copy=(d)=>{
  return JSON.parse(JSON.stringify(d));
}

/**
 * dom 防抖
 */
export const debounce=(func,wait,immediate)=>{
  let timer;
  return function () {
      let context = this;
      let args = arguments;
      if (timer) clearTimeout(timer);
      if (immediate) {
         let callNow = !timer;
         timer = setTimeout(()=>{
                    timer = null;
          },wait);
        if (callNow) func.apply(context, args)
      } else {
        timer = setTimeout(function(){
          func.apply(context, args)
        }, wait);
      }
  }
}




/**
 * 避免 2020-12-17T08:42:00.000Z 出现字符串转时间错误
 */
export const  rTime=(date)=> {
  return date.replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '') 
  // return date;
}

/**
 * http请求中拿到的数据 调用子组件内部方法
 * time 目前是 1 或者 10 
 */
export const painting_time = (f,time,isthis,arr) =>{
  let timest = new Date().getTime();
  let data = {};
  let x = {};
  if(!f.result.message || !f.result.message[0].message)return;
  //拿接口请求到达的数据
  f.result.message[0].message.forEach((el,i) => {
    for(let key in el){
      //将y轴数据打包成key string  value数组
      time == 1?(data[key] = [], data[key].push(el[key][0][0])):data[key] = el[key].map(m => (m[0]?m[0]:0));
      let arr = el[key];
      //将x轴数据打包成key string  value数组
      time == 1?(x[key] = [],x[key].push(dateformat(new Date(rTime(arr[0][1])),'MM-dd hh:mm:ss')))
      :x[key] =  arr.map(m =>( dateformat(new Date(rTime(m[1])),'MM-dd hh:mm:ss')));
    }
  });

  //进行匹配赋值
  // let c,el;
  // for(let i = 0;i<isthis.click_list.length;i++){
  //     c = isthis.click_list[i];
  //     for(let j = 0;j<isthis[`attrs_${i+1}`][c].length;j++){
        // el = isthis[`attrs_${i+1}`][c][j];
  //     }
  // }
  let item:any;
  let xtime:any;
  let ol = false;//是否可以改变x轴数据
  isthis.click_list.forEach((c,i)=>{
      ol = true;
      isthis[`attrs_${i+1}`][c].forEach((el,j) => {
        item = data[el.nameEn.replace(".","").toLocaleLowerCase()];
        if(!item)return;
        xtime = x[el.nameEn.replace(".","").toLocaleLowerCase()];

        if(!item || item.length <= 0 )item = [0];
        if(!xtime || xtime.length <= 0 )xtime = [dateformat(new Date(),'yyyy-MM-dd')];

        if(time == 10){
          el.value = item.slice();
          if(ol)isthis[`attrs_${i+1}`].xData = xtime.slice(),ol = false;
        }else{
          el.value.push(item[0]);
          if(ol)isthis[`attrs_${i+1}`].xData.push(xtime[0]),ol = false;
        }

      //echart 数值显示是以数组下标做对应    判断x轴和数据是否是相同的数量
      if(time == 1 && el.value.length > 10)
          el.value.splice(0,el.value.length-10);
    })
     //判断当前的x轴数组的值是否大于10 减去过长会导致显示拥挤
     if(time == 1 && isthis[`attrs_${i+1}`].xData.length > 10 )
      isthis[`attrs_${i+1}`].xData.splice(0,isthis[`attrs_${i+1}`].xData.length-10);

  })
    // }
  // }
  
  //吧当前所有的全部更新
  let i = -1;
  arr.forEach((f)=>{
    i = parseInt(f.replace(/[^\d.]/g, ""));
    isthis[f].painting({attrs:isthis[`attrs_${i}`][isthis.click_list[i-1]],xData:isthis[`attrs_${i}`].xData,index:1});
  })
  // console.log('本次时长',new Date().getTime()-timest)
}


/**
 * guid生成
 */
export const guid2=()=> {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}







//液压伺服设备介绍
export const hydraulic_htmlstr = [
`
<p class="indent_2 p_white">主要用于底盘结构件台架试验如：副车架、摆臂、稳定杆、后桥等</p>
<p class="p_white p_margin">适用标准规范： </p>
<p class="indent_2 p_white"> Q/JLY J7110489B-2016  乘用车前、后副车架总成技术条件
</p>
<p class="indent_2 p_white">Q/JLY J7110439D-2016 J05204 悬架摆臂总成类技术条件
</p>
<p class="indent_2 p_white">Q/JLY J7110490B-2016 J05204 后桥总成（扭力梁）技术条件
</p>
<p class="indent_2 p_white">Q/JLY J7110371C-2016 J05204 前、后稳定杆总成技术条件
</p>
  `,

`
<div class="equipments_table height_99">
<div class="column_100">
<div class="border_top_1px column_35">名称 </div>
<div class="border_top_1px column_35">基本参数 </div>
<div class="border_top_1px column_35">数量</div>
</div>

<div class="column_100">
<div class="border_top_1px column_35">MTS直线缸</div>
<div class="border_top_1px column_35">
<div class="height_50 column_100 border_top_1px">
载荷：±25kN；<br>
位移：±125mm
</div>
<div class="height_50 column_100 border_top_1px">
载荷：±50kN；<br>
位移：±125mm
</div>
</div>
<div class="border_top_1px column_35">
<div class="height_50 column_100 border_top_1px">
4
</div>
<div class="height_50 column_100 border_top_1px">
2
</div>
</div>
</div>




<div class="column_100">
<div class="border_top_1px column_35">IST 扭转缸</div>
<div class="border_top_1px column_35">
扭矩：±4kNm；<br>
角度：±50°
</div>
<div class="border_top_1px column_35">
1
</div>
</div>



</div>
  `,
`
<div class="equipments_table height_99">
<div class="column_100">
<div class="border_top_1px column_35">名称 </div>
<div class="border_top_1px column_35">基本参数 </div>
<div class="border_top_1px column_35">数量</div>
</div>
<div class="column_100">
<div class="border_top_1px column_35">IST 直线缸</div>
<div class="border_top_1px column_35">
<div class="height_33 column_100 border_top_1px">
载荷：±16kN ；<br>
位移：±125mm
</div>
<div class="height_33 column_100 border_top_1px">
载荷：±63kN；<br>
位移：±75mm
</div>
<div class="height_33 column_100 border_top_1px">
载荷：±16kN；<br>
位移：±75mm
</div>
</div>
<div class="border_top_1px column_35">
<div class="height_33 column_100 border_top_1px">
2
</div>
<div class="height_33 column_100 border_top_1px">
1
</div>
<div class="height_33 column_100 border_top_1px">
2
</div>
</div>
</div>
</div>
`
]

  //四立柱设备介绍
export const  four_road_htmlstr = [
  `
<p class="indent_2 p_white">四立柱轮耦合道路模拟试验主要在试验场采集车辆轮心加速度和螺旋弹簧应变（螺旋弹簧位移或者悬架位移）作为目标信号，在试验室台架上应用MTS RPC技术，来模拟4个车轮的垂向激励或者载荷，可以很精确地再现车辆在试验场道路的垂向工况，加快汽车产品耐久性的开发进度。同时，在试验室配备环境仓和红外灯的情况，可以对汽车内外饰的疲劳寿命和异响进行精确的考核。 </p>
<p class="p_white p_margin">适用标准规范： </p>
<p class="indent_2 p_white">Q/JLY J7210680A-2017 带环境条件的四立柱耐久试验规范
</p>
<p class="indent_2 p_white"> Q/JLY J7210624A-2016 整车四通道轮耦合道路模拟试验规范
</p>
`,

` 
<div class="equipments_table height_99">
<div class="column_100">
<div class="border_top_1px column_65">名称 name</div>
<div class="border_top_1px column_35">基本参数 specifications</div>
</div>
<div class="column_100">
<div class="border_top_1px column_65">最大整车重量 Max.GVW</div>
<div class="border_top_1px column_35">Up to 3500kg</div>
</div>
<div class="column_100">
<div class="border_top_1px column_65">轴距 Wheel base</div>
<div class="border_top_1px column_35">U2m-3.5m</div>
</div>
<div class="column_100">
<div class="border_top_1px column_65">轮距 Track width</div>
<div class="border_top_1px column_35">1.2m-1.8m</div>
</div>
<div class="column_100">
<div class="border_top_1px column_65">轮胎宽度 Tire width</div>
<div class="border_top_1px column_35">13 to 20 inches</div>
</div>
<div class="column_100">
<div class="border_top_1px column_65">作动器最大承载 Actuator Max. Force
</div>
<div class="border_top_1px column_35">50kN
</div>
</div>
<div class="column_100">
<div class="border_top_1px column_65">作动器最大行程 Actuator Max. stroke</div>
<div class="border_top_1px column_35">±150 mm
</div>
</div>
<div class="column_100">
<div class="border_top_1px column_65">作动器最大速度 Actuator Max. Velocity
</div>
<div class="border_top_1px column_35">3.0 m/s
</div>
</div>
<div class="column_100">
<div class="border_top_1px column_65">轮盘最大加速度 Max Acceleration
</div>
<div class="border_top_1px column_35">21g
</div>
</div>
</div>
`,
`
<div class="equipments_table height_99">
<div class="column_100">
<div class="border_top_1px column_35">名称 name</div>
<div class="border_top_1px column_65">基本参数 specifications</div>
</div>
<div class="column_100">
<div class="border_top_1px column_35">环境舱尺寸（内部尺寸）<br> Environmental chamber Inside Demension</div>
<div class="border_top_1px column_65">8m×6m×5m
</div>
</div>
<div class="column_100">
<div class="border_top_1px column_35">温度工作范围<br> Temperature working range
</div>
<div class="border_top_1px column_65">40 ℃～ +80 ℃<br> （不带日照系统Excluding IR simulation）</div>
</div>
<div class="column_100">
<div class="border_top_1px column_35">湿度范围 <br> Humidity range
</div>
<div class="border_top_1px column_65">10 ～ 95 % r.h.
</div>
</div>
<div class="column_100">
<div class="border_top_1px column_35">辐射区域Irradiated area

</div>
<div class="border_top_1px column_65">6m×2.5m

</div>
</div>
</div>
`,
`
<div class="equipments_table height_99">
<div class="column_100">
<div class="border_top_1px column_35">名称 name</div>
<div class="border_top_1px column_65">基本参数 specifications</div>
</div>
<div class="column_100">
<div class="border_top_1px column_35">辐射强度 <br> Irradiation capacity
</div>
<div class="border_top_1px column_65">Max. 1200 W/m² <br> 10% ～100%可调<br> Adjustable between 10% to 100%
</div>
</div>
<div class="column_100">
<div class="border_top_1px column_35">光谱分布 <br> Spectral distribution
</div>
<div class="border_top_1px column_65">VIS：6% (380 – 780 nm)<br> IR-A：46% (780 – 1400 nm) <br>IR-B：44% (1400 – 3000 nm)
</div>
</div>
<div class="column_100">
<div class="border_top_1px column_35">功率 <br> Install load
</div>
<div class="border_top_1px column_65">approx. 75 kVA (顶灯Top lamp)<br> approx. 47 kVA (侧灯Side lamp)

</div>
</div>
</div>
`
];

// 整车
export const coupling = [
`
<p class="indent_2 p_white">24通道轴耦合道路模拟试验机，是应用MTS RPC再现技术，主要是在24通道模拟机上重现试验场车辆轴头六分力传感器测量的Fx、Fy、Fz、Mx、My、Mz的载荷，来评价整车结构耐久性。 </p>
<p class="p_white p_margin">适用标准规范： </p>
<p class="indent_2 p_white"> Q/JLY J7210625A-2016   整车24通道轴耦合道路模拟试验规范          
</p>
<p class="indent_2 p_white"> Q/JLY J7210635A-2016   悬架多轴系统道路模拟试验规范 
</p>
`,
`
<div class="equipments_table height_99">
    <div class="column_100">
        <div class="border_top_1px column_35">名称 name</div>
        <div class="border_top_1px column_65">基本参数 specifications</div>
    </div>
    <div class="column_100">
        <div class="border_top_1px column_35">整车质量full vehicle quality
        </div>
        <div class="border_top_1px column_65">≤3000kg 
        </div>
    </div>
    <div class="column_100">
        <div class="border_top_1px column_35">轴距axle distance
        </div>
        <div class="border_top_1px column_65">1920mm～3420mm 
        </div>
    </div>
    <div class="column_100">
    <div class="border_top_1px column_35">轮距wheel distance
    </div>
    <div class="border_top_1px column_65">1200mm～1800mm 
    </div>
</div>
<div class="column_100">
<div class="border_top_1px column_35">轴头速度<br>Spindle Velocity
</div>
<div class="border_top_1px column_65">
    <div class ="height_50 column_100">
      <div class="column_17 border_top_1px">
        Long
      </div>
      <div class="column_17 border_top_1px">
      Lat
      </div>
      <div class="column_17 border_top_1px">
      Vert
      </div>
      <div class="column_17 border_top_1px">
      Camber
      </div>
      <div class="column_17 border_top_1px">
      Brake
      </div>
      <div class="column_17 border_top_1px">
      Steer
      </div>
    </div>
    <div class ="height_50 column_100">
    <div class="column_17 border_top_1px">
    2.2m/s
    </div>
    <div class="column_17 border_top_1px">
    2.4m/s
    </div>
    <div class="column_17 border_top_1px">
    7.0m/s
    </div>
    <div class="column_17 border_top_1px">
    400°/s
    </div>
    <div class="column_17 border_top_1px">
    700°/s
    </div>
    <div class="column_17 border_top_1px">
    700°/s
    </div>
    </div>
</div>
</div>
<div class="column_100">
<div class="border_top_1px column_35">轴头位移 <br>Spindle Displacement
</div>
<div class="border_top_1px column_65">
<div class ="height_100 column_100">
<div class="column_17 border_top_1px">
392mm
</div>
<div class="column_17 border_top_1px">
258mm
</div>
<div class="column_17 border_top_1px">
380mm
</div>
<div class="column_17 border_top_1px">
32°
</div>
<div class="column_17 border_top_1px">
32°
</div>
<div class="column_17 border_top_1px">
32°
</div>
</div>
</div>
</div>
<div class="column_100">
<div class="border_top_1px column_35">轴头力 Spindle Force
</div>
<div class="border_top_1px column_65">
<div class ="height_100 column_100">
<div class="column_17 border_top_1px">
22 kN
</div>
<div class="column_17 border_top_1px">
20 kN
</div>
<div class="column_17 border_top_1px">
63 kN
</div>
<div class="column_17 border_top_1px">
9.6 kNm
</div>
<div class="column_17 border_top_1px">
4.0 kNm
</div>
<div class="column_17 border_top_1px">
6.9 kNm
</div>
</div> 
</div>
</div>
</div>
`
]


  //六自由度设备介绍
export const shock_htmlStr = [
  `
<p class="indent_2 p_white">六自由度振动台主要验证发动机悬置系统的耐久性能，以及其它车辆子系统耐久性能验证如：前端冷却模块、座椅系统、天窗系统等 </p>
<p class="p_white p_margin">适用标准规范： </p>
<p class="indent_2 p_white"> Q/JLY J7111070B-2018 悬置系统六自由度道路模拟试验规范          
</p>
<p class="indent_2 p_white">  Q/JLY J7210623A-2016 六自由度振动台道路模拟试验规范
</p>
`,`
<div class="equipments_table height_99">
<div class="column_100">
<div class="border_top_1px column_35">名称 name</div>
<div class="border_top_1px column_65">基本参数 specifications</div>
</div>
<div class="column_100">
<div class="border_top_1px column_35">速度 <br>Velocities</div>
<div class="border_top_1px column_65">垂向1.2m/s、横向0.9m/s、纵向1.0m/s<br>
Vertica1.2m/s、Lateral0.9m/s、Longitudinal1.0m/s
</div>
</div>
<div class="column_100">
<div class="border_top_1px column_35">频率<br>Frequency</div>
<div class="border_top_1px column_65">0-80Hz</div>
</div>
<div class="column_100">
<div class="border_top_1px column_35">位移<br>Displacement</div>
<div class="border_top_1px column_65">垂向±140mm、横向   110mm、纵向  125mm<br>Vertical ±140mm、Lateral  110mm、Longitudinal  125mm</div>
</div>
</div>
</div>
`,
`
<div class="equipments_table height_99">
<div class="column_100">
<div class="border_top_1px column_35">名称 name</div>
<div class="border_top_1px column_65">基本参数 specifications</div>
</div>
<div class="column_100">
<div class="border_top_1px column_35">旋转角<br>Rotations</div>
<div class="border_top_1px column_65">滚动 – 绕X轴 8.0 deg、俯仰 – 绕Y轴 7.0 deg、偏航 – 绕Z轴 5.5 deg<br>Roll - (X) axis 8.0 deg、Pitch - (Y) axis 7.0 deg、Yaw- (Z) axis 5.5 deg</div>
</div>
<div class="column_100">
<div class="border_top_1px column_35">台面尺寸 <br>Table Size </div>
<div class="border_top_1px column_65">约为2.2 米 x 2.2米 方台面<br>approximately 2.2 m x 2.2m square</div>
</div>
<div class="column_100">
<div class="border_top_1px column_35">承载范围<br>Payload</div>
<div class="border_top_1px column_65">最大负载    1000千克<br>Max Payload   1000kg</div>
</div>
</div>
`
]

export const oil_htmlStr = [
`
<p class="indent_2 p_white">MTS液压泵站，共有5个独立的HPU油泵组，每组HPU由6个油泵组成。为试验室24通道台架、四立柱等台架设备提供液压油输入输出。</p>
<p class="indent_2 p_white">MTS Echo为每个液压油泵配置了多种高精度传感器和监测算法，可实时对液压泵站中液压油的流量，压强，温度、油水饱和度、清洁度等参数进行监测，并能接收警报和趋势信息，实现智能化油源监控</p>
`,
`
<div class="equipments_table height_99">
<div class="column_100">
<div class="border_top_1px column_35">液压油和循环水温度监测模块</div>
<div class="border_top_1px column_65">监测油源的液压油压力油和回油、进出循环水的温度，提早发现超温报警或故障威胁，避免意外停机及最小化忽然停机造成的损失。
</div>
</div>

<div class="column_100">
<div class="border_top_1px column_35">热交换器水饱和度监测模块
</div>
<div class="border_top_1px column_65">监测热交换器的油水饱和度，避免热交换器可能出现的热交换器的破损。
</div>
</div>

<div class="column_100">
<div class="border_top_1px column_35">液压油清洁度监测模块
</div>
<div class="border_top_1px column_65">监测液压油清洁度等级，避免大的颗粒对液压油源及伺服阀造成损害，另外这些大的颗粒还会刮擦一些柔软金属的表面，进一步加剧油的污染，加速零部件的损害。这些危险因素可能导致马达掉壳、压力不稳及伺服阀不稳。
</div>
</div>



</div>
`,
`
<div class="equipments_table height_99">
<div class="column_100">
<div class="border_top_1px column_35">电源监测模块
</div>
<div class="border_top_1px column_65">监测三相电压、电流和能量消耗，了解油源的工作效率，预警马达的失效。提高对能源的管理。
</div>
</div>

<div class="column_100">
<div class="border_top_1px column_35">蓄能器预充和过滤监测模块
</div>
<div class="border_top_1px column_65">监测管道上的蓄能器预冲，了解哪些蓄能器需要补充氮气，过滤器监测提前识别影响作动缸性能及让零部件失效的潜在风险。
</div>
</div>

<div class="column_100">
<div class="border_top_1px column_35">泄漏监测模块
</div>
<div class="border_top_1px column_65">通过监测软管破裂、阀块或接头泄露等，保护试验室环境的安全，避免液压油灾难性的损失。
</div>
</div>

</div>
`
]

