import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/users.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: any[] = [];
  filteredUsers: any[] = [];
  search: string = '';

  rolesList = [
    { key: "Admin",   label: "مدير" },
    { key: "Teacher", label: "أستاذ" },
    { key: "Parent",  label: "ولي أمر" },
    { key: "Student", label: "طالب" }
  ];

  isDialogOpen = false;
  dialogTitle = 'إضافة مستخدم';

  form!: FormGroup;
  editingId: string | null = null;
  selectedRoles: string[] = [];

  constructor(
    private fb: FormBuilder,
    private api: UserService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadUsers();
  }

  initForm() {
    this.form = this.fb.group({
      full_name_en: ['', Validators.required],
      full_name_ar: [''],
      email: ['', Validators.required],
      phone: [''],
      national_id: [''],
      is_active: [true, Validators.required],
    });
  }


  loadUsers() {
    this.api.getAll().subscribe(res => {
      this.users = res;
      this.filteredUsers = [...this.users];
    });
  }

applyFilter() {
  const s = this.search.trim().toLowerCase();

  if (!s) {
    this.filteredUsers = [...this.users];
    return;
  }

  this.filteredUsers = this.users.filter(u =>
    (u.full_name_en || '').toLowerCase().includes(s) ||
    (u.full_name_ar || '').toLowerCase().includes(s) ||
    (u.email || '').toLowerCase().includes(s) ||
    (u.phone || '').includes(s) ||
    (Array.isArray(u.roles) ? u.roles.join(',').toLowerCase() : '').includes(s)
  );
}
  openDialog() {
    this.isDialogOpen = true;
    this.dialogTitle = 'إضافة مستخدم';

    this.form.reset({ is_active: true });
    this.selectedRoles = [];
    this.editingId = null;
  }


  closeDialog() {
    this.isDialogOpen = false;
  }


  toggleRole(role: string, event: any) {
    if (event.target.checked) {
      if (!this.selectedRoles.includes(role)) {
        this.selectedRoles.push(role);
      }
    } else {
      this.selectedRoles = this.selectedRoles.filter(r => r !== role);
    }
  }

  editUser(user: any) {
    this.isDialogOpen = true;
    this.dialogTitle = 'تعديل مستخدم';
    this.editingId = user.id;

    this.form.patchValue({
      full_name_en: user.full_name_en,
      full_name_ar: user.full_name_ar,
      email: user.email,
      phone: user.phone,
      national_id: user.national_id,
      is_active: user.is_active,
    });

    this.selectedRoles = Array.isArray(user.roles) ? [...user.roles] : [];
  }

  saveUser() {
    if (!this.form.valid) {
      alert('يرجى تعبئة الحقول المطلوبة');
      return;
    }

    const newData: any = {
      full_name_en: this.form.value.full_name_en,
      full_name_ar: this.form.value.full_name_ar,
      email: this.form.value.email,
      phone: this.form.value.phone,
      national_id: this.form.value.national_id,
      is_active: this.form.value.is_active,
      roles: this.selectedRoles
    };

    if (this.editingId) {
      this.api.update(this.editingId, newData).subscribe(() => {
        this.loadUsers();
        this.closeDialog();
        this.editingId = null;
      });
    } else {
      this.api.create(newData).subscribe(() => {
        this.loadUsers();
        this.closeDialog();
      });
    }
  }


  deleteUser(id: string) {
    if (confirm("هل تريد حذف المستخدم؟")) {
      this.api.delete(id).subscribe(() => {
        this.loadUsers();
      });
    }
  }


  formatRoles(roles: any): string {
    return Array.isArray(roles) ? roles.join(', ') : roles || '';
  }
}
