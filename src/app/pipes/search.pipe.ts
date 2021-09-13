import { Brand } from '../models/brand';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'SearchPipe'
})
export class SearchPipe implements PipeTransform {

  transform(value: any[], prop:string, filterText:string): any[] {
    filterText = filterText ? filterText.toLowerCase() : ""
    return filterText?value.filter(p => p[prop]?.toLowerCase().indexOf(filterText) !== -1) : value;
  }

}
