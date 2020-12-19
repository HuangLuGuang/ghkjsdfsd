import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
@Component({
  selector: 'ngx-file-name',
  templateUrl: './file-name.component.html',
  styleUrls: ['./file-name.component.scss'],
})
export class FileNameComponent implements OnInit, ICellRendererAngularComp {
  private params: any;
  constructor() { }
  fileicon = '';
  file;

  ngOnInit(): void {
    const icons = {
      0: 'folder',
      1: 'file',
    };
    this.file = this.params.node.data;
    this.fileicon = icons[this.file['filetype']];
  }

  agInit(params: any): void {
    this.params = params;
  }

  refresh(): boolean {
    return false;
  }

  get_children(file) {
   this.params.clicked(file);
  }


}
