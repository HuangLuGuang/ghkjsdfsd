import { Component, OnInit } from "@angular/core";

declare let $;
declare let layui;

@Component({
  selector: "ngx-time-interval",
  templateUrl: "./time-interval.component.html",
  styleUrls: ["./time-interval.component.scss"],
})
export class TimeIntervalComponent implements OnInit {
  placeholder_title = "1s";

  el5s;
  defalut_data;

  constructor() {
    this.defalut_data = "1秒钟";
  }

  data = [
    { id: 1, label: "1秒钟" },
    { id: 10, label: "10秒钟" },
    { id: 60, label: "1分钟" },
  ];

  ngOnInit(): void {
    this.init_select_tree(this.data);
  }
  ngAfterViewInit() {
    $("[name='time_interval']").attr("placeholder", this.placeholder_title);

    $("[name='time_interval']").val(this.defalut_data);
  }

  tree_data; // 树结构数据

  // 下拉树示例
  init_select_tree(data) {
    var that = this;
    that.tree_data = data;
    var el5s;
    layui.use(["eleTree"], function () {
      var eleTree = layui.eleTree;
      $("[name='time_interval']").on("click", function (e) {
        e.stopPropagation();
        if (!el5s) {
          el5s = eleTree.render({
            elem: ".time_interval_labels",
            data: data,
            defaultExpandAll: false,
            showCheckbox: false,
            expandOnClickNode: false,
            highlightCurrent: true,
            // defaultCheckedKeys: [], // 默认勾选
            // defaultCheckedKeys: that.defaultCheckedKeys, // 默认勾选
            checkOnClickNode: true, // 点击节点时选中节点！
          });
          that.el5s = el5s;
        }

        $(".time_interval_labels").toggle();
        // ---------------
        that.toggle();
        that.other_toggle();
        // ---------------
      });
      // 节点被选择
      eleTree.on("nodeClick(time_interval_data)", function (d) {
        // console.error("select_data", d.data.currentData);
        $("[name='time_interval']").val(d.data.currentData.label);
        // that.my_date_select.emit(d.data.currentData.id);
        $(".time_interval_labels").hide();
        $(".time_interval_labels").hide();
      });
      $(document).on("click", function () {
        $(".time_interval_labels").hide();
        that.toggle();
      });
    });
  }

  // i 图标 class 切换
  toggle() {
    var time_interval_labels = $(".time_interval_labels").css("display");
    if (time_interval_labels == "none") {
      $("#time_interval_i").attr("class", "layui-icon layui-icon-down xiala");
    } else {
      $("#time_interval_i").attr("class", "layui-icon layui-icon-up  xiala");
    }
  }
  // 其它的下拉
  other_toggle() {
    // 科室房间号下拉框
    $(".group_room_group").hide();
    $(".group_room_room").hide();
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
    // 日期选择器
    $(".layui-laydate").remove();
  }

  getselect() {
    enum Data {
      "1秒钟" = 1,
      "10秒钟" = 10,
      "1分钟" = 60,
    }
    var time_interval = $("[name='time_interval']").val();
    return Data[time_interval];
  }
  // 删除选择的
  delselect() {
    $("[name='time_interval']").val(this.defalut_data);
  }
  // 清空下拉数据
  reset() {
    this.delselect();
    this.el5s?.reload({ data: this.tree_data }); // 重新加载树
  }
}
