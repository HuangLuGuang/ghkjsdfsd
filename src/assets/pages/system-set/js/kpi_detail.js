
let left_one_chart


let kpi_detail = {
    // row_one 第一行第一个
    one_row_one(element, afterdata){
        var mychart = echarts.init(document.getElementById(element));
        one_row_one_chart = mychart;
        var option = {
            color:['#DBB70D', '#5D920D'],
            tooltip:{},
            title: {
                text: "试验总数",
                subtext: afterdata.pieTotal,
                top: '17%',
                textAlign: "center",
                left: "71%",
                textStyle: {
                    color: '#000',
                    fontSize: 10,
                    // fontWeight: '400'
                },
                subtextStyle:{
                    color: '#000',
                    fontSize: 20,
                    // fontWeight: '200'
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                },
                // formatter: '{b} <br/>{a0}: {c0}<br/>{a1}: {c1}'
            },
            legend: {
                bottom: '0',
                itemWidth:9,
                itemHeight:9,
                data: ['未完成', '已完成', ]
            },
            grid: {
                left: '3%',
                // right: '4%',
                right: 30,
                bottom: '10%',
                top: '40%',
                containLabel: true
            },
            xAxis: [
                {
                    name: "月份",
                    nameTextStyle:{
                        padding:[30,0,0,-20]
                    },
                    type: 'category',
                    data: afterdata.Xdata,
                    // axisLabel: {
                    //     show: true,
                    //     formatter: '{value}月'
                    // },
                },
                
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: afterdata.Series,
        }
        mychart.setOption(option);
        mychart.resize();
    },

    // row_two 第一行第二个
    one_row_two(element, afterdata){
        var mychart = echarts.init(document.getElementById(element));
        one_row_one_chart = mychart;
        var option  = {
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
                right: 30,
                textStyle: {
                    color: "#fff"
                }
            },
            legend: {
                //x: '4%',
                bottom: "4%",
                itemWidth:9,
                itemHeight:9,
                textStyle: {
                    color: '#90979c',
                },
                // data: afterdata.title
            },

            calculable: true,
            xAxis: [{
                name: "月份",
                nameTextStyle:{
                    padding:[30,0,0,-20]
                },
                type: "category",
                axisLine: {
                    show: true,
                    lineStyle:{
                        color:"rgba(51,51,51,1)"
                    }
                },
                data: afterdata.xData,
            }],
            yAxis: [{
                type: "value",
                splitLine: {
                    show: true
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
                    // barWidth: '20%',
                    barGap: "10%",
                    z:4,
                    itemStyle: {
                        normal: {
                            color: afterdata.color[0], //运行
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
                    // barWidth: '20%',
                    z:3,
                    itemStyle: {
                        normal: {
                            color: afterdata.color[1], // 空闲
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
                    // barWidth: '20%',
                    z:2,
                    itemStyle: {
                        normal: {
                            color: afterdata.color[2], // 占位
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
                    // barWidth: '20%',
                    z:1,
                    itemStyle: {
                        normal: {
                            color: afterdata.color[3], // 维保
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
        mychart.setOption(option);
        mychart.resize();
    },

    // row_three 第一行第三个
    one_row_three(element, afterdata){
        var mychart = echarts.init(document.getElementById(element));
        one_row_one_chart = mychart;
        var option = {
            // backgroundColor: '#0A2E5D',
        
            color: ["#FFBF9F", "#93C9FF"],
        
            tooltip: {
                show: true,
                trigger: "item"
            },

            legend: {
                show: true,
                icon: "rect", // circle 
                left: "35%",
                bottom: "-1%",
                itemHeight: 3,
                itemWidth: 20,
                orient: "horizontal",
                textStyle: {
                    // fontSize: 8,
                    // color: "#fff"
                },
                // data: ["2019年", "2020年"]
                data: [afterdata.data1.name, afterdata.data2.name]
            },
            radar: {
                center: ["50%", "50%"],
                radius: "70%",
                startAngle: 90,
                splitNumber: 4,
                shape: "circle",
                splitArea: {
                    areaStyle: {
                        color: ["transparent"]
                    }
                },
                axisLabel: {
                    show: true,
                    fontSize: 8,
                    // color: "red",
                    fontStyle: "normal",
                    fontWeight: "normal"
                },
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: "#a1a8b3" //white
                    }
                },
        
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: "#a1a8b3" //white
                    }
                },
                indicator: [{
                    name: "占位",
                    max: 88
                }, {
                    name: "空闲",
                    max: 88
                }, {
                    name: "维修",
                    max: 88
                }, {
                    name: "运行",
                    max: 88
                }]
            },
            series: [{
                name: afterdata.data1.name,
                // name: "2019年",
                type: "radar",
                symbol: "circle",
                symbolSize: 10, // 标记点的大小
                areaStyle: {
                    normal: {
                        color: "rgba(255,191,159, 0.9)" // 19
                    }
                },
                // 标记点的 样式
                itemStyle: {
                    color: 'rgba(245, 166, 35, 1)',
                    // borderColor:'rgba(255,191,159, 0.3)',
                    borderWidth: 10,
                },
        
                data: [{
                    value: afterdata.data1.value,// 占位、空闲、维修、运行
                    // value: [80, 50,  48, 43],// 占位、空闲、维修、运行
                    //在拐点处显示数值
                    // label: {
                    //     normal: {
                    //         show: true,
                    //         formatter: (params) => {
                    //             return params.value
                    //         },
                    //     },
                    // },
                }]
            }, {
                name: afterdata.data2.name,
                // name: "2020年",
                type: "radar",
                symbol: "circle",
                symbolSize: 10,
                // 标记点的 样式
                itemStyle: {
                    normal: {
                        color: 'rgba(19, 173, 255, 1)',
                        // borderColor: "rgba(19, 173, 255, 0.4)",
                        borderWidth: 10
                    }
                },
        
                areaStyle: {
                    normal: {
                        color: "rgba(19, 173, 255, 0.5)"
                    }
                },
                lineStyle: {
                    normal: {
                        color: "rgba(19, 173, 255, 1)",
                        width: 2,
                        // 面积线类型 dashed 大虚线 dotted 小虚线   solid 实线
                        type: "solid"
                    }
                },
                data: [{
                    value: afterdata.data2.value
                    // value: [60, 60, 80, 63]
                }]
            }]
        };
        mychart.setOption(option);
        mychart.resize();
    },
    
    // 第二行第一个 
    two_row_one(element, afterdata){
        var mychart = echarts.init(document.getElementById(element));
        one_row_one_chart = mychart;
        var option = {
            // color:["#5D7FE5", "#26FF26"],
            color:afterdata.color,
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                        color: '#999'
                    }
                }
            },
            toolbox: {
                // feature: {
                //     dataView: {show: true, readOnly: false},
                //     magicType: {show: true, type: ['line', 'bar']},
                //     restore: {show: true},
                //     saveAsImage: {show: true}
                // }
            },
            legend: {
                // data: ['蒸发量', '降水量', '平均温度']
                bottom:'1%',
                itemWidth:9,
                itemHeight:9,
            },
            grid:[
                {top:'30%'},
                {
                    height:'20%',
                    width:'20%',
                    // right:'10%',
                    right:30,
                    top:'1%'
                }
            ],
            xAxis: [
                {
                    name: "月份",
                    nameTextStyle:{
                        padding:[30,0,0,-20]
                    },
                    type: 'category',
                    // data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                    data: afterdata.xData,
                    axisPointer: {
                        type: 'shadow'
                    },
                    axisLabel:{
                        interval: 0
                    },
                    gridIndex: 0
                },
                {
                    type: 'value', 
                    gridIndex: 1,
                    axisLine:{
                        show:false
                    },
                     axisLabel:{
                        show:false,
                    },
                    splitLine:{
                        show:false
                    },
                    axisTick:{
                        show:false
                    },
                    splitArea:{
                        show:false
                    },
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    // name: '水量',
                    min: 0,
                    max: 100,
                    interval: 50,
                    gridIndex: 0,
                    axisLabel: {
                        formatter: '{value}'
                    }
                },
                {
                    type: 'value',
                    // name: '温度',
                    min: 0,
                    max: 100,
                    interval: 50,
                    gridIndex: 0,
                    axisLabel: {
                        formatter: '{value} %'
                    }
                },
                {
                    type:'category',
                    gridIndex: 1,
                    axisLine:{
                        show:false
                    },
                    axisTick:{
                        show:false
                    },
                    data:afterdata.Total.yAxis.data
                }
            ],
            series: afterdata.Series,
            // series: [
            //     // 去年bar
            //     {
            //         name: '2020年',
            //         type: 'bar',
            //         data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
            //     },
            //     // 今年bar
            //     {
            //         name: '2021年',
            //         type: 'bar',
            //         data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
            //     },
            //     // 去年line
            //     {
            //         name: '2020年利用率',
            //         type: 'line',
            //         // yAxisIndex: 1,
            //         data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
            //     },
            //     // 今年line
            //     {
            //         name: '2021年利用率',
            //         type: 'line',
            //         // yAxisIndex: 1,
            //         data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
            //     },
            //     {
            //         type: 'bar', xAxisIndex: 1, yAxisIndex: 2,
            //         data:[{
            //             value:100,
            //             itemStyle:{
            //                  color:'#5D7FE5'
            //             },
            //         },{
            //             value:20,
            //             itemStyle:{
            //                  color:'#26FF26' 
            //             }
            //         }],
                    
            //       },
                
                
            // ],
            
        }
        mychart.setOption(option);
        mychart.resize();
    },

    // 第二行第二个
    two_row_two(element, afterdata){
        var mychart = echarts.init(document.getElementById(element));
        one_row_one_chart = mychart;
        var option = {
            color:afterdata.color,
            tooltip:{},
            title:{
                subtext: afterdata.Total.name + "%",
                right: '1%',
                subtextStyle:{
                    fontSize:20,
                    color: '#7E7EFF'
                    
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                },
            },
            legend: {
                bottom: '0',
                itemWidth:9,
                itemHeight:9,
                data: ['占位', '运行', ]
            },
            grid: {
                left: '3%',
                // right: '4%',
                right: 30,
                bottom: '10%',
                top: '15%',
                containLabel: true
            },
            xAxis: [
                {
                    name: "月份",
                    nameTextStyle:{
                        padding:[30,0,0,-20]
                    },
                    type: 'category',
                    data: afterdata.xData
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: afterdata.Series,
        }
        mychart.setOption(option);
        mychart.resize();
    },
    
    // 第二行第三个
    two_row_three(element, afterdata){
        var mychart = echarts.init(document.getElementById(element));
        one_row_one_chart = mychart;
        var option = {
            color:afterdata.color,
            tooltip:{},
            title:{
                subtext: afterdata.Total.name + "%",
                right: '1%',
                subtextStyle:{
                    fontSize:20,
                    color: '#7E7EFF'
                    
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                },
            },
            legend: {
                bottom: '0',
                itemWidth:9,
                itemHeight:9,
                data: ['完好率', '故障率', ]
            },
            grid: {
                left: '3%',
                // right: '4%',
                right: 30,
                bottom: '10%',
                top: '15%',
                containLabel: true
            },
            xAxis: [
                {
                    name: "月份",
                    nameTextStyle:{
                        padding:[30,0,0,-20]
                    },
                    type: 'category',
                    data: afterdata.xData
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: afterdata.Series,
        }
        mychart.setOption(option);
        mychart.resize();
    },
    
    // 第三行，第一个
    three_row_one(element, afterdata){
        var mychart = echarts.init(document.getElementById(element));
        one_row_one_chart = mychart;
        var option = {
            baseOption: {
                timeline: {
                    show: false,
                    top: 0,
                    data: []
                },
                legend: {
                    bottom:'3%',
                    right: 'center',
                    icon: 'horizontal',
                    itemWidth:9,
                    itemHeight:9,
                    textStyle: {
                        color: 'black',
                        // fontSize: 20,
                    },
                    data: afterdata.legend
                },
                tooltip:{
                    show:true,
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    },
                   formatter:function(d){
                      let i = d[0].dataIndex;
                      return d[0].marker+afterdata.legend[0]+'  '+afterdata.lastYearData[i]+'<br>'+
                      '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:'+
                      afterdata.colors[1]+'"></span>'+afterdata.legend[1]+'  '+afterdata.thisYearData[i]
                    }
                },
                grid: [{
                    show: false,
                    left: '5%',
                    top: '10%',
                    bottom: '16%',
                    containLabel: true,
                    width: '37%'
                }, {
                    show: false,
                    left: '51%',
                    top: '10%',
                    bottom: '16%',
                    width: '0%'
                }, {
                    show: false,
                    right: '2%',
                    top: '10%',
                    bottom: '16%',
                    containLabel: true,
                    width: '37%'
                }],
                xAxis: [{
                    type: 'value',
                    inverse: true,
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    position: 'top',
                    axisLabel: {
                        show: true,
                        color: "black"
                    },
                    splitLine:{
                         show: true,
                        lineStyle:{
                            color:"rgba(255,255,255,0.2)"
                        }
                    },
                }, {
                    gridIndex: 1,
                    show: false
                }, {
                    gridIndex: 2,
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    position: 'top',
                    axisLabel: {
                        show: true,
                        color: "black"
                    },
                     splitLine:{
                         show: true,
                        lineStyle:{
                            color:"rgba(255,255,255,0.2)"
                        }
                    },
                }],
                yAxis: [{
                    
                    type: 'category',
                    inverse: true,
                    position: 'right',
                    axisLine: {
                        show: true,
                        lineStyle:{
                            color:"rgba(255,255,255,0.2)"
                        }
                    },
                   
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: false
                    },
                    data: afterdata.xData,
                    
                    
                }, {
                    gridIndex: 1,
                    type: 'category',
                    inverse: true,
                    position: 'left',
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: true,
                        interval:0,
                        padding:[30,0,0,0],
                        textStyle: {
                            color: 'black',
                            fontSize: 20
                        },
                        align: "center"
    
                    },
                    data: afterdata.xData.map(function(value) {
                        return {
                            value: value,
                            textStyle: {
                                align: 'center',
                                fontSize:12 // 月份的字体大小
                            }
                        }
                    }),
                    
                }, {
                    gridIndex: 2,
                    type: 'category',
                    inverse: true,
                    position: 'left',
                    axisLine: {
                         show: true,
                        lineStyle:{
                            color:"rgba(255,255,255,0.2)"
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: false
    
                    },
                    data: afterdata.xData,
                }],
                series: []
    
            },
            options: [{
                series: [{
                    name: "2017",
                    type: "bar",
                    barWidth: 10,
                    stack: "1",
                    itemStyle: {
                        normal: {
                            color:afterdata.colors[0],
                        }
                    },
                    label: {
                        normal: {
                            show: false,
                        }
                    },
                    data: afterdata.lastYearData,
                    animationEasing: "elasticOut"
                },
                {
                    name: "2018",
                    type: "bar",
                    stack: "2",
                    barWidth: 10,
                    xAxisIndex: 2,
                    yAxisIndex: 2,
                    itemStyle: {
                        normal: {
                            color:afterdata.colors[1],
                        }
                    },
                    label: {
                        normal: {
                            show: false,
                        }
                    },
                    data: afterdata.thisYearData,
                    animationEasing: "elasticOut"
                },
            ]
            }]
        }
        mychart.setOption(option);
        mychart.resize();
    },
    // 第三行第二个
    three_row_two(element, afterdata){
        var mychart = echarts.init(document.getElementById(element));
        one_row_one_chart = mychart;
        var labelOption = {
            show: true,
            rotate: 90,
            align: 'left',
            verticalAlign: 'middle',
            position: 'top',
            formatter: '{c}  {name|{a}}',
            fontSize: 14,
            rich: {
                name: {
                    // textBorderColor: '#fff'
                    color:'black'
                }
            }
        };
        var option = {
            color: afterdata.colors,
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                bottom:'3%',
                right: 'center',
                icon: 'horizontal',
                itemWidth:9,
                itemHeight:9,
                textStyle: {
                    color: 'black',
                },
                data: afterdata.legend
            },
            grid:{
                top:'20%',
                bottom:'20%',
                left:'5%',
                right: '5%'
            },
            xAxis: [
                {
                    type: 'category',
                    axisTick: {show: false},
                    axisLabel:{
                        interval: 0
                    },
                    data: afterdata.xData,
                    
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: 'error',
                    type: 'bar',
                    barGap: 0,
                    label: labelOption,
                    data: afterdata.error
                },
                {
                    name: 'warning',
                    type: 'bar',
                    label: labelOption,
                    data: afterdata.warning
                },
                {
                    name: 'info',
                    type: 'bar',
                    label: labelOption,
                    data: afterdata.info
                },
        
            ]
        };
        mychart.setOption(option);
        mychart.resize();
    },

    // 第三行，第三个
    three_row_three(element, afterdata){
        var mychart = echarts.init(document.getElementById(element));
        one_row_one_chart = mychart;
        var option = {

            tooltip: {
                trigger: 'axis'
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                // data: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
                data: afterdata.xData,
                
               
            },
            yAxis: {
                type: 'value',
                max:2,
                axisLine: {
                    show: false
                },
                 axisTick: {
                    show: false
                },
            },
            

            series: [
                {
                    name: 'Step Start',
                    type: 'line',
                    step: 'start',
                    // data: [1, 0, 1, 0, 1, 0,1,1,1,0,1,1,1,0,0,0,0,0,0,0,1,1,0,1,1,1,0,1,1,0],
                    data: afterdata.SeriesData,
                    lineStyle:{
                         color:'rgb(138,43,226)',
                         width:4,
                    },
                    areaStyle:{
                          color: 'rgb(138,43,226,0.3)'  
                        
                    },
                },
            ]
        };
        mychart.setOption(option);
        mychart.resize();
    },

    // one_row_two(element, afterdata){
    //     var mychart = echarts.init(document.getElementById(element));
    //     one_row_one_chart = mychart;
    //     var option = {

    //     }
    //     mychart.setOption(option);
    // },

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
        // left_one_chart.group = "group1"
        // mychart.group = "group1"
        // console.log("****************",left_one_chart)
        // echarts.connect('group1')
        // echarts.connect([mychart,left_one_chart])

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