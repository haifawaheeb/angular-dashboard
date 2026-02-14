import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataService } from './data.service';
import { HeaderComponent } from './pages/other_page/header/header.component';
import { FooterComponent } from './pages/other_page/footer/footer.component';
import { HomeComponent } from './pages/other_page/home/home.component';
import { ClassRoomComponent } from './pages/School_Administration/class-room/class-room.component';
import { SignInComponent } from './pages/School_Administration/sign-in/sign-in.component';
import { DashbordComponent } from './pages/Management_System/dashbord/dashbord.component';
import { LessonsComponent } from './pages/School_Administration/lessons/lessons.component';
import { CoursesComponent } from './pages/School_Administration/courses/courses.component';
import { GaradesComponent } from './pages/School_Administration/garades/garades.component';
import { AdminDashbordComponent } from './pages/Management_System/admin-dashbord/admin-dashbord.component';
import { VideosComponent } from './pages/School_Administration/videos/videos.component';
import { StudentsComponent } from './pages/School_Administration/student/student.component';
import { ProfilesComponent } from './pages/Management_System/profiles/profiles.component';
import { UsersComponent } from './pages/Management_System/users/users.component';
import { BackupComponent } from './pages/Settings_System/backup/backup.component';
import { SettingsComponent } from './pages/Settings_System/settings/settings.component';
import { RecordsComponent } from './pages/Reports/records/records.component';
import { TabsContainerComponent } from './layouts/tabs-container/tabs-container.component';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatIconModule } from '@angular/material/icon';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>`,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    translate.addLangs(['ar', 'en']);
    translate.setDefaultLang('ar');
    translate.use('ar');
  }
}

