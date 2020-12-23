let rtm3a = {
    create_second_chart(data) {
        var dom = document.getElementById("second_chart");
        if (!dom) return;
        var myChart = echarts.init(dom);
        // var xAxis = data.xAxis.map(f => ({
        //     value: f,
        //     textStyle: {
        //         display: 'inline - block'
        //     }
        // }));
        let option_s_c = {
            title: {
                show: false
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: [],
                top: "3%",
                textStyle: {
                    color: '#fff',
                },
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: true,
                data: data.xAxis,
                axisLabel: {
                    show: true,
                    color: 'white',
                    interval: 0, //强制显示所有x轴标签
                }
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    show: true,
                    color: 'white',
                }
            },
            series: [{
                name: '',
                type: 'line',

                stack: '总量',
                data: data.seriesData,
                // 显示数值
                itemStyle: { normal: { label: { show: true } } }
            }]
        };
        // {
        //   name:'项目起始时间',
        //   type:'line',

        //   stack: '总量',
        //   data:[120, 132, 101, 134, 90, 230, 210],
        //   // 显示数值
        //   itemStyle : { normal: {label : {show: true}}}
        // },

        if (option_s_c && typeof option_s_c === "object") {
            myChart.setOption(option_s_c);
            myChart.resize();
        }
    },

    create_third_chart(data, myChart) {

        let option_t_c = {
            title: {
                text: '目前进度',
                subtext: '10%',
                x: 'center',
                y: 'center',
                itemGap: 10,
                textStyle: {
                    color: '#B7E1FF',
                    fontWeight: 'normal',
                    fontFamily: '微软雅黑',
                    fontSize: 12
                },
                subtextStyle: {
                    color: '#B7E1FF',
                    fontWeight: 'bolder',
                    fontSize: 12,
                    fontFamily: '微软雅黑'
                }
            },
            series: [{
                    type: 'pie',
                    center: ['50%', '50%'],
                    radius: [32, 37],
                    x: '0%',
                    tooltip: { show: false },
                    data: [{
                            name: '达成率',
                            value: 79,
                            itemStyle: { color: 'rgba(0,153,255,0.8)' },
                            hoverAnimation: false,
                            label: {
                                show: false,
                                position: 'center',
                                textStyle: {
                                    fontFamily: '微软雅黑',
                                    fontWeight: 'bolder',
                                    color: '#B7E1FF',
                                    fontSize: 24
                                }
                            },
                            labelLine: {
                                show: false
                            }
                        },
                        {
                            name: '79%',
                            value: 21,
                            itemStyle: { color: 'rgba(0,153,255,0.1)' },
                            hoverAnimation: false,
                            label: {
                                show: false,
                                position: 'center',
                                padding: 20,
                                textStyle: {
                                    fontFamily: '微软雅黑',
                                    fontSize: 24,
                                    color: '#B7E1FF'
                                }
                            },
                            labelLine: {
                                show: false
                            }
                        }
                    ]
                },
                {
                    type: 'pie',
                    center: ['50%', '50%'],
                    radius: [42, 47],
                    x: '0%',
                    hoverAnimation: false,
                    data: [{
                        value: 100,
                        itemStyle: { color: 'rgba(0,153,255,0.3)' },
                        label: { show: false },
                        labelLine: { show: false }
                    }]
                },
                {
                    type: 'pie',
                    center: ['50%', '50%'],
                    radius: [16, 17],
                    x: '0%',
                    hoverAnimation: false,
                    data: [{
                        value: 100,
                        itemStyle: { color: 'rgba(0,153,255,0.3)' },
                        label: { show: false },
                        labelLine: { show: false }
                    }]
                }
            ]
        }
        myChart.setOption(option_t_c)
        myChart.resize();
    },

    create_third_chart_line(data, id) {
        if (!document.getElementById(id)) return;
        var myChart = echarts.init(document.getElementById(id));
        var color = ['#F35331', '#2499F8', '#3DF098', '#33B734'];
        //订单完成情况螺旋图
        var yearPlanData = data.yearPlanData;
        var yearOrderData = data.yearOrderData;
        // var differenceData = data.differenceData;
        var visibityData = data.visibityData;
        var xAxisData = data.xAxisData;

        let option_t_c_l = {
            title: {
                show: data.title ? true : false,
                text: data.title ? data.title : '',
                textStyle: {
                    color: 'white',
                    fontSize: '12px',
                },
                subtextStyle: {
                    align: 'center'
                },
                left: 'center',
                top: '10%'
            },
            tooltip: {
                trigger: 'axis',
                formatter: function(params) {
                    return params[0].name + '<br/>' +
                        params[0].seriesName + ' : ' + params[0].value + '<br/>' +
                        params[1].seriesName + ' : ' + params[1].value + '<br/>';
                },
                textStyle: {
                    color: '#FFF',
                    fontSize: 12
                }
            },
            toolbox: { show: false },
            xAxis: {
                data: xAxisData,
                axisLabel: {
                    textStyle: {
                        color: '#B7E1FF',
                        fontSize: 12
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: '#09F'
                    }
                },
                axisTick: {
                    lineStyle: {
                        color: '#09F'
                    }
                }
            },
            yAxis: {
                inverse: false,
                splitArea: { show: false },
                axisLine: { show: false },
                axisTick: { show: false },
                axisLabel: {
                    textStyle: {
                        color: '#B7E1FF',
                        fontSize: 12,
                        fontFamily: 'Arial',
                    },
                    color: 'white',
                },
                splitLine: {
                    lineStyle: {
                        color: 'rgba(55,255,249,0.2)'
                    }
                }
            },
            grid: {
                top: 30,
                bottom: 20,
                // left: 100,
                width: '90%',
            },
            series: [{
                    name: '温度',
                    type: 'line',
                    smooth: true,
                    symbol: 'circle',
                    symbolSize: 10,
                    showAllSymbol: true,
                    color: color[3],
                    data: yearPlanData
                },
                {
                    name: '湿度',
                    type: 'line',
                    smooth: true,
                    symbol: 'circle',
                    symbolSize: 10,
                    showAllSymbol: true,
                    color: '#F90',
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                width: 2
                            }
                        }
                    },
                    data: yearOrderData
                },
                {
                    name: '不可见',
                    type: 'bar',
                    stack: '1',
                    barWidth: 1,
                    itemStyle: {
                        normal: {
                            color: 'rgba(0,0,0,0)'
                        },
                        emphasis: {
                            color: 'rgba(0,0,0,0)'
                        }
                    },
                    data: visibityData
                }
            ]
        }

        myChart.setOption(option_t_c_l);
        myChart.resize();
    },

    //半圆加百分比
    create_semicircle(data, myChart) {

        let option_s = {
            // backgroundColor: '#0E1327',
            title: {
                show: true,
                text: data + '%',
                textStyle: {
                    color: 'white'
                },
                top: '40%',
                left: '40%',
            },
            polar: {
                radius: ['70%', '80%'],
                center: ['50%', '50%'],
            },
            // 极坐标系：角度轴
            angleAxis: {
                max: 200,
                show: false,
                type: 'value',
                startAngle: 180,
            },
            // 极坐标系：径向轴
            radiusAxis: {
                type: 'category',
                show: true,
                axisLabel: {
                    show: false,
                },
                axisLine: {
                    show: false,

                },
                axisTick: {
                    show: false
                },
            },
            series: [{
                type: 'bar',
                data: [{
                    value: data
                }],
                itemStyle: {
                    color: 'green'
                },
                barGap: '-100%',
                coordinateSystem: 'polar',
                roundCap: true,
                cursor: 'auto',
                z: 2
            }, ]
        };

        window.onresize = function() {
            this.console.log("重置的屏幕大小！")
            myChart.resize();
        }
        myChart.setOption(option_s);
        myChart.resize();
    }
}

module.exports = rtm3a;