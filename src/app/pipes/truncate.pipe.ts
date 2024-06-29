import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

/*
  The transform method is essential to a pipe. The PipeTransform interface defines that method and guides both tooling and the compiler. Technically, it's optional; Angular looks for and executes the transform method regardless.
  */

  transform(value: string, limit: number): string {
    return value.length < limit
      ? value
      : value.slice(0, limit) + '...';
  }

}
