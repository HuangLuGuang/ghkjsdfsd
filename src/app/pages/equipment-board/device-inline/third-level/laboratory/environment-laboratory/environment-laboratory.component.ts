import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpserviceService } from '../../../../../../services/http/httpservice.service';
import { EquipmentBoardService } from '../../../../serivice/equipment-board.service';
import { s_role } from '../../../../temp/equipment-status/equipment-status.component';
import { ThirdLevelService } from '../third-level.service';

@Component({
  selector: 'ngx-environment-laboratory',
  templateUrl: './environment-laboratory.component.html',
  styleUrls: ['./environment-laboratory.component.scss']
})
export class EnvironmentLaboratoryComponent implements OnInit {

  list = [
    {
      name:'AVL耐久2驱-1',
      number:'S1060',
      andon:0,
      src:'assets/eimdoard/equipment/images/lqdp.png',//实验图片
      speed:[],
      speed_name:[''],//实验名称
      // router:'/pages/equipment/twodrive/两驱底盘测功机-1/device_avldyno_01',
      router:'',
      run:false,
      mark:'twodrive',
    },
    {
      name:'AVL耐久2驱-2',
      number:'S1060',
      andon:0,
      src:'assets/eimdoard/equipment/images/lqdp.png',
      speed:[],
      speed_name:[''],
      // router:'/pages/equipment/twodrive2/两驱底盘测功机-2/device_avldyno_02',
      router:'',
      run:false,
      mark:'twodrive2',

    },
    {
      name:'AVL耐久4驱',
      number:'S1060',
      andon:0,
      src:'assets/eimdoard/equipment/images/lqdp.png',//实验图片
      speed:[],
      speed_name:[''],
      // router:'/pages/equipment/twodrive3/四驱底盘测功机-3/device_avl4dyno_01',
      router:'',
      run:false,
      mark:'twodrive3',

    },
    {
      name:'AVL排放2驱',
      number:'S1070',
      andon:0,
      src:'assets/eimdoard/equipment/images/hm_1074.png',//实验图片
      speed:[],
      speed_name:[''],
      // router:'/pages/equipment/avl/AVL转鼓+久鼎环境舱+排放分析',
      router:'',
      run:false,
      mark:'avl',

    },
    {
      name:'AVL环模四驱',
      number:'S1070',
      andon:0,
      src:'assets/eimdoard/equipment/images/sqdp.png',//实验图片
      speed:[],
      speed_name:[''],
      // router:'/pages/equipment/central-jinhua/中置式四驱底盘测功机+锦华高低温环境舱',
      router:'',
      run:false,
      mark:'central-jinhua',

    },
    {
      name:'AVL排放2驱',
      number:'S1074',
      andon:0,
      src:'assets/eimdoard/equipment/images/liangqu.jpg',//实验图片
      speed:[],
      speed_name:[''],
      // router:'/pages/equipment/avl-etec/两驱AVL转鼓+ATEC环境舱+排放分析/two',
      router:'',
      run:false,
      mark:'avl-etec',

    },
    {
      name:'AVL排放4驱',
      number:'S1074',
      andon:0,
      src:'assets/eimdoard/equipment/images/siqu.jpg',//实验图片
      speed:[],
      speed_name:[''],
      // router:'/pages/equipment/avl-etec2/四驱AVL转鼓+ATEC环境舱+排放分析/four',
      router:'',
      run:false,
      mark:'avl-etec2',

    },
    {
      name:'常温浸车舱',
      number:'S1071',
      mark:'monitoring',

      other:{
        name:'ATEC舱',
        number:'S1074',
        andon:0,
        speed:[],
        speed_name:[''],
      },
      src:'',//实验图片
      andon:0,
      speed:[],
      speed_name:[''],
      type:'multiple',
      // router:'/pages/equipment/monitoring/环境舱集中监控',
      router:'',
      run:false,
    },
    {},{},{},{}
  ]
  @ViewChild('left')left:any;
  @ViewChild('right')right:any;
    //安灯状态
  andon = [
      {name:'运行',color:'green',t:1},
      {name:'空闲',color:'blue',t:3},
      {name:'占位',color:'yellow',t:2},
      {name:'维修',color:'red',t:4},
  ];
  param = {
    'device_avldyno_01':this.list[0],//AVL耐久2驱-S1060
    'device_avldyno_02':this.list[1],//AVL耐久2驱-S1060`
    'device_avl4dyno_01':this.list[2],//AVL耐久4驱 S1060

    'device_avldyno_03':this.list[3],//AVL排放2驱-S1070
    'device_avl4dyno_02':this.list[4],//AVL环模4驱-S1070
    'device_avl2dyno_01':this.list[5],//AVL排放2驱-S1074
    'device_avl4dyno_03':this.list[6],//AVL排放4驱-S1074
    'device_jinhua_cabin02':this.list[7],//锦华常温浸车舱
    'device_atec_03':this.list[7].other,//整车高低温试验舱
  }
  timer;
  constructor(private router:Router,private thrid:ThirdLevelService,private http:HttpserviceService,
    private boardservice:EquipmentBoardService) { }

  ngOnInit(): void {
    if(document.getElementById('head_title'))
        document.getElementById('head_title').innerText = '验证中心-环模试验室';
    
    
  }

  ngAfterViewInit(){
    setTimeout(() => {
      this.thrid.get_Authority(this.list,'/pages/equipment/third-level/environment');
    }, 10);
    this.boardservice.sendLoad({close:false})

    let param = Object.keys(this.param)
    this.thrid.get_andon_status_year(param,this.left);
    this.thrid.get_andon_status_last_year(param,this.left);
    let now;
    let o = 0;
    this.timer = self.setInterval(f=>{
      this.get_center_data();
      this.thrid.get_device_taskinfo_list(param,this.right).subscribe((f:any)=>{
        // f.forEach(el => {
        //   if(this.param[el.deviceid].speed)return;
        //   this.param[el.deviceid].speed[0] = el.rate;
        //   this.param[el.deviceid].speed_name[0] = el.taskchildnum;
        // });
        for(let key in f){
          this.param[key].speed = f[key].map(m=> (m.speed));
          this.param[key].speed_name = f[key].map(m=> (m.experiment));
        }
      });

      this.thrid.get_equipment_status( Object.keys(this.param)).subscribe((res:any)=>{
        // console.log(res)
        for(let key in res){
          if(['device_jinhua_cabin02','device_atec_03'].includes(key)){
            this.list[7].run = res['device_jinhua_cabin02'] || res['device_atec_03']? true:false;
          }else{
            this.param[key].run = res[key];
          }
        }
      })

      now = new Date();
      if(now.getDate() == 1){
        this.thrid.get_andon_status_year(param,this.left);
        this.thrid.get_andon_status_last_year(param,this.left);
      }
      if(o%3 ==0 )this.thrid.get_log_list(param,this.left);
      o++;
    },1000)
    
  }

  get_center_data(){
    this.http.callRPC('get_andon_status_list','get_andon_status_list',{deviceid:Object.keys(this.param)}).subscribe((f:any)=>{
      if(f.result.error || f.result.message[0].code == 0)return;
      f.result.message[0].message.forEach(el => {
        this.param[el.deviceid].andon = s_role[el.status];
      });
    })
  }

  goto_borad(map){
    console.log(map.router)
    if(map.router){
      this.router.navigate([map.router]);
      this.boardservice.sendLoad({close:true})
    }
  }

  ngOnDestroy(){
    clearInterval(this.timer)
  }

}
