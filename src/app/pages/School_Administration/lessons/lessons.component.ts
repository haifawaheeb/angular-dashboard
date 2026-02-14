import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import { LessonsService } from '../../../services/Lesson.service';
import { CoursesService } from '../../../services/courses.service';

@Component({
  selector: 'app-lessons',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.scss']
})
export class LessonsComponent implements OnInit {

  lessons: any[] = [];
  filteredLessons: any[] = [];
  courses: any[] = [];
  search = '';
  isDialogOpen = false;
  dialogTitle = 'إضافة درس';
  editingId: string | null = null;


  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private lessonsService: LessonsService,
    private coursesService: CoursesService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadLessons();
    this.loadCourses();
  }


  initForm() {
    this.form = this.fb.group({
      course: [null, Validators.required],
      title_ar: ['', Validators.required],
      title_en: [''],
      description_ar: [''],
      description_en: [''],
      lesson_type: ['interactive', Validators.required],
      order_index: [1, Validators.required],
      is_published: [false, Validators.required]
    });
  }

  loadLessons() {
    this.lessonsService.getLessons().subscribe(res => {
      this.lessons = res;
      this.filteredLessons = [...res];
    });
  }

  loadCourses() {
    this.coursesService.getcourses().subscribe(res => {
      this.courses = res;
    });
  }

  applyFilter() {
    const s = this.search.toLowerCase();
    this.filteredLessons = this.lessons.filter(l =>
      l.title_ar?.toLowerCase().includes(s) ||
      l.title_en?.toLowerCase().includes(s)
    );
  }


  openDialog() {
    this.isDialogOpen = true;
    this.dialogTitle = 'إضافة درس';
    this.editingId = null;
    this.form.reset({
      lesson_type: 'interactive',
      order_index: 1,
      is_published: false
    });
  }

  closeDialog() {
    this.isDialogOpen = false;
  }

  editLesson(l: any) {
    this.isDialogOpen = true;
    this.dialogTitle = 'تعديل درس';
    this.editingId = l.id;

    this.form.patchValue({
      course: l.course,
      title_ar: l.title_ar,
      title_en: l.title_en,
      description_ar: l.description_ar,
      description_en: l.description_en,
      lesson_type: l.lesson_type,
      order_index: l.order_index,
      is_published: l.is_published
    });
  }

  save() {
    if (!this.form.valid) return;

    if (this.editingId) {
      this.lessonsService.updateLessons(this.editingId, this.form.value)
        .subscribe(() => {
          this.loadLessons();
          this.closeDialog();
        });
    } else {
      this.lessonsService.createLessons(this.form.value)
        .subscribe(() => {
          this.loadLessons();
          this.closeDialog();
        });
    }
  }

  deleteLesson(id: string) {
    this.lessonsService.deleteLessons(id)
      .subscribe(() => this.loadLessons());
  }
}
