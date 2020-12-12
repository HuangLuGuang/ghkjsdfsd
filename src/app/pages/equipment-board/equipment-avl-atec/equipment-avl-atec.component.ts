import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { LayoutService } from '../../../@core/utils/layout.service';
import { colors, rgb_del_red,list_jion,list_copy, colorRgb, create_img_16_9 } from '../equipment-board';

let equipment_four_road = require('../../../../assets/eimdoard/equipment/js/equipment-four-road');

@Component({
  selector: 'ngx-equipment-avl-atec',
  templateUrl: './equipment-avl-atec.component.html',
  styleUrls: ['./equipment-avl-atec.component.scss']
})
export class EquipmentAvlAtecComponent implements OnInit {
  attrs = [{ 
    name: "参数1",nameEn :'param1', unit: "V",value: [],show:true
    ,color:["#ff2400", "#e47833"]
  },{ 
      name: "参数2",nameEn :'param2', unit: "V",value: [],show:true,
      color:["#ff00ff", "#ff00ff"]
  },{ 
      name: "参数3",nameEn :'param3', unit: "V",value: [],show:true,
      color:["#d9d919", "#d9d919"]
  },{ 
    name: "参数4",nameEn :'param4', unit: "V",value: [],show:true,
    color:["#d9d919", "#d9d919"]
},{ 
  name: "参数5",nameEn :'param5', unit: "V",value: [],show:true,
  color:["#d9d919", "#d9d919"]
},{ 
  name: "参数6",nameEn :'param6', unit: "V",value: [],show:true,
  color:["#d9d919", "#d9d919"]
}]
  xData = [];

  attrs_1 = {};
  attrs_2 = [];
  attrs_3 = [];

 


  dischargeList = [
    [
      {value:'12',name:'CxHy',unit:'ppm'},
      {value:'2.3',name:'CH4',unit:'ppm'},
      {value:'12',name:'NOx',unit:'ppm'},
      {value:'2.3',name:'CO2',unit:'ppm'},
      {value:'12',name:'CO',unit:'ppm'},
      {value:'2.3',name:'YHYD',unit:'ppm'},
    ],
    [
      {value:'12',name:'CxHy',unit:'ppm'},
      {value:'2.3',name:'CH4',unit:'ppm'},
      {value:'12',name:'NOx',unit:'ppm'},
      {value:'2.3',name:'CO2',unit:'ppm'},
      {value:'12',name:'CO',unit:'ppm'},
    ]

  ]


  avl_paramlist = [
    {value:'12',name:'drumDragCoeff_F0D',unit:'N'},
    {value:'12',name:'drumDragCoeff_F1D',unit:'N/km/h'},
    {value:'12',name:'drumDragCoeff_F2D',unit:'N/(km/h)^2'},
  ]


  gauge =[
    {
      id:'gauge_1',
      dataLine:{
        value:50,name:'轮速力',max:100,color:[
        [0.4, '#203add'],
        [1, '#0d1758']],unit:'N'
      }
    },{
      id:'gauge_2',
      dataLine:{
        value:12,name:'速度',max:100,color:[
        [0.4, '#203add'],
        [1, '#0d1758']],unit:'km/h'
      }
    },{
      id:'gauge_3',
      dataLine:{
        value:12,name:'加速度',max:100,color:[
        [0.4, '#203add'],
        [1, '#0d1758']],unit:'m/s^2'
      }
    },{
      id:'gauge_4',
      dataLine:{
        value:12,name:'功率',max:100,color:[
        [0.4, '#203add'],
        [1, '#0d1758']],unit:'Kw'
      }
    }
    ,{
      id:'real_temperature_4',
      dataLine:{
        value:12,name:'实时温度',max:100,color:[
        [0.4, '#203add'],
        [1, '#0d1758']],unit:'℃'
      }
    }
    ,{
      id:'real_temperature_5',
      dataLine:{
        value:12,name:'实时湿度',max:100,color:[
        [0.4, '#203add'],
        [1, '#0d1758']],unit:'%RH'
      }
    }
    ,{
      id:'real_temperature_6',
      dataLine:{
        value:12,name:'微压差',max:100,color:[
        [0.4, '#203add'],
        [1, '#0d1758']],unit:'Pa'
      }
    }
  ]; 

  mileage = [
    {value:'12',name:'mileage1',unit:'km'},
    {value:'12',name:'mileage2',unit:'km'},
    {value:'12',name:'mileage3',unit:'km'},
    {value:'12',name:'mileage4',unit:'km'},
  ]

  img = {
    url:'assets/eimdoard/equipment/images/sqdp.png',
    name:''
  }

  @ViewChild('chart_1')chart_1:any;

  deviceid: any;


  timer:any;//定时器
  language = '';//语言 空为zh-CN中文
  subscribeList:any = {};

  constructor(private layoutService: LayoutService,private activateInfo:ActivatedRoute) { }

  ngOnInit(): void {
    //获取当前语言
    let language = localStorage.getItem('currentLanguage');
    if(language!='zh-CN')this.language = language;
    this.subscribeList.layout = this.layoutService.onInitLayoutSize().subscribe(f=>{
      this.initChart();
      this.deviceid = f.deviceid;
      // if(document){

      // }
      // 'avl_param_chart_1','avl_param_chart_2'
    })

    this.subscribeList.router = this.activateInfo.params.subscribe(f =>{
      console.log(f);
      if(document.getElementById('head_title'))
        document.getElementById('head_title').innerText = f.title;
    })
    let rgb = '';
    this.attrs.forEach((f,i)=>{
      if(i > colors.length-1)
        rgb =  rgb_del_red();
      else
        rgb =  colors[i];
      f.color = [rgb,rgb];
    })


    //赋值
    this.attrs_2 = JSON.parse(JSON.stringify(this.attrs));
    this.attrs_3 = JSON.parse(JSON.stringify(this.attrs));
    this.getData();
    setTimeout(() => {
      this.initChart();
      // this.in();
      create_img_16_9();
    }, 1000);

    window.addEventListener('reszie',this.resize);

  }

  ngAfterViewInit(){
    

  }
  
  resize=()=>{
    
    let obs = new Observable(f=>{
     
      let id = [
        'electric_chart_0', 'electric_chart_1', 'electric_chart_2', 'electric_chart_3',
        'real_temperature_4','real_temperature_5','real_temperature_6',
        'discharge_chart_1',
        'gauge_1','gauge_2','gauge_3','gauge_4','avl_param_chart_1',
        // 'temp_humidity_pressure'
      ];
      id.forEach(f=>{
        if(document.getElementById(f))
          echarts.init(document.getElementById(f)).resize();
      })
      
      f.next('异步执行完成')
    })
    
    obs.subscribe(f=>{
      console.log(f);
     
    })
  }

  getData(){
    // this.http.callRPC('panel_detail','get_device_panel_detail',
    //   {"deviceid":this.deviceid}).subscribe((f:any) =>{

    //   })
    
    let g = 1;
    this.timer = setInterval(() =>{
      this.xData.push(g);
      if(this.xData.length>10)this.xData.splice(0,1);
      g++;

      [2,3].forEach(f=>{
        this[`attrs_${f}`].forEach(m =>{
          m.value.push(parseInt((Math.random()*100).toString()));
          if(m.value.length >10 )m.value.splice(0,1);
        })
      })

      let data = this.attrs.filter(f=> f.show);
      let data_1 = {
          series:[],
          xData: [],
          title:''
      };
      data.forEach(f=>{
          if(f.value.length>10)f.value.splice(0,1)
          f.color.forEach((element,i) => {
              element = colorRgb(element,i == 0?'0.3':0.7) 
          });
          f.value.push((Math.random()*100).toFixed(0))
          data_1.series.push({
              name:f.name,
              color:f.color,
              value:f.value
          });
      })

      data_1.xData = this.xData;
      // data_1.title = '功率曲线';
      // if(document.getElementById('discharge_chart')){
      //   let myChart_8 = echarts.init(document.getElementById('discharge_chart'));;
      //   equipment_four_road.create_broken_line(data_1,myChart_8);
      // }
      data_1.title = '速度/加速度曲线';
      if(document.getElementById('avl_param_chart_1'))equipment_four_road.create_broken_line(data_1,echarts.init(document.getElementById('avl_param_chart_1')));
      // data_1.title = '轮边力曲线';
      // if(document.getElementById('avl_param_chart_2'))equipment_four_road.create_broken_line(data_1,echarts.init(document.getElementById('avl_param_chart_2')));

      data_1.title = '温湿度曲线';
      if(document.getElementById('discharge_chart_1')){
        let myChart_9 = echarts.init(document.getElementById('discharge_chart_1'));;
        equipment_four_road.create_broken_line(data_1,myChart_9);
      }

    },2000)

    
    
  }

  // timer1;

  // in(){
    // this.timer1 = setInterval(f=>{
    //   for
    //   if(!document.getElementById('real_temperature_5'))
    //     equipment_four_road.create_real_disk({value:parseInt((Math.random()*100).toString()),text:this.language?'RealTEMP':'实时温度',unit:'%RH'},
    //     echarts.init(document.getElementById('real_temperature_5')));
    //   if(!document.getElementById('real_temperature_4'))
    //     equipment_four_road.create_real_disk({value:parseInt((Math.random()*100).toString()),text:this.language?'RealRH':'实时湿度',unit:'℃'},
    //     document.getElementById('real_temperature_4'));
    //     equipment_four_road.create_temp_h_1_p_gauge(
    //       el.dataLine
    //       ,echarts.init(document.getElementById(el.id)));
     
    // },3000)
  // }

  initChart(){
      // if(document.getElementById('real_temperature_4'))
      // equipment_four_road.create_real_disk({value:55,text:this.language?'RealTEMP':'实时温度',unit:'℃'},echarts.init(document.getElementById('real_temperature_4')));
      // if(document.getElementById('real_temperature_5'))
      //   equipment_four_road.create_real_disk({value:55,text:this.language?'RealRH':'实时湿度',unit:'%RH'},echarts.init(document.getElementById('real_temperature_5')));
      this.gauge.forEach(el => {
        if(document.getElementById(el.id))
        equipment_four_road.create_temp_h_1_p_gauge(
          el.dataLine
          ,echarts.init(document.getElementById(el.id)));
      });


  }


  getleft(item){
    return item > 40?item-20+'%':'20%';
  }


  get_td_width(num){
    return 100/num+'%'
  }

  

  ngOnDestroy(){
    clearInterval(this.timer);
    // clearInterval(this.timer1)
    for(let key in this.subscribeList){
      this.subscribeList[key].unsubscribe();
    }
    window.removeEventListener('resize',this.resize)
  }

}
