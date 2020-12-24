const splitLine_color = 'rgba(55,255,249,0.2)';

let oilsrouce = {
    // 雷达图
    create_radar(data, myChart) {
        let option_radar = {
            // backgroundColor: '#003D74',
            tooltip: {
                show: true,
                trigger: "item",
            },
            legend: {
                show: false,
                data: ['蓄能器压力'],
                type: "scroll",
                orient: 'vertical',
                icon: "roundRect",
                right: '20',
                top: 'center',
                itemGap: 30,
                itemWidth: 16,
                itemHeight: 16,
                textStyle: {
                    fontSize: '15',
                    color: '#fff',
                },

            },
            radar: {
                center: ["50%", "50%"],
                radius: "58%",
                startAngle: 90,
                splitNumber: 5,
                splitArea: {
                    areaStyle: {
                        color: ['#003D74', '#003D74', ].reverse(),
                    }
                },
                axisLabel: {
                    show: false,
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: "#D2E4F8"
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: splitLine_color
                    }
                },
                name: {
                    formatter: '{value}',
                    textStyle: {
                        color: '#fff',
                        fontSize: 12,
                    },
                },
                indicator: data.indicator
            },

            series: [{
                name: "蓄能器压力",
                type: "radar",
                symbol: "none",
                symbolSize: 8,
                areaStyle: {
                    normal: {
                        color: '#00cc66',
                    }
                },
                itemStyle: {
                    color: '#80B2FF',
                },
                lineStyle: {
                    normal: {
                        color: splitLine_color,
                        width: 2
                    }
                },
                data: [data.value]
            }]
        };
        myChart.setOption(option_radar);
        myChart.resize();
    },
    //油温油压油啥啥的仪表盘
    create_gauge_3(series_old, myChart, shape) {
        let servies = [];
        series_old.forEach(f => {
            servies.push({
                type: "gauge",
                radius: shape ? '80%' : '60%',
                center: f.center,
                splitNumber: 0, //刻度数量
                startAngle: 180,
                max: f.max,
                endAngle: 0,
                axisLine: {
                    show: true,
                    lineStyle: {
                        width: 10,
                        color: f.axisLine_color,
                    },
                },
                //分隔线样式。
                splitLine: {
                    show: false,
                },
                axisLabel: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                pointer: {
                    show: true,
                    length: "80%",
                    width: "2%",
                },
                title: {
                    show: true,
                    offsetCenter: [0, "-120%"], // x, y，单位px
                    textStyle: {
                        fontWeight: "bold",
                        color: "#0ab7ff",
                        fontSize: 12,
                    },
                },
                //仪表盘详情，用于显示数据。
                detail: {
                    show: true,
                    offsetCenter: [0, "35%"],
                    textStyle: {
                        fontSize: 12,
                    },
                    formatter: f.data.value + f.unit
                },
                data: [f.data],
            });
        })

        let option_gauge_3 = {
            // backgroundColor: '#003366',
            series: servies,
        };
        myChart.setOption(option_gauge_3);
        myChart.resize();
    },
    //不知道叫啥东西 n一列要显示几个
    create_bar_j(dataLine, myChart, title_left) {
        let option_bar_j = {
            // backgroundColor: '#003260',
            grid: {
                bottom: '80%',
                // top: '100%',
            },
            xAxis: [{
                max: dataLine.max,
                show: false
            }],
            title: {
                show: true,
                text: dataLine.yname,
                textStyle: {
                    color: 'white',
                    fontSize: 12
                },
                left: 'center',
                // top: '0%'
            },
            yAxis: [{
                    show: false,
                    axisLabel: {
                        textStyle: {
                            color: "#fff",
                            fontSize: 10,
                            padding: [0, -20, -35, 0]
                        }
                    },
                    data: [0]
                },
                {
                    show: false,
                    axisLabel: {
                        textStyle: {
                            color: "#fff",
                            fontSize: 10,
                            padding: [0, 0, -35, -20]
                        }
                    },
                    data: [dataLine.max]
                },
            ],
            series: [{
                    type: "bar",
                    yAxisIndex: 0,
                    data: [dataLine.value],
                    barWidth: 15,
                    itemStyle: {
                        normal: {
                            color: "#109618"
                        }
                    },
                    z: 2
                },
                {
                    type: "bar",
                    yAxisIndex: 1,
                    barGap: "-100%",
                    data: [dataLine.max],
                    barWidth: 17,
                    radius: 100,
                    itemStyle: {
                        normal: {
                            color: "#fff"
                        }
                    },
                    z: 1
                },
                {
                    type: "bar",
                    yAxisIndex: 1,
                    barGap: "-100%",
                    data: [dataLine.max],
                    barWidth: 17,
                    radius: 100,
                    itemStyle: {
                        color: "rgb(0,0,0,0)"
                    },
                    label: {
                        show: true,
                        formatter: dataLine.value + '  ' + dataLine.unit,
                        textStyle: {
                            color: "black",
                            fontSize: 12
                        }
                    },
                    z: 3
                }
            ]
        };
        myChart.setOption(option_bar_j);
        myChart.resize();
    }
}

module.exports = oilsrouce;