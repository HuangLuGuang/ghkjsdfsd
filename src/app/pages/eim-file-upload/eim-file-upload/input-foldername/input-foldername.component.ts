import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'ngx-input-foldername',
  templateUrl: './input-foldername.component.html',
  styleUrls: ['./input-foldername.component.scss'],
})
export class InputFoldernameComponent implements OnInit {
  value;
  constructor(protected ref: NbDialogRef<InputFoldernameComponent>,
              private fb: FormBuilder) { }
  validateForm!: FormGroup;
  ngOnInit(): void {
    this.validateForm = this.fb.group({
          name: [null, [Validators.required]],
    });
  }
  cancel() {
    this.ref.close();
  }

  submit() {
     // tslint:disable
    for (const i in this.validateForm.controls) {
          this.validateForm.controls[i].markAsDirty();
          this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid) {
        const formdata = this.validateForm.value;
        this.ref.close(formdata['name']);
    }
  }
}
