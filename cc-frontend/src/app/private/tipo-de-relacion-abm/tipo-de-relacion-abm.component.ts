import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TipoRelacionDTO } from 'src/app/classes/tipo-relacion-dto';
import { DialogActionResult, DialogService, DialogType } from 'src/app/services/dialog.service';
import { TipoRelacionService } from 'src/app/services/tipo-relacion.service';


@Component({
  selector: 'app-tipo-de-relacion-abm',
  templateUrl: './tipo-de-relacion-abm.component.html',
  styleUrls: ['./tipo-de-relacion-abm.component.scss']
})
export class TipoDeRelacionABMComponent implements OnInit {
  tableColumns: string[] = ['id', 'nombre', 'acciones']; // columnas de la tabla
  listaElementos: TipoRelacionDTO[] = []; // Lista de elementos

  modoEdicion: boolean = false; // Modo edición / creación
  elementoSeleccionado: TipoRelacionDTO = new TipoRelacionDTO();

  public formulario: FormGroup = new FormGroup({});

  constructor(protected dialog: DialogService, protected tipoRelacionService: TipoRelacionService) {
    this.resetearFormulario();
  }

  ngOnInit(): void {
    this.resetearFormulario();
    this.cargarLista();
  }

  cargarLista() {
    this.tipoRelacionService.getAll().subscribe(
      (data) => {
        this.listaElementos = data;
      },
      (error) => {
      }
    );

    // TODO Borrar este for
    // for (let index = 1; index < 5; index++) {
    //   let item: TipoRelacionDTO = new TipoRelacionDTO();
    //   item.id = index;
    //   item.nombre = "Relacion" + index;
    //   this.listaElementos.push(item);
    // }
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
      } else {
        this.resetearFormulario();
      }
    });
  }

  resetearFormulario(elemento?: TipoRelacionDTO) {
    this.modoEdicion = elemento != undefined;

    // vaciar formulario
    this.formulario = new FormGroup({
      nombre: new FormControl('', [Validators.required])
    });
    this.elementoSeleccionado = new TipoRelacionDTO();

    // Si se paso un elemento, colocar los datos del elemento pasado
    if (elemento != undefined) {
      this.elementoSeleccionado = elemento;
      this.formulario.controls['nombre'].setValue(elemento.nombre);
    }
  }

  eliminar() {
    this.tipoRelacionService.delete(this.elementoSeleccionado.id).subscribe(
      (data) => {
        this.cargarLista();
      },
      (error) => {
        this.dialog.openDialog({ type: DialogType.ERROR, useDefault: true })
      }
    );
    this.resetearFormulario();
  }

  guardar() {
    if (!this.modoEdicion) this.elementoSeleccionado = new TipoRelacionDTO();

    this.elementoSeleccionado.nombre = this.formulario.controls['nombre'].value;

    if (this.modoEdicion) {
      this.tipoRelacionService.update(this.elementoSeleccionado.id, this.elementoSeleccionado).subscribe(
        (datos) => {
          this.cargarLista();
          this.resetearFormulario();
        },
        (error) => {
          this.dialog.openDialog({ type: DialogType.ERROR, useDefault: true })
        }
      );
    } else {
      this.tipoRelacionService.create(this.elementoSeleccionado).subscribe(
        (datos) => {
          this.cargarLista();
          this.resetearFormulario();
        },
        (error) => {
          this.dialog.openDialog({ type: DialogType.ERROR, useDefault: true })
        }
      );
    }
  }
}
