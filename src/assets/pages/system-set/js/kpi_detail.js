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
        top: "15%",
        textAlign: "center",
        left: "71%",
        textStyle: {
          color: "#000",
          fontSize: 10,
          // fontWeight: '400'
        },
        subtextStyle: {
          color: "#000",
          fontSize: 20,
          // fontWeight: '200'
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
        top: "10%",
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
          type: "value",
          max: function (value) {
            return value.max * 1.7;
          },
        },
      ],
      series: afterdata.Series,
    };
    // @ts-ignore

    mychart.setOption(option);
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
        top: "10%",
        containLabel: true,
      },

      legend: {
        bottom: "0",
        itemWidth: 9,
        itemHeight: 9,
        // bottom: "4%",

        textStyle: {
          color: "#90979c",
        },
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
            formatter: "{value} h",
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
                show: true,
                // textStyle: {
                //   color: afterdata.color[0],
                // },
                position: "insideTop",
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
                show: true,
                position: "insideTop",
                formatter: function (p) {
                  return p.value > 0 ? p.value : "";
                },
              },
            },
          },

          data: afterdata.stop,
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
                show: true,
                position: "insideTop",
                formatter: function (p) {
                  return p.value > 0 ? p.value : "";
                },
              },
            },
          },
          data: afterdata.placeon,
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
                show: true,
                position: "insideTop",
                formatter: function (p) {
                  return p.value > 0 ? p.value : "";
                },
              },
            },
          },
          data: afterdata.warning,
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
      // backgroundColor: '#0A2E5D',

      color: afterdata.color,

      tooltip: {
        show: true,
        trigger: "item",
      },

      legend: {
        show: true,
        icon: "rect", // circle
        left: "35%",
        bottom: "-1%",
        itemHeight: 3,
        itemWidth: 20,
        orient: "horizontal",
        textStyle: {
          // fontSize: 8,
          // color: "#fff"
        },
        // data: ["2019年", "2020年"]
        data: [afterdata.data1.name, afterdata.data2.name],
      },
      radar: {
        center: ["50%", "50%"],
        radius: "70%",
        startAngle: 90,
        splitNumber: 4,
        shape: "circle",
        splitArea: {
          areaStyle: {
            color: ["transparent"],
          },
        },

        axisLine: {
          show: false,
          lineStyle: {
            color: "#a1a8b3", //white
          },
        },

        splitLine: {
          show: true,
          lineStyle: {
            color: "#a1a8b3", //white
          },
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: "#646464", // 坐标轴刻度文字的样式
          },
        },
        indicator: [
          {
            name: "占位",
            max: afterdata.max,
            axisLabel: {
              show: true,
            },
          },
          {
            name: "空闲",
            max: afterdata.max,
            axisLabel: {
              show: true,
              rotate: -45,
            },
          },
          {
            name: "维修",
            max: afterdata.max,
            axisLabel: {
              show: false,
            },
          },
          {
            name: "运行",
            max: afterdata.max,
            axisLabel: {
              show: false,
            },
          },
        ],
      },
      series: [
        {
          name: afterdata.data1.name,
          // name: "2019年",
          type: "radar",
          symbol: "circle",
          symbolSize: 10, // 标记点的大小
          areaStyle: {
            normal: {
              // color: "rgba(255,191,159, 0.9)" // 19
              color: afterdata.areacolor[0],
            },
          },
          lineStyle: {
            normal: {
              // color: "rgba(255,191,159, 1)",
              color: afterdata.linecolor[0],
              width: 2,
              // 面积线类型 dashed 大虚线 dotted 小虚线   solid 实线
              type: "solid",
            },
          },
          // 标记点的 样式
          itemStyle: {
            color: "rgba(245, 166, 35, 1)",
            // borderColor:'rgba(255,191,159, 0.3)',
            borderWidth: 10,
          },

          data: [
            {
              value: afterdata.data1.value, // 占位、空闲、维修、运行
              // value: [80, 50,  48, 43],// 占位、空闲、维修、运行
            },
          ],
        },
        {
          name: afterdata.data2.name,
          // name: "2020年",
          type: "radar",
          symbol: "circle",
          symbolSize: 10,
          // 标记点的 样式
          itemStyle: {
            normal: {
              color: "rgba(19, 173, 255, 1)",
              borderWidth: 10,
            },
          },

          areaStyle: {
            normal: {
              // color: "rgba(19, 173, 255, 0.5)"
              color: afterdata.areacolor[1],
            },
          },
          lineStyle: {
            normal: {
              // color: "rgba(19, 173, 255, 1)",
              color: afterdata.linecolor[1],
              width: 2,
              // 面积线类型 dashed 大虚线 dotted 小虚线   solid 实线
              type: "solid",
            },
          },
          data: [
            {
              value: afterdata.data2.value,
              // value: [60, 60, 80, 63]
            },
          ],
        },
      ],
    };
    // console.error("------------------>", JSON.stringify(option))
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
          type: "cross",
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
          top: "30%",
          right: "10%",
          left: "13%",
          bottom: "15%",
          // containLabel: true,
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
          // name: '水量',
          min: 0,
          max: function (value) {
            return Number((value.max + 100).toFixed(2));
          },
          interval: 50,
          gridIndex: 0,
          axisLabel: {
            formatter: "{value}",
          },
        },
        {
          type: "value",
          // name: '温度',
          min: 0,
          // max: function (value) {
          //     return value.max + 100;
          // },
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
          fontSize: 16,
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
        },
      ],
      series: afterdata.Series,
    };
    // console.error("option",JSON.stringify(option))
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
        subtextStyle: {
          fontSize: 16,
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
          textStyle: {
            color: "black",
          },
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
            left: "5%",
            top: "15%",
            bottom: "14%",
            containLabel: true,
            width: "37%",
          },
          {
            show: false,
            left: "41%",
            top: "15%",
            bottom: "16%",
            width: "10%",
          },
          {
            show: false,
            right: "15%",
            top: "15%",
            bottom: "14%",
            containLabel: true,
            width: "42%",
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
            position: "top",
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
            position: "top",
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
              margin: 14,
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
        textStyle: {
          color: "black",
        },
        data: afterdata.legend,
      },
      grid: {
        top: "20%",
        bottom: "20%",
        left: "5%",
        // right: '5%'
        right: 30,
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
          type: "value",
        },
      ],
      series: [
        {
          name: "error",
          type: "bar",
          barWidth: 10,
          barGap: 0,
          // label: labelOption,
          data: afterdata.error,
        },
        {
          name: "warning",
          type: "bar",
          barWidth: 10,
          // label: labelOption,
          data: afterdata.warning,
        },
        {
          name: "info",
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
          console.log(value);
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
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        // data: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
        data: afterdata.xData,
      },
      yAxis: {
        type: "value",
        max: 2,
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
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
          name: "Step Start",
          type: "line",
          step: "start",
          // data: [1, 0, 1, 0, 1, 0,1,1,1,0,1,1,1,0,0,0,0,0,0,0,1,1,0,1,1,1,0,1,1,0],
          data: afterdata.SeriesData,
          lineStyle: {
            color: "rgb(138,43,226)",
            width: 4,
          },
          areaStyle: {
            color: "rgb(138,43,226,0.3)",
          },
        },
      ],
    };
    // @ts-ignore
    // console.error("option", JSON.stringify(option));
    mychart.setOption(option);
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
