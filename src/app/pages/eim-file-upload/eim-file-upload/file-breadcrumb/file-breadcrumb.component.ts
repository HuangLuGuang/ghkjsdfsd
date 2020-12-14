import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'ngx-file-breadcrumb',
  templateUrl: './file-breadcrumb.component.html',
  styleUrls: ['./file-breadcrumb.component.scss']
})
export class FileBreadcrumbComponent implements OnInit {

  @Output() vreadcrumb_get_files_child:EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  data? = [
    { filename: "上传文件"},
  ];

  // init 数据
  init_breadcrumb(test_data){
    if (this.data.includes(test_data[0])){ // true:存在，false：不存在
    }else{
      this.data.push(...test_data);
    }
    // console.log("初始化面包屑数据：", test_data);
    // console.log("this.data", this.data);
  };

  // 点击 面包屑 展示指定的文件，
  goto_click_file(item){
    console.log("点击 面包屑 展示指定的文件", item);
    // 调用父组件函数, 传入点击面包屑的数据，更新table
    this.vreadcrumb_get_files_child.emit(item)
  }

}
