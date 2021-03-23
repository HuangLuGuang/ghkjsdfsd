import { Component, OnInit, Input } from "@angular/core";
declare let $;
declare let layui;
@Component({
  selector: "ngx-my-time-point",
  templateUrl: "./my-time-point.component.html",
  styleUrls: ["./my-time-point.component.scss"],
})
export class MyTimePointComponent implements OnInit {
  @Input("placeholder") placeholder: any;

  // 下拉 icon
  xialaicon = "arrow-ios-downward-outline";
  placeholder_title;
  select_type = [];

  // el5
  el5s;

  constructor() {}

  ngOnInit(): void {}
  ngAfterViewInit() {
    this.placeholder_title = this.placeholder;
    $("[name='my_time_point']").attr("placeholder", this.placeholder_title);

    // ====================
    // 时间点
    var timepoints = [
      { id: 1, label: "01:00" },
      { id: 2, label: "02:00" },
      { id: 3, label: "03:00" },
      { id: 4, label: "04:00" },
      { id: 5, label: "05:00" },
      { id: 6, label: "06:00" },
      { id: 7, label: "07:00" },
      { id: 8, label: "08:00" },
      { id: 9, label: "09:00" },
      { id: 10, label: "10:00" },
      { id: 11, label: "11:00" },
      { id: 12, label: "12:00" },
      { id: 13, label: "13:00" },
      { id: 14, label: "14:00" },
      { id: 15, label: "15:00" },
      { id: 16, label: "16:00" },
      { id: 17, label: "17:00" },
      { id: 18, label: "18:00" },
      { id: 19, label: "19:00" },
      { id: 20, label: "20:00" },
      { id: 21, label: "21:00" },
      { id: 22, label: "22:00" },
      { id: 23, label: "23:00" },
      { id: 24, label: "24:00" },
    ];
    this.init_select_tree(timepoints);
  }

  select_data = [];
  select_label_list = [];
  defaultCheckedKeys = []; // 默认勾选的

  tree_data; // 树结构数据

  // 下拉树示例
  init_select_tree(data) {
    var that = this;
    that.tree_data = data;
    var el5s;
    layui.use(["eleTree"], function () {
      var eleTree = layui.eleTree;
      $("[name='my_time_point']").on("click", function (e) {
        // if (that.xialaicon === "arrow-ios-upward-outline") {
        //   that.xialaicon = "arrow-ios-downward-outline";
        // } else {
        //   that.xialaicon = "arrow-ios-upward-outline";
        // }

        e.stopPropagation();
        if (!el5s) {
          el5s = eleTree.render({
            elem: ".my_time_point_labels",
            data: data,
            defaultExpandAll: false,
            showCheckbox: true,
            expandOnClickNode: false,
            highlightCurrent: true,
            // defaultCheckedKeys: [], // 默认勾选
            defaultCheckedKeys: that.defaultCheckedKeys, // 默认勾选
            checkOnClickNode: true, // 点击节点时选中节点！
          });
          that.el5s = el5s;
        }
        // 关闭日期范围
        // $(".layui-laydate").remove();
        // 科室
        // $(".group_room_group").hide();
        // $(".group_room_room").hide();

        $(".my_time_point_labels").toggle();
        // ---------------
        that.toggle();
        that.other_toggle();
        // ---------------
      });

      // 节点被选择
      eleTree.on("nodeChecked(my_time_point_data)", function (d) {
        if (d.isChecked) {
          that.select_data.push(d.data.currentData); // {id: 3, label: "nvh"}
          that.select_label_list.push(d.data.currentData.label);
          that.select_type.push(d.data.currentData.id);
        } else {
          var index = that.select_label_list.indexOf(d.data.currentData.label);
          if (index != -1) {
            // 表示存在
            that.select_label_list.splice(index, 1); // 删除取消的
            that.select_type.splice(index, 1);
          }
        }
        $("[name='my_time_point']").val(that.select_label_list.join(";"));
      });
      $(document).on("click", function () {
        $(".my_time_point_labels").hide();
        // that.xialaicon = "arrow-ios-downward-outline";
        that.toggle();
      });
    });
  }

  // i 图标 class 切换
  toggle() {
    var my_time_point_labels = $(".my_time_point_labels").css("display");
    if (my_time_point_labels == "none") {
      $("#my_time_point_i").attr("class", "layui-icon layui-icon-down xiala");
    } else {
      $("#my_time_point_i").attr("class", "layui-icon layui-icon-up  xiala");
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
    // return $("[name='my_time_point']").val();
    return this.select_type;
  }
  // 删除选择的
  delselect() {
    $("[name='my_time_point']").val("");
    this.select_type = [];
    this.defaultCheckedKeys = [];
    this.select_label_list = [];
  }
  // 清空下拉数据
  dropselect() {
    this.delselect();
    // console.log("清空下拉数据",$("[name='title']").val());

    var select = this.el5s?.getChecked();
    // if (select != undefined &&select.length >0){
    //   this.el5s?.reload({data:this.tree_data}); // 重新加载树
    //   this.el5s?.unCheckNodes() //取消所有选中的节点
    // }
    this.el5s?.reload({ data: this.tree_data }); // 重新加载树
    this.el5s?.unCheckNodes(); //取消所有选中的节点
  }
}
