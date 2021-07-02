import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular Material
import {MatButtonModule} from '@angular/material/button';
// Fin Angular Material

import { DialogConfirmarComponent } from './dialog-confirmar.component';
@NgModule({
  declarations: [DialogConfirmarComponent],
  imports: [ 
    CommonModule,
    MatButtonModule
  ],
  exports: [DialogConfirmarComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
})
export class DialogConfirmarModule {}
