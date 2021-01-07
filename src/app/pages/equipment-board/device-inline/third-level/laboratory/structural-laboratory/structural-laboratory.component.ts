import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpserviceService } from '../../../../../../services/http/httpservice.service';
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
      open_close:[],
      type:'oil',
      speed:[],
      speed_name:[''],//实验名称
      router:'pages/equipment/oilsrouce/油源健康监控系统'
    },
    {
      name:'天窗开闭',
      src:'',//实验图片路径
      andon:0,
      speed:[],
      speed_name:[''],//实验名称
      router:''
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
      andon:0,
      speed:[],
      speed_name:[''],//实验名称
      router:''
    },
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
    'device_hpu_01':0,//油源1
    'device_hpu_02':1,//油源2
    'device_hpu_03':2,//油源3
    'device_hpu_04':3,//油源4
    'device_hpu_05':4,//油源5
  }
  timer:any;
  constructor(private router:Router,private http:HttpserviceService,private thrid:ThirdLevelService) { }

  ngOnInit(): void {
    if(document.getElementById('head_title'))
        document.getElementById('head_title').innerText = '验证中心-结构试验室';

    
  }

  ngAfterViewInit(){
    let param = Object.keys(this.param);
    let int = new Date().getTime();
    this.thrid.get_andon_status_year(param,this.left);
    this.thrid.get_andon_status_last_year(param,this.left);
    this.timer = setInterval(f=>{

      this.get_center_data();
      this.thrid.get_log_list(param,this.left)
      this.thrid.get_device_taskinfo_list(param,this.right).subscribe((f:any)=>{
        for(let key in f){
          this.param[key].speed = f[key].map(m=> (m.speed));
          this.param[key].speed_name = f[key].map(m=> (m.experiment));
        }
      });
    },1000)
    setTimeout(() => {
      this.right.initChart();
    }, 1000);
  }


  goto_borad(map){
    console.log(map.router)
    if(map.router)this.router.navigate([map.router]);
  }

  get_center_data(){
    let status = -1;
    this.http.callRPC('get_andon_status_list','get_andon_status_list',{deviceid:Object.keys(this.param)}).subscribe((f:any)=>{
      if(f.result.error || f.result.message[0].code == 0)return;
      f.result.message[0].message.forEach(el => {
        status = s_role[el.status]
        if(el.deviceid.includes('hpu'))
          this.list[4].open_close[this.param[el.deviceid]] = [1,3].includes(status)?status:-1;//油源
        else
          this.param[el.deviceid].andon = status;
      });
    })
  }

  //获取oil油源状态
  getoilstatus(item){
    switch(item){
      case 1:
        return '运行';
      case 3:
        return '停止';
      case -1:
        return '离线';
    }
  }

  getoilstatusColor(item){
    switch(item){
      case 1:
        return '#00FF00';
      case 3:
        return '#d68f47';
      case -1:
        return '#C0C0C0';
    }
  }

  ngOnDestroy(){
    clearInterval(this.timer)
  }
  


}
