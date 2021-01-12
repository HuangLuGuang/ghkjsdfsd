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


export const  getMessage=(f,data)=>{
    let arr:any = [];
    var aee = [];
    var i = 0;
    f.result.message[0].message.forEach(m => {
      aee = m.message.split("\"");
      i = aee.findIndex(f => f && f !=' ');
      arr = [
          m.recordtime,
          m.level==3?'Error':m.level == 1?'Warning':'Information',
          m.message,
          // aee[aee.length-1].length > aee[aee.length-2].length?aee[aee.length-1]:aee[aee.length-2],
          m.level,
        ]
      if(!data.find(g => g[0] == arr[0] && g[1] == arr[1] && g[2] == arr[2])){
        data.push(
          arr
        )
      }
    });
    //锁定滚动条最下面
    var showContent = $(".overflow_height_75");
    if(showContent[0])showContent[0].scrollTop = showContent[0].scrollHeight;
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


export const list_jion =(list,name,isthis)=>{
  list.forEach((f,i)=>{
    isthis[name][f].forEach(element => {
      element.value.push(parseInt((Math.random()*100).toString()))
      if(element.value.length > 10)element.value.splice(0,1)
    });
  })
}
export const list_copy=(list,name,isthis)=>{
  list.forEach((f,i)=>{
    isthis[name][f] = JSON.parse(JSON.stringify(isthis.attrs));
  })
}
export const list_copy_new = (list,attr,name,isthis)=>{
  list.forEach(element => {
    isthis[name][element] = copy(attr);
  });
  isthis[name].xData = [];
}

export const list_jion_new = (list,name,isthis)=>{
  list.forEach((f,i)=>{
    isthis[name][f].forEach(element => {
      element.value.push(parseInt((Math.random()*100).toString()));
      if(element.value.length > 10)element.value.splice(0,1)
    });
  });
  isthis[name].xData.push(dateformat(new Date(),'mm:ss'));
  if(isthis[name].xData.length>10)isthis[name].xData.splice(0,1)
}

export const create_third_chart_line=(rtm3a,isthis)=>{
  if(!document.getElementById('third_second'))return;
  if(echarts.init(document.getElementById('third_second')).getOption()){
    echarts.init(document.getElementById('third_second')).resize();
    return;
  }
  var yearPlanData=[],yearOrderData = [],differenceData = [],visibityData = [],xAxisData = [];
  // for (var i = 0; i < 12; i++) {
  //   yearPlanData.push(Math.round(Math.random() * 900) + 100);//温度
  //   yearOrderData.push(Math.round(Math.random() * yearPlanData[i]));//湿度
  //   differenceData.push(yearPlanData[i] - yearOrderData[i]);
  //   visibityData.push(yearOrderData[i]);
  //   xAxisData.push((i + 1).toString() + "月");
  // }
  
  // data.tempreal.forEach(element => {
  //   xAxisData.push(element[1]);//x轴时间
  //   yearPlanData.push();
  //   yearOrderData.push();
  // });
  rtm3a.create_third_chart_line({
    yearPlanData:yearPlanData,
    yearOrderData:yearOrderData,
    differenceData:differenceData,
    visibityData:visibityData,
    xAxisData:xAxisData,
    title:isthis.language?'MonthlyChartOfTemperatureAndHumidity':'温湿度月度图线'
  }, 'third_second');
}

//液压伺服设备介绍
export const hydraulic_htmlstr = [
  '',''
//   `
//   2.使用标准\规范 <br>
//   &emsp;Q/JLY J7110489B-2016  乘用车前、后副车架总成技术条件 <br>
//   &emsp;Q/JLY J7110439D-2016 J05204 悬架摆臂总成类技术条件 <br>
//   &emsp;Q/JLY J7110490B-2016 J05204 后桥总成（扭力梁）技术条件<br>
//   &emsp;Q/JLY J7110371C-2016 J05204 前、后稳定杆总成技术条件等<br>
//   `,
  
//   `
//   <div class="equipments_table_title" style="padding-right: 10px">3.设备构成及参数</div>
//   <div class="equipments_table">
  
//   <div  class="column_20 border_1px">
//     <div>名称</div>
//     <div class="border_top_1px">MTS直线缸</div>
//   </div>
//   <div  class="column_42 border_1px">
//     <div>基本参数</div>
//     <div class="border_top_1px">载荷：±25kN；位移：±125mm</div>
//     <div class="border_top_1px">载荷：±50kN；位移：±125mm</div>
//   </div>
//   <div  class="column_20 border_1px">
//     <div>数量</div>
//     <div class="border_top_1px">4</div>
//     <div class="border_top_1px">2</div>
//   </div>
// </div>`
]

  //四立柱设备介绍
export const  four_road_htmlstr = [
  '',''
//   `
//   1、使用标准\规范<br>
//   &emsp;Q/JLY J7210680A-2017<br>
//   &emsp;带环境条件的四立柱耐久试验规范<br>
//   &emsp;Q/JLY J7210624A-2016<br>
//   &emsp;整车四通道轮耦合道路模拟试验规范<br>
// `,

// ` <div class="equipments_table height_99">
//   <div class="column_65 border_1px">
//     <div class="border_top_1px height_10">名称 name</div>
//     <div class="border_top_1px height_11">最大整车重量 Max.GVW	Up to</div>
//     <div class="border_top_1px height_11">轴距 Wheel base</div>
//     <div class="border_top_1px height_11">轮距 Track width</div>
//     <div class="border_top_1px height_11">轮胎宽度 Tire width</div>
//     <div class="border_top_1px height_11">作动器最大承载
//          Actuator Max. Forc</div>
//     <div class="border_top_1px height_11">作动器最大行程
//           Actuator Max. stroke</div>
//     <div class="border_top_1px height_11">作动器最大速度
//          Actuator Max. Velocity</div>
//     <div class="border_top_1px height_11">轮盘最大加速度
//          Max Acceleration</div>
//   </div>
//   <div class="column_35 border_1px">
//     <div class="border_top_1px height_10">基本参数 specifications</div>
//     <div class="border_top_1px height_11">3500kg</div>
//     <div class="border_top_1px height_11">2m-3.5m</div>
//     <div class="border_top_1px height_11">1.2m-1.8m</div>
//     <div class="border_top_1px height_11">13 to 20 inches</div>
//     <div class="border_top_1px height_11">50kN</div>
//     <div class="border_top_1px height_11">±150 mm</div>
//     <div class="border_top_1px height_11">3.0  m/s </div>
//     <div class="border_top_1px height_11">21g</div>
//   </div>
// </div>
// `,
];


  //六自由度设备介绍
export const shock_htmlStr = [
  '',''
//   `
//   1.使用标准\规范<br>
//   &emsp;Q/JLY J7111070B-2018<br>
//   &emsp;悬置系统六自由度道路模拟试验规范<br>
//   &emsp;Q/JLY J7210623A-2016<br>
//   &emsp;六自由度振动台道路模拟试验规范 <br>
//   `,
//   `
//   <div class="equipments_table height_99">
//   <div class="column_31 border_1px">
//     <div class="border_top_1px height_10">名称 name</div>
//     <div class="border_top_1px height_29">速度 
//     Velocities</div>
//     <div class="border_top_1px height_30">频率
//     Frequency
//     </div>
//     <div class="border_top_1px height_30">位移Displacement </div>
//   </div>
//   <div class="column_69 border_1px">
//     <div  class="border_top_1px height_10">基本参数  Specifications
//     </div>
//     <div class="border_top_1px height_29">垂向1.2m/s、横向0.9m/s、纵向1.0m/s
//     Vertica1.2m/s、Lateral0.9m/s、Longitudinal1.0m/s
//     </div>
//     <div class="border_top_1px height_30">0-80Hz
//     </div>
//     <div class="border_top_1px height_30">垂向±140mm、横向   110mm、纵向  125mm
//     Vertical ±140mm、Lateral  110mm、Longitudinal  125mm
//     </div>
//   </div>
// </div>
// `,`
// <div class="equipments_table height_99">
// <div class="column_31 border_1px">
//   <div class="border_top_1px height_10">名称 name</div>
//   <div class="border_top_1px height_44">旋转角
//   Rotations</div>
//   <div class="border_top_1px height_26">台面尺寸 
//   Table Size 
//   </div>
//   <div class="border_top_1px height_20">承载范围Payload
//   </div>
// </div>
// <div class="column_69 border_1px">
//   <div  class="border_top_1px height_10">基本参数  Specifications
//   </div>
//   <div class="border_top_1px height_44">滚动 – 绕X轴 8.0 deg、俯仰 – 绕Y轴 7.0 deg、偏航 – 绕Z轴 5.5 deg
//   Roll - (X) axis 8.0 deg、Pitch - (Y) axis 7.0 deg、Yaw- (Z) axis 5.5 deg
//   </div>
//   <div class="border_top_1px height_26">约为2.2 米 x 2.2米 方台面
//   approximately 2.2 m x 2.2m square
//   </div>
//   <div class="border_top_1px height_20">最大负载    1000千克
//   Max Payload   1000kg
//   </div>
// </div>
// </div>
// `
]

//echarts表格生成后调用
export const resize=(id)=>{
  // let el_one = document.getElementById(id);
  // let el = document.getElementById(id).getElementsByTagName('div')[0];
  // el.style.width = el_one.clientWidth+'px';
  // el.style.height = el_one.clientHeight+'px';
  // for(let i = 0;i<el.getElementsByTagName('canvas').length;i++){
  //   el.getElementsByTagName('canvas')[i].style.width = el_one.clientWidth+'px';
  //   el.getElementsByTagName('canvas')[i].style.height = el_one.clientHeight+'px';
  // }
}