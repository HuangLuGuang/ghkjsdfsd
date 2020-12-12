import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PublicmethodService } from '../../services/publicmethod/publicmethod.service';
import { UserInfoService } from '../../services/user-info/user-info.service';
import { SendToMadamComponent } from './eim-file-upload/send-to-madam/send-to-madam.component';


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
      { field: 'people', headerName: '上传人',  resizable: true, minWidth: 10},
      { field: 'time', headerName: '修改时间', resizable: true, minWidth: 10,flex: 1,},
      { field: 'upload', headerName: '发送至MaDaM',  resizable: true, width: 100, pinned: 'right', cellRendererFramework:SendToMadamComponent},
    ],
    rowData: [ // data
    ]
  };

  private gridData = [];

  // 上传文件
  fileList = []; //  设置已上传的内容
  nzFileType = "file,image"; // 接受上传文件的类型 image/gif  image是文件夹
  nzShowUploadList = true; // 是否展示UploadList false：不展示
  nzDirectory = false; // 支持上传文件夹
  // uploadUrl = "http://192.168.8.105/api/v1/upload"; // 上传的地址！
  uploadUrl = "http://localhost:5000/api/v1/upload"; // 上传的地址！


  constructor(private userinfo: UserInfoService, private publicservice: PublicmethodService,
    private datepipe: DatePipe  
  ) { 
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
    const file = filedata.file;
    if (filedata.file.status === 'done'){
      console.warn("上传成功",filedata);
      var event = {
        filename:file.name,
        filesize:this.transfrom_file_size(file.size),
        // filesize:file.size,
        // time:file.lastModified,
        time: this.datepipe.transform(file.lastModified, 'yyy-MM-dd HH:mm:ss'),
        people: this.userinfo.getLoginName(),
        upload: "XXX"
      }
      console.log("--->",event)
      this.update_agGrid(event);
    }
  }

  ngAfterViewInit(){
    // 初始化table
    setTimeout(() => {
      this.inttable();
    }, 1000);
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

  // 初始化table
  inttable(event?){
    console.log("---初始化文件传输table");
    var message = [{filename: "xxx.png", filesize: 45, time: 1234,upload:"upload"}]
    this.gridData.push(...message);
    this.tableDatas.rowData = this.gridData;
    this.tableDatas.totalPageNumbers = 30;
    this.agGrid.init_agGrid(this.tableDatas); // 告诉组件刷新！
  }

  // 更新table
  update_agGrid(event?){
    // event 是列数据
    if (event != undefined){
      this.gridData.push(...[event]);
      this.tableDatas.rowData = this.gridData;
      this.tableDatas.totalPageNumbers = this.gridData.length;
      this.agGrid.update_agGrid(this.tableDatas); // 告诉组件刷新！
    }
  }




  // nzpageindexchange 页码改变的回调
  nzpageindexchange_ag(event){
    // console.log("-------event",event)
    this.gridData = [];
    this.loading = true;
    this.inttable(event);
    this.loading = false;
  }

  // 添加每一列
  add_detail_kpi(datas:any[]){
    var option = '/pages/tongji/deviceKpiReport/kpidetail';
    datas.forEach(data=>{
      data["option"] =  option
    })
    
  }

  // 将文件大小 字节 转换为 kb MB GB
  transfrom_file_size(filesize:number){
    if (filesize<1024*1000){
      // kb
      return Math.ceil(filesize/1024) + "Kb"
    }else if (1024*1000 < filesize && filesize < 1024*1000*1000){
      // MB
      return Math.ceil(filesize/(1024*1000)) + "MB"
    }else{
      // GB
      return  Math.ceil(filesize/(1024*1000*1000)) + "GB"
    }
  }



}
