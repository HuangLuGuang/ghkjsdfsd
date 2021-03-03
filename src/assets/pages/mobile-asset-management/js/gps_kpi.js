let gpskpi = {
  // 这是在线，异常设备饼状图 https://echarts.apache.org/examples/zh/editor.html?c=pie-simple
  // element
  devicepie(element, data) {
    // @ts-ignore
    var mychart = echarts.init(document.getElementById(element));
    var option = {
      //   color: ["#5470c6", "#91cc75"],
      color: ["#5D920D", "#FF4E0D"], // 在线、异常
      title: {
        text: "在线、异常设备饼状图",
        left: "center",
        top: 20,
      },
      tooltip: {
        trigger: "item",
        // formatter: "{a}</br>{b}:{c}个 {d}%",
      },
      legend: {
        show: false,
        orient: "vertical",
        bottom: "left",
      },
      series: [
        {
          name: "设备",
          type: "pie",
          radius: "75%",
          //   data: [
          //     { value: 1048, name: "在线设备" },
          //     { value: 735, name: "异常设备" },
          //   ],
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
            position: "inside",
            // formatter: "{a}:{b},{c}--{d}",
            // formatter: "{b}:{c}个 {d}%",
            formatter: "{b}:\n\t\t\t\t\t\t\t{c}个 {d}%",
            fontSize: 12,
          },
          labelLine: {
            show: true,
            length: 0,
            length2: 0,
          },
        },
      ],
    };
    // @ts-ignore
    mychart.setOption(option);
    mychart.resize();
  },

  // 这是一周在线设备柱状图 https://echarts.apache.org/examples/zh/editor.html?c=bar1
  devicebar(element, data) {
    // @ts-ignore
    var mychart = echarts.init(document.getElementById(element));
    var option = {
      //   color: ["#5470c6", "#91cc75"],
      color: ["#5D920D", "#FF4E0D"], // 在线、异常
      title: {
        // text: "一周在线设备柱状图",
        text: data.text,
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
      },

      grid: {
        right: 0,
      },

      calculable: true,
      xAxis: [
        {
          type: "category",

          axisLabel: {
            interval: 0,
            rotate: 20,
            fontSize: 10,
          },
          //   data: [
          //     "1月",
          //     "2月",
          //     "3月",
          //     "4月",
          //     "5月",
          //     "6月",
          //     "7月",
          //     "8月",
          //     "9月",
          //     "10月",
          //     "11月",
          //     "12月",
          //   ],
          data: data.xdata,
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
        },
      ],
      series: [
        {
          name: "在线设备",
          type: "bar",
          //   data: [
          //     2.0,
          //     4.9,
          //     7.0,
          //     23.2,
          //     25.6,
          //     76.7,
          //     135.6,
          //     162.2,
          //     32.6,
          //     20.0,
          //     6.4,
          //     3.3,
          //   ],
          data: data.series[0],
        },
        {
          name: "异常设备",
          type: "bar",
          //   data: [
          //     2.6,
          //     5.9,
          //     9.0,
          //     26.4,
          //     28.7,
          //     70.7,
          //     175.6,
          //     182.2,
          //     48.7,
          //     18.8,
          //     6.0,
          //     2.3,
          //   ],
          data: data.series[1],
        },
      ],
    };
    // @ts-ignore
    mychart.setOption(option);
    mychart.resize();
  },
};

module.exports = gpskpi;
