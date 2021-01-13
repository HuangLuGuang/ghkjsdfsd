import { Component, Input, OnInit } from '@angular/core';
import { HttpserviceService } from '../../../../services/http/httpservice.service';

@Component({
  selector: 'ngx-equip-introduce',
  templateUrl: './equip-introduce.component.html',
  styleUrls: ['./equip-introduce.component.scss']
})
export class EquipIntroduceComponent implements OnInit {

   //设备介绍
  @Input() equipIntroduceList = [];
  //当前的页数
  @Input()  eqIntShow = 0;
  @Input()  title = '';
  @Input() deviceid = '';
  @Input() translateTime = 9000;
  @Input() boardName = '';

  timer_1:any;
  constructor(private http:HttpserviceService) { }

  ngOnInit(): void {
    this.timer_1 = setInterval(f =>{
      this.eqIntShow = this.eqIntShow >=this.equipIntroduceList.length-1 ?0:this.eqIntShow+1;
    },this.translateTime)
  }

  getData(){
    this.http.callRPC('','',{boardname:this.boardName}).subscribe(f=>{

    })
  }

  //组件销毁
  ngOnDestroy(){
    clearInterval(this.timer_1)
    
  }

}
