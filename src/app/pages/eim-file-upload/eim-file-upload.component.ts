import { DatePipe } from "@angular/common";
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { PublicmethodService } from "../../services/publicmethod/publicmethod.service";
import { UserInfoService } from "../../services/user-info/user-info.service";
import { DeleteButtonComponent } from "./eim-file-upload/delete-button/delete-button.component";

import {
  HttpClient,
  HttpEvent,
  HttpHeaders,
  HttpRequest,
  HttpResponse,
} from "@angular/common/http";
import { UploadXHRArgs } from "ng-zorro-antd";
import { NzModalRef, NzModalService } from "ng-zorro-antd/modal";
import { FileNameComponent } from "./eim-file-upload/file-name/file-name.component";
import { ssotoken } from "../../appconfig";
import { NbDialogService } from "@nebular/theme";
import { InputFoldernameComponent } from "./eim-file-upload/input-foldername/input-foldername.component";
import { NzMessageService } from "ng-zorro-antd/message";

@Component({
  selector: "ngx-eim-file-upload",
  templateUrl: "./eim-file-upload.component.html",
  styleUrls: ["./eim-file-upload.component.scss"],
})
export class EimFileUploadComponent implements OnInit, AfterViewInit {
  @ViewChild("ag_Grid") agGrid: any;
  @ViewChild("mybreadcrumb") mybreadcrumb: any; // 面包屑
  token = localStorage.getItem(ssotoken)
    ? JSON.parse(localStorage.getItem(ssotoken)).token
    : "";
  hearder = {
    headers: new HttpHeaders({
      Authorization: "Bearer " + this.token,
    }),
  };

  employeeid = this.userinfo.getEmployeeID();
  loading = false; // 加载
  refresh = false; // 刷新tabel
  button; // 权限button
  current_path = [];
  rowSelection = [];

  tableDatas = {
    style: "width: 100%; height: 588px",
    totalPageNumbers: 0, // 总页数
    PageSize: 10, // 每页 10条数据
    isno_refresh_page_size: false, // 是否重新将 每页多少条数据，赋值为默认值
    columnDefs: [
      // 列字段 多选：headerCheckboxSelection checkboxSelection , flex: 1 自动填充宽度  pinned: 'left' 固定在左侧！
      {
        field: "filesize",
        headerName: "文件大小",
        resizable: true,
        minWidth: 10,
        sortable: true,
      },
      {
        field: "people",
        headerName: "上传人",
        resizable: true,
        minWidth: 10,
        sortable: true,
      },
      {
        field: "time",
        headerName: "修改时间",
        resizable: true,
        minWidth: 10,
        flex: 1,
        sortable: true,
      },
    ],
    rowData: [],
  };

  private gridData = [];

  // 上传文件
  fileList = []; //  设置已上传的内容
  // nzFileType = 'file,image/jpeg'; // 接受上传文件的类型 image/gif
  nzName = "file"; // 发到后台的文件参数名

  filename_col; // 文件名称组件
  del_file_col; // 删除文件组件
  confirmModal?: NzModalRef; // For testing by now

  public documentType;

  constructor(
    private userinfo: UserInfoService,
    private publicservice: PublicmethodService,
    private datepipe: DatePipe,
    private message: NzMessageService,
    private http: HttpClient,
    private dialogService: NbDialogService
  ) {
    // 会话过期
    localStorage.removeItem("alert401flag");
    // 得到该页面下的button
    const roleid = this.userinfo.getEmployeeRoleID();
    console.warn("this.roleid----->", roleid);
    this.publicservice.get_buttons_bypath(roleid).subscribe((result) => {
      this.button = result;
      console.warn("this.button----->", this.button);
      localStorage.setItem("buttons_list", JSON.stringify(result));
    });
  }

  ngOnInit(): void {
    this.current_path.length = 0;
    this.rowSelection.length = 0;
    const that = this;
    // 文件名称
    this.filename_col = {
      field: "filename",
      headerName: "名称",
      cellRendererFramework: FileNameComponent,
      width: 300,
      headerCheckboxSelection: true,
      checkboxSelection: true,
      autoHeight: true,
      fullWidth: true,
      minWidth: 50,
      resizable: true,
      cellRendererParams: {
        clicked: function (data: any) {
          // 点击文件夹 访问文件夹里的数据
          if (data.filetype === 0) {
            that.get_children_path_files(data.filename);
          }
        },
      },
    };

    // 删除文件
    this.del_file_col = {
      field: "delete",
      headerName: "操作",
      resizable: true,
      width: 150,
      pinned: "right",
      cellRendererFramework: DeleteButtonComponent,
      cellRendererParams: {
        clicked: function (data: any) {
          // 点击删除时，调用
          const ref = that.publicservice.showConfirm(
            "提示",
            `确认要删除${data["filename"]}吗？`
          );
          ref.afterClose.subscribe((result) => {
            result === 1 ? that.delete_file(data["filename"]) : null;
          });
        },
      },
    };
  }

  ngAfterViewInit() {
    // 初始化table
    this.get_current_path_files();
    this.loading = false;
    this.tableDatas.columnDefs.unshift(this.filename_col);
    this.tableDatas.columnDefs.push(this.del_file_col);
  }

  onBreadcrumbClick(path) {
    this.current_path = path;
    this.get_current_path_files();
  }

  onCreateFolder() {
    this.dialogService
      .open(InputFoldernameComponent)
      .onClose.subscribe((name) => {
        if (!name || name.trim().length === 0) {
          return;
        }
        const params = {
          folder_name: name,
          current_path: this.current_path,
          createdby: this.userinfo.getName(),
        };
        this.http
          .post<any>("/api/v1/new_folder", params, this.hearder)
          .subscribe((res) => {
            if (res["isSuccess"] === true) {
              this.get_current_path_files();
              this.RecordOperation(
                "创建试验条目",
                1,
                JSON.stringify(params.folder_name)
              );
            } else if (res["msg"] === "Folder already exists") {
              const toastr = {
                status: "danger",
                position: "toast-top-right",
                conent: "该文件夹已存在",
              };
              this.publicservice.showngxtoastr(toastr);
              this.RecordOperation(
                "创建试验条目",
                0,
                JSON.stringify(params.folder_name) +
                  JSON.stringify(toastr.conent)
              );
            } else {
              const toastr = {
                status: "danger",
                position: "toast-top-right",
                conent: "文件夹创建失败，请重试",
              };
              this.publicservice.showngxtoastr(toastr);
              this.RecordOperation(
                "创建试验条目",
                0,
                JSON.stringify(params.folder_name)
              );
            }
          });
      });
  }

  onSendToS3() {
    if (this.agGrid.selectedRows.length === 0) {
      const toastr = {
        status: "info",
        position: "toast-top-right",
        conent: `请选择要上传的文件或文件夹`,
      };
      this.publicservice.showngxtoastr(toastr);
      return;
    }
    const params = {
      current_path: this.current_path,
      selected_file: this.agGrid.selectedRows,
      username: this.userinfo.getName(),
    };
    const id = this.message.loading(`正在发送到S3..`, { nzDuration: 0 })
      .messageId;
    this.http
      .post("/api/v1/send_to_s3", params, this.hearder)
      .subscribe((response) => {
        this.message.remove(id);
        if (response["isSuccess"] === true) {
          this.refresh_table();
          this.RecordOperation(
            "发送到S3",
            1,
            JSON.stringify(params.selected_file)
          );
        } else {
          const toastr = {
            status: "danger",
            position: "toast-top-right",
            conent: `发送失败，请重试`,
          };
          this.publicservice.showngxtoastr(toastr);
          this.RecordOperation(
            "发送到S3",
            0,
            JSON.stringify(params.selected_file)
          );
        }
      });
  }

  // 获取当前路径下的所有文件
  get_current_path_files() {
    this.rowSelection.length = 0;
    const body = {
      current_path: this.current_path,
    };
    this.http
      .post<any>("/api/v1/get_files", body, this.hearder)
      .subscribe((result) => {
        if (result["isSuccess"] === true) {
          this.gridData = result["all_files"];
          this.tableDatas.rowData = this.gridData;
          this.tableDatas.totalPageNumbers = this.gridData.length;
          this.agGrid.init_agGrid(this.tableDatas); // 告诉组件刷新！
        }
      });
  }

  // 获取当前文件夹下子文件夹下的所有文件
  // 点击文件夹进入
  // 防止多次点击 push多次值，应获取子文件夹成功后再push到current_path
  get_children_path_files(name) {
    const body = {
      current_path: [...this.current_path, name],
    };
    this.http
      .post<any>("/api/v1/get_files", body, this.hearder)
      .subscribe((result) => {
        if (result["isSuccess"] === true) {
          this.gridData = result["all_files"];
          this.tableDatas.rowData = this.gridData;
          this.tableDatas.totalPageNumbers = this.gridData.length;
          this.agGrid.init_agGrid(this.tableDatas); // 告诉组件刷新
          // 更新当前路径
          this.current_path.push(name);
        }
      });
  }

  delete_file(filename) {
    const params = {
      filename: filename,
      current_path: [...this.current_path, filename],
      lastdeletedby: this.userinfo.getName(),
    };
    this.http
      .post("/api/v1/delete_file", params, this.hearder)
      .subscribe((result) => {
        if (result["isSuccess"] === true) {
          this.refresh_table();
          this.RecordOperation("删除", 1, JSON.stringify(filename));
        } else {
          this.RecordOperation("删除", 0, JSON.stringify(filename));
        }
      });
  }

  // 上传文件时改变状态
  uploadStatus(filedata) {
    console.warn("filedata", filedata);
  }

  // 覆盖默认的上传行为，自定义实现上传！
  customReq = (item: UploadXHRArgs) => {
    const formData = new FormData();
    formData.append("file", item.file as any);
    formData.append("username", this.userinfo.getLoginName());
    formData.append("current_path", JSON.stringify(this.current_path));

    const id = this.message.loading(`${item.file.name} 文件上传中..`, {
      nzDuration: 0,
    }).messageId;
    const req = new HttpRequest("POST", item.action, formData, this.hearder);
    return this.http.request(req).subscribe((event: HttpEvent<{}>) => {
      if (event instanceof HttpResponse) {
        this.message.remove(id);
        const body = event.body;
        if (body["isSuccess"] === true) {
          this.refresh_table();
          item.onSuccess(event.body, item.file, event);
          this.RecordOperation(
            "上传文件",
            1,
            "文件名称：" + JSON.stringify(item.file)
          );
        } else if (body["msg"] === "file already exists") {
          const toastr = {
            status: "danger",
            position: "toast-top-right",
            conent: `${body["filename"]}已存在`,
          };
          this.publicservice.showngxtoastr(toastr);
          this.RecordOperation("上传文件", 0, JSON.stringify(toastr.conent));
        } else {
          const toastr = {
            status: "danger",
            position: "toast-top-right",
            conent: `${body["filename"]}上传失败，请重试`,
          };
          this.publicservice.showngxtoastr(toastr);
          this.RecordOperation("上传文件", 0, JSON.stringify(toastr.conent));
        }
      }
    });
  };

  // 重置、刷新
  refresh_table() {
    this.get_current_path_files();
  }

  // 更新table
  update_agGrid(event?) {
    // event 是列数据
    if (event !== undefined) {
      this.gridData.push(...event);
      this.tableDatas.rowData = this.gridData;
      this.tableDatas.totalPageNumbers = this.gridData.length;
      this.agGrid.update_agGrid(this.tableDatas); // 告诉组件刷新！
      this.RecordOperation("更新", 1, "试验结果:" + JSON.stringify(event));
    } else {
      this.RecordOperation("更新", 0, "试验结果");
    }
  }

  // option_record
  RecordOperation(option, result, infodata) {
    if (this.userinfo.getLoginName()) {
      var employeeid = this.employeeid;
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
