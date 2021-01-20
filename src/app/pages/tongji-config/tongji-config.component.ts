import { Component, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { HttpserviceService } from '../../services/http/httpservice.service';
import { PublicmethodService } from '../../services/publicmethod/publicmethod.service';
@Component({
  selector: 'ngx-tongji-config',
  templateUrl: './tongji-config.component.html',
  styleUrls: ['./tongji-config.component.scss']
})
export class TongjiConfigComponent implements OnInit {

  constructor(private publicservice:PublicmethodService,  private httpservice: HttpserviceService, private router:Router) {
    this.get_children();

   }

  ngOnInit(): void {
    // 监听路由
    this.isDocument =  this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        var url = event.url;
        this.index = this.url_after_path[url.split("/").pop()]
      }
    });

    // 刷新时得到url
    this.publicservice.get_current_url().subscribe((res:string)=>{
      // if (res.search("/pages/dataimport/target_hour_config/hour_config") !== -1){
      //   console.error("+++++++++++++index：", this.index);
      // }
      this.index = this.url_after_path[res.split("/").pop()]
    })

    // ======= 使用 NbDialog 切换标签时，无法再次弹出问题！
    if (document.getElementsByClassName('cdk-overlay-container').length < 1){
      var dom = document.createElement("div");
      dom.className = "cdk-overlay-container"
      document.getElementsByTagName("nb-layout")[0].appendChild(dom)
    }

  }

  ngAfterViewInit(){
    setTimeout(() => {
      // console.log("children>>>>",this.children);
    }, 500);
  }
  ngOnDestroy(){
    this.isDocument.unsubscribe();
  }

  // 标签页数据
  children;
  index = 0;
  isDocument;
  // 根据url最后一个路径确定 index的值
  url_after_path = {
    hour_config: 0,
    tesk_config: 1,
    result_config: 2,
  }
  // 切换页签
  toggle_config(item){
    this.router.navigate([item["link"]])
  }

  // 得到统计分析下的子菜单
  get_children(){
    var baseData = JSON.parse(localStorage.getItem("mulu"));
    this.publicservice.get_current_pathname().subscribe(res=>{
      if (res["link"] != ""){
        var link = res["link"];
        const menuData = this.dataTranslation(baseData);
        menuData.forEach(item=>{
          if (item["link"] === link ){
            var children = item["children"] 
            this.children = children.filter((item)=>{if (item["type"]===1){return item}});
          }
        })
        
      }
    })
    
  }

  dataTranslation(baseMenu:any[]) {
    // 生成父子数据结构
    let map = {};
    baseMenu.forEach(item => {
      map[item.id] = item;
    });
    let nodeData = [];
    baseMenu.forEach(item => {
      if (item.type == 2)return;
      let parent = map[item.parentid];
      if (parent) {
          (parent.children || (parent.children = [])).push(item);
      } else {
        nodeData.push(item);
      }
    });
    return nodeData;
  }

}
