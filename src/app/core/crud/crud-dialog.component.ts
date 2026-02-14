import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CrudField } from './crud.config';

@Component({
  selector: 'crud-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './crud-dialog.component.html',
  styleUrls: ['./crud-dialog.component.scss']
})
export class CrudDialogComponent {

  @Input() title = '';
  @Input() fields: CrudField[] = [];
  @Input() model: any = {};

  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    const group: any = {};

    this.fields.forEach(f => {
      group[f.name] = [this.model[f.name] ?? '', f.required ? [] : []];
    });

    this.form = this.fb.group(group);
  }

  submit() {
    this.save.emit(this.form.value);
  }
}
