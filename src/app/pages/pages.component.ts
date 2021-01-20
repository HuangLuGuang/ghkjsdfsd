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

// @ts-ignore
@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu" tag="menu" autoCollapse="true" (click)="onClickMenu($event,menu)"></nb-menu>
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
      localStorage.removeItem('hidden_menu');
      this.loadMenu();
    });

  }

  ngOnInit() {
    // console.log("pages.component------------->")
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

  onClickMenu(item,menu) {

    this.menuservice.onSubmenuToggle().subscribe(res => {
      const selectMenu = res.item;
      const parent = selectMenu['parent'];
      if (parent && parent.children.length) {
        parent.children.forEach(item => {
          if (selectMenu.title === item.title) {

          } else {
            item.expanded = false;

          }
        });
      }
    });

    // console.error("=======item=======",item, menu);
    var item_title = item["target"]["innerText"];
    var hidden_menu = JSON.parse(localStorage.getItem('hidden_menu'));
    hidden_menu.forEach(item=>{
      if(item["title"] === item_title){
        this.router.navigate([item.link])
      }
    })
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
            
            localStorage.setItem(SYSMENU, JSON.stringify(baseData["message"]));
            let hidden_menu = [];
            baseData["message"].forEach(item => {
              if (item.hidden === true) {hidden_menu.push(item);}
            });
            localStorage.setItem(MULU, JSON.stringify(menuData));
            localStorage.setItem('hidden_menu', JSON.stringify(hidden_menu));
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
