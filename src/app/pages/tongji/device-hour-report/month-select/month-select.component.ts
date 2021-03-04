import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
declare let $;
declare let layui;
@Component({
  selector: "ngx-month-select",
  templateUrl: "./month-select.component.html",
  styleUrls: ["./month-select.component.scss"],
})
export class MonthSelectComponent implements OnInit {
  @Input("placeholder") placeholder: any;

  @Output() private inpuvalue = new EventEmitter<any>();

  // 下拉 icon
  xialaicon = "arrow-ios-downward-outline";
  placeholder_title;

  // el5
  single_el5s;

  default_month;
  constructor() {
    enum Month {
      "一月" = 1,
      "二月",
      "三月",
      "四月",
      "五月",
      "六月",
      "七月",
      "八月",
      "九月",
      "十月",
      "十一月",
      "十二月",
    }
    var curr_month = new Date().getMonth() + 1;
    this.default_month = Month[curr_month];
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.placeholder_title = this.placeholder;
    $("[name='single_title']").attr("placeholder", this.placeholder_title);
    // $(".tree_isShow").hide();
    $("[name='single_title']").val(this.default_month);
  }
  ngOnDestroy() {
    this.reset_month();
  }

  tree_data; // 树结构数据
  // 下拉树示例
  init_select_tree(data) {
    var that = this;
    that.tree_data = data;
    var single_el5s;
    layui.use(["eleTree"], function () {
      var eleTree = layui.eleTree;
      $("[name='single_title']").on("click", function (e) {
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
      eleTree.on("nodeClick(single_data5)", function (d) {
        // console.error("select_data",d.data.currentData)
        $("[name='single_title']").val(d.data.currentData.label);
        that.inpuvalue.emit(d.data.currentData.label);
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
    var month_value = {
      一月: "01",
      二月: "02",
      三月: "03",
      四月: "04",
      五月: "05",
      六月: "06",
      七月: "07",
      八月: "08",
      九月: "09",
      十月: "10",
      十一月: "11",
      十二月: "12",
    };
    var select_month = $("[name='single_title']").val();

    // return $("[name='single_title']").val();
    return month_value[select_month];
  }
  // 删除选择的
  delselect() {
    $("[name='single_title']").val(this.default_month);
  }
  // 清空下拉数据
  reset_month() {
    this.delselect();
    // console.log("清空下拉数据",$("[name='single_title']").val());
    var select = this.single_el5s?.getChecked();
    this.single_el5s?.reload({ data: this.tree_data }); // 重新加载树
    // this.single_el5s?.unCheckNodes() //取消所有选中的节点
  }
}
