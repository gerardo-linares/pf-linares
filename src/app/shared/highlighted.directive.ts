import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlighted]'
})
export class HighlightedDirective {

  constructor( private elementRef :ElementRef, private renderer: Renderer2 ) {
    console.log()
    this.renderer.setStyle(this.elementRef.nativeElement, 'font-size', '20px'),
    this.renderer.setStyle(this.elementRef.nativeElement, 'color', '#83ecd5')
    this.renderer.setStyle(this.elementRef.nativeElement, 'text-transform', 'uppercase')
    }

}
