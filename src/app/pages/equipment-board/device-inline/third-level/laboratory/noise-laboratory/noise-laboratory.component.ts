import { Component, OnInit, ViewChild } from '@angular/core';
import {  Router } from '@angular/router';
import { HttpserviceService } from '../../../../../../services/http/httpservice.service';
import { EquipmentBoardService } from '../../../../serivice/equipment-board.service';
import { s_role } from '../../../../temp/equipment-status/equipment-status.component';
import { ThirdLevelService } from '../third-level.service';

@Component({
  selector: 'ngx-noise-laboratory',
  templateUrl: './noise-laboratory.component.html',
  styleUrls: ['./noise-laboratory.component.scss']
})
export class NoiseLaboratoryComponent implements OnInit {
  list = [
    {
      name:'整车异响',
      number:'',
      andon:0,
      speed:[],
      src:'assets/eimdoard/equipment/images/ccts-bsr.jpg',//实验图片地址
      speed_name:[''],//实验编号
      // router:'/pages/equipment/ccts-bsr/整车异响',
      router:'',
      run:false,
      mark:'ccts-bsr',

    },
    {
      name:'MAHA转鼓',
      number:'',
      andon:0,
      speed:[],
      src:'assets/eimdoard/equipment/images/maha.jpg',//实验图片地址
      speed_name:[''],//实验编号
      // router:'/pages/equipment/maha/MAHA-75英寸四驱四电机低噪音底盘测功机',
      router:'',
      run:false,
      mark:'maha',
    },
    {
      
    },
    {
      
    },
    {
      
    },
    {
      
    },
    {
      
    },{},{},{},{},{}
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
    'device_auto_bsr01':this.list[0],
    'device_maha_dyno01':this.list[1],
  }
  timer;
  constructor(private router:Router,private http:HttpserviceService,private thrid:ThirdLevelService,
    private boardservice:EquipmentBoardService) { }

  ngOnInit(): void {
    if(document.getElementById('head_title'))
        document.getElementById('head_title').innerText = '验证中心-噪声与振动试验室';
  }

  ngAfterViewInit(){
    setTimeout(() => {
      this.thrid.get_Authority(this.list,'/pages/equipment/third-level/noise');
    }, 10);
    this.boardservice.sendLoad({close:false})

    let param = Object.keys(this.param);
    let now;
    let o = 0;
    this.timer = self.setInterval(f=>{
      if(o % 5 == 0){
        this.thrid.get_equipment_status( Object.keys(this.param)).subscribe((res:any)=>{
          // console.log(res)
          for(let key in res){
            this.param[key].run = res[key]
          }
        })

        setTimeout(() => {
          this.get_center_data();
        }, 300);
        setTimeout(() => {
          this.thrid.get_device_taskinfo_list(param,this.right).subscribe((f:any)=>{
            // f.forEach(el => {
            //   this.param[el.deviceid].speed[0] = el.rate;
            //   this.param[el.deviceid].speed_name[0] = el.taskchildnum;
            // });
            for(let key in f){
              this.param[key].speed = f[key].map(m=> (m.speed));
              this.param[key].speed_name = f[key].map(m=> (m.experiment));
            }
          });
        }, 600);
      }
      
      if(o%8 ==0 )this.thrid.get_log_list(param,this.left);
      now = new Date();
      if(now.getDate() == 1){
        this.thrid.get_andon_status_year(param,this.left);
        this.thrid.get_andon_status_last_year(param,this.left);
      }

      

      
      o++;
    },1000);
    this.thrid.get_andon_status_year(param,this.left);
    this.thrid.get_andon_status_last_year(param,this.left);

    
    
  }

  goto_borad(map){
    console.log(map.router)
    if(map.router && map.show){
      this.router.navigate([map.router]);
      this.boardservice.sendLoad({close:true})
    }
  }

  get_center_data(){
    this.http.callRPC('get_andon_status_list','get_andon_status_list',{deviceid:Object.keys(this.param)}).subscribe((f:any)=>{
      if(f.result.error || f.result.message[0].code == 0)return;
      f.result.message[0].message.forEach(el => {
        this.param[el.deviceid].andon = s_role[el.status];
      });
    })
  }

  ngOnDestroy(){
    clearInterval(this.timer)
  }

}
