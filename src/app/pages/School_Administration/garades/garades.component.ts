import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AttendanceRecordsService } from '../../../services/attendanceRecords.service';
import { GradesService } from '../../../services/garad.services';
import { StageService } from '../../../services/academictages.service';
import { Grade } from '../../../core/models/grade.model';
import {EducationStage} from '../../../core/models/education-stage.model';

@Component({
  selector: 'app-grades',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './garades.component.html',
  styleUrls: ['./garades.component.scss']
})
export class GaradesComponent implements OnInit {

  grades: Grade[] = [];
  filtered: Grade[] = [];
  stages: any[] = [];
  search = '';
  isDialogOpen = false;
  dialogTitle = '';
  editingId: string | null = null;

  form!: FormGroup;

  constructor(private fb: FormBuilder, private api: GradesService, private stagesApi: StageService) {
  }


terms = [
  { value: 'term1', label: 'الترم الأول' },
  { value: 'term2', label: 'الترم الثاني' }
];


 ngOnInit(): void {
  this.form = this.fb.group({
    stage_id: [null, Validators.required],
    name_ar: ['', Validators.required],
    name_en: [''],
    level_order: ['', Validators.required]
  });

  this.loadStages();
  this.loadGrades();
}


   loadStages() {
   console.log('🚀 loadStages CALLED');

    this.stagesApi.getAll().subscribe({
      next: (res) => {
        console.log('✅ STAGES RESPONSE = ', res);
        this.stages = res;
      },
      error: (err) => {
        console.error('Error loading stages', err);
      }
    });
  }

// loadStages() {
//   console.log('🚀 loadStages CALLED');

//   this.stageService.getStages().subscribe({
//     next: (res: any) => {
//       console.log('✅ STAGES RESPONSE = ', res);
//       this.stages = res;
//     },
//     error: err => {
//       console.error('❌ STAGES ERROR = ', err);
//     }
//   });
// }


  loadGrades() {
    this.api.getGrades().subscribe(res => {
      this.grades = res;
      this.filtered = [...res];
    });
  }

  applyFilter() {
    const s = this.search.toLowerCase();
    this.filtered = this.grades.filter(g =>
      g.name_ar.toLowerCase().includes(s) ||
      g.name_en?.toLowerCase().includes(s)
    );
  }

  openDialog() {
    this.isDialogOpen = true;
    this.editingId = null;
    this.dialogTitle = "إضافة درجة";
    this.form.reset();
  }

  closeDialog() {
    this.isDialogOpen = false;
  }

  edit(item: any) {
    this.isDialogOpen = true;
    this.editingId = item.id;
    this.dialogTitle = "تعديل درجة";

    this.form.patchValue(item);
  }

  save() {
    if (!this.form.valid) return;

    if (this.editingId) {
      this.api.updateGrade(this.editingId, this.form.value).subscribe(() => {
        this.loadGrades();
        this.closeDialog();
      });
    } else {
      this.api.createGrade(this.form.value).subscribe(() => {
        this.loadGrades();
        this.closeDialog();
      });
    }
  }

  delete(id: string) {
    this.api.deleteGrade(id).subscribe(() => {
      this.loadGrades();
    });
  }
}
