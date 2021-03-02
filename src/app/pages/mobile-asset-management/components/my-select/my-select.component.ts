import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
declare let $;
declare let layui;

@Component({
  selector: "ngx-my-select",
  templateUrl: "./my-select.component.html",
  styleUrls: ["./my-select.component.scss"],
})
export class MySelectComponent implements OnInit {
  @Input("placeholder") placeholder: any;
  @Output() private selectvalue = new EventEmitter<any>();
  // 下拉 icon
  xialaicon = "arrow-ios-downward-outline";
  placeholder_title;

  // el5
  single_el5s;
  default_selected;

  constructor() {
    this.default_selected = "全部";
  }

  ngOnInit(): void {
    var data = [
      { id: 2, label: "全部" },
      { id: 1, label: "关注" },
      { id: 0, label: "非关注" },
    ];
    this.init_select_tree(data);
  }

  ngAfterViewInit() {
    this.placeholder_title = this.placeholder;
    $("[name='single_single_my_select']").attr(
      "placeholder",
      this.placeholder_title
    );
    $("[name='single_single_my_select']").val(this.default_selected);
  }

  tree_data; // 树结构数据
  // 下拉树示例
  init_select_tree(data) {
    var that = this;
    that.tree_data = data;
    var single_el5s;
    layui.use(["eleTree"], function () {
      var eleTree = layui.eleTree;
      $("[name='single_single_my_select']").on("click", function (e) {
        if (that.xialaicon === "arrow-ios-upward-outline") {
          that.xialaicon = "arrow-ios-downward-outline";
        } else {
          that.xialaicon = "arrow-ios-upward-outline";
        }
        e.stopPropagation();
        if (!single_el5s) {
          single_el5s = eleTree.render({
            elem: ".single_ele6",
            data: data,
            defaultExpandAll: false,
            showCheckbox: false,
            expandOnClickNode: false,
            highlightCurrent: true,
            // defaultCheckedKeys: [], // 默认勾选
            // defaultCheckedKeys: that.defaultCheckedKeys, // 默认勾选
            checkOnClickNode: true, // 点击节点时选中节点！
          });
          that.single_el5s = single_el5s;
        }
        $(".single_ele6").toggle();
      });

      // 节点被选择
      // var select_data = that.select_data; //[{id: 3, label: "nvh"},]
      // var select_label_list = that.select_label_list;
      eleTree.on("nodeClick(single_data6_my_select)", function (d) {
        console.error("select_data", d.data.currentData);
        $("[name='single_single_my_select']").val(d.data.currentData.label);
        // that.selectvalue.emit(d.data.currentData.label);
        that.selectvalue.emit(d.data.currentData.id);
        $(".single_ele6").hide();
        $(".single_ele6").hide();
        that.xialaicon = "arrow-ios-downward-outline";
      });
      $(document).on("click", function () {
        $(".single_ele6").hide();
        that.xialaicon = "arrow-ios-downward-outline";
      });
    });
  }

  getselect() {
    enum Month {
      "全部" = 2,
      "关注" = 1,
      "非关注" = 0,
    }
    var select_month = $("[name='single_single_my_select']").val();
    return Month[select_month];
  }
  // 删除选择的
  delselect() {
    $("[name='single_single_my_select']").val(this.default_selected);
  }

  // 清空下拉数据
  reset_month() {
    this.delselect();
    this.single_el5s?.reload({ data: this.tree_data }); // 重新加载树
  }
}
