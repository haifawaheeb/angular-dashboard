import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  NonNullableFormBuilder,
  Validators
} from '@angular/forms';

import { RolesFormModel, RolePermission } from '../../../core/models/roles.model';


@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
})
export class RolesComponent {

  readonly permissionsList: { label: string; value: RolePermission }[] = [
    { label: 'مدير', value: 'admin' },
    { label: 'أستاذ', value: 'teacher' },
    { label: 'طالب صف أول', value: 'student1' },
    { label: 'طالب صف ثاني', value: 'student2' },
    { label: 'طالب صف ثالث', value: 'student3' },
    { label: 'طالب صف رابع', value: 'student4' },
    { label: 'طالب صف خامس', value: 'student5' },
    { label: 'طالب صف سادس', value: 'student6' },
  ];

  statusMessage = '';
  statusType: 'success' | 'info' | 'error' | null = null;

  form = this.fb.group({
    username: [''],
    email: ['', Validators.email],
    whatsapp: [''],
    group: [''],
    password: [''],
    confirmPassword: [''],
    loginCoordinates: [''],
    address: [''],
    grade: [''],
    permission: [[] as RolePermission[]],
    editAllPermissions: [false],
  });

constructor(private fb: NonNullableFormBuilder) {}


  togglePermission(value: RolePermission, checked: boolean) {
    const current = this.form.value.permission ?? [];
    this.form.patchValue({
      permission: checked
        ? [...new Set([...current, value])]
        : current.filter(v => v !== value),
    });
  }

  isChecked(value: RolePermission): boolean {
    return this.form.value.permission?.includes(value) ?? false;
  }


  save() {
    this.showStatus('تم حفظ البيانات بنجاح ✓', 'success');
    console.log(this.form.value as RolesFormModel);
  }

  edit() {
    this.showStatus('تم تعديل البيانات بنجاح ✓', 'success');
  }

  search() {
    this.showStatus('جاري البحث...', 'info');
  }

  exit() {
    this.showStatus('تم تسجيل الخروج', 'info');
  }

  resetDefaults() {
    this.form.reset({
      username: '',
      email: '',
      whatsapp: '',
      group: '',
      password: '',
      confirmPassword: '',
      loginCoordinates: '',
      address: '',
      grade: '',
      permission: [],
      editAllPermissions: false,
    });
    this.showStatus('تم استعادة الإعدادات الافتراضية', 'success');
  }

  fetchOther() {
    this.showStatus('تم جلب الصلاحيات لمستخدم آخر', 'success');
  }

  private showStatus(message: string, type: 'success' | 'info' | 'error') {
    this.statusMessage = message;
    this.statusType = type;
    setTimeout(() => (this.statusType = null), 3000);
  }
}
