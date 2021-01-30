import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
// kpi_
declare let $;
declare let layui;
@Component({
  selector: "ngx-year",
  templateUrl: "./year.component.html",
  styleUrls: ["./year.component.scss"],
})
export class YearComponent implements OnInit {
  @Input("placeholder") placeholder: any;

  @Output() private select_year = new EventEmitter<number>();

  // 下拉 icon
  kpi_xialaicon = "arrow-ios-downward-outline";
  placeholder_title;

  min_year;

  // el5
  kpi_single_el5s;
  constructor() {
    var kpi_for_detail = JSON.parse(
      localStorage.getItem("device_hour_report_kpi_for_detail")
    );
    this.min_year = kpi_for_detail["starttime"].split("-")[0];
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.select_year.emit(this.get_curr_and_before_year()[0].id);
    setTimeout(() => {
      this.init_select_tree();
    }, 1000);

    this.placeholder_title = this.placeholder;
    $("[name='kpi_single_title']").attr("placeholder", this.placeholder_title);

    $("[name='kpi_single_title']").val(
      this.get_curr_and_before_year()[0].label
    );
  }
  ngOnDestroy() {
    this.reset_month();
  }

  tree_data; // 树结构数据
  // 下拉树示例

  init_select_tree() {
    var that = this;
    var data = that.get_curr_and_before_year();
    that.tree_data = data;
    var kpi_single_el5s;
    layui.use(["eleTree"], function () {
      var eleTree = layui.eleTree;
      $("[name='kpi_single_title']").on("click", function (e) {
        if (that.kpi_xialaicon === "arrow-ios-upward-outline") {
          that.kpi_xialaicon = "arrow-ios-downward-outline";
        } else {
          that.kpi_xialaicon = "arrow-ios-upward-outline";
        }
        e.stopPropagation();
        if (!kpi_single_el5s) {
          kpi_single_el5s = eleTree.render({
            elem: ".kpi_single_ele5",
            data: data,
            defaultExpandAll: false,
            showCheckbox: false,
            expandOnClickNode: false,
            highlightCurrent: true,
            // defaultCheckedKeys: [], // 默认勾选
            // defaultCheckedKeys: that.defaultCheckedKeys, // 默认勾选
            checkOnClickNode: true, // 点击节点时选中节点！
          });
          that.kpi_single_el5s = kpi_single_el5s;
        }
        $(".kpi_single_ele5").toggle();
      });
      // 节点被选择
      eleTree.on("nodeClick(kpi_single_data5)", function (d) {
        // {id: 2021, label: "2021年"}
        // console.error("select_data",d.data.currentData);
        // 调用父组件！
        that.select_year.emit(d.data.currentData.id);
        $("[name='kpi_single_title']").val(d.data.currentData.label);
        $(".kpi_single_ele5").hide();
      });
      $(document).on("click", function () {
        $(".kpi_single_ele5").hide();
        that.kpi_xialaicon = "arrow-ios-downward-outline";
      });
    });
  }
  // 得到本年、和本年的上一年
  get_curr_and_before_year() {
    var min_year = Number(this.min_year);
    var curr_year = new Date().getFullYear();
    if (min_year >= curr_year) {
      var before_year = curr_year - 1;
      return [
        { id: curr_year, label: curr_year + "年" },
        { id: before_year, label: before_year + "年" },
      ];
    } else {
      // 选择的年份 < 当前的年份
      var year_list = [];
      for (let index = 0; index < curr_year - min_year + 1; index++) {
        var year_item = {
          id: curr_year - index,
          label: curr_year - index + "年",
        };
        year_list.push(year_item);
      }
      // console.error("year_list",year_list);
      return year_list;
    }
  }

  getselect() {
    return $("[name='kpi_single_title']").val();
  }
  // 删除选择的
  delselect() {
    $("[name='kpi_single_title']").val(
      this.get_curr_and_before_year()[0].label
    );
  }
  // 清空下拉数据
  reset_month() {
    this.delselect();
    // console.log("清空下拉数据",$("[name='single_title']").val());
    var select = this.kpi_single_el5s?.getChecked();
    this.kpi_single_el5s?.reload({ data: this.tree_data }); // 重新加载树
    // this.kpi_single_el5s?.unCheckNodes() //取消所有选中的节点
  }
}
