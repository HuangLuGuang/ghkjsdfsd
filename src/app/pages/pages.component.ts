import {Component, OnInit} from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import {NbMenuItem} from "@nebular/theme";
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import { PublicmethodService } from '../services/publicmethod/publicmethod.service';
import { HttpserviceService } from '../services/http/httpservice.service';

import { NbMenuService } from '@nebular/theme';


import { UserInfoService } from '../services/user-info/user-info.service';

import { SYSMENU, loginurl } from '../appconfig';
import { Router } from '@angular/router';

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
    private router: Router) {

  }

  ngOnInit() {
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




  dataTranslation(baseMenu) {
    console.log("得到sysmenu", baseMenu)
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
      console.log("============= 存入登录日志并得到菜单",source);
    }

  }



  


}
