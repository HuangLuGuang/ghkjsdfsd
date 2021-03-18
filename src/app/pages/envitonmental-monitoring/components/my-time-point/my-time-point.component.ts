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
  xialaicon_room = "arrow-ios-downward-outline";
  placeholder_title;
  select_type = [];

  // el5
  el5s;

  constructor() {}

  ngOnInit(): void {}
  ngAfterViewInit() {
    this.placeholder_title = this.placeholder;
    $("[name='my_time_point']").attr("placeholder", this.placeholder_title);
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
        if (that.xialaicon === "arrow-ios-upward-outline") {
          that.xialaicon = "arrow-ios-downward-outline";
        } else {
          that.xialaicon = "arrow-ios-upward-outline";
        }
        // e.stopPropagation();
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
        $(".layui-laydate").remove();
        // 科室
        $(".group_room_group").hide();
        // that.xialaicon = "arrow-ios-downward-outline";
        $(".group_room_room").hide();
        that.xialaicon_room = "arrow-ios-downward-outline";

        $(".my_time_point_labels").toggle();
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
      // $(document).on("click", function () {
      //   $(".my_time_point_labels").hide();
      //   that.xialaicon = "arrow-ios-downward-outline";
      // });
    });
  }

  blur(e){
    console.log(e);
    this.xialaicon = "arrow-ios-downward-outline";
    $(".my_time_point_labels").hide();
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
