import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'dalil-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dalil-dialog.component.html',
  styleUrls: ['./dalil-dialog.component.css']
})
export class DalilDialogComponent {

  @Input() title: string = '';
  @Input() width: string = '900px';
  @Input() height: string = 'auto';
  @Input() showClose: boolean = true;

  constructor(public dialogRef: MatDialogRef<DalilDialogComponent>) {}

  close() {
    this.dialogRef.close();
  }

}
