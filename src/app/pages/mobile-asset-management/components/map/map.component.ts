import { Component, OnInit, Input } from '@angular/core';

// 初始map中的point
import { map_init_point } from '../../../../appconfig';

let mapjs = require('../../../../../assets/pages/mobile-asset-management/js/my_map');

@Component({
  selector: 'ngx-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  // 模拟离线
  noinlinedatas_list = [
    {
      name: '在线',
      device_info:[
        { title: "在线 11", lng_lat: [121.3229006600, 30.3333025500], info: "在线 11", updatatime:"2020-07-11 17:56:46(online)", positiontiome: "2020-07-06 09:56:46", positiontype: "卫星定位", deviceno:"9527"},
        { title: "在线 12", lng_lat: [121.3226006600, 30.3333025500], info: "在线 12", updatatime:"2020-08-11 17:56:46", positiontiome: "2020-08-06 09:02:46", positiontype: "卫星定位", deviceno:"9537"},
        { title: "在线 13", lng_lat: [121.3223006600, 30.3333025500], info: "在线 13", updatatime:"2020-07-13 19:56:46(online)", positiontiome: "2020-07-08 15:44:46", positiontype: "卫星定位", deviceno:"9547"},
      ],
      children: ['在线 11', '在线 12', '在线 13'],
    },
    {
      name: '离线',
      device_info:[
        { title: "离线 21", lng_lat: [121.3229007700, 30.3322026400], info: "离线 21", updatatime:"2020-07-11 17:56:46(online)", positiontiome: "2020-07-06 09:56:46", positiontype: "卫星定位", deviceno:"9527"},
        { title: "离线 22", lng_lat: [121.3226007700, 30.3322026400], info: "离线 22", updatatime:"2020-08-11 17:56:46", positiontiome: "2020-08-06 09:02:46", positiontype: "卫星定位", deviceno:"9537"},
        { title: "离线 23", lng_lat: [121.3220007700, 30.3322026400], info: "离线 23", updatatime:"2020-07-01 22:35:46", positiontiome: "2020-06-26 19:32:46", positiontype: "卫星定位", deviceno:"9557"},
      ],
      children: ['离线 21', '离线 22', '离线 23'],
    },
    {
      name: '其它',
      device_info:[
        { title: "其它 31", lng_lat: [121.3229009900, 30.3302027700], info: "其它 31", updatatime:"2020-07-11 17:56:46(online)", positiontiome: "2020-07-06 09:56:46", positiontype: "卫星定位", deviceno:"9527"},
        { title: "其它 32", lng_lat: [121.3226009900, 30.3302033400], info: "其它 32", updatatime:"2020-08-11 17:56:46", positiontiome: "2020-08-06 09:02:46", positiontype: "卫星定位", deviceno:"9537"},
        { title: "其它 33", lng_lat: [121.3220009900, 30.3302066400], info: "其它 33", updatatime:"2020-07-01 22:35:46", positiontiome: "2020-06-26 19:32:46", positiontype: "卫星定位", deviceno:"9557"},
      ],
      children: ['其它 31', '其它 32', '其它 33'],
  }]
  

  constructor() { }

  ngOnInit(): void {
    // 初始化地图
    mapjs.initmap("map_map", map_init_point);

    // 初始化离线的设备！
    // mapjs.initnoinline(this.noinlinedatas)
    mapjs.initnoinline(this.noinlinedatas_list[1]);
    
    // 初始化在线的设备
    mapjs.initinline(this.noinlinedatas_list[0]);
    
    // 初始化其它的设备
    mapjs.initother(this.noinlinedatas_list[2]);

    // 添加地图控件=地图类型+ 缩放图控件
    mapjs.addmapCtrlType();

    // 添加测距
    mapjs.ranging();

    // 添加报警控件
    mapjs.alert();

    // 点击获取点击的经纬度
    // mapjs.hitgit_lng_lat()



    
  };

  // 父组件执行，告诉该组件，需要在map上展示设备详情！
  show_info_in_map(info){
    // 创建图标，设备信息
    // 创建图标，设备信息
    
    for (let index = 0; index < info.listitem.children.length; index++) {
      var user_deviceInfo_ ={
        it: '',
        listitem: {
          title: '',
          lng_lat: [],
          info: ''
        },
      };
      const childrenitem = info.listitem.children[index];
      if (childrenitem == info.it){
        var device_info_item = info.listitem.device_info[index];
        user_deviceInfo_.it = info.it;
        user_deviceInfo_.listitem = device_info_item;
        mapjs.device_info(user_deviceInfo_)

      }
    }
  };

}
