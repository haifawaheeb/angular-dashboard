import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'dynamic-dialog',
  templateUrl: './dynamic-dialog.component.html'
})
export class DynamicDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DynamicDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public config: any
  ) {}

  save() {
    this.config.onSave();
    this.dialogRef.close();
  }
}
