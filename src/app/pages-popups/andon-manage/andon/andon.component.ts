import { Component, OnInit } from '@angular/core';
import { PublicmethodService } from '../../../services/publicmethod/publicmethod.service';

@Component({
  selector: 'ngx-andon',
  templateUrl: './andon.component.html',
  styleUrls: ['./andon.component.scss']
})
export class AndonComponent implements OnInit {

  constructor(private publicservice: PublicmethodService) { }

  ngOnInit(): void {

    this.publicservice.get_current_url().subscribe(res=>{
      console.log("----get_current_pathname-----------", res)

    })
  }

  // menu

  openMap: { [name: string]: boolean } = {
    sub1: true,
    sub2: false,
    sub2_1: false,
    sub2_2: false,
    sub3: false
  };

  openHandler(value: string): void {
    for (const key in this.openMap) {
      if (key !== value) {
        this.openMap[key] = false;
      }
    }
  }


  

}
