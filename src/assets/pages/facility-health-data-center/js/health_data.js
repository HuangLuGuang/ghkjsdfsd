let health_data = {
  // 这是在线，异常设备饼状图 https://echarts.apache.org/examples/zh/editor.html?c=pie-simple
  // element
  devicepie(element, data) {
    // @ts-ignore
    // var mychart = echarts.init(document.getElementById(element));
    var mychart = element;
    var option = {
      //   color: ["#5470c6", "#91cc75"],
      // color: ["#5D920D", "#FF4E0D"], // 在线、异常
      color: ["#3CB371", "#FFA600", "#FF0000"],
      title: {
        text: "项目报警类型",
        left: "left",
        top: "4%",
        textStyle: {
          // color: "#000",
          color: "rgba(62, 171, 244, 1)",
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
        itemWidth: 5,
        itemHeight: 5,
        left: 0,
        // orient: "horizontal",
        orient: "vertical",
        // bottom: "left",
        bottom: "0",
        icon: "circle",
        pageIconColor: "#000",
        pageTextStyle: {
          color: "#000",
        },
        textStyle: {
          color: "#000",
        },
      },
      series: [
        {
          name: "设备",
          type: "pie",
          radius: "80%",
          // data: [
          //   { value: 35, name: "一般报警" },
          //   { value: 735, name: "重要报警" },
          //   { value: 1048, name: "紧急报警" },
          // ],
          data: data,
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
            formatter: "{b}",
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
    mychart.setOption(option);

    mychart.resize();
  },

  // 这是一周在线设备柱状图 https://echarts.apache.org/examples/zh/editor.html?c=bar1
  deviceline(element, data) {
    // @ts-ignore
    // var mychart = echarts.init(document.getElementById(element));
    var mychart = element;
    var option = {
      //   color: ["#5470c6", "#91cc75"],
      // color: ["#5470c6", "#91cc75"],
      color: ["#3CB371", "#FFA600", "#FF0000"],
      title: {
        text: "项目报警次数",
        left: "left",
        top: "4%",
        textStyle: {
          // color: "#000",
          color: "rgba(62, 171, 244, 1)",
          fontSize: 12,
          fontWeight: "normal",
        },
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      legend: {
        top: "top",
        itemHeight: 5,
        itemWidth: 14,
        icon: "rect",
        textStyle: {
          color: "#000",
        },
        data: ["一级报警", "二级报警", "三级报警"],
        // data: data.legend_data,
      },

      grid: {
        show: false,
        right: 0,
        bottom: "15%",
        top: "20%",
      },

      calculable: true,
      xAxis: [
        {
          type: "category",

          axisLabel: {
            interval: 0,
            // rotate: 20,
            fontSize: 10,
            color: "#000",
          },
          axisLine: {
            show: false,
            color: "#000",
          },
          axisTick: {
            color: "#000",
            // show: false,
          },

          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
          // data: data.xdata,
        },
      ],
      yAxis: [
        {
          name: "(次)",
          nameTextStyle: {
            align: "left",
            fontSize: 12,
            verticalAlign: "top",
            color: "#000",
          },
          type: "value",
          axisLabel: {
            interval: 0,
            rotate: 20,
            fontSize: 10,
            color: "#000",
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
          name: "一级报警",
          // name: data.legend_data[0],
          type: "bar",
          data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6],
          // data: data.series_datas[0],
        },
        {
          name: "二级报警",
          // name: data.legend_data[1],
          type: "bar",
          data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6],
          // data: data.series_datas[1],
        },
        {
          name: "三级报警",
          // name: data.legend_data[1],
          type: "bar",
          data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6],
          // data: data.series_datas[1],
        },
      ],
    };
    // @ts-ignore
    mychart.setOption(option);
    // console.error(JSON.stringify(option));
    mychart.resize();
  },
};

module.exports = health_data;
