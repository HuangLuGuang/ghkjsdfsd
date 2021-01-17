import { Component, OnInit, ViewChild } from '@angular/core';



import { DeviceManageComponent as Add_Edit_DeviceManageComponent } from '../../../pages-popups/tongji/device-manage/device-manage.component';
import { EditDelTooltipComponent } from '../../../pages-popups/prompt-diallog/edit-del-tooltip/edit-del-tooltip.component';

declare let $;

import * as XLSX from 'xlsx';
type AOA = any[][];

import { PublicmethodService } from '../../../services/publicmethod/publicmethod.service';
import { NbDialogService } from '@nebular/theme';
import { HttpserviceService } from '../../../services/http/httpservice.service';
import { Observable } from 'rxjs';


// 引入 eim台账 表单的验证
import { Device } from '../../../pages-popups/tongji/form_verification';
import { UserInfoService } from '../../../services/user-info/user-info.service';
import { ActionComponent } from './action/action.component';
import { TranActiveComponent } from './tran-active/tran-active.component';
import { StatusForTableComponent } from './status-for-table/status-for-table.component';
import { TableGroupComponent } from '../components/table-group/table-group.component';
import { TableDevicenameComponent } from '../components/table-devicename/table-devicename.component';
import { TranIscalkpiComponent } from './tran-iscalkpi/tran-iscalkpi.component';
@Component({
  selector: 'ngx-device-manage',
  templateUrl: './device-manage.component.html',
  styleUrls: ['./device-manage.component.scss']
})
export class DeviceManageComponent implements OnInit {

  @ViewChild("groups") groups_func:any;
  @ViewChild("eimdevicetpye") eimdevicetpye:any;
  @ViewChild("myinput") myinput:any;
  @ViewChild("ag_Grid") agGrid:any;

  constructor(private publicservice: PublicmethodService, private dialogService: NbDialogService, private http: HttpserviceService, private userinfo: UserInfoService) { 
    // 初始化 科室/功能组(groups)，eim设备类型(eimdevicetpyedata)  dev_get_device_groups
    
    // 会话过期
    localStorage.removeItem("alert401flag");
    
    this.get_tree_selecetdata();

  }


  importdata: AOA = [[1,2], [3,4]];

  // 导出文件名
  filename;

  // groups_placeholder eimdevicetpye_placeholder
  groups_placeholder = "请选择科室/功能组";
  eimdevicetpye_placeholder = "请选择设备类别";
  myinput_placeholder = "请输入设备名称";

  loading = false;  // 加载
  refresh = false; // 刷新tabel

  // 每一页展示多少条数据
  nzPageSize;

  // plv8请求
  querst(table: string, method: string, colmun: Object){
    return new Observable((observe)=>{
      this.http.callRPC(table, method, colmun).subscribe((result)=>{
        observe.next(result);
      })

    })
  }

  button; // 权限button
  active;  // aggrid 操作


  ngOnInit(): void {
    // agGrid
    var that = this;
    this.active = { field: 'action', headerName: '操作', cellRendererFramework: ActionComponent, pinned: 'right',resizable: true,flex: 1,width:100,
      cellRendererParams: {
        clicked: function(data: any) {
          if (data["active"]==='edit'){
            that.edit([data["data"]]);
          }else{
            that.del([data["data"]]);
          }
        }
      },
    }

    // 得到pathname --在得到button
    var roleid = this.userinfo.getEmployeeRoleID();
    this.publicservice.get_buttons_bypath(roleid).subscribe(result=>{
      this.button = result;
      localStorage.setItem("buttons_list", JSON.stringify(result));
    })


    // ======= 使用 NbDialog 切换标签时，无法再次弹出问题！
    if (document.getElementsByClassName('cdk-overlay-container').length < 1){
      var dom = document.createElement("div");
      dom.className = "cdk-overlay-container"
      document.getElementsByTagName("nb-layout")[0].appendChild(dom)
    }




    // ===============agGrid

    // this.inttable();
    // ===============agGrid
  }

  ngAfterViewInit(){
    this.tableDatas.columnDefs.push(
      this.active
    );
    this.inttable();

  }

  ngOnDestroy(){
    localStorage.removeItem("device_manage_agGrid");
  }


  // button按钮
  action(actionmethod){
    var method = actionmethod.split(":")[1];
    switch (method) {
      case 'add':
        this.add();
        break;
      case 'del':
        this.del();
        break;
      case 'edit':
        this.edit();
        break;
      case 'query':
        this.query();
        break;
      case 'import':
        this.importfile();
        break;
      case 'download':
        this.download('eim台账')
        break;
    }

  }

  // button add
  add(){
    this.dialogService.open(Add_Edit_DeviceManageComponent, { closeOnBackdropClick: false,context: { title: '添加设备', content:  'false'}} ).onClose.subscribe(name=>{
      if (name){
        this.gridData = [];
        this.loading = true;
        this.update_agGrid();
        this.loading = false;
      }
    })
  }

  // button del  -- dev_delete_device
  del(active_data?){
    // var rowdata = this.agGrid.getselectedrows();
    
    
    var rowdata;
    if (active_data){
      rowdata = active_data;
    }else{
      rowdata = this.agGrid.getselectedrows();
    };
    // console.log("删除-eim台账  rowdata", rowdata);
    var rowdata_ = this.option_table_before(rowdata);
    // console.log("删除-eim台账  rowdata_", rowdata_);

    if (rowdata_.length === 0){
      // 未选中
      this.dialogService.open(EditDelTooltipComponent, { closeOnBackdropClick: false, context: { title: '删除设备提示', content:   `请选择要需要删除的的行数！`}} ).onClose.subscribe(
        name=>{
          console.log("----name-----", name);
        }
      );

    }else{
      // 选中多条 dev_delete_device_list
      var rowData = rowdata_;
      var text = rowdata_.length > 1 ? "这些": "这条";
      this.dialogService.open(EditDelTooltipComponent, { closeOnBackdropClick: false,context: { title: '提示', content:   `确定要删除${text}数据吗？`, rowData: JSON.stringify(rowdata)} } ).onClose.subscribe(istrue=>{
        if (istrue){
          try {
            var data_info;
            var id_list = [];
            rowData.forEach(item => {
              id_list.push(item["devicename"])
            });
            var id_str = id_list.join(',');
            data_info  = '设备名称(devicename):' + id_str;
            // console.log("要删除的数据:", rowdata)

            var table = 'device';
            var method = 'dev_delete_device_list';
            this.http.callRPC(table, method, rowData).subscribe((result)=>{
              const status = result['result']['message'][0];
              switch (status["code"]) {
                case 1:
                  this.RecordOperation("删除(eim台账)", 1, data_info);
                  this.delsuccess();
                  this.gridData = [];
                  this.loading = true;
                  this.update_agGrid();
                  this.loading = false;
                  break;
              
                default:
                  var err_date = "error:" + status["message"]
                  this.RecordOperation("删除(eim台账)", 0, String(err_date))
                  this.deldanger();
                  break;
              }
              throw 'error, 删除失败！'
            })
          }catch(err){
            this.deldanger()
          }
        }else{}
      })

      

    }
  }
  
  
  // button deit
  edit(active_data?){
    // var rowdata = this.agGrid.getselectedrows();
    
    var rowdata;
    if (active_data){
      rowdata = active_data;
    }else{
      rowdata = this.agGrid.getselectedrows();
    };
    var rowdata_ = this.option_table_before(rowdata)
    // console.log("编辑-eim台账----agGrid-----rowdata",rowdata);
    if (rowdata.length === 0){
      // 未选中
      this.dialogService.open(EditDelTooltipComponent, { context: { title: '编辑设备提示', content:   `请选择要需要编辑的的行数！`}} ).onClose.subscribe(
        name=>{
          console.log("----name-----", name);
        }
        );
        
      }else if (rowdata.length === 1){
        // 选中一条
        // console.log("选中一条", rowdata);
        // console.log("编辑-eim台账----agGrid-----rowdata----处理后的",rowdata_);
      this.dialogService.open(Add_Edit_DeviceManageComponent, { closeOnBackdropClick: false, context: { title: '编辑设备提示', content:   `true`, rowData: JSON.stringify(rowdata_)}} ).onClose.subscribe(
        name=>{
          console.log("----name-----", name);
          if (name){
            this.gridData = [];
            this.loading = true;
            this.update_agGrid();
            this.loading = false;
          }
        }
      );
    }else{
      // 选中多条
      this.dialogService.open(EditDelTooltipComponent, { context: { title: '编辑设备提示', content:   `请选择要一条需要编辑的的行数！`}} ).onClose.subscribe(
        name=>{
          console.log("----name-----", name);
        }
      );
    }
  }

  refresh_table(){
    this.refresh = true;
    this.loading = true;
    this.gridData = [];
    // 是否 每页多少也，设置为默认值
    this.tableDatas.isno_refresh_page_size = true;

    // 取消选择的数据 delselect
    this.myinput.del_input_value();
    this.groups_func.dropselect();
    this.eimdevicetpye.dropselect();

    this.inttable();
    this.refresh = false;



    
  }

  // 得到下拉框的数据
  get_tree_selecetdata(){
    var columns = {
      employeeid:this.userinfo.getEmployeeID(),
    }
    this.http.callRPC("deveice","dev_get_device_groups",columns).subscribe(result=>{
      var res = result["result"]["message"][0]
      // console.log("得到下拉框的数据---------------->", res)
      if (res["code"] === 1){
        var groups = res["message"][0]["groups"];
       
        this.groups_func.init_select_tree(groups);
        var eimdevicetpyedata = res["message"][0]["type"];
        this.eimdevicetpye.init_select_trees(eimdevicetpyedata);
      }
    })
  }


  // 导入文件
  importfile(){
    var input = document.getElementById("import");
    // js执行点击input
    input.click();
  }

  // input 传入的值
  inpuvalue(inpuvalue){
    if (inpuvalue != ""){
      console.log("传入的值设备名称----->",inpuvalue);
      this.query(inpuvalue);
    }
  }
  // 搜索按钮
  query(inpuvalue?){
    var devicename;
    if (inpuvalue){
      devicename = inpuvalue;
    }else{
      devicename = this.myinput?.getinput();// 设备名称
    }
    // var devicename = this.myinput?.getinput();// 设备名称
    // console.log("设备名称----->",devicename)
    var groups = this.groups_func?.getselect();// 科室/功能组
    var eimdevicetype = this.eimdevicetpye?.getselect()?this.eimdevicetpye?.getselect():[]; // eim设备类型
    var grops_data = groups != ""? groups.split(";"): [];
    if (devicename == "" && eimdevicetype.length < 1 && grops_data.length < 1){
      // 未选中
      this.dialogService.open(EditDelTooltipComponent, { closeOnBackdropClick: false, context: { title: '提示', content:   `请选择要搜索的数据！`}} ).onClose.subscribe(
        name=>{
          // console.log("----name-----", name);
        }
      );
    }else{
      var columns = {
        offset: 0, 
        limit: this.agGrid.get_pagesize(),
        employeeid: this.userinfo.getEmployeeID(),
        devicename: [devicename],
        group: grops_data,          // 科室/功能组，可选
        eimdevicetype: eimdevicetype, // 设备类型，可选
      }
      // console.log("搜索------------>",columns);
      // dev_get_device_search 搜索的
      this.http.callRPC('device', 'dev_get_device_search', columns).subscribe((result)=>{
        var tabledata = result['result']['message'][0]
        // console.log("dev_get_device---------------------------->>>", tabledata);
        this.loading = false;
        if (tabledata["code"]===1){
          var message = result["result"]["message"][0]["message"];
          var after_datas = this.show_table_before(message);
          this.gridData = [];
          this.gridData.push(...after_datas);
          this.tableDatas.rowData = this.gridData;
          var totalpagenumbers = tabledata['numbers']? tabledata['numbers'][0]['numbers']: '未得到总条数';
          this.tableDatas.totalPageNumbers = totalpagenumbers;
          this.agGrid.update_agGrid(this.tableDatas); // 告诉组件刷新！
          this.RecordOperation('搜索', 1,  "eim台账");
          if (message.length < 1){
            this.searchdanger();
          }
        }else{this.RecordOperation('搜索', 0,  "eim台账")}
      })
    }
  }
  // 监听回车，得到输入框中值，然后搜索，

  // 导出文件
  download(title){
    this.agGrid.download(title);
  };

  // ----------------------------导入---------------------------
  onFileChange(evt: any){
    const target: DataTransfer = <DataTransfer>(evt.target);
    // console.log("导入：---------------------------", target);
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.importdata = <AOA>(XLSX.utils.sheet_to_json(ws, {header: 1}));
      // console.log("importdata: ", this.importdata); // 这是读取的数据转为json

      this.analysis_sheet_to_json_to_ng2(this.importdata)
    };
    reader.readAsBinaryString(target.files[0]);

  }

  // 将sheet_json转换为smart-table 数据格式！ 
  analysis_sheet_to_json_to_ng2(importdata){
    // console.log("这是导入的Excel的原始数据！", importdata, "\n")
    var rowData_list = importdata.slice(1,importdata.length);
    var excel_title = importdata.slice(0,1)[0];
    // console.log("rowData_list----excel 除了表头的数据>", rowData_list)
    // console.log("excel_title---- excel的表头>", excel_title)
    var ag_Grid_columns = this.tableDatas.columnDefs.slice(0, excel_title.length);
    // console.log("ag_Grid_columns--------->ag_Grid_columns 的表头", ag_Grid_columns, "\n")

    var agGridTitle = [];
    var noexist_title = [];
    for (let index = 0; index < ag_Grid_columns.length; index++) {
      const agitem = ag_Grid_columns[index];
      const exitem = excel_title[index];

      if (agitem.headerName === exitem){
        agGridTitle.push(agitem.field);
      }else{
        // console.log("字段不一致", "agTitle != exetitle", agitem.headerName, '!=', exitem);
        noexist_title.push(agitem.headerName)
      }
    }

    if (noexist_title.length >0 ){
      this.importdanger(noexist_title);
    }else{
      var rowData = []; // rowData 就是table需要的source
      rowData_list.forEach(element => {  // rowData_list excel 除了第一列字段，其它的数据！
        var item = {};
        if(element.length != 0){
          for (let index = 0; index < element.length; index++) {
            item[agGridTitle[index]] = element[index];  
          }
          rowData.push(item);
        }
      });
  
      var verify_err = [];
      var verify_after = this.verify_rowdatas(rowData, verify_err);  // 验证后的数据 得到的是验证的 错误信息！
      if (verify_after.length > 0){
        this.verify_import(verify_after);
        this.RecordOperation("导入(eim台账)", 0,'导入excel表');

      }else{
        // 插入数据库之前 处理数据
        var datas = this.option_table_before(rowData)
        // console.log("插入数据库之前 处理数据---->", datas);
        // 将导入的数据存入数据库
        this.dev_insert_device(datas).subscribe(result=>{
          if (result){
            // 将导入的数据展示在table中
            // var after_datas = this.show_table_before(rowData)
            this.gridData = [];
            this.loading = true;
            this.update_agGrid();// 告诉组件刷新！
            this.loading = false;
            this.RecordOperation("导入(eim台账)", 1,'导入excel表');
          }
        });
    

      }
    }



  }

 
  // ----------------------------导入---------------------------



  // 将导入的数据插入到数据库中
  dev_insert_device(datas){
    return new Observable((observale)=>{
      const table = "device";
      const method = 'dev_insert_device_list';
      try {
        this.http.callRPC(table, method, datas).subscribe((result)=>{
          // console.log("插入设备数据：", result)
          const status = result['result']['message'][0]["code"];
          if (status === 1){
            this.RecordOperation("导入", 1, "eim台账");
            this.success()
            observale.next(true)
          }else{
              var data_info = result['result']["message"][0]["message"];
              // console.log("------------------->",data_info)
              this.RecordOperation("导入", 0, String(data_info));
              this.importSuccess(result['result']["message"][0]["message"])
              observale.next(false)
            throw 'error, 删除失败！'
          }
        })
        
        this.loading = false
        
      }catch(err){
        this.RecordOperation("导入", 0, String(err));
        observale.next(false)
        this.danger()
      }
    })
  }

  // 在展示表格前，处理一下数据
  show_table_before(datas){
    // console.log("在展示表格前，处理一下数据",datas)
    if (datas.length >0){
      var after_datas: DeviceData[] =[];
      var type;
      var devicetype;
      datas.forEach(data => {
        switch (data["type"]) {
          case 1:
            type = "台架设备";
            break;
            case 2:
              type = "移动资产";
              break;
            case 3:
              type = "举升机";
            break;
            case 402:
              type = "其它设备";
            break;
        };
        switch (data["devicetype"]) {
          case 1:
            devicetype = "性能";
            break;
          case 2:
            devicetype = "耐久";
            break;
          case 3:
            devicetype = "其它";
            break;

        }
        var after_data: DeviceData = {
          id: data.id,
          deviceno:data.deviceno,
          devicename:data.devicename,
          type:type,
          deviceid:data.deviceid,
          active:data.active,
          location:data.location,
          group:data.group,
          belonged:data.belonged,
          supplier:data.supplier,
          linklevel:data.linklevel,
          devicetype:devicetype,
          createdon:data.createdon,
          createdby:data.createdby,
          lastupdateon: data.lastupdateon,
          lastupdatedby: data.lastupdatedby,
          groupsid: data.groupsid,
          iscalkpi: data.iscalkpi
        }
        after_datas.push(after_data)
      });
      // console.log("在展示表格前，处理一下数据after_datas",after_datas)
      return after_datas

    }
    
    
    return datas
  };


  // 编辑修改前，处理一下选中的table数据
  option_table_before(datas){
    // console.log("编辑修改前，处理一下选中的table数据---------------",datas)
    var after_datas: OptionDeviceData[] =[];
    var type;
    var devicetype;
    datas.forEach(data => {
      switch (data["type"]) {
        case "台架设备":
          type = 1;
          break;
          case "移动资产":
            type = 2;
            break;
          case "举升机":
            type = 3;
          break;
          default:
            type = 402;
          break;
      };
      switch (data["devicetype"]) {
        case "性能":
          devicetype = 1;
          break;
        case "耐久":
          devicetype = 2;
          break;
        case "其它":
          devicetype = 3;
          break;

      }

      var after_data: OptionDeviceData = {
        id:data.id,
        deviceno:data.deviceno,
        devicename:data.devicename,
        type:type,
        deviceid:String(data.deviceid),
        active:data.active=== '是'||data.active === 1? 1:0,// 
        location:data.location,
        group:data.group,
        belonged:data.belonged,
        supplier:data.supplier,
        linklevel:data.linklevel,
        devicetype:devicetype,
        createdon:data.createdon,
        createdby:data.createdby,
        lastupdateon:data.lastupdateon,
        lastupdatedby:data.lastupdatedby,
        
        groupsid:data.groupsid,
        iscalkpi:data.iscalkpi=== '是'||data.iscalkpi === 1? 1:0,// 
        year: new Date().getFullYear(),
      }
      after_datas.push(after_data)
    });
    return after_datas
  }

  // 验证每一行数据！ 验证excel导入的数据！
  verify_rowdatas(rowDatas, verify_err){
    rowDatas.forEach(rowdata => {

      var active = rowdata["active"];
      var type = rowdata["type"];
      var belonged = rowdata["belonged"];
      

      // var createdon = rowdata["createdon"];

      var deviceid = rowdata["deviceid"];
      var devicename = rowdata["devicename"];
      var deviceno = rowdata["deviceno"];
      var group = rowdata["group"];
      var location = rowdata["location"];
      var supplier = rowdata["supplier"];
      var type = rowdata["type"];
      var linklevel = rowdata["linklevel"];
      var devicetype = rowdata["devicetype"];
      var createdby = rowdata["createdby"];
      var lastupdatedby = rowdata["lastupdatedby"];

 
      // 验证！ deviceno
      var verify_deviceno = this.verify_deviceno(deviceno);
      if (verify_deviceno != 1){
        verify_err.push({err: verify_deviceno})
      }

      // 验证！ devicename
      var verify_devicename = this.verify_devicename(devicename);
      if (verify_devicename != 1){
        verify_err.push({err: verify_devicename})
      }

      // 验证！ type
      var verify_type = this.verify_type(type);
      if (verify_type != 1){
        verify_err.push({err: verify_type})
      }
      
      // 验证！deviceid
      var verify_deviceid = this.verify_deviceid(deviceid);
      if (verify_deviceid != 1){
        verify_err.push({err: verify_deviceid})
      }

      // 验证！ location
      var verify_location = this.verify_location(location);
      if (verify_location != 1){
        verify_err.push({err: verify_location})
      }

      // 验证！ groups 改为group
      var verify_group = this.verify_group(group);
      if (verify_group != 1){
        verify_err.push({err: verify_group})
      }

      // 验证！ belonged
      var verify_belonged= this.verify_belonged(belonged);
      if (verify_belonged != 1){
        verify_err.push({err: verify_belonged})
      }

      // 验证！ supplier
      var verify_supplier = this.verify_supplier(supplier);
      if (verify_supplier != 1){
        verify_err.push({err: verify_supplier})
      }

      // 验证！ linklevel
      var verify_linklevel= this.verify_linklevel(linklevel);
      if (verify_linklevel != 1){
        verify_err.push({err: verify_linklevel})
      }
      // 验证！ devicetype
      var verify_devicetype= this.verify_devicetype(devicetype);
      if (verify_devicetype != 1){
        verify_err.push({err: verify_devicetype})
      }

      // 验证！ createdby
      var verify_createdby= this.verify_createdby(createdby);
        if (verify_createdby != 1){
        verify_err.push({err: verify_createdby})
      }

      // 验证！ lastupdatedby
      var verify_lastupdatedby= this.verify_lastupdatedby(lastupdatedby);
        if (verify_lastupdatedby != 1){
        verify_err.push({err: verify_lastupdatedby})
      }
    });
    return verify_err;
  };

  // 验证 sql 注入、 特殊字符！
  verify_sql_str(data, title){
    var special_sql = Device['special_sql']["special_sql"];
    var special_str = Device['special_sql']["special_str"];
    var sql = special_sql.test(data);
    var str = special_str.test(data);
    if(sql){
      return "防止SQL注入，请不要输入关于sql语句的特殊字符！"
    }
  
    if (!str){
      // console.log("==============>",data, data.length)
      return title + "不能有特殊字符！"
    }
    return 1
  }

  // 验证 deviceno 设备编号 
  verify_deviceno(deviceno){
    // sql注入和特殊字符 special_str
    var verify_sql_str = this.verify_sql_str(deviceno, '设备编号');
    if (verify_sql_str != 1){
      return verify_sql_str
    }
    if (new RegExp(Device["deviceno"]).test(deviceno)){
      if (deviceno.length > 50){
        return "设备编号最大长度不超过50！"
      }
      return "设备编号不能有中文！"
    }
    return 1 // 返回1，表示 通过验证！
  }

  // 验证 devicename 设备名称
  verify_devicename(devicename){
    // sql注入和特殊字符 special_str
    var verify_sql_str = this.verify_sql_str(devicename, '设备名称');
    if (verify_sql_str != 1){
      return verify_sql_str
    }
    if (devicename.length > 50){
      return "设备名称最大长度不超过50！"
    }
    return 1 // 返回1，表示 通过验证！
  }

  // 验证 type 设备类型
  verify_type(type){
    // sql注入和特殊字符 special_str
    var verify_sql_str = this.verify_sql_str(type, '设备类型');
    if (verify_sql_str != 1){
      return verify_sql_str
    }
    if (type.length > 50){
      return "设备类型最大长度不超过50！"
    }
    // if (new RegExp(Device["type"]).test(type)){
    //   return "设备类型不能有中文！"
    // }
    return 1 // 返回1，表示 通过验证！
  }
  
  // 设备ID：deviceid
  verify_deviceid(deviceid){
    // sql注入和特殊字符 special_str
    var verify_sql_str = this.verify_sql_str(deviceid, '设备ID');
    if (verify_sql_str != 1){
      return verify_sql_str
    }
    if (deviceid.length > 50){
      return "设备ID最大长度不超过50！"
    }
    return 1 // 返回1，表示 通过验证！
  }
  // 验证 location 存放地点
  verify_location(location){
    // sql注入和特殊字符 special_str
    var verify_sql_str = this.verify_sql_str(location, '存放地点');
    if (verify_sql_str != 1){
      return verify_sql_str
    }
    if (location.length > 50){
      return "存放地点最大长度不超过50！"
    }
    return 1 // 返回1，表示 通过验证！
  }
  // 验证 groups 科室/功能组  改为group
  verify_group(group){
    // console.log("验证 groups 科室  改为group:", group)
    // sql注入和特殊字符 special_str
    var verify_sql_str = this.verify_sql_str(group, '科室/功能组');
    if (verify_sql_str != 1){
      return verify_sql_str
    }
    if (group.length > 200){
      return "科室/功能组最大长度不超过200！"
    }
    return 1 // 返回1，表示 通过验证！
  }

  // 验证 belonged 归属人
  verify_belonged(belonged){
    // sql注入和特殊字符 special_str
    var verify_sql_str = this.verify_sql_str(belonged, '归属人');
    if (verify_sql_str != 1){
      return verify_sql_str
    }
    if (belonged.length > 50){
      return "归属人最大长度不超过50！"
    }
    return 1 // 返回1，表示 通过验证！ 
  }


  // 验证 supplier 供应商
  verify_supplier(supplier){
    // sql注入和特殊字符 special_str
    var verify_sql_str = this.verify_sql_str(supplier, '供应商');
    if (verify_sql_str != 1){
      return verify_sql_str
    }
    if (supplier.length > 200){
      return "供应商最大长度不超过200！"
    }
    return 1 // 返回1，表示 通过验证！
  }

  // 验证 linklevel 设备ABC分类
  verify_linklevel(linklevel){
    // sql注入和特殊字符 special_str
    var verify_sql_str = this.verify_sql_str(linklevel, '设备ABC分类');
    if (verify_sql_str != 1){
      return verify_sql_str
    }
    if (linklevel.length > 1){
      // console.log("linklevel:\n\n\n",linklevel)
      return "设备ABC分类最大长度不超过1！"
    }
    if (! new RegExp(Device["linklevel"]).test(linklevel)){
      return "设备ABC分类是A,B,C"
    }
    return 1 // 返回1，表示 通过验证！
  }

  // 验证 devicetype 设备统计归类
  verify_devicetype(devicetype){
    // sql注入和特殊字符 special_str
    var verify_sql_str = this.verify_sql_str(devicetype, '设备统计归类');
    if (verify_sql_str != 1){
      return verify_sql_str
    }
    if (devicetype.length > 4){
      return "设备统计归类最大长度不超过4！"
    }
    // if (! new RegExp(Device["devicetype"]).test(devicetype)){
    //   return "设备统计归类是1,2,3,4"
    // }
    return 1 // 返回1，表示 通过验证！
  }

  


  // 验证 createdby 创建人
  verify_createdby(createdby){
    // sql注入和特殊字符 special_str
    var verify_sql_str = this.verify_sql_str(createdby, '创建人');
    if (verify_sql_str != 1){
      return verify_sql_str
    }
    if (createdby.length > 50){
      return "创建人最大长度不超过50！"
    }
    return 1 // 返回1，表示 通过验证！
  }

  // 验证 lastupdatedby 更新人
  verify_lastupdatedby(lastupdatedby){
    // console.log("lastupdatedby",lastupdatedby)
    // sql注入和特殊字符 special_str
    // var verify_sql_str = this.verify_sql_str(lastupdatedby, '更新人');
    // if (verify_sql_str != 1){
    //   return verify_sql_str
    // }
    // if (lastupdatedby !== undefined){
    //   if (lastupdatedby.length > 50){
    //     return "更新人最大长度不超过50！"
    //   }
    // }
    return 1 // 返回1，表示 通过验证！
  }




  // 展示状态
  success(){
    this.publicservice.showngxtoastr({position: 'toast-top-right', status: 'success', conent:"导入成功!"});
  }
  danger(){
    this.publicservice.showngxtoastr({position: 'toast-top-right', status: 'danger', conent:"导入失败!"});
  }
  importdanger(data){
    this.publicservice.showngxtoastr({position: 'toast-top-right', status: 'danger', conent:"缺少："+data.join(",")});
  }
  verify_import(data){
    this.publicservice.showngxtoastr({position: 'toast-top-right', status: 'danger', conent:"验证不通过："+JSON.stringify(data)});
  }
  delsuccess(){
    this.publicservice.showngxtoastr({position: 'toast-top-right', status: 'success', conent:"删除成功!"});
  }
  deldanger(){
    this.publicservice.showngxtoastr({position: 'toast-top-right', status: 'danger', conent:"删除失败!"});
  }

  importSuccess(data){
    this.publicservice.showngxtoastr({position: 'toast-top-right', status: 'warning', conent:data});
  }



  // =================================================agGrid

  tableDatas = {
    totalPageNumbers: 0, // 总页数
    PageSize: 10, // 每页 10条数据
    isno_refresh_page_size: false, // 是否重新将 每页多少条数据，赋值为默认值
    columnDefs:[ // 列字段 多选：headerCheckboxSelection checkboxSelection , flex: 1 自动填充宽度  pinned: 'left' 固定在左侧！
      { field: 'deviceno', headerName: '设备编号', headerCheckboxSelection: true, checkboxSelection: true, autoHeight: true, fullWidth: true, minWidth: 50,resizable: true, sortable: true},
      // { field: 'devicename', headerName: '设备名称', fullWidth: true, minWidth: 50,resizable: true,},
      { field: 'devicename', headerName: '设备名称', fullWidth: true, minWidth: 50,resizable: true,cellRendererFramework: TableDevicenameComponent, sortable: true},
      { field: 'type', headerName: '设备类型', fullWidth: true, width: 130,resizable: true, sortable: true},
      { field: 'deviceid', headerName: '设备ID', resizable: true, width: 200, sortable: true}, // 自定义设备编号！
      { field: 'active', headerName: '是否启用', resizable: true, cellRendererFramework: TranActiveComponent,width: 150, sortable: true},
      { field: 'location', headerName: '存放地点', resizable: true, width: 130},
      { field: 'group', headerName: '科室/功能组', resizable: true, width: 330, cellRendererFramework: TableGroupComponent, sortable: true},
      // { field: 'group', headerName: '科室/功能组', resizable: true, width: 330},
      { field: 'belonged', headerName: '归属人', resizable: true, width: 130, sortable: true},
      { field: 'supplier', headerName: '供应商', resizable: true, minWidth: 10, sortable: true},
      { field: 'linklevel', headerName: '设备ABC分类', resizable: true, width: 130, sortable: true},
      { field: 'devicetype', headerName: '设备统计归类', resizable: true,width: 130, sortable: true,
        cellStyle: function(params){
          var value = params.value;
          switch (value) {
            case '停用':
              return {
                // border: 'rgb(238, 240, 238) 1px solid',
                // background: 'rgb(199, 199, 199)',
              }
              break;
            case '闲置':
              return {
                // border: 'rgb(216, 236, 162) 1px solid',
                // background: 'rgb(171, 250, 92)',
              }
            
              break;
            case '封存':
              return {
                // border: 'rgb(228, 144, 129) 1px solid',
                // background: 'rgb(247, 115, 39)',
              }
              break;
            case '在用':
              return {
                // border: 'green 1px solid',
                // background: 'rgb(48, 248, 48)'
              }
              break;
            default:
              return {
                // border: 'rgb(203, 238, 164) 1px solid',
                // background: 'rgb(203, 238, 164)',
              }
              break;
          }
        }
      },
      { field: 'createdon', headerName: '创建时间', resizable: true, width: 200, sortable: true},
      { field: 'createdby', headerName: '创建人', resizable: true,width: 130, sortable: true},
      { field: 'lastupdateon', headerName: '更新时间', resizable: true, width: 200, sortable: true},
      { field: 'lastupdatedby', headerName: '更新人', resizable: true, minWidth: 10, sortable: true},
      { field: 'iscalkpi', headerName: 'KPI计算', resizable: true, minWidth: 10,cellRendererFramework: TranIscalkpiComponent, sortable: true},

    ],
    rowData: [ // data
    ]
  };

  private gridData = [];
  


  // 初始化前确保 搜索条件 
  inittable_before(){
    var devicename = this.myinput?.getinput()===undefined?"":this.myinput?.getinput();// 设备名称
    // 科室/功能组
    var groups_data = this.groups_func?.getselect();
    // 设备类型
    var device_tpye_data = this.eimdevicetpye?.getselect();
    // 将科室/功能组，转为列表
    var groups_data_ = groups_data ===""?[] :groups_data.split(";");
   
    return {
      limit: this.agGrid.get_pagesize(),
      employeeid: this.userinfo.getEmployeeID(),
      devicename: [devicename],
      group: groups_data_,
      eimdevicetype:device_tpye_data
    }

  }

  inttable(event?){
    var inittable_before = this.inittable_before();
    var offset;
    var limit;
    var PageSize;
    if (event != undefined){
      offset = event.offset;
      limit = event.limit;
      PageSize = event.PageSize? Number(event.PageSize):10;
    }else{
      offset = 0;
      limit = inittable_before.limit;
      PageSize = inittable_before.limit;
    }
    var columns = {
      offset: offset, 
      limit: limit,
      employeeid: inittable_before.employeeid,
      devicename: inittable_before.devicename,
      eimdevicetype: inittable_before.eimdevicetype, // 设备类型，可选
      group: inittable_before.group          // 科室/功能组，可选
    }
    this.http.callRPC('device', 'dev_get_device_search', columns).subscribe((result)=>{
      var tabledata = result['result']['message'][0]
      this.loading = false;
      if (tabledata["code"]===1){
        var message = result["result"]["message"][0]["message"];
        
        var after_datas = this.show_table_before(message);
        this.tableDatas.PageSize = PageSize;
        this.gridData.push(...after_datas)
        this.tableDatas.rowData = this.gridData;
        var totalpagenumbers = tabledata['numbers']? tabledata['numbers'][0]['numbers']: '未得到总条数';
        this.tableDatas.totalPageNumbers = totalpagenumbers;
        this.agGrid.init_agGrid(this.tableDatas); // 告诉组件刷新！
        // 刷新table后，改为原来的！
        this.tableDatas.isno_refresh_page_size = false;
        this.RecordOperation('查看', 1,  "eim台账")
      }else{this.RecordOperation('查看', 0,  "eim台账")}
    })
  }

  update_agGrid(event?){
    var inittable_before = this.inittable_before();
    
    // 是否 每页多少也，设置为默认值
    this.tableDatas.isno_refresh_page_size = true;
    var offset;
    var limit;
    var PageSize;
    if (event != undefined){
      offset = event.offset;
      limit = event.limit;
      PageSize = event.PageSize? Number(event.PageSize):10;
    }else{
      offset = 0;
      limit = inittable_before.limit;
      PageSize = inittable_before.limit;
    }
    var columns = {
      offset: offset, 
      limit: limit,
      employeeid: inittable_before.employeeid,
      devicename: inittable_before.devicename,
      eimdevicetype: inittable_before.eimdevicetype, // 设备类型，可选
      group: inittable_before.group          // 科室/功能组，可选
    }
    this.http.callRPC('device', 'dev_get_device_search', columns).subscribe((result)=>{
      var tabledata = result['result']['message'][0]
      this.loading = false;
      if (tabledata["code"] === 1){
        var message = result["result"]["message"][0]["message"];
        var after_datas = this.show_table_before(message);
        this.tableDatas.PageSize = PageSize;
        this.gridData.push(...after_datas)
        this.tableDatas.rowData = this.gridData;
        var totalpagenumbers = tabledata['numbers']? tabledata['numbers'][0]['numbers']: '未得到总条数';
        this.tableDatas.totalPageNumbers = totalpagenumbers;
        this.agGrid.update_agGrid(this.tableDatas); // 告诉组件刷新！
        // 刷新table后，改为原来的！
        this.tableDatas.isno_refresh_page_size = false;
        this.RecordOperation('更新', 1, "eim台账");
      }else{this.RecordOperation('更新', 0, "eim台账");}

    })
  }

  // nzpageindexchange 页码改变的回调
  nzpageindexchange_ag(event){
    this.gridData = [];
    this.loading = true;
    this.inttable(event);
    this.loading = false;
  }


  // =================================================agGrid


  // option_record
  RecordOperation(option, result,infodata){
    if(this.userinfo.getLoginName()){
      var employeeid = this.userinfo.getEmployeeID();
      var result = result; // 1:成功 0 失败
      var transactiontype = option; // '新增用户';
      var info = infodata;
      var createdby = this.userinfo.getLoginName();
      this.publicservice.option_record(employeeid, result,transactiontype,info,createdby);
    }

  }


  searchdanger(){
    this.publicservice.showngxtoastr({position: 'toast-top-right', status: 'danger', conent:"没有搜索到数据！"});
  }


}



// table 中每行数据类型！这是展示table需要的数据
interface DeviceData {
  id:number,
  deviceno:string,
  devicename:string,
  type: string,
  deviceid:number, 
  active:number,
  location:string,
  group:string,
  belonged:string,
  supplier:string,
  linklevel:string,
  devicetype:string,
  createdon:string,
  createdby:string,
  lastupdateon: string,
  lastupdatedby: string
  groupsid: number,
  iscalkpi: number

}

// table 中每行数据类型！ 这是将table中的数据改回原始数据
interface OptionDeviceData {
  id:number,
  deviceno:string,
  devicename:string,
  type: number,
  deviceid:string, 
  active:number,
  location:string,
  group:string,
  belonged:string,
  supplier:string,
  linklevel:string,
  devicetype:number,
  createdon:string,
  createdby:string,
  lastupdateon: string,
  lastupdatedby: string
  groupsid: number,
  iscalkpi:number,
  year:number

}
