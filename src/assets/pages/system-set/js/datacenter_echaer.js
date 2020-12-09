let kpi_detail = {

    // left_one 设备时间统计 参考： https://gallery.echartsjs.com/editor.html?c=xHyoiv-D-e
    left_one(element, afterdata) {
        // 实例化对象
        var mychart = echarts.init(document.querySelector(element));
        console.log("左侧第一个",afterdata)

        // 配置
        var option = {
            // color: ['#3398DB'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '9%',
                containLabel: true
            },
            legend: {
                bottom: "-1%",
                textStyle: {
                    color: '#90979c',
                },
                data: afterdata.title
            },
            xAxis: [
                {
                    type: 'category',
                    data: afterdata.xData,
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: afterdata.title[0],
                    type: 'bar',
                   
                    data: afterdata.running
                },
                {
                    name: afterdata.title[1],
                    type: 'bar',
                    data: afterdata.stop
                },
            ]
        };
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
            color = ['rgb(126,255,182)', 'rgb(0,76,166)'];
        }else(
            color = ['rgb(175,117,59)', 'rgb(126,255,182)', 'rgb(0,76,166)', 'rgb(150,13,48)']
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
                radius: [100, 120],
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

    // 这是 重置echart
    resize() {
        console.log("这是 重置echart");
        left_one_chart.resize();
        right_one_chart.resize();
    }
};

module.exports = kpi_detail;