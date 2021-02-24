import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpserviceService } from '../../../../../../services/http/httpservice.service';
import { library } from '../../../../equipment-board';
import { EquipmentBoardService } from '../../../../serivice/equipment-board.service';
import { s_role } from '../../../../temp/equipment-status/equipment-status.component';
import { ThirdLevelService } from '../third-level.service';

@Component({
  selector: 'ngx-structural-laboratory',
  templateUrl: './structural-laboratory.component.html',
  styleUrls: ['./structural-laboratory.component.scss']
})
export class StructuralLaboratoryComponent implements OnInit {
  list = [
    {
      name:'MTS 329',
      src:'assets/eimdoard/equipment/images/zcdz.png',//实验图片路径
      andon:0,
      speed:[],//实验编号
      speed_name:[''],//实验名称
      router:'pages/equipment/coupling/整车多轴轴耦合道路模拟试验台-329',
    },
    {
      name:'MTS 320',
      src:'assets/eimdoard/equipment/images/slz.png',//实验图片路径
      andon:0,
      speed:[],
      speed_name:[''],//实验名称
      router:'pages/equipment/road/四立柱道路模拟试验台-320.5'
    },
    {
      name:'MTS Mast table',
      src:'assets/eimdoard/equipment/images/lzyd.png',//实验图片路径
      andon:0,
      speed:[],
      speed_name:[''],//实验名称
      router:'pages/equipment/shock/六自由度振动台-353.2'
    },
    {
      name:'MTS Testline',
      src:'assets/eimdoard/equipment/images/yy.png',//实验图片路径
      andon:0,
      speed:[],
      speed_name:[],//实验名称
      router:'pages/equipment/hydraulic/液压伺服系统扩展系统-Testline'
    },
    {
      name:'MTS HPU',
      src:'assets/eimdoard/equipment/images/yy.png',//实验图片路径
      andon:0,
      open_close:[0,0,0,0,0],
      type:'oil',
      speed:[],
      speed_name:[''],//实验名称
      router:'pages/equipment/oilsrouce/油源健康监控系统'
    },
    {
      name:'天窗开闭',
      src:'assets/eimdoard/equipment/images/slz.png',//实验图片路径
      andon:0,
      speed:[],
      speed_name:[''],//实验名称
      router:'pages/equipment/skylight/天窗开闭件试验台'
    },
    {
      name:'玻璃升降系统',
      src:'',//实验图片路径
      andon:0,
      speed:[],
      speed_name:[''],//实验名称
      router:''
    },
    {
      name:'开闭件台架',
      src:'',//实验图片路径
      andon:0,
      speed:[],
      speed_name:[''],//实验名称
      router:''
    },
    {
      name:'环境仓集中监控',
      src:'assets/eimdoard/equipment/images/jg_hjc.png',//实验图片路径
      type:'concentrated',
      andon:0,
      speed:[],
      speed_name:[''],//实验名称
      router:''
    },
    {
      name:'四门两盖01',
      src:'assets/eimdoard/equipment/images/slz.png',//实验图片路径
      andon:0,
      speed:[],
      speed_name:[''],//实验名称
      router:'pages/equipment/jinhua-4d2c-01/四门两盖开闭耐久实验台1/one'
    },
    {},
    {},
    {},
    {},
    {},
  ]
  //安灯状态
  andon = [
    {name:'运行',color:'green',t:1},
    {name:'空闲',color:'blue',t:3},
    {name:'占位',color:'yellow',t:2},
    {name:'维修',color:'red',t:4},
  ];
  @ViewChild('left')left:any;
  @ViewChild('right')right:any;

  param = {
    'device_mts_02':this.list[0],//整车耦合
    'device_mts_01':this.list[1],//四立柱道路模拟试验台
    'device_mts_03':this.list[2],//六自由度振动台
    "device_mts_04":this.list[3],//液压伺服
    'device_skylight_01':this.list[5],//天窗开闭

    'device_4d2c_02':this.list[9]//四门两盖01
  }
  timer:any;
  constructor(private router:Router,private http:HttpserviceService,private thrid:ThirdLevelService,
    private boardservice:EquipmentBoardService) { }

  ngOnInit(): void {
    if(document.getElementById('head_title'))
        document.getElementById('head_title').innerText = '验证中心-结构试验室';

    
  }

  ngAfterViewInit(){
    this.boardservice.sendLoad({close:false})

    let param = Object.keys(this.param);
    let now;
    this.thrid.get_andon_status_year(param,this.left);
    this.thrid.get_andon_status_last_year(param,this.left);
    this.timer = self.setInterval(f=>{
      this.get_oil_status();
      this.get_center_data();
      this.thrid.get_log_list(param,this.left)
      this.thrid.get_device_taskinfo_list(param,this.right).subscribe((f:any)=>{
        for(let key in f){
          this.param[key].speed = f[key].map(m=> (m.speed));
          this.param[key].speed_name = f[key].map(m=> (m.experiment));
        }
      });
      now = new Date();
      if(now.getDate() == 1){
        this.thrid.get_andon_status_year(param,this.left);
      this.thrid.get_andon_status_last_year(param,this.left);
      }
    },1000)
    setTimeout(() => {
      this.right.initChart();
    }, 1000);
  }


  goto_borad(map){
    console.log(map.router)
    if(map.router){
      this.router.navigate([map.router]);
      this.boardservice.sendLoad({close:true})
    }
  }


  get_center_data(){
    let status = -1;
    this.http.callRPC('get_andon_status_list','get_andon_status_list',{deviceid:Object.keys(this.param)}).subscribe((f:any)=>{
      if(f.result.error || f.result.message[0].code == 0)return;
      f.result.message[0].message.forEach(el => {
        status = s_role[el.status]
        // if(el.deviceid.includes('hpu'))
        //   this.list[4].open_close[this.param[el.deviceid]] = [1,3].includes(status)?status:-1;//油源
        // else
          this.param[el.deviceid].andon = status;
      });
    })
  }

  get_oil_status(){
    let res;
    this.http.callRPC('get_hpu',library+'get_hpu',{"deviceid":""}).subscribe((f:any)=>{
      if(f.result.error || f.result.message[0].code == 0)return;
      res = f.result.message[0].message;
      res.forEach((el,i) => {
        this.list[4].open_close[i] = el.length>0?(el[0].status || 0):0;
      });
    })
  }

  //获取oil油源状态
  getoilstatus(item){
    switch(item){
      case 1:
        return '运行';
      case 0:
        return '停止';
      default:
        return '离线';
    }
  }

  getoilstatusColor(item){
    switch(item){
      case 1:
        return '#00FF00';
      case 0:
        return '#d68f47';
      default:
        return '#C0C0C0';
    }
  }

  ngOnDestroy(){
    clearInterval(this.timer)
  }
  


}
