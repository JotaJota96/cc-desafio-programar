import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MsgPipe } from './msg.pipe';


@NgModule({
  declarations: [
    MsgPipe
  ],
  imports: [
  ],
  exports: [
    MsgPipe,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
})
export class MsgModule {}
