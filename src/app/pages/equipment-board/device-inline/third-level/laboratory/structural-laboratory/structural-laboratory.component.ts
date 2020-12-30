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
      name:'Master',
      andon:0,
      speed:[0],
      router:'pages/equipment/coupling/整车多轴轴耦合道路模拟试验台-329',

    },
    {
      name:'320四立柱',
      andon:0,
      speed:[0],
      router:'pages/equipment/road/四立柱道路模拟试验台-320.5'
    },
    {
      name:'Mast Table',
      andon:0,
      speed:[0],
      router:'pages/equipment/shock/六自由度振动台-353.2'
    },
    {
      name:'TestLine',
      andon:0,
      speed:[0,0,0,0],
      router:'pages/equipment/hydraulic/液压伺服系统扩展系统-Testline'
    },
    {
      name:'油源',
      andon:0,
      open_close:[0,0,0,0,0],
      type:'oil',
      router:'pages/equipment/oilsrouce/油源健康监控系统'
    },
    {
      name:'天窗开闭',
      andon:0,
      speed:[0],
      router:''
    },
    {
      name:'玻璃升降系统',
      andon:0,
      speed:[0],
      router:''
    },
    {
      name:'开闭件台架',
      andon:0,
      speed:[0],
      router:''
    },
    {
      name:'环境仓集中监控',
      andon:0,
      speed:[0],
      router:''
    }
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
        document.getElementById('head_title').innerText = '结构实验室';

    
  }

  ngAfterViewInit(){
    let param = Object.keys(this.param);

    this.thrid.get_andon_status_year(param,this.left);
    this.thrid.get_andon_status_last_year(param,this.left);
    
    this.timer = setInterval(f=>{
      this.get_center_data();
      this.thrid.get_log_list(param,this.left)
      let o = 0;
      this.thrid.get_device_taskinfo_list(param,this.right).subscribe((f:any)=>{
        console.log(f)
        f.forEach(el => {
          if(!el.deviceid.includes('hpu') && 'device_mts_04' != el.deviceid)
            this.param[el.deviceid].speed[0] = el.rate;
          if('device_mts_04' == el.deviceid)
            this.list[3].speed[o] = el.rate,o++;
        });
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
    this.http.callRPC('get_andon_status_list','get_andon_status_list',{deviceid:Object.keys(this.param)}).subscribe((f:any)=>{
      if(f.result.error || f.result.message[0].code == 0)return;
      f.result.message[0].message.forEach(el => {
        if(el.deviceid.includes('hpu'))
          this.list[4].open_close[this.param[el.deviceid]] = s_role[el.status];//油源
        else
          this.param[el.deviceid].andon = s_role[el.status];
      });
    })
  }

  ngOnDestroy(){
    clearInterval(this.timer)
  }
  


}