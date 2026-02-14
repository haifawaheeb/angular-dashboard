import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


interface ServiceItem {
  icon: string;
  title: string;
  description: string;
}

type NotificationType = 'success' | 'error' | 'info';

interface NotificationState {
  type: NotificationType;
  message: string;
  // notification.type;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  // قائمة الخدمات
  services: ServiceItem[] = [
    {
      icon: '🎓',
      title: 'دورات تعليمية',
      description: 'دورات شاملة لجميع المستويات من المبتدئين إلى المحترفين',
    },
    {
      icon: '👥',
      title: 'تعليم جماعي',
      description: 'جلسات تفاعلية مع مجموعات صغيرة لتجربة تعليمية أفضل',
    },
    {
      icon: '📱',
      title: 'تطبيق تفاعلي',
      description: 'تعلم في أي وقت ومن أي مكان مع تطبيقنا المبتكر',
    },
    {
      icon: '🏆',
      title: 'شهادات معتمدة',
      description: 'احصل على شهادات معترف بها عند إتمام الدورات',
    },
    {
      icon: '💬',
      title: 'دعم مستمر',
      description: 'فريق دعم متاح 24/7 للإجابة على جميع استفساراتك',
    },
    {
      icon: '🎮',
      title: 'ألعاب تعليمية',
      description: 'تعلم من خلال ألعاب تفاعلية ممتعة ومسلية',
    },
  ];

  // حالة المودال
  showLoginModal = false;

  // حالة الإشعار
  notification: NotificationState | null = null;

  constructor() {}

  // سكرول للأقسام
  scrollTo(sectionId: string) {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // فتح/إغلاق مودال تسجيل الدخول
  openLoginModal() {
    this.showLoginModal = true;
  }

  closeLoginModal() {
    this.showLoginModal = false;
  }

  // معالجة تسجيل الدخول
  onLoginSubmit(email: string, password: string) {
    // هنا مستقبلاً تربطينه بالـ API
    console.log('Login with:', email, password);
    this.closeLoginModal();
    this.showNotification('success', 'تم تسجيل الدخول بنجاح! مرحباً بك في منصة دليل 🎉');
  }

  // معالجة الاشتراك في النشرة
  onNewsletterSubmit(email: string) {
    console.log('Newsletter email:', email);
    this.showNotification('success', '🎉 تم الاشتراك في النشرة البريدية بنجاح');
  }

  // إظهار الإشعار
  showNotification(type: NotificationType, message: string) {
    this.notification = { type, message };
    setTimeout(() => {
      this.notification = null;
    }, 4000);
  }
}
