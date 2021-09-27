import { Directive, ElementRef, HostListener, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appValidate]'
})
export class ValidateDirective implements OnChanges {
  @Input() public appValidate:any
  @Input() public isValid:boolean

  constructor(private el: ElementRef) {

  }

  ngOnChanges(changes:any) {
    console.log(changes)
    if(changes.isValid.firstChange) return
    if(changes.isValid.currentValue) {
      this.el.nativeElement.classList.remove('form-invalid')
    }else {
      this.el.nativeElement.classList.add('form-invalid')
    }
  }

}
