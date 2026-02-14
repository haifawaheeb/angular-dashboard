import { Routes } from '@angular/router';
import { AuthGuard } from './core/auth/auth.guard';
import { AuthLayoutComponent } from './layouts/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout.component';
import { HomeComponent } from './pages/other_page/home/home.component';
import { SignInComponent } from './pages/School_Administration/sign-in/sign-in.component';
import { HeaderComponent } from './pages/other_page/header/header.component';
import { DashbordComponent } from './pages/Management_System/dashbord/dashbord.component';
import { AdminDashbordComponent } from './pages/Management_System/admin-dashbord/admin-dashbord.component';
import { AdminRoleComponent } from './pages/Management_System/admin-role/admin-role.component';
import { ClassRoomComponent } from './pages/School_Administration/class-room/class-room.component';
import { CoursesComponent } from './pages/School_Administration/courses/courses.component';
import { GaradesComponent } from './pages/School_Administration/garades/garades.component';
import { LessonsComponent } from './pages/School_Administration/lessons/lessons.component';
import { ProfilesComponent } from './pages/Management_System/profiles/profiles.component';
import { PymentsComponent } from './pages/Management_System/pyments/pyments.component';
import { StudentsComponent } from './pages/School_Administration/student/student.component';
import { UsersComponent } from './pages/Management_System/users/users.component';
import { VideosComponent } from './pages/School_Administration/videos/videos.component';
import { AcademicStagesComponent } from './pages/School_Administration/academic-stages/academic-stages.component';
import { RecordsComponent } from './pages/Reports/records/records.component';
import { SettingsComponent } from './pages/Settings_System/settings/settings.component';
import { BackupComponent } from './pages/Settings_System/backup/backup.component';
import { TopMenuComponent } from './layouts/top-menu/top-menu.component';
import { ClassroomsComponent } from './pages/School_Administration/classrooms/classrooms.component';
import { SubjectsComponent } from './pages/School_Administration/subjects/subjects.component';
import { SignMediaComponent } from './pages/School_Administration/sign-media/sign-media.component';
import { TimetableSlotsComponent } from './pages/School_Administration/timetable-slots/timetable-slots.component';
import { AttendanceRecordsComponent } from './pages/School_Administration/attendance-records/attendance-records.component';
import { RolesComponent } from './pages/Management_System/roles/roles.component';
import { AuthCredentialsComponent } from './pages/other_page/auth-credentials/auth-credentials.component';
import { TeachersComponent } from './pages/School_Administration/teacher/teacher.component';
import { TeacherAssignmentsComponent } from './pages/School_Administration/teacher-assignments/teacher-assignments.component';
import { LessonSessionsComponent } from './pages/School_Administration/lesson-sessions/lesson-sessions.component';
import { CertificateComponent } from './pages/Reports/certificate/certificate.component';
export const routes: Routes = [

  // صفحة تسجيل الدخول فقط
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
      { path: 'sign-in', component: SignInComponent }
    ]
  },

  // كل الصفحات داخل النظام محمية بالـ AuthGuard
  {
    path: '',
    component: MainLayoutComponent,
    canActivateChild: [AuthGuard],  // حماية كل الصفحات
    children: [
      { path: 'header', component: HeaderComponent },
      { path: 'dashboard', component: DashbordComponent },
      { path: 'admin-dashbord', component: AdminDashbordComponent },
      { path: 'admin-role', component: AdminRoleComponent },
      { path: 'class-room', component: ClassRoomComponent },
      { path: 'courses', component: CoursesComponent },
      { path: 'garades', component: GaradesComponent },
      { path: 'lessons', component: LessonsComponent },
      { path: 'profiles', component: ProfilesComponent },
      { path: 'pyments', component: PymentsComponent },
      { path: 'student', component: StudentsComponent },
      { path: 'users', component: UsersComponent },
      { path: 'videos', component: VideosComponent },
      { path: 'top-menu', component: TopMenuComponent },
      { path: 'academic-stages', component: AcademicStagesComponent },
      { path: 'records', component: RecordsComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'backup', component: BackupComponent },
      { path: 'classrooms', component: ClassroomsComponent },
      { path: 'subjects', component: SubjectsComponent },
      { path: 'sign-media', component: SignMediaComponent },
      { path: 'timetable_slots ', component: TimetableSlotsComponent },
      { path: 'attendance_records', component: AttendanceRecordsComponent },
      { path: 'home', component: HomeComponent },
      { path: 'roles', component: RolesComponent },
      { path: 'auth-credentials', component: AuthCredentialsComponent },
      { path: 'teacher', component: TeachersComponent },
      {path: 'teacher-assignments', component: TeacherAssignmentsComponent },
      {path: 'lesson-sessions', component: LessonSessionsComponent },
      {path: 'certificate', component:CertificateComponent }
    ]
  },

  // أي رابط خاطئ → يعود لصفحة تسجيل الدخول
  { path: '**', redirectTo: 'sign-in' }
];
