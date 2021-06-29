import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { NbDialogRef } from "@nebular/theme";
import { HttpserviceService } from "../../../services/http/httpservice.service";
import { PublicmethodService } from "../../../services/publicmethod/publicmethod.service";
import { UserInfoService } from "../../../services/user-info/user-info.service";

import { loginurl } from "../../../appconfig";

import { VideoIntegration } from "../form_verification";
import { Observable } from "rxjs";

declare let $;
declare let layui;

@Component({
  selector: "ngx-add-edit-video-integration",
  templateUrl: "./add-edit-video-integration.component.html",
  styleUrls: ["./add-edit-video-integration.component.scss"],
})
export class AddEditVideoIntegrationComponent implements OnInit {
  @Input() title: string;
  @Input() content: boolean; // true: 表示edit false:表示add
  @Input() rowData: any[];
  // 加载
  loading;
  constructor(
    private dialogRef: NbDialogRef<AddEditVideoIntegrationComponent>,
    private http: HttpserviceService,
    private userinfo: UserInfoService,
    private publicservice: PublicmethodService,
    private router: Router
  ) {}

  TABLE = "video_integration";
  UMETHOD = "update_video_integration";
  IMETHOD = "insert_video_integration";

  groups;

  listengroups = false; // 是否点击监听，默认没有点击

  // pc_device_status_get 选择功能组得到设备编号，设备名称等信息！
  ngOnInit(): void {}

  ngAfterViewInit() {
    this.layuiform();
  }

  layuiform() {
    var that = this;
    layui.use(["form", "layer", "eleTree"], function () {
      var form = layui.form;
      var layer = layui.layer;
      var eleTree = layui.eleTree;
      form.render(); // 刷新all
      form.render("select"); // 刷新select
      form.render("checkbox"); // 刷新checkbox

      that.init_groups(form);

      // 菜单目录
      var menuid;
      var menu;
      $(".mulu_ele5").hide();
      that.get_all_menu().subscribe((res) => {
        // console.error("res>>>>", JSON.stringify(res));
        var treedata = res["treedata"];
        var el5;

        $("[name='menu']").on("click", function (e) {
          e.stopPropagation();
          if (!el5) {
            el5 = eleTree.render({
              elem: ".mulu_ele5",
              data: treedata,
              defaultExpandAll: false,
              expandOnClickNode: true,
              highlightCurrent: true,
            });
          }
          $(".mulu_ele5").toggle();
        });

        // $("[name='menu']").val("目标工时配置"); id
        // 如果是编辑，要初始化目录菜单
        if (that.content) {
          var menu = res["menu"];
          menu.forEach((element) => {
            if (element["id"] === that.rowData[0]["menuid"]) {
              $("[name='menu']").val(element["label"]);
            }
          });
        }

        eleTree.on("nodeClick(menu)", function (d) {
          console.error("d---->", d);
          var currentData = d.data.currentData;
          if (currentData["type"] === 1) {
            $("[name='menu']").val(d.data.currentData.label);
            // 得到菜单对应的id
            var id = d.data.currentData.id;
            menuid = id;
            menu = d.data.currentData.label;
            $(".mulu_ele5").hide();
          }
        });

        $(document).on("click", function () {
          $(".mulu_ele5").hide();
        });
      });

      // 判断是 新增还是编辑
      if (that.content) {
        // true: 表示edit
        // 表单初始化
        var rowData = Object.assign({}, that.rowData[0]);
        rowData["videoservicestatus"] =
          that.rowData[0]["videoservicestatus"] === "1" ? true : false;
        form.val("device", rowData);
        // form.val("device", that.rowData[0]);
      } else {
        // false: 表示add
      }

      // 表单验证
      form.verify({
        // 科室设备ID
        deviceid: function (value, item) {
          // sql注入
          var verify_sql_str = that.verify_sql_str(value, "设备ID");
          if (verify_sql_str != 1) {
            return verify_sql_str;
          }
          if (value == "") {
            return "设备ID不能为空";
          }
          // 格式验证
          if (!new RegExp(VideoIntegration.deviceid).test(value)) {
            return "设备ID 格式不对";
          }
        },
        // 摄像头IP
        cameraip: function (value, item) {
          // sql注入
          var verify_sql_str = that.verify_sql_str(value, "摄像头IP");
          if (verify_sql_str != 1) {
            return verify_sql_str;
          }
          // 格式验证
          if (!new RegExp(VideoIntegration.cameraip).test(value)) {
            return "摄像头IP 格式不对";
          }
        },
        // 负责区域 territory
        territory: function (value, item) {
          // sql注入
          var verify_sql_str = that.verify_sql_str(value, "负责区域");
          if (verify_sql_str != 1) {
            return verify_sql_str;
          }
          // 格式验证
          if (!new RegExp(VideoIntegration.territory).test(value)) {
            return "负责区域 格式不对";
          }
        },
        // 摄像头唯一标识符 cameraindexcode
        cameraindexcode: function (value, item) {
          // sql注入
          var verify_sql_str = that.verify_sql_str(value, "摄像头唯一标识符");
          if (verify_sql_str != 1) {
            return verify_sql_str;
          }
          // 是32 位的
          if (value.length !== 32) {
            return "摄像头唯一标识符,长度必须是32位";
          }
          // 格式验证
          if (!new RegExp(VideoIntegration.cameraindexcode).test(value)) {
            return "摄像头唯一标识符 格式不对";
          }
        },
        // 描述 description
        description: function (value, item) {
          // sql注入
          var verify_sql_str = that.verify_sql_str(value, "描述");
          if (verify_sql_str != 1) {
            return verify_sql_str;
          }
          // 格式验证
          if (!new RegExp(VideoIntegration.description).test(value)) {
            return "描述 格式不对";
          }
        },
        // IP地址 description
        ipaddress: function (value, item) {
          // sql注入
          var verify_sql_str = that.verify_sql_str(value, "IP地址");
          if (verify_sql_str != 1) {
            return verify_sql_str;
          }
          // 格式验证
          if (!new RegExp(VideoIntegration.ipaddress).test(value)) {
            return "IP地址 格式不对";
          }
        },
        // 摄像头名称  cameraname
        cameraname: function (value, item) {
          // sql注入
          var verify_sql_str = that.verify_sql_str(value, "摄像头名称");
          if (verify_sql_str != 1) {
            return verify_sql_str;
          }
          // 格式验证
          if (!new RegExp(VideoIntegration.cameraname).test(value)) {
            return "摄像头名称 格式不对";
          }
        },
      });

      // 监听选择的功能组
      form.on("select(group)", function (data) {
        that.listengroups = true;
        // console.error("监听功能组==data>>>>", data);
        if (data.value !== "") {
          that.init_devicename_deviceno(data.value, form);
        }
      });

      // 监听选择的设备名称
      form.on("select(devicename)", function (data) {
        // console.log("监听选择 设备名称：", data); //得到被选中的值,即为 group 的id
        that.update_deviceid(data.value);
      });

      // 提交表单
      form.on("submit(gpsvideo)", function (data) {
        // layer.alert(JSON.stringify(data.field), {
        //   title: "得到的编辑表单的数据",
        // });
        var videoservicestatus = "0";

        var savedata = Object.assign({}, data.field);
        if (savedata.hasOwnProperty("videoservicestatus")) {
          videoservicestatus = savedata["videoservicestatus"];
        }
        savedata["videoservicestatus"] = videoservicestatus;
        // console.error("======?savedata", savedata);

        if (that.content) {
          savedata["id"] = that.rowData[0].id;
          savedata["lastupdateon"] = that.userinfo.getName();
          // console.error("menuid.......", menuid);
          if (menuid === undefined) {
            savedata["menuid"] = that.rowData[0]["menuid"];
          } else {
            savedata["menuid"] = menuid;
            savedata["menu"] = menu;
          }
          if (menu == "null") {
            savedata["menu"] = that.rowData[0]["menu"];
          } else {
            savedata["menu"] = $("input[name='menu']").val();
          }
          that.updata(savedata);

          // layer.alert(JSON.stringify(savedata), {
          //   title: "编辑数据",
          // });
        } else {
          savedata["createdby"] = that.userinfo.getName();
          savedata["menuid"] = menuid;
          savedata["menu"] = menu;
          // console.error("menuid.......", menuid);
          // layer.alert(JSON.stringify(savedata), {
          //   title: "新增数据",
          // });
          that.insert(savedata);
        }
      });
    });
  }

  // 初始化科室、功能组
  init_groups(form) {
    var monthed = "dev_get_device_type";
    var columns = {
      employeeid: this.userinfo.getEmployeeID(),
    };
    this.http.callRPC("device", monthed, columns).subscribe((result) => {
      var res = result["result"]["message"][0];
      if (res["code"] === 1) {
        var groups = res["message"][0]["groups"];
        // 动态创建option
        var option = `<option value="">请选择功能组</option>`;
        groups.forEach((element) => {
          option += `<option  value ="${element.id}">${element.label}</option>`;
          $("#group").html(option);
        });
        form.render();

        if (this.rowData.length !== 0) {
          // console.error("groups>>>>", groups);
          // console.error("this.rowData>>>>", this.rowData);
          var gid = this.rowData[0]["gid"];
          // console.error("gid>>>>>>>>>>", gid);
          var options = (<HTMLSelectElement>document.getElementById("group"))
            .options;
          // console.error("options>>>>>>>>>>", options);
          groups.forEach((group, index) => {
            if (group["id"] === gid) {
              options.selectedIndex = index + 1;
            }
          });
          form.render();
          this.init_devicename_deviceno(gid, form);
        }
      }
    });
  }

  // 初始化设备名称
  init_devicename_deviceno(groupsid, form) {
    var monthed = "dev_get_device_name";
    var columns = {
      groupsid: groupsid,
    };
    this.http.callRPC("device", monthed, columns).subscribe((result) => {
      var res = result["result"]["message"][0];
      if (res["code"] === 1) {
        var devicename_deviceno = res["message"];
        // console.error("devicename>>>>", devicename_deviceno);
        var option = "";

        devicename_deviceno.forEach((element, index) => {
          // && this.rowData.length == 0
          if (index === 0 && !this.content) {
            // 添加
            this.update_deviceid(element);
          } else {
            // this.update_deviceid(element);
          }
          option += `<option  value ="${element.deviceid}">${element.devicename}</option>`;
        });
        $("#devicename").html(option);
        form.render();

        if (this.rowData.length !== 0) {
          var deviceid = this.rowData[0]["deviceid"];
          var options = (<HTMLSelectElement>(
            document.getElementById("devicename")
          )).options;
          // console.error("devicename>>>>", devicename_deviceno);
          // console.error("this.listengroups >>>>", this.listengroups);
          devicename_deviceno.forEach((devicename, index) => {
            if (devicename["deviceid"] === deviceid) {
              if (this.listengroups) {
              } else {
                options.selectedIndex = index;
              }
            } else {
              if (this.listengroups && index === 0) {
                // console.error("listengroups>>>>", this.listengroups);
                this.update_deviceid(devicename);
              }
            }
          });
          form.render();
        }
      }
    });
  }

  // 更新设备编号
  update_deviceid(element) {
    // console.error("****>element", element);
    if (element.hasOwnProperty("deviceid")) {
      var deviceid = element.deviceid;
      $("input[name='deviceid']").val(deviceid);
    } else {
      $("input[name='deviceid']").val(element);
    }
  }

  // 更新数据
  updata(data) {
    this.http.callRPC(this.TABLE, this.UMETHOD, data).subscribe((result) => {
      var res = result["result"]["message"][0];
      if (res["code"] === 1) {
        this.dialogRef.close(true);
        this.editsuccess();
        this.RecordOperation("更新", 1, "视频集成服务器管理");
      } else {
        this.editdanger();
        this.RecordOperation("更新", 0, "视频集成服务器管理");
      }
    });
  }
  // 新增数据
  insert(data) {
    this.http.callRPC(this.TABLE, this.IMETHOD, [data]).subscribe((result) => {
      var res = result["result"]["message"][0];
      if (res["code"] === 1) {
        this.dialogRef.close(true);
        this.addsuccess();
        this.RecordOperation("新增", 1, "视频集成服务器管理");
      } else {
        this.adddanger();
        this.RecordOperation("新增", 0, "视频集成服务器管理");
      }
    });
  }

  // 得到所有的菜单 get_systemset_menu_all
  get_all_menu() {
    return new Observable((observe) => {
      this.publicservice.getMenu().subscribe((data: any[]) => {
        if (data.length === 0) {
          // 表示token 过期，返回登录界面
          this.router.navigate([loginurl]);
        } else {
          const colums = {
            languageid: this.http.getLanguageID(),
            roles: data,
          };
          const table = "menu_item";
          const method = "get_systemset_menu_all";
          this.http.callRPC(table, method, colums).subscribe((result) => {
            var res = result["result"]["message"][0];
            if (res["code"] === 1) {
              // 得到特定的树状结构数据
              this.sysrolemenu_to_tree_v2(res["message"]).subscribe(
                (treedata) => {
                  observe.next(treedata);
                }
              );
            }
          });
        }
      });
    });
  }

  // 根据得到的 sysrolemenu 角色界面的菜单数据得到适用于特定树状结构的数据
  sysrolemenu_to_tree_v2(sysrolemenu, selectmenu?) {
    // console.log("<<<<<<<<<<<<<<<<sysrolemenu_to_tree_v2>>>>>>>>>>>>>", sysrolemenu, selectmenu)
    /*
    * 需要的特定数据格式： 
      [
        {
          id: ,    // 节点唯一索引，对应数据库中id
          label: , // 节点标题
          checked: , // 是否勾选
          disabled: , // 节点是否为禁止状态，默认为false
          children: , // 子节点，支持设定项同父节点
        }
      ] 
    */
    return new Observable((observe) => {
      var mulu_list = [];
      var caidan_list = [];
      var aniu_list = [];
      var selectmenu_ = selectmenu === undefined ? [] : selectmenu;
      //  console.log(">>>>>>>>>>>>>>>>>.,selectmenu_",selectmenu_)

      sysrolemenu.forEach((item) => {
        if (item["type"] === 0) {
          var mulu = this.get_mulu_list_v2(item);
          if (selectmenu_ != []) {
            selectmenu_.forEach((select) => {
              if (select["menuitemid"] === mulu["id"]) {
                // mulu["checked"] = true;
              }
            });
          }
          mulu_list.push(mulu);
        } else if (item["type"] === 1) {
          var caidan = this.get_mulu_list_v2(item);
          if (selectmenu_ != []) {
            selectmenu_.forEach((select) => {
              if (select["menuitemid"] === caidan["id"]) {
                // caidan["checked"] = true
              }
            });
          }
          caidan_list.push(caidan);
        } else {
          var aniu = this.get_mulu_list_v2(item);
          if (selectmenu_ != []) {
            selectmenu_.forEach((select) => {
              if (select["menuitemid"] === aniu["id"]) {
                // aniu["checked"] = true
              }
            });
          }
          aniu_list.push(aniu);
        }
      });

      //  mulu_list 目录列表 caidan_list 菜单列表 aniu_list 按钮列表！
      var res_caidan_list = this.unique(caidan_list, "id");
      var res_aniu_list = this.unique(aniu_list, "id");

      // console.log("+++++++++++++++++++\n")
      // console.log("目录列表 ", mulu_list);
      // console.log("菜单列表: ", res_caidan_list);
      // console.log("按钮列表: ", res_aniu_list);
      // console.log("+++++++++++++++++++\n");

      // var caidanList = this.integration_list_v2(res_caidan_list, res_aniu_list);
      // var muluList = this.integration_list_v2(mulu_list, caidanList);
      var muluList = this.integration_list_v2(mulu_list, res_caidan_list);
      //  console.log("muluList 这是整合了,目录列表、 菜单列表\n：", muluList);

      //  需要将 muluList去重根据id
      var res_muluList = this.unique(muluList, "id");
      var res_muluList_copy = this.handle_mulu_list(res_muluList);
      observe.next({
        treedata: res_muluList_copy,
        selectmenu: selectmenu_,
        menu: res_caidan_list,
      });
    });
  }

  // 得到目录列表、菜单列表、按钮列表
  get_mulu_list_v2(item) {
    var mulu: TREEV2 = {
      type: item["type"],
      id: item["id"],
      parentid: item["parentid"],
      label: item["title"],
      checked: false,
      disabled: false,
      children: [],
    };
    return mulu;
  }

  // 根据mulu  id 去重
  unique(arr, field) {
    const map = {};
    const res = [];
    for (let i = 0; i < arr.length; i++) {
      if (!map[arr[i][field]]) {
        map[arr[i][field]] = 1;
        res.push(arr[i]);
      }
    }

    return res;
  }
  // 列表整合！
  integration_list_v2(parentList, childList) {
    parentList.forEach((parent) => {
      var child_list = [];
      childList.forEach((child) => {
        if (child["parentid"] === parent["id"]) {
          child_list.push(child);
        } else if (child["parentid"] === 0) {
          // 属于菜单，但没有上级目录
          parentList.push(child); // 在目录列表中，将 该菜单 添加进入！
        }
        parent["children"] = child_list;
      });
    });
    return parentList;
  }
  // 重新处理目录 mulu_list
  handle_mulu_list(res_muluList) {
    // console.log("最终的目录列表 res_muluList:    start", res_muluList,);
    var parentid_exist = [];
    res_muluList.forEach((mulu) => {
      if (mulu["parentid"] != 0 && mulu["parentid"] != null) {
        parentid_exist.push(mulu);
      }
    });
    // console.log("---------------parentid_exist-------------", parentid_exist)
    res_muluList.forEach((mulu) => {
      parentid_exist.forEach((item) => {
        if (mulu["id"] === item["parentid"]) {
          mulu["children"].push(item);
        }
      });
    });

    var res_muluList_copy = [];
    res_muluList.forEach((res_mulu) => {
      if (res_mulu["type"] === 0) {
        var children = res_mulu["children"];
        if (children.length === 0) {
          if (res_muluList_copy.indexOf(res_mulu) === -1) {
            res_muluList_copy.push(res_mulu);
          }
        } else {
          children.forEach((c_item) => {
            res_muluList.forEach((item) => {
              if (c_item["id"] === item["id"]) {
                if (res_muluList_copy.indexOf(res_mulu) === -1) {
                  res_muluList_copy.push(res_mulu);
                }
              } else {
                // 子id 不在，但是父id在如统计分析！
                if (
                  res_mulu["id"] != item["parentid"] &&
                  item["id"] === c_item["parentid"]
                ) {
                  if (
                    res_muluList_copy.indexOf(item) === -1 &&
                    item["parentid"] > 0
                  ) {
                  } else {
                    // console.log("子id 不在，但是父id在如统计分析！", item)
                    res_muluList_copy.push(item);
                  }
                }
              }
            });
          });
        }
      } else {
        if (res_muluList_copy.indexOf(res_mulu) === -1) {
          res_muluList_copy.push(res_mulu);
        }
      }
    });
    res_muluList_copy = this.unique(res_muluList_copy, "id");

    // 删除 res_muluList 的  parentid 不为 0 和 null的

    // console.log("最终的目录列表 res_muluList:   end", res_muluList);
    // console.log("最终的目录列表 res_muluList_copy:   res_muluList_copy", res_muluList_copy);
    // 删除 目录中 children 长度为0的
    var after_res_muliList_copy = [];
    res_muluList_copy.forEach((item) => {
      if (item["parentid"] === 0 || item["parentid"] === null) {
        after_res_muliList_copy.push(item);
      }
    });
    // console.log("最终的目录列表 after_res_muliList_copy:   after_res_muliList_copy", after_res_muliList_copy);
    // return res_muluList_copy
    return after_res_muliList_copy;
  }

  // × 关闭diallog   及关闭弹框
  closedialog() {
    this.dialogRef.close(false);
  }

  // 取消
  cancel() {
    this.dialogRef.close(false);
  }

  // 展示状态
  editsuccess() {
    this.publicservice.showngxtoastr({
      position: "toast-top-right",
      status: "success",
      conent: "编辑成功!",
    });
  }
  editdanger() {
    this.publicservice.showngxtoastr({
      position: "toast-top-right",
      status: "danger",
      conent: "编辑失败!",
    });
  }

  addsuccess() {
    this.publicservice.showngxtoastr({
      position: "toast-top-right",
      status: "success",
      conent: "添加成功!",
    });
  }
  adddanger() {
    this.publicservice.showngxtoastr({
      position: "toast-top-right",
      status: "danger",
      conent: "添加失败!",
    });
  }

  // 验证 sql 注入、 特殊字符！
  verify_sql_str(data, title) {
    var special_sql = VideoIntegration["special_sql"]["special_sql"];
    var special_str = VideoIntegration["special_sql"]["special_str"];
    var sql = special_sql.test(data);
    var str = special_str.test(data);
    if (sql) {
      return "防止SQL注入，请不要输入关于sql语句的特殊字符！";
    }
    if (!str) {
      return title + "不能有特殊字符！";
    }
    return 1;
  }

  // option_record
  RecordOperation(option, result, infodata) {
    if (this.userinfo.getLoginName()) {
      var employeeid = this.userinfo.getEmployeeID();
      var result = result; // 1:成功 0 失败
      var transactiontype = option; // '新增用户';
      var info = infodata;
      var createdby = this.userinfo.getLoginName();
      this.publicservice.option_record(
        employeeid,
        result,
        transactiontype,
        info,
        createdby
      );
    }
  }
}

interface TREEV2 {
  type: number; // 自定义判断是否是目录
  id: number; // 节点唯一索引，对应数据库中id
  parentid: number; // 父节点id
  label: string; // 节点标题
  checked: boolean; // 节点是否初始为选中状态， 默认false
  disabled: boolean; // 节点是否为禁止状态，默认为false
  children: TREEV2[] | []; // 子节点，支持设定项同父节点
}
