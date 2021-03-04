import { Component, NgZone, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpserviceService } from '../../../services/http/httpservice.service';
import { library } from '../equipment-board';
import { EquipmentBoardService } from '../serivice/equipment-board.service';

/**
 * 顺水系统
 */
@Component({
  selector: 'ngx-equipment-pure-water',
  templateUrl: './equipment-pure-water.component.html',
  styleUrls: ['./equipment-pure-water.component.scss']
})
export class EquipmentPureWaterComponent implements OnInit {
  object = Object;
  list = {
    //原水开关
    ysjs:{ 
      //原水进水
      type:'round',//圆
      sytle:{//定位
        top: '7%',
        left: '7.35%',
      },
      bcolor:'black',//颜色
      value:'',
    },
    //原水高位
    ysh:{
      type:'pull',//方
      sytle:{//定位
        top:'27%',
        left:'8%',
      },
      bcolor:'black',//颜色
      value:'高',

    },
    //原水高位
    ysl:{
      type:'pull',//方
      sytle:{//定位
        top:'34.6%',
        left:'8%',
      },
      bcolor:'black',//颜色
      value:'低',
    },
    //原水泵
    ysb:{
      type:'round',//圆
      sytle:{//定位
        top:'34.6%',
        left:'13.5%',
      },
      bcolor:'black',//颜色
      value:'',
    },
    //机械过滤器
    jxglq:{
      type:'pull',//方
      sytle:{//定位
        top:'15.6%',
        left:'18.2%',
      },
      bcolor:'black',//颜色
      value:'冲洗',
    },
    //活性炭过滤器
    hxtglq:{
      type:'pull',//方
      sytle:{//定位
        top:'15.6%',
        left:'25.2%',
      },
      bcolor:'black',//颜色
      value:'冲洗',
    },
    // 1#软化过滤器
    rhglq_1:{
      type:'pull',//方
      sytle:{//定位
        top:'3.6%',
        left:'32%',
      },
      bcolor:'black',//颜色
      value:'冲洗',
    },
    // 2#软化过滤器
    rhglq_2:{
      type:'pull',//方
      sytle:{//定位
        top:'25.5%',
        left:'32%',
      },
      bcolor:'black',//颜色
      value:'冲洗',
    },
    // 1级高压泵
    gyb_1:{
      type:'round',//圆
      sytle:{//定位
        top:'27%',
        left:'46.75%',
      },
      bcolor:'black',//颜色
      value:'',
    },
    //ro冲洗阀
    rocxf:{
      type:'round',//圆
      sytle:{//定位
        top:'46%',
        left:'59.5%',
      },
      bcolor:'black',//颜色
      value:'',
    },
    // ph加药低
    ph_l:{
      type:'pull',//方
      sytle:{//定位
        top:'35%',
        left:'72.5%',
      },
      bcolor:'black',//颜色
      value:'低',
    },
    // ph加药泵
    phjyb:{
      type:'round',//圆
      sytle:{//定位
        top:'44%',
        left:'74.75%',
      },
      bcolor:'black',//颜色
      value:'',
    },
    // 二级高压泵 左
    gyb_2_left:{
      type:'round',//圆
      sytle:{//定位
        top:'29%',
        left:'80.3%',
      },
      bcolor:'black',//颜色
      value:'',
    },
    // 二级高压泵右
    gyb_2_right:{
      type:'round',//圆
      sytle:{//定位
        top:'32%',
        left:'84%',
      },
      bcolor:'black',//颜色
      value:'',
    },
    // ro二级水箱高
    ro_2_h:{
      type:'pull',//方
      sytle:{//定位
        top:'78%',
        left:'9.7%',
      },
      bcolor:'black',//颜色
      value:'高',
    },
    // ro二级水箱低
    ro_2_l:{
      type:'pull',//方
      sytle:{//定位
        top:'89%',
        left:'9.7%',
      },
      bcolor:'black',//颜色
      value:'低',
    },
    // edi增压泵
    edizyb:{
      type:'round',//圆
      sytle:{//定位
        top:'88.6%',
        left:'19%',
      },
      bcolor:'black',//颜色
      value:'',
    },
    // edi产水流量
    edicsll:{
      type:'round',//圆
      sytle:{//定位
        top:'61.6%',
        left:'40%',
      },
      bcolor:'black',//颜色
      value:'',
    },
    // edi浓水流量
    edinsll:{
      type:'round',//圆
      sytle:{//定位
        top:'72.6%',
        left:'40%',
      },
      bcolor:'black',//颜色
      value:'',
    },
    // edi电信号
    edidxh:{
      type:'round',//圆
      sytle:{//定位
        top:'86.6%',
        left:'43%',
      },
      bcolor:'black',//颜色
      value:'',
    },
    // 超纯水箱高
    ccsx_h:{
      type:'pull',//方
      sytle:{//定位
        top:'81%',
        left:'59.6%',
      },
      bcolor:'black',//颜色
      value:'高',
    },
    // 超纯水箱高
    ccsx_l:{
      type:'pull',//方
      sytle:{//定位
        top:'90%',
        left:'59.6%',
      },
      bcolor:'black',//颜色
      value:'低',
    },
    //输送泵 
    ssb:{
      type:'round',//圆
      sytle:{//定位
        top:'81%',
        left:'66.75%',
      },
      bcolor:'black',//颜色
      value:'',
    }
  };
    

  @ViewChild('round')round:TemplateRef<any>;
  @ViewChild('pull')pull:TemplateRef<any>;
  status = '无';
  error_str = '';

  device = 'device_purewater_01';
  viewstatus = false;
  timer;

  sublist:any = {};
  constructor(
    private ngzone:NgZone,
    private boardservice:EquipmentBoardService,
    private activate:ActivatedRoute,
    private http:HttpserviceService) { }

  ngOnInit(): void {
    this.timer = setInterval(f=>{
      this.getdata();
      
    },1000)
    this.sublist.roule = this.activate.params.subscribe(f=>{
      if(document.getElementById('head_title'))
        document.getElementById('head_title').innerText = f.title;
    })
  }

  ngAfterViewInit(){
    this.boardservice.sendLoad({close:false});
    setTimeout(() => {
      this.viewstatus = true;
    }, 100);
  }

  getdata(){
    let res,data:any = {},error_str = '';
    this.sublist._4400 = this.http.callRPC('get_device_mts_realtimedata',library+'get_device_mts_realtimedata',
    {"device":this.device,arr:wather.join(',')}).subscribe((g:any)=>{
      if(g.result.error || g.result.message[0].code == 0)return;
      res = g.result.message[0].message;
      if(res)
        res.forEach(el => {
          for(let key in el){
            data[key] = el[key][0][0];
          }
        });
        
      switch(1){
        case data.emergency_stop:
          this.status = '急停';
          this.list.ysjs.bcolor = 'black';
          break;
        case data.manual:
          this.status = '手动运行';
          this.list.ysjs.bcolor = 'green';
          break;
        case data.auto:
          this.status = '自动运行';
          this.list.ysjs.bcolor = 'green';
          break;
        default:
          this.status = '无';
          this.list.ysjs.bcolor = 'black';
      };
      //原水箱高液位
      this.list.ysh.bcolor = data.raw_water_tank_h?'green':'black';
      //原水箱低液位
      this.list.ysl.bcolor = data.raw_water_tank_l?'green':'black';
      //原水泵
      this.list.ysb.bcolor = data.raw_water_pump?'green':'black';
      // 机械过滤器冲洗信号
      this.list.jxglq.bcolor = data.mech_filter_flush_signal?'green':'black';
      // 活性炭过滤器冲洗信号
      this.list.hxtglq.bcolor = data.c_filter_flush_signal?'green':'black';
      // 软化1
      this.list.rhglq_1.bcolor = data.n1_softening_filter_flush_signal?'green':'black';
      // 软化2
      this.list.rhglq_2.bcolor = data.n2_softening_filter_flush_signal?'green':'black';

      //一级高压泵
      this.list.gyb_1.bcolor = data.l1_high_pressure_pump?'green':'black';
      // ro冲洗阀
      this.list.rocxf.bcolor = data.ro_flush?'green':'black';
      //ph加药
      this.list.ph_l.bcolor = data.ph_potion_tank_l?'green':'black';
      // ph加药泵
      this.list.phjyb.bcolor = data.ph_dosing_pump?'green':'black';

      //二级高压泵负载
      this.list.gyb_2_left.bcolor = data.l2_h_pump_overload?'red':'black';
      //二级高压泵
      this.list.gyb_2_right.bcolor = data.l2_high_pressure_pump?'green':'black';

      //二级RO水箱高液位  
      this.list.ro_2_h.bcolor = data.l2_ro_water_tank_h?'green':'black';
      //二级RO水箱低液位  
      this.list.ro_2_l.bcolor = data.l2_ro_water_tank_l?'green':'black';

      //edi增压泵
      this.list.edizyb.bcolor = data.edi_booster_pump?'green':'black';

      //edi产水
      this.list.edicsll.bcolor = data.edi_product_water_flow_alarm_signal?'red':'black';
      //edi浓水
      this.list.edinsll.bcolor = data.edi_concentrate_flow_alarm_signal?'red':'black';
      //edi电信号
      this.list.edidxh.bcolor = data.edi_power_on_signal?'green':'black';
      // 超纯水箱高
      this.list.ccsx_h.bcolor = data.ultra_pure_water_tank_h?'green':'black';
      // 超纯水箱低
      this.list.ccsx_l.bcolor = data.ultra_pure_water_tank_l?'green':'black';

      // TODO 输送泵 
      this.list.ssb.bcolor = 'rgba(1,1,1,0)';

      error_str = '';

    if(data.water_leak_alarm)error_str+='漏水报警,';
    if(data.raw_water_overload)error_str+='原水泵过载,';
    if(data.freq_converter_error)error_str+='变频器故障,';
    if(data.l1_h_pump_overload)error_str+='一级高压泵过载,';
    if(data.l2_h_pump_overload)error_str+='二级高压泵过载,';
    if(data.edi_concentrate_flow_alarm_signal)error_str+='EDI浓水流量报警,';
    if(data.edi_product_water_flow_alarm_signal)error_str+='EDI产水流量报警,';
    if(data.freq_converter_error_reset)error_str+='变频器故障复位,';
    if(data.error_alarm)error_str+='故障报警,';

    if(error_str){
      this.error_str = error_str.slice(0,error_str.length-2)
    }else{
      this.error_str = ''
    }
    //   'water_leak_alarm',//漏水报警
    // 'raw_water_overload',//原水泵过载
    // 'freq_converter_error',//变频器故障
    // 'l1_h_pump_overload',//一级高压泵过载
    // 'l2_h_pump_overload',//二级高压泵过载
    // 'edi_concentrate_flow_alarm_signal',//EDI浓水流量报警信号
    // 'edi_product_water_flow_alarm_signal',//EDI产水流量报警信号
    // 'freq_converter_error_reset',//变频器故障复位
    // 'error_alarm',//故障报警
      
      // this.status = data.emergency_stop == 1?'':'';
    });
  }

  setTemp(type){
    //判断view是否初始化完成  没完成钱返回undefined 不然angular监测机制会报错
    return this.viewstatus?this[type]:undefined;
  }

   //组件销毁
   ngOnDestroy(){
     for(let key in this.sublist){
      this.sublist[key].unsubscribe();
     }
    clearInterval(this.timer)
  }

}

export let wather = [
  'emergency_stop',//急停
  'manual',//手动
  'auto',//自动
  'raw_water_tank_l',//原水箱低液位
  'raw_water_tank_m',//原水箱中液位
  'raw_water_tank_h',//原水箱高液位
  'l2_ro_water_tank_l',//二级RO水箱低液位
  'l2_ro_water_tank_m',//二级RO水箱中液位
  'l2_ro_water_tank_h',//二级RO水箱高液位
  'ultra_pure_water_tank_l',//超纯水箱低液位
  'ultra_pure_water_tank_m',//超纯水箱中液位
  'ultra_pure_water_tank_h',//超纯水箱高液位
  'ph_potion_tank_l',//PH药箱低液位
  'mech_filter_flush_signal',//机械过滤器冲洗信号
  'c_filter_flush_signal',//活性炭过滤器冲洗信号
  'n1_softening_filter_flush_signal',//一号软化过滤器冲洗信号
  'n2_softening_filter_flush_signal',//二号软化过滤器冲洗信号
  'l1_l_voltage_switch',//一级低压开关
  'l2_l_voltage_switch',//二级低压开关
  'edi_h_voltage_switch',//EDI高压开关

  'edi_booster_pump_overload',//EDI增压泵过载
  'edi_power_on_signal',//EDI上电信号
 
  'leak_detection',//漏水检测
  'raw_water_pump_running',//原水泵运行指示
  'l1_h_pump_running',//一级高压泵运行指示
  'l2_h_pump_running',//二级高压泵运行指示
  'edi_booster_pump_running',//EDI增压泵运行指示
  'ph_dosing_pump',//ph加药泵
  'ro_flush',//冲洗阀

  'l1_high_pressure_pump',//一级高压泵
  'l2_high_pressure_pump',//二级高压泵

  'water_leak_alarm',//漏水报警
  'raw_water_overload',//原水泵过载
  'freq_converter_error',//变频器故障
  'l1_h_pump_overload',//一级高压泵过载
  'l2_h_pump_overload',//二级高压泵过载
  'edi_concentrate_flow_alarm_signal',//EDI浓水流量报警信号
  'edi_product_water_flow_alarm_signal',//EDI产水流量报警信号
  'freq_converter_error_reset',//变频器故障复位
  'error_alarm',//故障报警
];
