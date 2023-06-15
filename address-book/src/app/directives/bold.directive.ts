import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBold]',
})
export class BoldDirective {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'font-weight',
      'bold'
    );
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.removeStyle(this.elementRef.nativeElement, 'font-weight');
  }
}
