import { Component, OnInit } from "@angular/core";
import { HttpserviceService } from "../../../services/http/httpservice.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { EditDelTooltipComponent } from "../../../pages-popups/prompt-diallog/edit-del-tooltip/edit-del-tooltip.component";
import { NbDialogService } from "@nebular/theme";

import { UserInfoService } from "../../../services/user-info/user-info.service";
import { PublicmethodService } from "../../../services/publicmethod/publicmethod.service";

@Component({
  selector: "ngx-gocron",
  templateUrl: "./gocron.component.html",
  styleUrls: ["./gocron.component.scss"],
})
export class GocronComponent implements OnInit {
  constructor(
    private httpservice: HttpserviceService,
    private http: HttpClient,
    private dialogService: NbDialogService,
    private userinfo: UserInfoService,
    private publicmethod: PublicmethodService
  ) {
    // 会话过期
    localStorage.removeItem("alert401flag");
  }
  nzTabPosition = "task"; // 默认进入任务定时
  listTaskData = [];
  listTaskNodeData = [];
  is_show_form = false; // 控制是否显示form 表单
  formstatus = true;
  loding = false;
  attributeRow = {};
  ngOnInit(): void {}
  ngAfterViewInit(): void {
    console.warn("初始化ngAfterViewInit");
    this.loding = true;
    this.get_cron_token();
  }
  buttonName = "";
  rowData: any; // 原始数据

  formToggletask() {
    // 控制form表单是否显示
    this.is_show_form = !this.is_show_form;
    // 返回的时候刷新数据
    // this.is_show_form ? null :  this.get_data();
    this.buttonName = "add";
    this.formstatus = !this.formstatus;
    this.datatask();
    this.datatasknode();
  }
  formToggletasknode() {
    // 控制form表单是否显示
    this.is_show_form = !this.is_show_form;
    // 返回的时候刷新数据
    // this.is_show_form ? null :  this.get_data();
    this.buttonName = "tasknode";
    this.formstatus = !this.formstatus;
    this.datatask();
    this.datatasknode();
  }

  updatetask(data): void {
    // 控制form表单是否显示
    this.is_show_form = !this.is_show_form;
    this.buttonName = "attribute";
    this.attributeRow = data;
    this.formstatus = !this.formstatus;
    this.datatask();
    this.datatasknode();
  }
  dialogisVisible = false;
  taskdata = [];
  dialogCancel(): void {
    this.dialogisVisible = false;
  }
  // 换页操作
  currentPageDataChange($event): void {
    // this.listOfDisplayData = $event;
    // this.refreshStatus();
  }

  disable(id): void {
    const url = `/api/task/disable/${id}`;
    const go_cron_token = localStorage.getItem("gocron_token");
    const hearder = {
      headers: new HttpHeaders({
        "Auth-Token": go_cron_token,
      }),
    };
    this.http.post(url, null, hearder).subscribe((res) => {
      console.warn("res", res);
      if (res["message"] === "操作成功") {
        console.warn("禁用成功", res);
        this.RecordOperation("禁用", 1, "任务:" + JSON.stringify(res));
        this.dialogService
          .open(EditDelTooltipComponent, {
            closeOnBackdropClick: false,
            context: { title: "提示", content: `禁用成功！` },
          })
          .onClose.subscribe((name) => {
            console.warn("name", name);
          });
        this.datatask();
        this.datatasknode();
      } else {
        console.warn("禁用失败", res);
        this.RecordOperation("禁用", 0, "任务:" + JSON.stringify(res));
        this.dialogService
          .open(EditDelTooltipComponent, {
            closeOnBackdropClick: false,
            context: { title: "提示", content: `禁用失败！` },
          })
          .onClose.subscribe((name) => {
            console.warn("name", name);
          });
      }
    });
  }

  enable(id): void {
    const url = `/api/task/enable/${id}`;
    const go_cron_token = localStorage.getItem("gocron_token");
    const hearder = {
      headers: new HttpHeaders({
        "Auth-Token": go_cron_token,
      }),
    };
    this.http.post(url, null, hearder).subscribe((res) => {
      console.warn("res启用", res);
      if (res["message"] === "操作成功") {
        console.warn("启用成功", res);
        this.RecordOperation("启用", 1, "任务:" + JSON.stringify(res));
        this.dialogService
          .open(EditDelTooltipComponent, {
            closeOnBackdropClick: false,
            context: { title: "提示", content: `启用成功！` },
          })
          .onClose.subscribe((name) => {
            console.warn("name", name);
          });
        this.datatask();
        this.datatasknode();
      } else {
        console.warn("启用失败", res);
        this.RecordOperation("启用", 0, "任务:" + JSON.stringify(res));
        this.dialogService
          .open(EditDelTooltipComponent, {
            closeOnBackdropClick: false,
            context: { title: "提示", content: `启用失败！` },
          })
          .onClose.subscribe((name) => {
            console.warn("name", name);
          });
      }
    });
  }

  deletetask(id): void {
    const url = `/api/task/remove/${id}`;
    const go_cron_token = localStorage.getItem("gocron_token");
    const hearder = {
      headers: new HttpHeaders({
        "Auth-Token": go_cron_token,
      }),
    };
    this.http.post(url, null, hearder).subscribe((res) => {
      console.warn("删除res", res);
      if (res["message"] === "操作成功") {
        console.warn("删除任务成功", res);
        this.RecordOperation("删除", 1, "任务:" + JSON.stringify(res));
        this.dialogService
          .open(EditDelTooltipComponent, {
            closeOnBackdropClick: false,
            context: { title: "提示", content: `删除任务成功！` },
          })
          .onClose.subscribe((name) => {
            console.warn("name", name);
          });
        this.datatask();
        this.datatasknode();
      } else {
        console.warn("删除任务失败", res);
        this.RecordOperation("删除", 0, "任务:" + JSON.stringify(res));
        this.dialogService
          .open(EditDelTooltipComponent, {
            closeOnBackdropClick: false,
            context: { title: "提示", content: `删除任务失败！` },
          })
          .onClose.subscribe((name) => {
            console.warn("name", name);
          });
      }
    });
  }
  deletetasknode(id): void {
    console.warn("删除任务节点", id);
    const url = `/api/host/remove/${id}`;
    const go_cron_token = localStorage.getItem("gocron_token");
    const hearder = {
      headers: new HttpHeaders({
        "Auth-Token": go_cron_token,
      }),
    };
    this.http.post(url, null, hearder).subscribe((res) => {
      console.warn("res", res);
      if (res["message"] === "操作成功") {
        console.warn("删除任务节点成功", res);
        this.RecordOperation("删除", 1, "任务节点:" + JSON.stringify(res));
        this.dialogService
          .open(EditDelTooltipComponent, {
            closeOnBackdropClick: false,
            context: { title: "提示", content: `删除任务节点成功！` },
          })
          .onClose.subscribe((name) => {
            console.warn("name", name);
          });
        this.datatask();
        this.datatasknode();
      } else {
        console.warn("删除任务节点失败", res);
        this.RecordOperation("删除", 0, "任务节点:" + JSON.stringify(res));
        this.dialogService
          .open(EditDelTooltipComponent, {
            closeOnBackdropClick: false,
            context: {
              title: "提示",
              content: `删除任务节点失败！` + res["message"],
            },
          })
          .onClose.subscribe((name) => {
            console.warn("name", name);
          });
      }
    });
  }

  get_cron_token() {
    this.httpservice.get_gocron_token().subscribe((token_res) => {
      console.warn("go_cron_token", token_res);
      const go_cron_token = token_res["gocron_token"];
      localStorage.setItem("gocron_token", go_cron_token);
      this.datatask();
      this.datatasknode();
    });
  }
  results = [];
  datatask(): void {
    const url = `/api/task?page_size=20&page=1&id=&protocol=&name=&tag=&host_id=&status=`;
    const go_cron_token = localStorage.getItem("gocron_token");
    const hearder = {
      headers: new HttpHeaders({
        "Auth-Token": go_cron_token,
      }),
    };
    this.http.get(url, hearder).subscribe((res) => {
      console.warn("res", res);
      this.listTaskData = res["data"]["data"];
    });
  }

  datatasknode(): void {
    const url = `/api/host?page_size=20&page=1&id=&name=&alias=`;
    const go_cron_token = localStorage.getItem("gocron_token");
    const hearder = {
      headers: new HttpHeaders({
        "Auth-Token": go_cron_token,
      }),
    };
    this.http.get(url, hearder).subscribe((res) => {
      console.warn("res", res);
      this.listTaskNodeData = res["data"]["data"];
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
      this.publicmethod.option_record(
        employeeid,
        result,
        transactiontype,
        info,
        createdby
      );
    }
  }
}
