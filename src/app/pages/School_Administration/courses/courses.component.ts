import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import { GradesService } from '../../../services/garad.services';
import { SubjectService } from '../../../services/subject.service';
import { TeacherService } from '../../../services/teacher.service';
import { CoursesService } from '../../../services/courses.service';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  courses: any[] = [];
  filtered: any[] = [];

  subjects: any[] = [];
  grades: any[] = [];
  teachers: any[] = [];

  search = '';

  isDialogOpen = false;
  dialogTitle = '';
  editingId: string | null = null;

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private coursesService: CoursesService,
    private subjectService: SubjectService,
    private gradeService: GradesService,
    private teacherService: TeacherService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.loadAll();
    this.loadSubjects();
    this.loadGrades();
    this.loadTeachers();
  }

  /* -------------------- Form -------------------- */
  buildForm() {
    this.form = this.fb.group({
      subject: [null, Validators.required],
      grade: [null, Validators.required],
      main_teacher: [null],
      academic_year: ['', Validators.required],
      is_active: [true],
    });
  }

  /* -------------------- Load Data -------------------- */
  loadAll() {
    this.coursesService.getcourses().subscribe((res: any[]) => {
      this.courses = res;
      this.filtered = [...res];
    });
  }

  loadSubjects() {
    this.subjectService.getSubject().subscribe((res: any[]) => {
      this.subjects = res;
    });
  }

  loadGrades() {
    this.gradeService.getGrades().subscribe((res: any[]) => {
      this.grades = res;
    });
  }

  loadTeachers() {
    this.teacherService.getAlls().subscribe((res: any[]) => {
      this.teachers = res;
    });
  }

  /* -------------------- UI Logic -------------------- */
  applyFilter() {
    const s = this.search.toLowerCase();
    this.filtered = this.courses.filter(c =>
      c.subject_name?.toLowerCase().includes(s) ||
      c.grade_name?.toLowerCase().includes(s)
    );
  }

  openDialog() {
    this.isDialogOpen = true;
    this.editingId = null;
    this.dialogTitle = 'إضافة كورس';
    this.form.reset({ is_active: true });
  }

  closeDialog() {
    this.isDialogOpen = false;
  }

  edit(item: any) {
    this.isDialogOpen = true;
    this.editingId = item.id;
    this.dialogTitle = 'تعديل كورس';

    this.form.patchValue({
      subject: item.subject,
      grade: item.grade,
      main_teacher: item.main_teacher,
      academic_year: item.academic_year,
      is_active: item.is_active
    });
  }

  /* -------------------- CRUD -------------------- */
  save() {
    if (!this.form.valid) return;

    if (this.editingId) {
      this.coursesService.updatecourses(this.editingId, this.form.value)
        .subscribe(() => {
          this.loadAll();
          this.closeDialog();
        });
    } else {
      this.coursesService.createcourses(this.form.value)
        .subscribe(() => {
          this.loadAll();
          this.closeDialog();
        });
    }
  }

  delete(id: string) {
    this.coursesService.deletecourses(id)
      .subscribe(() => this.loadAll());
  }
}
