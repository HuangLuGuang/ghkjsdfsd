import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
@Component({
  selector: 'ngx-file-name',
  templateUrl: './file-name.component.html',
  styleUrls: ['./file-name.component.scss']
})
export class FileNameComponent implements OnInit, ICellRendererAngularComp {
  private params: any;
  fileicon = "folder-outline"; // 文件夹 0 image-outline 图片 2  file-outline 文件 1
  constructor() { }
  filename;

  ngOnInit(): void {
    var filename = this.params.node.data.filename;
    this.filename = filename;
    console.log("file-name: ", this.filename)
  }

  agInit(params: any): void {
    this.params = params;
  }

  refresh(): boolean {
    return false;
  }

  // 点击，如果是目录就进入目录
  get_children(filename){
    /*
    * 1、目录 return 0
    * 2、文件 return 1
    * 3、图片 return 2
    */
   this.params.clicked(filename);
  }


}
