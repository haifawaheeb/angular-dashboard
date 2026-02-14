import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgFor, NgIf, NgClass, NgTemplateOutlet } from '@angular/common';
import { Router } from '@angular/router';
import { MenuService } from '../../core/services/menu.service';
import { MenuGroup, MenuItem, MenuNode, isGroup } from '../../core/models/menu.models';
import { HasPermissionDirective } from '../../shared/directives/has-permission.directive';
import { ClickOutsideDirective } from '../../shared/directives/click-outside.directive';
import { TabsService } from '../../core/services/tabs.service';

@Component({
  selector: 'app-top-menu',
  standalone: true,
  imports: [
    NgFor, NgIf, NgClass, NgTemplateOutlet,
    HasPermissionDirective, ClickOutsideDirective
  ],
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent {
  private menu = inject(MenuService);
  private router = inject(Router);
  private tabs = inject(TabsService);

  nodes = toSignal(this.menu.nodes$, { initialValue: [] });

  isGroup = isGroup;
  isItem(node: MenuNode): node is MenuItem {
    return !isGroup(node);
  }

  toggle(node: MenuGroup) {
    this.menu.toggleExclusive(node.id);
  }

  closeAll() {
    this.menu.collapseAll();
  }

  trackById(index: number, item: any): string {
    return item?.id ?? index.toString();
  }

  /** فتح صفحة + فتح تاب لها */
  openPage(node: MenuItem) {
    if (!node.route) return;

    // افتح (أو فعّل) التاب
    this.tabs.openTab({
      id: node.id,
      label: node.label,
      route: node.route        // بدون "/" لأن الروتر عندك يستخدم 'dashboard'
    });

    // انتقل للصفحة
    this.router.navigate([node.route]);
  }

  onLeafClick(event: MouseEvent, node: MenuItem) {
    event.preventDefault();
    this.openPage(node);
  }
}
