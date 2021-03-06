import { Component, OnInit } from '@angular/core';


import { NbDialogService } from '@nebular/theme';

import { EditDelTooltipComponent } from '../../../pages-popups/prompt-diallog/edit-del-tooltip/edit-del-tooltip.component';

declare let layui;

declare let $;


import { HttpserviceService } from '../../../services/http/httpservice.service';

import { url, ssotoken,  SYSMENU, SYSMENUEDIT,MULU, menu_button_list, Data, loginurl } from '../../../appconfig';
import { LocalStorageService } from '../../../services/local-storage/local-storage.service';
import { PublicmethodService } from '../../../services/publicmethod/publicmethod.service';

// 弹出的组件 -- 添加组件

import { NbToastrService,  } from '@nebular/theme';
import { Router } from '@angular/router';
import { UserInfoService } from '../../../services/user-info/user-info.service';
import { Observable } from 'rxjs';
import { NewMenuComponent } from '../../../pages-popups/system-set/new-menu/new-menu.component';


import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'ngx-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  get_jili_app_token;
  headers



  // 前端要展示的button
  button;
  // 刷新 table
  refresh = false;
  buttons;
  isactions;
  isloading = true;



  constructor(private http: HttpserviceService, private localstorageservice: LocalStorageService,
    private publicservice: PublicmethodService, private dialogService: NbDialogService,
    private toastrService: NbToastrService, private router: Router, private userinfo: UserInfoService,
    private translate: TranslateService) {
    // 会话过期
    localStorage.removeItem("alert401flag");
    var roleid = this.userinfo.getEmployeeRoleID();
    this.publicservice.get_buttons_bypath(roleid).subscribe(result=>{
      this.button = result;
      localStorage.setItem("buttons_list", JSON.stringify(result));


      var button_lists = result;
      var button_list = {}
      if(button_lists["edit"]){
        button_list["edit"] = button_lists["edit"]["active"] === 1?  true: false;
      }else{
        button_list["edit"] = false;
      }
      if(button_lists["del"]){
        button_list["del"] = button_lists["del"]["active"] === 1?  true: false;
      }else{
        button_list["del"] = false;
      }
      this.isactions = button_list;
      // console.log(">>>>>>>>this.isactions_new<<<<<<",this.isactions);
      this.loadMenu(this.isactions);

    })
  }

  ngOnInit(): void {
    // 初始化table
    // 得到权限button
    // this.get_buttons_and_mulutable();
  }

  // 得到button，且加载目录到table
  get_buttons_and_mulutable(){
    var roleid = this.userinfo.getEmployeeRoleID();
    this.publicservice.get_buttons_bypath(roleid).subscribe(result=>{
      this.button = result;
      var button_lists = result;
      var button_list = {}
      if(button_lists["edit"]){
        button_list["edit"] = button_lists["edit"]["active"] === 1?  true: false;
      }else{
        button_list["edit"] = false;
      }
      if(button_lists["del"]){
        button_list["del"] = button_lists["del"]["active"] === 1?  true: false;
      }else{
        button_list["del"] = false;
      }
      this.isactions = button_list;
      console.log(">>>>>>>>this.isactions_new<<<<<<",this.isactions);
      this.loadMenu(this.isactions);
    });
  }

  ngAfterViewInit(){
  }



  // 得到当前界面的buttons
  getbuttons(){
    // 根据menu_item_role得到 该页面对应的 button！
    var button_list = localStorage.getItem(menu_button_list)? JSON.parse(localStorage.getItem(menu_button_list)): false;
    if (button_list){
      this.publicservice.get_current_pathname().subscribe(res=>{
        // console.log("get_current_pathname   ", res);
        var currentmenuid = res["id"];
        var buttons = [];
        button_list.forEach(button => {
          if (currentmenuid === button["parentid"]){
            button["permission"] = button["permission"];
            buttons.push(button);
          }
        });
        // -----------------------------------------------------------------------------------
        var isactions = {};
        buttons.forEach(button=>{
          var mdthod = button["permission"].split(":")[1];
          switch (mdthod) {
            case "add":
              break;
            case "del":
              isactions["del"] = true
              break;
            case "edit":
              isactions["edit"] = true
              break;

          }
        })

        if (!isactions["edit"]){
          isactions["edit"] = false
        }
        if (!isactions["del"]){
          isactions["del"] = false
        }
        // -----------------------------------------------------------------------------------
        this.buttons = buttons;
        this.isactions = isactions;
        // console.log("_________________________________-this.buttons---------________________",this.buttons);
        // console.log("_________________________________-this.isactions---------________________",this.isactions);
      })
    }
  }


  action(actionmethod){
    // console.log("++++++++++++++++++++action(actionmethod)++++++++++++++++++++++++++++", actionmethod);
    var method = actionmethod.split(":")[1];
    // ====================================================
    // console.log("--------------->method", method)
    switch (method) {
      case 'add':
        this.updatabutton_list().subscribe(res=>{
          if (res){
            this.addmenu()
            // setTimeout(() => {
            // }, 1000);

          }
        });
        break;
      case 'del':
        this.updatabutton_list().subscribe(res=>{
          if (res){
            this.delmenu();
          }
        });;
        break;
      case 'edit':
        this.updatabutton_list().subscribe(res=>{
          if (res){
            this.editmenu();
          }else{
          }
        });


        break;
      // case 'query':
      //   this.query();
      //   break;
      // case 'import':
      //   this.import();
      //   break;
      // case 'download':
      //   this.download('用户管理')
      //   break;
    }

  }


  // 新增菜单函数
  addmenu(){
    var that = this
    var dialogService = this.dialogService;
    var $table = $('#menuTable');
    // console.log("根据id得到行数据  ",$table.bootstrapTable('getData'));
    var method = 'add';
    open(method);

    // 弹出函数
    function open(method) {
      // dialogService.open(dialog, { context: 'this is some additional data passed to dialog' });
      dialogService.open(NewMenuComponent, {closeOnBackdropClick: false,context: { rowdata: JSON.stringify(method), title: '添加目录' }}).onClose.subscribe(name=>{
      // dialogService.open(MenuComponent2, {closeOnBackdropClick: false,context: { rowdata: JSON.stringify(method)}}).onClose.subscribe(name=>{
        if (name){
          that.updatetable(true);
        }
      });
    }
  }

  // 删除行数据
  delmenu(){
    var $table = $('#menuTable');
    // var rowmenu = localStorage.getItem("clickrow");
    var rowmenu = $table.bootstrapTable('getSelections');
    // console.log("--获取选中的行数据--", rowmenu)

    var that = this;

    var deleteitem = this.deleteitem;
    var publicservice = this.publicservice;
    var success = this.success;
    var danger = this.danger;
    if (rowmenu.length != 0){
      var row = rowmenu[0];
      var http = this.http;
      // console.log("要删除的行数据！", rowmenu);

      this.dialogService.open(EditDelTooltipComponent, { closeOnBackdropClick: false,context: { title: '提示', content:   `确定要删除${row.title}吗？`,rowData: JSON.stringify(row)}} ).onClose.subscribe(
        name=>{
          // console.log("----name-----", name);
          if (name){
            this.updatetable(name)
            // 调用删除功能
            deleteitem(row, http, publicservice, success, danger,that);

          }
        }
      );

    }else{
      // 提示选择行数据

      this.dialogService.open(EditDelTooltipComponent, { closeOnBackdropClick: false,context: { title: '提示', content:   `请选择一行数据！`}} ).onClose.subscribe(
        name=>{
          // console.log("----name-----", name);

        }
      );
    }
  }

  // 这是删除按钮调用-删除 数据库中的数据！
  deleteitem(row, http, publicservice, success, danger,that){
    const colums = {
      id: row["id"],
      textid: row["textid"]
    };
    // console.log("---colums--",colums)
    const table = "menu_item";
    const method = "delete_menu_item";
    http.callRPC(table, method, colums).subscribe((result)=>{
      const status = result['result']['message'][0];
      if (status === 1){
        // 表示删除成功！
        // alert("删除成功")
        localStorage.removeItem(MULU);
        localStorage.removeItem('hidden_menu');
        localStorage.removeItem(SYSMENU);
        success(publicservice);
        switch (row["type"]) {
          case 0:
            that.RecordOperation(1,'删除', '菜单管理, 目录');
            break;
          case 1:
            that.RecordOperation(1,'删除', '菜单管理, 菜单');
            break;

          default:
            that.RecordOperation(1,'删除', '菜单管理, 按钮');
            break;
        }

        // setTimeout(() => {
          //   location.reload();
          // }, 1000);
        }else{
          switch (row["type"]) {
            case 0:
              that.RecordOperation(0,'删除', '菜单管理, 目录');
              break;
            case 1:
              that.RecordOperation(0,'删除', '菜单管理, 菜单');
              break;

            default:
              that.RecordOperation(0,'删除', '菜单管理, 按钮');
              break;
          }
        // alert("删除失败！")
        danger(publicservice)
      }
    })
  }

  // 修改行数据函数
  editmenu(){
    var $table = $('#menuTable');
    var rowmenu = $table.bootstrapTable('getSelections');
    if (rowmenu.length != 0){
      var row = rowmenu[0];
      localStorage.setItem(SYSMENUEDIT, JSON.stringify(row));
      this.open(row);
    }else{
      // 提示选择行数据
      this.dialogService.open(EditDelTooltipComponent, { closeOnBackdropClick: false, context: { title: '提示', content:   `请选择一行数据！`}} ).onClose.subscribe(
        name=>{

        }
      );
    }
  }

  refresh_table(){
    this.isloading = true;
    $("#employeenumber").val('')
    this.refresh = true;
    this.updatetable();
    this.refresh = false;
    this.isloading = false;
  }


  // 修改button弹出
  open(row) {
    // this.dialogService.open(MenuComponent2,{ closeOnBackdropClick: false,context: { rowdata: JSON.stringify('') } }).onClose.subscribe(name=>{
    this.dialogService.open(NewMenuComponent,{ closeOnBackdropClick: false,context: { rowdata: JSON.stringify(row), title: '编辑目录'  } }).onClose.subscribe(name=>{
      // console.log("-------------name----------------", name);
      if (name){
        this.editsuccess()

        // 更新table！
        this.updatetable(name); // name 表示刷新目录栏
        // 删除 mulu
        localStorage.removeItem(MULU);
        localStorage.removeItem('hidden_menu');



      }else{
        this.editdanger()
      }
    })
  }

  // var $table = $('#menuTable');

  RanderTable(data, ){
    var dialogService = this.dialogService;
    var $table = $('#menuTable');
    var that = this;
    var http = this.http
    var publicservice = this.publicservice
    var success = this.success
    var danger = this.danger
    var Data = Data;

    var isactions = this.isactions;

    // console.log("-------------------this.isactions-------------------", isactions);
    // if (isactions === undefined){
    //   location.reload();
    // }

    $table.bootstrapTable({
        idField: 'id',
        data:data,
        dataTpye: 'json',
        showColumns: false,
        columns: [
          {
            field: 'ck',
            checkbox: true,
            width: '10',
          },

          {
            field: 'title',
            title: '目录名称',
            width: '150',
          },
          {
            field: 'orderindex',
            title: '排序',
            // sortable: true,
            align: 'center',
            width: '50',
          },
          {
            field: 'type',
            title: '类型',
            align: 'center',
            width: '100',
            formatter: typeFormatter
          },
          {
            field: 'active',
            title: '是否启用',
            align: 'center',
            width: '50',
            formatter: activeFormatter
          },
          {
            field: 'link',
            title: '路由',
            align: 'center',
            width: '50',
          },
          {
            field: 'icon',
            title: '菜单图标',
            align: 'center',
            width: '100',
          },

          {
              field: 'action',
              title: '操作',
              width: '100',
              align: 'center',
              events: {
                'click .edit': function (e, value, row, index) {
                    open(row);

                },
                'click .remove': function (e, value, row, index) {
                    // console.log("删除的row数据：", row);
                    dialogService.open(EditDelTooltipComponent, { closeOnBackdropClick: false,context: { title: '删除菜单提示', content:   `确定要删除${row.title}吗？`,rowData: JSON.stringify(row)}} ).onClose.subscribe(
                      name=>{
                        // console.log("----name-----", name);
                        if (name){
                          that.updatetable(name)
                          // 调用删除功能
                          deleteitem(row, publicservice, success, danger)
                        }
                      }
                    );
                    // 删除之后 应该需要更新table
                    // getdata_for_table();
                }
              },
              formatter: actionFormatter,
          },
        ],
        //   data: data,
        //   在那一列展示树形
        treeShowField: 'title',
        // 指定父id列
        parentIdField: 'parentid',

        onPostBody: function() {
          console.time('onPostBody');
          var columns = $table.bootstrapTable('getOptions').columns
          if (columns && columns[0][1].visible) {
            $table.treegrid({
              treeColumn: 1,
              initialState: 'collapsed',// 所有节点都折叠
            })
          }
          console.timeEnd('onPostBody');
        }


        // onResetView: function() {
        //   console.time('onResetView');
        //     $table.treegrid({
        //         initialState: 'collapsed',// 所有节点都折叠
        //         treeColumn: 1,

        //     });
        //     //只展开树形的第一级节点

        // console.timeEnd('onResetView');

        // },
        // classes: "table table-bordered  table-hover table-primary:hover",
    });
    this.isloading = false;

    function typeFormatter(value, row, index) {
      if (value === 1) {
          return '菜单'
          // return '<span class="label label-success">菜单</span>'
      }
      if (value === 0) {
        return '目录'
        // return '<span class="label label-success">目录</span>'
      }
      if (value === 2) {
        return '按钮'
        // return '<span class="label label-info">按钮</span>'
      }
      return '-'
    };


    // 是否启用
    function activeFormatter(value, row, index){
      if (value == 1) {
        return '是'
        // return '<span class="label label-info">是</span>'
      }
      if (value == 0) {
        return '否'
        // return '<span class="label label-success">否</span>'
      }
    }




    // 操作
    function actionFormatter(value, row, index) {
      var edit_class = "buedit edit-edit edit";
      var del_class = "buremove edit-edit remove ";
      // disable_edit

      if (isactions["edit"]){}else{
        edit_class = "disable_edit edit-edit";

      }
      if(isactions["del"]){}else{
        del_class = "disable_remove remove-remove";
      }

      return [
        `<button class="${edit_class}">`,
        '<a class="btn " href="javascript:void(0)" title="编辑" style="color:#464545">',
        '<i class="nb-edit" style="font-size: 32px; "></i>',
        '</a>  ',
        '</button>',

        `<button class="${del_class}">`,
        '<a class="btn " href="javascript:void(0)" title="删除"   style="color:#464545">',
        '<i class="nb-trash"  style="font-size: 32px; "></i>',
        '</a>',
        '</button>',
      ].join('')

    }



    // 删除功能
    function deleteitem(row, publicservice, success, danger){
      const colums = {
        id: row["id"],
        textid: row["textid"]
      };
      // console.log("---colums--",colums)
      const table = "menu_item";
      const method = "delete_menu_item";
      http.callRPC(table, method, colums).subscribe((result)=>{
        // console.log("删除菜单---=====",result)
        const status = result['result']['message'][0];
        if (status === 1){
          // 表示删除成功！
          // alert("删除成功")
          localStorage.removeItem(MULU);
          localStorage.removeItem('hidden_menu');
          localStorage.removeItem(SYSMENU);
          success(publicservice);
          switch (row["type"]) {
            case 0:
              that.RecordOperation(1,'删除', '菜单管理, 目录');
              break;
            case 1:
              that.RecordOperation(1,'删除', '菜单管理, 菜单');
              break;

            default:
              that.RecordOperation(1,'删除', '菜单管理, 按钮');
              break;
          }

          that.updatetable();
          // setTimeout(() => {
          //   location.reload();
          // }, 1000);
        }else{
          // alert("删除失败！")
          switch (row["type"]) {
            case 0:
              that.RecordOperation(0,'删除', '菜单管理, 目录');
              break;
            case 1:
              that.RecordOperation(0,'删除', '菜单管理, 菜单');
              break;

            default:
              that.RecordOperation(0,'删除', '菜单管理, 按钮');
              break;
          }
          danger(publicservice)
        }
      })
    }






    // 弹出函数
    function open(row) {
      dialogService.open(NewMenuComponent,{closeOnBackdropClick: false,context: { rowdata: JSON.stringify(row), title: '编辑目录' }}).onClose.subscribe(name=>{
        if(name){
          that.updatetable(name);
        }
      });
    }

    // 样式！
    $("#menuTable").children("tbody").children("tr").children("td").attr("style", "padding: 0px 12px; text-align: center;");
    $("#menuTable tbody tr td:nth-child(2)").attr("style", "")


  }


  // update table 更新table
  updatetable(isnotresh?){
    this.publicservice.getMenu().subscribe((data:any[])=>{
      if (data.length === 0){
        // 表示token 过期，返回登录界面
        this.router.navigate([loginurl]);
      }else{
        const colums = {
          languageid: this.http.getLanguageID(),
          roles: data
        };
        // console.log("---colums--",colums)
        const table = "menu_item";
        // const method = "get_systemset_menu";
        const method = "get_systemset_menu_all";
        this.http.callRPC(table, method, colums).subscribe((result)=>{
          // console.log("---------------->>>>",result)
          const baseData = result['result']['message'][0];
          if (baseData["code"]===1){
            var menu = this.dataTranslation(baseData["message"]);
            localStorage.setItem(SYSMENU, JSON.stringify(menu));
            // 按钮
            var $table = $('#menuTable')
            $table.bootstrapTable('load', menu);
            $("#menuTable").children("tbody").children("tr").children("td").attr("style", "padding: 0px 12px; text-align: center;");
            $("#menuTable tbody tr td:nth-child(2)").attr("style", "")
            // 是否刷新目录栏
            if(isnotresh){
              // 提示刷新界面
              if(confirm("请刷新界面，已更新目录")){
                localStorage.removeItem('mulu')
                localStorage.removeItem('hidden_menu');
                location.reload();
              }else{

              }
              this.RecordOperation(1,'更新菜单管理', JSON.stringify(colums));
              // location.reload();
            }

          }else{
            this.RecordOperation(0,'更新菜单管理', JSON.stringify(colums));
          }
        })
      }

    });
  }


  ngOnDestory(){
    // 销毁table
    var $table = $('#menuTable');
    $table.bootstrapTable('desstrooy');
  }
  loadMenu(isactions?){
    // console.log(">>>>>>>>isactions<<<<<<",isactions);
    var sysmenu = localStorage.getItem(SYSMENU) == null ? [] : JSON.parse(localStorage.getItem(SYSMENU));
    if (isactions !== undefined || sysmenu.length === 0){
      // console.log("这是 系统设置的菜单界面！")
      this.publicservice.getMenu().subscribe((data:any[])=>{
        if (data.length === 0){
          // 表示token 过期，返回登录界面
          this.router.navigate([loginurl]);
        }else{
          const colums = {
            languageid: this.http.getLanguageID(),
            roles: data
          };
          // console.log("---colums--",colums)
          const table = "menu_item";
          // const method = "get_systemset_menu";
          const method = "get_systemset_menu_all";
          this.http.callRPC(table, method, colums).subscribe((result)=>{
            // console.log("---------------->>>>",result)
            const baseData = result['result']['message'][0];
            if (baseData["code"]===1){
              var menu = this.dataTranslation(baseData["message"]);
              localStorage.setItem(SYSMENU, JSON.stringify(menu));
              // 按钮
              this.RanderTable(menu);
              this.RecordOperation(1,'查看','更新菜单管理');
            }else{
              this.RecordOperation(0,'查看','更新菜单管理');
            }
          })
        }
      });

    }

  }

  dataTranslation(baseMenu) {
    // 生成父子数据结构
    // console.log("-=-=-=-=-=-=baseMenu-=-=-=-=",baseMenu)
    let nodeData = [];
    baseMenu.forEach(item => {
      let map = {};
      map["id"] = item.id;
      map["link"] = item.link;
      map["active"] = item.active;
      map["orderindex"]=item.orderindex;
      map["title"] = item.title;
      map["icon"] = item.icon;
      map["type"] = item.type;
      map["textid"] = item.textid;
      map["permission"] = item.permission === null ? null: item.permission;

      if (item.parentid === null){
        map["parentid"] = 0;
      }else{
        map["parentid"] = item.parentid;
      }
      nodeData.push(map)
    });



    return nodeData;
  }


  // 更新button_list，在修改、新增、删除后！
  updatabutton_list(){
    return new Observable((observe)=>{
      this.publicservice.getMenu().subscribe((data)=>{
        // console.log("更新button_list，在修改、新增、删除后！", data);
        if (data){
          //
          const colums = {
            languageid: this.http.getLanguageID(),
            roles: data
          };
          // console.log("---更新button_list！--",colums)
          const table = "menu_item";
          const method = "get_menu_by_roles";
          this.http.callRPC(table, method, colums).subscribe((result)=>{
            // console.log("---更新button_list！--",result)
            const baseData = result['result']['message'][0];
            if (baseData["code"] === 1){
              var button_list = [];
              baseData["message"].forEach(element => {
                if (element["type"] === 2 ){
                  var method = element["permission"].split(":")[1];
                  // info success warning danger  primary
                  switch (method) {
                    case 'add':
                      element['class']="info"
                    break;
                    case 'del':
                      element['class']="danger"
                      break;
                    case 'edit':
                      element['class']="warning"
                      break;
                    case 'query':
                      element['class']="success"
                      break;
                    case 'import':
                      element['class']="primary"
                      break;
                    case 'download':
                      element['class']="primary"
                      break;
                  }
                  button_list.push(element);
                }
              });
              localStorage.setItem(menu_button_list, JSON.stringify(button_list));
              observe.next(true)

            }else{

            }
          })
        }else{
          // else
          observe.next(false)
        }


      });

    })

  }


  // 展示状态
  success(publicservice){
    publicservice.showngxtoastr({position: 'toast-top-right', status: 'success', conent:"删除成功!"});
  }
  danger(publicservice){
    publicservice.showngxtoastr({position: 'toast-top-right', status: 'danger', conent:"删除失败!"});
  }

  // 展示状态
  editsuccess(){
    this.publicservice.showngxtoastr({position: 'toast-top-right', status: 'success', conent:"编辑成功!"});
  }
  editdanger(){
    this.publicservice.showngxtoastr({position: 'toast-top-right', status: 'danger', conent:"编辑失败!"});
  }

  // option_record
  RecordOperation(result,transactiontype, infodata){
    if(this.userinfo.getLoginName()){
      var employeeid = this.userinfo.getEmployeeID();
      var result = result; // 1:成功 0 失败
      var transactiontype = transactiontype; // '新增用户';
      var info = infodata;
      var createdby = this.userinfo.getLoginName();
      this.publicservice.option_record(employeeid, result, transactiontype, info, createdby);
    }

  }






}
