import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PublicmethodService } from '../../../services/publicmethod/publicmethod.service';

declare let layui;

declare let $;

@Component({
  selector: 'ngx-andon',
  templateUrl: './andon.component.html',
  styleUrls: ['./andon.component.scss']
})
export class AndonComponent implements OnInit {

  constructor(private publicservice: PublicmethodService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.publicservice.get_current_url().subscribe(result=>{
    //   var url = String(result);
    //   console.log("----get_current_pathname-----------", url);
    //   // ["http://localhost:4200/popus/andon", "assetno=3001238"]
    //   var url_params = url.split("?")[1];
    //   var assetno = url_params.split("=")[1];
    //   console.log("andon---<", assetno)
      
    // })
    
    // param
    let param = this.route.snapshot.queryParams["assetno"];
    console.log("andon---param<", param)

  }



  

}
