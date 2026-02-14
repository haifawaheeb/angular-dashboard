import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface AuthRecord {
  __backendId?: string;
  id: string;
  user_id: string;
  method: 'password' | 'fingerprint' | 'face';
  password_hash?: string | null;
  biometric_data?: string | null;
  is_primary: boolean;
  last_used_at?: string | null;
  created_at: string;
}
@Component({
  selector: 'app-auth-credentials',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth-credentials.component.html',
  styleUrls: ['./auth-credentials.component.scss'],
})
export class AuthCredentialsComponent {

  records: AuthRecord[] = [];
  editingRecord: AuthRecord | null = null;
  isLoading = false;

  form: AuthRecord = this.createEmptyForm();

  ngOnInit(): void {
    // لاحقاً: ربط DataSDK أو Service
  }

  createEmptyForm(): AuthRecord {
    return {
      id: crypto.randomUUID(),
      user_id: '',
      method: 'password',
      password_hash: null,
      biometric_data: null,
      is_primary: false,
      last_used_at: null,
      created_at: new Date().toISOString()
    };
  }

  onMethodChange() {
    this.form.password_hash = null;
    this.form.biometric_data = null;
  }

  submit() {
    if (this.isLoading) return;

    this.isLoading = true;

    if (this.editingRecord) {
      Object.assign(this.editingRecord, this.form);
    } else {
      this.records.push({ ...this.form, __backendId: crypto.randomUUID() });
    }

    this.resetForm();
    this.isLoading = false;
  }

  edit(record: AuthRecord) {
    this.editingRecord = record;
    this.form = { ...record };
  }

  cancelEdit() {
    this.resetForm();
  }

  delete(record: AuthRecord) {
    this.records = this.records.filter(r => r !== record);
  }

  resetForm() {
    this.form = this.createEmptyForm();
    this.editingRecord = null;
  }

  formatDate(date?: string | null): string {
    if (!date) return 'غير محدد';
    return new Date(date).toLocaleString('ar-SA');
  }
}
