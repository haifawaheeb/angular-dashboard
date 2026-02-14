import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatRadioModule
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent implements OnInit {

  // ----------- FORM DATA -----------
  username: string = '';
  password: string = '';
  rememberMe: boolean = false;
  language: string = 'ar';

  // ----------- STATE -----------
  errorMessage: string = '';
  isLoading: boolean = false;
  loginResponse: any = null;
  loginError: string = '';
  error: string = '';


  // ----------- SERVICES -----------
  private auth = inject(AuthService);
  private router = inject(Router);

  ngOnInit() {
    console.log('📌 SignInComponent Loaded');
  }
  constructor(
    private authService: AuthService,
  ) { }


  // ----------- LOGIN FUNCTION -----------
  onLogin() {
    this.error = '';
    this.isLoading = true;

    this.auth.login(this.username, this.password).subscribe({
      next: () => {
        this.isLoading = false;
        console.log('✅ Successfully logged in');
       this.router.navigate(['/class-room']);
      },
      error: (err: any) => {
        this.isLoading = false;
        this.error = err.message || 'حدث خطأ أثناء تسجيل الدخول';
        console.error('❌ Login failed:', err);
      }
    });
  }


// async loginWithFingerprint() {
//   console.log('🔐 loginWithFingerprint called');
//   try {
//     const publicKey: PublicKeyCredentialRequestOptions = {
//       challenge: new Uint8Array(32),
//       timeout: 60000,
//       userVerification: 'preferred'
//     };
//     const credential = await navigator.credentials.get({ publicKey });
//     if (credential) {
//       alert('✅ تم تسجيل الدخول بالبصمة بنجاح!');
//     }
//   } catch (err) {
//     alert('⚠️ فشل تسجيل الدخول بالبصمة');
//     console.error(err);
//   }
// // }
//   //  console.log('🔒 تسجيل الدخول بالبصمة معطل مؤقتًا للتجارب اظلمحلية');
//   // alert('ميزة البصمة غير مفعلة في الوضع المحلي.');}
// constructor(private auth: AuthService) {}
// error: string = '';
// onSubmit() {
//   this.auth.login(this.username, this.password).subscribe({
//     next: () => redirectAfterLogin(),
//     error: err => this.error = err.message
//   });
// }}
}
