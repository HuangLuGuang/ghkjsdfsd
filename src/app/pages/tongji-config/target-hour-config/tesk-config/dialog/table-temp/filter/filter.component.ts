import { Component, OnInit } from '@angular/core';
import { AgFilterComponent } from 'ag-grid-angular';
import {  IDoesFilterPassParams,IFilterParams, } from 'ag-grid-community';
@Component({
  selector: 'ngx-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit, AgFilterComponent  {
  filterText: Number | null | string = null;

  params: IFilterParams;
  constructor() { }

  valueGetter: (rowNode: any) => any;

  agInit(params: IFilterParams): void {
    this.params = params;
    this.valueGetter = params.valueGetter;
  }

  doesFilterPass(params: IDoesFilterPassParams) {
    const valueGetter = this.valueGetter;
    const value = valueGetter(params);

    if (this.isFilterActive()) {
      if (!value) return false;
      return Number(value) > Number(this.filterText);
    }
  }

  isFilterActive() {
    return (
      this.filterText !== null &&
      this.filterText !== undefined &&
      this.filterText !== '' &&
      this.isNumeric(this.filterText)
    );
  }

  isNumeric(n: any) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  getModel() {
    return this.isFilterActive() ? Number(this.filterText) : null;
  }

  setModel(model: any) {
    this.filterText = model;
    this.params.filterChangedCallback();
  }

  myMethodForTakingValueFromFloatingFilter(value: any) {
    this.filterText = value;
    this.params.filterChangedCallback();
  }

  onInputBoxChanged(e) {
    this.params.filterChangedCallback();
  }
  ngOnInit() {
  }

}
