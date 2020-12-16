import {Component, OnInit} from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import {NbMenuItem} from "@nebular/theme";
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { PublicmethodService } from '../services/publicmethod/publicmethod.service';
import { HttpserviceService } from '../services/http/httpservice.service';

import { NbMenuService } from '@nebular/theme';

import { UserInfoService } from '../services/user-info/user-info.service';

import { SYSMENU, loginurl,ssotoken, MULU } from '../appconfig';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu" tag="menu" autoCollapse="true" (click)="onClickMenu()"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit {

  // menu = MENU_ITEMS;
  menu: NbMenuItem[] = [];

  constructor(private localStorageService: LocalStorageService,
    private publicservice: PublicmethodService,
    private httpservice: HttpserviceService,
    private menuservice: NbMenuService,
    private userInfoService: UserInfoService,
    private router: Router, private translate: TranslateService) {
    this.translate.onLangChange.subscribe((params) => {
      localStorage.setItem('currentLanguage', params['lang']);
      localStorage.removeItem(SYSMENU);
      localStorage.removeItem(MULU);
      this.loadMenu();
    });
    
  }

  ngOnInit() {
    console.log("pages.component------------->")
    this.loadMenu();
    
  }
  
  ngAfterViewInit(){
    var menu_:any[] = localStorage.getItem(MULU)?JSON.parse(localStorage.getItem(MULU)):[];
    setTimeout(() => {
      this.loadMenu();
      menu_ = localStorage.getItem(MULU)?JSON.parse(localStorage.getItem(MULU)):[];
    }, 1000);
  

  }

  ngOnDestory() {
    this.menuservice.addItems([], 'menu');
  }

  onClickMenu() {
    this.menuservice.onSubmenuToggle().subscribe(res => {

      const selectMenu = res.item;
      const parent = selectMenu['parent'];
      if (parent && parent.children.length) {
        parent.children.forEach(item => {
          if (selectMenu.title === item.title) {
           // item.expanded = selectMenu.title === item.title;
          } else {
            item.expanded = false;
          }
        });
      }
    });
  }

  loadMenu(){
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
    var menu_ = localStorage.getItem(MULU)?JSON.parse(localStorage.getItem(MULU)):[];
    if (menu_.length < 1){
      this.httpservice.callRPC(table, method, colums).subscribe(
        result => {
          const baseData = result['result']['message'][0];
          if (baseData["code"]===1) {
            console.log("result mulu>>>>",result)
            // 将菜单信息存储到localStorage
            this.menu.length = 0;
            const menuData = this.dataTranslation(baseData["message"]);
            localStorage.setItem(MULU, JSON.stringify(menuData));
            this.menuservice.addItems(menuData, 'menu');
          } 
          else {
            // this.router.navigate([loginurl]);
          }
        }
      );
    }else{
      this.menu.length = 0;
      this.menuservice.addItems(menu_, 'menu');
    }

    // get_systemset_menu_all  得到系统设置所有要的菜单！
    var sysmenu_ = localStorage.getItem(SYSMENU)? JSON.parse(localStorage.getItem(SYSMENU)):[];
    if (sysmenu_.length < 1){
      this.httpservice.callRPC("menu_item", "get_systemset_menu_all", colums).subscribe((result)=>{
        console.log("result menu_item>>>>",result)
        const baseData = result['result']['message'][0];
        if (baseData["code"] === 1){
          // 得到sysmenu ----------------------------------
          var sysmenu = this.menuTranslation(baseData["message"]);
          localStorage.setItem(SYSMENU, JSON.stringify(sysmenu));
          // 得到sysmenu ----------------------------------
        }else{
          localStorage.removeItem(SYSMENU)
        }
      });
    }

  }



  dataTranslation(baseMenu) {
    // console.log("得到sysmenu", baseMenu)
    // 生成父子数据结构
    let map = {};
    baseMenu.forEach(item => {
      map[item.id] = item;
    });
    let nodeData = [];
    baseMenu.forEach(item => {
      let parent = map[item.parentid];
      if (parent) {
        if (item.type != 2){ // type = 2表明是button而不是
          (parent.children || (parent.children = [])).push(item);
        }else{
          // 得到登录角色对用的按钮
        }
      } else {
        nodeData.push(item);
      }
    });
    return nodeData;
  }

  // 得到sysmenu
  menuTranslation(baseMenu) {
    
    // 生成父子数据结构
    let nodeData = [];
    baseMenu.forEach(item => {
      let map = {};
      map["id"] = item.id;
      map["link"] = item.link;
      map["active"] = item.active;
      map["orderindex"]=item.orderindex;
      map["title"] = item.title;
      map["icon"] = item.icon;
      map["type"] = item.type;
      map["textid"] = item.textid;
      map["permission"] = item.permission === null ? null: item.permission;

      if (item.parentid === null){
        map["parentid"] = 0;
      }else{
        map["parentid"] = item.parentid;
      }
      nodeData.push(map)
    });
    return nodeData;
  }


  // 记录登录
  RecordLogin(){

    if(this.userInfoService.getLoginName()){
      const source = this.userInfoService.getSourceid();        // 本机IP地址
      const employeeid = this.userInfoService.getEmployeeID();  // employeeid
      // result 1
      // info 登录
      const createdby = this.userInfoService.getLoginName();     // 登录名
      this.publicservice.record(source, employeeid, 1, '登录', createdby);
      // this.publicservice.record('local', source, employeeid, 1, '登录成功！', createdby);
      // console.log("============= 存入登录日志并得到菜单",source);
    }

  }






}
