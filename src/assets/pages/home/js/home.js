let home = {
    // chian_map map 地图  https://www.makeapie.com/editor.html?c=xmOgZZ5lD2
    chian_map() {
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
        var myChart = echarts.init(document.querySelector('.home_chian_map'));

        var option_chian_map = {
            // backgroundColor: '#00294E',
            // rgb(74,174,182)       rgb(122,194,200)           rgb(175,220,223)
            // rgb(143,170,220)     rgb(180,199,231)           rgb(218,227,243)

            backgroundColor: 'rgb(214 219 219)',
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
            tooltip:{
                trigger: 'item',
                formatter:function(params){
                    return null
                }
            },

            series: [
                // 常规地图
                {
                    type: 'map',
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
                            areaColor: 'rgb(175,220,223)',
                            // areaColor: '#1e4f6c',
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
                    zlevel: 2,
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
                    zlevel: 1, //设置这个才会有轨迹线的小尾巴
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
                                opacity: 0.1, //尾迹线条透明度
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
                    zlevel: 3,
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
                    },
                    lineStyle: {
                        type: 'solid',
                        color: '#7caaff',
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
                    label: { // 气球上的文字
                        normal: {
                            show: false,
                            fontSize: 10,
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
                        [127.528588, 50.247033, '黑河三高专属基地'],  // 黑河三高专属基地
                        [89.192125, 42.956351, '吐鲁番夏季试车专属基地'],   // 吐鲁番夏季试车专属基地
                        // [121.25158, 30.342533, 200], // 吉利研究院
                        [120.168403, 33.355342,'盐城试车基地'],// 盐城试车基地
                        [94.794758, 36.405633,'格尔木高原试车基地'],// 格尔木高原试车基地
                        [119.417702, 30.919115,'广德试车基地'], //广德试车基地
                    ],
                    tooltip:{
                        formatter: function (params){
                            return params.data[2]
                        }
                    },
                    showEffectOn: 'render',
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    hoverAnimation: true,
                    zlevel: 1
                },
                // 气球 、scatter 散点图 === 吉利研究院
                {
                    zoom: 1,
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    symbol: 'pin',
                    symbolSize: [50, 50],
                    label: {
                        normal: { // 气球上的文字
                            show: false,
                            fontSize: 10,
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
                        [121.25158, 30.342533, '吉利研究院'], // 吉利研究院
                    ],
                    tooltip:{
                        formatter: function (params){
                            return params.data[2]
                        }
                    },
                    showEffectOn: 'render',
                    rippleEffect: {
                        brushType: 'stroke'
                    },
                    hoverAnimation: true,
                    zlevel: 1
                },
            ]
        };
        

        // 渲染
        myChart.setOption(option_chian_map);

        //echarts 设置地图外边框以及多个geo实现缩放拖曳同步
        myChart.on('georoam', function(params) {
            var option_chian_map_1 = myChart.getOption(); //获得option对象
            if (params.zoom !== null && params.zoom !== undefined) { //捕捉到缩放时
                option_chian_map_1.geo[0].zoom = option_chian_map_1.series[2].zoom; //下层geo的缩放等级跟着上层的geo一起改变
                option_chian_map_1.geo[0].center = option_chian_map_1.series[2].center; //下层的geo的中心位置随着上层geo一起改变
            } else { //捕捉到拖曳时
                option_chian_map_1.geo[0].center = option_chian_map_1.series[2].center; //下层的geo的中心位置随着上层geo一起改变
            }
            myChart.setOption(option_chian_map_1); //设置option
        });

        // 点击散点图上的点
        

      

    },

}

module.exports = home;