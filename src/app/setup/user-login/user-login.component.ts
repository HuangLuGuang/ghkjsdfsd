import { Component, OnInit } from "@angular/core";

import { Router } from "@angular/router";

// 验证器函数
import { Validators } from "@angular/forms";
// 使用 FormBuilder 来生成表单控件
import { FormBuilder, FormGroup } from "@angular/forms";
import { LocalStorageService } from "../../services/local-storage/local-storage.service";

// config
import {
  url,
  salt,
  ssotoken,
  afterloginurl,
  LOGIN_API,
  INFO_API,
  ssopassword,
  loginurl,
  SSOUSERINFO,
  LOGIN_INFO,
} from "../../appconfig";
import { HttpserviceService } from "../../services/http/httpservice.service";
import { HttpHeaders, HttpClient } from "@angular/common/http";
// Md5 加密
import { Md5 } from "ts-md5";
import { PublicmethodService } from "../../services/publicmethod/publicmethod.service";
import { map } from "rxjs/operators";

// user-info 服务
import { UserInfoService } from "../../services/user-info/user-info.service";

import { Observable } from "rxjs";

import { SYSMENU, MULU } from "../../appconfig";

// 环境
import { environment } from "../../../environments/environment";

@Component({
  selector: "ngx-user-login",
  templateUrl: "./user-login.component.html",
  styleUrls: ["./user-login.component.scss"],
})
export class UserLoginComponent implements OnInit {
  // 来生成表单控件响应式表单组
  profileForm: FormGroup;

  checked: boolean;
  username: string;
  password: any;
  passwordmd5_salt: any;

  DataSuccess: any = {
    position: "top-right",
    status: "success",
    conent: "登录成功！",
  };
  DataDanger: any = {
    position: "top-right",
    status: "danger",
    conent: "登录失败！",
  };

  // 加载
  loading = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private localStorageService: LocalStorageService,
    private httpserviceService: HttpserviceService,
    private http: HttpClient,
    private publicmethodService: PublicmethodService,
    private userInfoService: UserInfoService
  ) {
    localStorage.removeItem("alert401flag");

    // localStorage.clear();
    localStorage.removeItem(SYSMENU);
    localStorage.removeItem(MULU);
    localStorage.removeItem("hidden_menu");

    // 得到本地ip
    this.publicmethodService.get_current_url().subscribe((res: string) => {
      // console.error("******************, ",res ); http://127.0.0.1:4200/setup/login
      this.redirectUrl = res;
      this.redirectUrlIp = res.split("/")[2];
      localStorage.setItem("redirectUrlIp", this.redirectUrlIp);
    });
  }

  redirectUrl = "http://10.190.69.78/setup/login"; // 默认是78
  redirectUrlIp = "10.190.69.78"; //默认是78

  ngOnInit(): void {
    console.log("统一认证");
    this.proofSso();
    // 得到传递来的参数！

    // 初始化界面时，检查是否记住密码？
    // this.initLogin();
  }

  // 登录按钮！
  onSubmit() {
    if (
      this.username === this.profileForm.value.username &&
      this.username != ""
    ) {
      this.passwordmd5_salt = this.profileForm.value.password.toString();
      this.username = this.profileForm.value.username;
    } else {
      this.username = this.profileForm.value.username;
      this.passwordmd5_salt = Md5.hashStr(
        this.profileForm.value.password.toString() + salt
      );
    }

    if (this.checked) {
      // 表示记住密码
      var login_info = {
        username: this.username,
        password: this.passwordmd5_salt,
        checked: true,
      };
      localStorage.setItem(LOGIN_INFO, JSON.stringify(login_info));
    }

    // 请求判断是否正确并得到token
    this.httpserviceService
      .post(LOGIN_API, {
        username: this.username,
        password: this.passwordmd5_salt,
      })
      .subscribe((res) => {
        if (res["accessToken"]) {
          this.localStorageService.set(ssotoken, {
            username: this.profileForm.value.username,
            password: this.passwordmd5_salt,
            remberme: this.checked,
            name: this.profileForm.value.username,
            token: res["accessToken"],
            // picture: "assets/images/eva.png"
            picture: "assets/images/man3.png",
          });

          this.loading = true;
          // this.router.navigate([afterloginurl]);

          // ============= 存入登录日志并得到菜单
          const opts = {
            headers: new HttpHeaders({
              Authorization:
                "Bearer " + JSON.parse(localStorage.getItem(ssotoken))["token"], // tslint:disable-line:object-literal-key-quotes
            }),
          };
          this.http
            .get(INFO_API, opts)
            .pipe(
              map((userInfo) => {
                console.log("INFO_API", res);
                if (userInfo["userInfo"]["roles"]) {
                  const userinfo = JSON.stringify(userInfo["userInfo"]);
                  localStorage.removeItem(SSOUSERINFO);
                  localStorage.setItem(
                    SSOUSERINFO,
                    userInfo
                      ? this.publicmethodService.compileStr(userinfo)
                      : null
                  );
                  this.RecordLogin();
                } else {
                  this.publicmethodService.toastr({
                    position: "top-right",
                    status: "danger",
                    conent: "当前用户菜单权限不足，请联系管理员添加权限！",
                  });
                }
              })
            )
            .subscribe(() => {
              this.loading = false;
              this.router.navigate([afterloginurl]);
            });
          this.publicmethodService.toastr(this.DataSuccess);
        } else {
          this.publicmethodService.toastr(this.DataDanger);
        }
      });
  }
  // 初始化界面时，检查是否记住密码？
  initLogin() {
    var get_jili_app_token = this.localStorageService.get(LOGIN_INFO);
    if (get_jili_app_token == null) {
      this.username = "";
      this.passwordmd5_salt = "";
      this.checked = true;
    } else {
      this.username = get_jili_app_token.username;

      this.passwordmd5_salt = get_jili_app_token.password;
      this.checked = get_jili_app_token.checked;
    }
    this.profileForm = this.fb.group({
      username: [this.username, Validators.required],
      password: [this.passwordmd5_salt, Validators.required],
    });
  }

  // 记住密码被点击，执行
  checkboxchange(checked: boolean) {
    this.checked = checked;
  }

  proofSso() {
    // 得到url中的ticket
    var currenturl = this.publicmethodService.get_current_search();
    var appKey = environment.appKey;
    // var appKey = "6d38d93e-ed9d-406f-a728-86b1a3f0fb47"; // appKey
    // var redirectUrl = "http://10.190.69.78/setup/login"
    var redirectUrl = this.redirectUrl;
    var redirectUrlIp = this.redirectUrlIp;
    var token = localStorage.getItem(ssotoken);
    if (token) {
      // 表示token不存在！
      // console.log("非单点登录（因为jili_app_token存在）：", nossotoken)
      this.router.navigate([afterloginurl]);
    } else {
      // var url = `http://passport-test.test.geely.com/appKey=${appKey}&redirectUrl=${redirectUrl}`;
      // console.log("SSO登录的url：", url);
      if (currenturl === "") {
        // 当前url没有传递参数！重定向到统一认证平台！
        // var url = `http://passport-test.test.geely.com/html/?appKey=${appKey}&redirectUrl=${redirectUrl}`;
        var url = `${environment.url}?appKey=${appKey}&redirectUrl=${redirectUrl}`;

        // var url = `http://passport-test.test.geely.com/html/?appKey=${appKey}&redirectUrl=${redirectUrl}`; // url

        // this.router.navigate([url]);
        // window.location.href = "http://www.baidu.com";
        localStorage.setItem("SSO", "true"); // important notice
        window.location.href = url; // 重定向到外部的url
      } else {
        // console.log("currenturl+++++++++++++", currenturl);
        var ticket_1 = this.getTicket(currenturl, "?");
        var ticket_2 = ticket_1.split("&")[0];
        var ticket = this.getTicket(ticket_2, "=");
        // console.log("得到当前的ticket： ", ticket);
        // 将ticket、appKey 存入 cookies中
        var url_userInfo = `http://geely-uc-sso-protocol-restful.app.dev01.geely.ocp/session-info-new/${ticket}?appKey=${appKey}`;

        // var geelyurl = `http://10.190.69.78/geely-info/${ticket}?appKey=${appKey}`;
        console.error(
          environment.name,
          "is_test login>>>>",
          environment.production
        );

        var geelyurl = `http://${redirectUrlIp}/geely-info/${ticket}?appKey=${appKey}`;
        if (environment.production) {
          // 测试环境和生产环境的
          geelyurl = `/geely-info/${ticket}?appKey=${appKey}`;
        }
        console.error("geelyurl>>>>", geelyurl);
        // var geelyurl = `/geely-info/${ticket}?appKey=${appKey}`;
        // 调用get请求的到用户信息
        this.http.get(geelyurl).subscribe(
          (response: any) => {
            // console.log("得到统一认证平台的用户信息response：", response);
            if (response && response["code"] === "success") {
              var ssouserinfo_list = [];
              var ssouserinfo = {};
              var ssouserinfo_default = {};

              ssouserinfo["token"] = response["data"]["token"];
              var loginname = response["data"]["domainAccountList"][0].split(
                "@"
              )[0];

              ssouserinfo["loginname"] = loginname; // 当前登录的用户名, 可能是 邮箱，sdfsf@sss.xx
              // ssouserinfo["loginname"] = response["data"]["account"]; // 当前登录的用户名, 可能是 邮箱，sdfsf@sss.xx

              ssouserinfo["employeeno"] = response["data"]["empNo"]; //工号
              ssouserinfo["name"] = response["data"]["nickName"]; // 姓名
              ssouserinfo["phoneno"] = response["data"]["phone"]; // 手机号
              ssouserinfo["email"] = response["data"]["domainAccountList"].join(
                ","
              ); // 域账号清单 list 转换为str
              ssouserinfo["userid"] = response["data"]["userId"]; // 用户中心用户ID // 将id改为 userid
              ssouserinfo["lastupdatedby"] = response["data"]["nickName"]; // 操作人
              ssouserinfo["active"] = 1;
              ssouserinfo["employeeid"] = null;
              ssouserinfo["ticket"] = ticket;
              ssouserinfo["department"] = "ZXJ"; // 部门
              ssouserinfo["password"] = Md5.hashStr(ssopassword + salt); // 默认的初始密码
              // console.log("处理后的SSo用户信息！");
              ssouserinfo_list.push(ssouserinfo);

              // 默认角色
              this.createDefaultRole(ssouserinfo_list).subscribe(
                (roleid: any[]) => {
                  console.log("得到创建的默认角色", roleid);
                  roleid.forEach((role_id) => {
                    ssouserinfo_default["rids"] = role_id["id"]; // roleid = [{id: 12}]
                  });
                  ssouserinfo_list.push(ssouserinfo_default);
                  // 将数据存入数据库中！
                  // 得到用户名--封装ssotoken
                  // 将统一认证得到的用存入用户表！并返回accessToken和refreshToken
                  this.insert_ssouser_get_tooken(ssouserinfo_list).subscribe(
                    (status) => {
                      if (status) {
                        // this.router.navigate([afterloginurl]);
                        // this.router.navigate([afterloginurl]);
                      } else {
                        // this.publicmethodService.toastr(this.DataDanger);
                        this.router.navigate([loginurl]);
                      }
                    }
                  );
                  // this.router.navigate([afterloginurl]);
                }
              );
            }
          },
          (error) => {
            console.error(
              "得到创建的默认角色",
              error,
              error.status,
              error.error
            );
          }
        );
      }
      // this.router.navigate([url]);
    }
  }

  // 解析得到 ticket
  getTicket(urlstr: any, spstr: string) {
    var search = String(urlstr).split(spstr)[1];
    return search;
  }

  // 将数据存入数据库中并根据用户名、密码登录得到token！
  insert_ssouser_get_tooken(ssouserinfo) {
    return new Observable((observe) => {
      var colums = ssouserinfo;
      console.log("将数据存入数据库---colums--", colums);
      const table = "employee";
      // const method = "insert_employee";
      const method = "insert_employee_from_sso";
      this.httpserviceService
        .callRPC(table, method, colums)
        .subscribe((result) => {
          console.log(
            "将数据存入数据库中insert_employee_from_sso，返回的数据",
            result
          );
          const status = result["result"]["message"][0];
          if (status["code"] === 1) {
            // 表示入库成功！调用登录接口得到token,
            // console.log("请求登录！")
            var headers = {
              headers: new HttpHeaders({ "Content-Type": "application/json" }),
            };
            this.httpserviceService
              .post(
                LOGIN_API,
                {
                  username: ssouserinfo[0]["loginname"],
                  password: ssouserinfo[0]["password"],
                },
                headers
              )
              .subscribe((res) => {
                console.log("请求登录！得到结果", res);
                if (res["accessToken"]) {
                  // ============= 存入登录日志
                  const opts = {
                    headers: new HttpHeaders({
                      Authorization: "Bearer " + res["accessToken"], // tslint:disable-line:object-literal-key-quotes
                    }),
                  };
                  this.http
                    .get(INFO_API, opts)
                    .pipe(
                      map((userInfo) => {
                        console.log(
                          "userInfo============= 存入登录日志并得到菜单",
                          userInfo
                        );
                        if (userInfo["userInfo"]["roles"]) {
                          const userinfo = JSON.stringify(userInfo["userInfo"]);
                          localStorage.removeItem(SSOUSERINFO);

                          localStorage.setItem(
                            SSOUSERINFO,
                            userInfo
                              ? this.publicmethodService.compileStr(userinfo)
                              : null
                          );
                          this.RecordLogin();
                        } else {
                          this.publicmethodService.toastr({
                            position: "top-right",
                            status: "danger",
                            conent:
                              "当前用户菜单权限不足，请联系管理员添加权限！",
                          });
                        }
                      })
                    )
                    .subscribe(() => {
                      this.loading = false;
                      this.publicmethodService.toastr(this.DataSuccess);
                      this.router.navigate([afterloginurl]);
                    });

                  // 说明得到了token
                  var ssotoken_value = {
                    // token: "flask给的 accessToken ",
                    token: res["accessToken"],
                    password: ssouserinfo[0]["password"],
                    username: ssouserinfo[0]["name"], //'登录的用户',
                    name: ssouserinfo[0]["name"], //'登录的用户',
                    picture: "assets/images/man3.png",
                    ticket: ssouserinfo[0]["ticket"],
                  };
                  // console.log("统一认证，用户登录成功！", ssotoken_value)
                  localStorage.setItem(
                    ssotoken,
                    JSON.stringify(ssotoken_value)
                  );
                  observe.next(true);
                } else {
                  // 表示写入数据库没有成功！
                  observe.next(false);
                }
              });
          }
        });
    });
  }

  // 创建默认角色
  createDefaultRole(ssouserinfo_list) {
    return new Observable((observe) => {
      var table = "role";
      var method = "get_default_role";
      var colums = {
        role: "default",
        createdby: ssouserinfo_list[0]["lastupdatedby"],
        role_name: "默认角色",
      };
      this.httpserviceService
        .callRPC(table, method, colums)
        .subscribe((res) => {
          // console.log("创建默认角色，得到存在角色的id", res)
          var roleid = res["result"]["message"][0];
          // console.log("创建默认角色，得到存在角色的id", roleid)
          observe.next(roleid);
        });
    });
  }

  RecordLogin() {
    if (this.userInfoService.getLoginName()) {
      // const source = this.userInfoService.getSourceid();        // 本机IP地址,
      // const source = this.userInfoService.getClientip();        // 客户端IP地址,
      const source = this.userInfoService.getUserip(); // 用户IP地址,
      const employeeid = this.userInfoService.getEmployeeID(); // employeeid
      // result 1
      // info 登录
      const createdby = this.userInfoService.getLoginName(); // 登录名
      this.publicmethodService.record(source, employeeid, 1, "登录", createdby);
      // this.publicservice.record('local', source, employeeid, 1, '登录成功！', createdby);
    }
  }
}
