// 1、一个js文件表示一个模块

// const { map } = require("core-js/fn/array");

var map;

let mapjs = {
  // 初始化地图
  initmap(map_trace, initpoint) {
    // @ts-ignore
    map = new BMap.Map(map_trace, { enableMapClick: false }); //创建地图实例, 添加object配置，关闭地图可点功能
    // @ts-ignore
    const point = new BMap.Point(initpoint[0], initpoint[1]); //创建点坐标
    map.centerAndZoom(point, 18); //初始化地图，设置中心点坐标和地图级别， 11表示地图的展示级别
    map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
  },

  // 添加地图控件=地图类型+ 缩放图控件
  addmapCtrlType() {
    // @ts-ignore
    var mapType = new BMap.MapTypeControl({
      // @ts-ignore
      mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP],
      // @ts-ignore
      anchor: BMAP_ANCHOR_TOP_LEFT,
    });

    // @ts-ignore
    var top_left_navigation = new BMap.NavigationControl({
      // @ts-ignore
      anchor: BMAP_ANCHOR_TOP_RIGHT,
    }); //左上角，添加默认缩放平移控件
    map.addControl(mapType);
    map.addControl(top_left_navigation);
  },

  // 测距
  ranging() {
    // 通过JavaScript的prototype属性继承于BMap.Control
    // @ts-ignore
    RangingControl.prototype = new BMap.Control();
    RangingControl.prototype.initialize = function (map_data) {
      // 创建一个DOM元素
      var div = document.createElement("div");
      // 添加文字说明
      div.appendChild(document.createTextNode("测距"));
      // 设置样式
      div.style.cursor = "pointer";
      div.style.border = "1px solid gray";
      div.style.backgroundColor = "#00d68f36";
      div.style["border-radius"] = "15%";

      // 绑定事件,点击一次
      // @ts-ignore
      // @ts-ignore
      div.onclick = function (e) {
        // @ts-ignore
        var myDis = new BMapLib.DistanceTool(map);
        myDis.open(); // 开启鼠标测距

        // map.addEventListener("load", function() {
        //     myDis.open(); // 开启鼠标测距
        //     //myDis.close();  //关闭鼠标测距
        // });
      };
      // 添加DOM元素到地图中
      map_data.getContainer().appendChild(div);
      // 将DOM元素返回
      return div;
    };
    // 创建控件
    var myrangingCtrl = new RangingControl();
    // 添加到地图当中
    map.addControl(myrangingCtrl);
  },

  // 点击获取点击的经纬度
  hitgit_lng_lat() {
    //单击获取点击的经纬度
    map.addEventListener("click", function (e) {
      // alert(e.point.lng + "," + e.point.lat);
      console.log(e.point.lng + "," + e.point.lat);
    });
  },

  // 报警控件
  alert() {
    // 通过JavaScript的prototype属性继承于BMap.Control
    // @ts-ignore
    AlertControl.prototype = new BMap.Control();
    AlertControl.prototype.initialize = function (map_data) {
      // 创建一个DOM元素
      var div = document.createElement("div");
      // 添加文字说明
      // div.appendChild(document.createTextNode("<strong>报警</strong>"));
      var img = document.createElement("img");
      img.setAttribute("id", "my_map_alert");
      img.setAttribute(
        "src",
        "assets/pages/mobile-asset-management/images/pictures/bell.png"
      );
      img.style.width = "100%";
      img.style.height = "auto";
      div.appendChild(img);
      // 设置样式
      div.style.cursor = "pointer";
      div.style.border = "1px solid gray";
      div.style.backgroundColor = "#00d68f36";
      div.style["border-radius"] = "15%";
      div.style["text-align"] = "center";
      div.style.width = "32px";
      div.style.height = "auto";

      // 绑定事件,点击一次放大两级
      // @ts-ignore
      // @ts-ignore
      div.onclick = function (e) {
        // alert("这是报警")
        console.log("这是报警");
      };
      // 添加DOM元素到地图中
      map_data.getContainer().appendChild(div);
      // 将DOM元素返回
      return div;
    };
    // 创建控件
    var myalertCtrl = new AlertControl();
    // 添加到地图当中
    map.addControl(myalertCtrl);
  },

  // 20s 后刷新
  refresh(refresh_time) {
    if (document.getElementById("myrefresh")) {
      document.getElementById("myrefresh").remove();
    }
    // @ts-ignore
    RefreshControl.prototype = new BMap.Control();
    RefreshControl.prototype.initialize = function (map_data) {
      // 创建一个DOM元素
      var div = document.createElement("div");
      // 时间20s

      // 添加文字说明
      div.appendChild(document.createTextNode(refresh_time + "秒后刷新"));
      // 设置样式
      div.setAttribute("id", "myrefresh");
      div.style.cursor = "pointer";
      div.style.padding = "7px 10px";
      div.style.boxShadow = "0 2px 6px 0 rgba(27, 142, 236, 0.5)";
      div.style.borderRadius = "5px";
      div.style.backgroundColor = "#fff";
      div.style.width = "100px";

      // @ts-ignore
      div.onclick = function (e) {
        console.log("这是刷新");
      };
      // 添加DOM元素到地图中
      map_data.getContainer().appendChild(div);
      // 将DOM元素返回
      return div;
    };
    // 创建控件
    var myrefreshCtrl = new RefreshControl();
    // 添加到地图当中
    map.addControl(myrefreshCtrl);
  },

  //  清除自定义控件
  clearOverlay() {
    if (map) {
      map.clearOverlays();
    }
  },

  // 创建图标，设备信息,点击左侧button生成  setweilan
  device_info(user_deviceInfo) {
    // console.log("动态创建图表、信息窗口： ", user_deviceInfo);
    if (user_deviceInfo != undefined) {
      var pt = user_deviceInfo.latlon.split(",");
      var lng_lat = user_deviceInfo.latlon.split(",");
      var car_path =
        "assets/pages/mobile-asset-management/images/car/ico_car_blue.png";
      var isfavor = user_deviceInfo.isfavor === 1 ? "是" : "否";
      // if (user_deviceInfo.info.search("在线") === 0) {
      //   car_path =
      //     "assets/pages/mobile-asset-management/images/car/ico_car_blue.png";
      // }
      // if (user_deviceInfo.info.search("离线") === 0) {
      //   car_path =
      //     "assets/pages/mobile-asset-management/images/car/car_red.png";
      // }
      // if (user_deviceInfo.info.search("其它") === 0) {
      //   car_path =
      //     "assets/pages/mobile-asset-management/images/car/ico_car_blue.png";
      // }

      reverse_analysis_address(pt).then((result) => {
        var opts = {
          width: 300,
          height: 250,
        };
        var device_conent =
          "<div>" +
          "<h6 style='margin: 0 0 5px; padding: 0.2em 0'>" +
          "设备信息" +
          "</h6>" +
          '<ul style="padding: 0;">' +
          '<li class="device_info_li">设备编号：' +
          user_deviceInfo.deviceid +
          " </li>" +
          '<li class="device_info_li">设备名称： ' +
          user_deviceInfo.devicename +
          "</li>" +
          '<li class="device_info_li">IMEI号： ' +
          user_deviceInfo.imei +
          "</li>" +
          '<li class="device_info_li">SIM号： ' +
          user_deviceInfo.sim +
          "</li>" +
          '<li class="device_info_li">定位类型： ' +
          user_deviceInfo.gpstype +
          "</li>" +
          '<li class="device_info_li">经纬度：' +
          lng_lat[0] +
          ", " +
          lng_lat[1] +
          "</li>" +
          '<li class="device_info_li">电量： ' +
          user_deviceInfo.electricity +
          "</li>" +
          '<li class="device_info_li">详细地址：' +
          result +
          "</li>" +
          '<li class="device_info_li">是否关注： ' +
          isfavor +
          "</li>" +
          '<li class="device_info_li">更新时间： ' +
          user_deviceInfo.recordtime +
          "</li>" +
          "</ul>" +
          "</div>";
        // @ts-ignore
        var carIcon = new BMap.Icon(
          car_path,
          // @ts-ignore
          new BMap.Size(26, 52),
          // var carIcon = new BMap.Icon('assets/pages/mobile-asset-management/images/car/car_gray.png', new BMap.Size(26,52),
          {
            // @ts-ignore
            anchor: new BMap.Size(13, 13),
          }
        );
        // 创建图标marker
        // @ts-ignore
        var marker = new BMap.Marker(
          // @ts-ignore
          new BMap.Point(lng_lat[0], lng_lat[1]),
          {
            icon: carIcon,
          }
        );
        // 创建窗口对象
        // @ts-ignore
        var infoWindow = new BMap.InfoWindow(device_conent, opts);

        // 将 marker 添加到map
        map.addOverlay(marker);

        // 以设备所在坐标位中心显示
        // @ts-ignore
        map.setCenter(
          // @ts-ignore
          new BMap.Point(lng_lat[0], lng_lat[1])
        );

        marker.openInfoWindow(infoWindow);

        // console.error("监听点击事件", infoWindow.isOpen());
        //判断窗口的打开状态
        if (!infoWindow.isOpen()) {
          infoWindow.addEventListener("open", function () {
            // @ts-ignore
            $(".setweilan").on("click", (params) => {
              // console.log(
              //   "*********监听点击设置围栏*********",
              //   infoWindow.isOpen()
              // );
              // setweilan(params);
            });
          });
        } else {
          // 监听点击设置围栏
          // @ts-ignore
          $(".setweilan").on("click", (params) => {
            // console.log(
            //   "*********监听点击设置围栏*********",
            //   infoWindow.isOpen()
            // );
            // setweilan(params);
          });
        }

        // 监听点击事件
        marker.addEventListener("click", function () {
          this.openInfoWindow(infoWindow);
          infoWindow.redraw(); // 防止在网速较慢时生成的信息框高度比图片总高度小，导致图片部分被隐
        });

        // 监听点击设置围栏
        // $(".setweilan").on("click", (params) => {
        //   console.log("*********监听点击设置围栏*********");
        //   setweilan(params);
        // });
      });
    }
  },

  // 初始化离线的设备！setweilan
  initnoinline(element) {
    var pt = element.lng_lat;
    var isfavor = element.isfavor === 1 ? "是" : "否";
    reverse_analysis_address(pt).then((result) => {
      var sContent =
        "<div>" +
        "<h6 style='margin: 0 0 5px; padding: 0.2em 0'>" +
        "设备信息" +
        "</h6>" +
        '<ul style="padding: 0;">' +
        '<li class="device_info_li">设备编号：' +
        element.deviceid +
        " </li>" +
        '<li class="device_info_li">设备名称： ' +
        element.devicename +
        "</li>" +
        '<li class="device_info_li">IMEI号： ' +
        element.imei +
        "</li>" +
        '<li class="device_info_li">SIM号： ' +
        element.sim +
        "</li>" +
        '<li class="device_info_li">定位类型： ' +
        element.gpstype +
        "</li>" +
        '<li class="device_info_li">经纬度：' +
        element.lng_lat[0] +
        ", " +
        element.lng_lat[1] +
        "</li>" +
        '<li class="device_info_li">电量： ' +
        element.electricity +
        "</li>" +
        '<li class="device_info_li">详细地址：' +
        result +
        "</li>" +
        '<li class="device_info_li">是否关注： ' +
        isfavor +
        "</li>" +
        '<li class="device_info_li">更新时间： ' +
        element.recordtime +
        "</li>" +
        "</ul>" +
        "</div>";
      // var sContent =
      //   "<div>" +
      //   "<h6 style='margin: 0 0 5px; padding: 0.2em 0'>" +
      //   "设备信息" +
      //   "</h6>" +
      //   '<ul style="padding: 0;">' +
      //   '<li class="device_info_li">设备名称： ' +
      //   element.deviceName +
      //   "</li>" +
      //   '<li class="device_info_li">设备状态： ' +
      //   element.info +
      //   "</li>" +
      //   '<li class="device_info_li">设备编号：' +
      //   element.deviceid +
      //   " </li>" +
      //   '<li class="device_info_li">定位类型： 卫星定位</li>' +
      //   '<li class="device_info_li">经纬度：' +
      //   element.lng_lat[0] +
      //   ", " +
      //   element.lng_lat[1] +
      //   "</li>" +
      //   '<li class="device_info_li">更新时间： ' +
      //   element.recordtime +
      //   "</li>" +
      //   '<li class="device_info_li">详细地址：' +
      //   result +
      //   "</li>" +
      //   "</ul>" +
      //   "</div>";

      // 离线设备点
      // @ts-ignore
      var noinline_point = new BMap.Point(
        element.lng_lat[0],
        element.lng_lat[1]
      );

      // 离线设备图标
      // @ts-ignore
      var noinline_carIcon = new BMap.Icon(
        "assets/pages/mobile-asset-management/images/car/car_red.png",
        // @ts-ignore
        new BMap.Size(26, 52),
        {
          // @ts-ignore
          anchor: new BMap.Size(13, 13),
        }
      );

      // 离线设备图标
      // @ts-ignore
      var noinline_marker = new BMap.Marker(noinline_point, {
        icon: noinline_carIcon,
      });

      // 将 marker 添加到map
      map.addOverlay(noinline_marker);
      // @ts-ignore
      noinline_marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画

      // 监听点击事件
      addClickHandler(sContent, noinline_marker);
    });

    function addClickHandler(sContent, marker) {
      marker.addEventListener("click", function (e) {
        var p = e.target;
        // @ts-ignore
        var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
        var opts = {
          width: 300,
          height: 250,
        };
        // @ts-ignore
        var infoWindow = new BMap.InfoWindow(sContent, opts);
        map.openInfoWindow(infoWindow, point); //开启信息窗口
        // console.error("监听点击事件", infoWindow.isOpen());
        //判断窗口的打开状态
        if (!infoWindow.isOpen()) {
          infoWindow.addEventListener("open", function () {
            // @ts-ignore
            $(".setweilan").on("click", (params) => {
              // console.log(
              //   "*********监听点击设置围栏*********",
              //   infoWindow.isOpen()
              // );
              // setweilan(params);
            });
          });
        } else {
          // 监听点击设置围栏
          // @ts-ignore
          $(".setweilan").on("click", (params) => {
            // console.log(
            //   "*********监听点击设置围栏*********",
            //   infoWindow.isOpen()
            // );
            // setweilan(params);
          });
        }
      });
    }
  },

  // 初始化在线设备！
  initinline(element) {
    var pt = element.lng_lat;
    var isfavor = element.isfavor === 1 ? "是" : "否";
    reverse_analysis_address(pt).then((result) => {
      var sContent =
        "<div>" +
        "<h6 style='margin: 0 0 5px; padding: 0.2em 0'>" +
        "设备信息" +
        "</h6>" +
        '<ul style="padding: 0;">' +
        '<li class="device_info_li">设备编号：' +
        element.deviceid +
        " </li>" +
        '<li class="device_info_li">设备名称： ' +
        element.devicename +
        "</li>" +
        '<li class="device_info_li">IMEI号： ' +
        element.imei +
        "</li>" +
        '<li class="device_info_li">SIM号： ' +
        element.sim +
        "</li>" +
        '<li class="device_info_li">定位类型： ' +
        element.gpstype +
        "</li>" +
        '<li class="device_info_li">经纬度：' +
        element.lng_lat[0] +
        ", " +
        element.lng_lat[1] +
        "</li>" +
        '<li class="device_info_li">电量： ' +
        element.electricity +
        "</li>" +
        '<li class="device_info_li">详细地址：' +
        result +
        "</li>" +
        '<li class="device_info_li">是否关注： ' +
        isfavor +
        "</li>" +
        '<li class="device_info_li">更新时间： ' +
        element.recordtime +
        "</li>" +
        "</ul>" +
        "</div>";
      // var sContent =
      //   "<div>" +
      //   "<h6 style='margin: 0 0 5px; padding: 0.2em 0'>" +
      //   "设备信息" +
      //   "</h6>" +
      //   '<ul style="padding: 0;">' +
      //   '<li class="device_info_li">设备名称： ' +
      //   element.devicename +
      //   "</li>" +
      //   '<li class="device_info_li">设备状态： ' +
      //   element.info +
      //   "</li>" +
      //   '<li class="device_info_li">设备序号：' +
      //   element.deviceid +
      //   " </li>" +
      //   '<li class="device_info_li">定位类型： 卫星定位</li>' +
      //   '<li class="device_info_li">经纬度：' +
      //   element.lng_lat[0] +
      //   ", " +
      //   element.lng_lat[1] +
      //   "</li>" +
      //   '<li class="device_info_li">更新时间： ' +
      //   element.recordtime +
      //   "</li>" +
      //   '<li class="device_info_li">详细地址：' +
      //   result +
      //   "</li>" +
      //   "</ul>" +
      //   "</div>";

      // 在线设备点
      // @ts-ignore
      var noinline_point = new BMap.Point(
        element.lng_lat[0],
        element.lng_lat[1]
      );

      // 在线设备图标
      // @ts-ignore
      var noinline_carIcon = new BMap.Icon(
        "assets/pages/mobile-asset-management/images/car/ico_car_green.png",
        // @ts-ignore
        new BMap.Size(26, 52),
        {
          // @ts-ignore
          anchor: new BMap.Size(13, 13),
        }
      );

      // 在线设备图标
      // @ts-ignore
      var noinline_marker = new BMap.Marker(noinline_point, {
        icon: noinline_carIcon,
      });

      // 将 marker 添加到map
      map.addOverlay(noinline_marker);

      // 监听点击事件
      addClickHandler(sContent, noinline_marker);
    });

    function addClickHandler(sContent, marker) {
      marker.addEventListener("click", function (e) {
        var p = e.target;
        // @ts-ignore
        var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
        var opts = {
          width: 300,
          height: 250,
        };
        // @ts-ignore
        var infoWindow = new BMap.InfoWindow(sContent, opts);
        map.openInfoWindow(infoWindow, point); //开启信息窗口
      });
    }
  },

  // 初始化其它设备！
  initother(element) {
    var pt = element.lng_lat;
    var isfavor = element.isfavor === 1 ? "是" : "否";
    reverse_analysis_address(pt).then((result) => {
      var sContent =
        "<div>" +
        "<h6 style='margin: 0 0 5px; padding: 0.2em 0'>" +
        "设备信息" +
        "</h6>" +
        '<ul style="padding: 0;">' +
        '<li class="device_info_li">设备编号：' +
        element.deviceid +
        " </li>" +
        '<li class="device_info_li">设备名称： ' +
        element.devicename +
        "</li>" +
        '<li class="device_info_li">IMEI号： ' +
        element.imei +
        "</li>" +
        '<li class="device_info_li">SIM号： ' +
        element.sim +
        "</li>" +
        '<li class="device_info_li">定位类型： ' +
        element.gpstype +
        "</li>" +
        '<li class="device_info_li">经纬度：' +
        element.lng_lat[0] +
        ", " +
        element.lng_lat[1] +
        "</li>" +
        '<li class="device_info_li">电量： ' +
        element.electricity +
        "</li>" +
        '<li class="device_info_li">详细地址：' +
        result +
        "</li>" +
        '<li class="device_info_li">是否关注： ' +
        isfavor +
        "</li>" +
        '<li class="device_info_li">更新时间： ' +
        element.recordtime +
        "</li>" +
        "</ul>" +
        "</div>";
      // var sContent =
      //   "<div>" +
      //   "<h6 style='margin: 0 0 5px; padding: 0.2em 0'>" +
      //   "设备信息" +
      //   "</h6>" +
      //   '<ul style="padding: 0;">' +
      //   '<li class="device_info_li">设备名称： ' +
      //   element.devicename +
      //   "</li>" +
      //   '<li class="device_info_li">设备状态： ' +
      //   element.info +
      //   "</li>" +
      //   '<li class="device_info_li">设备序号：' +
      //   element.deviceid +
      //   " </li>" +
      //   '<li class="device_info_li">定位类型： 卫星定位</li>' +
      //   '<li class="device_info_li">经纬度：' +
      //   element.lng_lat[0] +
      //   ", " +
      //   element.lng_lat[1] +
      //   "</li>" +
      //   '<li class="device_info_li">更新时间： ' +
      //   element.recordtime +
      //   "</li>" +
      //   '<li class="device_info_li">详细地址：' +
      //   result +
      //   "</li>" +
      //   "</ul>" +
      //   "</div>";

      // 其它设备点
      // @ts-ignore
      var noinline_point = new BMap.Point(
        element.lng_lat[0],
        element.lng_lat[1]
      );

      // 其它设备图标
      // @ts-ignore
      var noinline_carIcon = new BMap.Icon(
        "assets/pages/mobile-asset-management/images/car/ico_car_yellow.png",
        // @ts-ignore
        new BMap.Size(26, 52),
        {
          // @ts-ignore
          anchor: new BMap.Size(13, 13),
        }
      );

      // 其它设备图标
      // @ts-ignore
      var noinline_marker = new BMap.Marker(noinline_point, {
        icon: noinline_carIcon,
      });

      // 将 marker 添加到map
      map.addOverlay(noinline_marker);

      // 监听点击事件
      addClickHandler(sContent, noinline_marker);
    });

    function addClickHandler(sContent, marker) {
      marker.addEventListener("click", function (e) {
        var p = e.target;
        // @ts-ignore
        var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
        var opts = {
          width: 300,
          height: 250,
        };
        // @ts-ignore
        var infoWindow = new BMap.InfoWindow(sContent, opts);
        map.openInfoWindow(infoWindow, point); //开启信息窗口
      });
    }
  },

  // 测试，点击行时，展示折线
  hit_to_show_line(points) {
    map.clearOverlays(polyline);
    // 创建polyline对象
    var points_list = [];
    points.forEach((point) => {
      var item = point.split(",");
      // @ts-ignore
      points_list.push(new BMap.Point(item[0], item[1]));
    });

    // console.error("points**>>>>>>>>>>>>>>>", points);
    // console.error("points_list**>>>>>>>>>>>>>>>", points_list);

    // 创建折线
    // @ts-ignore
    var sy = new BMap.Symbol(BMap_Symbol_SHAPE_BACKWARD_OPEN_ARROW, {
      scale: 0.6, //图标缩放大小
      strokeColor: "#fff", //设置矢量图标的线填充颜色
      strokeWeight: "2", //设置线宽 2
    });
    // @ts-ignore
    // var icons = new BMap.IconSequence(sy, "10", "10");
    // @ts-ignore
    var polyline = new BMap.Polyline(points_list, {
      enableEditing: false, //是否启用线编辑，默认为false
      enableClicking: true, //是否响应点击事件，默认为true
      // icons: [icons],
      strokeWeight: "4", //折线的宽度，以像素为单位8
      strokeOpacity: 0.8, //折线的透明度，取值范围0 - 1
      strokeColor: "#18a45b", //折线颜色
    });
    map.addOverlay(polyline); //增加折线

    // 在线上加载点，该点为实际上采集的点！
    points_list.forEach((item) => {
      if (points_list.indexOf(item) === 0) {
        // @ts-ignore
        var myIcon = new BMap.Icon(
          "assets/pages/mobile-asset-management/images/car/start_icon.png",
          // @ts-ignore
          new BMap.Size(26, 52),
          {
            // @ts-ignore
            // anchor: new BMap.Size(13, 13),
            anchor: new BMap.Size(13, 39),
            // 设置图片偏移。
            // @ts-ignore
            imageOffset: new BMap.Size(0, 0), // 设置图片偏移
          }
        );

        // @ts-ignore
        var marker = new BMap.Marker(item, { icon: myIcon }); // 创建标注
      } else if (points_list.indexOf(item) === points_list.length - 1) {
        // @ts-ignore
        myIcon = new BMap.Icon(
          "assets/pages/mobile-asset-management/images/car/end_icon.png",
          // @ts-ignore
          new BMap.Size(26, 52),
          {
            // 指定定位位置。
            // @ts-ignore
            anchor: new BMap.Size(13, 39),
            // 设置图片偏移。
            // @ts-ignore
            imageOffset: new BMap.Size(0, 0), // 设置图片偏移
          }
        );
        // @ts-ignore
        marker = new BMap.Marker(item, { icon: myIcon }); // 创建标注
      } else {
        // @ts-ignore
        marker = new BMap.Marker(item); // 创建标注
      }

      map.addOverlay(marker); // 添加Overlay
    });

    // 在线上的点上加载文字标签
    points.forEach((item) => {
      // console.error("在线上的点上加载文字标签", item);
      var opts = {
        // @ts-ignore
        position: new BMap.Point(item.split(",")[0], item.split(",")[1]), // 指定文本标注所在的地理位置
        // @ts-ignore
        offset: new BMap.Size(30, -30), //设置文本偏移量
      };
      // @ts-ignore
      var label = new BMap.Label(item.split(",")[2], opts); // 创建文本标注对象
      label.setStyle({
        color: "red",
        fontSize: "12px",
        height: "20px",
        lineHeight: "20px",
        fontFamily: "微软雅黑",
      });
      map.addOverlay(label);
    });
  },
};

// 测距控件类
function RangingControl() {
  // 设置默认停靠位置和偏移量
  // @ts-ignore
  this.defaultAnchor = BMAP_ANCHOR_BOTTOM_RIGHT;
  // 设置偏移，参数1-左右，参数2-上下
  // @ts-ignore
  this.defaultOffset = new BMap.Size(10, 10);
}

// 报警控件类
function AlertControl() {
  // 设置默认停靠位置和偏移量
  // @ts-ignore
  this.defaultAnchor = BMAP_ANCHOR_BOTTOM_RIGHT;
  // 设置偏移，参数1-左右，参数2-上下
  // @ts-ignore
  this.defaultOffset = new BMap.Size(100, 10);
}

// 刷新控件类
function RefreshControl() {
  // 设置默认停靠位置和偏移量
  // @ts-ignore
  this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
  // 设置偏移，参数1-左右，参数2-上下
  // @ts-ignore
  this.defaultOffset = new BMap.Size(10, 50);
}

// 逆向地址解析
function reverse_analysis_address(pt) {
  // @ts-ignore
  // @ts-ignore
  return new Promise((resolve, reject) => {
    // @ts-ignore
    var add = new BMap.Point(pt[0], pt[1]);
    // @ts-ignore
    var geoc = new BMap.Geocoder();
    geoc.getLocation(add, function (rs) {
      var addComp = rs.addressComponents;
      var address =
        addComp.province +
        ", " +
        addComp.city +
        ", " +
        addComp.district +
        ", " +
        addComp.street +
        ", " +
        addComp.streetNumber;
      resolve(address);
    });
  });
}

// 2、导出这个模块
module.exports = mapjs;
