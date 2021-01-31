import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { LayoutService } from "../../../@core/utils";
import { HttpserviceService } from "../../../services/http/httpservice.service";

import { ActivatedRoute } from "@angular/router";
import { DatePipe } from "@angular/common";
import { UserInfoService } from "../../../services/user-info/user-info.service";
import { PublicmethodService } from "../../../services/publicmethod/publicmethod.service";

let kpi_detail = require("../../../../assets/pages/system-set/js/kpi_detail");

@Component({
  selector: "ngx-kpi-detail",
  templateUrl: "./kpi-detail.component.html",
  styleUrls: ["./kpi-detail.component.scss"],
})
export class KpiDetailComponent implements OnInit {
  @ViewChild("myYear") myYear: any; // 年

  type; // 判断是那个组件的kpi： device 设备数据汇总、group 功能组数据汇总、department 部门数据汇总

  // 得到出入的数据 kpi_for_detail
  kpi_for_detail;

  // button title，设备的未 devicename，功能组的未 groups
  button_title;

  mothed_table_url_card = [];

  // eleclass 得到对应的div，monthed得到对应的数据 columns，方法需要的参数！
  // 第一行第一个 https://echarts.apache.org/examples/zh/editor.html?c=mix-timeline-finance
  one_row_one = (eleid, monthed, columns) => {
    this.querst("", monthed, columns).subscribe((result) => {
      // console.log("第一行第一个 ", result);
      var res = result["result"]["message"][0];
      var color = ["#DBB70D", "#5D920D"];
      var defalultdata = {
        color: color,
        Xdata: [
          "01",
          "02",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "11",
          "12",
        ],
        Series: [
          {
            name: "未完成",
            type: "bar",
            // barWidth: '20%',
            // barMaxWidth: 10,
            barWidth: 10,
            stack: "试验各状态每月变化趋势", // 堆叠
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          },
          {
            name: "已完成",
            type: "bar",
            // barWidth: '20%',
            // barMaxWidth: 10,
            barWidth: 10,
            stack: "试验各状态每月变化趋势", // 堆叠
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          },
          {
            name: null,
            type: "pie",
            center: ["75%", "35%"],
            // radius: '28%',
            radius: ["20%", "28%"],
            hoverOffset: 5,
            tooltip: {
              trigger: "item",
              axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
              },

              formatter: function (params) {
                var data = params.data;
                return (
                  data["title"] +
                  ":\t" +
                  data["value"] +
                  "个\t" +
                  (
                    (data["value"] * 100) /
                    (defalultdata.pieTotal === 0 ? 1 : defalultdata.pieTotal)
                  ).toFixed(2) +
                  "%"
                );
              },
              // formatter: '{b} <br/>{a0}: {c0}<br/>{a1}: {c1}'
            },
            z: 100,
            y: -60,
            x: -60,
            data: [
              {
                name: "未完成",
                value: 0,
                title: "未完成",
                itemStyle: { color: color[1] },
              },
              {
                name: "已完成",
                value: 0,
                title: "已完成",
                itemStyle: { color: color[0] },
              },
            ],
          },
        ],
        pieTotal: 0,
      };
      var success = {
        xdata: [],
        ydata: [],
        title: "",
      };
      var nosuccess = {
        xdata: [],
        ydata: [],
        title: "",
      };
      var pie_success = {
        xdata: [],
        ydata: [],
        title: "",
      };
      var pie_nosuccess = {
        xdata: [],
        ydata: [],
        title: "",
      };
      if (res["code"] === 1) {
        var bar = res["bar"];
        var pie = res["pie"];
        var numbers = res["numbers"][0]["numbers"];
        // bar
        bar.forEach((element) => {
          if (element["taskstatus"] === "已完成") {
            success.xdata.push(element["dates"]);
            success.ydata.push(element["numbers"]);
            success.title = element["taskstatus"];
          } else {
            nosuccess.xdata.push(element["dates"]);
            nosuccess.ydata.push(element["numbers"]);
            nosuccess.title = element["taskstatus"];
          }
        });
        for (let index = 0; index < 12; index++) {
          const xdata = success.xdata[index];
          const ydata = success.ydata[index];
          const noydata = nosuccess.ydata[index];
          // x
          if (xdata) {
            var _index = defalultdata.Xdata.indexOf(xdata);
            defalultdata.Xdata[_index] = xdata;
          }
          // y 已完成
          if (ydata) {
            var _index = defalultdata.Xdata.indexOf(xdata);
            defalultdata.Series[1].data[_index] = success.ydata[index]; // 已完成
            defalultdata.Series[1].name = success.title;
          }
          // y 未完成
          if (noydata) {
            var _index = defalultdata.Xdata.indexOf(xdata);
            defalultdata.Series[0].data[_index] = nosuccess.ydata[index]; // 未完成
            defalultdata.Series[0].name = nosuccess.title;
          }
        }
        // pie
        if (pie.length) {
          pie.forEach((element) => {
            if (element["taskstatus"] === "已完成") {
              pie_success.xdata.push(element["dates"]);
              pie_success.ydata.push(element["numbers"]);
              pie_success.title = element["taskstatus"];
            } else {
              pie_nosuccess.xdata.push(element["dates"]);
              pie_nosuccess.ydata.push(element["numbers"]);
              pie_nosuccess.title = element["taskstatus"];
            }
          });
          // all 已完成 {name: '已完成', value:0},
          // defalultdata.Series[2].data[0]["name"] = pie_success.title;
          defalultdata.Series[2].data[0]["title"] = pie_success.title;
          defalultdata.Series[2].data[0]["name"] =
            this.get_tal(pie_success.ydata) + "个";
          defalultdata.Series[2].data[0]["value"] = this.get_tal(
            pie_success.ydata
          );
          // all 未完成 {name: '未完成', value:0},
          // defalultdata.Series[2].data[1]["name"] = pie_nosuccess.title;
          defalultdata.Series[2].data[1]["title"] = pie_nosuccess.title;
          defalultdata.Series[2].data[1]["name"] =
            this.get_tal(pie_nosuccess.ydata) + "个";
          defalultdata.Series[2].data[1]["value"] = this.get_tal(
            pie_nosuccess.ydata
          );
          // pieTotal 总数 提示
          defalultdata.pieTotal = numbers;
        }
      }
      console.log("第一行，第一列：", defalultdata);
      kpi_detail.one_row_one(eleid, defalultdata);
    });
  };
  // one_row_one 需要，列表数据叠加
  get_tal(datas) {
    var tal = 0;
    datas.forEach((item) => {
      tal += item;
    });
    return tal;
  }

  // 第一行第二个
  one_row_two = (eleid, monthed, columns) => {
    this.querst("", monthed, columns).subscribe((result) => {
      console.log("第二行第二个 ", result);
      var res = result["result"]["message"][0];
      var defaultdata = {
        color: ["#5D920D", "#3333FF", "#FF4E0D", "#DBB70D"],
        xData: [
          "01",
          "02",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "11",
          "12",
        ],
        title: ["运行", "空闲", "维修", "占位"],
        running: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        stop: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        warning: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        placeon: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      };
      if (res["code"] === 1) {
        // 得到 x 轴！
        var resdatas = res["message"];
        var xData = [];
        var running = [];
        var stop = [];
        var warning = [];
        var placeon = [];
        resdatas.forEach((resdata) => {
          xData.push(resdata["dates"]);
          running.push(resdata["running"]);
          stop.push(resdata["stop"]);
          warning.push(resdata["warning"]);
          placeon.push(resdata["placeon"]);
        });

        // 赋值！
        for (let index = 0; index < defaultdata.xData.length; index++) {
          if (xData[index]) {
            var _index = defaultdata.xData.indexOf(xData[index]);
            defaultdata.xData[_index] = xData[index];
            defaultdata.running[_index] = running[index];
            defaultdata.stop[_index] = stop[index];
            defaultdata.warning[_index] = warning[index];
            defaultdata.placeon[_index] = placeon[index];
          }
        }
      }
      kpi_detail.one_row_two(eleid, defaultdata);
      // console.log("需要的数据格式：", defaultdata)
    });
  };

  // 第一行第三个
  one_row_three = (eleid, monthed, columns) => {
    columns.end = columns.year; // end 为 今年的
    columns.start = columns.year - 1; // start 为 去年的
    this.querst("", monthed, columns).subscribe((result) => {
      console.log("第一行第三个 ", result);
      var res = result["result"]["message"][0];
      var defaultdata = {
        // ["#FFBF9F", "#93C9FF"]
        color: ["rgba(225,191,159,1)", "rgba(147,201,255,1)"],
        areacolor: ["rgba(225,191,159,0.9)", "rgba(19, 173, 255, 0.5)"],
        linecolor: ["rgba(255,191,159, 1)", "rgba(19, 173, 255, 1)"],
        data1: {
          // 去年
          name: columns.start + "年",
          value: [0, 0, 0, 0],
        },
        data2: {
          // 今年
          name: columns.end + "年",
          value: [0, 0, 0, 0],
        },
        max: 366 * 24,
      };
      // 占位、空闲、维修、运行
      if (res["code"] === 1) {
        var message = res["message"];
        for (let index = 0; index < message.length; index++) {
          if (message[index] && message[index]["dates"]) {
            switch (Number(message[index]["dates"])) {
              case columns.start:
                defaultdata.data1.name = message[index]["dates"] + "年";
                defaultdata.data1.value[0] = message[index]["placeon"];
                defaultdata.data1.value[1] = message[index]["stop"];
                defaultdata.data1.value[2] = message[index]["warning"];
                defaultdata.data1.value[3] = message[index]["running"];
                break;
              case columns.end:
                defaultdata.data2.name = message[index]["dates"] + "年";
                defaultdata.data2.value[0] = message[index]["placeon"];
                defaultdata.data2.value[1] = message[index]["stop"];
                defaultdata.data2.value[2] = message[index]["warning"];
                defaultdata.data2.value[3] = message[index]["running"];
                break;
            }
          }
        }
        var data1_max = Math.max(...defaultdata.data1.value) + 100;
        var data2_max = Math.max(...defaultdata.data2.value) + 100;
        if (data1_max > data2_max) {
          defaultdata.max = data1_max;
        } else {
          defaultdata.max = data2_max;
        }
      }
      // console.log("第三个数据：", defaultdata)
      kpi_detail.one_row_three(eleid, defaultdata);
    });
  };

  // 第二行 第一个 https://echarts.apache.org/examples/zh/editor.html?c=mix-line-bar
  two_row_one = (eleid, monthed, columns) => {
    columns["startyear"] = columns.start;
    columns["endyear"] = columns.end;
    var _columns = {};

    if (columns.deviceid) {
      _columns["deviceid"] = columns.deviceid;
    } else if (columns["groupid"]) {
      _columns["groupid"] = columns.groupid;
    } else if (columns["department"]) {
      _columns["department"] = columns.department;
    }
    _columns["laststartmonth"] = this.datepip.transform(
      new Date(columns.start, 0, 1),
      "yyyy-MM-dd"
    );
    _columns["lastendmonth"] = this.datepip.transform(
      new Date(columns.start, 12, 0),
      "yyyy-MM-dd"
    );

    _columns["nowstartmonth"] = this.datepip.transform(
      new Date(columns.end, 0, 1),
      "yyyy-MM-dd"
    );
    _columns["nowendmonth"] = this.datepip.transform(
      new Date(columns.end, 12, 0),
      "yyyy-MM-dd"
    );

    _columns["startyear"] = columns.start;
    _columns["endyear"] = columns.end;
    this.querst("", monthed, _columns).subscribe((result) => {
      console.log("得到第二行第一个数据res： ", result);
      var defaultdata = {
        // color: ["#5D7FE5", "#26FF26"],
        // ["运行", "空闲"]
        color: ["#5D920D", "#3333FF", "#5D920D", "#3333FF"],
        xData: [
          "01",
          "02",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "11",
          "12",
        ],
        Series: [
          // 去年bar
          {
            name: _columns["startyear"] + "年",
            type: "bar",
            barWidth: 10,
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          },
          // 今年bar
          {
            name: _columns["endyear"] + "年",
            type: "bar",
            barWidth: 10,
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          },
          // 去年line
          {
            name: _columns["startyear"] + "年利用率",
            type: "line",
            // yAxisIndex: 1,
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          },
          // 今年line
          {
            name: _columns["endyear"] + "年利用率",
            type: "line",
            // yAxisIndex: 1,
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          },
          // 总的
          {
            type: "bar",
            xAxisIndex: 1,
            yAxisIndex: 2,
            showBackground: true,
            backgroundStyle: {
              // borderColor:"red"
            },

            data: [
              {
                value: 0,
                itemStyle: {
                  color: "#5D920D",
                },
                label: {
                  show: true,
                  // position: "insideTop",
                  fontSize: 20,
                  formatter: function (p) {
                    return p.value > 0 ? p.value : "";
                  },
                },
              },
              {
                value: 0,
                itemStyle: {
                  color: "#3333FF",
                },
                label: {
                  show: true,
                  // position: "insideTop",
                  fontSize: 20,
                  formatter: function (p) {
                    return p.value > 0 ? p.value : "";
                  },
                },
              },
            ],
          },
        ],
        Total: {
          yAxis: {
            data: [
              {
                value: _columns["startyear"] + "年-利用率",
                textStyle: {
                  color: "#5D920D",
                  // color: "rgb(51,51,51)",
                },
              },
              {
                value: _columns["endyear"] + "年-利用率",
                textStyle: {
                  color: "#3333FF",
                  // color: "rgb(51,51,51)",
                },
              },
            ],
          },
        },
      };
      var res = result["result"]["message"][0];
      if (res["code"] === 1) {
        var nowmonth = res["nowmonth"]; // 今年的
        var lastmonth = res["lastmonth"]; // 去年的
        var year = res["year"];
        if (nowmonth) {
          for (let index = 0; index < nowmonth.length; index++) {
            const element = nowmonth[index];
            var _index = defaultdata.xData.indexOf(element["dates"]);
            defaultdata.xData[_index] = element["dates"];
            defaultdata.Series[1].name = columns.end + "年";
            defaultdata.Series[1].data[_index] = element["ratio"];
            defaultdata.Series[3].name = columns.end + "年利用率";
            defaultdata.Series[3].data[_index] = element["ratio"];
          }
        }
        if (lastmonth) {
          for (let index = 0; index < lastmonth.length; index++) {
            const element = lastmonth[index];
            var _index = defaultdata.xData.indexOf(element["dates"]);
            defaultdata.xData[_index] = element["dates"];
            defaultdata.Series[0].name = columns.start + "年";
            defaultdata.Series[0].data[_index] = element["ratio"];
            defaultdata.Series[2].name = columns.start + "年利用率";
            defaultdata.Series[2].data[_index] = element["ratio"];
          }
        }
        // 年度的
        if (year && year[0] && year[0]["dates"] == _columns["startyear"]) {
          defaultdata.Series[4].data[0]["value"] = year[0].ratio;
        }
        if (year && year[1] && year[1]["dates"] == _columns["endyear"]) {
          defaultdata.Series[4].data[1]["value"] = year[1].ratio;
        }
      } else {
      }
      // console.log("第二行，第一个数据格式：", JSON.stringify(defaultdata))
      kpi_detail.two_row_one(eleid, defaultdata);
    });
  };

  // 第二行第二个 https://echarts.apache.org/examples/zh/editor.html?c=bar-stack
  two_row_two = (eleid, monthed, columns) => {
    var _columns = {};
    _columns["nowstartmonth"] = this.datepip.transform(
      new Date(columns.end, 0, 1),
      "yyyy-MM-dd"
    );
    _columns["nowendmonth"] = this.datepip.transform(
      new Date(columns.end, 12, 0),
      "yyyy-MM-dd"
    );
    _columns["startyear"] = columns.start;
    _columns["endyear"] = columns.end;
    if (columns.deviceid) {
      _columns["deviceid"] = columns.deviceid;
    } else if (columns["groupid"]) {
      _columns["groupid"] = columns.groupid;
    } else if (columns["department"]) {
      _columns["department"] = columns.department;
    }
    var defaultdata = {
      color: ["#DBB70D", "#5D920D", "#7E7EFF"],
      xData: [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
      ],
      Series: [
        {
          name: "占位",
          type: "bar",
          // barMaxWidth: 20,
          barWidth: 10,
          // barWidth: '20%',
          stack: "设备占位运行及开动率年度变化趋势",
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          z: 2,
          itemStyle: {
            normal: {
              // color: "rgba(255,144,128,1)",
              label: {
                show: true,
                textStyle: {
                  color: "#DBB70D",
                },
                // position: [0,-10],
                position: "top",

                formatter: function (p) {
                  return p.value > 0 ? p.value : "";
                },
              },
            },
          },
        },
        {
          name: "运行",
          type: "bar",
          // barMaxWidth: 20,
          barWidth: 10,
          // barWidth: '20%',
          stack: "设备占位运行及开动率年度变化趋势",
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          z: 1,
          itemStyle: {
            normal: {
              // color: "rgba(255,144,128,1)",
              label: {
                show: true,
                textStyle: {
                  color: "#5D920D",
                },
                // position: [0,-10],
                position: "top",

                formatter: function (p) {
                  return p.value > 0 ? p.value : "";
                },
              },
            },
          },
        },
        {
          name: "开动率",
          type: "line",
          barWidth: "20%",
          stack: "设备占位运行及开动率年度变化趋势",
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
      ],
      Total: {
        name: _columns["endyear"] + "开动率:\t" + 0,
      },
    };
    this.querst("", monthed, _columns).subscribe((result) => {
      console.log("第二行第二个res： ", result);
      var res = result["result"]["message"][0];
      if (res["code"] === 1) {
        var month = res["month"];
        var year = res["year"];
        if (month.length > 0) {
          for (let index = 0; index < 12; index++) {
            const element = month[index];
            if (element) {
              var _index = defaultdata.xData.indexOf(element["dates"]);
              defaultdata.xData[_index] = element["dates"];
              defaultdata.Series[0].data[index] = element["placeon"]; // 占位
              defaultdata.Series[1].data[index] = element["running"]; // 运行
              defaultdata.Series[2].data[index] = element["rate"]; // 运行
            }
          }
        }
        if (year.length > 0) {
          defaultdata.Total.name =
            year[0]["dates"] + "开动率" + ":\t" + year[0]["rate"];
        }
      }
      console.log("第二行第二个数据格式：", defaultdata);
      kpi_detail.two_row_two(eleid, defaultdata);
    });
  };

  // 第二行第三个
  two_row_three = (eleid, monthed, columns) => {
    var _columns = {};
    _columns["nowstartmonth"] = this.datepip.transform(
      new Date(columns.end, 0, 1),
      "yyyy-MM-dd"
    );
    _columns["nowendmonth"] = this.datepip.transform(
      new Date(columns.end, 12, 0),
      "yyyy-MM-dd"
    );
    _columns["startyear"] = columns.start;
    _columns["endyear"] = columns.end;
    if (columns.deviceid) {
      _columns["deviceid"] = columns.deviceid;
    } else if (columns["groupid"]) {
      _columns["groupid"] = columns.groupid;
    } else if (columns["department"]) {
      _columns["department"] = columns.department;
    }

    var defaultdata = {
      // color:['#DBB70D', '#5D920D', '#7E7EFF'],
      color: ["#5D920D", "#DBB70D", "#7E7EFF"],
      xData: [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
      ],
      Series: [
        {
          name: "完好率",
          type: "line",
          barWidth: "20%",
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
        {
          name: "故障率",
          type: "line",
          barWidth: "20%",
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
      ],
      Total: {
        name: _columns["endyear"] + "可用率:\t" + 0,
      },
    };
    this.querst("", monthed, _columns).subscribe((result) => {
      console.log("第二行第三个res： ", result);
      var res = result["result"]["message"][0];
      if (res["code"] === 1) {
        var availability = res["availability"]; // 可用率
        var failure = res["failure"]; // 故障率
        var year = res["year"]; // 年 可用率
        if (availability.length > 0) {
          for (let index = 0; index < 12; index++) {
            const element = availability[index];
            if (element) {
              var _index = defaultdata.xData.indexOf(element["dates"]);
              // defaultdata.xData[_index] = element["dates"];
              defaultdata.Series[0].data[_index] = element["availability"];
            }
          }
        }
        if (failure.length > 0) {
          for (let index = 0; index < 12; index++) {
            const element = failure[index];
            if (element) {
              var _index = defaultdata.xData.indexOf(element["dates"]);
              defaultdata.Series[1].data[_index] =
                element["failure"] === null ? 0 : element["failure"];
            }
          }
        }
        if (year[0]) {
          defaultdata.Total.name =
            year[0]["dates"] + "可用率:\t" + year[0]["availability"];
        }
      }
      console.log("第二行第三个数据格式：", defaultdata);
      kpi_detail.two_row_three(eleid, defaultdata);
    });
  };

  // 第三行，第一个
  three_row_one = (eleid, monthed, columns) => {
    var _columns = {};
    if (columns.deviceid) {
      _columns["deviceid"] = columns.deviceid;
    } else if (columns["groupid"]) {
      _columns["groupid"] = columns.groupid;
    } else if (columns["department"]) {
      _columns["department"] = columns.department;
    }
    _columns["laststartmonth"] = this.datepip.transform(
      new Date(columns.start, 0, 1),
      "yyyy-MM-dd"
    );
    _columns["lastendmonth"] = this.datepip.transform(
      new Date(columns.start, 12, 0),
      "yyyy-MM-dd"
    );

    _columns["nowstartmonth"] = this.datepip.transform(
      new Date(columns.end, 0, 1),
      "yyyy-MM-dd"
    );
    _columns["nowendmonth"] = this.datepip.transform(
      new Date(columns.end, 12, 0),
      "yyyy-MM-dd"
    );

    _columns["startyear"] = columns.start;
    _columns["endyear"] = columns.end;

    var defaultdata = {
      // 月份-倒序
      // xData: ['Dec', 'Nov', 'Oct', 'Sep', 'Aug', 'Jul', 'Jun','May','Apr','Mar','Feb','Jan'],
      xData: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      lineData: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
      lastYearData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      thisYearData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      legend: [columns.start, columns.end],
      // colors: ["rgb(119,134,150)", "rgb(60,208,60)"],
      colors: ["#5D920D", "#3333FF"],
    };
    var month_zh_en = {
      "01": "Jan",
      "02": "Feb",
      "03": "Mar",
      "04": "Apr",
      "05": "May",
      "06": "Jun",
      "07": "Jul",
      "08": "Aug",
      "09": "Sep",
      "10": "Oct",
      "11": "Nov",
      "12": "Dec",
    };

    this.querst("", monthed, _columns).subscribe((result) => {
      console.log("得到第三行，第一个： ", result);
      var res = result["result"]["message"][0];
      if (res["code"] === 1) {
        var lastyear = res["lastyear"];
        var nowyear = res["nowyear"];
        if (lastyear.length > 0) {
          for (let index = 0; index < lastyear.length; index++) {
            const element = lastyear[index];
            if (element) {
              var _index = defaultdata.xData.indexOf(element["dates"]);
              defaultdata.xData[_index] = month_zh_en[element["dates"]];
              defaultdata.lastYearData[_index] = element["average"];
            }
          }
        }
        if (nowyear.length > 0) {
          for (let index = 0; index < nowyear.length; index++) {
            const element = nowyear[index];
            if (element) {
              var _index = defaultdata.xData.indexOf(
                month_zh_en[element["dates"]]
              );

              defaultdata.xData[_index] = month_zh_en[element["dates"]];
              defaultdata.thisYearData[_index] = element["average"];
            }
          }
        }
      }
      // 列表倒序
      defaultdata.xData.reverse();
      defaultdata.lastYearData.reverse();
      defaultdata.thisYearData.reverse();
      console.log("得到第三行，第一个数据格式：", defaultdata);
      kpi_detail.three_row_one(eleid, defaultdata);
    });
  };
  // 第三行，第二个
  three_row_two = (eleid, monthed, columns) => {
    var _columns = {};
    _columns["start"] = this.datepip.transform(
      new Date(columns.end, 0, 1),
      "yyyy-MM-dd"
    );
    _columns["end"] = this.datepip.transform(
      new Date(columns.end, 12, 0),
      "yyyy-MM-dd"
    );
    if (columns.deviceid) {
      _columns["deviceid"] = columns.deviceid;
    } else if (columns["groupid"]) {
      _columns["groupid"] = columns.groupid;
    } else if (columns["department"]) {
      _columns["department"] = columns.department;
    }

    var defaultdata = {
      // 月份-倒序
      xData: [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
      ],
      error: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      warning: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      info: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      legend: ["error", "warning", "info"],
      colors: ["rgb(255,0,0)", "rgb(255,166,0)", "rgb(60,179,113)"],
    };

    this.querst("", monthed, _columns).subscribe((result) => {
      console.log("第三行，第二个： ", result);
      var res = result["result"]["message"][0];
      if (res["code"] === 1) {
        var message = res["message"];
        if (message.length) {
          for (let index = 0; index < message.length; index++) {
            const element = message[index];
            if (element) {
              var _index = defaultdata.xData.indexOf(element["dates"]);
              defaultdata.xData[_index] = element["dates"];
              switch (element["level"]) {
                case 1: //info
                  defaultdata.info[_index] = element["count"];
                  break;
                case 2: // warning
                  defaultdata.warning[_index] = element["count"];

                  break;
                case 3: // error
                  defaultdata.error[_index] = element["count"];
                  break;
              }
            }
          }
        }
      }
      console.log("得到第三行，第二个数据格式：", defaultdata);
      kpi_detail.three_row_two(eleid, defaultdata);
    });
  };

  // 第三行，第三个
  three_row_three = (eleid, monthed, columns) => {
    // columns.deviceid = "device_mts_01";
    var defaultdata = {
      // 月份-倒序
      xData: [0],
      SeriesData: [0],
    };
    this.querst("", monthed, columns).subscribe((result) => {
      console.log("得到第三行，第三个： ", result);
      var res = result["result"]["message"][0];
      if (res["code"] === 1) {
        var message = res["message"];
        if (message) {
          for (let index = 0; index < message.length; index++) {
            const element = message[index];
            if (element) {
              var _index = defaultdata.xData.indexOf(element["dates"]);
              defaultdata.xData[_index] = element["dates"];
              defaultdata.SeriesData[_index] = element["status"];
            }
          }
        }
      }
      console.log("得到第三行，第三个数据格式：", defaultdata);
      kpi_detail.three_row_three(eleid, defaultdata);
    });
  };

  // device 设备数据汇总、group 功能组数据汇总、department 部门数据汇总
  // 需要的mothed和对应的table的url 行数据！
  mothed_table_url = {
    device: {
      url: "/pages/tongji/device_hour_report/deivce_data_sum",
      kpi_for_detail: JSON.parse(
        localStorage.getItem("device_hour_report_kpi_for_detail")
      ),
      cards: [
        [
          {
            title: "试验各状态每月变化趋势",
            id: "kpi_00",
            method: "dev_task_count_kpi_year",
            myfun: this.one_row_one,
          },
          {
            title: "设备安灯月度趋势表",
            id: "kpi_01",
            method: "dev_get_device_columnar_kpi_month",
            myfun: this.one_row_two,
          }, // dev_get_device_columnar_kpi_month
          {
            title: "设备两年安灯状态累计对比",
            id: "kpi_02",
            method: "dev_get_device_columnar_kpi_year",
            myfun: this.one_row_three,
          },
        ],
        [
          {
            title: "设备利用率同比环比",
            id: "kpi_10",
            method: "dev_get_device_ratio_kpi_month",
            myfun: this.two_row_one,
          },
          {
            title: "设备占位运行及开动率年度变化趋势",
            id: "kpi_11",
            method: "dev_get_device_rate_kpi_month",
            myfun: this.two_row_two,
          },
          {
            title: "完好率与故障率变化趋势",
            id: "kpi_12",
            method: "dev_get_device_availability_kpi_month",
            myfun: this.two_row_three,
          },
        ],
        [
          {
            title: "平均维修(故障停机)时同比环比",
            id: "kpi_20",
            method: "dev_get_device_average_kpi",
            myfun: this.three_row_one,
          },
          {
            title: "设备报警统计",
            id: "kpi_21",
            method: "dev_get_device_log_kpi",
            myfun: this.three_row_two,
          },
          {
            title: "设备当天启停状态数据统计",
            id: "kpi_22",
            method: "dev_get_device_status_kpi",
            myfun: this.three_row_three,
          },
        ],
      ],
    },
    group: {
      url: "/pages/tongji/device_hour_report/group_data_sum",
      kpi_for_detail: JSON.parse(
        localStorage.getItem("device_hour_report_kpi_for_detail")
      ),
      cards: [
        [
          {
            title: "试验各状态每月变化趋势",
            id: "kpi_00",
            method: " dev_task_count_kpi_groups",
            myfun: this.one_row_one,
          },
          {
            title: "设备安灯月度趋势表",
            id: "kpi_01",
            method: "dev_get_device_columnar_kpi_groups",
            myfun: this.one_row_two,
          }, //
          {
            title: "设备两年安灯状态累计对比",
            id: "kpi_02",
            method: "dev_get_device_columnar_kpi_year_groups",
            myfun: this.one_row_three,
          }, // myfun:this.one_row_three
        ],
        [
          {
            title: "耐久类设备利用率同比和环比",
            id: "kpi_10",
            method: "dev_get_device_ratio_kpi_groups_durable",
            myfun: this.two_row_one,
          }, //myfun:this.two_row_one
          {
            title: "设备占位运行及开动率年度变化趋势",
            id: "kpi_11",
            method: "dev_get_device_rate_kpi_groups",
            myfun: this.two_row_two,
          }, //myfun: this.two_row_two
          {
            title: "可用率与故障率每月变化趋势",
            id: "kpi_12",
            method: "dev_get_device_availability_kpi_groups",
            myfun: this.two_row_three,
          }, // myfun:this.two_row_three
        ],
        // 第三行和device的第三行不统一
        [
          {
            title: "性能类设备利用率同比和环比",
            id: "kpi_20",
            method: "dev_get_device_ratio_kpi_groups_performance",
            myfun: this.two_row_one,
          }, // 与第二行第一个相同myfun: this.three_row_one
          {
            title: "平均维修（故障停机）时长同比环比",
            id: "kpi_21",
            method: "dev_get_device_average_kpi_groups",
            myfun: this.three_row_one,
          }, // 原第三行 第一个相同 myfun: this.three_row_two
          {
            title: "设备报警统计",
            id: "kpi_22",
            method: "dev_get_device_log_kpi_groups",
            myfun: this.three_row_two,
          }, // 原第三行 第二个相同 myfun: this.three_row_three
        ],
      ],
    },
    department: {
      url: "/pages/tongji/device_hour_report/department_data_sum",
      kpi_for_detail: JSON.parse(
        localStorage.getItem("device_hour_report_kpi_for_detail")
      ),
      cards: [
        [
          {
            title: "试验各状态每月变化趋势",
            id: "kpi_00",
            method: " dev_task_count_kpi_department",
            myfun: this.one_row_one,
          },
          {
            title: "设备安灯月度趋势表",
            id: "kpi_01",
            method: "dev_get_device_columnar_kpi_department",
            myfun: this.one_row_two,
          }, //  myfun:this.one_row_two
          {
            title: "设备两年安灯状态累计对比",
            id: "kpi_02",
            method: "dev_get_device_columnar_kpi_year_department",
            myfun: this.one_row_three,
          }, // myfun:this.one_row_three
        ],
        [
          {
            title: "耐久类设备利用率同比和环比",
            id: "kpi_10",
            method: "dev_get_device_ratio_kpi_department_durable",
            myfun: this.two_row_one,
          }, //myfun:this.two_row_one
          {
            title: "设备占位运行及开动率年度变化趋势",
            id: "kpi_11",
            method: "dev_get_device_rate_kpi_department",
            myfun: this.two_row_two,
          }, //myfun: this.two_row_two
          {
            title: "可用率与故障率每月变化趋势",
            id: "kpi_12",
            method: "dev_get_device_availability_kpi_department",
            myfun: this.two_row_three,
          }, // myfun:this.two_row_three
        ],
        // 第三行和device的第三行不统一
        [
          {
            title: "性能类设备利用率同比和环比",
            id: "kpi_20",
            method: "dev_get_device_ratio_kpi_department_performance",
            myfun: this.two_row_one,
          }, // 与第二行第一个相同myfun: this.three_row_one
          {
            title: "平均维修（故障停机）时长同比环比",
            id: "kpi_21",
            method: "dev_get_device_average_kpi_department",
            myfun: this.three_row_one,
          }, // 原第三行 第二个相同 myfun: this.three_row_three
          {
            title: "设备报警统计",
            id: "kpi_22",
            method: "dev_get_device_log_kpi_department",
            myfun: this.three_row_two,
          }, // 原第三行 第一个相同 myfun: this.three_row_two
        ],
      ],
    },
  };

  table_url = "";

  // 参数
  columns = {};

  // 返回button name
  button_name;

  // plv8请求
  querst(table: string, method: string, colmun: Object) {
    return new Observable((observe) => {
      this.http.callRPC(table, method, colmun).subscribe((result) => {
        observe.next(result);
      });
    });
  }

  constructor(
    private http: HttpserviceService,
    private router: Router,
    private layoutService: LayoutService,
    private activerouter: ActivatedRoute,
    private datepip: DatePipe,
    private userinfo: UserInfoService,
    private publicservice: PublicmethodService
  ) {
    // 会话过期
    localStorage.removeItem("alert401flag");
    this.kpi_for_detail = JSON.parse(
      localStorage.getItem("device_hour_report_kpi_for_detail")
    );

    // 得到路由参数！
    this.activerouter.queryParamMap.subscribe((res) => {
      this.type = res.get("name");
    });
  }

  ngOnInit(): void {
    if (this.type === "device") {
      this.table_url = this.mothed_table_url.device.url;
      this.button_title = this.kpi_for_detail["devicename"];
    } else if (this.type === "group") {
      this.table_url = this.mothed_table_url.group.url;
      this.button_title = this.kpi_for_detail["groups"];
    } else if (this.type === "department") {
      this.table_url = this.mothed_table_url.department.url;
      this.button_title = this.kpi_for_detail["department"];
    }
    console.log("kpi_detail----", this.kpi_for_detail);
    console.log("type----", this.type);

    this.layoutService.onInitLayoutSize().subscribe((f) => {
      var ids = [
        "kpi_00",
        "kpi_01",
        "kpi_02",
        "kpi_10",
        "kpi_11",
        "kpi_12",
        "kpi_20",
        "kpi_21",
        "kpi_22",
      ];
      ids.forEach((item) => {
        var item_echart = document.getElementById(item);
        if (item_echart) echarts.init(item_echart).resize();
      });
    });

    // 返回的数据button device
    // this.type
    if (this.type === "device") {
      this.button_name = "设备数据汇总";
      this.mothed_table_url_card = this.mothed_table_url.device.cards;
    } else if (this.type === "group") {
      this.button_name = "功能组数据汇总";
      this.mothed_table_url_card = this.mothed_table_url.group.cards;
    } else if (this.type === "department") {
      this.button_name = "部门数据汇总";
      this.mothed_table_url_card = this.mothed_table_url.department.cards;
    }
  }

  ngAfterViewInit() {
    // this.init_all_echart();
  }
  // 销毁组件时，删除 kpi_for_detail
  ngOnDestroy() {
    localStorage.removeItem("device_hour_report_kpi_for_detail");
  }

  // 返回 kpi报表
  kpireport() {
    // this.router.navigate(['/pages/tongji/device_hour_report'])
    this.router.navigate([this.table_url]);
  }

  // 3*3 card 的echart的图表
  init_all_echart(year) {
    // 判断是什么？device、group
    switch (this.type) {
      case "device": // 设备
        var kpi_for_detail = this.mothed_table_url.device.kpi_for_detail;
        var columns = {
          start: this.datepip.transform(new Date(year, 0, 1), "yyyy-MM-dd"),
          end: this.datepip.transform(new Date(year, 12, 0), "yyyy-MM-dd"),
          year: year,
          deviceid: kpi_for_detail["deviceid"],
        };
        this.mothed_table_url.device.cards.forEach((row) => {
          row.forEach((col) => {
            var eleid = col.id;
            var monthed = col.method;
            if (col.myfun) {
              col.myfun(eleid, monthed, columns);
            }
          });
        });
        break;

      case "group": // 科室/功能组
        var kpi_for_detail = this.mothed_table_url.group.kpi_for_detail;
        var groups_columns = {
          start: this.datepip.transform(new Date(year, 0, 1), "yyyy-MM-dd"),
          end: this.datepip.transform(new Date(year, 12, 0), "yyyy-MM-dd"),
          year: year,
          groupid: kpi_for_detail["groupid"],
        };
        this.mothed_table_url.group.cards.forEach((row) => {
          row.forEach((col) => {
            var eleid = col.id;
            var monthed = col.method;
            if (col.myfun) {
              col.myfun(eleid, monthed, groups_columns);
            }
          });
        });
        break;

      case "department": // 科室/功能组
        var kpi_for_detail = this.mothed_table_url.department.kpi_for_detail;
        var department_columns = {
          start: this.datepip.transform(new Date(year, 0, 1), "yyyy-MM-dd"),
          end: this.datepip.transform(new Date(year, 12, 0), "yyyy-MM-dd"),
          year: year,
          department: kpi_for_detail["department"],
        };
        this.mothed_table_url.department.cards.forEach((row) => {
          row.forEach((col) => {
            var eleid = col.id;
            var monthed = col.method;
            if (col.myfun) {
              col.myfun(eleid, monthed, department_columns);
            }
          });
        });
        break;
    }
  }

  // 选择年份时，执行
  select_year(year) {
    // console.log("选择年份时，执行",year)
    if (this.type === "device") {
      this.init_all_echart(year);
      this.RecordOperation(1, "查看", year + "设备数据汇总KPI详情");
    } else if (this.type === "group") {
      // console.error("group------------------------>")
      this.init_all_echart(year);
      this.RecordOperation(1, "查看", year + "功能组数据汇总KPI详情");
    } else if (this.type === "department") {
      // console.error("department------------------------>")
      this.init_all_echart(year);
      this.RecordOperation(1, "查看", year + "部门数据汇总KPI详情");
    }
  }

  // 初始化 左侧第一个echart设备时间统计
  init_left_one(left_method1, columns) {
    // 得到数据
    // this.querst("", this.left_method1, this.columns).subscribe(res=>{
    this.querst("", left_method1, columns).subscribe((res) => {
      // 得到 x 轴！
      var resdatas = res["result"]["message"][0];
      var xData = [];
      var running = [];
      var stop = [];
      var warning = [];
      var placeon = [];

      var afterdata = {};
      resdatas.forEach((resdata) => {
        xData.push(resdata["dates"]);
        running.push(resdata["running"]);
        stop.push(resdata["stop"]);
        warning.push(resdata["warning"]);
        placeon.push(resdata["placeon"]);
      });
      afterdata["xData"] = xData;
      afterdata["running"] = running; // 运行
      afterdata["stop"] = stop; // 空闲
      afterdata["warning"] = warning; // 维修
      afterdata["placeon"] = placeon; // 占位
      // ['运行', '空闲', '维修', "占位"]
      afterdata["title"] = ["运行", "空闲", "维修", "占位"];

      // console.log("得到左侧第一个数据： ", afterdata);
      kpi_detail.left_one(".left-one", afterdata);
    });
  }

  // 初始化右侧 第一个 echart 百分比
  init_right_ong(right_method1, columns) {
    // 得到数据
    // this.querst("", this.right_method1, this.columns).subscribe(res=>{
    this.querst("", right_method1, columns).subscribe((res) => {
      // 得到 x 轴！
      var resdatas = res["result"]["message"][0][0];
      var afterdatas = [];
      for (let k in resdatas) {
        var afterdata = {};
        var key;
        switch (k) {
          case "running":
            key = "运行";
            break;
          case "stop":
            key = "空闲";
            break;
          case "warning":
            key = "占位";
            break;
          case "placeon":
            key = "维修";
            break;
        }
        afterdata["name"] = key;
        afterdata["value"] = resdatas[k];
        afterdatas.push(afterdata);
      }
      var title = ["运行", "空闲", "维修", "占位"];
      // console.log("得到右侧第一个数据： ", afterdatas);
      kpi_detail.right_one(".right-one", {
        afterdatas: afterdatas,
        title: title,
      });
    });
  }

  // 初始化左侧 第二个 echart 月份数据
  init_left_two(left_method2, columns) {
    // 得到数据
    // this.querst("", this.left_method2, this.columns).subscribe(res=>{
    this.querst("", left_method2, columns).subscribe((res) => {
      // 得到 x 轴！
      var resdatas = res["result"]["message"][0];
      var afterdatas = {};
      var xData = [];
      var yData = [];
      resdatas.forEach((data) => {
        xData.push(data["dates"] + "月");
        yData.push(data["running"]);
      });
      afterdatas["xData"] = xData;
      afterdatas["yData"] = yData;

      // console.log("得到左侧 第二个数据： ", afterdatas);
      kpi_detail.left_two(".left-two", afterdatas);
    });
  }

  // 初始化右侧 第二个 echart 年份数据
  init_right_two(right_method2, columns) {
    // 得到数据
    // this.querst("", this.right_method2, this.columns).subscribe(res=>{
    this.querst("", right_method2, columns).subscribe((res) => {
      // 得到 x 轴！
      var resdatas = res["result"]["message"][0];
      var afterdatas = {};
      var xData = [];
      var yData = [];
      resdatas.forEach((data) => {
        xData.push(data["dates"] + "年");
        yData.push(data["running"]);
      });
      afterdatas["xData"] = xData;
      afterdatas["yData"] = yData;

      // console.log("得到左侧 第二个数据： ", afterdatas);
      kpi_detail.right_two(".right-two", afterdatas);
    });
  }

  // 监听窗口变化来，重置echat的大小！
  listen_windows_resize() {
    window.onreset = function () {
      let left_one = document.querySelector(".left-one");
      if (left_one) echarts.init(left_one).resize();
      let right_one = document.querySelector(".right-one");
      if (right_one) echarts.init(right_one).resize();
      let left_two = document.querySelector(".left-two");
      if (left_two) echarts.init(left_two).resize();
      let right_two = document.querySelector(".right-two");
      if (right_two) echarts.init(right_two).resize();
    };
  }

  // option_record
  RecordOperation(result, transactiontype, infodata) {
    if (this.userinfo.getLoginName()) {
      var employeeid = this.userinfo.getEmployeeID();
      var result = result; // 1:成功 0 失败
      var transactiontype = transactiontype; // '新增用户';
      var info = infodata;
      var createdby = this.userinfo.getLoginName();
      this.publicservice.option_record(
        employeeid,
        result,
        transactiontype,
        info,
        createdby
      );
    }
  }
}
