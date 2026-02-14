import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VedioService } from '../../../services/vedio.service';
import { SignMedia } from '../../../core/models/singmedia.model';

@Component({
  selector: 'app-videos',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {

  videos: SignMedia[] = [];
  FilteredVedioService: SignMedia[] = [];

  search = '';

  isDialogOpen = false;
  dialogTitle = 'إضافة فيديو';
  editingId: string | null = null;

  form!: FormGroup;

  constructor(private fb: FormBuilder, private api: VedioService) {}

  ngOnInit(): void {
    this.initForm();
    this.loadVideos();
  }

  initForm() {
    this.form = this.fb.group({
      file_path: ['', Validators.required],
      thumbnail_path: [''],
      duration_sec: ['', Validators.required],
      transcription_ar: [''],
      transcription_en: ['']
    });
  }

  loadVideos() {
    this.api.getVideos().subscribe(res => {
      this.videos = res;
      this.FilteredVedioService = [...res];
    });
  }

  applyFilter() {
    const s = this.search.toLowerCase().trim();
    this.FilteredVedioService = this.videos.filter(v =>
      (v.transcription_ar ?? '').toLowerCase().includes(s) ||
      (v.transcription_en ?? '').toLowerCase().includes(s)
    );
  }

  openDialog() {
    this.isDialogOpen = true;
    this.dialogTitle = 'إضافة فيديو';
    this.editingId = null;
    this.form.reset();
  }

  closeDialog() {
    this.isDialogOpen = false;
  }

  edit(v: SignMedia) {
    this.isDialogOpen = true;
    this.dialogTitle = 'تعديل فيديو';
    this.editingId = v.id;
    this.form.patchValue(v);
  }

  save() {
    if (this.form.invalid) { return; }

    const data = this.form.value;

    if (this.editingId) {
      this.api.updateVideo(this.editingId, data).subscribe(() => {
        this.loadVideos();
        this.closeDialog();
      });
    } else {
      this.api.createVideo(data).subscribe(() => {
        this.loadVideos();
        this.closeDialog();
      });
    }
  }

  delete(id: string) {
    this.api.deleteVideo(id).subscribe(() => this.loadVideos());
  }
}
