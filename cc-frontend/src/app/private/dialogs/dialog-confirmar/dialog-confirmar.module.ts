import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular Material
import {MatButtonModule} from '@angular/material/button';
import { MsgModule } from 'src/app/pipes/msg.module';
// Fin Angular Material

import { DialogConfirmarComponent } from './dialog-confirmar.component';
// pipes
import { ErrorModule } from 'src/app/pipes/error.module';
// Fin pipes

@NgModule({
  declarations: [DialogConfirmarComponent],
  imports: [ 
    CommonModule,
    MatButtonModule,
    ErrorModule,
    MsgModule
  ],
  exports: [DialogConfirmarComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
})
export class DialogConfirmarModule {}
