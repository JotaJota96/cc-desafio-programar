import { Pipe, PipeTransform } from '@angular/core';
import { MsgService } from '../services/msg.service';

@Pipe({
  name: 'error'
})
export class ErrorPipe implements PipeTransform {

  constructor(
    private msg:MsgService
  ) {
    
  }
  transform(errors: {[key:string]:any }): string {
    if (!errors) return '';
    return this.msg.error(errors);
  }

}
