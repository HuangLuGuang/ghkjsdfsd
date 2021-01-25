import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService, NbDialogService } from '@nebular/theme';

import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

// 初始化应用程序的翻译服务
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../setup/auth/auth.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../services/local-storage/local-storage.service';
import { ssotoken,  loginurl, MULU, SYSMENU, SYSMENUEDIT, SSOUSERINFO, SYSROLE, SYSROLEMENU,menu_button_list,employee_action, LOGIN_INFO, ECHARTS_RESIZE } from '../../../appconfig';
import { UserInfoService } from '../../../services/user-info/user-info.service';

import { HttpHeaders,HttpClient,  } from '@angular/common/http';
import { PublicmethodService } from '../../../services/publicmethod/publicmethod.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;

  themes = [
      {
        value: "default",
        name: "明亮"
      },
      {
        value: "dark",
        name: "黑暗"
      },
      {
        value: "cosmic",
        name: "宇宙"
      },
      {
        value: "corporate",
        name: "企业"
      }
  ];

  currentTheme = 'default';






  currentLangue = 'zh-CN';
  langues = [
    {
      value: 'zh-CN',
      name: '简体中文',
    },
    {
      value: 'en-US',
      name: 'English',
    },
  ];

  userMenu = [ { title: '退出登录'}];
  // userMenu = [ { title: '修改密码'}, { title: '注销用户'} ];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private userService: UserData,
              private layoutService: LayoutService,
              private breakpointService: NbMediaBreakpointsService,

              private localStorageService: LocalStorageService,
              private translate: TranslateService,
              private authService: AuthService,
              private router: Router,
              private dialogService: NbDialogService,
              private userinfoservice: UserInfoService,
              private publicservice: PublicmethodService,
              private http: HttpClient,
  ) {
    // 加载时，进行翻译
    this.currentLangue = localStorage.getItem('currentLanguage') == null ? this.currentLangue : localStorage.getItem('currentLanguage') ;
    this.translate.setDefaultLang(this.currentLangue);
    localStorage.setItem('currentLanguage', this.currentLangue);

    console.log("当前语言",this.currentLangue);
    // var currentTheme = this.localStorageService.get("currentTheme");
    // if (currentTheme == null){
    //   this.currentTheme = 'default';
    //   this.localStorageService.set("currentTheme", {"currentTheme": "default"});
    // }else{
    //   this.currentTheme = currentTheme.currentTheme;
    // }
    // console.log("currentTheme--->", this.currentTheme)


  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;

    this.userService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: any) => {
        // this.user = users.nick
        var token = this.localStorageService.get(ssotoken)? this.localStorageService.get(ssotoken): false;
        var name = this.userinfoservice.getName();// zh name
        if(token){
          // this.user = {name: token.name, picture: token.picture};
          this.user = {name: name, picture: token.picture};
        }
      });

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);
    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
      this.menuService.onItemClick().subscribe((event)=>{
        console.log("event", event);
        this.alet_is_logout(event.item.title)
      })
       //进入项目时面板的图表的初始化宽度的问题发的消息
    this.layoutService.initLayoutSize();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  default_icon = "arrowhead-left-outline"; // arrowhead-left-outline <<  arrowhead-right-outline >>

  toggleSidebar(): boolean {
    var echarts_resize = localStorage.getItem(ECHARTS_RESIZE) === null ?  false: JSON.parse(localStorage.getItem(ECHARTS_RESIZE));
    localStorage.setItem(ECHARTS_RESIZE, String(!echarts_resize));
    // 调用echar 自定义js
    // ---------------------------
    //       设备kpi报表
    // kpi_detail.resize();

    // ---------------------------
    this.sidebarService.toggle(false, 'menu-sidebar');
    this.layoutService.changeLayoutSize();
    if (this.default_icon === "arrowhead-left-outline"){
      this.default_icon = "arrowhead-right-outline"
    }else{
      this.default_icon = "arrowhead-left-outline"
    }

    return false;
  }

  navigateHome() {
    // this.menuService.navigateHome();
    this.router.navigate(['/pages']);
    return false;
  }

  // 语言切换
  changeLangue(langueName: string){
    // console.log("您选择的语言是： ", langueName);
    localStorage.setItem('currentLanguage', langueName);
    // en-US  zh-CN
    this.translate.use(langueName);
    // this.themeService.changeTheme(this.themeService.currentTheme);
    if (langueName == 'en-US'){
      this.userMenu = [ { title: 'Log out' }];
      // console.log("您选择的语言是： 英文！",this.themes);


    }else{
      // console.log("您选择的语言是： 中文！");

      this.userMenu = [ { title: '退出登录'}];

    }
    // console.log("this.currentTheme  ", this.currentTheme);
    // location.reload();


  }

  // 注销用户、修改密码
  alet_is_logout(title){
    // 退出登录
    if (title == this.userMenu[0]["title"]){
      this.authService.isLoggedIn = false;
      this.RecordLogin()
      localStorage.removeItem(MULU);
      localStorage.removeItem(SYSMENU);


      // localStorage.removeItem(ssotoken);

      // this.router.navigate([loginurl]);

      // 根据admin_app_token 是否存在，判断是admin 私用 还是单点 adminloginurl

      // 获取用户名
      var login_info = localStorage.getItem(LOGIN_INFO);
      console.log("----------------------->login_info",login_info)
      // if (login_info && JSON.parse(login_info)["username"] === "admin"){
      //   console.log("退出，获取用户名")
      //   localStorage.removeItem(MULU);
      //   localStorage.removeItem(SYSMENU);
      //   localStorage.removeItem(ssotoken);

      //   localStorage.removeItem(SSOUSERINFO);
      //   localStorage.removeItem(SYSROLE);
      //   localStorage.removeItem(SYSROLEMENU);

      //   // // menu_button_list,employee_action
      //   localStorage.removeItem(menu_button_list);
      //   localStorage.removeItem(employee_action);
      //   this.router.navigate([loginurl]);
      // }else{
        
      // }

      // 这里是SSO登录需要调用 接口注销 token
      var ticket = this.localStorageService.get(ssotoken)? this.localStorageService.get(ssotoken): false;
      console.log("退出，获取用户名, 应该是ticket",ticket);
      localStorage.removeItem(menu_button_list);
      localStorage.removeItem(employee_action);
      if (ticket){
        var _ticket = ticket.ticket;
        if (_ticket !== undefined){
          var redirectUrlIp = localStorage.getItem("redirectUrlIp");
          // var geely_cancel_token = `http://10.190.69.78/geely-cancel-token/${_ticket}`;
          var geely_cancel_token = `http://${redirectUrlIp}/geely-cancel-token/${_ticket}`;
          this.http.delete(geely_cancel_token).subscribe((res)=>{
            console.log("这里是SSO登录需要调用 接口注销 token> res: ", res);
            if(res["code"] === "success"){
              localStorage.removeItem(ssotoken);
              localStorage.removeItem(SSOUSERINFO);
              localStorage.removeItem(SYSROLEMENU);
              localStorage.removeItem("redirectUrlIp");
              localStorage.removeItem("SSO"); // auth
              console.log("这是注销==url")
              this.router.navigate([loginurl]);
            }else{
              console.log("----====-----header", "退出注销token失败！")
            }
          })
        }else{
          localStorage.removeItem(ssotoken);
          localStorage.removeItem(SSOUSERINFO);
          localStorage.removeItem("SSO"); // auth
          this.router.navigate([loginurl]);
        }
        
      }else{
        localStorage.removeItem(ssotoken);
        localStorage.removeItem(SSOUSERINFO);
        localStorage.removeItem("SSO"); // auth
        this.router.navigate([loginurl]);
      }
      localStorage.removeItem(MULU);
      localStorage.removeItem('hidden_menu');
      localStorage.removeItem(SYSMENU);
      localStorage.removeItem(ssotoken);

      localStorage.removeItem(SSOUSERINFO);
      localStorage.removeItem(SYSROLE);
      localStorage.removeItem(SYSROLEMENU);


    }

   

  }


   // 记录登出
   RecordLogin(){

    if(this.userinfoservice.getLoginName()){
      // const source = this.userinfoservice.getSourceid();        // 本机IP地址
      // const source = this.userinfoservice.getClientip();        // 客户端IP地址,
      const source = this.userinfoservice.getUserip();        // 客户端IP地址,
      const employeeid = this.userinfoservice.getEmployeeID();  // employeeid
      // result 1
      // info 登录
      const createdby = this.userinfoservice.getLoginName();     // 登录名
      this.publicservice.record(source, employeeid, 1, '登出', createdby);
    }
    console.log("this.userinfoservice.getLoginName()", this.userinfoservice.getLoginName())

  }

}
