import { Component, OnInit, ViewChild } from "@angular/core";
import { LocalDataSource } from "@mykeels/ng2-smart-table";
import { HttpserviceService } from "../../../services/http/httpservice.service";


@Component({
  selector: "ngx-border-gateway",
  templateUrl: "./border-gateway.component.html",
  styleUrls: ["./border-gateway.component.scss"],
})
export class BorderGatewayComponent implements OnInit {
  // 加载数据
  loading = false;

  datasource: LocalDataSource;

  // 状态总览
  statusstat = {
    'total': 0,
    'online': 0,
    'offline': 0,
    'updatetime': '0000-00-00 00:00:00',
  };

  // 定时请求计时器
  reqtimer: any;

  @ViewChild('gridtable')gridtable:any;

  // table配置及数据
  tableDatas = {
    style: "width: 100%; height: 641px",
    action: false,
    totalPageNumbers: 0, // 总页数
    PageSize: 15, // 每页 10条数据
    isno_refresh_page_size: false, // 是否重新将 每页多少条数据，赋值为默认值
    columnDefs: [
      // {
      //   field: "id",
      //   headerName: "ID",
      //   resizable: true,
      //   sortable: true,
      // },
      
      // {
      //   field: "deviceid",
      //   headerName: "设备ID",
      //   width: 200,
      //   resizable: true,
      //   sortable: true,
      // },
      // {
      //   field: "devicename",
      //   headerName: "设备名称",
      //   resizable: true,
      //   sortable: true,
      // },
      {
        field: "status",
        headerName: "状态",
        resizable: true,
        sortable: true,
        width:100,
        cellStyle: function (params) {
          return params.value == '运行'?
          {
            background: "#5D920D",
          }:
          {
            background: "red",
          };
          
        },
      },
      {
        field: "edgeno",
        headerName: "边缘网关编号",
        resizable: true,
        sortable: true,
      },
      {
        field: "location",
        headerName: "存放地点",
        resizable: true,
        sortable: true,
      },
      {
        field: "groups",
        headerName: "科室",
        resizable: true,
        sortable: true,
      },
      {
        field: "belonged",
        headerName: "归属人",
        resizable: true,
        sortable: true,
      },
      {
        field: "cpu",
        headerName: "CPU占用率",
        resizable: true,
        sortable: true,
        width:150,
      },
      {
        field: "disk",
        headerName: "磁盘占用率",
        resizable: true,
        sortable: true,
        width:150,
      },
      {
        field: "virtualmemory",
        headerName: "虚拟内存占用",
        resizable: true,
        sortable: true,
        width:150,
      },
      {
        field:'swapmemory',
        headerName: "交换空间",
        resizable: true,
        sortable: true,
        width:150,
      },
      {
        field: "macaddress1",
        headerName: "物理地址1(WAN口MAC地址)",
        resizable: true,
        sortable: true,
      },
      {
        field: "macaddress2",
        headerName: "物理地址2(LAN口MAC地址)",
        resizable: true,
        sortable: true,
      },
      {
        field: "ipaddress1",
        headerName: "ip地址1(WAN口ip地址)",
        resizable: true,
        sortable: true,
      },
      {
        field: "ipaddress2",
        headerName: "ip地址2(LAN口ip地址)",
        resizable: true,
        sortable: true,
      },
      
      // {
      //   field: "nic",
      //   headerName: "网卡信息",
      //   resizable: true,
      //   sortable: true,
      // },
      // {
      //   field: "lastupdateon",
      //   headerName: "更新时间",
      //   resizable: true,
      //   sortable: true,
      // },
      
      // {
      //   field: "lastupdatedby",
      //   headerName: "更新途径",
      //   resizable: true,
      //   sortable: true,
      // },

    ],
    rowData: [
      
    ],
  };

  timer;//定时器

  constructor(private httpservice: HttpserviceService) { }

  ngOnInit(): void {
    this.getData();
    setInterval(()=>{
      this.getData();
    },120000)
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  ngAfterViewInit(){
  }

  getData(){
   
    this.httpservice.callRPC('get_edge_gateway','get_edge_gateway',{}).subscribe((f:any)=>{
      if(f.result.error || f.result.message[0].code == 0)return;
      let res = f.result.message[0];
      this.tableDatas.rowData = res.messages;
      this.statusstat = {
        'total': res.edge_total,
        'online': res.online,
        'offline': res.offline,
        'updatetime': res.update_time,
      };
      this.gridtable.init_agGrid(this.tableDatas); // 刷新组件

    })
  }

}
