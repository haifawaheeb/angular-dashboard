import { Directive, Input, ElementRef, Renderer2, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';
import { Role } from '../../core/models/Adminenums';


@Directive({
  selector: '[appHasPermission]',
  standalone: true
})
export class HasPermissionDirective implements OnInit {

  @Input('appHasPermission') allowed: Role[] | undefined;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    const userRoles = this.auth.currentRole ? [this.auth.currentRole] : [];

    const ok =
      !this.allowed ||
      this.allowed.length === 0 ||
      this.allowed.some(r => userRoles.includes(r));

    if (!ok) {
      // إخفاء العنصر إن لم يكن للمستخدم الصلاحية
      this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
    }
  }
}
