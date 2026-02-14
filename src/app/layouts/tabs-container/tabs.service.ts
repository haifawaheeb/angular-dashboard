import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface TabItem {
  title: string;
  route: string;
}

@Injectable({ providedIn: 'root' })
export class TabsService {
  private _tabs = new BehaviorSubject<TabItem[]>([]);
  tabs$ = this._tabs.asObservable();

  private _activeRoute = new BehaviorSubject<string>('');
  activeRoute$ = this._activeRoute.asObservable();

  get tabs(): TabItem[] {
    return this._tabs.value;
  }

  /** فتح تاب جديد أو تفعيله إذا كان مفتوح */
  openTab(title: string, route: string) {
    const exists = this.tabs.find(t => t.route === route);

    if (!exists) {
      this._tabs.next([...this.tabs, { title, route }]);
    }

    // اجعل التاب Active
    this._activeRoute.next(route);
  }

  /** إغلاق تاب */
  closeTab(route: string) {
    let newTabs = this.tabs.filter(t => t.route !== route);
    this._tabs.next(newTabs);

    // لو كان التاب المغلق هو الحالي → نفتح تاب آخر
    if (this._activeRoute.value === route) {
      if (newTabs.length > 0) {
        this._activeRoute.next(newTabs[newTabs.length - 1].route);
      } else {
        // this._activeRoute.next('/dashboard');  // لو لا يوجد Tabs → عودة للداشبورد
      }
    }
  }
}
