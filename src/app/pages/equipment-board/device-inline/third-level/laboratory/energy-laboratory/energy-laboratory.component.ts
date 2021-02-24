import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpserviceService } from '../../../../../../services/http/httpservice.service';
import { EquipmentBoardService } from '../../../../serivice/equipment-board.service';
import { s_role } from '../../../../temp/equipment-status/equipment-status.component';
import { ThirdLevelService } from '../third-level.service';

@Component({
  selector: 'ngx-energy-laboratory',
  templateUrl: './energy-laboratory.component.html',
  styleUrls: ['./energy-laboratory.component.scss']
})
export class EnergyLaboratoryComponent implements OnInit {
  list = [
    {
      name:'AVL电机8',
      number:'S1003',
      andon:0,
      speed:[],
      src:'assets/eimdoard/equipment/images/dj1_1013.jpeg',//实验图片地址
      speed_name:[''],//实验编号
      router:'pages/equipment/motor/AVL电机测试台架8/device_avlmotor_01',
    },
    {
      name:'AVL电机6',
      number:'S1013',
      andon:0,
      speed:[],
      src:'assets/eimdoard/equipment/images/dj2_1014.jpeg',//实验图片地址
      speed_name:[''],//实验编号
      router:'pages/equipment/motor2/AVL电机测试台架6/device_avlmotor_02'
    },
    {
      name:'AVL电机3',
      number:'S1010',
      andon:0,
      speed:[],
      src:'assets/eimdoard/equipment/images/dj3_1003.jpeg',//实验图片地址
      speed_name:[''],//实验编号
      router:'pages/equipment/motor3/AVL电机测试台架3/device_avlmotor_03'
    },
    {
      name:'AVL电机7',
      number:'S1014',
      andon:0,
      speed:[],
      src:'assets/eimdoard/equipment/images/dj4_1010.jpeg',//实验图片地址
      speed_name:[''],//实验编号
      router:'pages/equipment/motor4/AVL电机测试台架7/device_avlmotor_04'
    },
    {
      name:'鲁交电机1',
      number:'S1008',
      andon:0,
      speed:[],
      src:'assets/eimdoard/equipment/images/dj5_1008.jpeg',//实验图片地址
      speed_name:[''],//实验编号
      router:''
    },
    {
      name:'博阳电机5',
      number:'S1012',
      andon:0,
      speed:[],
      src:'assets/eimdoard/equipment/images/dj6_1011.jpeg',//实验图片地址
      speed_name:[''],//实验编号
      router:'pages/equipment/motor6/博阳电机测试台架5/six'
    },
    {
      name:'博阳电机4',
      number:'S1011',
      andon:0,
      speed:[],
      src:'assets/eimdoard/equipment/images/dj7_1012.jpeg',//实验图片地址
      speed_name:[''],//实验编号
      router:'pages/equipment/motor7/博阳电机测试台架4/seven',
      type:''
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
    'device_avlmotor_01':this.list[0],//AVL电机8
    'device_avlmotor_02':this.list[1],//AVL电机6
    'device_avlmotor_03':this.list[2],//AVL电机3
    "device_avlmotor_04":this.list[3],//AVL电机7
    'device_boyang_01':this.list[5],//博阳电机5
    'device_boyang_02':this.list[6],//博阳电机4
    // 'device_andmotor_01':this.list[4],//鲁交电机1
  }
  timer;
  constructor(private router:Router,private http:HttpserviceService,private thrid:ThirdLevelService,
    private boardservice:EquipmentBoardService) { }

  ngOnInit(): void {
    if(document.getElementById('head_title'))
        document.getElementById('head_title').innerText = '验证中心-新能源电机试验室';
  }

  ngAfterViewInit(){
    this.boardservice.sendLoad({close:false})

    let param = Object.keys(this.param);
    let now;
    this.timer = self.setInterval(f=>{
      this.get_center_data();
      
      this.thrid.get_log_list(param,this.left);
      now = new Date();
      if(now.getDate() == 1){
        this.thrid.get_andon_status_year(param,this.left);
        this.thrid.get_andon_status_last_year(param,this.left);
      }
    },1000);
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
    this.thrid.get_andon_status_year(param,this.left);
    this.thrid.get_andon_status_last_year(param,this.left);

    
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
