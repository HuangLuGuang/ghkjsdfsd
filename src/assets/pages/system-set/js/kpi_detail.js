
let kpi_detail = {

    // left_one 设备时间统计 参考： https://gallery.echartsjs.com/editor.html?c=xHyoiv-D-e
    left_one(element, afterdata) {
        // 实例化对象
        var mychart = echarts.init(document.querySelector(element));
        left_one_chart = mychart;
        console.log("左侧第一个",afterdata)

        // 配置
        var option = {
                // backgroundColor: "#344b58",
                backgroundColor: "#ffffff",

                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        type: "shadow",
                        textStyle: {
                            color: "#fff"
                        }
                    },
                    // formatter: '{b0}: {c0}<br />{b1}: {c1}'
                },
                grid: {
                    borderWidth: 0,
                    top: 20,
                    bottom: 70,
                    right: 10,
                    textStyle: {
                        color: "#fff"
                    }
                },

                legend: {
                    //x: '4%',
                    bottom: "4%",
                    textStyle: {
                        color: '#90979c',
                    },
                    // "data": ['running', 'stop', 'placeout', "warning"]
                    data: afterdata.title
                },

                calculable: true,
                xAxis: [{
                    type: "category",
                    axisLine: {
                        lineStyle: {
                            color: '#90979c'
                        }
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
                    axisLabel: {
                        interval: 0,
                        rotate: 35,
                        fontSize:9,
                    },
                    data: afterdata.xData,
                }],
                yAxis: [{
                    type: "value",
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#90979c'
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        interval: 0,
                        formatter: '{value} h'
                    },
                    splitArea: {
                        show: false
                    },

                }],

                series: [{
                        // "name": "running",
                        name: afterdata.title[0],
                        type: "bar",
                        stack: "总量",
                        barMaxWidth: 20,
                        barGap: "10%",
                        itemStyle: {
                            normal: {
                                color: 'rgb(78,203,115)', //运行
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: "#fff"
                                    },
                                    position: "insideTop",
                                    formatter: function(p) {
                                        return p.value > 0 ? (p.value) : '';
                                    }
                                }
                            }
                        },
                        data: afterdata.running,
                    },

                    {
                        // "name": "stop",
                        name: afterdata.title[1],
                        type: "bar",
                        stack: "总量",
                        barMaxWidth: 20,
                        itemStyle: {
                            normal: {
                                color: 'rgb(58,160,255)', // 空闲
                                barBorderRadius: 0,
                                label: {
                                    show: true,
                                    position: "top",
                                    formatter: function(p) {
                                        return p.value > 0 ? (p.value) : '';
                                    }
                                }
                            }
                        },
                        data: afterdata.stop
                    },
                    {
                        // "name": "placeout",
                        name: afterdata.title[2],
                        type: "bar",
                        stack: "总量",
                        itemStyle: {
                            normal: {
                                color: 'rgb(249,210,54)', // 占位
                                barBorderRadius: 0,
                                label: {
                                    show: true,
                                    position: "top",
                                    formatter: function(p) {
                                        return p.value > 0 ? (p.value) : '';
                                    }
                                }
                            }
                        },
                        data: afterdata.placeon
                    },
                    {
                        // "name": "warning",
                        name: afterdata.title[3],
                        type: "bar",
                        stack: "总量",
                        itemStyle: {
                            normal: {
                                color: 'rgb(242,99,123)', // 维保
                                barBorderRadius: 0,
                                label: {
                                    show: true,
                                    position: "top",
                                    formatter: function(p) {
                                        return p.value > 0 ? (p.value) : '';
                                    }
                                }
                            }
                        },
                        data: afterdata.warning
                    }
                ]
            }
            // 配置给实例化对象
        mychart.setOption(option);
        mychart.resize();

        // // 让图标跟随屏幕自适应
        // window.addEventListener('resize', f => {
        //     console.log("重置的屏幕大小！")
        //     myChart.resize();
        // })
    },

    // right_one  运行/停止/故障/非占位 百分比
    // 参考 https://gallery.echartsjs.com/editor.html?c=xBjZTmZvaA
    right_one(element, afterdatas) {
        // 实例化对象
        var mychart = echarts.init(document.querySelector(element));
        var color = [];
        if(afterdatas.title.length<4){
            // 运行、空闲
            color = ['rgb(78,203,115)', 'rgb(58,160,255)'];
        }else(
            // 占位、运行、空闲、维保
            color = ['rgb(249,210,54)', 'rgb(78,203,115)', 'rgb(58,160,255)', 'rgb(242,99,123)']
        )
        // 配置
        var option = {

            // 按照顺序，运行、空闲、占位、维保 running stop placeon warning
            // color: ['#37a2da', '#9fe6b8', '#ffdb5c', '#fb7293'], 占位、运行、空闲、维保 placeon running stop warning
            
            // color: ['rgb(126,255,182)', 'rgb(0,76,166)'],
            // color: ['rgb(175,117,59)', 'rgb(126,255,182)', 'rgb(0,76,166)', 'rgb(150,13,48)'],
            color: color,
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            toolbox: {
                show: true,

            },
            legend: {
                show:false,
                type: "plain",
                orient: 'vertical',
                left: 0,
                align: 'left',
                top: 'bottom',
                textStyle: {
                    color: '#8C8C8C'
                },
            },
            series: [{
                name: '状态百分比',
                type: 'pie',
                radius: [0, 120],
                top: '2%',
                data: afterdatas.afterdatas
                    // data:[
                    //     {value:20, name:'placeout'},
                    //     {value:25, name:'runing'},
                    //     {value:25, name:'warning'},
                    //     {value:35, name:'stop'},
                    // ]
            }]
        };
        // 配置给实例化对象
        mychart.setOption(option);
        mychart.resize();

        // 让图标跟随屏幕自适应
        // window.addEventListener('resize', f => {
        //     console.log("重置的屏幕大小！")
        //     myChart.resize();
        // })

    },

    // left_two 月份运行时间
    left_two(element, afterdatas) {
        // 实例化对象
        var mychart = echarts.init(document.querySelector(element));
        // 配置
        var option = {
            // color: ['#3398DB'],
            // backgroundColor: "#041730",
            tooltip: {
                trigger: 'axis',
                // formatter: "{b} : {c}",
                formatter: function(params, encode, callback) {
                    // console.log("------------params",params)
                    return `${params[0]["name"]}:${params[0]["value"]}`;
                },
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                borderWidth: 0,
                top: 20,
                bottom: 40,
                right: 10,
                textStyle: {
                    color: "#fff"
                }
            },
            xAxis: {
                data: afterdatas.xData,
                //坐标轴
                axisLine: {
                    lineStyle: {
                        color: '#90979c'
                    }
                },
                axisTick: {
                    show: false
                },
                //坐标值标注
                axisLabel: {
                    show: true,
                }
            },
            yAxis: {
                //坐标轴
                axisLine: {
                    show: true
                },
                //坐标值标注
                axisLabel: {
                    show: true,
                    formatter: '{value} h'
                        // textStyle: {
                        //     color: '#fff',
                        // }
                },
                axisTick: {
                    show: false
                },
                //分格线
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: '#4784e8'
                    }
                }
            },
            series: [{
                name: '月运行',
                type: 'bar',
                barWidth: '6%',
                itemStyle:{
                    color: 'rgb(78,203,115)' // 运行
                },
                data: afterdatas.yData
            }]
        }

        // 配置给实例化对象
        mychart.setOption(option);
        mychart.resize();

        // 让图标跟随屏幕自适应
        // window.addEventListener('resize', f => {
        //     console.log("重置的屏幕大小！")
        //     myChart.resize();
        // })
    },

    // right_two 年份运行时间
    right_two(element, afterdatas) {
        // 实例化对象
        var mychart = echarts.init(document.querySelector(element));
        // 配置
        var option = {

            // backgroundColor: "#041730",
            tooltip: {
                trigger: 'axis',
                // formatter: "{b} : {c}",
                formatter: function(params, encode, callback) {
                    return `${params[0]["name"]}:${params[0]["value"]}`;
                },

                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                borderWidth: 0,
                top: 20,
                bottom: 40,
                right: 10,
                textStyle: {
                    color: "#fff"
                }
            },
            xAxis: {
                data: afterdatas.xData,
                //坐标轴
                axisLine: {

                    lineStyle: {
                        color: '#90979c'
                    }
                },
                axisTick: {
                    show: false
                },
                //坐标值标注
                axisLabel: {
                    show: true,
                    rotate: 20
                        // textStyle: {
                        //     color: '#fff',
                        // }
                }
            },
            yAxis: {
                //坐标轴
                axisLine: {
                    show: true
                },
                //坐标值标注
                axisLabel: {
                    show: true,
                    formatter: '{value} h'
                        // textStyle: {
                        //     color: '#fff',
                        // }
                },
                axisTick: {
                    show: false
                },
                //分格线
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: '#4784e8'
                    }
                }
            },
            series: [{
                name: '年运行',
                type: 'bar',
                barWidth: '6%',
                itemStyle:{
                    color: 'rgb(78,203,115)' // 运行
                },
                data: afterdatas.yData
            }]
        }

        // 配置给实例化对象
        mychart.setOption(option);
        mychart.resize();

        // 让图标跟随屏幕自适应
        // window.addEventListener('resize', f => {
        //     console.log("重置的屏幕大小！")
        //     myChart.resize();
        // })
    },

    // 这是 重置echart
    resize() {
        console.log("这是 重置echart");
        left_one_chart.resize();
        right_one_chart.resize();
    }
};

module.exports = kpi_detail;