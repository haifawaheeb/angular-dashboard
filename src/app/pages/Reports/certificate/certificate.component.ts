import { Component } from '@angular/core';

@Component({
  selector: 'app-certificate',
  standalone: true,
  imports: [],
  templateUrl: './certificate.component.html',
  styleUrl: './certificate.component.scss'
})
export class CertificateComponent {
 lang: 'ar' | 'en' = 'ar';

  // بيانات الشهادة
  studentName = 'بيسان جميل سعيد محمد محمد';
  level = 'الروضة';
  issueDate = this.formatDateArabic(new Date());
  certNumber = this.generateCertNumber();

  print() {
    window.print();
  }

  toggleEnglish() {
    this.lang = this.lang === 'ar' ? 'en' : 'ar';
    // تحديث تاريخ العرض حسب اللغة
    this.issueDate = this.lang === 'ar'
      ? this.formatDateArabic(new Date())
      : this.formatDateEnglish(new Date());
  }

  private generateCertNumber(): string {
    // مثال: DALIL-KG-2026-0008
    const year = new Date().getFullYear();
    const rand = String(Math.floor(Math.random() * 9000) + 1000);
    return `DALIL-KG-${year}-${rand}`;
  }

  private formatDateArabic(d: Date): string {
    // تنسيق بسيط عربي
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day} / ${month} / ${year}`;
  }

  private formatDateEnglish(d: Date): string {
    return d.toLocaleDateString('en-GB');
  }
}
