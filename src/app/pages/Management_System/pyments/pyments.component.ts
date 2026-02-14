
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PymentsService } from '../../../services/pyment.service';

@Component({
  selector: 'app-pyments',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './pyments.component.html',
  styleUrl: './pyments.component.scss'
})
export class PymentsComponent {

// Text Config
  mainTitle = "اختر باقتك للعام الدراسي";
  subtitle = "تعلم لغة الإشارة بطريقة ممتعة وتفاعلية مع منصة دليل";

  package1Title = "باقة الروضة والتمهيدي";
  package1Description = "مناسبة للأطفال من 3-6 سنوات";

  package2Title = "باقة الصفوف الابتدائية";
  package2Description = "مناسبة للصفوف من 1-6";

  package3Title = "باقة المستوى المتقدم";
  package3Description = "للمراحل المتوسطة والثانوية";

  buttonText = "اشترك الآن";

  popup = {
    show: false,
    title: "",
    price: 0
  };

  subscribe(type: string, price: number) {
    const names: any = {
      kindergarten: "باقة الروضة والتمهيدي",
      primary: "باقة الصفوف الابتدائية",
      advanced: "باقة المستوى المتقدم"
    };

    this.popup = {
      show: true,
      title: names[type],
      price: price
    };
  }

  closePopup() {
    this.popup.show = false;
  }
}
