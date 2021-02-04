let kpi_detail = {
  // row_one 第一行第一个
  one_row_one(element, afterdata) {
    // @ts-ignore
    var mychart = echarts.init(document.getElementById(element));
    var option = {
      color: afterdata.color,

      title: {
        text: "试验总数",
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
        bottom: "0",
        itemWidth: 9,
        itemHeight: 9,
        data: ["未完成", "已完成"],
      },
      grid: {
        left: "3%",
        // right: '4%',
        right: 30,
        bottom: "10%",
        top: "15%",
        containLabel: true,
      },
      xAxis: [
        {
          name: "月份",
          nameTextStyle: {
            padding: [30, 0, 0, -20],
          },
          type: "category",
          data: afterdata.Xdata,
          // axisLabel: {
          //     show: true,
          //     formatter: '{value}月'
          // },
        },
      ],
      yAxis: [
        {
          name: "(个)",
          nameTextStyle: {
            align: "left",
            fontSize: 12,
            verticalAlign: "top",
          },

          type: "value",
          max: function (value) {
            return value.max * 1.7;
          },
        },
      ],
      labelLine: {
        minTurnAngle: 45,
      },
      series: afterdata.Series,
    };
    // @ts-ignore

    mychart.setOption(option);
    // console.error("------------------>", JSON.stringify(option));
    mychart.resize();
  },

  // row_two 第一行第二个
  one_row_two(element, afterdata) {
    // @ts-ignore
    var mychart = echarts.init(document.getElementById(element));
    var option = {
      backgroundColor: "#ffffff",
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
          textStyle: {
            color: "#fff",
          },
        },
        // formatter: '{b0}: {c0}<br />{b1}: {c1}'
      },
      grid: {
        left: "3%",
        // right: '4%',
        right: 30,
        bottom: "10%",
        top: "15%",
        containLabel: true,
      },

      legend: {
        bottom: "0",
        itemWidth: 9,
        itemHeight: 9,
        // bottom: "4%",
        // textStyle: {
        //   color: "#90979c",
        // },
        // data: afterdata.title
      },

      calculable: true,
      xAxis: [
        {
          name: "月份",
          nameTextStyle: {
            padding: [30, 0, 0, -20],
          },
          type: "category",
          axisLine: {
            show: true,
            lineStyle: {
              // color:"rgba(51,51,51,1)"
            },
          },
          data: afterdata.xData,
        },
      ],
      yAxis: [
        {
          name: "(h)",
          nameTextStyle: {
            align: "left",
            fontSize: 12,
            verticalAlign: "top",
          },

          type: "value",
          splitLine: {
            show: true,
          },
          axisLine: {
            lineStyle: {
              // color: '#90979c'
            },
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            interval: 0,
            formatter: function (value, index) {
              // if (value >= 1000 && value < 1000 * 10) {
              //   return value / 1000 + "千h";
              // }
              // if (value >= 1000 * 10) {
              //   return value / 10000 + "万h";
              // }
              return value;
            },
            // formatter: "{value} h",
          },

          splitArea: {
            show: false,
          },
        },
      ],

      series: [
        {
          // "name": "running",
          name: afterdata.title[0],
          type: "bar",
          stack: "总量",
          // barMaxWidth: 10,
          barWidth: 10,
          // barWidth: '20%',
          barGap: "10%",
          z: 4,
          itemStyle: {
            normal: {
              color: afterdata.color[0], //运行
              label: {
                show: false,
                // textStyle: {
                //   color: afterdata.color[0],
                // },
                position: "top",
                formatter: function (p) {
                  return p.value > 0 ? p.value : "";
                },
              },
            },
          },

          data: afterdata.running,
        },

        {
          // "name": "stop",
          name: afterdata.title[1],
          type: "bar",
          stack: "总量",
          // barMaxWidth: 10,
          barWidth: 10,
          // barWidth: '20%',
          z: 3,
          itemStyle: {
            normal: {
              color: afterdata.color[1], // 空闲
              barBorderRadius: 0,
              label: {
                show: false,
                position: "top",
                formatter: function (p) {
                  return p.value > 0 ? p.value : "";
                },
              },
            },
          },

          data: afterdata.stop,
        },
        {
          // "name": "warning",
          name: afterdata.title[3],
          type: "bar",
          stack: "总量",
          // barWidth: '20%',
          barWidth: 10,
          z: 1,
          itemStyle: {
            normal: {
              color: afterdata.color[3], // 维保
              barBorderRadius: 0,
              label: {
                show: false,
                position: "top",
                formatter: function (p) {
                  return p.value > 0 ? p.value : "";
                },
              },
            },
          },
          data: afterdata.warning,
        },
        {
          // "name": "placeout",
          name: afterdata.title[2],
          type: "bar",
          stack: "总量",
          // barWidth: '20%',
          barWidth: 10,
          z: 2,
          itemStyle: {
            normal: {
              color: afterdata.color[2], // 占位
              barBorderRadius: 0,
              label: {
                show: false,
                position: "top",
                formatter: function (p) {
                  return p.value > 0 ? p.value : "";
                },
              },
            },
          },
          data: afterdata.placeon,
        },
      ],
    };
    // @ts-ignore
    mychart.setOption(option);
    mychart.resize();
  },

  // row_three 第一行第三个
  one_row_three(element, afterdata) {
    // @ts-ignore
    var mychart = echarts.init(document.getElementById(element));
    var option = {
      color: afterdata.color,
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
          textStyle: {
            color: "#fff",
          },
        },
      },
      legend: {
        // data: ["2019年", "2020年"],
        bottom: "0",
        itemWidth: 9,
        itemHeight: 9,
        // textStyle: {
        //   color: "#90979c",
        // },
      },
      grid: {
        left: "3%",
        right: 30,
        bottom: "10%",
        top: "15%",
        containLabel: true,
      },
      toolbox: {
        show: false,
        feature: {
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ["line", "bar"] },
          restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      calculable: true,
      xAxis: [
        {
          type: "category",
          data: afterdata.xData,
        },
      ],
      yAxis: [
        {
          name: "(h)",
          nameTextStyle: {
            align: "left",
            fontSize: 12,
            verticalAlign: "top",
          },

          type: "value",
          axisLabel: {
            formatter: function (value, index) {
              // if (value >= 1000 && value < 1000 * 10) {
              //   return value / 1000 + "千";
              // }
              // if (value >= 1000 * 10) {
              //   return value / 10000 + "万";
              // }
              return value;
            },
          },
        },
      ],
      series: afterdata.Series,
    };
    // @ts-ignore
    mychart.setOption(option);

    mychart.resize();
  },

  // 第二行第一个
  two_row_one(element, afterdata) {
    // @ts-ignore
    var mychart = echarts.init(document.getElementById(element));
    var option = {
      // color:["#5D7FE5", "#26FF26"],
      color: afterdata.color,
      tooltip: {
        trigger: "axis", // item axis
        axisPointer: {
          type: "shadow",
          crossStyle: {
            color: "#999",
          },
        },
      },
      toolbox: {
        // feature: {
        //     dataView: {show: true, readOnly: false},
        //     magicType: {show: true, type: ['line', 'bar']},
        //     restore: {show: true},
        //     saveAsImage: {show: true}
        // }
      },
      legend: {
        // data: ['蒸发量', '降水量', '平均温度']
        bottom: "1%",
        itemWidth: 9,
        itemHeight: 9,
      },
      grid: [
        {
          top: "15%",
          // right: "10%",
          right: 30,
          left: "10%",
          bottom: "18%",
          // containLabel: true,
        },
        {
          height: 40,
          width: "20%",
          right: -30,
          top: "0%",
          // containLabel: true,
        },
      ],
      xAxis: [
        {
          name: "月份",
          nameTextStyle: {
            padding: [30, 0, 0, -20],
          },
          type: "category",
          // data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          data: afterdata.xData,
          axisPointer: {
            type: "shadow",
          },
          axisLabel: {
            interval: 0,
          },
          gridIndex: 0,
        },
        {
          type: "value",
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
          axisPointer: {
            show: false,
          },
        },
      ],
      yAxis: [
        {
          type: "value", // value
          min: 0,
          // max: function (value) {
          //   return Number((value.max + 100).toFixed(2));
          // },
          interval: 50,
          gridIndex: 0,
          axisLabel: {
            formatter: "{value}%",
          },
        },
        {
          type: "value",
          min: 0,
          show: false,
          max: 100,
          interval: 50,
          gridIndex: 0,
          axisLabel: {
            formatter: "{value} %",
          },
        },
        {
          type: "category",
          gridIndex: 1,
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisPointer: {
            show: false,
          },
          data: afterdata.Total.yAxis.data,
        },
      ],
      series: afterdata.Series,
    };

    // @ts-ignore
    mychart.setOption(option);

    mychart.resize();
  },

  // 第二行第二个
  two_row_two(element, afterdata) {
    // @ts-ignore
    var mychart = echarts.init(document.getElementById(element));
    var option = {
      color: afterdata.color,
      title: {
        subtext: afterdata.Total.name + "%",
        right: "1%",
        top: "2%",
        subtextStyle: {
          fontSize: 13,
          color: "rgb(153,153,153)",
        },
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      legend: {
        bottom: "0",
        itemWidth: 9,
        itemHeight: 9,
        data: ["占位", "运行"],
      },
      grid: {
        left: "4%",
        // right: '4%',
        right: 0,
        bottom: "10%",
        top: "15%",
        containLabel: true,
      },
      xAxis: [
        {
          name: "月份",
          nameTextStyle: {
            padding: [30, 0, 0, -20],
          },
          type: "category",
          data: afterdata.xData,
        },
      ],
      yAxis: [
        {
          type: "value",
          id: 0,
          name: "(h)",
          nameTextStyle: {
            align: "left",
            fontSize: 12,
            verticalAlign: "top",
          },
        },
        {
          type: "value",
          min: 0,
          show: true,
          max: 100,
          interval: 50,
          id: 1,
          axisLabel: {
            formatter: "{value} %",
          },
        },
      ],
      series: afterdata.Series,
    };
    // console.error("option", JSON.stringify(option));
    // @ts-ignore
    mychart.setOption(option);
    mychart.resize();
  },

  // 第二行第三个
  two_row_three(element, afterdata) {
    // @ts-ignore
    var mychart = echarts.init(document.getElementById(element));
    var option = {
      color: afterdata.color,
      title: {
        subtext: afterdata.Total.name + "%",
        right: "1%",
        top: "2%",
        subtextStyle: {
          fontSize: 13,
          color: "rgb(153,153,153)",
        },
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      legend: {
        bottom: "0",
        itemWidth: 9,
        itemHeight: 9,
        data: ["完好率", "故障率"],
      },
      grid: {
        left: "3%",
        // right: '4%',
        right: 30,
        bottom: "10%",
        top: "15%",
        containLabel: true,
      },
      xAxis: [
        {
          name: "月份",
          nameTextStyle: {
            padding: [30, 0, 0, -20],
          },
          type: "category",
          data: afterdata.xData,
        },
      ],
      yAxis: [
        {
          type: "value",
          axisLabel: {
            formatter: function (value, index) {
              return value + "%";
            },
          },
        },
      ],
      series: afterdata.Series,
    };
    // @ts-ignore
    mychart.setOption(option);
    mychart.resize();
  },

  // 第三行，第一个
  three_row_one(element, afterdata) {
    // @ts-ignore
    var mychart = echarts.init(document.getElementById(element));
    var option = {
      baseOption: {
        timeline: {
          show: false,
          top: 0,
          data: [],
        },
        legend: {
          bottom: "3%",
          right: "center",
          icon: "horizontal",
          itemWidth: 9,
          itemHeight: 9,
          // textStyle: {
          //   color: "black",
          // },
          data: afterdata.legend,
        },
        tooltip: {
          show: true,
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: [
          {
            show: false,
            left: "6%",
            top: "15%",
            bottom: "14%",
            containLabel: true,
            width: "38%",
          },
          {
            show: false,
            left: "45%",
            top: "15%",
            bottom: "16%",
            width: "15%",
          },
          {
            show: false,
            right: 30,
            top: "15%",
            bottom: "14%",
            containLabel: true,
            width: "45%",
          },
        ],
        xAxis: [
          {
            max: function (value) {
              return value.max + 10;
            },
            offset: 20,
            type: "value",
            inverse: true,
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            position: "bottom",
            axisLabel: {
              show: true,
              color: "black",
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(255,255,255,0.2)",
              },
            },
          },
          {
            gridIndex: 1,
            show: false,
          },
          {
            max: function (value) {
              return value.max + 10;
            },
            offset: 20,
            gridIndex: 2,
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            position: "bottom",
            axisLabel: {
              show: true,
              color: "black",
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "rgba(255,255,255,0.2)",
              },
            },
          },
        ],
        yAxis: [
          {
            type: "category",

            boundaryGap: false,
            inverse: true,
            position: "right",
            axisLine: {
              show: false,
              lineStyle: {
                color: "rgba(255,255,255,0.2)",
              },
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: false,

              textStyle: {
                color: "black",
                fontSize: 12,
              },
            },
            // data: ["Dec", "Nov", "Oct", "Sep", "Aug", "Jul", "Jun", "May", "Apr", "Mar", "Feb", "Jan"]
            data: afterdata.xData,
          },
          {
            gridIndex: 1,
            type: "category",
            inverse: true,
            position: "left",
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: false,
              interval: 0,
              textStyle: {
                color: "black",
                fontSize: 20,
              },
              align: "center",
            },
            axisPointer: {
              show: false,
            },

            data: [
              {
                value: "Dec",
                textStyle: {
                  align: "center",
                  fontSize: 12,
                  width: 20000,
                },
              },
              {
                value: "Nov",
                textStyle: {
                  align: "center",
                  fontSize: 12,
                },
              },
              {
                value: "Oct",
                textStyle: {
                  align: "center",
                  fontSize: 12,
                },
              },
              {
                value: "Sep",
                textStyle: {
                  align: "center",
                  fontSize: 12,
                },
              },
              {
                value: "Aug",
                textStyle: {
                  align: "center",
                  fontSize: 12,
                },
              },
              {
                value: "Jul",
                textStyle: {
                  align: "center",
                  fontSize: 12,
                },
              },
              {
                value: "Jun",
                textStyle: {
                  align: "center",
                  fontSize: 12,
                },
              },
              {
                value: "May",
                textStyle: {
                  align: "center",
                  fontSize: 12,
                },
              },
              {
                value: "Apr",
                textStyle: {
                  align: "center",
                  fontSize: 12,
                },
              },
              {
                value: "Mar",
                textStyle: {
                  align: "center",
                  fontSize: 12,
                },
              },
              {
                value: "Feb",
                textStyle: {
                  align: "center",
                  fontSize: 12,
                },
              },
              {
                value: "Jan",
                textStyle: {
                  align: "center",
                  fontSize: 12,
                },
              },
            ],
          },
          {
            offset: 14,
            gridIndex: 2,
            type: "category",
            inverse: true,
            position: "left",
            boundaryGap: false,
            axisLine: {
              show: true,
              lineStyle: {
                color: "rgba(255,255,255,0.2)",
              },
            },
            axisTick: {
              show: true,
            },
            axisLabel: {
              show: true,
              interval: 0,
              margin: 0,
              textStyle: {
                color: "black",
                fontSize: 12,
              },
            },
            // data: ["Dec", "Nov", "Oct", "Sep", "Aug", "Jul", "Jun", "May", "Apr", "Mar", "Feb", "Jan"]
            data: afterdata.xData,
          },
        ],
        series: [],
      },
      options: [
        {
          series: [
            {
              type: "bar",
              barWidth: 10,
              showBackground: true,
              stack: "1",
              name: afterdata.legend[0],
              xAxisIndex: 0,
              yAxisIndex: 0,
              itemStyle: {
                normal: {
                  // color: "rgb(119,134,150)",
                  color: afterdata.colors[0],
                },
              },
              label: {
                normal: {
                  show: true,
                  formatter: function (p) {
                    return p.value > 0 ? p.value : "";
                  },
                },
              },
              // data: [0, 0, 0, 0, 9, 0, 0, 3, 0, 0, 0, 0],
              data: afterdata.lastYearData,
              animationEasing: "elasticOut",
            },
            {
              type: "bar",
              stack: "2",
              name: afterdata.legend[1],
              barWidth: 10,
              showBackground: true,
              xAxisIndex: 2,
              yAxisIndex: 2,
              itemStyle: {
                normal: {
                  // color: "rgb(60,208,60)",
                  color: afterdata.colors[1],
                },
              },
              label: {
                normal: {
                  show: true,
                  formatter: function (p) {
                    return p.value > 0 ? p.value : "";
                  },
                },
              },
              // data: [1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1],
              data: afterdata.thisYearData,
              animationEasing: "elasticOut",
            },
          ],
        },
      ],
    };
    // console.error("==================", JSON.stringify(option))
    // @ts-ignore
    mychart.setOption(option);
    // console.error("=========", JSON.stringify(option));
    mychart.resize();
  },

  // 第三行第二个
  three_row_two(element, afterdata) {
    // @ts-ignore
    var mychart = echarts.init(document.getElementById(element));
    // @ts-ignore
    var labelOption = {
      show: true,
      rotate: 90,
      align: "left",
      verticalAlign: "middle",
      position: "top",
      formatter: "{c}  {name|{a}}",
      fontSize: 14,
      rich: {
        name: {
          // textBorderColor: '#fff'
          color: "black",
        },
      },
    };
    var option = {
      color: afterdata.colors,
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      legend: {
        bottom: "3%",
        right: "center",
        icon: "horizontal",
        itemWidth: 9,
        itemHeight: 9,
        // textStyle: {
        //   color: "black",
        // },
        data: afterdata.legend,
      },
      grid: {
        top: "15%",
        bottom: "10%",
        left: "3.4%",
        // right: '5%'
        right: 30,
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          name: "月份",
          nameTextStyle: {
            padding: [30, 0, 0, -20],
          },
          axisTick: { show: false },
          axisLabel: {
            interval: 0,
          },
          data: afterdata.xData,
        },
      ],
      yAxis: [
        {
          name: "(次)",
          type: "value",
          nameTextStyle: {
            align: "left",
            fontSize: 12,
            verticalAlign: "top",
          },

          axisLabel: {
            formatter: function (value, index) {
              // if (value >= 1000 && value < 1000 * 10) {
              //   return value / 1000 + "千";
              // }
              // if (value >= 1000 * 10) {
              //   return value / 10000 + "万";
              // }
              return value;
            },
          },
        },
      ],
      series: [
        {
          name: afterdata.legend[0], // error
          type: "bar",
          barWidth: 10,
          barGap: 0,
          // label: labelOption,
          data: afterdata.error,
        },
        {
          name: afterdata.legend[1], // warning
          type: "bar",
          barWidth: 10,
          // label: labelOption,
          data: afterdata.warning,
        },
        {
          name: afterdata.legend[2], // info
          type: "bar",
          barWidth: 10,
          // label: labelOption,
          data: afterdata.info,
        },
      ],
    };
    // @ts-ignore
    mychart.setOption(option);
    mychart.resize();
  },

  // 第三行，第三个
  three_row_three(element, afterdata) {
    // @ts-ignore
    var mychart = echarts.init(document.getElementById(element));
    var option = {
      tooltip: {
        trigger: "axis",
        formatter: function (params) {
          var value = params[0].value;
          if (value === 0) {
            return (
              params[0].name + "<br />" + params[0].seriesName + ":" + "停"
            );
          } else if (value === 1) {
            return (
              params[0].name + "<br />" + params[0].seriesName + ":" + "起"
            );
          }
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "10%",
        top: "15%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        splitNumber: 48,
        // data: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
        data: afterdata.xData,
      },
      yAxis: {
        type: "value",
        // max: 2,
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        max: 2,
        splitNumber: 2, // 粉三段
        minInterval: 1,
        axisLabel: {
          formatter: function (value) {
            if (value === 0) {
              return "停";
            } else if (value === 1) {
              return "起";
            }
          },
        },
      },

      series: [
        {
          name: "启停状态",
          type: "line",
          step: "start",
          // data: [1, 0, 1, 0, 1, 0,1,1,1,0,1,1,1,0,0,0,0,0,0,0,1,1,0,1,1,1,0,1,1,0],
          data: afterdata.SeriesData,
          lineStyle: {
            color: "rgb(138,43,226)",
            width: 2,
          },
          areaStyle: {
            color: "rgb(138,43,226,0.3)",
          },
        },
      ],
    };
    // @ts-ignore
    mychart.setOption(option);
    // console.error("option", JSON.stringify(option));
    mychart.resize();
  },

  // one_row_two(element, afterdata){
  //     var mychart = echarts.init(document.getElementById(element));
  //     var option = {

  //     }
  //     mychart.setOption(option);
  // },
};

module.exports = kpi_detail;
