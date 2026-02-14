import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LessonSessionsService, LessonSession } from '../../../services/lessons_session.service';
import { TimeSoltService, TimetableSlot } from '../../../services/Timetable_solt.service';
// import { LessonSessionsService } from '../../../services/lessons_session.service';

@Component({
  selector: 'app-lesson-sessions',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './lesson-sessions.component.html',
  styleUrl: './lesson-sessions.component.scss'
})
export class LessonSessionsComponent {


  sessions: LessonSession[] = [];
  filtered: LessonSession[] = [];

  timetableSlots: TimetableSlot[] = [];
  lessons: any[] = [];

  search = '';
  isDialogOpen = false;
  dialogTitle = 'إضافة جلسة';
  form!: FormGroup;
  editingId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private api: LessonSessionsService,
    private slotApi: TimeSoltService,
    private lessonApi: LessonSessionsService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadAll();
  }

  initForm() {
    this.form = this.fb.group({
      timetable_slot_id: ['', Validators.required],
      lesson_id: [''],
      session_date: ['', Validators.required],
      actual_start_date: [''],
      actual_start_time: [''],
      actual_end_date: [''],
      actual_end_time: [''],
    });
  }

  loadAll() {
    this.loadSessions();
    this.loadSlots();
    this.loadLessons();
  }

  loadSessions() {
    this.api.getAll().subscribe((res: any) => {
      const data = res.results ?? res;
      this.sessions = data;
      this.filtered = [...data];
    });
  }

  loadSlots() {
    this.slotApi.getTimeSolt().subscribe((res: any) => {
      const data = res.results ?? res;
      this.timetableSlots = data;
    });
  }

  loadLessons() {
    this.lessonApi.getAll().subscribe((res: any) => {
      this.lessons = res.results ?? res;
    });
  }

  applyFilter() {
    const s = this.search.toLowerCase().trim();
    this.filtered = this.sessions.filter(x =>
      `${x.timetable_slot} ${x.lesson ?? ''} ${x.session_date ?? ''} ${x.actual_start ?? ''} ${x.actual_end ?? ''}`
        .toLowerCase()
        .includes(s)
    );
  }

  slotLabel(slot: TimetableSlot): string {
    return `${slot.weekday} | ${slot.start_time} - ${slot.end_time}`;
  }

  getSlotLabel(id: string) {
    const s = this.timetableSlots.find(x => x.id === id);
    return s ? this.slotLabel(s) : id;
  }

  getLessonName(id?: string | null) {
    if (!id) return '—';
    const l = this.lessons.find(x => x.id === id);
    return l ? (l.title_ar ?? l.title ?? l.name_ar ?? l.name ?? id) : id;
  }

  formatDateTime(v?: string | null) {
    if (!v) return '—';
    return v.replace('T', ' ').replace('Z', '');
  }

  openDialog() {
    this.isDialogOpen = true;
    this.dialogTitle = 'إضافة جلسة';
    this.editingId = null;
    this.form.reset();
  }

  closeDialog() {
    this.isDialogOpen = false;
  }
  edit(s: LessonSession) {
    this.isDialogOpen = true;
    this.dialogTitle = 'تعديل جلسة';
    this.editingId = s.id ?? null;

    const start = this.splitISO(s.actual_start); // ✅ صح
    const end = this.splitISO(s.actual_end);     // ✅ صح

    this.form.patchValue({
      timetable_slot_id: s.timetable_slot,   // ✅ لأن API يرجع timetable_slot
      lesson_id: s.lesson ?? '',             // ✅ لأن API يرجع lesson
      session_date: s.session_date,
      actual_start_date: start?.date ?? '',
      actual_start_time: start?.time ?? '',
      actual_end_date: end?.date ?? '',
      actual_end_time: end?.time ?? '',
    });
  }


  splitISO(v?: string | null): { date: string; time: string } | null {
    if (!v) return null;
    const clean = v.replace('Z', '');
    const [date, timeFull] = clean.split('T');
    const time = (timeFull ?? '').slice(0, 5);
    if (!date) return null;
    return { date, time };
  }


  buildISO(date?: string, time?: string): string | null {
    if (!date || !time) return null;
    return `${date}T${time}:00`;
  }

  save() {
    if (this.form.invalid) {
      alert('❗ يرجى تعبئة الحقول المطلوبة');
      return;
    }

    const v = this.form.value;

  const payload: any = {
  timetable_slot: v.timetable_slot_id,
  session_date: v.session_date,
  actual_start: this.buildISO(v.actual_start_date, v.actual_start_time) || null,
  actual_end: this.buildISO(v.actual_end_date, v.actual_end_time) || null,
};

    if (!payload.actual_start) payload.actual_start = null;
    if (!payload.actual_end) payload.actual_end = null;

    if (this.editingId) {
      this.api.update(this.editingId, payload).subscribe(() => {
        this.loadSessions();
        this.closeDialog();
      });
    } else {
      this.api.create(payload).subscribe(() => {
        this.loadSessions();
        this.closeDialog();
      });
    }
  }

  delete(id: string) {
    this.api.delete(id).subscribe(() => this.loadSessions());
  }
}
