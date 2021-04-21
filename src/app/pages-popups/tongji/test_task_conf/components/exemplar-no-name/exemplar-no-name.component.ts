import { Component, OnInit } from "@angular/core";

declare let $;
declare let layui;

@Component({
  selector: "ngx-exemplar-no-name",
  templateUrl: "./exemplar-no-name.component.html",
  styleUrls: ["./exemplar-no-name.component.scss"],
})
export class ExemplarNoNameComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    var data8 = [
      {
        id: "all",
        label: "全选",
        children: [
          {
            id: "001",
            label: "001",
          },
          {
            id: "002",
            label: "002",
          },
          {
            id: "003",
            label: "003",
          },
          {
            id: "004",
            label: "004",
          },
        ],
      },
    ];
    // this.init_layuiform(data8);
  }

  exemplar_no; // 三级编号
  exemplar_name; // 样件名称
  el8;
  init_layuiform(datas) {
    console.error("-----------------init_layuiform-------------------", datas);

    var that = this;
    layui.use(["eleTree"], function () {
      var eleTree = layui.eleTree;
      // 默认选中的数据 - 样件三级编号
      $("[name='exemplar_select_all']").val(datas[0]["checkedid"].join(","));
      $("[name='exemplar_select_all']").attr(
        "title",
        datas[0]["checkedid"].join(",")
      );
      // 默认选中的数据 - 设备名称
      var checked_name = [];
      datas[0]["checkedid"].forEach((element) => {
        datas[0]["children"].forEach((child) => {
          if (child["id"] === element) {
            checked_name.push(child["label"].split("&")[1]);
          }
        });
      });
      // console.error("^^^^^^^^^^checked_name^^^^^", checked_name);

      $("[name='exemplar_devicename']").val(checked_name.join(","));
      $("[name='exemplar_devicename']").attr("title", checked_name.join(","));

      $("[name='exemplar_select_all']").on("click", function (e) {
        e.stopPropagation();
        if (!that.el8) {
          that.el8 = eleTree.render({
            elem: ".ele8",
            data: datas,
            defaultExpandAll: true,
            expandOnClickNode: false,
            highlightCurrent: true,
            showCheckbox: true,
            checkStrictly: true,
            defaultCheckedKeys: datas[0]["checkedid"],
            checkOnClickNode: true, // 点击节点，选中
          });
        }

        // 样式！不展示树状结构！
        var childnodes = $(
          ".ele8>.eleTree-node>.eleTree-node-group"
        ).children();

        for (let index = 0; index < childnodes.length; index++) {
          const element = childnodes[index];
          element.children[0].style.paddingLeft = "0px";
        }
        // 样式！ 去掉父节点的图标，对齐！
        $(".ele8>.eleTree-node>.eleTree-node-content>span")[0].style.display =
          "none";
        $(".ele8>.eleTree-node>.eleTree-node-content")[0].style.paddingLeft =
          "18px";
        $(".ele8").toggle();
      });

      var handleselect_data = []; // input 展示的
      var handleselect_data_check = []; // 勾选
      var isChecked = true; //是否取消

      // 节点 点击事件
      eleTree.on("nodeClick(eexemplar_select_all_data8)", function (d) {
        // console.error("------------------最终的数据值--------------");
        if (isChecked) {
          if (d.data.currentData.id === "all") {
            handleselect_data_check.push(d.data.currentData.id);
            datas[0]["children"].forEach((element) => {
              handleselect_data_check.push(element["id"].split("&")[0]);
            });
            that.el8.setChecked(handleselect_data_check, true);
          }
        } else {
          handleselect_data = [];
          handleselect_data_check = [];
          that.el8.unCheckNodes(); // 取消选中
        }
        // console.error(
        //   "最终的数据值(el8.getChecked())：",
        //   that.el8.getChecked()
        // );
        handleselect_data = handle_select_data(that.el8.getChecked())["result"];
        var name_result = handle_select_data(that.el8.getChecked())[
          "name_result"
        ];
        // console.error("handleselect_data：", handleselect_data); // input 展示的数据！
        // console.error("name_result", name_result); // input 展示的数据！
        $("[name='exemplar_select_all']").val(handleselect_data.join(","));
        $("[name='exemplar_select_all']").attr(
          "title",
          handleselect_data.join(",")
        );

        $("[name='exemplar_devicename']").val(name_result.join(","));
        $("[name='exemplar_devicename']").attr("title", name_result.join(","));

        that.exemplar_no = handleselect_data;
        that.exemplar_name = name_result;
      });
      // input 选中
      eleTree.on("nodeChecked(eexemplar_select_all_data8)", function (d) {
        if (!d.isChecked && d.data.currentData.id === "all") {
          isChecked = false;
        } else {
          isChecked = true;
        }
      });

      $(document).on("click", function () {
        $(".ele8").hide();
      });

      // 多选-全选，解析选中的数据-填充input
      function handle_select_data(datas) {
        var result = [];
        var name_result = [];
        for (let index = 0; index < datas.length; index++) {
          const element = datas[index];
          if (element["id"] !== "all") {
            result.push(element["id"]);
            name_result.push(element["label"].split("&")[1]);
          }
        }

        return {
          result: result,
          name_result: name_result,
        };
      }
    });
  }

  get_form_val() {
    return {
      no: this.exemplar_no,
      name: this.exemplar_name,
    };
  }

  hide_exemplar_no_name() {
    $(".ele8").hide();
  }
}
