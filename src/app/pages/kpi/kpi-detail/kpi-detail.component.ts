import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LayoutService } from '../../../@core/utils';
import { HttpserviceService } from '../../../services/http/httpservice.service';

import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

let kpi_detail = require("../../../../assets/pages/system-set/js/kpi_detail");


@Component({
  selector: 'ngx-kpi-detail',
  templateUrl: './kpi-detail.component.html',
  styleUrls: ['./kpi-detail.component.scss']
})
export class KpiDetailComponent implements OnInit {
  @ViewChild("myYear") myYear:any; // 月
  

  type; // 判断是那个组件的kpi： device 设备数据汇总、group 功能组数据汇总、department 部门数据汇总

  // 得到出入的数据 kpi_for_detail
  kpi_for_detail;

  // button title，设备的未 devicename，功能组的未 groups
  button_title;

  // eleclass 得到对应的div，monthed得到对应的数据 columns，方法需要的参数！
  // 第一行第一个
  one_row_one = (eleid, monthed, columns)=>{
    this.querst("", monthed, columns).subscribe(result=>{
      // console.log("第一行第一个 ", result);
      var res = result["result"]["message"][0];
      var defalultdata = {
        Xdata: ['01','02','03','04','05','06','07','08','09','10','11','12',],
        Series:[
          {
            name: '未完成',
            type: 'bar',
            barWidth: '20%',
            stack:'试验各状态每月变化趋势', // 堆叠
            data: [0,0,0,0,0,0,0,0,0,0,0,0,]
          },
          {
              name: '已完成',
              type: 'bar',
              barWidth: '20%',
              stack:'试验各状态每月变化趋势', // 堆叠
              data: [0,0,0,0,0,0,0,0,0,0,0,0,]
          },
          {
            name: null,
            type: 'pie',
            center: ['75%', '35%'],
            // radius: '28%',
            radius: ['20%', '30%'],
            tooltip: {
              trigger: 'item',
              axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                  type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              },
              // formatter: '{b} <br/>{a0}: {c0}<br/>{a1}: {c1}'
            },
            z: 100,
            y: -50,
            data:[
              {name: '未完成', value:0},
              {name: '已完成', value:0},
            ]
          }
        ],
        pieTotal:null,
      }
      var success = {
        xdata: [],
        ydata: [],
        title:''
      };
      var nosuccess = {
        xdata: [],
        ydata: [],
        title:''
      };
      var pie_success = {
        xdata: [],
        ydata: [],
        title:''
      };
      var pie_nosuccess = {
        xdata: [],
        ydata: [],
        title:''
      };
      if (res["code"]===1){
        var bar = res["bar"];
        var pie = res["pie"];
        var numbers = res["numbers"][0]["numbers"]
        // bar
        bar.forEach(element => {
          if (element["taskstatus"] === "已完成"){
            success.xdata.push(element["dates"])
            success.ydata.push(element["numbers"])
            success.title = element["taskstatus"]

          }else{
            nosuccess.xdata.push(element["dates"])
            nosuccess.ydata.push(element["numbers"])
            nosuccess.title = element["taskstatus"]
          }
        });
        for (let index = 0; index < 12; index++) {
          const xdata = success.xdata[index];
          const ydata = success.ydata[index];
          const noydata = nosuccess.ydata[index];
          // x 
          if (xdata){
            defalultdata.Xdata[index] = xdata;
          }
          // y 已完成   
          if (ydata){
            defalultdata.Series[1].data[index] = success.ydata[index]  // 已完成 
            defalultdata.Series[1].name = success.title
          }
          // y 未完成
          if (noydata){
            defalultdata.Series[0].data[index] = nosuccess.ydata[index]  // 未完成 
            defalultdata.Series[0].name = nosuccess.title
          }
          
        }
        // pie
        pie.forEach(element => {
          if (element["taskstatus"] === "已完成"){
            pie_success.xdata.push(element["dates"])
            pie_success.ydata.push(element["numbers"])
            pie_success.title = element["taskstatus"]
          }else{
            pie_nosuccess.xdata.push(element["dates"])
            pie_nosuccess.ydata.push(element["numbers"])
            pie_nosuccess.title = element["taskstatus"]
          }
        });
        // all 已完成 {name: '已完成', value:0},
        defalultdata.Series[2].data[0]["name"] = pie_success.title;
        defalultdata.Series[2].data[0]["value"] = this.get_tal(pie_success.ydata)
        // all 未完成 {name: '未完成', value:0}, 
        defalultdata.Series[2].data[1]["name"] = pie_nosuccess.title;
        defalultdata.Series[2].data[1]["value"] = this.get_tal(pie_nosuccess.ydata)
        // pieTotal 总数 提示
        defalultdata.pieTotal = numbers
      }
      kpi_detail.one_row_one(eleid, defalultdata);

    })
  }
  // one_row_one 需要，列表数据叠加
  get_tal(datas){
    var tal = 0;
    datas.forEach(item=>{
      tal += item
    })
    return tal
  }

  // 第二行第二个
  one_row_two = (eleid, monthed, columns)=>{
    
    this.querst("", monthed, columns).subscribe(result=>{
      console.log("第二行第二个 ", result);
      var res = result["result"]["message"][0]
      console.log("columns ", columns);
      var defaultdata = {
        color: ['#5D920D', '#3333FF', '#FF4E0D', "#DBB70D"],
        xData:['01','02','03','04','05','06','07','08','09','10','11','12',],
        title: ['运行', '空闲', '维修', "占位"],
        running: [0,0,0,0,0,0,0,0,0,0,0,0,],
        stop: [0,0,0,0,0,0,0,0,0,0,0,0,],
        warning: [0,0,0,0,0,0,0,0,0,0,0,0,],
        placeon: [0,0,0,0,0,0,0,0,0,0,0,0,],
      }
      if (res["code"] === 1){
        // 得到 x 轴！
        var resdatas = res['message'];
        console.log("resdatas ", resdatas);
        var xData = [];
        var running = [];
        var stop = [];
        var warning = [];
        var placeon = [];
        resdatas.forEach(resdata => {
          xData.push(resdata["dates"]);
          running.push(resdata["running"]);
          stop.push(resdata["stop"]);
          warning.push(resdata["warning"]);
          placeon.push(resdata["placeon"]);
        });

        // 赋值！
        for (let index = 0; index < defaultdata.xData.length; index++) {
          if (xData[index]){
            defaultdata.xData[index] = xData[index];
            defaultdata.running[index] = running[index];
            defaultdata.stop[index] = stop[index];
            defaultdata.warning[index] = warning[index];
            defaultdata.placeon[index] = placeon[index];
          }
        }
        

      }
      kpi_detail.one_row_two(eleid, defaultdata);
      console.log("需要的数据格式：", defaultdata)
  
    });
    
  }
 

  // 第二行第三个
  one_row_three = (eleid, monthed, columns)=>{
    columns.end = columns.year; // end 为 今年的
    columns.start = columns.year - 1; // start 为 去年的
    this.querst("", monthed, columns).subscribe(result=>{
      console.log("第二行第三个 ", result);
      var res = result["result"]["message"][0];
      var defaultdata = {
        data1: { // 去年
          name: columns.start + "年",
          value: [0,0,0,0]
        },
        data2: { // 今年
          name: columns.end + "年",
          value: [0,0,0,0]
        }
      }
      // 占位、空闲、维修、运行
      if (res["code"] === 1){
        var message = res["message"];
        for (let index = 0; index < 2; index++) { 
          if (message[index]){
            switch (index) {
              case 0:
                defaultdata.data1.name = message[index]["dates"]+ "年";
                defaultdata.data1.value[0]= message[index]["placeon"]
                defaultdata.data1.value[1]= message[index]["stop"]
                defaultdata.data1.value[2]= message[index]["warning"]
                defaultdata.data1.value[3]= message[index]["running"]
                break;
              case 1:
                defaultdata.data2.name = message[index]["dates"]+ "年";
                defaultdata.data2.value[0]= message[index]["placeon"]
                defaultdata.data2.value[1]= message[index]["stop"]
                defaultdata.data2.value[2]= message[index]["warning"]
                defaultdata.data2.value[3]= message[index]["running"]
                break;
            }
            
          }
          
        }
      }
      console.log("第三个数据：", defaultdata)
      kpi_detail.one_row_three(eleid, defaultdata);
    })
  }
  
  // one_row_three = (eleid, monthed, columns)=>{
  //   this.querst("", monthed, columns).subscribe(res=>{
  //     console.log("得到左侧第一个数据res： ", res);
  //   })
  // }
  


  // device 设备数据汇总、group 功能组数据汇总、department 部门数据汇总 
  // 需要的mothed和对应的table的url 行数据！
  mothed_table_url = {
    device: {
      url: "/pages/tongji/device_hour_report/deivce_data_sum",
      kpi_for_detail: JSON.parse(localStorage.getItem("device_hour_report_kpi_for_detail")),
      cards:[
        [
          { title: "试验各状态每月变化趋势",id:'kpi_00', method:'dev_task_count_kpi_year', myfun:this.one_row_one  },
          { title: "设备安灯月度趋势表",id:'kpi_01', method:'dev_get_device_columnar_kpi_month', myfun:this.one_row_two},// dev_get_device_columnar_kpi_month
          { title: "设备2年安灯状态累计对比",id:'kpi_02', method:'dev_get_device_columnar_kpi_year', myfun:this.one_row_three },
        ],
        [
          { title: "设备利用率同比环比",id:'kpi_10', method:'' },
          { title: "设备占位运行及开动率年度变化趋势",id:'kpi_11', method:'' },
          { title: "完好率与故障率变化趋势",id:'kpi_12', method:'' },
        ],
        [
          { title: "平均维修(故障停机)时同比环比",id:'kpi_20', method:'' },
          { title: "设备报警统计",id:'kpi_21', method:'' },
          { title: "设备当天启停状态数据统计",id:'kpi_22', method:'' },
        ],
      ]
    },
    group: {
      url: "/pages/tongji/device_hour_report/group_data_sum",
      kpi_for_detail: JSON.parse(localStorage.getItem("device_hour_report_kpi_for_detail")),
    },
  }

  table_url = "";

  // 参数
  columns = {}

  // plv8请求
  querst(table: string, method: string, colmun: Object){
    return new Observable ((observe)=>{
      this.http.callRPC(table, method, colmun).subscribe((result)=>{
        observe.next(result);
      })
    })
  }


  constructor(private http: HttpserviceService, private router: Router,
    private layoutService: LayoutService,private activerouter: ActivatedRoute,
    private datepip: DatePipe
  ) {
    // 会话过期
    localStorage.removeItem("alert401flag");
    this.kpi_for_detail = JSON.parse(localStorage.getItem("device_hour_report_kpi_for_detail"));
    
  
    // 得到路由参数！
    this.activerouter.queryParamMap.subscribe(res=>{
      this.type = res.get("name")
    });

    
  }

  ngOnInit(): void {
    if (this.type === 'device'){
      this.table_url = this.mothed_table_url.device.url;
      this.button_title = this.kpi_for_detail["devicename"];
    }else if (this.type === 'group'){
      this.table_url = this.mothed_table_url.group.url;
      this.button_title = this.kpi_for_detail["groups"]
    }
    console.log("kpi_detail----", this.kpi_for_detail);
    console.log("type----", this.type);


    this.layoutService.onInitLayoutSize().subscribe(f=>{
      let left_one = document.querySelector('.left-one');
      if(left_one) echarts.init(left_one).resize();
      let right_one = document.querySelector('.right-one');
      if(right_one) echarts.init(right_one).resize();
      let left_two = document.querySelector('.left-two');
      if(left_two) echarts.init(left_two).resize();
      let right_two = document.querySelector('.right-two');
      if(right_two) echarts.init(right_two).resize();
    })

  }
  
  ngAfterViewInit(){
    // this.init_all_echart();
  }
  // 销毁组件时，删除 kpi_for_detail
  ngOnDestroy(){
    localStorage.removeItem("device_hour_report_kpi_for_detail")
  }

  // 返回 kpi报表
  kpireport(){
    // this.router.navigate(['/pages/tongji/device_hour_report'])
    this.router.navigate([this.table_url])
  }

  // 3*3 card 的echart的图表
  init_all_echart(year){
    // 判断是什么？device、group
    switch (this.type) {
      case 'device': // 设备
        var kpi_for_detail = this.mothed_table_url.device.kpi_for_detail;
        var columns = {
          start: this.datepip.transform(new Date(year, 0, 1), 'yyyy-MM-dd'),
          end: this.datepip.transform(new Date(year, 12, 0), 'yyyy-MM-dd'),
          year: year,
          deviceid: kpi_for_detail["deviceid"],
        }
        this.mothed_table_url.device.cards.forEach(row=>{
          row.forEach(col=>{
            var eleid = col.id;
            var monthed = col.method;
            if (col.myfun){
              col.myfun(eleid, monthed, columns)

            }
          })
        })
        
        break;
    
      default:
        break;
    }
  }

  

  // 选择年份时，执行
  select_year(year){
    console.log("选择年份时，执行",year)
    if (this.type === 'device'){
      this.init_all_echart(year)
      // 这是 左侧第一个柱状图
      // this.init_left_one(this.mothed_table_url.device.left_method1,columns);
      // // 这是 右侧第一个饼图 right-one
      // this.init_right_ong(this.mothed_table_url.device.left_method1,columns);
      // // 这是左侧第二个饼图 left_two
      // this.init_left_two(this.mothed_table_url.device.left_method1,columns);
      // // 这是 右侧第二个 柱状图 right-two
      // this.init_right_two(this.mothed_table_url.device.left_method1,columns);

    }else if (this.type === 'group'){
      console.error("group------------------------>")
    }
  }
  
  





  // 初始化 左侧第一个echart设备时间统计
  init_left_one(left_method1, columns){
    // 得到数据
    // this.querst("", this.left_method1, this.columns).subscribe(res=>{
    this.querst("", left_method1, columns).subscribe(res=>{
      // 得到 x 轴！
      var resdatas = res['result']['message'][0];
      var xData = [];
      var running = [];
      var stop = [];
      var warning = [];
      var placeon = [];

      var afterdata = {};
      resdatas.forEach(resdata => {
        xData.push(resdata["dates"]);
        running.push(resdata["running"]);
        stop.push(resdata["stop"]);
        warning.push(resdata["warning"]);
        placeon.push(resdata["placeon"]);
      });
      afterdata["xData"] = xData;
      afterdata["running"] = running; // 运行
      afterdata["stop"] = stop;       // 空闲
      afterdata["warning"] = warning; // 维修
      afterdata["placeon"] = placeon; // 占位
      // ['运行', '空闲', '维修', "占位"]
      afterdata["title"] = ['运行', '空闲', '维修', "占位"];

      // console.log("得到左侧第一个数据： ", afterdata);
      kpi_detail.left_one('.left-one', afterdata);
    });
  };


  
  // 初始化右侧 第一个 echart 百分比
  init_right_ong(right_method1, columns){
    // 得到数据
    // this.querst("", this.right_method1, this.columns).subscribe(res=>{
    this.querst("", right_method1, columns).subscribe(res=>{
      // 得到 x 轴！
      var resdatas = res['result']['message'][0][0];
      var afterdatas = [];
      for(let k in resdatas){
        var afterdata = {};
        var key;
        switch (k) {
          case "running":
            key = "运行"
            break;
          case "stop":
            key = "空闲"
            break;
          case "warning":
            key = "占位"
            break;
          case "placeon":
            key = "维修"
            break;
        }
        afterdata["name"] = key;
        afterdata["value"] = resdatas[k];
        afterdatas.push(afterdata)
      }
      var title = ['运行', '空闲', '维修', "占位"];
      // console.log("得到右侧第一个数据： ", afterdatas);
      kpi_detail.right_one('.right-one', {afterdatas:afterdatas,title:title});
    })
  }

  // 初始化左侧 第二个 echart 月份数据
  init_left_two(left_method2, columns){
    // 得到数据
    // this.querst("", this.left_method2, this.columns).subscribe(res=>{
    this.querst("", left_method2, columns).subscribe(res=>{
      // 得到 x 轴！
      var resdatas = res['result']['message'][0];
      var afterdatas = {};
      var xData = [];
      var yData = [];
      resdatas.forEach(data => {
        xData.push(data["dates"] + '月');
        yData.push(data["running"]);
      });
      afterdatas["xData"] = xData;
      afterdatas["yData"] = yData;
      
      // console.log("得到左侧 第二个数据： ", afterdatas);
      kpi_detail.left_two('.left-two', afterdatas);
    })
  }

  
  // 初始化右侧 第二个 echart 年份数据
  init_right_two(right_method2, columns){
    // 得到数据
    // this.querst("", this.right_method2, this.columns).subscribe(res=>{
    this.querst("", right_method2, columns).subscribe(res=>{
      // 得到 x 轴！
      var resdatas = res['result']['message'][0];
      var afterdatas = {};
      var xData = [];
      var yData = [];
      resdatas.forEach(data => {
        xData.push(data["dates"] + '年');
        yData.push(data["running"]);
      });
      afterdatas["xData"] = xData;
      afterdatas["yData"] = yData;
      
      // console.log("得到左侧 第二个数据： ", afterdatas);
      kpi_detail.right_two('.right-two', afterdatas);
    })
  }

  // 监听窗口变化来，重置echat的大小！
  listen_windows_resize(){
    window.onreset = function (){
      let left_one = document.querySelector('.left-one');
      if(left_one) echarts.init(left_one).resize();
      let right_one = document.querySelector('.right-one');
      if(right_one) echarts.init(right_one).resize();
      let left_two = document.querySelector('.left-two');
      if(left_two) echarts.init(left_two).resize();
      let right_two = document.querySelector('.right-two');
      if(right_two) echarts.init(right_two).resize();
    }
  }

}
