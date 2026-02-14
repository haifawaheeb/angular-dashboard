import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  userName: string = ' هيفاء زهيب ';
  userInitial: string = 'ه';
  siteTitle: string = ' دليل ';
  isMobileMenuOpen: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // الحصول على بيانات المستخدم من localStorage
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      this.userName = user.first_name + ' ' + user.last_name || user.username;
      this.userInitial = this.userName.charAt(0).toUpperCase();
    }
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  handleLogout() {
    if (confirm('هل أنت متأكد من رغبتك في تسجيل الخروج؟')) {
      this.authService.logout();
      this.router.navigate(['/sign-in']);
    }
  }
}
