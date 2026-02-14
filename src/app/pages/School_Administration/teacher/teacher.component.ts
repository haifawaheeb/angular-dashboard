import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeacherService } from '../../../services/teacher.service';

@Component({
  selector: 'dalil-teacher-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeachersComponent implements OnInit {

  teachers: any[] = [];
  filtered: any[] = [];

  search = '';
  isDialogOpen = false;
  dialogTitle = 'إضافة معلم';
  editingId: string | null = null;

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private api: TeacherService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.load();
  }

  initForm() {
    this.form = this.fb.group({
      full_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      is_active: [true]
    });
  }

  load() {
    this.api.getAlls().subscribe(res => {
      this.teachers = res;
      this.filtered = [...res];
    });
  }

  applyFilter() {
    const s = this.search.toLowerCase();
    this.filtered = this.teachers.filter(t =>
      t.full_name.toLowerCase().includes(s) ||
      t.email.toLowerCase().includes(s)
    );
  }

  openDialog() {
    this.isDialogOpen = true;
    this.dialogTitle = 'إضافة معلم';
    this.editingId = null;
    this.form.reset({ is_active: true });
  }

  closeDialog() {
    this.isDialogOpen = false;
  }

  edit(item: any) {
    this.isDialogOpen = true;
    this.dialogTitle = 'تعديل معلم';
    this.editingId = item.id;
    this.form.patchValue(item);
  }

  save() {
    if (this.form.invalid) return;

    const req$ = this.editingId
      ? this.api.update(this.editingId, this.form.value)
      : this.api.create(this.form.value);

    req$.subscribe(() => {
      this.load();
      this.closeDialog();
    });
  }

  delete(id: string) {
    if (!confirm('هل أنتِ متأكدة من الحذف؟')) return;
    this.api.delete(id).subscribe(() => this.load());
  }
}
