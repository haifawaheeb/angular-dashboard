import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// ✅ استيراد Angular Material
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


export class MenuItem {
  constructor(
    public title: string,
    public icon?: string,
    public route?: string,
    public color?: string,
    public children: MenuItem[] = []
  ) {}
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule,MatButtonModule,MatIconModule,MatMenuModule,RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})

export class MenuComponent {
  menu: MenuItem[] = [
    new MenuItem('نظام الإدارة', 'settings', '', '#A6B1E1', [
      new MenuItem('إدارة المستخدمين', 'group', '', '', [
        new MenuItem('المستخدمون النشطون', 'verified_user', '', '', [
          new MenuItem('عرض التفاصيل', 'visibility', '/admin/users/details'),
          new MenuItem('تعديل المستخدم', 'edit', '/admin/users/edit')
        ]),
        new MenuItem('صلاحيات الوصول', 'security', '', '', [
          new MenuItem('المشرفون', 'admin_panel_settings', '/admin/roles/super'),
          new MenuItem('الموظفون', 'person', '/admin/roles/staff')
        ])
      ]),
      new MenuItem('إدارة النظام', 'dashboard_customize', '', '', [
        new MenuItem('الإعدادات العامة', 'tune', '/admin/settings'),
        new MenuItem('السجلات', 'history', '/admin/logs')
      ])
    ]),
    new MenuItem('المبيعات والمشتريات', 'store', '', '#F5CBA7', [
      new MenuItem('المبيعات', 'shopping_cart', '', '', [
        new MenuItem('الفواتير', 'receipt', '/sales/invoices'),
        new MenuItem('العملاء', 'people', '/sales/customers')
      ]),
      new MenuItem('المشتريات', 'shopping_bag', '', '', [
        new MenuItem('طلبات الشراء', 'list_alt', '/purchases/orders'),
        new MenuItem('الموردين', 'local_shipping', '/purchases/suppliers')
      ])
    ])
  ];
}
