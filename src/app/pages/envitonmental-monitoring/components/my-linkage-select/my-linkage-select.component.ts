import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
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
  @Input("placeholder") placeholder: any;
  @Output() private my_date_select = new EventEmitter<any>();
  // 下拉 icon
  xialaicon = "arrow-ios-downward-outline";
  xialaicon_room = "arrow-ios-downward-outline";
  group_room_group_title = "请选择科室";
  group_room_room_title = "请选择房间号";

  default_groups_room = {};

  // el5
  single_el5s_group;
  single_el5s_room;

  employeeid;
  groups = [];
  TABLE = "temperature_groups";
  METHODGROUP = "dev_get_temperature_groups";
  METHODROOM = "dev_get_temperature_room";

  constructor(
    private userinfo: UserInfoService,
    private http: HttpserviceService
  ) {
    this.employeeid = this.userinfo.getEmployeeID();

    this.http
      .callRPC(this.TABLE, this.METHODGROUP, { employeeid: this.employeeid })
      .subscribe((result) => {
        var res = result["result"]["message"][0];
        if (res["code"] === 1) {
          this.groups = res["message"];
          this.init_select_tree_group(this.groups);
        }
      });
  }

  ngOnInit(): void {
    var groupdata = [
      { id: 3000, label: "全部" },
      { id: 3, label: "近3天" },
      { id: 7, label: "近一周" },
      { id: 30, label: "近一个月" },
    ];
    // this.init_select_tree_group(groupdata);

    var roomdata = [
      { id: 3000, label: "全部" },
      { id: 3, label: "近3天" },
      { id: 7, label: "近一周" },
      { id: 30, label: "近一个月" },
    ];
    // this.init_select_tree_room(roomdata);
  }

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
    // $(".tree_isShow").hide();
    // $("[name='gps_single_my_date_select']").val(this.default_month);
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
        if (that.xialaicon === "arrow-ios-upward-outline") {
          that.xialaicon = "arrow-ios-downward-outline";
        } else {
          that.xialaicon = "arrow-ios-upward-outline";
        }
        // e.stopPropagation();
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

        // 关闭日期范围
        $(".layui-laydate").remove();
        // 科室
        $(".group_room_group").hide();
        that.xialaicon = "arrow-ios-downward-outline";
        $(".group_room_room").hide();
        that.xialaicon_room = "arrow-ios-downward-outline";

        $(".my_time_point_labels").hide();
        that.xialaicon = "arrow-ios-downward-outline";

        $(".group_room_group").toggle();
      });

      // 节点被选择
      eleTree.on("nodeClick(group_room_group_select)", function (d) {
        // console.error("select_data",d.data.currentData)
        $("[name='temperature_group_room_group']").val(
          d.data.currentData.label
        );
        // that.my_date_select.emit(d.data.currentData.label);
        // console.error("节点被选择++++++++++++++", d.data.currentData);
        that.get_room_from_groups(d.data.currentData.label);
        that.my_date_select.emit(d.data.currentData.id);
        $(".group_room_group").hide();
        $(".group_room_group").hide();
        that.xialaicon = "arrow-ios-downward-outline";
      });
      // $(document).on("click", function () {
      //   $(".group_room_group").hide();
      //   that.xialaicon = "arrow-ios-downward-outline";
      // });
    });
  }

  // ================room
  room_tree_data;
  init_select_tree_room(data) {
    var that = this;
    that.room_tree_data = data;
    // console.error("room    init_select_tree_room>>>>", data);

    var single_el5s_room;
    layui.use(["eleTree"], function () {
      var eleTree = layui.eleTree;
      $("[name='temperature_group_room_room']").on("click", function (e) {
        // console.error("init_select_tree_room>>>>", data);
        if (that.xialaicon_room === "arrow-ios-upward-outline") {
          that.xialaicon_room = "arrow-ios-downward-outline";
        } else {
          that.xialaicon_room = "arrow-ios-upward-outline";
        }
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
        // 关闭日期范围
        $(".layui-laydate").remove();
        // 科室
        $(".group_room_group").hide();
        that.xialaicon = "arrow-ios-downward-outline";
        $(".group_room_room").hide();
        that.xialaicon_room = "arrow-ios-downward-outline";

        $(".my_time_point_labels").hide();
        that.xialaicon = "arrow-ios-downward-outline";

        $(".group_room_room").toggle();
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
        $(".group_room_room").hide();
        $(".group_room_room").hide();
        that.xialaicon_room = "arrow-ios-downward-outline";
      });
      $(document).on("click", function () {
        $(".group_room_room").hide();
        that.xialaicon_room = "arrow-ios-downward-outline";
      });
    });
  }

  // 根据groups得到room
  get_room_from_groups(groups) {
    this.http
      .callRPC(this.TABLE, this.METHODROOM, { groups: groups })
      .subscribe((result) => {
        var res = result["result"]["message"][0];
        if (res["code"] === 1) {
          $("[name='temperature_group_room_room']").val("");
          // this.init_select_tree_room(res["message"]);
          setTimeout(() => {
            if (this.single_el5s_room == undefined) {
              this.init_select_tree_room(res["message"]);
            }
            // console.error("message>>>>", this.single_el5s_room);
            this.single_el5s_room?.reload({ data: res["message"] }); // 重新加载树
          }, 100);
        }
      });
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
