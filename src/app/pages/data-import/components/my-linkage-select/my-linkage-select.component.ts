import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { HttpserviceService } from "../../../../services/http/httpservice.service";
import { UserInfoService } from "../../../../services/user-info/user-info.service";

declare let $;
declare let layui;

@Component({
  selector: "ngx-my-linkage-select",
  templateUrl: "./my-linkage-select.component.html",
  styleUrls: ["./my-linkage-select.component.scss"],
})
export class MyLinkageSelectComponent implements OnInit {
  @Output() private my_date_select = new EventEmitter<any>();
  group_room_group_title = "请选择科室";
  group_room_room_title = "请选择设备名称";

  METHODGROUP = "dev_get_device_type";
  METHODDEVICE = "dev_get_device_name";

  default_groups_room = {};

  // el5
  single_el5s_group;
  single_el5s_room;

  employeeid;
  constructor(
    private userinfo: UserInfoService,
    private http: HttpserviceService
  ) {
    this.employeeid = this.userinfo.getEmployeeID();
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    // this.placeholder_title = this.placeholder;
    $("[name='temperature_group_room_group']").attr(
      "placeholder",
      this.group_room_group_title
    );
    $("[name='temperature_group_room_room']").attr(
      "placeholder",
      this.group_room_room_title
    );

    this.init_groups();
  }

  // 得到科室功能组的
  init_groups() {
    var monthed = this.METHODGROUP;
    var columns = {
      employeeid: this.userinfo.getEmployeeID(),
    };
    this.http.callRPC("device", monthed, columns).subscribe((result) => {
      var res = result["result"]["message"][0];
      if (res["code"] === 1) {
        var groups = res["message"][0]["groups"];
        // console.error("***************groups", groups);
        this.init_select_tree_group(groups);
      }
    });
  }

  // 得到设备名称的
  init_device(groupsid) {
    var monthed = this.METHODDEVICE;
    var columns = {
      groupsid: groupsid,
    };
    this.http.callRPC("device", monthed, columns).subscribe((result) => {
      var res = result["result"]["message"][0];
      if (res["code"] === 1) {
        var devicename_deviceno = res["message"];
        devicename_deviceno.forEach((element) => {
          element["id"] = element["deviceid"];
          element["label"] = element["devicename"];
        });

        $("[name='temperature_group_room_room']").val("");
        this.single_el5s_room?.reload({ data: devicename_deviceno }); // 重新加载树
        if (devicename_deviceno.length > 0) {
          if (this.single_el5s_room === undefined) {
            this.init_select_tree_room(devicename_deviceno);
          }
        }
      }
    });
  }

  group_tree_data; // 树结构数据
  // 下拉树示例
  init_select_tree_group(data) {
    var that = this;
    that.group_tree_data = data;
    var single_el5s;
    layui.use(["eleTree"], function () {
      var eleTree = layui.eleTree;
      $("[name='temperature_group_room_group']").on("click", function (e) {
        e.stopPropagation();
        if (!single_el5s) {
          single_el5s = eleTree.render({
            elem: ".group_room_group",
            data: data,
            defaultExpandAll: false,
            showCheckbox: false,
            expandOnClickNode: false,
            highlightCurrent: true,
            // defaultCheckedKeys: [], // 默认勾选
            // defaultCheckedKeys: that.defaultCheckedKeys, // 默认勾选
            checkOnClickNode: true, // 点击节点时选中节点！
          });
          that.single_el5s_group = single_el5s;
        }

        $(".group_room_group").toggle();
        that.toggle();
        that.other_toggle();
        that.room_toggle();
      });

      // 节点被选择
      eleTree.on("nodeClick(group_room_group_select)", function (d) {
        // console.error("select_data",d.data.currentData)
        $("[name='temperature_group_room_group']").val(
          d.data.currentData.label
        );
        // that.my_date_select.emit(d.data.currentData.label);
        // console.error("节点被选择++++++++++++++", d.data.currentData);
        that.init_device(d.data.currentData.id);

        // that.get_room_from_groups(d.data.currentData.label);
        // that.my_date_select.emit(d.data.currentData.id);
        $(".group_room_group").hide();
        $(".group_room_group").hide();
      });
      $(document).on("click", function () {
        $(".group_room_group").hide();
        // that.xialaicon = "arrow-ios-downward-outline";
        that.toggle();
      });
    });
  }

  // ================room  设备
  room_tree_data;
  init_select_tree_room(data) {
    var that = this;
    that.room_tree_data = data;
    var single_el5s_room;
    layui.use(["eleTree"], function () {
      var eleTree = layui.eleTree;
      $("[name='temperature_group_room_room']").on("click", function (e) {
        e.stopPropagation();

        if (!single_el5s_room) {
          single_el5s_room = eleTree.render({
            elem: ".group_room_room",
            data: data,
            defaultExpandAll: false,
            showCheckbox: false,
            expandOnClickNode: false,
            highlightCurrent: true,
            // defaultCheckedKeys: [], // 默认勾选
            // defaultCheckedKeys: that.defaultCheckedKeys, // 默认勾选
            checkOnClickNode: true, // 点击节点时选中节点！
          });
          that.single_el5s_room = single_el5s_room;
        }

        $(".group_room_room").toggle();
        that.toggle();
        that.other_toggle();
        that.group_toggle();
      });

      // 节点被选择
      // var select_data = that.select_data; //[{id: 3, label: "nvh"},]
      // var select_label_list = that.select_label_list;
      eleTree.on("nodeClick(group_room_room_select)", function (d) {
        // console.error("select_data",d.data.currentData)
        $("[name='temperature_group_room_room']").val(d.data.currentData.label);
        // that.my_date_select.emit(d.data.currentData.label);
        // console.error("节点被选择++++++++++++++", d.data.currentData);
        // that.my_date_select.emit(d.data.currentData.id);
        that.my_date_select.emit(d.data.currentData);
        $(".group_room_room").hide();
        $(".group_room_room").hide();
        that.toggle();
      });
      $(document).on("click", function () {
        $(".group_room_room").hide();
        that.toggle();
      });
    });
  }

  // i 图标 class 切换
  toggle() {
    // group
    var group_room_group = $(".group_room_group").css("display");
    if (group_room_group == "none") {
      $("#group_room_group_i").attr(
        "class",
        "layui-icon layui-icon-down single_xiala"
      );
    } else {
      $("#group_room_group_i").attr(
        "class",
        "layui-icon layui-icon-up  single_xiala"
      );
    }
    // room
    var group_room_room = $(".group_room_room").css("display");
    if (group_room_room == "none") {
      $("#group_room_room_i").attr(
        "class",
        "layui-icon layui-icon-down single_xiala"
      );
    } else {
      $("#group_room_room_i").attr(
        "class",
        "layui-icon layui-icon-up  single_xiala"
      );
    }
  }
  // my-time-point i 图标 class 切换
  other_toggle() {
    // 时间点选择器
    $(".time_interval_labels").hide();
    var time_interval_labels = $(".time_interval_labels").css("display");
    if (time_interval_labels == "none") {
      $("#time_interval_i").attr("class", "layui-icon layui-icon-down xiala");
    } else {
      $("#time_interval_i").attr("class", "layui-icon layui-icon-up  xiala");
    }
    // 日期选择器
    $(".layui-laydate").remove();
  }
  // 关闭groups
  group_toggle() {
    // 关闭group
    $(".group_room_group").hide();
    var group_room_group = $(".group_room_group").css("display");
    if (group_room_group == "none") {
      $("#group_room_group_i").attr(
        "class",
        "layui-icon layui-icon-down single_xiala"
      );
    } else {
      $("#group_room_group_i").attr(
        "class",
        "layui-icon layui-icon-up  single_xiala"
      );
    }
  }
  // 关闭设备
  room_toggle() {
    $(".group_room_room").hide();
    var group_room_room = $(".group_room_room").css("display");
    if (group_room_room == "none") {
      $("#group_room_room_i").attr(
        "class",
        "layui-icon layui-icon-down single_xiala"
      );
    } else {
      $("#group_room_room_i").attr(
        "class",
        "layui-icon layui-icon-up  single_xiala"
      );
    }
  }

  // ============================= getselect
  getselect() {
    var group =
      $("[name='temperature_group_room_group']").val() == undefined
        ? ""
        : $("[name='temperature_group_room_group']").val();
    var room =
      $("[name='temperature_group_room_room']").val() == undefined
        ? ""
        : $("[name='temperature_group_room_room']").val();
    return {
      groups: group,
      room: room,
    };
  }

  // 删除选择的
  delselect() {
    $("[name='temperature_group_room_group']").val("");
    $("[name='temperature_group_room_room']").val("");
  }

  // 清空下拉数据
  reset_select() {
    this.delselect();
    this.single_el5s_group?.reload({ data: this.group_tree_data }); // 重新加载树
    this.single_el5s_room?.reload({ data: this.room_tree_data }); // 重新加载树
  }
}
