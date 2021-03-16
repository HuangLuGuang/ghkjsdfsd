let alert_management = {
  // 这是在线，异常设备饼状图 https://echarts.apache.org/examples/zh/editor.html?c=pie-simple
  // element
  devicepie(element, data) {
    // @ts-ignore
    var mychart = echarts.init(document.getElementById(element));
    var option = {
      //   color: ["#5470c6", "#91cc75"],
      // color: ["#5D920D", "#FF4E0D"], // 在线、异常
      color: ["#FF0000", "#FFA600", "#3CB371"],
      title: {
        text: "统计试验总数",
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
          radius: ["40%", "50%"],
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
    mychart.setOption(option);
    // console.error(JSON.stringify(option));
    mychart.resize();
  },

  // 这是一周在线设备柱状图 https://echarts.apache.org/examples/zh/editor.html?c=bar1
  deviceline(element, data) {
    // @ts-ignore
    var mychart = echarts.init(document.getElementById(element));
    var option = {
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
        bottom: "15%",
        top: "20%",
      },

      calculable: true,
      xAxis: [
        {
          type: "category",

          axisLabel: {
            interval: 0,
            rotate: 20,
            fontSize: 10,
            color: "#fff",
          },
          axisLine: {
            show: false,
            color: "#fff",
          },
          axisTick: {
            color: "#fff",
            // show: false,
          },

          data: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月",
          ],
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
    mychart.setOption(option);
    mychart.resize();
  },
};

module.exports = alert_management;
