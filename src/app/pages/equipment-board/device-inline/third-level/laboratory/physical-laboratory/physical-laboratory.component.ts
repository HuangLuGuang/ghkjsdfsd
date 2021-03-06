import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpserviceService } from '../../../../../../services/http/httpservice.service';
import { EquipmentBoardService } from '../../../../serivice/equipment-board.service';
import { ThirdLevelService } from '../third-level.service';

@Component({
  selector: 'ngx-physical-laboratory',
  templateUrl: './physical-laboratory.component.html',
  styleUrls: ['./physical-laboratory.component.scss']
})
export class PhysicalLaboratoryComponent implements OnInit {
  list = [
    {
      name:'整车voc环境仓',
      number:'',
      andon:0,
      speed:[],
      src:'assets/eimdoard/equipment/images/slz.png',//实验图片地址
      speed_name:[''],//实验编号
      router:'/pages/equipment/vehicle/整车voc环境仓',
    },
    {
      name:'氙灯集中监控',
      number:'',
      andon:0,
      speed:[],
      src:'',//实验图片地址
      speed_name:[''],//实验编号
      router:'/pages/equipment/xenon/氙灯老化设备集中监控',
    },
    {
      name:'纯水系统',
      number:'',
      andon:0,
      speed:[],
      src:'',//实验图片地址
      speed_name:[''],//实验编号
      router:'/pages/equipment/pure/纯水系统',
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
    'device_auto_voc01':this.list[0],//整车voc环境仓
    'device_atlas_4000':this.list[1],//氙灯集中监控ci4000
    'device_atlas_4400':this.list[1],//氙灯集中监控ci4400
    'device_purewater_01':this.list[2],//纯水
    // 'device_avlmotor_03':this.list[2],//纯水系统
  }
  timer;
  constructor(private router:Router,private http:HttpserviceService,private thrid:ThirdLevelService,
    private boardservice:EquipmentBoardService) { }

  ngOnInit(): void {
    if(document.getElementById('head_title'))
        document.getElementById('head_title').innerText = '理化与环保试验室';
  }

  ngAfterViewInit(){
    this.boardservice.sendLoad({close:false})

    let param = Object.keys(this.param);
    let now;
    this.timer = self.setInterval(f=>{
      this.get_center_data();
      this.thrid.get_device_taskinfo_list(param,this.right).subscribe((f:any)=>{
        for(let key in f){
          this.param[key].speed = f[key].map(m=> (m.speed));
          this.param[key].speed_name = f[key].map(m=> (m.experiment));
        }
      });
      this.thrid.get_log_list(param,this.left);
      now = new Date();
      if(now.getDate() == 1){
        this.thrid.get_andon_status_year(param,this.left);
        this.thrid.get_andon_status_last_year(param,this.left);
      }
    },1000)
    this.thrid.get_andon_status_year(param,this.left);
    this.thrid.get_andon_status_last_year(param,this.left);

    
    setTimeout(() => {
      
      this.right.initChart();
    }, 1000);
  }

  goto_borad(map){
    if(map.router){
      this.router.navigate([map.router]);
      this.boardservice.sendLoad({close:true})
    }
  }

  get_center_data(){
    
  }

  ngOnDestroy(){
    clearInterval(this.timer)
  }

}
