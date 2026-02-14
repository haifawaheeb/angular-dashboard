import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClassRoomsService, ClassroomModel } from '../../../services/classrooms.service';
import { GradesService } from '../../../services/garad.services';
import { Grade } from '../../../core/models';





@Component({
  selector: 'app-classrooms',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './classrooms.component.html',
  styleUrls: ['./classrooms.component.scss']
})
export class ClassroomsComponent implements OnInit {

  classrooms: ClassroomModel[] = [];
  filtered: ClassroomModel[] = [];
  grades: Grade[] = [];
  // gradesList: any[] = [];
  FilteredClassrooms: any[] = [];
  editClassroom(room: any) { }
  deleteClassroom(id: string) { }
  saveClassroom() { }



  search = '';
  isDialogOpen = false;
  editingId: string | null = null;
  dialogTitle = 'إضافة صف';

  form!: FormGroup;

  constructor(private fb: FormBuilder, private api: ClassRoomsService, private gradesService: GradesService) {

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      grade: ['', Validators.required],
      capacity: [0, Validators.required]
    });

    this.load();
    setTimeout(() => {
      console.log('classrooms:', this.classrooms);
      console.log('filtered:', this.filtered);
    }, 1000);

  }
  load() {
    this.api.getAll().subscribe(res => {
      this.classrooms = res;
      this.filtered = [...res];
    });

    this.loadGrades();
  }


  loadGrades() {
    this.gradesService.getGrades().subscribe({
      next: (data: Grade[]) => this.grades = data,
      error: (err: any) => console.error(err)
    });
  }
  applyFilter() {
    const s = this.search.toLowerCase();
    this.filtered = this.classrooms.filter(c => c.name.toLowerCase().includes(s));
  }

  getGradeName(id: string) {
    const g = this.grades.find(x => x.id === id);
    return g ? g.name_ar : 'غير محدد';
  }


  openDialog() {
    this.isDialogOpen = true;
    this.dialogTitle = 'إضافة صف';
    this.editingId = null;
    this.form.reset();
  }

  edit(item: ClassroomModel) {
    this.isDialogOpen = true;
    this.dialogTitle = 'تعديل صف';
    this.editingId = item.id!;
    this.form.patchValue(item);
  }

  save() {
    if (!this.form.valid) return;

    if (this.editingId) {
      this.api.update(this.editingId, this.form.value).subscribe(() => {
        this.load();
        this.closeDialog();
      });

    } else {
      this.api.create(this.form.value).subscribe(() => {
        this.load();
        this.closeDialog();
      });
    }
  }

  delete(id?: string) {
    if (!id) return;
    this.api.delete(id).subscribe(() => this.load());
  }

  closeDialog() {
    this.isDialogOpen = false;
  }
}
