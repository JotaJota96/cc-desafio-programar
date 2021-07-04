import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router"
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { inCardAnimation, inInfoAnimation, inTitleAnimation } from 'src/app/animation';
import { DepartamentoDTO } from 'src/app/classes/departamento-dto';
import { EmpresaDTO } from 'src/app/classes/empresa-dto';
import { ModalCropperComponent } from 'src/app/private/dialogs/modal-cropper/modal-cropper.component';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { DialogActionResult, DialogService, DialogType } from 'src/app/services/dialog.service';
import { EmpresaPersonaService } from 'src/app/services/empresa-persona.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { RubroService } from 'src/app/services/rubro.service';
import { MatDialog } from '@angular/material/dialog';
import { PersonaDTO } from 'src/app/classes/persona-dto';
import { PaginacionDTO } from 'src/app/classes/paginacion-dto';
import { PersonaService } from 'src/app/services/persona.service';
import { EmpresaPersonaDTO } from 'src/app/classes/empresa-persona-dto';
import { TipoRelacionDTO } from 'src/app/classes/tipo-relacion-dto';
import { TipoRelacionService } from 'src/app/services/tipo-relacion.service';
import { Observable } from 'rxjs';
import { debounceTime, map, startWith, switchMap } from 'rxjs/operators';
import { ModalPersonaComponent } from '../dialogs/modal-persona/modal-persona.component';
import { MsgService } from 'src/app/services/msg.service';

export enum Role {
  ADMIN = 0,
  USUARIO = 1,
  INVITADO = 2,
  ADMIN_USUARIO = 3,
}

@Component({
  selector: 'app-empresa-editar',
  templateUrl: './empresa-editar.component.html',
  styleUrls: ['./empresa-editar.component.scss'],
  animations: [
    inCardAnimation,
    inTitleAnimation,
    inInfoAnimation
  ]
})
export class EmpresaEditarComponent implements OnInit {
  id:string = '';
  elemento:EmpresaDTO = new EmpresaDTO;
  reqCargar:Promise<any> | null = null;
  
  reqListadoDepartamento:Promise<any> | null = null;  
  listaDepartamento: DepartamentoDTO[] = [];
  indexDepartamento:number = -1;

  reqListadoRubro:Promise<any> | null = null;  
  listaRubro: DepartamentoDTO[] = [];

  reqListadoTipoRelacion:Promise<any> | null = null;  
  listaTipoRelacion: TipoRelacionDTO[] = [];
  filtradoTipoRelacion: Observable<TipoRelacionDTO[]> = this.PreparefilterTipoRelacion();
  filtradoPersona: Observable<PersonaDTO[]> = this.PreparefilterPersona();

  reqListadoPersona:Promise<any> | null = null;  
  listaPersona: PersonaDTO[] = [];

  reqGuardar:Promise<any> | null = null;  
  reqFilterPersona: Promise<PersonaDTO[]> | null = null;
  reqFilterTipoRelacion: Promise<TipoRelacionDTO[]> | null = null;
  
  isAdmin:boolean = true; // el usuario es admin
  idMisEmpresa:string[] = ['3']; // listados de empresas del usuarioo

  public formulario: FormGroup = new FormGroup({});

  constructor(
    private msg: MsgService,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private modal: MatDialog,
    protected dialog: DialogService,
    protected service: EmpresaService,
    protected servicePersona: PersonaService,
    protected serviceEmpresaPersona: EmpresaPersonaService,
    protected serviceDepartamento: DepartamentoService,
    protected serviceTipoRelacion: TipoRelacionService,
    protected serviceRubro: RubroService
  ) {
    this.resetearFormulario();
    this.resetearFormularioEmpresaPersona();
  }
  mostrarForm:boolean = false;

  ngOnInit(): void {
    this.cargarListaDepartamento();
    this.cargarListaRubros();
    this.cargarListaTipoRelacion();
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id') || '';
      if (this.id == null || this.id == '') {
        this.mostrarForm = true;
      } else if (isNaN(parseInt(this.id))) {
        this._snackBar.open(this.msg.txt('noId'), 'Undo');
        this.mostrarForm = true;
      } else {
        this.cargarEmpresa(this.id);
        this.cargarListaEmpresaPersona();
      }
    });
  }
  
  resetearFormulario() {
    // vaciar formulario
    this.formulario = new FormGroup({
      razon_social: new FormControl('', [ Validators.minLength(4), Validators.maxLength(200)]),
      nombre_fantasia: new FormControl('', [ Validators.minLength(4), Validators.maxLength(200)]),
      logo: new FormControl(''),
      rubro_principal_id: new FormControl('', [Validators.required]),
      rubro_secundaria_id: new FormControl(''),
      
      nro_rut: new FormControl('', [Validators.pattern(/^[0-9]{12}$/)]),
      nro_bps: new FormControl('', [Validators.pattern(/^[0-9]{6}$/)]),
      nro_referencia: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(200)]),
  
      localidad_id: new FormControl('', [Validators.required]),
      departamento_id: new FormControl(''),
      direccion: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(200)]),
  
      email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(4), Validators.maxLength(200)]),
      celular: new FormControl('', [ Validators.minLength(4), Validators.maxLength(200)]),
      telefono: new FormControl('', [ Validators.minLength(4), Validators.maxLength(200)]),
  
      fecha_inicio: new FormControl(''),
      observaciones: new FormControl('', [ Validators.minLength(4)]),

    });
    // Si se paso un elemento, colocar los datos del elemento pasado
    if (this.elemento != undefined) {
      this.formulario.controls['razon_social'].setValue(this.elemento.razon_social);
      this.formulario.controls['nombre_fantasia'].setValue(this.elemento.nombre_fantasia);
      this.formulario.controls['logo'].setValue(this.elemento.logo);
      this.formulario.controls['rubro_principal_id'].setValue(this.elemento.rubro_principal_id);
      this.formulario.controls['rubro_secundaria_id'].setValue(this.elemento.rubro_secundaria_id);
      this.formulario.controls['nro_rut'].setValue(this.elemento.nro_rut);
      this.formulario.controls['nro_bps'].setValue(this.elemento.nro_bps);
      this.formulario.controls['nro_referencia'].setValue(this.elemento.nro_referencia);
      this.formulario.controls['localidad_id'].setValue(this.elemento.localidad_id);
      if (this.elemento.localidad) {
        this.formulario.controls['departamento_id'].setValue(this.elemento.localidad.departamento_id);
        if (this.listaDepartamento) this.listaDepartamento.map((departamento:DepartamentoDTO, index:number) => {
          if (departamento.id == this.elemento.localidad?.departamento_id) {
            this.indexDepartamento = index;
          }
        });
      }
      this.formulario.controls['direccion'].setValue(this.elemento.direccion);
      this.formulario.controls['email'].setValue(this.elemento.email);
      this.formulario.controls['celular'].setValue(this.elemento.celular);
      this.formulario.controls['telefono'].setValue(this.elemento.telefono);
      this.formulario.controls['fecha_inicio'].setValue(this.elemento.fecha_inicio);
      this.formulario.controls['observaciones'].setValue(this.elemento.observaciones);
    }
    console.log(this.formulario);
    
  }

  cargarEmpresa(id:string = '') {
    this.reqCargar = this.service.get(id, { 'full':null })
    this.reqCargar.then((data: any) => {
      this.elemento = data;
      this.resetearFormulario();
    })
    .catch((error) => {
      this._snackBar.open(error['error'] ? error['error'].join(", ") : this.msg.txt('falla'), 'Undo');
    })
    .finally(() => {
      this.mostrarForm = true;
      this.reqCargar = null;
    });
  }
  selectDepartamento(i:number) {
    this.indexDepartamento = i;
  }
  cargarListaTipoRelacion() {
    if (this.reqListadoTipoRelacion != null) return;
    this.reqListadoTipoRelacion = this.serviceTipoRelacion.getAll({ 'simple' : null, 'full': null })
    this.reqListadoTipoRelacion.then((data: any) => {
      this.listaTipoRelacion = data;
    })
    .catch((error) => {
      this._snackBar.open(error['error'] ? error['error'].join(", ") : this.msg.txt('falla'), 'Undo');
    })
    .finally(() => {
      this.reqListadoTipoRelacion = null;
    });
  }
  cargarListaDepartamento() {
    if (this.reqListadoDepartamento != null) return;
    this.reqListadoDepartamento = this.serviceDepartamento.getAll({ 'simple' : null, 'full': null })
    this.reqListadoDepartamento.then((data: any) => {
      this.listaDepartamento = data;
      if (this.elemento && this.elemento.localidad) this.listaDepartamento.map((departamento:DepartamentoDTO, index:number) => {
        if (departamento.id == this.elemento.localidad?.departamento_id) {
          this.indexDepartamento = index;
        }
      });
    })
    .catch((error) => {
      this._snackBar.open(error['error'] ? error['error'].join(", ") : this.msg.txt('falla'), 'Undo');
    })
    .finally(() => {
      this.reqListadoDepartamento = null;
    });
  }
  cargarListaRubros() {
    if (this.reqListadoRubro != null) return;
    this.reqListadoRubro = this.serviceRubro.getAll({ 'simple' : null })
    this.reqListadoRubro.then((data: any) => {
      this.listaRubro = data;
    })
    .catch((error) => {
      this._snackBar.open(error['error'] ? error['error'].join(", ") : this.msg.txt('falla'), 'Undo');
    })
    .finally(() => {
      this.reqListadoRubro = null;
    });
  }
  

  cortarImagen(event:any) {
    if (!event.target || !event.target.files || event.target.files.length == 0 || event.target.files[0].type.indexOf("image/") == -1) {
      this._snackBar.open(this.msg.txt('noImagenTipo'), 'Undo');
      event.target.value = [];
      return;
    } 
    const dialogRef = this.modal.open( ModalCropperComponent, { data: { event: event } });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.elemento.logo = result;
        this._snackBar.open(this.msg.txt('siCargoImagen'), 'Undo');
      } else {
        this._snackBar.open(this.msg.txt('noImagen'), 'Undo');
      }
    });
  }

  guardar() {
    if (this.reqGuardar != null) return;
    if (!this.access(Role.ADMIN_USUARIO)) {
      this.dialog.openDialog({ 
        title: this.msg.txt('noAccessTitulo'), 
        message: this.msg.txt('noAccessText'), 
        type: DialogType.ERROR, 
        useDefault: true 
      });
      return
    }
    this.elemento.razon_social = this.formulario.controls['razon_social'].value;
    this.elemento.nombre_fantasia = this.formulario.controls['nombre_fantasia'].value;
    this.elemento.logo = this.formulario.controls['logo'].value;
    this.elemento.rubro_principal_id = this.formulario.controls['rubro_principal_id'].value;
    this.elemento.rubro_secundaria_id = this.formulario.controls['rubro_secundaria_id'].value;
    this.elemento.nro_rut = this.formulario.controls['nro_rut'].value;
    this.elemento.nro_bps = this.formulario.controls['nro_bps'].value;
    this.elemento.nro_referencia = this.formulario.controls['nro_referencia'].value;
    this.elemento.localidad_id = this.formulario.controls['localidad_id'].value;
    this.elemento.direccion = this.formulario.controls['direccion'].value;
    this.elemento.email = this.formulario.controls['email'].value;
    this.elemento.celular = this.formulario.controls['celular'].value;
    this.elemento.telefono = this.formulario.controls['telefono'].value;
    this.elemento.fecha_inicio = this.formulario.controls['fecha_inicio'].value;
    this.elemento.observaciones = this.formulario.controls['observaciones'].value;
    this.reqGuardar = this.elemento.id ? this.service.update(this.elemento.id, this.elemento) : this.service.create(this.elemento);
    this.reqGuardar
    .then((data) => {
      if (data.id) {
        this.elemento.id = data.id
        this.id = data.id
        this.router.navigate(['private/empresa/'+data.id+"/edit"])
      }
      this._snackBar.open(this.msg.txt('siGuardoEmpresa'), 'Undo');
    })
    .catch((error) => {
      error = Object.values(error['error']).map((arr:any) => arr.join(", ") );
      this.dialog.openDialog({ message: error ? error.join(", ") : this.msg.txt('falla'), type: DialogType.ERROR, useDefault: true })
    })
    .finally(() => {
      this.reqGuardar = null;
    });
  }













  tableColumns: string[] = ['id', 'tipo_relacion', 'persona', 'acciones']; // columnas de la tabla
  active: boolean = false;
  modoEdicion: boolean = false; // Modo edición / creación

  reqGuardarEmpresaPersona:Promise<any> | null = null;
  reqGuardarTipoRelacion:Promise<any> | null = null;

  reqListadoEmpresaPersona:Promise<any> | null = null;
  listadoEmpresaPersona:PaginacionDTO<EmpresaPersonaDTO> = new PaginacionDTO();
  
  elementoPersonaEmpresaSeleccionado: EmpresaPersonaDTO = new EmpresaPersonaDTO();
  formularioEmpresaPersona: FormGroup = new FormGroup({});

  autocompletados:any = {
    tipo_relacion : null,
    persona: null
  } // Guarda los ultimos valores de texto seleccionados para chequear si se edito luego de selecionar un elemento

  /* Preparacion para filtros del autocompletado Tiporelacion*/
  PreparefilterTipoRelacion(): Observable<TipoRelacionDTO[]> {
    if (!this.formularioEmpresaPersona || !this.formularioEmpresaPersona.controls || !this.formularioEmpresaPersona.controls['tipo_relacion']) 
      return new Observable<TipoRelacionDTO[]>();
    return this.formularioEmpresaPersona.controls['tipo_relacion'].valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      switchMap(value => this.filterTipoRelacion(value))
    );
  }
  filterTipoRelacion(value: string): Promise<TipoRelacionDTO[]> {
    return new Promise((res, error) => {
      if (value == null || value == '') res([]);
      if (this.formularioEmpresaPersona.controls['tipo_relacion'].value != this.autocompletados.tipo_relacion  && this.autocompletados.tipo_relacion != null) {
        this.formularioEmpresaPersona.controls['tipo_relacion_id'].setValue('');
        this.autocompletados.tipo_relacion = null;
        this._snackBar.open(this.msg.txt('desSeleccionoTipoRelacion'), 'Undo');
      }
      const filterValue = value.toLowerCase();
      this.reqFilterTipoRelacion = this.serviceTipoRelacion.getAll({ simple: null, q : filterValue, limit : 10}) as Promise<TipoRelacionDTO[]>;
      this.reqFilterTipoRelacion
        .then((data) => res(data))
        .catch((data) => {
          this._snackBar.open(this.msg.txt('errorPedirTipoRelcaion'), 'Undo');
          error(data)
        })
        .finally(() => this.reqFilterTipoRelacion = null);
    });

  }
  filterTipoRelacionSelect(id: number | undefined): void {
    if (id == null) return;
    this.autocompletados.tipo_relacion = this.formularioEmpresaPersona.controls['tipo_relacion'].value;
    this.formularioEmpresaPersona.controls['tipo_relacion_id'].setValue(id);
    this._snackBar.open(this.msg.txt('seleccionoTipoRelacion'), 'Undo');
  }
  confirmaGuardaTipoRelacion(): void {
    if (!this.access(Role.ADMIN)) {
      this.dialog.openDialog({ 
        title: this.msg.txt('noAccessTitulo'), 
        message: this.msg.txt('noAccessText'), 
        type: DialogType.ERROR, 
        useDefault: true 
      });
      return
    }
    const nombre = this.formularioEmpresaPersona.controls['tipo_relacion'].value;
    if (nombre == null && nombre == '') return;
    this.dialog.openDialog({
      title: "Guardaras datos",
      message: "Estas a punto de guardar una nueva relacion en el sistema",
      type: DialogType.ACCEPT_CANCEL,
      useDefault: true,
    }).afterClosed().subscribe((result: DialogActionResult) => {
      if (result == DialogActionResult.ACCEPT) {
        this.guardaTipoRelacion();
      } else {
        this._snackBar.open(this.msg.txt('canceladoGuardarTipoRelcaion'), 'Undo');
      }
    });
  }
  guardaTipoRelacion(): void {
    const nombre = this.formularioEmpresaPersona.controls['tipo_relacion'].value;
    if (nombre == null) return;
    let data:any = { 'nombre': nombre };
    this.reqGuardarTipoRelacion = this.serviceTipoRelacion.create(data)
    this.reqGuardarTipoRelacion
    .then((data:TipoRelacionDTO) => { 
      this.formularioEmpresaPersona.controls['tipo_relacion_id'].setValue(data.id);
      this.formularioEmpresaPersona.controls['tipo_relacion'].setValue(data.nombre);
      this.autocompletados.tipo_relacion = data.nombre;
      this._snackBar.open(this.msg.txt('GuardarTipoRelcaion'), 'Undo');
      this.cargarListaTipoRelacion();
    })
    .catch((error) => {
      error = Object.values(error['error']).map((arr:any) => arr.join(", ") );
      this.dialog.openDialog({ message: error ? error.join(", ") : this.msg.txt('falla'), type: DialogType.ERROR, useDefault: true })
    })
    .finally(() => this.reqGuardarTipoRelacion = null)
    
  }
  /* Fin de Preparacion para filtros del autocompletado Tiporelacion*/

  /* Preparacion para filtros del autocompletado Persona*/
  PreparefilterPersona(): Observable<PersonaDTO[]> {
    if (!this.formularioEmpresaPersona || !this.formularioEmpresaPersona.controls || !this.formularioEmpresaPersona.controls['persona']) 
      return new Observable<PersonaDTO[]>();
    return this.formularioEmpresaPersona.controls['persona'].valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      switchMap(value => this.filterPersona(value))
    );
  }
  filterPersona(value: string): Promise<PersonaDTO[]> {
    return new Promise((res, error) => {
      if (value == null || value == '') res([]);
      if (this.formularioEmpresaPersona.controls['persona'].value != this.autocompletados.persona && this.autocompletados.persona != null) {
        this.formularioEmpresaPersona.controls['persona_id'].setValue('');
        this.autocompletados.persona = null;
        this._snackBar.open(this.msg.txt('desSeleccionoPersona'), 'Undo');
      }
      const filterValue = value.toLowerCase();
      this.reqFilterPersona = this.servicePersona.getAll({ simple: null, q : filterValue, limit : 10}) as Promise<PersonaDTO[]>;
      this.reqFilterPersona
        .then((data) => res(data))
        .catch((data) => {
          this._snackBar.open(this.msg.txt('errorListadoPersona'), 'Undo');
          error(data)
        })
        .finally(() => this.reqFilterPersona = null);
    });
  }
  filterPersonaSelect(id: number | undefined): void {
    if (id == null) return;
    this.autocompletados.persona = this.formularioEmpresaPersona.controls['persona'].value;
    this.formularioEmpresaPersona.controls['persona_id'].setValue(id);
    this._snackBar.open(this.msg.txt('seleccionoPersona'), 'Undo');
  }
  /* Fin de Preparacion para filtros del autocompletado Persona*/

  creaPersona() {
    if (!this.access(Role.ADMIN)) {
      this.dialog.openDialog({ 
        title: this.msg.txt('noAccessTitulo'), 
        message: this.msg.txt('noAccessText'), 
        type: DialogType.ERROR, 
        useDefault: true 
      });
      return
    }
    let persona = new PersonaDTO()
    persona.nombre_1 = this.formularioEmpresaPersona.controls['persona'].value;
    const dialogRef = this.modal.open( ModalPersonaComponent, { data: persona });
    dialogRef.afterClosed().subscribe(result => {
      if (result && result.persona) {
        const nombre = result.persona.nombre_1 + " " + result.persona.apellide_1;
        this.formularioEmpresaPersona.controls['persona'].setValue(nombre);
        this.formularioEmpresaPersona.controls['persona_id'].setValue(result.persona.id);
        this.autocompletados.persona = nombre;
        this._snackBar.open(this.msg.txt('siRecivioPersona'), 'Undo');
      } else {
        this._snackBar.open(this.msg.txt('noRecivioPersona'), 'Undo');
      }
    });
  }


  preparaParametrosPaginacion(params: any) {
    let ret:any = { 'full': null };
    if (this.id) ret.empresa_id = this.id;
    if (params == null) return ret;
    if (params.pageIndex) ret.page = params.pageIndex + 1;
    if (params.pageSize) ret.limit = params.pageSize;
    return ret;
  }















  cargarListaEmpresaPersona(pageElement:any = null) {
    if (this.reqListadoEmpresaPersona != null) return;
    this.reqListadoEmpresaPersona = this.serviceEmpresaPersona.getAll(this.preparaParametrosPaginacion(pageElement))
    this.reqListadoEmpresaPersona.then((data: any) => {
      this.listadoEmpresaPersona = data;
    })
    .catch((error) => {
      this._snackBar.open(error['error'] ? error['error'].join(", ") : this.msg.txt('falla'), 'Undo');
    })
    .finally(() => {
      this.reqListadoEmpresaPersona = null;
    });
  }

  seleccionarPersonaEmpresaEditar(elemento: PersonaDTO) {
    this.active = true;
    setTimeout(() => {
      this.active = false;
    }, 500);
    this.elementoPersonaEmpresaSeleccionado = elemento;
    this.resetearFormularioEmpresaPersona(elemento)
    this._snackBar.open(this.msg.txt('seleccionoPersonaEmpresa'), 'Undo');
  }

  seleccionarPersonaEmpresaEliminar(elemento: EmpresaPersonaDTO) {
    if (!this.access(Role.ADMIN_USUARIO)) {
      this.dialog.openDialog({ 
        title: this.msg.txt('noAccessTitulo'), 
        message: this.msg.txt('noAccessText'), 
        type: DialogType.ERROR, 
        useDefault: true 
      });
      return
    }
    this.elementoPersonaEmpresaSeleccionado = elemento;
    this.dialog.openDialog({
      type: DialogType.CONFIRM_DELETE,
      useDefault: true,
    }).afterClosed().subscribe((result: DialogActionResult) => {
      if (result == DialogActionResult.CONFIRM) {
        this.eliminarPersonaEmpresa();
      } else {
        this._snackBar.open(this.msg.txt('canceloEliminacionPersonaEmpresa'), 'Undo');
        this.resetearFormularioEmpresaPersona();
      }
    });
  }

  eliminarPersonaEmpresa() {
    if (!this.elementoPersonaEmpresaSeleccionado.id) {
      this.dialog.openDialog({ title: this.msg.txt("noSeleccionoDelete"), type: DialogType.ERROR, useDefault: true })
      return;
    }
    if (!this.access(Role.ADMIN_USUARIO)) {
      this.dialog.openDialog({ 
        title: this.msg.txt('noAccessTitulo'), 
        message: this.msg.txt('noAccessText'), 
        type: DialogType.ERROR, 
        useDefault: true 
      });
      return
    }
    this.serviceEmpresaPersona.delete(this.elementoPersonaEmpresaSeleccionado.id)
    .then((data) => {
      this._snackBar.open(this.msg.txt('eliminacionCorrecta'), 'Undo');
      this.cargarListaEmpresaPersona();
    })
    .catch((error) => {
      this._snackBar.open(this.msg.txt('errorEliminacionPersonaEmpresa'), 'Undo');
      this.dialog.openDialog({ type: DialogType.ERROR, useDefault: true })
    })
    .finally(() => {
      this.resetearFormularioEmpresaPersona();
    });
  }

  resetearFormularioEmpresaPersona(elemento?: EmpresaPersonaDTO) {
    this.modoEdicion = elemento != undefined;

    // vaciar formulario
    this.formularioEmpresaPersona = new FormGroup({
      tipo_relacion_id: new FormControl('', [ Validators.required ]),
      persona_id: new FormControl('', [ Validators.required ]),
      tipo_relacion: new FormControl('', []),
      persona: new FormControl('', []),
    });
    this.filtradoTipoRelacion = this.PreparefilterTipoRelacion();
    this.filtradoPersona = this.PreparefilterPersona();
    
    this.elementoPersonaEmpresaSeleccionado = new EmpresaPersonaDTO();

    // Si se paso un elemento, colocar los datos del elemento pasado
    if (elemento != undefined) {
      this.elementoPersonaEmpresaSeleccionado = elemento;
      this.formularioEmpresaPersona.controls['tipo_relacion_id'].setValue(elemento.tipo_relacion_id);
      this.formularioEmpresaPersona.controls['persona_id'].setValue(elemento.persona_id);
      if (elemento.persona) {
        const nombre = elemento.persona.nombre_1 + " " + elemento.persona.apellide_1;
        this.formularioEmpresaPersona.controls['persona'].setValue(nombre);
        this.autocompletados.persona = nombre;
      } else {
        this.autocompletados.persona = null;
      }
      
      if (elemento.tipo_relacion) {
        this.formularioEmpresaPersona.controls['tipo_relacion'].setValue(elemento.tipo_relacion.nombre);
        this.autocompletados.tipo_relacion = elemento.tipo_relacion.nombre;
      } else {
        this.autocompletados.tipo_relacion = null;
      }
    }
  }

  guardarEmpresaPersona() {
    if (this.reqGuardarEmpresaPersona != null) return;
    if (!this.access(Role.ADMIN_USUARIO)) {
      this.dialog.openDialog({ 
        title: this.msg.txt('noAccessTitulo'), 
        message: this.msg.txt('noAccessText'), 
        type: DialogType.ERROR, 
        useDefault: true 
      });
      return
    }
    if (this.id != null && isNaN(parseInt(this.id))) {
      this.dialog.openDialog({ 
        title: this.msg.txt('noGuardoEmpresaTitulo'), 
        message: this.msg.txt('noGuardoEmpresaText'), 
        type: DialogType.ERROR, 
        useDefault: true 
      });
      return
    }
    if (!this.modoEdicion) this.elementoPersonaEmpresaSeleccionado = new EmpresaPersonaDTO();
    
    this.elementoPersonaEmpresaSeleccionado.tipo_relacion_id = this.formularioEmpresaPersona.controls['tipo_relacion_id'].value;
    this.elementoPersonaEmpresaSeleccionado.persona_id = this.formularioEmpresaPersona.controls['persona_id'].value;
    this.elementoPersonaEmpresaSeleccionado.empresa_id = parseInt(this.id);
    
    this.reqGuardarEmpresaPersona = this.elementoPersonaEmpresaSeleccionado.id ? 
      this.serviceEmpresaPersona.update(this.elementoPersonaEmpresaSeleccionado.id, this.elementoPersonaEmpresaSeleccionado) : 
      this.serviceEmpresaPersona.create(this.elementoPersonaEmpresaSeleccionado);
    this.reqGuardarEmpresaPersona
    .then((data) => {
      this._snackBar.open(this.msg.txt('guardadoPersonaEmpresa'), 'Undo');
      this.cargarListaEmpresaPersona();
      this.resetearFormularioEmpresaPersona();
    })
    .catch((error: any) => {
      this.dialog.openDialog({ type: DialogType.ERROR, useDefault: true })
    })
    .finally(() => {
      this.reqGuardar = null;
      this.resetearFormularioEmpresaPersona();
    });
  }

  // Chequea si tiene permiso
  access(req_role:Role) {
    // llamar servicio de login 
    return (
      (req_role == Role.INVITADO) ||
      (req_role == Role.ADMIN && this.isAdmin) ||
      (req_role == Role.USUARIO && this.idMisEmpresa.toString() == this.id) ||
      (req_role == Role.ADMIN_USUARIO && (this.isAdmin || this.idMisEmpresa.includes(this.id)))
    );
  }

}
 