import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { TabsContainerComponent } from './tabs-container/tabs-container.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, TopMenuComponent, TabsContainerComponent],
  template: `
    <app-top-menu></app-top-menu>

    <div class="layout-shell">
      <app-tabs-container>
        <router-outlet></router-outlet>
      </app-tabs-container>
    </div>
  `,
  styles: [`
    :host { display:block; min-height:100vh; background:#f5f7fa; }
    .layout-shell { padding: 0; }
  `]
})
export class MainLayoutComponent {}
