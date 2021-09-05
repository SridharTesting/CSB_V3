import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash'; 
@Pipe({
  name: 'uniqueValues'
})
export class UniqueValuesPipe implements PipeTransform {

  transform(value: any, args?: any): any {
debugger;
if(value!== undefined && value!== null){
  return _.uniqBy(value, 'lobId');
}
return value;

 
  }
}
