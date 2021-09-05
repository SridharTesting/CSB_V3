import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'value'
})
export class ValuePipe implements PipeTransform {
debugger;
  transform(objects : any = []) {
    return Object.values(objects);
  }

}
