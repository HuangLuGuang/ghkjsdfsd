import { Pipe, PipeTransform } from '@angular/core';

//位数补全
@Pipe({
  name: 'digitCompletion'
})
export class DigitCompletionPipe implements PipeTransform {

  transform(value: number,args?: any): unknown {
    let s = '';
    var i = value;
    var l=0;
    while(args >1){
      i = i/10;
      if(i < 1 )s+='0'
      args -- ;
    }
    s += value;
    return s;
  }

}
