import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LayoutService } from '../../../@core/utils/layout.service';
import { colors, rgb_del_red, create_img_16_9 } from '../equipment-board';

/**
 * TODO demo
 **/
@Component({
  selector: 'ngx-equipment-details',
  templateUrl: './equipment-details.component.html',
  styleUrls: ['./equipment-details.component.scss'],
  
})
export class EquipmentDetailsComponent implements OnInit {

  
  attrs = [{ 
    name: "参数1",nameEn: "param1", unit: "V",value: [],show:true,dashboardShow:true
    ,color:["#00FF00", "#00FF00"]
  },{ 
      name: "参数2",nameEn: "param2", unit: "V",value: [],
      color:["#ff00ff", "#ff00ff"],dashboardShow:true
  },{ 
      name: "参数3",nameEn: "param3", unit: "V",value: [],
      color:["#d9d919", "#d9d919"],dashboardShow:true
  },{ 
    name: "参数4",nameEn: "param4", unit: "V",value: [],
    color:["#d9d919", "#d9d919"]
},{ 
  name: "参数5",nameEn: "param5", unit: "V",value: [],
  color:["#d9d919", "#d9d919"]
},{ 
  name: "参数6",nameEn: "param6", unit: "V",value: [],
  color:["#d9d919", "#d9d919"]
},{ 
  name: "参数7",nameEn: "param7", unit: "V",value: [],
  color:["#d9d919", "#d9d919"]
}]
  xData = [];

  attrs_1 = {}
  attrs_2 = {}
  attrs_3 ={}

  //安灯状态
  andon = [
    {name:'4',stauts:1},
    {name:'3',stauts:0},
    {name:'2',stauts:0},
    {name:'1',stauts:0},
  ];
 

  switchStatus:any ={
    title:[`stationName`,'OnOff',`OilSeparatorOn`,`HighOilSeparator`,'InternalLock','Programlock'],
    // title:[`Station
    // name`,'开/关',`分油器开`,`分油器高`,'内锁','程序内锁'],
    data:[['Act1 and Act2',
    {value:1,color:'green',id:'circle'},{value:1,color:'green',id:'circle'},{value:1,color:'green',id:'circle'},
    {value:1,color:'white',id:'strip'},{value:1,color:'white',id:'strip'}]]
  }


  str=`试验原理：--------------------------------------------------<br>
  设备构成：-------，-------，-------，--------<br>
  试验能力：------------------------------------------------<br>
   标准试验：-------------------------------------------------<br>
                    -----------------------------------------------<br>
                    --------------------------------------------<br>
   非标试验：---------------------------------------<br>`;



  img = {
    url:'assets/eimdoard/equipment/images/car_2.png',
    name:''
  }

  list_1 = ['equipment.param1','equipment.param2'];
  list_2 = ['equipment.param1','equipment.param2'];
  list_3 = ['equipment.param1','equipment.param2'];

  @ViewChild('chart_3')chart_3:any;
  @ViewChild('chart_2')chart_2:any;
  @ViewChild('chart_1')chart_1:any;

  click_list = [];//当前选中的tag
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
    })
    //路由订阅
    this.subscribeList.router = this.activateInfo.params.subscribe(f =>{
      // console.log(f);
      if(document.getElementById('head_title'))
        document.getElementById('head_title').innerText = f.title;
        this.deviceid = f.deviceid;
    })

    let rgb = '';
    this.attrs.forEach((f,i)=>{
      if(i > colors.length-1)
        rgb =  rgb_del_red();
      else
        rgb =  colors[i];
      f.color = [rgb,rgb];
    })

    this.click_list = [this.list_1[0],this.list_2[0],this.list_3[0]]

    //赋值
    this.list_copy(this.list_1,`attrs_1`);
    this.list_copy(this.list_2,`attrs_2`);
    this.list_copy(this.list_3,`attrs_3`);
    this.getData();
    setTimeout(() => {
      this.initChart();
      create_img_16_9();
    }, 1000);

  
  }
  
  getData(){
    // this.http.callRPC('panel_detail','get_device_panel_detail',
    //   {"deviceid":this.deviceid}).subscribe((f:any) =>{

    //   })
    
    let g = 1;
    this.timer = setInterval(f =>{
      this.xData.push(g);
      if(this.xData.length>10)this.xData.splice(0,1);
      g++;
      this.list_jion(this.list_1,'attrs_1');
      this.list_jion(this.list_2,'attrs_2');
      this.list_jion(this.list_3,'attrs_3');
      let array = ['chart_1','chart_2','chart_3'].forEach((f,i)=>{
        this[`chart_${i+1}`].painting({attrs:this[`attrs_${i+1}`][this.click_list[i]],xData:this.xData,index:g});
      })
    },1000)

    
  }

  initChart(){
    
    
    // this.list.forEach((f,i)=>{
    //   this[`chart_${i+1}`].painting({attrs:this[`attrs_${i+1}`][this.list[0]],xData:this.xData});
    // })


    

  }

  list_jion (list,name,){
    list.forEach((f,i)=>{
      this[name][f].forEach(element => {
        element.value.push(parseInt((Math.random()*100).toString()))
        if(element.value.length > 10)element.value.splice(0,1)
      });
    })
  }

  list_copy(list,name){
    list.forEach((f,i)=>{
      this[name][f] = JSON.parse(JSON.stringify(this.attrs));
    })
  }


  get_td_width(num){
    return 100/num+'%'
  }


  clicEvent(e,i){
    //记录选定
    this.click_list[i-1] = e;  
    this[`chart_${i}`].painting({attrs:this[`attrs_${i}`][e],xData:this.xData});
  }

  

  ngOnDestroy(){
    clearInterval(this.timer)
    for(let key in this.subscribeList){
      this.subscribeList[key].unsubscribe();
    }
  }

}
