import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

// ⭐ Material imports
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'dynamic-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,

    // ⭐ مهم جداً
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './dynamic-page.component.html',
  styleUrls: ['./dynamic-page.component.scss']
})
export class DynamicPageComponent {

  @Input() config!: {
    title: string;
    dialogTitle: string;

    // ⭐ أضفناه هنا — هذا هو السبب الأول للخطأ
    formConfig?: {
      key: string;
      label: string;
      type: string;
      required?: boolean;
      options?: { key: string; label: string }[];
    }[];

    stagesList?: any[];
    gradesList?: any[];
    coursesList?: any[];
    signMediaList?: any[];

    showVideoUpload?: boolean;
    showThumbnailUpload?: boolean;
    onVideoSelected?: (e: any) => void;
    onThumbnailSelected?: (e: any) => void;

    sessionsList?: any[];
    studentsList?: any[];
    attendanceStatusList?: { key: string; label: string }[];
    lessonTypes?: { key: string; label: string }[];

    columns: { key: string; label: string }[];

    data: any[];
    form: FormGroup;

    rolesList?: { key: string; label: string }[];
    toggleRole?: (role: string, e: any) => void;

    methodsList?: { key: string; label: string }[];

    onAdd: () => void;
    onSave: () => void;
    onDelete: (id: any) => void;
  };
isDialogOpen = false;

openDialog() {

  this.config.onAdd();
  this.isDialogOpen = true;
}

closeDialog() {
  this.isDialogOpen = false;
}


}
