import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NombrePersonaPipe } from './nombre-persona.pipe';
import { MsgPipe } from './msg.pipe';


@NgModule({
  declarations: [
    NombrePersonaPipe,
  ],
  imports: [
  ],
  exports: [
    NombrePersonaPipe,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
})
export class nombrePersonaModule {}
