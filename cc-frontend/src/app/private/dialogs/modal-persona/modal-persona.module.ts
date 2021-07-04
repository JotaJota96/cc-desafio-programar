import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// Fin Angular Material

// Service
import { ModalPersonaComponent } from './modal-persona.component';
// Fin Service

// Pipe
import { MsgModule } from 'src/app/pipes/msg.module';
import { ErrorModule } from 'src/app/pipes/error.module';
// Fin Pipe

@NgModule({
  declarations: [
    ModalPersonaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,

    ErrorModule,
    MsgModule,
  ],
  exports: [
    ModalPersonaComponent
  ],
  providers: [],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
  ],
})
export class ModalPersonaModule {}
