import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LayoutPublicRoutingModule } from './layout-public-routing.module';

// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar'; 
import { MatCardModule } from '@angular/material/card'; 
import { MatSnackBarModule } from '@angular/material/snack-bar';
// Fin Angular Material

// Componentes
import { LayoutPublicComponent } from './layout-public.component';
import { LoginComponent } from '../login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogConfirmarModule } from 'src/app/private/dialogs/dialog-confirmar/dialog-confirmar.module';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogService } from 'src/app/services/dialog.service';
// Fin Componentes

// Service
// Fin Service

@NgModule({
  declarations: [
    LoginComponent,
    LayoutPublicComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatCardModule,
    MatDialogModule,
    MatSnackBarModule,

    DialogConfirmarModule,
    LayoutPublicRoutingModule
  ],
  exports: [
    LoginComponent,
    LayoutPublicComponent
  ],
  providers: [DialogService],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
})
export class LayoutPublicModule { }
