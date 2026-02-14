import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

interface Profile {
  user_id: 1;
  full_name: string;
  avatar_url: string;
  bio: string;
  locale: string;
  timezone: String;
  preferred_sign_language: String;
  accessibility_needs: JSON;
}


@Component({
  selector: 'app-profiles',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  templateUrl: './profiles.component.html',
  styleUrl: './profiles.component.scss'
})
export class ProfilesComponent {

  displayedColumns: string[] = [
    'user_id: number',
    'full_name: string',
    'avatar_url: string',
    'bio',
    'locale',
    'timezone',
    'preferred_sign_language',
    'accessibility_needs '
  ];
  dataSource: Profile[] = [];
  filterValue: string = '';
  data: Profile[] = [
    {
      user_id: 1,
      full_name: 'ahmed@example.com',
      avatar_url: 'طالب',
      bio: '12345',
      locale: "true",
      timezone: '',
      preferred_sign_language: '2023-01-15',
      accessibility_needs: JSON
    }
  ];

  isDialogOpen = false;

  ProfileForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.ProfileForm = this.fb.group({
      full_name: ['', Validators.required],
      avatar_url: ['', Validators.required],
      bio: ['', Validators.required],
      locale: [true, Validators.required],
      timezone: ['', Validators.required],
      preferred_sign_language: ['', Validators.required],
      accessibility_needs: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // تحميل البيانات الأولية
    this.dataSource = [...this.data];
  }

  // 🔎 فلترة البيانات
  applyFilter() {
    const value = this.filterValue.toLowerCase().trim();
    this.dataSource = this.data.filter(P =>
      P.avatar_url.toLowerCase().includes(value) ||
      P.full_name.toLowerCase().includes(value) ||
      P.locale.toLowerCase().includes(value)
    );
  }


  openNewCourseDialog() {
    this.isDialogOpen = true;
  }

  closeDialog() {
    this.isDialogOpen = false;
    this.ProfileForm.reset({
      user_isActive: true
    });
  }

  onSave() {
    if (this.ProfileForm.valid) {
      const newUser: Profile = {
        user_id: this.data.length + 1,
        user_lastlogin: new Date(),
        ...this.ProfileForm.value
      };

      this.data.push(newUser);
      this.dataSource = [...this.data];
      this.closeDialog();
    } else {
      alert('يرجى ملء جميع الحقول المطلوبة');
    }
  }


  deleteItem(id: number) {
    this.data = this.data.filter(item => item.user_id !== id);
    this.dataSource = [...this.data];
  }
  onUndo() {
    this.ProfileForm.reset({
      user_isActive: true
    });
  }

  previewUrl: string | ArrayBuffer | null = null;
  isImage: boolean = false;
  selectedFile: File | null = null;
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (!file) return;

    const fileType = file.type;
    this.isImage = fileType.startsWith('image/');
    const reader = new FileReader();

    reader.onload = () => {
      this.previewUrl = reader.result;
    };

    reader.readAsDataURL(file);
  }
  resetFile(): void {
    this.previewUrl = null;
    this.selectedFile = null;
  }


}
