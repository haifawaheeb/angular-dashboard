
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeacherService } from '../../../services/teacher.service';
import { GradesService } from '../../../services/garad.services';
import { SubjectService } from '../../../services/subject.service';
import { TeacherAssegementService } from '../../../services/TeacherAssignment.service';

@Component({
  selector: 'dalil-teacher-assignments-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './teacher-assignments.component.html',
  styleUrls: ['./teacher-assignments.component.scss']
})


export class TeacherAssignmentsComponent implements OnInit {

  assignments: any[] = [];
  filtered: any[] = [];
  teachers: any[] = [];
  grades: any[] = [];
  subjects: any[] = [];
  search = '';
  isDialogOpen = false;
  dialogTitle = 'إضافة إسناد معلم';
  editingId: string | null = null;

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private assignmentApi: TeacherAssegementService,
    private teacherApi: TeacherService,
    private gradeApi: GradesService,
    private subjectApi: SubjectService
  ) { }


  ngOnInit(): void {
    this.initForm();
    this.loadAssignments();
    this.loadTeachers();
    this.loadGrades();
    this.loadSubjects();
  }


  initForm() {
    this.form = this.fb.group({
      teacher: ['', Validators.required],
      grade: ['', Validators.required],
      subject: ['', Validators.required],
      is_active: [true]
    });
  }


  loadAssignments() {
    this.assignmentApi.getAll().subscribe(res => {
      this.assignments = res;
      this.filtered = [...res];
    });
  }

  loadTeachers() {
    this.teacherApi.getAlls().subscribe(res => {
      this.teachers = res;
    });
  }

  loadGrades() {
    this.gradeApi.getGrades().subscribe(res => {
      this.grades = res;
    });
  }

  loadSubjects() {
    this.subjectApi.getSubject().subscribe(res => {
      this.subjects = res;
    });
  }


  applyFilter() {
    const s = this.search.toLowerCase();

    this.filtered = this.assignments.filter(a =>
      a.teacher?.full_name?.toLowerCase().includes(s) ||
      a.subject?.name_ar?.toLowerCase().includes(s) ||
      a.grade?.name_ar?.toLowerCase().includes(s)
    );
  }

  openDialog() {
    this.isDialogOpen = true;
    this.dialogTitle = 'إضافة إسناد معلم';
    this.editingId = null;
    this.form.reset({ is_active: true });
  }

  closeDialog() {
    this.isDialogOpen = false;
  }

  edit(item: any) {
    this.isDialogOpen = true;
    this.dialogTitle = 'تعديل إسناد معلم';
    this.editingId = item.id;

    this.form.patchValue({
      teacher: item.teacher?.id,
      grade: item.grade?.id,
      subject: item.subject?.id,
      is_active: item.is_active
    });
  }


  save() {
    if (this.form.invalid) return;

    const payload = this.form.value;

    const req$ = this.editingId
      ? this.assignmentApi.update(this.editingId, payload)
      : this.assignmentApi.create(payload);

    req$.subscribe({
      next: () => {
        this.loadAssignments();
        this.closeDialog();
      },
      error: err => {
        alert(
          err?.error?.detail ||
          'حدث خطأ، تأكدي من عدم تكرار نفس (المعلم + الصف + المادة)'
        );
      }
    });
  }

  delete(id: string) {
    if (!confirm('هل أنتِ متأكدة من حذف هذا الإسناد؟')) return;

    this.assignmentApi.delete(id).subscribe(() => {
      this.loadAssignments();
    });
  }
}
