let second_level = {


    // device-rate 设备xx率  试验条目状态
    // 参考 https://gallery.echartsjs.com/editor.html?c=x8UGFy_Nb
    device_rate(mychart, afterdata) {
        // var mychart = echarts.init(document.querySelector(element));
        // var mychart = myChart;
        var option = {
            color: ["#5D7FE5", "#1F4E65"],
            tooltip: {
                trigger: "item", //axis
                axisPointer: {
                    type: "cross",
                    crossStyle: {
                        color: "#999"
                    }
                }
            },
            grid: [{
                    top: "30%",
                    right: 10,
                    left: "3%",
                    bottom: "5%",
                    containLabel: true
                }, {
                    height: "20%",
                    width: "20%",
                    right: 30,
                    top: "1%"
                },

            ],
            xAxis: [

                {
                    name: "月份",
                    nameTextStyle: {
                        padding: [30, 0, 0, -20]
                    },
                    type: "category",
                    // data: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"],
                    data: afterdata.xData,
                    axisPointer: {
                        type: "shadow"
                    },
                    axisLabel: {
                        interval: 0,
                        color: '#fff',
                        rotate: -45
                    },
                    gridIndex: 0
                },

                {
                    type: "value",
                    zlevel: 1,
                    axisPointer: {
                        show: false,
                        type: "none"
                    },
                    // name: '123条',
                    nameTextStyle: {
                        // padding: [0, 0, 30, -100],
                        fontSize: 18
                    },

                    gridIndex: 1,
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                    splitLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    splitArea: {
                        show: false
                    },
                    max: 132, // 横轴的长度
                }


            ],
            yAxis: [{
                    type: "value",
                    min: 0,
                    // max: 100,
                    interval: 0,
                    gridIndex: 0,
                    axisLabel: {
                        formatter: "{value}",
                        color: "rgba(197, 55, 55, 1)"
                    },
                    axisLine: {
                        show: false
                    },
                },

                {
                    type: "category",
                    gridIndex: 1,
                    max: 1,
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    data: [{
                        // value: "累计完成试验数量",
                        value: afterdata.Series.name,
                        textStyle: {
                            color: "#fff",
                            fontSize: 20
                        }
                    }]
                }



            ],
            series: [{
                    type: "bar",
                    barWidth: "60%",
                    // data: [10, 52, 20, 34, 39, 33, 22]
                    data: afterdata.Series.data,
                    z:2
                }, {
                    type: "bar",
                    barWidth: "60%",
                    barGap:'-100%',
                    z:1,
                    data: afterdata.Series.data_plan,
                },
                {
                    type: "bar",
                    xAxisIndex: 1,
                    yAxisIndex: 1,

                    showBackground: true,
                    backgroundStyle: {
                        borderColor: '#9DC3F1',
                        borderWidth: 4
                    },
                    data: [{
                        // value: 132,
                        value: afterdata.Series.totaldata,
                        itemStyle: {
                            color: "#5D7FE5"
                        },
                        label: {
                            show: true,
                            position: 'inside',
                            formatter: '{c}条',
                            offset: [1, 4],
                            fontSize: 16
                        },
                        tooltip: {
                            formatter: ''
                        }
                    }]
                }

            ],
            dataZoom: [{
                show: false,
                type: 'slider',
                textStyle: {
                    color: '#fff',
                },
                start: 30,
                end: 70,
            }]
        }
        console.log(JSON.stringify(option));

        setInterval(function() {
            option.dataZoom[0].start++;
            option.dataZoom[0].end++;
            if (option.dataZoom[0].end === 100) {
                option.dataZoom[0].start = 1
                option.dataZoom[0].end = 35
            }
            mychart.setOption(option);
        }, 100);

        // mychart.setOption(option);
        // mychart.resize()
    },
};

module.exports = second_level;