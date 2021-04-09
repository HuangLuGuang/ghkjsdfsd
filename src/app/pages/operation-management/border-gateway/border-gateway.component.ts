import { Component, OnInit, ViewChild } from "@angular/core";
import { LocalDataSource } from "@mykeels/ng2-smart-table";
import { NbDialogService } from "@nebular/theme";
import { HttpserviceService } from "../../../services/http/httpservice.service";
import { PublicmethodService } from "../../../services/publicmethod/publicmethod.service";
import { UserInfoService } from "../../../services/user-info/user-info.service";
import { ActionComponent } from "./action/action.component";
import { BorderGetewayDialogEditComponent } from "./border-geteway-dialog-edit/border-geteway-dialog-edit.component";
import { BorderGetewayDialogComponent } from "./border-geteway-dialog/border-geteway-dialog.component";
import { BottomType } from "./border-getway";


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
  tableDatas:any = {
    style: "width: 100%; height: 561px",
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
        field: "edgeno",
        headerName: "边缘网关编号",
        resizable: true,
        sortable: true,
        headerCheckboxSelection: true,
        checkboxSelection: true,
        autoHeight: true,
        fullWidth: true,
        minWidth: 50,
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
        field: "cpu",
        headerName: "CPU占用率",
        resizable: true,
        sortable: true,
        width:150,
      },
      // {
      //   field: "status",
      //   headerName: "状态",
      //   resizable: true,
      //   sortable: true,
      //   width:100,
      //   cellStyle: function (params) {
      //     return params.value == '运行'?
      //     {
      //       background: "#5D920D",
      //     }:
      //     {
      //       background: "red",
      //     };
          
      //   },
      // },
      {
        field: "createdon",
        headerName: "最后心跳时间",
        resizable: true,
        sortable: true,
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
        field: "belonged",
        headerName: "归属人",
        resizable: true,
        sortable: true,
      },
      {
        field:'swapmemory',
        headerName: "交换空间",
        resizable: true,
        sortable: true,
        width:150,
      },
      { 
        headerName: '操作',
        field: 'name',
        pinned: 'right',
        width:150,
        lockPinned:true,
        cellRendererFramework: ActionComponent,
        cellRendererParams: {
          clicked:  (data: any)=> {
           this.clickrow(data);
          },
        },
       }
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
    rowData: [``
    ],
  };

  button:any;
  timer;//定时器
  constructor(private httpservice: HttpserviceService,
    private dialogService: NbDialogService,
    private userinfo: UserInfoService,
    private publicservice:PublicmethodService
    ) { }

  ngOnInit(): void {
    this.getData('init');
    setInterval(()=>{
      this.getData();
    },120000)

    // 得到pathname --在得到button
    var roleid = this.userinfo.getEmployeeRoleID();
    this.publicservice.get_buttons_bypath(roleid).subscribe((result) => {
      this.button = result;
      localStorage.setItem("buttons_list", JSON.stringify(result));
    });

  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  ngAfterViewInit(){
    setTimeout(() => {
      this.RecordOperation('查询',1,'边缘网关管理');
    }, 10);
  }

  getData(status?:string){
   
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
      if(status == 'init'){
        this.gridtable.init_agGrid(this.tableDatas); // 刷新组件
      }else{
        this.gridtable.update_agGrid(this.tableDatas); // 刷新组件
      }

    })
  }

  clickrow(e){
    if(e.data){
      let title,content,type,component;
      switch(e.active){
        case BottomType.DEL:
          title = '删除';
          content = JSON.stringify({id:e.data[0].id,msg:'是否删除该条数据？'});
          type = BottomType.DEL;
          component = BorderGetewayDialogComponent;
        break;
        case BottomType.EDIT:
          title = '修改';
          content = JSON.stringify(e.data[0]);
          type = BottomType.EDIT;
          component = BorderGetewayDialogEditComponent;
        break;
      }
      this.dialog_open(title,content,type,component);
    }

  }

  action(actionmethod:string){
    let title,content,type,component,rowdata;
    var method = actionmethod.split(":")[1];
    switch (method) {
      case "add":
        title = '新增';
        content = '{}';
        type = BottomType.ADD;
        component = BorderGetewayDialogEditComponent;
        break;
      case "del":
        [title,content,type,component] = this.del();
        break;
      case "edit":
        [title,content,type,component] = this.edit();
        break;
    }
    this.dialog_open(title,content,type,component);
  }

  /**
   * 删除
   */
  del(){
    let title ='提示',content,type = BottomType.DEL,component,rowdata;
    
    rowdata = this.gridtable.getselectedrows() || [];
    if(rowdata.length == 0){
      content = JSON.stringify({id:'',msg:'请选择一条数据！'});
    }else if(rowdata.length == 1){
      title = '删除'
      content = JSON.stringify({id:rowdata[0].id,msg:'是否删除该条数据？'});
    }else if(rowdata.length > 1){
      content = JSON.stringify({id:'',msg:'删除最多只能选择一条数据！'});
    }
    component = BorderGetewayDialogComponent;
    return [title,content,type,component];
  }

  /**
   * 修改
   */
  edit(){
    let title ='提示',content,type = BottomType.EDIT,component,rowdata;
    
    rowdata = this.gridtable.getselectedrows() || [];
    if(rowdata.length == 0){
      content = JSON.stringify({id:'',msg:'请选择一条数据！'});
      component = BorderGetewayDialogComponent;
    }else if(rowdata.length == 1){
      title = '修改';
      content = JSON.stringify(rowdata[0]);
      component = BorderGetewayDialogEditComponent;
    }else if(rowdata.length > 1){
      content = JSON.stringify({id:'',msg:'修改最多只能选择一条数据！'});
      component = BorderGetewayDialogComponent;
    }
    return [title,content,type,component];
  }


  /**
   * 打开弹窗
   * @param title 标题
   * @param content json字符串
   * @param type 状态
   * @param component 弹窗组件
   */
  dialog_open(title,content,type,component){
    this.dialogService
        .open(component, {
          closeOnBackdropClick: false,
          autoFocus: true,
          context: { title: title, content: content,type:type },
        })
        .onClose.subscribe((res) => {
          if(res && res.code == 1){
            this.getData();
            this.publicservice.showngxtoastr({
              position: "toast-top-right",
              status: "success",
              conent: res.conent,
            });
            this.RecordOperation(
              res.conent && res.conent.slice(0, 2),1,'边缘网关管理');
            }
        });
  }


  // option_record
  RecordOperation(option, result, infodata) {
    if (this.userinfo.getLoginName()) {
      var employeeid = this.userinfo.getEmployeeID();
      var result = result; // 1:成功 0 失败
      var transactiontype = option; // '新增用户';
      var info = infodata;
      var createdby = this.userinfo.getLoginName();
      this.publicservice.option_record(
        employeeid,
        result,
        transactiontype,
        info,
        createdby
      );
    }
  }

}
