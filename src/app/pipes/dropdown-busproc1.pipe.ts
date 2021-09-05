import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash'; 
@Pipe({
  name: 'dropdownBusProc1'
})
export class DropdownBusProc1Pipe implements PipeTransform {

  transform(value: any, args?: any): any {
    debugger;
    if(value!== undefined && value!== null){
      return _.uniqBy(value, 'orgId');
    }
    return value;
  }    

}
