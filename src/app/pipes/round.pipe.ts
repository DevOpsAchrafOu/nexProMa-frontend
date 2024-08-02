import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'round'
})
export class RoundPipe implements PipeTransform {

  transform(value: number): number {

    if(value==null || value==0)
      return 0;
    // Round to nearest 5
    let rounded = Math.round(value / 5) * 5;

    // If the original value is less than the rounded value,
    // and the difference is more than 2.5, round down instead
    if (value < rounded && rounded - value > 2.5) {
      rounded -= 5;
    }

    return rounded;
  }

}
