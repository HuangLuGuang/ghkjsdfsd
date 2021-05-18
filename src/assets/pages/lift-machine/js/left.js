let left = {
  // 饼状图
  pie(element, data) {
    // @ts-ignore
    var mychart = echarts.init(document.getElementById(element));

    var option = {
      color: ["#5470c6", "#91cc75"],
      tooltip: {
        trigger: "item",
        formatter: "{b}: {c}个",
      },
      legend: {
        bottom: "-2%",
        left: "center",
        formatter: function (name) {
          return name.split(":")[0];
        },
      },
      series: [
        {
          name: "访问来源",
          type: "pie",
          radius: "70%",

          data: data,
        },
      ],
    };
    // @ts-ignore
    mychart.setOption(option);
    mychart.resize();
  },
  // 柱状图
  bar(element, data) {
    // @ts-ignore
    var mychart = echarts.init(document.getElementById(element));

    var option = {
      color: ["#5470c6"],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      legend: {
        bottom: "-1%",
        data: ["时长"],
      },
      grid: {
        left: "3%",
        right: "8%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "value",
        boundaryGap: [0, 0.01],
        name: "h",
      },
      yAxis: {
        type: "category",
        // data: ["0号工位", "1号工位", "2号工位", "3号工位", "4号工位"],
        data: data.ydata,
      },
      series: [
        {
          name: "时长",
          type: "bar",
          // data: [19325, 23438, 31000, 121594, 134141],
          data: data.sdata,
          barWidth: 30,
        },
      ],
    };
    // @ts-ignore
    mychart.setOption(option);
    mychart.resize();
  },
};

module.exports = left;
