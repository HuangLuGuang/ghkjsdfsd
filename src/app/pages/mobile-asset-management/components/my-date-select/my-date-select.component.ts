import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
declare let $;
declare let layui;

@Component({
  selector: "ngx-my-date-select",
  templateUrl: "./my-date-select.component.html",
  styleUrls: ["./my-date-select.component.scss"],
})
export class MyDateSelectComponent implements OnInit {
  @Input("placeholder") placeholder: any;
  @Output() private my_date_select = new EventEmitter<any>();
  // 下拉 icon
  xialaicon = "arrow-ios-downward-outline";
  placeholder_title;

  // el5
  single_el5s;
  default_month;

  constructor() {
    this.default_month = "近3天";
  }

  ngOnInit(): void {
    var data = [
      { id: 3, label: "近3天" },
      { id: 7, label: "近一周" },
      { id: 30, label: "近一个月" },
    ];
    this.init_select_tree(data);
  }

  ngAfterViewInit() {
    this.placeholder_title = this.placeholder;
    $("[name='gps_single_my_date_select']").attr(
      "placeholder",
      this.placeholder_title
    );
    // $(".tree_isShow").hide();
    $("[name='gps_single_my_date_select']").val(this.default_month);
  }

  tree_data; // 树结构数据
  // 下拉树示例
  init_select_tree(data) {
    var that = this;
    that.tree_data = data;
    var single_el5s;
    layui.use(["eleTree"], function () {
      var eleTree = layui.eleTree;
      $("[name='gps_single_my_date_select']").on("click", function (e) {
        if (that.xialaicon === "arrow-ios-upward-outline") {
          that.xialaicon = "arrow-ios-downward-outline";
        } else {
          that.xialaicon = "arrow-ios-upward-outline";
        }
        e.stopPropagation();
        if (!single_el5s) {
          single_el5s = eleTree.render({
            elem: ".single_ele5",
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
        $(".single_ele5").toggle();
      });

      // 节点被选择
      // var select_data = that.select_data; //[{id: 3, label: "nvh"},]
      // var select_label_list = that.select_label_list;
      eleTree.on("nodeClick(single_data5_my_date_select)", function (d) {
        // console.error("select_data",d.data.currentData)
        $("[name='gps_single_my_date_select']").val(d.data.currentData.label);
        // that.my_date_select.emit(d.data.currentData.label);
        that.my_date_select.emit(d.data.currentData.id);
        $(".single_ele5").hide();
        $(".single_ele5").hide();
        that.xialaicon = "arrow-ios-downward-outline";
      });
      $(document).on("click", function () {
        $(".single_ele5").hide();
        that.xialaicon = "arrow-ios-downward-outline";
      });
    });
  }

  getselect() {
    enum Month {
      "近3天" = 3,
      "近一周" = 7,
      "近一个月" = 30,
    }
    var select_month = $("[name='gps_single_my_date_select']").val();
    return Month[select_month];
  }
  // 删除选择的
  delselect() {
    $("[name='gps_single_my_date_select']").val(this.default_month);
  }

  // 清空下拉数据
  reset_month() {
    this.delselect();
    this.single_el5s?.reload({ data: this.tree_data }); // 重新加载树
  }
}
