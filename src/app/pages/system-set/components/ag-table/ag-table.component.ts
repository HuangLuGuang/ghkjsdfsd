import { Component, OnInit, Input, ViewChild,Output, EventEmitter } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';


import { EditDelTooltipComponent } from '../../../../pages-popups/prompt-diallog/edit-del-tooltip/edit-del-tooltip.component';

import * as XLSX from 'xlsx';
import { NbDialogService } from '@nebular/theme';
import { UserInfoService } from '../../../../services/user-info/user-info.service';
import { PublicmethodService } from '../../../../services/publicmethod/publicmethod.service';
import { employee_action } from '../../../../appconfig';

declare let $;

interface Data {
  action: boolean,
  columnDefs: any, // 列字段
  rowData: any // 行数据
}

@Component({
  selector: 'ngx-ag-table',
  templateUrl: './ag-table.component.html',
  styleUrls: ['./ag-table.component.scss']
})
export class AgTableComponent implements OnInit {
  @Input("tableDatas") tableDatas:any;

  @ViewChild('agGrid') agGrid: AgGridAngular;   // 实例在组件可访问
  @Output() private nzpageindexchange = new EventEmitter<any>(); // 分页
  @Output() private clickrow = new EventEmitter<any>(); // 分页
  @Input() private updategetemployee:any;



  gridApi;
  gridColumnApi;
  paginationPageSize; // 每页多少条数  = 10
  paginationNumberFormatter;   // 设置每页展示条数
  suppressScrollOnNewData = true; // 更改时网格不要滚动到顶部
  suppressPaginationPanel = true; // 隐藏用于导航的默认ag-Grid控件 即隐藏自带的分页组件
  suppressRowClickSelection = false; // true 则单击行时将不会发生行选择 仅在需要复选框选择时使用

  context; // 和渲染的组件 数据交互！

  getRowNodeId; // 得到rowNodeId
  defaultColDef;
  

  rowSelection; // 选中行
  frameworkComponents; // 表格渲染组件！


  // 分页
  current = 1;  // 当前页
  totalPageNumbers=10;  // 总数据条数
  setPageCount = 10;     // 默认每页10条数据
  private requestPageCount = 1; // 每次请求的页数
  PageSize; // 下拉框中的数据

  selectedRows = [];     // 行选择数据

  is_filter_data = false;  // 是否是搜索的数据

  columnDefs; // 列字段
  rowData; // 行数据
  action; // 是否操作
  alltotalPageNumbers; // 这是 从数据库得到的总的条数！


  constructor(private dialogService: NbDialogService, private userinfo: UserInfoService, private publicservice: PublicmethodService) { 
  }
  
  
  ngOnInit(): void {
    // this.gridOptions();
    console.log("agGrid========================", this.agGrid)
  }
  

  ngAfterViewInit(){

    
    // setTimeout(() => {
    // }, 1000);
    
  }
  
  // ---------------
  gridOptions(employee_agGrid){
    this.columnDefs =  employee_agGrid["columnDefs"]// 列字段
    this.action =  employee_agGrid["action"]; // 是否操作
    // this.paginationPageSize = 10;
    this.paginationPageSize = employee_agGrid["PageSize"];
    
    // 每页显示的条数
    this.gridApi.paginationSetPageSize(employee_agGrid["PageSize"]);
    this.rowData =  employee_agGrid["rowData"]; // 行数据
    this.alltotalPageNumbers = employee_agGrid["totalPageNumbers"]; // 数据库中的总条数
    
    if(this.rowData.length>0){
      $(".isShow").show()
    }else{
      $(".isShow").hide()
    }
    this.defaultColDef = { // 默认的列设置
      // flex: 1,
      editable: false,
      // sortable: true,
      // filter: true,
    };
    this.getRowNodeId = function(data){
      return data.id
    };
    this.context = { componentParent: this };
    
    this.rowSelection = 'multiple';
    this.totalPageNumbers = employee_agGrid.totalPageNumbers
    // this.totalPageNumbers = this.rowData.length

    // 动态修改--每页的条数
    if (employee_agGrid["isno_refresh_page_size"]){
      this.PageSize = employee_agGrid["PageSize"];
      this.setPageCount = Number(this.PageSize);
      console.log("--------------动态修改--每页的条数", this.PageSize)
    }

  };

  


  // 分页！
  onPaginationChanged(event) {
    console.warn("onPaginationChanged>>", event);
  }

  

  // 点击行数据
  onRowClicked(event) {
    console.log("点击行数据",event);
    this.clickrow.emit(event)
  }
  


  // 页码改变的回调
  pageIndexChange(event) {
    // 页面跳转
    this.gridApi.paginationGoToPage(event - 1);
    // 总页数
    let totalPages = this.totalPageNumbers / this.setPageCount;
    // 当前页数
    let currentPage = event - 1 < 0? 0: event - 1;
    // 判断是否触发请求
    console.log("---页码改变的回调-----当前页数,currentPage, totalPages, this.setPageCount", currentPage,totalPages,this.setPageCount)
    const offset = (currentPage) * this.setPageCount;
    // 每次请求的条数 * 每页的条数
    const limit = this.requestPageCount * this.setPageCount;
    this.nzpageindexchange.emit({offset: offset, limit: limit, PageSize:this.setPageCount})
  }
 


  // onPageSizeChanged() 改变每页多少条 时触发！
  onPageSizeChanged(){
    this.setPageCount = Number(this.PageSize); // 每页多少条数据
    this.gridApi.paginationSetPageSize(Number(this.PageSize));
    // 要得到页数，需要总条数 / 每页几条 this.totalPageNumbers / this.setPageCount
    console.log("之前的当前页数",this.current); // this.current = this.totalPageNumbers / this.setPageCount
    var current_before = this.current;
    var current_after = Math.round(this.totalPageNumbers / this.setPageCount); // 向上取整
    this.current = current_before>current_after? current_after: current_before;
    console.log("之后的当前页数",this.current); // this.current = this.totalPageNumbers / this.setPageCount
    this.pageIndexChange(this.current);

  }

  // 选中行数
  onSelectionChanged(event) {
    this.selectedRows = this.gridApi.getSelectedRows();
    console.warn(this.selectedRows);
  }

  // 父组件调用，得到选中的数据
  getselectedrows(){
    return this.selectedRows;
  }

  // 过滤器已修改，但未应用。当过滤器具有“应用”按钮时使用。
  onfilterModified(event) {
    this.totalPageNumbers = this.gridApi.getModel().rootNode.childrenAfterFilter.length;
    this.is_filter_data = this.totalPageNumbers === this.tableDatas.rowData.length ? false : true;
  }




  // 得到选中的数据！
  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data );
    const selectedDataStringPresentation = selectedData.map(node => node.name + ' ' + node.loginname).join(', ');
    console.log("得到选中的数据！", )
    alert(`Selected nodes: ${selectedDataStringPresentation}`);
  }

  //************************************************  导入信息



  // 导出文件名
  filename;

  // 导出功能
  download(title){
    // 修改为导出的是，选中的行数据！ this.selectedRows = this.gridApi.getSelectedRows();
    this.filename = title + ".xlsx";
    console.log("csv名称----", this.filename);
    console.log("this.columnDefs----", this.columnDefs);
    var columns = this.columnDefs;
    var table_header = [];
    var table_data = [];

    
    var keys = [];
    for (let k of columns){ // columns []
      if(k["field"] != "action" && k["field"] != 'option'){ // 去掉 操作(options)选项
        if(k["children"]){
          var childrens = k["children"];
          childrens.forEach(children => {
            table_header.push(children['headerName']);
            keys.push(children["field"]);
          });
        }else{
          table_header.push(k['headerName']);
          keys.push(k["field"]);
        }
      }
    }
    
    if (this.selectedRows.length != 0){
      
      console.log("table_header----", table_header);
      table_data.push(table_header);
      // var data = this.rowData;
      // var data = this.selectedRows;
      var data = Object.assign([], this.selectedRows);
      console.log("导出数据data----", data);
      data.forEach(element => {
        if(element["active"] === 1){
          element["active"] = '是'
        }else{
          element["active"] = '否'
        }
        var data_item = [];
        if (keys != []){
          for (let k of keys){
            // 去掉数值为null、undefind的
            var element_value = element[k] == 'null'||element[k] == 'undefind'? "":element[k]
            data_item.push(element_value);
          }
        }else{
          for (let k in element){
            // 去掉数值为null、undefind的
            var element_value = element[k] == 'null'||element[k] == 'undefind'? "":element[k]
            data_item.push(element_value);
          }
        }
        

        table_data.push(data_item);
      });
      this.export(table_data);
      this.selectedRows = [];
      
    }else{
      
      table_data.push(table_header);
      // 没有选择导出的数据
      this.dialogService.open(EditDelTooltipComponent, { closeOnBackdropClick: false,context: { title: '提示', content:   `请选择要导出的数据！\n 确定 则继续导出`,rowData: JSON.stringify(true)}} ).onClose.subscribe(
        name=>{
          if(name){
            this.export(table_data);
            this.RecordOperation("导出"+title, 1, "导出excel表格");
          }
  
        }
      );
    }
  }

  // -----------------------将data写入workbook中-----------------------------
  async export(datas) {
    const wb: XLSX.WorkBook = this.write(datas);
    // const filename: string = "SheetJSIonic.xlsx"; // 导出的文件名！
    /* save to file */
    XLSX.writeFile(wb, this.filename);
  };

  // -----------------------创建worksheet和workbook-----------------------------
  write(datas): XLSX.WorkBook {
    /* generate worksheet */
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(datas);
    
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    return wb;
  };

  // onGridReady
  onGridReady(params){
    console.warn("params>>", params);

    console.warn(params);
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }


  // 父组件调用，告诉该组件数值改变了！
  update_agGrid(tableDatas){
    // 刷新
    this.agGrid.api.refreshView();
    this.selectedRows = []; // 清除选择的行数据！
    this.rowData = tableDatas.rowData;
    // this.totalPageNumbers = tableDatas.rowData.length;
    this.totalPageNumbers = tableDatas.totalPageNumbers;

    this.alltotalPageNumbers = tableDatas.totalPageNumbers; // 数据库中的总条数
    // this.agGrid.api.setRowData(this.rowData);
    console.log("------------agGrid-------------", this.agGrid);
    // 动态修改--每页的条数
    if(tableDatas["isno_refresh_page_size"]){
      this.PageSize = tableDatas["PageSize"];
      this.setPageCount = Number(this.PageSize);
    }
    this.agGrid.api.setRowData(this.rowData);
  }

  // 父组件调用！ 初始化表格
  init_agGrid(employee_agGrid){
    console.log("---------父组件调用！ 初始化表格--------------",employee_agGrid)
    this.gridOptions(employee_agGrid);
    // 清空选择的数据
    this.selectedRows = [];
    
  }

 



  



  // ============================== 渲染组件调用的方法
  

  // option_record
  RecordOperation(option, result,infodata){
    console.warn("==============>", this.userinfo.getLoginName())
    console.warn("infodata==============>", infodata)
    console.warn("==============>")
    if(this.userinfo.getLoginName()){
      var employeeid = this.userinfo.getEmployeeID();
      var result = result; // 1:成功 0 失败
      var transactiontype = option; // '新增用户';
      var info = infodata;
      var createdby = this.userinfo.getLoginName();
      this.publicservice.option_record(employeeid, result,transactiontype,info,createdby);
    }

  }

}
