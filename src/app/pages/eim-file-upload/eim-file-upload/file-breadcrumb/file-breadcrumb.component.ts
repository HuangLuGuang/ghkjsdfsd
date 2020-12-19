import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {ssotoken} from '../../../../appconfig';
import {HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'ngx-file-breadcrumb',
  templateUrl: './file-breadcrumb.component.html',
  styleUrls: ['./file-breadcrumb.component.scss'],
})
export class FileBreadcrumbComponent implements OnInit {

  @Input() current_path = [];
  @Output() breadcrumbClick: EventEmitter<any> = new EventEmitter();

  constructor() { }
  ngOnInit(): void {
  }

  // 点击 面包屑 展示指定的文件，
  goto_click_file(name) {
    const index = this.current_path.indexOf(name);
    if (index !== -1) {
      this.current_path = this.current_path.slice(0, index + 1);
    } else {
      this.current_path = [];
    }
    this.breadcrumbClick.emit(this.current_path);
  }

}
