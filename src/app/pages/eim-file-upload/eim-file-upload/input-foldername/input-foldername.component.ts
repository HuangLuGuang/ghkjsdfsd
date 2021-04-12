import {Component, Input, OnInit} from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'ngx-input-foldername',
  templateUrl: './input-foldername.component.html',
  styleUrls: ['./input-foldername.component.scss'],
})
export class InputFoldernameComponent implements OnInit {
  @Input() current_path;
  value;
  input_type;
  constructor(protected ref: NbDialogRef<InputFoldernameComponent>,
              private fb: FormBuilder) { }
  validateForm!: FormGroup;
  ngOnInit(): void {
    this.input_type = this.current_path.length ? '文件夹': '试验条目';
    this.validateForm = this.fb.group({
          name: [null, [Validators.required, this.nameValidator]],
    });
  }
  cancel() {
    this.ref.close();
  }
  nameValidator = (control: FormControl): { [s: string]: boolean } => {
    const reg = new RegExp('^SY[0-9]{4}-[0-9]{6}-[0-9]{3}');
    if (!control.value) {
      return { error: true, required: true };
    } else if (this.current_path.length === 0 && !reg.test(control.value)) {
      return { confirm: true, error: true };
    }
    return {};
  };
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
