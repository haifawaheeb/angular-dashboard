import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface TabItem {
  id: string;    // مثلاً: 'DASHBOARD'
  label: string; // مثلاً: 'لوحة التحكم'
  route: string; // مثلاً: 'dashboard'
}

@Injectable({ providedIn: 'root' })
export class TabsService {

  private _tabs$ = new BehaviorSubject<TabItem[]>([]);
  tabs$ = this._tabs$.asObservable();

  private _activeTabId$ = new BehaviorSubject<string | null>(null);
  activeTabId$ = this._activeTabId$.asObservable();

  get tabsSnapshot(): TabItem[] {
    return this._tabs$.value;
  }

  get activeTabIdSnapshot(): string | null {
    return this._activeTabId$.value;
  }

  /** فتح تاب (أو تفعيله إذا كان موجود أصلاً) */
  openTab(tab: TabItem) {
    const tabs = this._tabs$.value;
    const exists = tabs.find(t => t.id === tab.id);

    if (!exists) {
      this._tabs$.next([...tabs, tab]);
    }

    this._activeTabId$.next(tab.id);
  }

  /** إغلاق تاب */
  closeTab(id: string) {
    const tabs = this._tabs$.value;
    const filtered = tabs.filter(t => t.id !== id);
    this._tabs$.next(filtered);

    // إذا كان التاب المغلق هو النشط → فعّل آخر تاب أو خليها null
    if (this._activeTabId$.value === id) {
      const last = filtered[filtered.length - 1] || null;
      this._activeTabId$.next(last ? last.id : null);
    }
  }
}
