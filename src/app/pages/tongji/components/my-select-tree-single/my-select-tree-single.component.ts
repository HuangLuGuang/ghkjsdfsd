import { Component, OnInit, Input } from "@angular/core";
declare let $;
declare let layui;
@Component({
  selector: "ngx-my-select-tree-single",
  templateUrl: "./my-select-tree-single.component.html",
  styleUrls: ["./my-select-tree-single.component.scss"],
})
export class MySelectTreeSingleComponent implements OnInit {
  @Input("placeholder") placeholder: any;

  // 下拉 icon
  xialaicon = "arrow-ios-downward-outline";
  placeholder_title;

  // el5
  single_tree_el5s;

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.placeholder_title = this.placeholder;
    $("[name='single_tree_title']").attr("placeholder", this.placeholder_title);
    // $(".tree_isShow").hide();
  }
  ngOnDestroy() {
    this.dropselect();
  }

  tree_data; // 树结构数据
  // 下拉树示例
  init_select_tree(data) {
    var that = this;
    that.tree_data = data;
    var single_tree_el5s;
    layui.use(["eleTree"], function () {
      var eleTree = layui.eleTree;
      $("[name='single_tree_title']").on("click", function (e) {
        // if (that.xialaicon === "arrow-ios-upward-outline") {
        //   that.xialaicon = "arrow-ios-downward-outline";
        // } else {
        //   that.xialaicon = "arrow-ios-upward-outline";
        // }
        e.stopPropagation();
        if (!single_tree_el5s) {
          single_tree_el5s = eleTree.render({
            elem: ".single_tree_ele5",
            data: data,
            defaultExpandAll: false,
            showCheckbox: false,
            expandOnClickNode: false,
            highlightCurrent: true,
            // defaultCheckedKeys: [], // 默认勾选
            // defaultCheckedKeys: that.defaultCheckedKeys, // 默认勾选
            checkOnClickNode: true, // 点击节点时选中节点！
          });
          that.single_tree_el5s = single_tree_el5s;
        }
        $(".single_tree_ele5").toggle();
        that.toggle();
        that.other_toggle();
      });

      // 节点被选择
      // var select_data = that.select_data; //[{id: 3, label: "nvh"},]
      // var select_label_list = that.select_label_list;
      eleTree.on("nodeClick(single_tree_data5)", function (d) {
        // console.error("select_data",d.data.currentData)
        $("[name='single_tree_title']").val(d.data.currentData.label);
        $(".single_tree_ele5").hide();
        // that.xialaicon = "arrow-ios-downward-outline";
        that.toggle();
      });
      $(document).on("click", function () {
        $(".single_tree_ele5").hide();
        // that.xialaicon = "arrow-ios-downward-outline";
        that.toggle();
      });
    });
  }

  // i 图标 class 切换
  toggle() {
    var single_tree_ele5 = $(".single_tree_ele5").css("display");
    if (single_tree_ele5 == "none") {
      $("#single_tree_ele5_i").attr(
        "class",
        "layui-icon layui-icon-down single_tree_xiala"
      );
    } else {
      $("#single_tree_ele5_i").attr(
        "class",
        "layui-icon layui-icon-up  single_tree_xiala"
      );
    }
  }
  // 其它的下拉
  other_toggle() {
    // 科室下拉框
    $(".ele5").hide();
    $(".eletype").hide();
    $(".single_ele5").hide();
    var ele5 = $(".ele5").css("display");
    if (ele5 == "none") {
      $("#ele5_i").attr("class", "layui-icon layui-icon-down xiala");
    } else {
      $("#ele5_i").attr("class", "layui-icon layui-icon-up  xiala");
    }
    // 设备统计下拉框
    var eletype = $(".eletype").css("display");
    if (eletype == "none") {
      $("#eletype_i").attr("class", "layui-icon layui-icon-down xiala");
    } else {
      $("#eletype_i").attr("class", "layui-icon layui-icon-up  xiala");
    }

    // 月下拉
    var single_ele5 = $(".single_ele5").css("display");
    if (single_ele5 == "none") {
      $("#single_ele5_i").attr(
        "class",
        "layui-icon layui-icon-down single_xiala"
      );
    } else {
      $("#single_ele5_i").attr(
        "class",
        "layui-icon layui-icon-up  single_xiala"
      );
    }
    // 日期选择器
    $(".layui-laydate").remove();
  }

  getselect() {
    return $("[name='single_tree_title']").val();
  }
  // 删除选择的
  delselect() {
    var department_list = [
      { id: 1, label: "验证中心" },
      { id: 2, label: "工程中心" },
    ];
    $("[name='single_tree_title']").val(department_list[0]["label"]);
    // $("[name='single_tree_title']").val("");
  }
  // 设备工时明细--状态指标
  delselect2() {
    var statusdata = [
      { id: "running", label: "运行" },
      { id: "stop", label: "空闲" },
      { id: "warning", label: "维修" },
      { id: "placeon", label: "占位" },
    ];
    // $("[name='single_tree_title']").val(statusdata[0]["label"]);
    $("[name='single_tree_title']").val("");
  }

  // 清空下拉数据
  dropselect() {
    this.delselect();
    // console.log("清空下拉数据",$("[name='single_tree_title']").val());
    var select = this.single_tree_el5s?.getChecked();
    this.single_tree_el5s?.reload({ data: this.tree_data }); // 重新加载树
    // this.single_tree_el5s?.unCheckNodes() //取消所有选中的节点
  }

  // 设置选择的数据
  setselect(data) {
    $("[name='single_tree_title']").val(data);
  }
}
