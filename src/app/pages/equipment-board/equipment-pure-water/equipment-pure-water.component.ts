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
  list = [
    { 
      //原水进水
      type:'round',//圆
      sytle:{//定位
        top: '7%',
        left: '7.35%',
      },
      bcolor:'black',//颜色
      value:'',
    },
    {
      type:'pull',//方
      sytle:{//定位
        top:'27%',
        left:'8%',
      },
      bcolor:'black',//颜色
      value:'高',

    },
    {
      type:'pull',//方
      sytle:{//定位
        top:'34.6%',
        left:'8%',
      },
      bcolor:'black',//颜色
      value:'高',
    },
    {
      type:'round',//圆
      sytle:{//定位
        top:'34.6%',
        left:'13.5%',
      },
      bcolor:'black',//颜色
      value:'',
    },
    {
      type:'pull',//方
      sytle:{//定位
        top:'15.6%',
        left:'18.2%',
      },
      bcolor:'black',//颜色
      value:'冲洗',
    },
    {
      type:'pull',//方
      sytle:{//定位
        top:'15.6%',
        left:'25.2%',
      },
      bcolor:'black',//颜色
      value:'冲洗',
    },
    {
      type:'pull',//方
      sytle:{//定位
        top:'3.6%',
        left:'32%',
      },
      bcolor:'black',//颜色
      value:'冲洗',
    },
    {
      type:'pull',//方
      sytle:{//定位
        top:'25.5%',
        left:'32%',
      },
      bcolor:'black',//颜色
      value:'冲洗',
    },
    {
      type:'round',//圆
      sytle:{//定位
        top:'27%',
        left:'46.75%',
      },
      bcolor:'black',//颜色
      value:'',
    },
    {
      type:'round',//圆
      sytle:{//定位
        top:'46%',
        left:'59.5%',
      },
      bcolor:'black',//颜色
      value:'',
    },
    {
      type:'pull',//方
      sytle:{//定位
        top:'35%',
        left:'72.5%',
      },
      bcolor:'black',//颜色
      value:'低',
    },
    {
      type:'round',//圆
      sytle:{//定位
        top:'44%',
        left:'74.75%',
      },
      bcolor:'black',//颜色
      value:'',
    },
    {
      type:'round',//圆
      sytle:{//定位
        top:'29%',
        left:'80.3%',
      },
      bcolor:'black',//颜色
      value:'',
    },
    {
      type:'round',//圆
      sytle:{//定位
        top:'32%',
        left:'84%',
      },
      bcolor:'black',//颜色
      value:'',
    },
    {
      type:'pull',//方
      sytle:{//定位
        top:'78%',
        left:'9.7%',
      },
      bcolor:'black',//颜色
      value:'低',
    },
    {
      type:'pull',//方
      sytle:{//定位
        top:'89%',
        left:'9.7%',
      },
      bcolor:'black',//颜色
      value:'低',
    },
    {
      type:'round',//圆
      sytle:{//定位
        top:'88.6%',
        left:'19%',
      },
      bcolor:'black',//颜色
      value:'',
    },
    {
      type:'round',//圆
      sytle:{//定位
        top:'61.6%',
        left:'40%',
      },
      bcolor:'black',//颜色
      value:'',
    },
    {
      type:'round',//圆
      sytle:{//定位
        top:'72.6%',
        left:'40%',
      },
      bcolor:'black',//颜色
      value:'',
    },
    {
      type:'round',//圆
      sytle:{//定位
        top:'86.6%',
        left:'43%',
      },
      bcolor:'black',//颜色
      value:'',
    },
    {
      type:'pull',//方
      sytle:{//定位
        top:'81%',
        left:'59.6%',
      },
      bcolor:'black',//颜色
      value:'低',
    },
    {
      type:'pull',//方
      sytle:{//定位
        top:'90%',
        left:'59.6%',
      },
      bcolor:'black',//颜色
      value:'低',
    },
    {
      type:'round',//圆
      sytle:{//定位
        top:'81%',
        left:'66.75%',
      },
      bcolor:'black',//颜色
      value:'',
    },
  ]

  @ViewChild('round')round:TemplateRef<any>;
  @ViewChild('pull')pull:TemplateRef<any>;
  status = ' 自动运行';

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
    let color = [
      'red','green','yellow','black'
    ]
    this.timer = setInterval(f=>{
      this.ngzone.runOutsideAngular(()=>{
        this.list.forEach(f=>{
          f.bcolor = color[parseInt((Math.random()*4).toString())];
        })
      })
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
    this.timer = setInterval(()=>{
      // this.getdata();
    },1000)
  }

  getdata(){
    let res,time,data:any = {};
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
      

      this.list[0].bcolor = ''
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
  'freq_converter_error',//变频器故障
  'raw_water_overload',//原水泵过载
  'l1_h_pump_overload',//一级高压泵过载
  'l2_h_pump_overload',//二级高压泵过载
  'edi_booster_pump_overload',//EDI增压泵过载
  'edi_power_on_signal',//EDI上电信号
  'edi_concentrate_flow_alarm_signal',//EDI浓水流量报警信号
  'edi_product_water_flow_alarm_signal',//EDI产水流量报警信号
  'leak_detection',//漏水检测
  'raw_water_pump_running',//原水泵运行指示
  'l1_h_pump_running',//一级高压泵运行指示
  'l2_h_pump_running',//二级高压泵运行指示
  'edi_booster_pump_running',//EDI增压泵运行指示
];
