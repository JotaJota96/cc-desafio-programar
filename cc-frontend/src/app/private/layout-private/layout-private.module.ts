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
import { MatProgressBarModule } from '@angular/material/progress-bar'; 
import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card'; 
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRippleModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTooltipModule } from '@angular/material/tooltip';

// Fin Angular Material

// Componentes
import { RubroABMComponent } from '../rubro-abm/rubro-abm.component';
import { LocalidadABMComponent } from '../localidad-abm/localidad-abm.component';
import { TipoDeRelacionABMComponent } from '../tipo-de-relacion-abm/tipo-de-relacion-abm.component';
import { HomeComponent } from '../home/home.component';
import { DialogConfirmarModule } from '../dialogs/dialog-confirmar/dialog-confirmar.module';
import { LayoutPrivateComponent } from './layout-private.component';

import { MainChartComponent } from 'src/app/components/main-chart/main-chart.component';
import { PieChartComponent } from 'src/app/components/pie-chart/pie-chart.component';
import { DonutChartComponent } from 'src/app/components/donut-chart/donut-chart.component';
import { ChartEmpresaLocalidadComponent } from 'src/app/private/chart-empresa-localidad/chart-empresa-localidad.component';

import { EmpresaRubroComponent } from 'src/app/private/empresa-rubro/empresa-rubro.component';
import { AltaBajaMesComponent } from 'src/app/private/alta-baja-mes/alta-baja-mes.component';
import { AniversarioEmpresaComponent } from 'src/app/private/aniversario-empresa/aniversario-empresa.component';

// Fin Componentes
import { ImageCropperModule } from 'ngx-image-cropper';

// Service
import { DialogService } from 'src/app/services/dialog.service';
import { DepartamentoAbmComponent } from '../departamento-abm/departamento-abm.component';
import { EmpresaListadoComponent } from '../empresa-listado/empresa-listado.component';
import { EmpresaComponent } from '../empresa/empresa.component';
import { nombrePersonaModule } from 'src/app/pipes/nombre-persona.module';
import { EmpresaEditarComponent } from '../empresa-editar/empresa-editar.component';
import { ModalCropperComponent } from 'src/app/private/dialogs/modal-cropper/modal-cropper.component';
import { ModalPersonaModule } from '../dialogs/modal-persona/modal-persona.module';
import { MsgModule } from 'src/app/pipes/msg.module';
import { ErrorModule } from 'src/app/pipes/error.module';
import { PersonaAbmComponent } from '../persona-abm/persona-abm.component';
import { UsuarioAbmComponent } from '../usuario-abm/usuario-abm.component';
import { ModalUserModule } from '../dialogs/modal-user/modal-user.module';
// Fin Service

@NgModule({
  declarations: [
    RubroABMComponent,
    LocalidadABMComponent,
    TipoDeRelacionABMComponent,
    DepartamentoAbmComponent,
    PersonaAbmComponent,
    UsuarioAbmComponent,
    HomeComponent,
    EmpresaListadoComponent,
    EmpresaComponent,

    MainChartComponent,
    PieChartComponent,
    DonutChartComponent,
    EmpresaEditarComponent,
    ChartEmpresaLocalidadComponent,

    EmpresaRubroComponent,
    AltaBajaMesComponent,
    AniversarioEmpresaComponent,

    LayoutPrivateComponent,
    ModalCropperComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,

    ImageCropperModule,

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
    MatProgressBarModule,
    MatStepperModule,
    MatCardModule,
    MatDialogModule,
    MatPaginatorModule,
    MatRippleModule,
    MatAutocompleteModule,
    MatTooltipModule,
    
    DialogConfirmarModule,
    nombrePersonaModule,
    LayoutPrivateRoutingModule,
    
    MsgModule,
    ErrorModule,
    ModalUserModule,
    ModalPersonaModule,
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
    CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
  ],
})
export class LayoutPrivateModule {}
