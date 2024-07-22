import { Directive, ElementRef, Input, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[searchProduct]',
  standalone: true
})
export class SearchProductDirective {

  private inputElement: HTMLInputElement;

  @Input() inputValue: string = '';

  constructor(private el: ElementRef) {
    this.inputElement = this.el.nativeElement as HTMLInputElement;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['inputValue']) {
      this.updateBorderColor();
    }
  }

  private updateBorderColor() {
    if (this.inputElement && this.inputElement.tagName === "INPUT") {
      this.inputElement.style.borderColor = this.verifyValue(this.inputValue);
    }
  }

  private verifyValue(condition: string): string {
    // Verificar que condition no sea null o undefined
    if (condition == null) {
      return "inherit";
    }
    if (condition.length > 0 && condition.length < 3) return "red";
    if (condition.length > 3) return "blue";
    return "inherit";
  }
}
