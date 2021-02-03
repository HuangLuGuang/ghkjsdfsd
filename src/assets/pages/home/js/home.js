let home = {
  // chian_map map 地图  https://www.makeapie.com/editor.html?c=xmOgZZ5lD2
  chian_map(myChart, myChartData) {
    let data = [
      {
        name: "黑河",
        value: [47, 127, 100],
      },
    ];

    let LableData = [
      {
        name: "黑河冬季试验基地",
        coords: [
          [127.528588, 50.247033],
          [132, 52, 100],
        ],
        value: [2, 3],
      },
      {
        name: "吐鲁番夏季试验基地",
        coords: [
          [89.192125, 42.956351],
          [90, 51],
        ],
        value: [4, 5],
      },
      {
        name: "吉利研究院",
        coords: [
          [121.25158, 30.342533],
          [132, 27, 100],
        ],
        value: [38, 50],
      },
      {
        name: "盐城试车场",
        coords: [
          [120.168403, 33.355342],
          [132, 37, 100],
        ],
        value: [2, 4],
      },
      //94.794758,36.405633
      {
        name: "格尔木高原试验基地",
        coords: [
          [94.794758, 36.405633],
          [90, 20, 100],
        ],
        value: [2, 4],
      },
      //119.417702,30.919115
      {
        name: "广德试车场",
        coords: [
          [119.417702, 30.919115],
          [132, 32, 100],
        ],
        value: [2, 4],
      },

      {
        name: "山东招远试车场",
        coords: [
          [120.410991, 37.389355],
          [132, 42, 100],
        ],
        value: [2, 4],
      },
      {
        name: "江西上饶试车场",
        coords: [
          [117.957799, 28.470025],
          [115, 20, 100],
        ],
        value: [2, 4],
      },
      {
        name: "牙克石冬季试验基地",
        coords: [
          [120.734156, 49.30199],
          [108, 53.2, 100],
        ],
        value: [2, 4],
      },
      {
        name: "襄阳试车场",
        coords: [
          [112.115597, 32.003774],
          [100, 51, 100],
        ],
        value: [2, 4],
      },
      {
        name: "海南热带试车场",
        coords: [
          [109.848175, 19.506262],
          [100, 18, 100],
        ],
        value: [2, 4],
      },
    ];
    var option = {
      // backgroundColor: '#000f1e',
      backgroundColor: "#d6dbdb",
      geo: {
        map: "china",
        // z: 10,
        aspectScale: 0.85,
        layoutCenter: ["50%", "50%"], //地图位置
        layoutSize: "100%",
        zoom: 1.2,
        itemStyle: {
          normal: {
            // shadowColor: '#276fce',
            shadowColor: "#351111",
            shadowOffsetX: 0,
            shadowOffsetY: 15,
            opacity: 0.5,
            color: "#031525",
          },
          emphasis: {
            areaColor: "#276fce",
          },
        },
        regions: [
          {
            name: "南海诸岛",
            itemStyle: {
              areaColor: "rgba(0, 10, 52, 1)",
              borderColor: "rgba(0, 10, 52, 1)",
              normal: {
                opacity: 0,
                label: {
                  show: false,
                  color: "#031525",
                },
              },
            },
            label: {
              show: false,
              color: "#031525",
              // color: '#FFFFFF',
              fontSize: 12,
            },
          },
        ],
      },
      series: [
        // 常规地图
        {
          type: "map",
          z: 10,
          mapType: "china",
          aspectScale: 0.85,
          layoutCenter: ["50%", "50%"], //地图位置
          layoutSize: "100%",
          zoom: 1.2, //当前视角的缩放比例
          // roam: true, //是否开启平游或缩放
          scaleLimit: {
            //滚轮缩放的极限控制
            min: 1,
            max: 2,
          },
          itemStyle: {
            normal: {
              // areaColor: '#0c274b',
              // areaColor: '#1e4f6c',
              areaColor: "rgb(175,220,223)",
              borderColor: "#888a8b",
              borderWidth: 1.5,
            },
            emphasis: {
              // areaColor: '#d16d27',
              areaColor: "#307ba8",

              label: {
                color: "#fff",
              },
            },
          },
        },

        // 区域散点图
        {
          type: "effectScatter",
          coordinateSystem: "geo",
          showEffectOn: "render",
          zlevel: 2,
          // z:20,
          symbolSize: 10,
          rippleEffect: {
            //坐标点动画
            period: 3,
            scale: 5,
            brushType: "fill",
          },
          hoverAnimation: true,
          label: {
            normal: {
              show: true,
              position: "right",
              formatter: "{b}",
              color: "#b3e2f2",
              fontWeight: "bold",
              fontSize: 18,
            },
          },
          // data: data,
          itemStyle: {
            //坐标点颜色
            normal: {
              show: true,
              color: "green",
              shadowBlur: 20,
              shadowColor: "#fff",
            },
            emphasis: {
              areaColor: "#f00",
            },
          },
        },
        // 线 和 点
        {
          type: "lines",
          zlevel: 0.0001, //设置这个才会有轨迹线的小尾巴
          // z:21,
          // polyline:true,
          effect: {
            show: true,
            period: 4,
            trailLength: 0.7,
            color: "#fff", //流动点颜色
            symbol: "arrow",
            symbolSize: 6,
          },
          lineStyle: {
            normal: {
              color: "#1DE9B6",

              width: 1, //线条宽度
              opacity: 0.6, //尾迹线条透明度
              curveness: 0.3, //尾迹线条曲直度
            },
          },
          // data: [
          //     {
          //         fromName: "吉利研究院",
          //         toName: "黑河冬季试验基地",
          //         coords: [
          //             [127.528588, 50.247033],
          //             [121.25158, 30.342533],
          //             [121.25158, 30.342533],
          //         ],
          //         lineStyle: {
          //             color: '#4fb6d2'
          //         }
          //     },
          //     {
          //         fromName: "吉利研究院",
          //         toName: "吐鲁番夏季试验基地",
          //         coords: [
          //             [89.192125, 42.956351],
          //             [121.25158, 30.342533],
          //             [121.25158, 30.342533],
          //         ],
          //         lineStyle: {
          //             color: '#4fb6d2'
          //         }

          //     },
          //     {
          //         //120.168403,33.355342
          //         fromName: "吉利研究院",
          //         toName: "盐城试车场",
          //         coords: [
          //             [120.168403, 33.355342],
          //             [121.25158, 30.342533],
          //             [121.25158, 30.342533],
          //         ],
          //         lineStyle: {
          //             color: '#4fb6d2'
          //         }

          //     },
          //     {
          //         //120.168403,33.355342
          //         fromName: "吉利研究院",
          //         toName: "格尔木高原试验基地",
          //         coords: [
          //             [94.794758, 36.405633],
          //             [121.25158, 30.342533],
          //             [121.25158, 30.342533],
          //         ],
          //         lineStyle: {
          //             color: '#4fb6d2'
          //         }

          //     },
          //     {
          //         fromName: "吉利研究院",
          //         toName: "广德试车场",
          //         coords: [
          //             [119.417702, 30.919115],
          //             [121.25158, 30.342533],
          //             [121.25158, 30.342533],
          //         ],
          //         lineStyle: {
          //             color: '#4fb6d2'
          //         }

          //     },
          //     {
          //         fromName: "吉利研究院",
          //         toName: "牙克石冬季试验基地",
          //         coords: [
          //             [120.734156, 49.30199],
          //             [121.25158, 30.342533],
          //             [121.25158, 30.342533],
          //         ],
          //         lineStyle: {
          //             color: '#4fb6d2'
          //         }

          //     },
          //     {
          //         fromName: "吉利研究院",
          //         toName: "襄阳试车场",
          //         coords: [
          //             [112.115597, 32.003774],
          //             [121.25158, 30.342533],
          //             [121.25158, 30.342533],
          //         ],
          //         lineStyle: {
          //             color: '#4fb6d2'
          //         }

          //     },
          //     {
          //         fromName: "吉利研究院",
          //         toName: "江西上饶试车场",
          //         coords: [
          //             [117.957799, 28.470025],
          //             [121.25158, 30.342533],
          //             [121.25158, 30.342533],
          //         ],
          //         lineStyle: {
          //             color: '#4fb6d2'
          //         }

          //     },
          //     {
          //         fromName: "吉利研究院",
          //         toName: "山东招远试车场",
          //         coords: [
          //             [120.410991, 37.389355],
          //             [121.25158, 30.342533],
          //             [121.25158, 30.342533],
          //         ],
          //         lineStyle: {
          //             color: '#4fb6d2'
          //         }

          //     },
          //     {
          //         fromName: "吉利研究院",
          //         toName: "海南热带试车场",
          //         coords: [
          //             [109.848175, 19.506262],
          //             [121.25158, 30.342533],
          //             [121.25158, 30.342533],
          //         ],
          //         lineStyle: {
          //             color: '#4fb6d2'
          //         }

          //     },
          // ],
          data: myChartData.LinesPointDate,
        },

        {
          type: "lines",
          zlevel: 0.2,
          // z: 21,
          symbol: "circle",
          symbolSize: [5, 5],
          color: "#ff8003",
          opacity: 1,
          label: {
            show: true,
            padding: [10, 20],
            color: "#fff",
            backgroundColor: "#1a3961",
            borderColor: "#aee9fb",
            borderWidth: 1,
            borderRadius: 6,
            formatter(params) {
              // console.log(params)
              let arr = [
                params.name,
                "设备总数：" + params.value[1] + "台",
                "在线数量：" + params.value[0] + "台",
              ];
              return arr.join("\n");
            },
            textStyle: {
              align: "left",
              lineHeight: 20,
            },
          },
          lineStyle: {
            type: "solid",
            color: "#7caaff",
            width: 1,
            opacity: 1,
          },
          // data: LableData,
          data: myChartData.LableData,
        },

        // 气球 、scatter 散点图
        {
          zoom: 1,
          type: "scatter",
          coordinateSystem: "geo",
          symbol: "pin",
          symbolSize: [25, 25],
          label: {
            normal: {
              show: true,

              formatter(value) {
                // return value.data[2]
                return "";
              },
            },
          },
          itemStyle: {
            normal: {
              color: "#D8BC37", //标志颜色
            },
          },
          // data: [
          //     [127.528588, 50.247033, 2], // 黑河冬季试验基地
          //     [89.192125, 42.956351, 4], // 吐鲁番夏季试验基地
          //     // [121.25158, 30.342533, 200], // 吉利研究院
          //     [120.168403, 33.355342, 2], // 盐城试车场
          //     [94.794758, 36.405633, 2], // 格尔木高原试验基地
          //     [119.417702, 30.919115, 2], //广德试车场
          //     [120.410991, 37.389355], //山东招远试车场
          //     [117.957799, 28.470025], //江西上饶试车场
          //     [120.734156, 49.30199], //牙克石冬季试验基地
          //     [112.115597, 32.003774], //襄阳试车场
          // ],
          data: myChartData.QiQiu.Other,
          showEffectOn: "render",
          rippleEffect: {
            brushType: "stroke",
          },
          hoverAnimation: true,
          zlevel: 1,
          // z:22
        },
        // 气球 、scatter 散点图 === 吉利研究院
        {
          zoom: 1,
          type: "scatter",
          coordinateSystem: "geo",
          symbol: "pin",
          symbolSize: [30, 30],
          label: {
            normal: {
              show: true,
              formatter(value) {
                // return value.data[2]
                return "";
              },
            },
          },
          itemStyle: {
            normal: {
              color: "red", //标志颜色
            },
          },
          // data: [
          //     [121.25158, 30.342533, 200], // 吉利研究院
          // ],
          data: myChartData.QiQiu.main,
          showEffectOn: "render",
          rippleEffect: {
            brushType: "stroke",
          },
          hoverAnimation: true,
          zlevel: 1,
          // z:22
        },
      ],
    };
    // var myChart = echarts.init(document.querySelector('.home_chian_map'));
    // console.log("myChartData", myChartData);
    // console.error("-----------------", JSON.stringify(option));
    myChart.setOption(option, true);
    myChart.resize();

    // 渲染
    // myChart.setOption(option_chian_map);
  },
};

module.exports = home;
