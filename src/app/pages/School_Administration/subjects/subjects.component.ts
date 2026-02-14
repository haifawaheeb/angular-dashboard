import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubjectService } from '../../../services/subject.service';
import { SubjectModel } from '../../../services/subject.service';
import { GradesService } from '../../../services/garad.services';
import { Grade } from '../../../core/models';



@Component({
  selector: 'app-subjects',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {

  subjects: SubjectModel[] = [];
  filteredSubjects: SubjectModel[] = [];
  grades: Grade[] = [];
  search = '';

  isDialogOpen = false;
  dialogTitle = 'إضافة مادة';

  form!: FormGroup;
  editingId: string | null = null;

  constructor(private fb: FormBuilder, private api: SubjectService, private gradesService: GradesService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      grade: [null, Validators.required],
      name_ar: ['', Validators.required],
      name_en: [''],
      code: ['', Validators.required],
    });

    this.load();
  }

  load() {
    this.api.getSubject().subscribe(res => {
      this.subjects = res;
      this.filteredSubjects = [...res];
    });
    this.loadGrades();
  }
  getGradeName(id: string) {
    const g = this.grades.find(x => x.id === id);
    return g ? g.name_ar : 'غير محدد';
  }

  loadGrades() {
    this.gradesService.getGrades().subscribe({
      next: (data: Grade[]) => this.grades = data,
      error: (err: any) => console.error(err)
    });
  }

  applyFilter() {
    const s = this.search.toLowerCase();
    this.filteredSubjects = this.subjects.filter(u =>
      u.grade.toLowerCase().includes(s) ||
      u.name_ar.toLowerCase().includes(s) ||
      u.name_en?.toLowerCase().includes(s) ||
      u.code.toLowerCase().includes(s)
    );
  }

  openDialog() {
    this.isDialogOpen = true;
    this.dialogTitle = 'إضافة مادة';
    this.editingId = null;
    this.form.reset();
  }

  closeDialog() {
    this.isDialogOpen = false;
  }

  edit(subject: SubjectModel) {
    this.isDialogOpen = true;
    this.dialogTitle = "تعديل مادة";

    this.form.patchValue({
      grade :subject.grade,
      name_ar: subject.name_ar,
      name_en: subject.name_en,
      code: subject.code,
    });

    this.editingId = subject.id!;
  }


  save() {
  if (this.form.invalid) return;

  if (this.editingId) {
    this.api.updateSubject(this.editingId, this.form.value).subscribe(() => {
      this.load();
      this.closeDialog();
    });
  } else {
    this.api.createSubject(this.form.value).subscribe(() => {
      this.load();
      this.closeDialog();
    });
  }
}


  delete(id: string) {
    this.api.deleteSubject(id).subscribe(() => this.load());
  }
}
