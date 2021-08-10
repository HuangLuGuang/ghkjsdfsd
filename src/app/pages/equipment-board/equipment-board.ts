// 引入jquery
declare var $:any;


//库
export let library = 'eim_plv8.';

//温湿度deviceid 目前没有数据统一传 到时候有数据了改成null
// export const t_h_deviceid = 'device_temperature';
export const t_h_deviceid = null;



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
  let dom = document.getElementById('img');
  if(!dom)return;
  dom = null;
  let center_img = $('.center_img');
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
export const DEVICEID_TO_NAME  ={
  'device_mts_02':'整车耦合',//整车耦合
  'device_mts_01':'四立柱',//四立柱道路模拟试验台
  'device_mts_03':'六自由度',//六自由度振动台
  "device_mts_04":'液压伺服',//液压伺服
  'device_hpu_01':'油源1',//油源1
  'device_hpu_02':'油源2',//油源2
  'device_hpu_03':'油源3',//油源3
  'device_hpu_04':'油源4',//油源4
  'device_hpu_05':'油源5',//油源5
  'device_skylight_01':'天窗开闭',//天窗开闭
  'device_skylight_02':'玻璃升降',//玻璃升降
  'device_4d2c_05':'四门两盖01',//四门两盖01
  'device_4d2c_01':'四门两盖02',//四门两盖02
  'device_4d2c_02':'四门两盖03',//四门两盖03
  'device_4d2c_06':'四门两盖04',//四门两盖04
  'device_4d2c_07':'四门两盖05',//四门两盖05

  'device_avldyno_01':'AVL耐久2驱-1',//AVL耐久2驱-S1060
  'device_avldyno_02':'AVL耐久2驱-2',//AVL耐久2驱-S1060`
  'device_avl4dyno_01':'AVL耐久4驱-3',//
  'device_avldyno_03':'AVL排放2驱S1070',//AVL排放2驱-S1070
  'device_avl4dyno_02':'AVL环模4驱S1070',//AVL环模4驱-S1070
  'device_avl2dyno_01':'AVL排放2驱S1074',//AVL排放2驱-S1074
  'device_avl4dyno_03':'AVL排放4驱S1074',//AVL排放4驱-S1074
  'device_jinhua_cabin02':'锦华常温浸车舱',//锦华常温浸车舱
  'device_atec_03':'整车高低温试验舱',//整车高低温试验舱

  'device_avlmotor_01':'AVL电机8',//AVL电机8
  'device_avlmotor_02':'AVL电机6',//AVL电机6
  'device_avlmotor_03':'AVL电机3',//AVL电机3
  "device_avlmotor_04":'AVL电机7',//AVL电机7
  'device_boyang_01':'博阳电机5',//博阳电机5
  'device_boyang_02':'博阳电机4',//博阳电机4
  'device_andmotor_01':'鲁交电机1',//鲁交电机1

  'device_auto_voc01':'整车voc',//整车voc环境仓
  'device_atlas_4000':'氙灯Ci4000',//氙灯集中监控Ci4000
  'device_atlas_4400':'氙灯Ci4400',//氙灯集中监控Ci4400
  'device_purewater_01':'纯水',//纯水
  'device_cabin_voc01':'昇微',//
  'device_4m3_01':'4m3',
  'device_atec_06':'ATEC舱06',//
  'device_o3_01':'臭氧老化试验箱',//TODO
  'device_tc220_01':'TC220型延误循环腐蚀箱',//


  'device_cts_01':'CTS',//CTS-声学高低温环境舱
  'device_auto_bsr01':'整车异响',//MTS整车异响试验系统
  'device_maha_dyno01':'MAHA转鼓',//MAHA转鼓


}

export const colors = [
  '#FFFF00',//黄
  'green',//绿
  '#FF66CC',//粉
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
    'rgba(5,116,232,1)',


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
export let  painting_time =(f,time,isthis,arr)=>{
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
      time == 1?(x[key] = [],x[key].push(dateformat(new Date(rTime(arr[0][1])),'hh:mm:ss')))
      :x[key] =  arr.map(m =>( dateformat(new Date(rTime(m[1])),'hh:mm:ss')));
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
      // if(time == 1 && el.value.length > 200)
      //     el.value.splice(0,1);
    })
     //判断当前的x轴数组的值是否大于10 减去过长会导致显示拥挤
    //  if(time == 1 && isthis[`attrs_${i+1}`].xData.length > 200 )
    //   isthis[`attrs_${i+1}`].xData.splice(0,1);

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

