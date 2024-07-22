import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'upperCaseSpecial',
  standalone: true
})
export class UpperCaseSpecialPipe implements PipeTransform {

  transform(value: string): string {
    return value.split(" ").map(
      (word) => {
        return word.split('').map(
          (char, i) => i === 0?char.toUpperCase():char.toLowerCase()
        ).join("")
      }
    ).join(" ");
  }

}
