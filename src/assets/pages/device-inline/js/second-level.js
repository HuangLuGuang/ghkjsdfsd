let second_level = {
    // key-index 关键指标
    key_index() {
        // 实例化对象
        var myChart = echarts.init(document.querySelector('.key-index'));
        // 配置
        let option = {
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            legend: {
                // orient: 'vertical', 垂直显示
                // 距离底部为 0% 
                bottom: "0%",
                // 小图标的宽度和高度
                itemWidth: 5,
                itemHeight: 5,
                // 文字 12px
                textStyle: {
                    color: "rgba(255, 255, 255, .5)",
                    fontSize: "8"
                },
                // data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
            },

            // 颜色
            color: [
                "#065aab",
                "#066eab",
                "#0682ab",
                "#0696ab",
                "#06a0ab"
            ],
            series: [{
                name: '年龄分布',
                type: 'pie',
                // 饼形图的大小,第一个内圆半径-第2个外圆半径
                radius: ['30%', '50%'],
                // 并状态的位置
                center: ["50%", "50%"],

                avoidLabelOverlap: false,
                // 图形上文字
                label: {
                    show: false,
                    position: 'center'
                },
                // 饼形图中间的提示文字
                emphasis: {
                    label: {
                        show: false,
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                },
                // 不显示连接线 图形和文字
                labelLine: {
                    show: false
                },
                data: [
                    { value: 335, name: '0岁以下' },
                    { value: 310, name: '20-29岁' },
                    { value: 234, name: '30-39岁' },
                    { value: 135, name: '40-49岁' },
                    { value: 1548, name: '50岁以下' }
                ]
            }]
        };
        // 配置给实例化对象
        myChart.setOption(option);
        // 让图标跟随屏幕自适应
        // window.addEventListener('resize', f => {
        //     console.log("重置的屏幕大小！")
        //     myChart.resize();
        // })
    },

    // chian_map map 地图
    nibo_map() {
        var ningboJson = "assets/pages/device-inline/fonts/nibo.json"
        var data = [
            { name: "慈溪市", value: [121.23, 30.17, 42] },
            { name: "奉化市", value: [121.40, 29.65, 42] },
        ]
        $.get(ningboJson, function(niboJson) {
            echarts.registerMap('nibo', niboJson);
            // 实例化对象
            var myChart = echarts.init(document.querySelector('.nibo_map'));
            // 渲染
            myChart.setOption({
                geo: {
                    type: 'map',
                    map: 'nibo',
                    zoom: 0.6,
                    label: {
                        show: true,
                        color: '#FFFFFF',
                        fontSize: 16
                    },
                    // ====缩放、拖动
                    layoutCenter: ["50%", "50%"], //地图位置
                    layoutSize: '90%',
                    roam: true,
                    // ====缩放、拖动
                    itemStyle: {
                        normal: {
                            areaColor: '#3a7fd5',
                            borderColor: '#0a53e9', //线
                            shadowColor: '#092f8f', //外发光
                            shadowBlur: 20
                        },
                        emphasis: {
                            areaColor: '#0a2dae', //悬浮区背景
                        }
                    },
                    zlevel: 1
                },
                series: [
                    // 气球 、scatter 散点图
                    {
                        zoom: 0.6,
                        name: 'Top 5',
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        symbol: 'pin',
                        symbolSize: [50, 50],
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#fff',
                                    fontSize: 9,
                                },
                                formatter(value) {
                                    return value.data.value[2]
                                }
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#D8BC37', //标志颜色
                            }
                        },
                        data: data,
                        showEffectOn: 'render',
                        rippleEffect: {
                            brushType: 'stroke'
                        },
                        hoverAnimation: true,
                        zlevel: 1
                    },
                    // {
                    //     type: 'map',
                    //     map: 'nibo',
                    //     zoom: 0.6,
                    //     label: {
                    //         show: true,
                    //         color: '#FFFFFF',
                    //         fontSize: 16
                    //     },
                    //     // ====缩放、拖动
                    //     layoutCenter: ["50%", "50%"], //地图位置
                    //     layoutSize: '90%',
                    //     roam: true,
                    //     // ====缩放、拖动
                    //     itemStyle: {
                    //         normal: {
                    //             areaColor: '#3a7fd5',
                    //             borderColor: '#0a53e9', //线
                    //             shadowColor: '#092f8f', //外发光
                    //             shadowBlur: 20
                    //         },
                    //         emphasis: {
                    //             areaColor: '#0a2dae', //悬浮区背景
                    //         }
                    //     },
                    //     zlevel: 1
                    // },
                ]
            });
            console.log("-------------------->chinaJson: ", niboJson)
                // 点击散点图上的点

            function eclick(params) {
                if (params.seriesType === 'scatter') {
                    console.log("点击执行： ", params);
                    console.log("点击执行： ", params.seriesType);
                    var store = require('store');
                    // 将得到的数据存入local store中以便于angular得到它
                    console.log("************second-level***********", JSON.stringify(params.data))
                    store.set('second_level', JSON.stringify(params.data));
                    // 跳转页面 _parent:在当前页面打开，_blank、默认：在新的窗口打开
                    window.open('/pages/deviceinline/third-level', "_parent");
                }
            }

            myChart.on('click', eclick);

            // 让图标跟随屏幕自适应
            window.addEventListener('resize', function() {
                myChart.resize();
            })
        });

    },

    // device-rate 设备xx率  试验条目状态
    // 参考 https://gallery.echartsjs.com/editor.html?c=x8UGFy_Nb
    device_rate(element, afterdata) {
        var mychart = echarts.init(document.querySelector(element));
        var option = {
            color: ["#5D7FE5", "#26FF26"],
            tooltip: {
                trigger: "item",//axis
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
                    bottom: "10%",
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
                        show:false,
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
                    data: afterdata.Series.data
                },
                {
                    type: "bar",
                    xAxisIndex: 1,
                    yAxisIndex: 1,
        
                    showBackground: true,
                    backgroundStyle: {
                        borderColor: '#9DC3F1',
                        borderWidth:4
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
                            offset:[1,4],
                            fontSize:16
                        },
                        tooltip: {
                            formatter: ''
                        }
                    }]
                }
        
            ],
            dataZoom:[
                {
                    type: 'slider',
                    textStyle:{
                        color:'#fff',
                    },
                    start: 30,
                    end: 70,
                }
            ]
        }
        console.error("option",JSON.stringify(option))
        mychart.setOption(option);
        mychart.resize()
    },
};

module.exports = second_level;