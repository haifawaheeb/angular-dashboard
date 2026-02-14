import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TabsService, TabItem } from '../../core/services/tabs.service';

@Component({
  selector: 'app-tabs-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabs-container.component.html',
  styleUrls: ['./tabs-container.component.scss']
})
export class TabsContainerComponent {
  tabs: TabItem[] = [];
  activeTabId: string | null = null;

  constructor(private tabsService: TabsService, private router: Router) {
    // تحديث قائمة التبويبات
    this.tabsService.tabs$.subscribe(t => {
      this.tabs = t;
    });

    // كل ما يتغير التاب النشط → نعمل navigate للـ route التابع له
    this.tabsService.activeTabId$.subscribe(id => {
      this.activeTabId = id;

      if (!id) {
        // لا يوجد تبويب نشط → اقدر أختار صفحة افتراضية أو لا أفعل شيء
        // this.router.navigate(['/dashboard']);
        return;
      }

      const tab = this.tabs.find(t => t.id === id);
      if (tab) {
        this.router.navigate([tab.route]);
      }
    });
  }

  /** تفعيل تاب عند الضغط عليه */
  activate(id: string) {
    const tab = this.tabs.find(t => t.id === id);
    if (tab) {
      this.tabsService.openTab(tab); // هذا سيجعل activeTabId = id
    }
  }

  /** إغلاق تاب */
  close(id: string, event: MouseEvent) {
    event.stopPropagation(); // لا يشتغل كـ click على التاب نفسه
    this.tabsService.closeTab(id);

    // لو بعد الإغلاق لا يوجد تبويب نشط → ممكن أرجع للداشبورد
    if (!this.tabsService.activeTabIdSnapshot) {
      this.router.navigate(['/dashboard']);
    }
  }
}
