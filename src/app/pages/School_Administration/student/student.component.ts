import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../../../services/student.services';
import { StudentModel } from '../../../core/models/student.model';
@Component({
  selector: 'app-students',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']

})
export class StudentsComponent implements OnInit {

  students: StudentModel[] = [];
  filteredStudents: StudentModel[] = [];

  search = '';

  isDialogOpen = false;
  dialogTitle = 'طالب جديد';

  editingId: string | null = null;

  form!: FormGroup;

  constructor(private fb: FormBuilder, private api: StudentService) { }

  ngOnInit(): void {
    this.initForm();
    this.loadStudents();
  }

  initForm() {
    this.form = this.fb.group({
      full_name: ['', Validators.required],
      email: ['', Validators.required],
      phone: [''],
      is_active: [true]
    });
  }

  loadStudents() {
    this.api.getStudents().subscribe(res => {
      this.students = res;
      this.filteredStudents = [...this.students];
    });
  }

  applyFilter() {
    const s = this.search.toLowerCase();
    this.filteredStudents = this.students.filter(st =>
      st.full_name?.toLowerCase().includes(s) ||
      st.email?.toLowerCase().includes(s) ||
      st.phone?.includes(s)
    );
  }

  openDialog() {
    this.isDialogOpen = true;
    this.dialogTitle = 'طالب جديد';
    this.editingId = null;

    this.form.reset({ is_active: true });
  }

  closeDialog() {
    this.isDialogOpen = false;
  }

  editStudent(st: StudentModel) {
    this.isDialogOpen = true;
    this.dialogTitle = 'تعديل طالب';
    this.editingId = st.id!;

    this.form.patchValue(st);
  }

  saveStudent() {
    if (this.form.invalid) return;

    const payload = this.form.value;

    if (this.editingId) {
      this.api.updateStudent(this.editingId, payload).subscribe(() => {
        this.loadStudents();
        this.closeDialog();
      });
    } else {
      this.api.createStudent(payload).subscribe(() => {
        this.loadStudents();
        this.closeDialog();
      });
    }
  }

  deleteStudent(id: string) {
    this.api.deleteStudent(id).subscribe(() => {
      this.loadStudents();
    });
  }
}
