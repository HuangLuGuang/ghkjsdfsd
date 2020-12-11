import { Component, OnInit, ViewChild } from '@angular/core';
import { PublicmethodService } from '../../services/publicmethod/publicmethod.service';
import { UserInfoService } from '../../services/user-info/user-info.service';

@Component({
  selector: 'ngx-eim-file-upload',
  templateUrl: './eim-file-upload.component.html',
  styleUrls: ['./eim-file-upload.component.scss']
})
export class EimFileUploadComponent implements OnInit {
  @ViewChild("ag_Grid") agGrid: any;

  loading = false;  // 加载
  refresh = false; // 刷新tabel
  button; // 权限button

  tableDatas = {
    totalPageNumbers: 0, // 总页数
    PageSize: 10, // 每页 10条数据
    isno_refresh_page_size: false, // 是否重新将 每页多少条数据，赋值为默认值
    columnDefs:[ // 列字段 多选：headerCheckboxSelection checkboxSelection , flex: 1 自动填充宽度  pinned: 'left' 固定在左侧！
      { field: 'filename', headerName: '文件名称', headerCheckboxSelection: true, checkboxSelection: true, autoHeight: true, fullWidth: true, minWidth: 50,resizable: true,},
      { field: 'filesize', headerName: '文件大小',  resizable: true, minWidth: 10},
      { field: 'time', headerName: '修改时间', resizable: true, minWidth: 10,flex: 1,},
      { field: 'upload', headerName: '发送至MaDaM',  resizable: true, width: 100, pinned: 'right'},
    ],
    rowData: [ // data
    ]
  };

  private gridData = [];

  // 上传文件
  fileList = []; //  设置已上传的内容
  nzFileType = "all"; // 接受上传文件的类型
  nzShowUploadList = true; // 是否展示UploadList false：不展示

  constructor(private userinfo: UserInfoService, private publicservice: PublicmethodService) { 
    // 会话过期
    localStorage.removeItem("alert401flag");
    // 得到该页面下的button
    var roleid = this.userinfo.getEmployeeRoleID();
    this.publicservice.get_buttons_bypath(roleid).subscribe(result=>{
      this.button = result;
      localStorage.setItem("buttons_list", JSON.stringify(result));
    })

  }

  ngOnInit(): void {
  }

  action(actionmethod){
    var method = actionmethod.split(":")[1];
    switch (method) {
      // case 'add':
      //   this.addrole();
      //   break;
      // case 'del':
      //   this.remove();
      //   break;
      // case 'edit':
      //   this.editrole();
      //   break;
      // case 'query':
      //   this.query();
      //   break;
      case 'import':
        this.import();
        break;
      // case 'download':
      //   this.download('角色管理')
      //   break;
    }

  }

  // 这是上传到 eim服务器上
  import(){
    console.log("这是上传到 eim服务器上")
  }

  // 上传文件时改变状态
  uploadStatus(filedata){
    console.warn(filedata);
  }

  ngAfterViewInit(){
    // 初始化table
    this.inttable();
    this.loading = false;
  }

  // 重置、刷新
  refresh_table(){
    this.refresh = true;
    this.loading = true;
    this.gridData = [];
    // 是否 每页多少也，设置为默认值
    this.tableDatas.isno_refresh_page_size = true;

    // 取消选择的数据 delselect
    // this.myinput.del_input_value();
    // this.groups_func.dropselect();
    // this.eimdevicetpye.dropselect();

    this.inttable();
    this.loading = false;
    this.refresh = false;

  }

  inttable(event?){
    console.log("---初始化文件传输table");
    this.gridData.push();
    this.tableDatas.rowData = this.gridData;
    this.tableDatas.totalPageNumbers = 30;
    this.agGrid.init_agGrid(this.tableDatas); // 告诉组件刷新！
  }




  // nzpageindexchange 页码改变的回调
  nzpageindexchange_ag(event){
    // console.log("-------event",event)
    this.gridData = [];
    this.loading = true;
    this.inttable(event);
    this.loading = false;
  }



}
