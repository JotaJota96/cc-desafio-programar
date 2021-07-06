import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ErrorPipe } from './error.pipe';

@NgModule({
  declarations: [
    ErrorPipe
  ],
  imports: [
  ],
  exports: [
    ErrorPipe,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
})
export class ErrorModule {}
