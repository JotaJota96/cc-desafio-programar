import { Pipe, PipeTransform } from '@angular/core';
import { MsgService } from '../services/msg.service';

@Pipe({
  name: 'msg'
})
export class MsgPipe implements PipeTransform {

  constructor(
    private msg:MsgService
  ) {
    
  }
  transform(key: string): unknown {
    return this.msg.txt(key);
  }

}
