import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule
} from '@angular/forms';

import { SingMadiaService } from '../../../services/singMadia.service';
import { SignMedia } from '../../../core/models/singmedia.model';

@Component({
  selector: 'dalil-sign-media-page',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './sign-media.component.html',
  styleUrls: ['./sign-media.component.scss']
})
export class SignMediaComponent implements OnInit {

  /* =======================
   * Data
   * ======================= */
  signMedias: SignMedia[] = [];
  filtered: SignMedia[] = [];

  /* =======================
   * UI State
   * ======================= */
  search = '';
  isDialogOpen = false;
  dialogTitle = 'إضافة درس';
  editingId: string | null = null;

  /* =======================
   * Form
   * ======================= */
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private api: SingMadiaService
  ) {}

  /* =======================
   * Lifecycle
   * ======================= */
  ngOnInit(): void {
    this.initForm();
    this.loadSignMedia();
  }

  /* =======================
   * Form Init
   * ======================= */
  private initForm(): void {
    this.form = this.fb.group({
      file_path: ['', Validators.required],
      thumbnail_path: [''],
      duration_sec: [null],
      transcription_ar: [''],
      transcription_en: [''],
      created_at: ['']
    });
  }

  /* =======================
   * Data Loading
   * ======================= */
  loadSignMedia(): void {
    this.api.getAlls().subscribe({
      next: (res) => {
        this.signMedias = res;
        this.filtered = [...res];
      },
      error: (err) => {
        console.error('خطأ أثناء تحميل البيانات', err);
      }
    });
  }

  /* =======================
   * Filtering
   * ======================= */
  applyFilter(): void {
    const keyword = this.search.toLowerCase();

    this.filtered = this.signMedias.filter(item =>
      item.transcription_ar?.toLowerCase().includes(keyword) ||
      item.transcription_en?.toLowerCase().includes(keyword)
    );
  }

  /* =======================
   * Dialog Control
   * ======================= */
  openDialog(): void {
    this.isDialogOpen = true;
    this.dialogTitle = 'إضافة درس';
    this.editingId = null;

    this.form.reset({
      created_at: new Date().toISOString().slice(0, 16)
    });
  }

  closeDialog(): void {
    this.isDialogOpen = false;
  }

  /* =======================
   * Edit
   * ======================= */
  edit(item: SignMedia): void {
    this.isDialogOpen = true;
    this.dialogTitle = 'تعديل درس';
    this.editingId = item.id ?? null;

    this.form.patchValue(item);
  }

  /* =======================
   * Save (Create / Update)
   * ======================= */
  save(): void {
    if (this.form.invalid) return;

    const payload = this.form.value;

    const request$ = this.editingId
      ? this.api.update(this.editingId, payload)
      : this.api.create(payload);

    request$.subscribe({
      next: () => {
        this.loadSignMedia();
        this.closeDialog();
      },
      error: (err) => {
        console.error('خطأ أثناء الحفظ', err);
      }
    });
  }

  /* =======================
   * Delete
   * ======================= */
  delete(id: string): void {
    if (!confirm('هل أنتِ متأكدة من الحذف؟')) return;

    this.api.delete(id).subscribe({
      next: () => this.loadSignMedia(),
      error: (err) => console.error('خطأ أثناء الحذف', err)
    });
  }
}
