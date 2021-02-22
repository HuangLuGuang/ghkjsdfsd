import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ViewChildren,
  TemplateRef,
  Output,
  EventEmitter,
} from "@angular/core";

// 初始化应用程序的翻译服务
import { TranslateService, LangChangeEvent } from "@ngx-translate/core";

// 设备跟踪
import { DeviceTraceComponent } from "../device-trace/device-trace.component";
import { NbDialogService } from "@nebular/theme";
import { DeviceEditComponent } from "../device-edit/device-edit.component";

import { NB_WINDOW, NbMenuService } from "@nebular/theme";
import { map, startWith, filter } from "rxjs/operators";
import { DeviceOrderComponent } from "../device-order/device-order.component";
import { DeviceDetailInfoComponent } from "../device-detail-info/device-detail-info.component";

declare let $;

@Component({
  selector: "ngx-all",
  templateUrl: "./all.component.html",
  styleUrls: ["./all.component.scss"],
})
export class AllComponent implements OnInit {
  @Input("datas") datas: any[];
  @ViewChildren("item") itemlist;
  // @ViewChild('item') item;
  @Output() private send_user_deviceInfo = new EventEmitter<any>();
  @ViewChild("tabs", { read: TemplateRef }) templateTabs: TemplateRef<any>;

  component: any = "Hello";

  // 根据得到的用户得到设备信息
  user_deviceInfo = {
    it: "",
    listitem: "",
  };

  // more
  moreitems = [{ title: "设备指令" }, { title: "设备详情" }];

  currentLangue = "zh-CN";

  constructor(
    private translate: TranslateService,
    private dialogService: NbDialogService,
    private nbMenuService: NbMenuService
  ) {
    // 会话过期
    localStorage.removeItem("alert401flag");
    // 当切换语言时执行
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      console.log("监听语言变化： ", event.lang);
      if (event.lang != this.currentLangue) {
        this.moreitems = [
          { title: "Device order" },
          { title: "Device detail" },
        ];
      } else {
        this.moreitems = [{ title: "设备指令" }, { title: "设备详情" }];
      }
    });
    // 加载时，进行翻译
    this.translate.setDefaultLang(this.currentLangue);
  }

  ngOnInit(): void {
    // more item hit
    this.nbMenuService
      .onItemClick()
      .pipe(
        filter(({ tag }) => tag === "my-more-menu"),
        map(({ item: { title } }) => title)
      )
      .subscribe((title) => {
        this.order(title);
      });
    console.log("++++++++++++++++++++++++++=datas", this.datas);
  }

  ngAfterViewInit() {}

  ngOnDestroy() {
    this.datas = [];
  }
  // 让父组件调用
  get_selectdata(selecteddata, open_close) {
    // console.error("----------selecteddata-----------",selecteddata);
    setTimeout(() => {
      this.itemlist.forEach((element) => {
        if (open_close === "open") {
          element.open();
        } else {
          element.close();
        }
      });
    }, 200);
  }

  // 点击下拉框
  changeComponent(child, a, index) {
    var id = child + "_" + index;
    var myclass = "button_basic";
    this.user_deviceInfo.it = child;
    this.user_deviceInfo.listitem = a;
    this.component = this.templateTabs;
    console.log("点击某个设备： ", this.user_deviceInfo);

    // 更爱button的样式
    $("." + myclass).attr("style", "background-color:#edf1f7");
    $("#" + id).attr("style", "background-color:#53e88f");

    // 将数据传递给父组件！
    this.send_user_deviceInfo.emit(this.user_deviceInfo);
  }

  // 轨迹 事件
  path(user_deviceInfo) {
    console.log("=====轨迹 事件====", user_deviceInfo);
    // this.locastoragservice.set("user_deviceInfo", user_deviceInfo);
    // this.router.navigate(['/pages/gps/path/']);
  }
  // 设备编辑-弹出组件
  edit(user_deviceInfo) {
    const context = { text: user_deviceInfo };
    this.dialogService.open(
      DeviceEditComponent,
      { closeOnBackdropClick: false, context } // 无背景、可滚动、参数
    );
  }

  // 设备指令
  order(user_deviceInfo) {
    console.error("设备指令", user_deviceInfo);
    const context = { text: this.user_deviceInfo };
    this.dialogService
      .open(
        DeviceOrderComponent,
        { closeOnBackdropClick: false, context } // 无背景、可滚动
      )
      .onClose.subscribe((result) => {});
  }

  // 设备详情
  detail(user_deviceInfo) {
    const context = { text: this.user_deviceInfo };
    // this.window.alert("这是-设备详情");
    console.error("设备详情", user_deviceInfo);
    this.dialogService
      .open(
        DeviceDetailInfoComponent,
        { closeOnBackdropClick: false, context } // 无背景、可滚动
      )
      .onClose.subscribe((result) => {});
  }

  // 设备跟踪
  trace(user_deviceInfo) {
    const context = { text: user_deviceInfo };
    this.dialogService.open(
      DeviceTraceComponent,
      { closeOnBackdropClick: false, hasScroll: true, context } // 无背景、可滚动
    );
  }
}
