import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgFor, NgIf, NgClass, NgTemplateOutlet } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MenuService } from '../../../core/services/menu.service';
import { MenuGroup, MenuItem, MenuNode, isGroup } from '../../../core/models/menu.models';
import { HasPermissionDirective } from '../../../shared/directives/has-permission.directive';
import { ClickOutsideDirective } from '../../../shared/directives/click-outside.directive';
import { TabsService } from '../../../core/services/tabs.service';


@Component({
  selector: 'app-dashbord',
  standalone: true,
  imports: [
   NgFor, NgIf, NgClass, NgTemplateOutlet,
    RouterLink, RouterLinkActive,
    HasPermissionDirective, ClickOutsideDirective// ⬅️ مهم جداً!
  ],
  templateUrl: './dashbord.component.html',
  styleUrl: './dashbord.component.scss'
})
export class DashbordComponent  {
   private menu = inject(MenuService);
  private router = inject(Router);
  private tabs = inject(TabsService);  // ✅ للتبويبات
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
openPage(node: any) {
  if (!node.route) return;

  this.tabs.openTab({
    id: node.id,
    label: node.label,
    route: '/' + node.route
  });

  this.router.navigate(['/' + node.route]);
}




}
