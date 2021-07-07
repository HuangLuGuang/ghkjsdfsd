import { Component, OnInit, Input } from "@angular/core";
import { SelectTreeService } from "../select-tree.service";
declare let $;
declare let layui;
@Component({
  selector: "ngx-my-select-tree-type",
  templateUrl: "./my-select-tree-type.component.html",
  styleUrls: ["./my-select-tree-type.component.scss"],
})
export class MySelectTreeTypeComponent implements OnInit {
  @Input("placeholder") placeholder: any;

  // 下拉 icon
  xialaicon = "arrow-ios-downward-outline";
  constructor(private selectService: SelectTreeService) {}

  placeholder_title_type;
  select_type = [];

  // el5_type
  el5_type;

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.placeholder_title_type = this.placeholder;
    $("[name='title_type']").attr("placeholder", this.placeholder_title_type);
    // $(".tree_type_isShow").hide()
  }

  ngOnDestroy() {
    this.dropselect();
  }

  // 节点被选择
  select_data = []; //[{id: 3, label: "nvh"},]
  select_label_list = [];
  tree_data; // 树结构数据

  // 下拉树示例
  init_select_trees(data) {
    // data存在-显示，否则不显示
    if (data.length > 0) {
      // $(".tree_type_isShow").show()
    } else {
      // $(".tree_type_isShow").hide()
    }
    var that = this;
    that.tree_data = data;
    var el5_type;
    layui.use(["eleTree"], function () {
      var eleTree = layui.eleTree;
      $("[name='title_type']").on("click", function (e) {
        // 关闭科室/功能组
        that.selectService.changeMessage(true);

        // if (that.xialaicon === "arrow-ios-upward-outline"){
        //   that.xialaicon = "arrow-ios-downward-outline"
        // }else{
        //   that.xialaicon = "arrow-ios-upward-outline";
        // }

        e.stopPropagation();
        if (!el5_type) {
          el5_type = eleTree.render({
            elem: ".eletype",
            data: data,
            defaultExpandAll: false,
            showCheckbox: true,
            expandOnClickNode: false,
            highlightCurrent: true,
            checkOnClickNode: true, // 点击节点时选中节点！
          });
          that.el5_type = el5_type;
        }
        $(".eletype").toggle();
        that.toggle();
        that.other_toggle();
      });

      // 节点被选择
      // var select_data = []; //[{id: 3, label: "nvh"},]
      // var select_label_list = [];
      eleTree.on("nodeChecked(datatype)", function (d) {
        // -----------------多选，科室功能组
        if (d.isChecked) {
          that.select_data.push(d.data.currentData); // {id: 3, label: "nvh"}
          that.select_label_list.push(d.data.currentData.label);
          that.select_type.push(d.data.currentData.id);
        } else {
          var index = that.select_label_list.indexOf(d.data.currentData.label);
          if (index != -1) {
            that.select_label_list.splice(index, 1); // 删除取消的
            that.select_type.splice(index, 1);
          }
          // that.select_type
        }
        $("[name='title_type']").val(that.select_label_list.join(";"));

        // console.log(d.node);    // 点击的dom节点
        // console.log(this);      // input对应的dom
      });
      $(document).on("click", function () {
        $(".eletype").hide();
        // that.xialaicon = "arrow-ios-downward-outline";
        that.toggle();
      });
    });
  }

  // i 图标 class 切换
  toggle() {
    var eletype = $(".eletype").css("display");
    if (eletype == "none") {
      $("#eletype_i").attr("class", "layui-icon layui-icon-down xiala");
    } else {
      $("#eletype_i").attr("class", "layui-icon layui-icon-up  xiala");
    }
  }

  // 其它的下拉
  other_toggle() {
    // 科室下拉框
    $(".ele5").hide();
    $(".single_ele5").hide();
    $(".single_tree_ele5").hide();
    var ele5 = $(".ele5").css("display");
    if (ele5 == "none") {
      $("#ele5_i").attr("class", "layui-icon layui-icon-down xiala");
    } else {
      $("#ele5_i").attr("class", "layui-icon layui-icon-up  xiala");
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
    // 状态指标 single_tree_data5
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

    // 日期选择器
    $(".layui-laydate").remove();
  }

  getselect() {
    return this.select_type;
    // return $("[name='title_type']").val();
  }

  // 删除选择的
  delselect() {
    $("[name='title_type']").val("");
    this.select_type = [];
    this.select_label_list = [];
  }

  // 清空下拉数据
  dropselect() {
    this.delselect();
    var select_type = this.el5_type?.getChecked();
    // if (select_type != undefined && select_type.length>0){
    //   this.el5_type?.reload({data:this.tree_data}); // 重新加载树
    //   this.el5_type?.unCheckNodes() //取消所有选中的节点
    // }
    this.el5_type?.reload({ data: this.tree_data }); // 重新加载树
    this.el5_type?.unCheckNodes(); //取消所有选中的节点
  }
}
