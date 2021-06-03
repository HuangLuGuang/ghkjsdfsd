import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-del',
  templateUrl: './del.component.html',
  styleUrls: ['./del.component.scss']
})
export class DelComponent implements OnInit {
  @Input()rowData;
  @Output()del:EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  del_click(){
    this.del.emit({
      code:'1',
      row:this.rowData
    })
  }
}
