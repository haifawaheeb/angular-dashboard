import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// import { AttendanceRecordsService } from '../../../services/attendanceRecords.service';
import { LessonSessionsService } from '../../../services/lessons_session.service';
import { UserService } from '../../../services/users.service';
import {AttendanceRecordsService , AttendanceRecord } from '../../../services/attendanceRecords.service';

type DropDownItem = { id: string; label: string };

@Component({
  selector: 'app-attendance-records',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './attendance-records.component.html',
  styleUrl: './attendance-records.component.scss',
})
export class AttendanceRecordsComponent implements OnInit {

  // Table
  records: any[] = [];
  filtered: any[] = [];
  search = '';

  // Dropdowns
  students: DropDownItem[] = [];
  sessions: DropDownItem[] = [];

  // Dialog
  isDialogOpen = false;
  dialogTitle = 'إضافة سجل';
  editingId: string | null = null;

  // Form
  form!: FormGroup;

  trackById = (_: number, item: any) => item?.id ?? item;

 constructor(
  private fb: FormBuilder,
  private recordsApi: AttendanceRecordsService,
  private apiUser: UserService,
  private lessApi: LessonSessionsService
) {}


  ngOnInit(): void {
    this.initForm();
    this.loadAll();
  }

  private initForm(): void {
    this.form = this.fb.group({
      student_id: ['', Validators.required],
      session_id: ['', Validators.required],
      status: ['present', Validators.required],
    });
  }

  loadAll(): void {
 this.recordsApi.getAll().subscribe((res: AttendanceRecord[]) => {
  this.records = res;
  this.filtered = [...res];
    });
  }

  private loadStudents(): void {
    this.apiUser.getAll().subscribe((res: any[]) => {
      const list = res ?? [];

      const onlyStudents = list.filter(u =>
        u.role === 'student' || u.user_role === 'student' || u.is_student === true
      );

      const finalList = onlyStudents.length ? onlyStudents : list;

      this.students = finalList.map(u => ({
        id: u.id,
        label: (u.full_name ||
          `${u.first_name ?? ''} ${u.last_name ?? ''}`.trim() ||
          u.username ||
          u.email ||
          u.id),
      }));
    });
  }

  private loadSessions(): void {
    this.lessApi.getAll().subscribe((res: any[]) => {
      const list = res ?? [];

      this.sessions = list.map(x => ({
        id: x.id,
        label: `${x.course ?? ''} | شعبة ${x.classroom ?? ''} | ${x.session_date ?? ''}`,
      }));
    });
  }
  applyFilter(): void {
    const s = this.search.toLowerCase().trim();

    this.filtered = this.records.filter(r =>
      (r.student_name ?? '').toLowerCase().includes(s) ||
      (r.session_name ?? '').toLowerCase().includes(s)
    );
  }


  openDialog(): void {
    this.isDialogOpen = true;
    this.editingId = null;
    this.dialogTitle = 'إضافة سجل';
    this.form.reset({ status: 'present' });

    this.loadStudents();
    this.loadSessions();
  }

  closeDialog(): void {
    this.isDialogOpen = false;
  }

  edit(item: any): void {
    this.isDialogOpen = true;
    this.editingId = item.id;
    this.dialogTitle = 'تعديل سجل';

    this.loadStudents();
    this.loadSessions();

    this.form.patchValue({
      student_id: item.student_id,
      session_id: item.session_id,
      status: item.status,
    });
  }

save(): void {
  if (this.form.invalid) return;

  const payload = {
    student: this.form.value.student_id,
    session: this.form.value.session_id,
    status: this.form.value.status,
  };


  const existing = this.records.find(r =>
    (r.student === payload.student || r.student_id === payload.student) &&
    (r.session === payload.session || r.session_id === payload.session)
  );

  const req$ = this.editingId
    ? this.recordsApi.update(this.editingId, payload)
    : existing
      ? this.recordsApi.update(existing.id, payload) // ✅ بدل create
      : this.recordsApi.create(payload);

  req$.subscribe({
    next: () => {
      this.loadAll();
      this.closeDialog();
    },
    error: (err: any) => {
      const msg = err?.error?.non_field_errors?.[0];
      alert(msg ?? JSON.stringify(err?.error ?? err, null, 2));
    }
  });

}  delete(id: string): void {
    this.recordsApi.delete(id).subscribe(() => this.loadAll());
  }
}
