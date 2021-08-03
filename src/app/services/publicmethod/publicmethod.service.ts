import { Injectable } from "@angular/core";

import { NbDialogService, NbToastrService } from "@nebular/theme";
import { Data } from "../../appconfig";

import { PlatformLocation } from "@angular/common";
import { observable, Observable, Subject } from "rxjs";
import { HttpserviceService } from "../http/httpservice.service";
import { HttpHeaders } from "@angular/common/http";
import {
  loginurl,
  INFO_API,
  SYSMENU,
  ssotoken,
  menu_button_list,
  MULU,
} from "../../appconfig";
import { DatePipe } from "@angular/common";

// ngx-toastr
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";

// token 过期提示
import { ExpiredTokenComponent } from "../../pages-popups/token-diallog/expired-token/expired-token.component";

// 订阅
import { BehaviorSubject } from "rxjs";
import { UserInfoService } from "../user-info/user-info.service";
import { NzModalRef, NzModalService } from "ng-zorro-antd/modal";

@Injectable({
  providedIn: "root",
})
export class PublicmethodService {
  constructor(
    private toatrservice: NbToastrService,
    private location: PlatformLocation,
    private httpservice: HttpserviceService,
    private ngxtoastrservice: ToastrService,
    private datepipe: DatePipe,
    private router: Router,
    private dialogService: NbDialogService,
    private modal: NzModalService
  ) {}

  /**
   * 弹出提示
   */
  public toastr(data: Data) {
    var position = data.position;
    var status = data.status;
    var conent = data.conent;
    this.toatrservice.show(status, conent, { position, status });
  }

  showConfirm(title: string, content: string): NzModalRef {
    let ref: NzModalRef;
    ref = this.modal.confirm({
      nzTitle: "<b>" + title + "</b>",
      nzContent: "<b>" + content + "</b>",
      nzOkText: "确认",
      nzOnOk: () => 1,
      nzCancelText: "取消",
      nzOnCancel: () => 0,
    });
    return ref;
  }

  public showngxtoastr(data) {
    var position = data.position;
    var status = data.status;
    var conent = data.conent;
    // console.log("展示状态", data, position, status,conent)
    switch (status) {
      case "info":
        this.ngxtoastrservice.info(status, conent, {
          positionClass: position,
          // timeOut: 300,
          onActivateTick: true,
        });
        break;
      case "success":
        this.ngxtoastrservice.success(status, conent, {
          positionClass: position,
          // timeOut: 200,
          onActivateTick: true,
        });
        break;
      case "warning":
        this.ngxtoastrservice.warning(status, conent, {
          positionClass: position,
          // timeOut: 200,
          onActivateTick: true,
        });
        break;
      case "danger":
        this.ngxtoastrservice.warning(status, conent, {
          positionClass: position,
          // timeOut: 200,
          onActivateTick: true,
        });
        break;
      case "error":
        this.ngxtoastrservice.error(status, conent, {
          positionClass: position,
          // timeOut: 200,
          onActivateTick: true,
        });
        break;
    }
  }

  // 得到当前的url
  public get_current_url() {
    for (const i in this.location) {
      if (i === "location") {
        return new Observable((observe) => {
          observe.next(this.location[i].href);
        });
      }
    }
  }

  // 得到当前界面的 url对应的 id
  get_url_withid(title) {
    // console.error("title>>>>", title);

    return new Observable((observe) => {
      var sysmenu =
        localStorage.getItem(SYSMENU) === null
          ? []
          : JSON.parse(localStorage.getItem(SYSMENU));

      sysmenu.forEach((element) => {
        if (element["type"] === 1 && element["link"].indexOf(title) !== -1) {
          observe.next(element);
        } else {
          observe.next();
        }
      });
    });
  }

  // 目录 title对应的 id
  get_menu_withid(title) {
    // console.error("title>>>>", title);

    return new Observable((observe) => {
      var sysmenu =
        localStorage.getItem(SYSMENU) === null
          ? []
          : JSON.parse(localStorage.getItem(SYSMENU));

      sysmenu.forEach((element) => {
        if (element["type"] === 1 && element["title"] == title) {
          observe.next(element);
        } else {
          observe.next();
        }
      });
    });
  }

  // 得到当前的url 文件路径
  public get_current_pathname() {
    return new Observable((observe) => {
      var sysmenu =
        localStorage.getItem(SYSMENU) === null
          ? []
          : JSON.parse(localStorage.getItem(SYSMENU));
      if (sysmenu.length < 1) {
        this.getMenu().subscribe((data) => {
          const colums = {
            languageid: this.httpservice.getLanguageID(),
            roles: data,
          };
          const table = "menu_item";
          const method = "get_systemset_menu_all";
          this.httpservice
            .callRPC(table, method, colums)
            .subscribe((result) => {
              // 会话过期
              const baseData = result["result"]["message"][0];
              if (baseData["code"] === 1) {
                var menu = this.dataTranslation(baseData["message"]);
                localStorage.setItem(SYSMENU, JSON.stringify(menu));
                for (const i in this.location) {
                  if (i === "location") {
                    menu.forEach((element) => {
                      // console.log("^^^^^^^element['link]",element["link"])
                      // console.log("^^^^^^^this.location[i].pathname",this.location[i].pathname)
                      if (
                        element["link"] === this.location[i].pathname ||
                        this.location[i].pathname.search(element["link"]) != -1
                      ) {
                        observe.next(element);
                      }
                    });
                  }
                }
              }
            });
        });
      } else {
        // console.log("***********sysmenu is exic")
        for (const i in this.location) {
          if (i === "location") {
            sysmenu.forEach((element) => {
              // console.log("^^^^^^^this.location[i].pathname",this.location[i].pathname)
              if (
                element["link"] === this.location[i].pathname ||
                this.location[i].pathname.search(element["link"]) != -1
              ) {
                observe.next(element);
              } else {
                // console.log("得到当前的url 文件路径",element)
              }
            });
          }
        }
      }
    });
  }

  dataTranslation(baseMenu) {
    // 生成父子数据结构
    let nodeData = [];
    baseMenu.forEach((item) => {
      let map = {};
      map["id"] = item.id;
      map["link"] = item.link;
      map["active"] = item.active;
      map["orderindex"] = item.orderindex;
      map["title"] = item.title;
      map["icon"] = item.icon;
      map["type"] = item.type;
      map["textid"] = item.textid;
      map["permission"] = item.permission === null ? null : item.permission;

      if (item.parentid === null) {
        map["parentid"] = 0;
      } else {
        map["parentid"] = item.parentid;
      }
      nodeData.push(map);
    });

    return nodeData;
  }

  // 得到当前的url ？参数
  public get_current_search() {
    for (const i in this.location) {
      if (i === "location") {
        return this.location[i].search;
      }
    }
  }

  // 加密解密 userInfo
  // 加密
  public compileStr(code) {
    let c = String.fromCharCode(code.charCodeAt(0) + code.length);
    for (let i = 1; i < code.length; i++) {
      c += String.fromCharCode(code.charCodeAt(i) + code.charCodeAt(i - 1));
    }
    return escape(c);
  }

  // 解密
  public uncompileStr(code) {
    code = unescape(code);
    let c = String.fromCharCode(code.charCodeAt(0) - code.length);
    for (let i = 1; i < code.length; i++) {
      c += String.fromCharCode(code.charCodeAt(i) - c.charCodeAt(i - 1));
    }
    return c;
  }

  // 写入系统日志
  public record(
    source: string,
    employeeid: number,
    result: number,
    info: string,
    createdby: string
  ) {
    /*
     */
    const table = "sys_security_log";
    const method = "insert_sys_login_log";
    const operationmessage = {
      source: source, // IP
      employeeid: employeeid, // 登录ID
      result: result, // 结果 0 失败 1 成功
      info: info, // 描述 登录、登出
      createdby: createdby, // 登录人
    };
    this.httpservice
      .callRPC(table, method, operationmessage)
      .subscribe((res) => {
        console.warn("SecurityLogService>>", res);
      });
  }

  // 写入操作日志
  public option_record(
    employeeid: number,
    result: number,
    transactiontype: string,
    info: string,
    createdby: string
  ) {
    /*
     */
    const table = "sys_transaction_log";
    const method = "insert_sys_transaction_log";
    const operationmessage = {
      employeeid: employeeid, // 登录ID
      result: result, // 结果 0 失败 1 成功
      transactiontype: transactiontype, // 类型：新增、删除、修改、查看、导入导出等！
      info: info, // 具体操作！
      createdby: createdby, // 登录人
    };
    this.httpservice
      .callRPC(table, method, operationmessage)
      .subscribe((res) => {
        console.warn("option_record>>", res);
      });
  }

  // 得到用户菜单
  getMenu() {
    // ============= 存入登录日志并得到菜单
    /*
     * 应该是根据用户名对应的roleid
     */
    return new Observable((observe) => {
      let roles = [];
      const userinfoStr = localStorage.getItem("ssouserinfo");
      const userinfo = userinfoStr ? this.uncompileStr(userinfoStr) : null;
      //  console.warn("userinfo>>", userinfo);
      const roleList = userinfo ? JSON.parse(userinfo)["roles"] : null;
      if (roleList ? roleList.length : null) {
        roleList.forEach((val) => {
          roles.push(val["roleid"]);
        });
      } else {
        roles = null;
      }
      observe.next(roles);
    });
  }

  // 得到当前日期和时间
  getcurdate() {
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var date = today.getDate();

    var hour = today.getHours();
    var minute = today.getMinutes();
    var second = today.getSeconds();

    return [hour, minute, second];
  }

  // 得到时间范围，默认 昨天---今天,改为本月1号至当前
  get_curr_mounth_one() {
    // 得到 本月1号
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var date = "01";
    var curr_mounth_one = year + "-" + month + "-" + date;
    return [
      this.formatdata(new Date(curr_mounth_one), "yyyy-MM-dd"),
      this.formatdata(new Date(), "yyyy-MM-dd"),
    ];
  }

  public selectedMoments = [
    // new Date(new Date().getTime() - 86400000), // 昨天  getTime() 毫秒数
    this.formatdata(new Date(new Date().getTime() - 86400000), "yyyy-MM-dd"),
    this.formatdata(new Date(), "yyyy-MM-dd"),
  ];

  // 将日期格式化
  formatdata(data, format) {
    return this.datepipe.transform(data, format);
    // return this.datepipe.transform(data,'yyyy-MM-dd HH:mm:ss')
  }

  // lauyi需要得到 header，
  getheader() {
    var token = JSON.parse(localStorage.getItem(ssotoken))
      ? JSON.parse(localStorage.getItem(ssotoken))
      : false;
    if (token) {
      const opts = {
        headers: "Authorization" + ":" + "Bearer " + token.token, // tslint:disable-line:object-literal-key-quotes
      };
      return opts;
    }
  }

  // ==========================================
  // 非父子组件见的传值
  // 订阅的属性：用来给订阅方存储数据
  public currentcomponent = new BehaviorSubject<any>(null);

  // 订阅的方法：用来接受数据
  getcomponent(component: any): void {
    this.currentcomponent.next(component);
  }

  // 订阅的属性：用来给订阅方存储数据
  public currentmethod = new BehaviorSubject<string>(null);

  // 订阅的方法：用来接受数据
  getmethod(method: string): void {
    this.currentmethod.next(method);
  }

  // 试验任务配置--新增--待处理试验和 新增试验任务信息组件 通讯

  public TeskMessage = new BehaviorSubject<Boolean>(false);

  TeskChangeMessage(message: Boolean): void {
    this.TeskMessage.next(message);
  }

  // 报警管理---》集中监控 点击查看视频时，切换视频
  public VideoMessage = new Subject<any>();
  ChangeVideo(message: any): void {
    this.VideoMessage.next(message);
  }

  // ==========================================

  // -----------------------------------------页面得到 权限buttons

  get_buttons() {
    return new Observable((observale) => {
      this.getMenu().subscribe((data) => {
        if (data) {
          const colums = {
            languageid: this.httpservice.getLanguageID(),
            roles: data,
          };
          const table = "menu_item";
          const method = "get_menu_by_roles";
          this.httpservice
            .callRPC(table, method, colums)
            .subscribe((result) => {
              const baseData = result["result"]["message"][0];
              // 得到具有的按钮列表 ------------------------------
              var button_list = [];
              baseData.forEach((element) => {
                if (element["type"] === 2) {
                  var method = element["permission"].split(":")[1];
                  // info success warning danger  primary
                  switch (method) {
                    case "add":
                      element["class"] = "info";
                      break;
                    case "del":
                      element["class"] = "danger";
                      break;
                    case "edit":
                      element["class"] = "warning";
                      break;
                    case "query":
                      element["class"] = "success";
                      break;
                    case "import":
                      element["class"] = "primary";
                      break;
                    case "download":
                      element["class"] = "primary";
                      break;
                  }
                  button_list.push(element);
                }
              });
              localStorage.setItem(
                menu_button_list,
                JSON.stringify(button_list)
              );
              observale.next(button_list);
            });
        } else {
        }
      });
    });
  }

  get_buttons_bypath(roleid) {
    // 得到pathname --在得到button
    return new Observable((observe) => {
      this.get_current_pathname().subscribe((result) => {
        if (result["type"] === 1 && result["link"] != "") {
          var link = result["link"];
          // console.warn("pathname: ", result, "link: ", link);
          // 更具link 得到button
          var table = "menu_item";
          var method = "get_button";
          // var columns = {redirecturl: link}
          var columns = { redirecturl: link, roleid: roleid };
          this.httpservice
            .callRPC(table, method, columns)
            .subscribe((result) => {
              // console.log("get_button: ", result);
              if (result["result"]["message"][0]["code"] === 1) {
                // console.log("--------->", result["result"]["message"][0]["message"])
                var button = result["result"]["message"][0]["message"];
                for (var k in button) {
                  // this.button[k]["class"] = this.buttons[k]["class"];
                  switch (k) {
                    case "add":
                      button[k]["class"] = "info";
                      break;
                    case "del":
                      button[k]["class"] = "danger";
                      break;
                    case "edit":
                      button[k]["class"] = "warning";
                      break;
                    case "query":
                      button[k]["class"] = "success";
                      break;
                    case "import":
                      button[k]["class"] = "info";
                      break;
                    case "download":
                      button[k]["class"] = "primary";
                      break;

                    default:
                      button[k]["class"] = "primary";
                      break;
                  }
                }
                observe.next(button);
              }
            });
        } else {
          // console.log("button，必须是在菜单中！",result)
        }
      });
    });
  }

  // -----------------------------------------页面得到 权限buttons

  // 会话过期，弹出提示框
  session_expiration() {
    return new Observable((observable) => {
      var isdialg = localStorage.getItem("token_expired");
      if (JSON.parse(isdialg)) {
        localStorage.setItem("token_expired", "false");
        this.dialogService
          .open(ExpiredTokenComponent, {
            closeOnBackdropClick: false,
            autoFocus: true,
          })
          .onClose.subscribe((name) => {
            console.log("token已过期，是否重新登录？", name);
            if (name) {
              localStorage.removeItem(ssotoken);
              // 删除之前的缓存
              localStorage.removeItem(MULU);
              location.href = loginurl;
              // this.router.navigate([loginurl])
              // localStorage.removeItem('token_expired');
            } else {
            }
            observable.next(false); // 表示不可请求
          });
      } else {
        observable.next(true);
      }
    });
  }
}
