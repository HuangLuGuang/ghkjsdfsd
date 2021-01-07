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
    this.publicservice.get_current_pathname().subscribe(res=>{
      if (res["link"] != ""){
        var link = res["link"]
        // 得到菜单
        let roles = [];
        const userinfoStr = localStorage.getItem('ssouserinfo');
        const userinfo = userinfoStr ? this.publicservice.uncompileStr(userinfoStr) : null;
        const roleList = userinfo ? JSON.parse(userinfo)["roles"] : null;
        if (roleList ? roleList.length : null) {
          roleList.forEach(val => {
            roles.push(val["roleid"]);
          });
        } else {
          roles = null;
        }
        const colums = {
          languageid: this.httpservice.getLanguageID(),
          roles: roles
        };
        const table = "menu_item";
        const method = "get_menu_by_roles";
        this.httpservice.callRPC(table, method, colums).subscribe(
          result => {
            const baseData = result['result']['message'][0];
            if (baseData["code"]===1) {
              const menuData = this.dataTranslation(baseData["message"]);
              // console.log("menuData>>>>",menuData);
              menuData.forEach(item=>{
                if (item["link"] === link){
                  var children = item["children"] 
                  this.children = children;

                }
              })
            } 
            else {
            }
          }
        );

      }
    })
    
  }

  dataTranslation(baseMenu) {
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
