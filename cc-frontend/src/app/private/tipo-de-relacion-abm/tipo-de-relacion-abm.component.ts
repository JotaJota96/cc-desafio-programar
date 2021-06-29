import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TipoRelacionDTO } from 'src/app/classes/tipo-relacion-dto';
import { DialogActionResult, DialogService, DialogType } from 'src/app/services/dialog.service';


@Component({
  selector: 'app-tipo-de-relacion-abm',
  templateUrl: './tipo-de-relacion-abm.component.html',
  styleUrls: ['./tipo-de-relacion-abm.component.scss']
})
export class TipoDeRelacionABMComponent implements OnInit {
  tableColumns: string[] = ['id', 'nombre', 'acciones']; // columnas de la tabla
  listaElementos: TipoRelacionDTO[] = []; // Lista de elementos

  modoEdicion: boolean = false; // Modo edición / creación
  elementoSeleccionado: TipoRelacionDTO | undefined;

  public formulario: FormGroup = new FormGroup({});

  constructor(protected dialog: DialogService) {
    this.resetearFormulario();
  }

  ngOnInit(): void {
    this.resetearFormulario();

    // TODO Cargar datos de verdad
    for (let index = 1; index < 10; index++) {
      let item: TipoRelacionDTO = new TipoRelacionDTO();
      item.id = index;
      item.nombre = "Relacion" + index;
      this.listaElementos.push(item);
    }
  }

  seleccionarParaEditar(elemento: TipoRelacionDTO) {
    this.elementoSeleccionado = elemento;
    this.resetearFormulario(elemento)
  }

  seleccionarParaEliminar(elemento: TipoRelacionDTO) {
    this.elementoSeleccionado = elemento;
    this.dialog.openDialog({
      type: DialogType.CONFIRM_DELETE,
      useDefault: true,
    }).afterClosed().subscribe((result: DialogActionResult) => {
      if (result == DialogActionResult.CONFIRM) {
        this.eliminar();
      }
    });
  }

  resetearFormulario(elemento?: TipoRelacionDTO) {
    this.modoEdicion = elemento != undefined;

    // vaciar formulario
    this.formulario = new FormGroup({
      nombre: new FormControl('', [Validators.required])
    });
    this.elementoSeleccionado = undefined;

    // Si se paso un elemento, colocar los datos del elemento pasado
    if (elemento != undefined) {
      this.elementoSeleccionado = elemento;
      this.formulario.controls['nombre'].setValue(elemento.nombre);
    }
  }

  eliminar() {
    // TODO mandar a API para eliminar
      this.resetearFormulario();
  }

  guardar() {
    let error: boolean = false;

    if (this.modoEdicion) {
      // crear obeto y mandar a api para editar
    } else {
      // crear obeto y mandar a api para crear
    }

    if (error) {

    } else{
      this.resetearFormulario();
    }
  }
}
