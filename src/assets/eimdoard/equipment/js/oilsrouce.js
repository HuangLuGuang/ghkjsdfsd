const splitLine_color = 'rgba(55,255,249,0.2)';

let oilsrouce = {
    // 雷达图
    create_radar(data, myChart) {
        let option_radar = {
            // backgroundColor: '#003D74',
            //animation: false,
            tooltip: {
                show: true,
                trigger: "item",
                formatter:function(r){
                    let str = `
                    <span>蓄能器压力</span><br/>
                    <div style="text-align:left;">
                    `;
                    data.indicator.forEach((f,i)=>{
                        str+=f.name+'：'+r.value[i]+'Pa<br/>'
                    });
                    str+='</div>';
                    console.log(r)
                    return str;
                }
            },
            // grid:{
            //     containLabel:true,
            // },
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
                            color: '#f8fc00',
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
                },
                {
                    name: "最外层边框",
                    type: "radar",
                    symbol: "none",
                    symbolSize: 6,
                    itemStyle: {
                        color: '#0263FF',
                    },
                    tooltip: {
                        show: false
                    },
                    lineStyle: {
                        normal: {
                            color: "#0263FF",
                            width: 2
                        }
                    },
                    data: [data.indicator.map(m => (m.max))]
                }
            ]
        };
        myChart.setOption(option_radar);
        // myChart.resize();
    },
    //油温油压油啥啥的仪表盘
    create_gauge_3(series_old, myChart, shape) {
        let servies = [];
        series_old.forEach(f => {
            servies.push({
                type: "gauge",
                // radius: shape ? '80%' : '60%',
                radius: '90%',
                center: f.center,
                splitNumber: 0, //刻度数量
                startAngle: 225,
                max: f.max,
                endAngle: -45,
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
                    width: "8%",
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
                    offsetCenter: [0, "50%"],
                    textStyle: {
                        fontSize: 12,
                    },
                    formatter: f.data.value
                    // formatter: f.data.value+'\n' + f.unit
                },
                data: [f.data],
            });
        })

        let option_gauge_3 = {
            //animation: false,
            // backgroundColor: '#003366',
            series: servies,
        };
        myChart.setOption(option_gauge_3);
        // myChart.resize();
    },
    //不知道叫啥东西 n一列要显示几个
    create_bar_j(dataLine, myChart, title_left) {
        let option_bar_j = {
            //animation: false,
            // backgroundColor: '#003260',
            grid: {
                // bottom: '80%',
                height: '60%',
                top: '50%'
            },
            xAxis: [{
                type: 'value',
                max: dataLine.max,
                show: false
            }],
            title: [{
                show: true,
                text: dataLine.yname,
                textStyle: {
                    color: 'white',
                    fontSize: 12
                },
                left: 'center',
                top: '3%'
            }, {
                text: dataLine.value + '  ' + dataLine.unit,
                textStyle: {
                    color: "black",
                    fontSize: 12,
                    fontWeight: 'normal'
                },
                left: "center",
                top: '55%',
            }],
            yAxis: [{
                show: false,
                type: 'category',
            }, ],
            series: [{
                type: "bar",
                yAxisIndex: 0,
                data: [dataLine.value],
                showBackground: true,
                backgroundStyle: {
                    color: 'white'
                },

                itemStyle: {
                    normal: {
                        color: "#109618"
                    }
                }
            }]
        };
        myChart.setOption(option_bar_j);
        // myChart.resize();
    }
}

module.exports = oilsrouce;