import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LayoutPrivateRoutingModule } from './layout-private-routing.module';

// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list'; 
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox'; 
import { MatRadioModule } from '@angular/material/radio'; 
import { MatSnackBarModule } from '@angular/material/snack-bar'; 
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table'; 
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips'; 
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card'; 
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRippleModule } from '@angular/material/core';

// Fin Angular Material

// Componentes
import { RubroABMComponent } from '../rubro-abm/rubro-abm.component';
import { LocalidadABMComponent } from '../localidad-abm/localidad-abm.component';
import { TipoDeRelacionABMComponent } from '../tipo-de-relacion-abm/tipo-de-relacion-abm.component';
import { HomeComponent } from '../home/home.component';
import { DialogConfirmarModule } from '../dialogs/dialog-confirmar/dialog-confirmar.module';
import { LayoutPrivateComponent } from './layout-private.component';

import { SecondaryChartComponent } from 'src/app/components/secondary-chart/secondary-chart.component';
import { MainChartComponent } from 'src/app/components/main-chart/main-chart.component';
import { PieChartComponent } from 'src/app/components/pie-chart/pie-chart.component';
import { LineChartComponent } from 'src/app/components/line-chart/line-chart.component';
import { DonutChartComponent } from 'src/app/components/donut-chart/donut-chart.component';

// Fin Componentes

// Service
import { DialogService } from 'src/app/services/dialog.service';
import { DepartamentoAbmComponent } from '../departamento-abm/departamento-abm.component';
import { EmpresaListadoComponent } from '../empresa-listado/empresa-listado.component';
import { EmpresaComponent } from '../empresa/empresa.component';
import { nombrePersonaModule } from 'src/app/pipes/nombre-persona.module';
// Fin Service

@NgModule({
  declarations: [
    RubroABMComponent,
    LocalidadABMComponent,
    TipoDeRelacionABMComponent,
    DepartamentoAbmComponent,
    HomeComponent,
    EmpresaListadoComponent,
    EmpresaComponent,

    SecondaryChartComponent,
    MainChartComponent,
    PieChartComponent,
    LineChartComponent,
    DonutChartComponent,

    LayoutPrivateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,

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
    MatDialogModule,
    MatPaginatorModule,
    MatRippleModule,

    DialogConfirmarModule,
    nombrePersonaModule,
    LayoutPrivateRoutingModule,
  ],
  exports: [
    RubroABMComponent,
    LocalidadABMComponent,
    TipoDeRelacionABMComponent,
    HomeComponent,
    LayoutPrivateComponent
  ],
  providers: [DialogService],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
})
export class LayoutPrivateModule {}
