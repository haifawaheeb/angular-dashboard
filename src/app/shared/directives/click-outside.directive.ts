import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appClickOutside]',
  standalone: true,
})


export class ClickOutsideDirective {
@Output() appClickOutside = new EventEmitter<void>();
constructor(private el: ElementRef) {}
@HostListener('document:click', ['$event'])
onDoc(e: MouseEvent) {
if (!this.el.nativeElement.contains(e.target)) this.appClickOutside.emit();
}
}




