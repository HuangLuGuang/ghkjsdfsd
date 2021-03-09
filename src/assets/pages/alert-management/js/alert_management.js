let alert_management = {
  // 这是在线，异常设备饼状图 https://echarts.apache.org/examples/zh/editor.html?c=pie-simple
  // element
  devicepie(element, data) {
    // @ts-ignore
    var mychart = echarts.init(document.getElementById(element));
    var option = {
      //   color: ["#5470c6", "#91cc75"],
      // color: ["#5D920D", "#FF4E0D"], // 在线、异常
      title: {
        // text: "在线、异常设备饼状图",
        left: "center",
        top: 20,
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
        left: 0,
        orient: "horizontal",
        // orient: "vertical",
        bottom: "left",
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
          radius: ["30%", "50%"],
          data: [
            { value: 1048, name: "进行中" },
            { value: 735, name: "未开始" },
            { value: 35, name: "暂停中" },
            { value: 135, name: "已完成" },
          ],
          // data: data,
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
    mychart.resize();
  },

  // 这是一周在线设备柱状图 https://echarts.apache.org/examples/zh/editor.html?c=bar1
  deviceline(element, data) {
    // @ts-ignore
    var mychart = echarts.init(document.getElementById(element));
    var option = {
      //   color: ["#5470c6", "#91cc75"],
      color: ["#5D920D", "#FF4E0D"], // 在线、异常
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
        },
      ],
      series: [
        {
          name: "在线设备",
          type: "line",
          data: [
            2.0,
            4.9,
            7.0,
            23.2,
            25.6,
            76.7,
            135.6,
            162.2,
            32.6,
            20.0,
            6.4,
            3.3,
          ],
          // data: data.series[0],
        },
        {
          name: "异常设备",
          type: "line",
          data: [
            2.6,
            5.9,
            9.0,
            26.4,
            28.7,
            70.7,
            175.6,
            182.2,
            48.7,
            18.8,
            6.0,
            2.3,
          ],
          // data: data.series[1],
        },
      ],
    };
    // @ts-ignore
    mychart.setOption(option);
    mychart.resize();
  },

  // https://echarts.apache.org/examples/zh/editor.html?c=bar-y-category-stack
  devicebar(element, data) {
    // @ts-ignore
    var mychart = echarts.init(document.getElementById(element));
    var option = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // Use axis to trigger tooltip
          type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
        },
      },
      legend: {
        show: false,
        data: ["Direct", "Mail Ad", "Affiliate Ad"],
        itemHeight: 5,
        itemWidth: 14,
        textStyle: {
          color: "#fff",
        },
      },
      grid: {
        left: "1%",
        right: "4%",
        bottom: "3%",
        top: "20%",
        containLabel: true,
      },
      xAxis: {
        type: "value",
        axisLabel: {
          show: false,
          interval: 0,
          rotate: 20,
          fontSize: 10,
          color: "#fff",
        },
        axisLine: {
          lineStyle: {},
          show: false,
        },
        axisTick: {
          color: "#fff",
          show: false,
        },
        splitLine: {
          show: false,
        },
      },
      yAxis: {
        type: "category",
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        axisLabel: {
          show: true,
          interval: 0,
          rotate: 20,
          fontSize: 10,
          color: "#fff",
        },
      },
      series: [
        {
          name: "Direct",
          type: "bar",
          stack: "total",
          label: {
            show: true,
          },
          emphasis: {
            focus: "series",
          },
          data: [320, 302, 301, 334, 390, 330, 320],
        },
        {
          name: "Mail Ad",
          type: "bar",
          stack: "total",
          label: {
            show: true,
          },
          emphasis: {
            focus: "series",
          },
          data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
          name: "Affiliate Ad",
          type: "bar",
          stack: "total",
          label: {
            show: true,
          },
          emphasis: {
            focus: "series",
          },
          data: [220, 182, 191, 234, 290, 330, 310],
        },
      ],
    };
    // @ts-ignore
    mychart.setOption(option);
    mychart.resize();
  },
};

module.exports = alert_management;
