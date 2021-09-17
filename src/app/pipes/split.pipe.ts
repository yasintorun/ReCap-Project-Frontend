import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'split'
})
export class SplitPipe implements PipeTransform {

  transform(value: string,separator:string, num:number): string {
    value=value.replace(/\s/g, "")
    let newValue = ""
    
    for (let i = num; i < value.length; i++) {
      newValue += value.substring(i-num,i) + " "
    }
    return newValue;
  }

}
