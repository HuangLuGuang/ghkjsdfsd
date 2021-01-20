let first_level = {
    // key-index 关键指标
    key_index() {
        // 实例化对象
        var myChart = echarts.init(document.querySelector('.key-index'));

        // 配置
        let option_key_index = {

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
                radius: ['0%', '70%'],
                // 并状态的位置
                center: ["50%", "45%"],
                itemStyle: {
                    shadowBlur: 13,
                    shadowOffsetX: -7.5,
                    shadowOffsetY: 1.5,
                    shadowColor: 'rgba(87, 149, 156, 1)',
                },

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
        myChart.setOption(option_key_index);

        // 让图标跟随屏幕自适应
        window.addEventListener('resize', f => {
            console.log("重置的屏幕大小！")
            myChart.resize();
        })
    },

    // chian_map map 地图  https://www.makeapie.com/editor.html?c=xmOgZZ5lD2
    chian_map(eclick) {

        let data = [
            {
                name: "黑河",
                value: [47,127,100]
            },
        
        ]

        let LableData = [

            {
                name: "黑河三高专属基地",
                coords: [
                    [127.528588, 50.247033],
                    [132, 52, 100]
                ],
                value: [2, 3]
            },
            {
                name: "吐鲁番夏季试车专属基地",
                coords: [
                    [89.192125, 42.956351],
                    [97.192125, 47.956351]
                ],
                value: [4, 5]
        
            },
            {
                name: "吉利研究院",
                coords: [
                    [121.25158, 30.342533],
                    [128, 27, 100]
                ],
                value: [38, 50]
            },
            {
                name: "盐城试车基地",
                coords: [
                    [120.168403, 33.355342],
                    [132, 37, 100]
                ],
                value: [2, 4]
            },
            //94.794758,36.405633
            {
                name: "格尔木高原试车基地",
                coords: [
                    [94.794758, 36.405633],
                    [90, 25, 100]
                ],
                value: [2, 4]
            },
            //119.417702,30.919115
            {
                name: "广德试车基地",
                coords: [
                    [119.417702, 30.919115],
                    [129, 32, 100]
                ],
                value: [2, 4]
            },
        
        
        ];
        // 实例化对象
        var myChart = echarts.init(document.querySelector('.chian_map'));

        var option_chian_map = {
            // backgroundColor: '#00294E',
            // backgroundColor: '#1CCCFF',
            geo: {
                map: 'china',
                aspectScale: 0.85,
                layoutCenter: ["50%", "50%"], //地图位置
                layoutSize: '100%',
                zoom:1.4,
                itemStyle: {
                    normal: {
                        // shadowColor: '#276fce',
                        shadowColor: '#351111',
                        shadowOffsetX: 0,
                        shadowOffsetY: 15,
                        opacity: 0.5,
                        color: '#031525',
                    },
                    emphasis: {
                        areaColor: '#276fce',
                    }
                },
                regions: [{
                    name: '南海诸岛',
                    itemStyle: {
                        areaColor: 'rgba(0, 10, 52, 1)',
                        borderColor: 'rgba(0, 10, 52, 1)',
                        normal: {
                            opacity: 0,
                            label: {
                                show: false,
                                color: '#031525',
                            }
                        },
        
        
                    },
                    label: {
                        show: false,
                        color: '#031525',
                        // color: '#FFFFFF',
                        fontSize: 12,
                    },
        
        
                }],
        
            },

            series: [
                // 常规地图
                {
                    type: 'map',
                    z: 10,
                    mapType: 'china',
                    aspectScale: 0.85,
                    layoutCenter: ["50%", "50%"], //地图位置
                    layoutSize: '100%',
                    zoom: 1.4, //当前视角的缩放比例
                    // roam: true, //是否开启平游或缩放
                    scaleLimit: { //滚轮缩放的极限控制
                        min: 1,
                        max: 2
                    },
                    itemStyle: {
                        normal: {
                            // areaColor: '#0c274b',
                            areaColor: '#1e4f6c',
                            borderColor: '#888a8b',
                            borderWidth: 1.5
                        },
                        emphasis: {
                            // areaColor: '#d16d27',
                            areaColor: '#307ba8',

                            label: {
                                color: "#fff"
                            }
        
                        }
                    },
        
        
                },
                
                // 区域散点图
                {
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    showEffectOn: 'render',
                    // zlevel: 2,
                    z:20,
                    symbolSize: 10,
                    rippleEffect: { //坐标点动画
                        period: 3,
                        scale: 5,
                        brushType: 'fill'
                    },
                    hoverAnimation: true,
                    label: {
                        normal: {
                            show: true,
                            position: 'right',
                            formatter: '{b}',
                            color: '#b3e2f2',
                            fontWeight: "bold",
                            fontSize: 18
                        }
                    },
                    data: data,
                    itemStyle: { //坐标点颜色
                        normal: {
                            show: true,
                            color: 'green',
                            shadowBlur: 20,
                            shadowColor: '#fff'
                        },
                        emphasis: {
                            areaColor: '#f00'
                        }
                    },
        
                },
                // 线 和 点
                {
                    type: 'lines',
                    // zlevel: 1, //设置这个才会有轨迹线的小尾巴
                    // zlevel: 0.1, //设置这个才会有轨迹线的小尾巴
                    z:21,
                    //polyline:true,
                    effect: {
                        show: true,
                        period: 4,
                        trailLength: 0.7,
                        color: '#fff', //流动点颜色
                        symbol: 'arrow',
                        symbolSize: 6
                    },
                    lineStyle: {
                            normal: {
                                color:'#1DE9B6'
                                /* function (value){ //随机颜色
                                
                                ['#f21347','#f3243e','#f33736','#f34131','#f34e2b',
                                '#f56321','#f56f1c','#f58414','#f58f0e','#f5a305',
                                '#e7ab0b','#dfae10','#d5b314','#c1bb1f','#b9be23',
                                '#a6c62c','#96cc34','#89d23b','#7ed741','#77d64c',
                                '#71d162','#6bcc75','#65c78b','#5fc2a0','#5abead',
                                '#52b9c7','#4fb6d2','#4ab2e5']
         return "#"+("00000"+((Math.random()*16777215+0.5)>>0).toString(16)).slice(-6);
         }*/,
                                width: 1, //线条宽度
                                opacity: 0.6, //尾迹线条透明度
                                curveness: .3 //尾迹线条曲直度
                            }
                        },
                    data: [
                        {
                            fromName: "吉利研究院",
                            toName: "黑河",
                            coords: [
                                [127.528588,50.247033],
                                [121.25158,30.342533],
                                [121.25158,30.342533],
                            ]
                            ,lineStyle:{color:'#4fb6d2'}
                        },
                        {
                            fromName: "吉利研究院",
                            toName: "吐鲁番",
                            coords: [
                                [89.192125,42.956351],
                                [121.25158,30.342533],
                                [121.25158,30.342533],
                            ]
                            ,lineStyle:{color:'#4fb6d2'}
                            
                        },
                        {
                            //120.168403,33.355342
                            fromName: "吉利研究院",
                            toName: "盐城试车基地",
                            coords: [
                                [120.168403,33.355342],
                                [121.25158,30.342533],
                                [121.25158,30.342533],
                            ]
                            ,lineStyle:{color:'#4fb6d2'}
                            
                        },
                        {
                             //120.168403,33.355342
                            fromName: "吉利研究院",
                            toName: "格尔木高原试车基地",
                            coords: [
                                [94.794758,36.405633],
                                [121.25158,30.342533],
                                [121.25158,30.342533],
                            ]
                            ,lineStyle:{color:'#4fb6d2'}
                            
                        },
                         //119.417702,30.919115
                        {
                            fromName: "吉利研究院",
                            toName: "广德试车基地",
                            coords: [
                                [119.417702,30.919115],
                                [121.25158,30.342533],
                                [121.25158,30.342533],
                            ]
                            ,lineStyle:{color:'#4fb6d2'}
                            
                        },
                    ],
        
                },
                {
        
                    type: 'lines',
                    // zlevel: 3,
                    // zlevel: 0.2,
                    z:21,
                    symbol: 'circle',
                    symbolSize: [5, 5],
                    color: '#ff8003',
                    opacity: 1,
                    label: {
                        show: true,
                        padding: [10, 20],
                        color: '#fff',
                        backgroundColor: "#1a3961",
                        borderColor: '#aee9fb',
                        borderWidth: 1,
                        borderRadius: 6,
                        formatter(params) {
                            // console.log(params)
                            let arr = [params.name, "设备总数：" + params.value[1] + "台", "在线数量：" + params.value[0] + "台"];
                            return arr.join("\n")
                        },
                        textStyle: {
                            align: 'left',
                            lineHeight: 20,
                        }
                        /* normal: {
        
                             textStyle: {
                                 color: '#fff',
                                 fontSize: 9,
                             },
                             formatter (value){
                                 return value.data.value[2]
                             },
        
                         }*/
                    },
                    lineStyle: {
                        type: 'solid',
                        color: '#fff',
                        width: 0.5,
                        opacity: 1,
        
                    },
                    data: LableData,
        
        
                },
                // 气球 、scatter 散点图
                {
                    zoom: 1,
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    symbol: 'pin',
                    symbolSize: [50, 50],
                    label: {
                        normal: {
                            show: true,
                            
                            formatter(value) {
                                return value.data[2]
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#D8BC37', //标志颜色
                        }
                    },
                    data: [
                        [127.528588, 50.247033, 2],  // 黑河三高专属基地
                        [89.192125, 42.956351, 4],   // 吐鲁番夏季试车专属基地
                        // [121.25158, 30.342533, 200], // 吉利研究院
                        [120.168403, 33.355342,2],// 盐城试车基地
                        [94.794758, 36.405633,2],// 格尔木高原试车基地
                        [119.417702, 30.919115,2], //广德试车基地
                    ],
                    showEffectOn: 'render',
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    hoverAnimation: true,
                    // zlevel: 1
                    z:22
                },
                // 气球 、scatter 散点图 === 吉利研究院
                {
                    zoom: 1,
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    symbol: 'pin',
                    symbolSize: [50, 50],
                    label: {
                        normal: {
                            show: true,
                            formatter(value) {
                                return value.data[2]
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: 'red', //标志颜色
                        }
                    },
                    data: [
                        [121.25158, 30.342533, 200], // 吉利研究院
                    ],
                    showEffectOn: 'render',
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    hoverAnimation: true,
                    // zlevel: 1
                    z:22
                },
            ]
        };
        

        // 渲染
        myChart.setOption(option_chian_map);

        //echarts 设置地图外边框以及多个geo实现缩放拖曳同步
        // myChart.on('georoam', function(params) {
        //     var option_chian_map_1 = myChart.getOption(); //获得option对象
        //     if (params.zoom !== null && params.zoom !== undefined) { //捕捉到缩放时
        //         option_chian_map_1.geo[0].zoom = option_chian_map_1.series[2].zoom; //下层geo的缩放等级跟着上层的geo一起改变
        //         option_chian_map_1.geo[0].center = option_chian_map_1.series[2].center; //下层的geo的中心位置随着上层geo一起改变
        //     } else { //捕捉到拖曳时
        //         option_chian_map_1.geo[0].center = option_chian_map_1.series[2].center; //下层的geo的中心位置随着上层geo一起改变
        //     }
        //     myChart.setOption(option_chian_map_1); //设置option
        // });

        // 点击散点图上的点
        myChart.on('click', function(params){
            eclick(params)
        });

      

    },
    

    // device-rate 设备xx率
    // 参考 https://gallery.echartsjs.com/editor.html?c=x8UGFy_Nb
    device_rate(value) {
        // 实例化对象
        var myChart = echarts.init(document.querySelector('.device-rate'));

        // 配置

        var datas = {
            name: '设备开动率',
            company: "%",
            ringColor: [{
                offset: 0,
                color: '#02d6fc' // 0% 处的颜色
            }, {
                offset: 1,
                color: '#367bec' // 100% 处的颜色
            }]
        }
        var option_device_rate = {
            // backgroundColor:"#000",
            title: {
                text: value + datas.company,
                x: 'center',
                y: 'center',
                textStyle: {
                    fontWeight: 'normal',
                    color: '#fff',
                    fontSize: '60'
                }
            },

            color: ['#282c40'],
            legend: {
                show: false,
                data: []
            },

            series: [{
                name: 'Line 1',
                type: 'pie',
                clockWise: true,
                radius: ['50%', '60%'],
                itemStyle: {
                    normal: {
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        }
                    }
                },
                hoverAnimation: false,
                data: [{
                    value: value,
                    name: '',
                    itemStyle: {
                        normal: {
                            color: { // 完成的圆环的颜色
                                colorStops: datas.ringColor
                            },
                            label: {
                                show: false
                            },
                            labelLine: {
                                show: false
                            }
                        }
                    }
                }, {
                    name: '',
                    value: 100 - value
                }]
            }]
        };
        // 配置给实例化对象
        myChart.setOption(option_device_rate);

        // 让图标跟随屏幕自适应
        window.addEventListener('resize', f => {
            console.log("重置的屏幕大小！")
            myChart.resize();
        })
    },


}

module.exports = first_level;