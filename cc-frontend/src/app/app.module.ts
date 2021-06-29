import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';

// Angular Material
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list'; 
import {MatExpansionModule} from '@angular/material/expansion';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox'; 
import {MatRadioModule} from '@angular/material/radio'; 
import {MatSnackBarModule} from '@angular/material/snack-bar'; 
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table'; 
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatChipsModule} from '@angular/material/chips'; 
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatStepperModule} from '@angular/material/stepper';
import {MatCardModule} from '@angular/material/card'; 
import {MatDialogModule} from '@angular/material/dialog'; 
// Fin Angular Material

// Componentes
import { RubroABMComponent } from './private/rubro-abm/rubro-abm.component';
import { LocalidadABMComponent } from './private/localidad-abm/localidad-abm.component';
import { TipoDeRelacionABMComponent } from './private/tipo-de-relacion-abm/tipo-de-relacion-abm.component';
import { HomeComponent } from './private/home/home.component';
import { DialogConfirmarComponent } from './private/dialogs/dialog-confirmar/dialog-confirmar.component';
// Fin Componentes

@NgModule({
  declarations: [
    AppComponent,
    RubroABMComponent,
    LocalidadABMComponent,
    TipoDeRelacionABMComponent,
    HomeComponent,
    DialogConfirmarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSnackBarModule,
    MatSelectModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    MatCardModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
