import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// ✅ Angular Material Modules
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
// ✅ Dragula للسحب والإفلات
// import { DragulaModule } from 'ng2-dragula';

// ✅ ngx-translate للترجمة
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-admin-dashbord',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule,
    MatIconModule,
    MatButtonModule,MatButtonModule,
    MatCardModule,
    MatCheckboxModule,MatCardModule,
    MatListModule,
    MatDialogModule,
    // DragulaModule,
    TranslateModule,
  ],
templateUrl: './admin-dashbord.component.html',
styleUrls: ['./admin-dashbord.component.scss']
})
export class AdminDashbordComponent {
root: 'ltr' | 'rtl' = 'rtl';

// root: 'ltr' | 'rtl' = document.dir === 'rtl' ? 'rtl' : 'ltr';



  // ✅ العنصر المحدد
  SelectedMenu: any = { name: 'القائمة الافتراضية' };

  // ✅ الأعمدة الظاهرة
  ShowCol = [
    { name: 'الاسم' },
    { name: 'العمر' },
    { name: 'الوظيفة' },
  ];

  // ✅ الأعمدة المخفية
  hideCol = [
    { name: 'المدينة' },
    { name: 'الجنسية' },
  ];

  // ✅ إظهار زر "الوضع الافتراضي"
  showDefault: boolean = true;

  // ✅ عند إزالة عنصر من الأعمدة
  removeItem(item: any, toHidden: boolean) {
    if (toHidden) {
      // نقل من الأعمدة الظاهرة إلى المخفية
      this.ShowCol = this.ShowCol.filter((x) => x !== item);
      this.hideCol.push(item);
    } else {
      // نقل من المخفية إلى الظاهرة
      this.hideCol = this.hideCol.filter((x) => x !== item);
      this.ShowCol.push(item);
    }
  }

  // ✅ تحديد عمود عند الضغط بالزر الأيمن
  seSelectedCol(item: any, event: MouseEvent) {
    event.preventDefault(); // منع القائمة الافتراضية
    this.SelectedMenu = item;
    console.log('تم اختيار العمود:', item.name);
  }

  // ✅ حفظ التغييرات
  Submit() {
    console.log('تم حفظ التغييرات ✅');
    console.log('الأعمدة الظاهرة:', this.ShowCol);
    console.log('الأعمدة المخفية:', this.hideCol);
  }

  // ✅ تعيين القيم الافتراضية
  setDefault() {
    this.ShowCol = [
      { name: 'الاسم' },
      { name: 'العمر' },
      { name: 'الوظيفة' },
    ];
    this.hideCol = [{ name: 'المدينة' }, { name: 'الجنسية' }];
    console.log('تمت استعادة الوضع الافتراضي ✅');
  }


   tabs = [
    {
      name: 'الرئيسية',
      route: '/home',
      icon: 'fa fa-home',
      open: false,
      items: [
        {
          name: 'لوحة التحكم',
          route: '/home/dashboard',
          open: false,
          subItems: [
            { name: 'نظرة عامة', route: '/home/overview' },
            { name: 'الإحصائيات', route: '/home/stats' }
          ]
        },
        {
          name: 'التقارير',
          route: '/home/reports',
          open: false,
          subItems: [
            { name: 'تقرير شهري', route: '/home/reports/monthly' },
            { name: 'تقرير سنوي', route: '/home/reports/yearly' }
          ]
        }
      ]
    },
    {
      name: 'المستخدمين',
      route: '/users',
      icon: 'fa fa-users',
      open: false,
      items: [
        {
          name: 'قائمة المستخدمين',
          route: '/users/list',
          open: false,
          subItems: [
            { name: 'المشرفين', route: '/users/admins' },
            { name: 'الطلاب', route: '/users/students' }
          ]
        },
        {
          name: 'إضافة مستخدم',
          route: '/users/add',
          open: false,
          subItems: [
            { name: 'إضافة مشرف', route: '/users/add-admin' },
            { name: 'إضافة طالب', route: '/users/add-student' }
          ]
        }
      ]
    },
    {
      name: 'الإعدادات',
      route: '/settings',
      icon: 'fa fa-cog',
      open: false,
      items: [
        {
          name: 'العام',
          route: '/settings/general',
          open: false,
          subItems: [
            { name: 'واجهة المستخدم', route: '/settings/ui' },
            { name: 'النظام', route: '/settings/system' }
          ]
        },
        {
          name: 'الأمان',
          route: '/settings/security',
          open: false,
          subItems: [
            { name: 'كلمات المرور', route: '/settings/passwords' },
            { name: 'صلاحيات الوصول', route: '/settings/roles' }
          ]
        }
      ]
    }
  ];


  // ✅ تبديل القائمة الرئيسية
  toggleMenu(tab: any) {
    tab.open = !tab.open;
  }

  // ✅ تبديل القائمة الفرعية
  toggleSubMenu(tab: any, item: any) {
    console.log('تم الضغط على العنصر:', item.name, 'داخل التبويب:', tab.name);
    // يمكنكِ هنا تنفيذ التنقل أو أي حدث آخر
  }

  // (اختياري) دالة إغلاق
  closedlg() {
    console.log('تم إغلاق الحوار');
  }
}


export enum Radius{
  BorderRadius1='50px 50px 0 50px',
  BorderRadius2= '50px 0 122px 0',
  BorderRadius3='50px 0 0 50px',

  BorderRadiusChild='10px',
 }

 export enum backColorMenu{
  backColor1='#2E0E0EFF',
  backColor2= '#F0CA0FFF',
  backColor3='#419B80FF',
  backColor4='#EC9A0CFF',
  backColor5= '#6C2E2EFF',
  backColor6='#8D136EFF',
  backColor7='#D51EE2FF',
  backColor8='#310318FF',

 }
export class ChildrenItems {
  state: string = '';
  name: string = '';
  type?: string;
  icon?: string;
  faicon?: string;
  componentname?: string;
  selector?: string;
  Class?: any;
  PageType?: any;
  PageType_2?: any;
  MainMenu: boolean = false;
  FatherMenu?: string;
  PageId?: number;
  Dialogcomp?: boolean;
  NoRole: boolean = false;
  SysId?: number;
  hidden: boolean = true;
  Activate: boolean = true;
  order?: number;
  backColor: any = 'orange';
  BorderRadius?: string;
  fontFamily?: string;
  fontSize?: string;
  fontColor?: string;
  ChildrenMenu?: ChildrenItems[];
  width?: string;
  AmanActive: boolean = true;
  KeyWord: any[] = [];
  onClick?(item?: any): void;
  UseEvent: boolean = false;
}

export class Menu {
  sOrder?: number;
  state: string = '';
  name: string = '';

  componentname?: string;
  type: string = '';
  icon: string = '';
  faicon?: string;
  children?: ChildrenItems[];
  SysId?: number;
  hidden: boolean = false;
  Activate: boolean = true;
  AmanActive: boolean = true;
  backColor?: any;
  BorderRadius?: string;
  fontFamily?: string;
  fontSize?: string;
  fontColor?: string;
  useAdd?: boolean;
  OpenMenu: boolean = false;
  matBadge: number = 0;
  EventMenu?: (menu?: any) => void;
}
export enum FontSizeMenu{
  FontSize1='20px',
  FontSize2='18px',
  FontSize3='16px',
  FontSize4='14px',
  FontSize5='12px',
 }
  export enum FontColorMenu{
  FontColor1='#000000',
  FontColor2='#333333',
  FontColor3='#666666',
  FontColor4='#999999',
  FontColor5='#FFFFFF',
 }


 export enum my_page {
 student = 1,
  users = 2,
  grades = 3,
  roles = 4,
  A = 5,
  B = 6,
  C = 7,
  D = 8,
  E=10,
}
