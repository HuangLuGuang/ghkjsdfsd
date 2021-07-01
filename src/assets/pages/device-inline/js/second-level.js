let second_level = {
  // device-rate 设备xx率  试验条目状态
  // 参考 https://gallery.echartsjs.com/editor.html?c=x8UGFy_Nb
  // device_rate( afterdata) {
  //     // var mychart = echarts.init(document.querySelector(element));
  //     // var mychart = myChart;
  //     var option = {
  //         color: ["#5D7FE5", "#1F4E65"],
  //         tooltip: {
  //             trigger: "item", //axis
  //             axisPointer: {
  //                 type: "cross",
  //                 crossStyle: {
  //                     color: "#999"
  //                 }
  //             }
  //         },
  //         grid: [{
  //                 top: "30%",
  //                 right: 10,
  //                 left: "3%",
  //                 bottom: "5%",
  //                 containLabel: true
  //             }, {
  //                 height: "20%",
  //                 width: "20%",
  //                 right: 30,
  //                 top: "1%"
  //             },

  //         ],
  //         xAxis: [

  //             {
  //                 name: "月份",
  //                 nameTextStyle: {
  //                     padding: [30, 0, 0, -20]
  //                 },
  //                 type: "category",
  //                 // data: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
  //                 data: afterdata.xData,
  //                 axisPointer: {
  //                     type: "shadow"
  //                 },
  //                 axisLabel: {
  //                     interval: 0,
  //                     color: '#fff',
  //                     rotate: -45
  //                 },
  //                 gridIndex: 0
  //             },

  //             {
  //                 type: "value",
  //                 zlevel: 1,
  //                 axisPointer: {
  //                     show: false,
  //                     type: "none"
  //                 },
  //                 // name: '123条',
  //                 nameTextStyle: {
  //                     // padding: [0, 0, 30, -100],
  //                     fontSize: 18
  //                 },
  //                 max:afterdata.Series.totaldata,
  //                 gridIndex: 1,
  //                 axisLine: {
  //                     show: false
  //                 },
  //                 axisLabel: {
  //                     show: false
  //                 },
  //                 splitLine: {
  //                     show: false
  //                 },
  //                 axisTick: {
  //                     show: false
  //                 },
  //                 splitArea: {
  //                     show: false
  //                 },
  //             }

  //         ],
  //         yAxis: [{
  //                 type: "value",
  //                 min: 0,
  //                 // max: 100,
  //                 interval: 0,
  //                 gridIndex: 0,
  //                 axisLabel: {
  //                     formatter: "{value}",
  //                     color: "rgba(197, 55, 55, 1)"
  //                 },
  //                 axisLine: {
  //                     show: false
  //                 },
  //             },

  //             {
  //                 type: "category",
  //                 gridIndex: 1,
  //                 max: 1,
  //                 axisLine: {
  //                     show: false
  //                 },
  //                 axisTick: {
  //                     show: false
  //                 },

  //                 data: [{
  //                     // value: "累计完成试验数量",
  //                     value: afterdata.Series.name,
  //                     textStyle: {
  //                         color: "#fff",
  //                         fontSize: 20
  //                     }
  //                 }]
  //             }

  //         ],
  //         series: [{
  //                 type: "bar",
  //                 barWidth: "60%",
  //                 // data: [10, 52, 20, 34, 39, 33, 22]
  //                 data: afterdata.Series.data,
  //                 z:2
  //             }, {
  //                 type: "bar",
  //                 barWidth: "60%",
  //                 barGap:'-100%',
  //                 z:1,
  //                 data: afterdata.Series.data_plan,
  //             },
  //             {
  //                 type: "bar",
  //                 xAxisIndex: 1,
  //                 yAxisIndex: 1,

  //                 showBackground: true,
  //                 backgroundStyle: {
  //                     borderColor: '#9DC3F1',
  //                     borderWidth: 4
  //                 },
  //                 data: [{
  //                     // value: 132,
  //                     value: afterdata.totaldata,
  //                     itemStyle: {
  //                         color: "#5D7FE5"
  //                     },
  //                     label: {
  //                         show: true,
  //                         position: 'inside',
  //                         formatter: '{c}条',
  //                         offset: [1, 4],
  //                         fontSize: 16
  //                     },
  //                     tooltip: {
  //                         formatter: ''
  //                     }
  //                 }]
  //             }

  //         ],
  //         dataZoom: [{
  //             show: false,
  //             type: 'slider',
  //             textStyle: {
  //                 color: '#fff',
  //             },
  //             start: 1,
  //             end: 12,
  //         }]
  //     }
  //     console.log(JSON.stringify(option));
  //     return option;

  //     // mychart.setOption(option);
  //     // mychart.resize()
  // },

  device_rate_v2(myChart, afterdata) {
    var option_ate_v2 = {
      color: afterdata.color,

      title: {
        text: "",
        subtext: afterdata.pieTotal,
        top: "16%",
        textAlign: "center",
        left: "76%",
        textStyle: {
          color: "#000",
          fontSize: 10,
          // fontWeight: '400'
        },
        subtextStyle: {
          color: "#000",
          fontSize: 10,
          fontWeight: "600",
        },
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
        },
        // formatter: '{b} <br/>{a0}: {c0}<br/>{a1}: {c1}'
      },
      legend: {
        show: true,
        bottom: "1%",
        data: ["未完成", "已完成"],
        textStyle: {
          color: "white",
        },
        icon: "rect",
      },
      grid: [
        {
          top: "30%",
          left: "3%",
          right: "3%",
          bottom: "8%",
          containLabel: true,
        },
        {
          height: "20%",
          width: "20%",
          right: 30,
          top: "1%",
        },
      ],
      xAxis: [
        {
          name: "",
          nameTextStyle: {
            padding: [30, 0, 0, -20],
          },
          type: "category",
          // data: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
          data: afterdata.xData,
          axisPointer: {
            type: "shadow",
          },
          axisLabel: {
            interval: 0,
            color: "white",
            // rotate: -45,
          },
          axisLine: {
            lineStyle: {
              color: "white",
            },
          },
          axisTick: {
            show: false,
          },
          gridIndex: 0,
        },

        {
          type: "value",
          zlevel: 1,
          axisPointer: {
            show: false,
            type: "none",
          },
          // name: '123条',
          nameTextStyle: {
            // padding: [0, 0, 30, -100],
            fontSize: 18,
          },
          max: afterdata.totaldata,
          gridIndex: 1,
          axisLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitArea: {
            show: false,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
          min: 0,
          gridIndex: 0,
          axisLabel: {
            show: true,
            color: "white",
          },

          axisLine: {
            show: true,
            lineStyle: {
              color: "white",
            },
          },
          axisTick: {
            show: false,
          },
        },

        {
          type: "category",
          gridIndex: 1,
          max: 1,
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },

          data: [
            {
              // value: "累计完成试验数量",
              value: afterdata.name,
              textStyle: {
                color: "#fff",
                fontSize: 20,
              },
            },
          ],
        },
      ],
      labelLine: {
        minTurnAngle: 45,
      },
      series: [
        {
          name: "已完成",
          type: "bar",
          // barWidth: "60%",
          barGap: "-100%",
          xAxisIndex: 0,
          yAxisIndex: 0,
          stack: "11",
          data: afterdata.data_carry_out,
        },
        {
          name: "未完成",
          type: "bar",
          // barWidth: "60%",
          // data: [10, 52, 20, 34, 39, 33, 22]
          xAxisIndex: 0,
          yAxisIndex: 0,
          data: afterdata.data_undone,
          stack: "11",
        },
        {
          type: "bar",
          xAxisIndex: 1,
          yAxisIndex: 1,

          showBackground: true,
          backgroundStyle: {
            borderColor: "#9DC3F1",
            borderWidth: 4,
          },
          data: [
            {
              // value: 132,
              value: afterdata.totaldata,
              itemStyle: {
                color: "#5D7FE5",
              },
              label: {
                show: true,
                position: "inside",
                formatter: "{c}条",
                offset: [1, 4],
                fontSize: 16,
              },
              tooltip: {
                formatter: "",
              },
            },
          ],
        },
      ],
    };

    myChart.setOption(option_ate_v2);
  },
  devicepie(element, data) {
    // @ts-ignore
    var mychart = echarts.init(document.getElementById(element));
    var option_pie = {
      //   color: ["#5470c6", "#91cc75"],
      // color: ["#5D920D", "#FF4E0D"], // 在线、异常
      color: ["#FF0000", "#FFA600", "#3CB371"],
      title: {
        text: "报警分布",
        left: "center",
        top: "45%",
        subtext: data.subtext,
        textStyle: {
          color: "#fff",
          fontSize: 12,
          fontWeight: "normal",
        },
        subtextStyle: {
          color: "#fff",
          fontSize: 12,
          fontWeight: "normal",
        },
      },
      tooltip: {
        trigger: "item",
        // formatter: "{a}</br>{b}:{c}个 {d}%",
      },
      grid: {
        show: false,
        right: "3%",
        bottom: "3%",
        top: "20%",
      },
      legend: {
        show: true,
        type: "scroll",
        height: 40,
        width: "70%",
        itemWidth: 5,
        itemHeight: 5,
        // left: 0,
        orient: "horizontal",
        // orient: "vertical",
        // bottom: "left",
        bottom: "0",
        icon: "circle",
        pageIconColor: "#fff",
        pageTextStyle: {
          color: "#fff",
        },
        textStyle: {
          color: "#fff",
        },
      },
      series: [
        {
          name: "设备",
          type: "pie",
          radius: ["40%", "60%"],
          // data: [
          //   { value: 1048, name: "三级" },
          //   { value: 735, name: "二级" },
          //   { value: 35, name: "一级" },
          // ],
          data: data.data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
          label: {
            show: true,
            // position: "inside",
            // formatter: "{a}:{b},{c}--{d}",
            // formatter: "{b}:{c}个 {d}%",
            // formatter: "{b}:\n\t\t\t\t\t\t\t{c}个 {d}%",
            formatter: "{d}%",
            fontSize: 12,
          },
          labelLine: {
            show: true,
            length: 10,
            length2: 5,
          },
        },
      ],
    };
    // @ts-ignore
    mychart.setOption(option_pie);
    // console.error(JSON.stringify(option));
    mychart.resize();
  },

  deviceline(element, data) {
    // @ts-ignore
    var mychart = echarts.init(document.getElementById(element));
    var option_line = {
      //   color: ["#5470c6", "#91cc75"],
      color: ["#FF0000", "#FFA600", "#3CB371"],
      title: {
        // text: "一周在线设备柱状图",
        // text: data.text,
        left: "center",
        top: 20,
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      legend: {
        bottom: "bottom",
        itemHeight: 5,
        itemWidth: 14,
        icon: "rect",
        textStyle: {
          color: "#fff",
        },
        // data: ["三级", "二级", "一级"],
        data: data.legend_data,
      },

      grid: {
        show: false,
        right: 0,
        left: "15%",
        bottom: "15%",
        top: "20%",
      },

      calculable: true,
      xAxis: [
        {
          type: "category",

          axisLabel: {
            // interval: 0,
            rotate: 20,
            fontSize: 10,
            color: "#fff",
          },
          axisLine: {
            show: false,
            color: "#fff",
          },
          axisTick: {
            show: false,
            color: "#fff",
            // show: false,
          },

          data: data.xdata,
          // data: data.xdata,
        },
      ],
      yAxis: [
        {
          name: "(个)",
          nameTextStyle: {
            align: "left",
            fontSize: 12,
            verticalAlign: "top",
            color: "#fff",
          },
          type: "value",
          axisLabel: {
            interval: 0,
            rotate: 20,
            fontSize: 10,
            color: "#fff",
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
        },
      ],
      series: [
        {
          // name: "三级",
          name: data.legend_data[0],
          type: "bar",
          stack: "total",
          // data: [
          //   2.0,
          //   4.9,
          //   7.0,
          //   23.2,
          //   25.6,
          //   76.7,
          //   135.6,
          //   162.2,
          //   32.6,
          //   20.0,
          //   6.4,
          //   3.3,
          // ],
          data: data.series_datas[0],
        },
        {
          // name: "二级",
          name: data.legend_data[1],
          type: "bar",
          stack: "total",
          // data: [
          //   2.6,
          //   5.9,
          //   9.0,
          //   26.4,
          //   28.7,
          //   70.7,
          //   175.6,
          //   182.2,
          //   48.7,
          //   18.8,
          //   6.0,
          //   2.3,
          // ],
          data: data.series_datas[1],
        },
        {
          // name: "一级",
          name: data.legend_data[2],
          type: "bar",
          stack: "total",
          // data: [
          //   2.6,
          //   9.0,
          //   26.4,
          //   175.6,
          //   28.7,
          //   5.9,
          //   70.7,
          //   182.2,
          //   18.8,
          //   6.0,
          //   2.3,
          //   48.7,
          // ],
          data: data.series_datas[2],
        },
      ],
    };
    // @ts-ignore
    mychart.setOption(option_line);
    mychart.resize();
  },
  deviceLeftLine(mychart, item) {
    // let item = {
    //   color:['#66CCCC','white'],
    //   xdata:['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    //   active_number:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
    //   active_percentage:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
    // }

    let option_left_line = {
      color: item.color,
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: ["活跃数量", "百分比"],
        textStyle: {
          color: "white",
        },
        bottom: "1%",
      },
      grid: {
        containLabel: true,
        left: "0%",
        right: "0%",
        bottom: "10%",
        top: "2%",
      },
      xAxis: [
        {
          type: "category",
          data: item.xdata,
          axisPointer: {
            type: "shadow",
          },
          axisLabel: {
            color: "white",
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "white",
            },
          },
        },
      ],
      yAxis: [
        {
          type: "value",
          show: false,
          name: "",
          min: 0,
          axisLabel: {
            color: "white",
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "white",
            },
          },
        },
        {
          type: "value",
          show: false,
          name: "",
          min: 0,
          axisLabel: {
            formatter: "{value} %",
            color: "white",
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: "white",
            },
          },
        },
      ],
      series: [
        {
          name: "活跃数量",
          type: "bar",
          data: item.active_number,
        },
        {
          name: "百分比",
          type: "line",
          yAxisIndex: 1,
          data: item.active_percentage,
        },
      ],
    };
    mychart.setOption(option_left_line);
  },
};

module.exports = second_level;
