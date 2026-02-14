import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import { TimeSoltService, TimetableSlot } from '../../../services/Timetable_solt.service';
import { CoursesService } from '../../../services/courses.service';
import { ClassRoomsService } from '../../../services/classrooms.service';

@Component({
  selector: 'app-timetable-slots',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './timetable-slots.component.html',
  styleUrls: ['./timetable-slots.component.scss'],
})
export class TimetableSlotsComponent implements OnInit {
  weekdays = [
    { value: 'sat', label: 'السبت' },
    { value: 'sun', label: 'الأحد' },
    { value: 'mon', label: 'الاثنين' },
    { value: 'tue', label: 'الثلاثاء' },
    { value: 'wed', label: 'الأربعاء' },
    { value: 'thu', label: 'الخميس' },
    { value: 'fri', label: 'الجمعة' },
  ];

  Timetable_solt: TimetableSlot[] = [];
  FilteredTimeSolt: TimetableSlot[] = [];


  classrooms: any[] = [];
  courses: any[] = [];
  search = '';
  isDialogOpen = false;
  dialogTitle = 'إضافة حصة زمنية';
  form!: FormGroup;
  editingId: string | null = null;
  constructor(
    private fb: FormBuilder,
    private api: TimeSoltService,
    private courseApi: CoursesService,
    private classroomApi: ClassRoomsService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadSlots();
    this.loadCourses();
    this.loadClassrooms();
  }

  initForm() {
    this.form = this.fb.group({
      classroom_id: ['', Validators.required],
      course_id: ['', Validators.required],
      weekday: ['', Validators.required],
      start_time: ['', Validators.required],
      end_time: ['', Validators.required],
    });
  }

  loadSlots() {
    this.api.getTimeSolt().subscribe((res: TimetableSlot[]) => {
      this.Timetable_solt = res;
      this.FilteredTimeSolt = [...res];
    });
  }
  loadCourses() {
    this.courseApi.getcourses().subscribe((res: any) => {
      this.courses = res.results ?? res;
      console.log('✅ courses loaded:', this.courses);
    });
  }


  loadClassrooms() {

    this.classroomApi.getAll().subscribe((res: any[]) => {
      this.classrooms = res;
    });
  }

  applyFilter() {
    const s = this.search.toLowerCase().trim();

    this.FilteredTimeSolt = this.Timetable_solt.filter((slot) =>
      `${slot.classroom_id} ${slot.course_id} ${slot.weekday} ${slot.start_time} ${slot.end_time}`
        .toLowerCase()
        .includes(s)
    );
  }

  getCourseName(id: string) {
    const c = this.courses?.find(x => x.id === id);
    return c ? (c.subject_name ?? c.name_ar ?? c.name ?? id) : id;
  }

  getClassroomName(id: string) {
    const c = this.classrooms?.find(x => x.id === id);
    return c ? (c.name ?? c.name_ar ?? id) : id;
  }

  openDialog() {
    this.isDialogOpen = true;
    this.dialogTitle = 'إضافة حصة زمنية';
    this.editingId = null;
    this.form.reset();
  }

  closeDialog() {
    this.isDialogOpen = false;
  }

  edit(slot: TimetableSlot) {
    this.isDialogOpen = true;
    this.dialogTitle = 'تعديل حصة زمنية';
    this.editingId = slot.id ?? null;

    this.form.patchValue({
      classroom_id: slot.classroom_id,
      course_id: slot.course_id,
      weekday: slot.weekday,
      start_time: slot.start_time,
      end_time: slot.end_time,
    });
  }


  save() {
    if (this.form.invalid) {
      alert('❗ يرجى تعبئة جميع الحقول المطلوبة');
      return;
    }

    const payload = this.form.value;

    if (this.editingId) {
      this.api.updateTimeSlot(this.editingId, payload).subscribe(() => {
        this.loadSlots();
        this.closeDialog();
      });
    } else {
      this.api.createTimeSolt(payload).subscribe(() => {
        this.loadSlots();
        this.closeDialog();
      });
    }
  }

  delete(id: string) {
    this.api.deleteTimeSolt(id).subscribe(() => {
      this.loadSlots();
    });
  }
}
