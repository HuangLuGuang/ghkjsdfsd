import { Component, OnInit, NgZone, ChangeDetectionStrategy } from "@angular/core";

import { LocalStorageService } from "../../../../services/local-storage/local-storage.service";

// my-echart
let second_level = require("../../../../../assets/pages/device-inline/js/second-level");


// 全屏
import * as screenfull from "screenfull";
import { Screenfull } from "screenfull";
import { LayoutService } from "../../../../@core/utils";
import { Router } from "@angular/router";
import { EquipmentBoardService } from "../../serivice/equipment-board.service";

import Highcharts3D from "highcharts/highcharts-3d";
import { ThirdLevelService } from "../third-level/laboratory/third-level.service";
import { HttpserviceService } from "../../../../services/http/httpservice.service";
import { dateformat } from "../../equipment-board";
import { Observable } from "rxjs";

declare let $;

@Component({
  selector: "ngx-second-level",
  templateUrl: "./second-level.component.html",
  styleUrls: ["./second-level.component.scss"],
})
export class SecondLevelComponent implements OnInit {
  first_level;

  is_not_fullscreen = true; // 是否处于全屏

  // 定时器
  currenttime_timer;

  Highcharts = require("highcharts");

  // 3d pie 对象 试验设备总量与分布
  key_index;

  // 设备活跃的
  device_active;

  // 试验设备总量与分布 data
  key_index_data = [
    // { name: "验证中心", value: 2500 },
    // { name: "工程中心", value: 1000 },
    // { name: "智能电子软件中心", value: 500 },
    // { name: "新能源中心", value: 250 },
  ];


  // 设备活跃的 数据
  device_active_data:any[] = [
    {
      color:['#1168BB','white'],
      xdata:['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      active_number:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
      active_percentage:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
    },
    ['-', '-', '-'], // 当前在线数量、今日活跃数量、今日活跃率
  ];

  // 试验条目状态
  // teststatus = {
  //   color: ["#5D7FE5", "#26FF26"],
  //   xData: Object.values(rate),
  //   Series: {
  //     name: "本年度已\t完成试验数量",
  //     totaldata: 10,
  //     data: [],
  //     data_plan:[],
  //   },
  // };

  teststatus = {
    color:["#5D920D","#DBB70D"],
    xData:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
    //已完成
    data_carry_out:[0,0,0,0,0,0,0,0,0,0,0,0],
    //w未完成
    data_undone:[0,0,0,0,0,0,0,0,0,0,0,0],
    name: "本年度已完成试验数量",
    totaldata:13
  }

  //实验室状态
  laboratory = [
    {
      errornum:0,//异常的数量
      title:'结构实验室',
      class:'structural',
    },
    {
      errornum:0,
      title:'环模实验室',
      class:'environment',
    },
    {
      errornum:0,
      title:'电机实验室',
      class:'energy',
    },
    {
      errornum:1,
      title:'理化环保实验室',
      class:'physical',
    },
    {
      errornum:0,
      title:'NVH实验室',
      class:'noise',
    },
    
  ]
  laboratory_now_error = true;

  myChart;
  items:any;
  authorityList = [
    {
      show:false,
      class:'environment',
      title:'',
      link:'',
    },
    {
      show:false,
      class:'noise',
      title:'',
      link:'',
    },
    {
      show:false,
      class:'physical',
      title:'',
      link:'',
    },
    {
      show:false,
      class:'structural',
      title:'',
      // title:'结构试验室',
      link:'',
    },
    {
      show:false,
      class:'energy',
      title:'',
      link:'',
    }
  ]

  alert = {
    number:0,//当前报警数量
    equip_number:'-',//TODO 监控设备数量 
    dismiss_number:'-',//TODO 已解除数量
  }
  DataTime = 'week';//获取数据的时间


  timer_data;
  chartResize;//图表刷新订阅
  sublists:any = {};

  constructor(
    private localstorage: LocalStorageService,
    private layoutService: LayoutService,
    private router: Router,
    private boardservice: EquipmentBoardService,
    private ngZone: NgZone,
    private equipmentservice: EquipmentBoardService,
    private thirdLevelService:ThirdLevelService,
    private http:HttpserviceService
  ) {
    // 得到从first-leve级传递的数据
    this.first_level = this.localstorage.get("first_level");
    console.log("得到从first-leve级传递的数据: ", this.first_level);

    this.items = localstorage.get('mulu');
  }

  ngOnInit(): void {
    var title = "中央研究院";
    $("#head_title").text(title);
    //获取看板的实验室权限
    let items = this.items.find(f => 
      f.link == '/pages/equipment/first-level');
    //当没有找到 一级目录下单的子目录时  去中央研究院即看板下找子目录
    if(items.children){
      items = items.children.find(f=>
        f.link=='/pages/equipment/second-level').children;
    }else{
      items = this.items.find(f=>f.link=='/pages/equipment/second-level').children;
    }
    this.items = items;
    this.noAuthority(this.items,'authorityList');
    this.noAuthority(this.items,'laboratory');
    //获取影藏的菜单
    let menu = this.localstorage.get('hidden_menu');
    if(menu){
      menu = menu.filter(f => f.link.includes('third-level'));
      this.noAuthority(menu ? menu:null,'authorityList','hidden_menu');
      this.noAuthority(menu ? menu:null,'laboratory','hidden_menu');

    }
    console.log(this.authorityList)
    // this.listen_windows_resize();
  }

 
  ngAfterViewInit() {
    
    // 设备活跃的
    this.chartResize = this.equipmentservice.chartResize().subscribe((result) => {
      setTimeout(() => {
        this.key_index && this.key_index.reflow();
        this.myChart && this.myChart.resize();
        ['tj_test_number','tj_test_number_line','device_active'].forEach(f=>{
          let dom  = document.getElementById(f);
          if(f){
            echarts.init(dom).resize();
          }
        })
      }, 100);
    });

    // 设备开动率、完好lv
    setTimeout(() => {
      this.boardservice.sendLoad({ close: false });
      this.deviceactive();
      this.getData()
    }, 100);

    

  }

  getData(){
    let o = 0;
    this.timer_data = setInterval(()=>{
      if(o%5 == 0)this.get_teststatus();
      // 500秒更新一次
      if(o%20 == 0 ){
        console.log(this.DataTime)
        this.get_distribution_number();
        this.get_alarm_infor();
      }
      o++;
    },1000)
  }

  get_teststatus(){
    let year = dateformat(new Date(),'yyyy');
    this.sublists.teststauts = this.http.callRPC('dev_task_count_kpi_year','public.dev_task_count_kpi_year',
    {"start":`${year}-01-01`,"end":`${year}-12-31`}).subscribe((f:any)=>{
      if(f.result.error || f.result.message[0].code == 0)return;
      // console.log(f.result.message)
      f.result.message[0].bar.forEach(el => {

        if(el.taskstatus == '已完成'){
          this.teststatus.data_carry_out[parseInt(el.dates)-1] = el.numbers
        }else if(el.taskstatus == '未完成'){
          this.teststatus.data_undone[parseInt(el.dates)-1] = el.numbers;
        }
      });
      this.teststatus.totaldata = f.result.message[0].pie.find(f => f.taskstatus == '已完成').numbers;
      let dom = document.querySelector(".device-rate");
      if(dom){
        this.myChart = echarts.init(dom);
        second_level.device_rate_v2(this.myChart, this.teststatus);
      }
    });
  }


  /**
   * 报警信息
   */
  get_alarm_infor(){
    // return new Observable(s =>{

    // });
    // SELECT get_alarm_data('{"day":"7"}')
    // wweek特殊处理传6    year特殊处理穿365 
    console.log('当前选择的时间',this.DataTime)
    // if(!this.DataTime)return;
    let deviceline = {
      legend_data: ["三级", "二级", "一级"],
      series_datas: [
        [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
        [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
        [2.6, 9.0, 26.4, 175.6, 28.7, 5.9, 70.7, 182.2, 18.8, 6.0, 2.3, 48.7],
      ],
      xdata :["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月",]
    };
    let day = 0,//往后端穿的参数
        date = new Date(),//当前时间
        day_num;///生成数据的条数
    if(this.DataTime === 'week'){
      day = 6;
      day_num = day+1;
      deviceline.xdata = Array.from(new Array(7), (v,i) => 
        (date.setTime(new Date().getTime() - 1000 * 60 * 60 * 24 *(6-i)),dateformat(date,'MM-dd')));

    }else if(this.DataTime === 'month' ){
      day = 30;
      day_num = 30;
      deviceline.xdata = Array.from(new Array(30), (v,i) => 
        (date.setTime(new Date().getTime() - 1000 * 60 * 60 * 24 *(29-i)),dateformat(date,'MM-dd')));
    }else if(this.DataTime === 'year' ){
      day = 365;
      day_num  = 12;
    } 

    //TODO x轴赋值
    // this.device_active_data[0].xdata = JSON.parse(JSON.stringify(deviceline.xdata));
    
    //创建数据
    deviceline.series_datas[0] = Array.from(new Array(day_num), (v,i) => (v = 0));
    deviceline.series_datas[1] = Array.from(new Array(day_num), (v,i) => (v = 0));
    deviceline.series_datas[2] = Array.from(new Array(day_num), (v,i) => (v = 0));
    let pie_data = {
      subtext: '',
      data: [
        { value: 0, name: "三级" },
        { value: 0, name: "二级" },
        { value: 0, name: "一级" },
      ],
    };
    this.sublists.alarm_infor = this.http.callRPC('get_alarm_data','public.get_alarm_data',{day:day}).subscribe((f:any)=>{
      if(f.result.error || f.result.message[0].code == 0)return;
      this.sublists.alarm_infor.unsubscribe();
      console.log(f.result.message[0].message);
      f.result.message[0].message.forEach(el => {
        pie_data.data[el.level && el.level-1].value += el.count;
        if( this.DataTime != 'year'){
          let i = deviceline.xdata.findIndex(f=> f == el.dates);
          deviceline.series_datas[el.level-1][i] += i >-1 &&  el.count;
        }else{
          deviceline.series_datas[el.level-1][parseInt(el.dates)-1] =  el.count;
        }
      });
      this.alert.number =  f.result.message[0].alarm_numbers[0].numbers||0;
      this.alert.equip_number =  f.result.message[0].device_numbers[0].devicenumbers||0;
      console.log(deviceline.series_datas);
      // 初始化 echart
      setTimeout(() => {
        if(document.getElementById('tj_test_number')){
          second_level.devicepie("tj_test_number", pie_data);
        }
      }, 10);
      if(document.getElementById('tj_test_number_line')){
        second_level.deviceline("tj_test_number_line", deviceline);
      }
    });
  }

  /**
   * 获取eim分布数量
   */
  get_distribution_number(){
    this.sublists.distribution = this.http.callRPC('get_groups_devicenumbers','public.get_groups_devicenumbers',{}).subscribe((f:any)=>{
      if(f.result.error || f.result.message[0].code == 0)return;
      console.log(f.result.message[0].message);
      this.key_index_data = f.result.message[0].message.map(m => {
        let groups = m.groups && m.groups.split('-');
        return {name: groups && groups.length?groups[groups.length-1]:'', value: m.numbers};
      });
      // 试验设备总量与分布
      this.testdevice(this.key_index_data);
      // this.key_index.reflow();

    })  
  }


  /**
   * 当选择的时间变化
   */
  DataTimeChange(e){
    this.DataTime = e;
    console.log('------------------选择的时间改变',e)
    this.get_alarm_infor();
    this.deviceactive();
  }


  /**
   * 
   * @param menu 
   * @param local 当值为'hidden_menu'为没有权限
   */
  noAuthority(menu:any,listName:string,local?:string){
    if(menu){
      menu.forEach(el => {
        let arr = el.link.split('/');
        if(arr.length>0){
          
          let i = this[listName].findIndex(f => f.class == arr[arr.length-1])
          if(i != -1){
            //local == hidden_menu 不显示
            this[listName][i].show = !local || this[listName][i].show  ?true:false;
            this[listName][i].title = el.title;
            this[listName][i].link = el.link;
            
          }
          
        }
      });
    }
  }

  // createEchart() {
    // this.ngZone.runOutsideAngular(() => {
      // this.myChart = echarts.init(document.querySelector(".device-rate"));
      // let option = second_level.device_rate_v2(this.myChart, this.teststatus);
      // let option = second_level.device_rate( this.teststatus);
      // this.timer = setInterval(()=> {
      //   // option  =echarts.init(document.querySelector(".device-rate")).getOption();
      //   option.dataZoom[0].start++;
      //   option.dataZoom[0].end++;
      //   option.series[0].data = this.teststatus.Series.data;
      //   option.series[1].data = this.teststatus.Series.data_plan;
      //   option.series[2].data[0].value = this.teststatus.Series.totaldata;
      //   option.xAxis[1].max = this.teststatus.Series.totaldata;
      //   if (option.dataZoom[0].end === 100) {
      //       option.dataZoom[0].start = 1
      //       option.dataZoom[0].end = 12
      //   }
      //   this.myChart.setOption(option);
      // }, 300);
       
    // });
  // }

   // 试验设备总数与分布
   testdevice(key_index_data) {
    Highcharts3D(this.Highcharts);
    let  seriesData = key_index_data.map(m =>(
      {
        name: m.name,
        y: m.value,
        sliced: true,
        selected: true,
        colorchart: 3,
        dataLabels: {
          style: {
            color: "white",
            fontSize: "12px",
            fontWeight: "bold",
          },
          formatter: function () {
            return this.y > 5 ? this.point.name : null;
          },
        },
      }
    ))
    this.Highcharts.setOptions({
      colors: [
        "#50B432",
        "#24CBE5",
        "#abad05",
        "#ED561B",
        "#64E572",
        "#FF9655",
        "#FFF263",
        "#6AF9C4",
      ],
    });
    this.key_index = this.Highcharts.chart("key-index", {
      chart: {
        type: "pie",
        backgroundColor: "rgba(0,0,0,0)",
        borderWidth: 2,
        margin: [0, 20, 0, 20],
        options3d: {
          enabled: true,
          alpha: 50,
          beta: 0,
          viewDistance: 40,
        },
        style: {
          fontsSze: "30px",
          fontWeight: "bole",
        },
        xAxis: {
          minRange: 50,
        },
      },
      // 版本信息
      credits: {
        enabled: false,
      },
      exporting: { enabled: false },
      title: {
        // text: '试验设备总量与分布',
        text: "",
        style: { color: "white" },
      },
      tooltip: {
        pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
      },
      plotOptions: {
        pie: {
          // allowPointSelect: true,
          cursor: "pointer",
          center: ["50%", "50%"],
          slicedOffset: 20, // 扇形偏移
          depth: 35,
          dataLabels: {
            // inside: true,
            distance:5,
            format: "{point.name}",
            // format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          },
        },
      },
      series: [
        {
          type: "pie",
          name: "设备数量",
          size: 240, // 饼图大小
          // slicedOffset: 20, //

          data: seriesData
          // [
          //   {
          //     name: key_index_data[0].name,
          //     y: key_index_data[0].value,
          //     sliced: true,
          //     selected: true,
          //     colorchart: 3,
          //     dataLabels: {
          //       x: -30,
          //       y: -10,
          //       style: {
          //         color: "white",
          //         fontSize: "12px",
          //         fontWeight: "bold",
          //       },
          //       formatter: function () {
          //         return this.y > 5 ? this.point.name : null;
          //       },
          //     },
          //   },
          //   {
          //     name: key_index_data[1].name,
          //     y: key_index_data[1].value,
          //     sliced: true,
          //     selected: true,
          //     dataLabels: {
          //       x: 20,
          //       y: 0,
          //       style: {
          //         color: "white",
          //         fontSize: "12px",
          //         fontWeight: "bold",
          //       },
          //       formatter: function () {
          //         return this.y > 5 ? this.point.name : null;
          //       },
          //     },
          //   },
          //   {
          //     name: key_index_data[2].name,
          //     y: key_index_data[2].value,
          //     sliced: true,
          //     selected: true,
          //     dataLabels: {
          //       x: 40,
          //       y: 0,
          //       style: {
          //         color: "white",
          //         fontSize: "12px",
          //         fontWeight: "bold",
          //       },
          //       formatter: function () {
          //         return this.y > 5 ? this.point.name : null;
          //       },
          //     },
          //   },
          //   {
          //     name: key_index_data[3].name,
          //     y: key_index_data[3].value,
          //     sliced: true,
          //     selected: true,
          //     dataLabels: {
          //       x: 60,
          //       y: -10,
          //       style: {
          //         color: "white",
          //         fontSize: "12px",
          //         fontWeight: "bold",
          //       },
          //       formatter: function () {
          //         return this.y > 5 ? this.point.name : null;
          //       },
          //     },
          //   },
          // ],
        },
      ],
    });
  }
  // 设备活跃度
  deviceactive() {
    let dom = document.getElementById('device_active');
    if(dom){
      second_level.deviceLeftLine(echarts.init(dom),this.device_active_data[0]);
    }

    // this.device_active = this.Highcharts.chart("device_active", {
    //   colors: [
    //     "#50B432",
    //     "#24CBE5",
    //     "#abad05",
    //     "#ED561B",
    //     "#64E572",
    //     "#FF9655",
    //     "#FFF263",
    //     "#6AF9C4",
    //   ],
    //   chart: {
    //     type: "column",
    //     // 顶部，右侧，底部和左侧
    //     // margin: [0, 20, -5, 20],
    //     // borderColor: 'red',
    //     // borderWidth:3,
    //     height: null,
    //     spacing: [-20, 20, 0, 10], // 内边距
    //     backgroundColor: "rgba(0,0,0,0)",
    //     style: {
    //       fontsSze: "30px",
    //       fontWeight: "bole",
    //     },
    //   },
    //   // 版本信息
    //   credits: {
    //     enabled: false,
    //   },
    //   // 关闭
    //   legend: {
    //     enabled: false,
    //   },
    //   title: {
    //     text: "",
    //   },

    //   xAxis: {
    //     categories: device_active_data[0].xdata,
    //     crosshair: true,
    //     labels: {
    //       style: {
    //         color: "#fff",
    //       },
    //     },
    //   },
    //   yAxis: {
    //     // min: 0,
    //     // title: {
    //     //     text: '降雨量 (mm)'
    //     // }
    //     visible: false,
    //   },
    //   tooltip: {
    //     // head + 每个 point + footer 拼接成完整的 table
    //     headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
    //     pointFormat:
    //       '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
    //       '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
    //     footerFormat: "</table>",
    //     shared: true,
    //     useHTML: true,
    //   },
    //   plotOptions: {
    //     column: {
    //       borderWidth: 0,
    //     },
    //   },
    //   series: [
    //     {
    //       name: device_active_data[0].name[0],
    //       data: device_active_data[0].value[0],
    //     },
    //     {
    //       name: device_active_data[0].name[1],
    //       data: device_active_data[0].value[1],
    //     },
    //     {
    //       name: device_active_data[0].name[2],
    //       data: device_active_data[0].value[2],
    //     },
    //     {
    //       name: device_active_data[0].name[3],
    //       data: device_active_data[0].value[3],
    //     },
    //     {
    //       name: device_active_data[0].name[4],
    //       data: device_active_data[0].value[4],
    //     },
    //   ],
    // });
  }


  ngOnDestroy() {
    // this.device_active.destroy();
    // this.key_index.destroy();
    ['tj_test_number','tj_test_number_line','device_active'].forEach(f=>{
      let dom  = document.getElementById(f);
      if(f){
        echarts.init(dom).dispose();
      }
    })
    if(this.myChart)this.myChart.dispose();
    this.chartResize.unsubscribe();
    // clearInterval(this.timer);
    clearInterval(this.timer_data);
    for(let key in this.sublists){
      if(this.sublists[key])this.sublists[key].unsubscribe();
    }
  }

  // 跳转到具体的结构，
  goto_test_room(item) {
    console.log("跳转到:", item.title);
    setTimeout(() => {
      if(item.link){
        this.router.navigate([item.link.substring(1,item.link.length)]);
        this.boardservice.sendLoad({ close: true });
      }
      // switch (testname) {
      //   case "newpower":
      //     // case 'electrical':
      //     this.router.navigate(["pages/equipment/third-level/energy"]);
      //     this.boardservice.sendLoad({ close: true });
      //     break;
      //   case "environment":
      //     this.router.navigate(["pages/equipment/third-level/environment"]);
      //     this.boardservice.sendLoad({ close: true });
      //     break;
      //   case "structural":
      //     this.router.navigate(["pages/equipment/third-level/structural"]);
      //     this.boardservice.sendLoad({ close: true });
      //     break;
      //   case "physicochemical":
      //     this.router.navigate(["/pages/equipment/third-level/physical"]);
      //     this.boardservice.sendLoad({ close: true });
      //     break;
      //   case "noise":
      //     this.router.navigate(["/pages/equipment/third-level/noise"]);
      //     this.boardservice.sendLoad({ close: true });
      //     break;
      // }
    }, 100);
  }

  // 全屏切换
  showAllTemplate() {
    const board = document.getElementById("rtmv2");
    const sf = <Screenfull>screenfull;
    if (sf.isEnabled) {
      // sf.isEnabled 布尔值，判断是否允许进入全屏！

      this.is_not_fullscreen = sf.isFullscreen;
      sf.toggle(board);
    }
  }

  // 返回首页
  gohome() {}

  // 监听窗口变化来，重置echat的大小！
  listen_windows_resize() {
    window.onreset = function () {
      // this.device_active.reflow();
      // this.key_index.reflow();
      setTimeout(() => {
        
        this.myChart.resize();
      }, 100);
      
    };

  }
}



