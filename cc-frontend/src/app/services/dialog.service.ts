import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmarComponent } from '../private/dialogs/dialog-confirmar/dialog-confirmar.component';

/**
 * Tipos de modales que se pueden abrir
 */
export enum DialogType {
  INFO = 1,
  ACCEPT_CANCEL = 2,
  YES_NO_CANCEL = 3,
  YES_NO = 4,
  CONFIRM_DELETE = 5,
  ERROR = 6,
  ADVERTENCIA = 7
}

/**
 * Resultado del modal, representa que boton se apretó
 */
export enum DialogActionResult {
  ACCEPT = 1,
  CANCEL = 2,
  CONFIRM = 3,
  YES = 4,
  NO = 5
}

/**
 * Datos para mostrar el modal
 */
export interface DialogData {
  type: DialogType | undefined;
  title?: string | undefined;
  message?: string | undefined;
  useDefault: boolean | true;
}

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public matDialog: MatDialog) { }

  /**
   * Abre un modal
   * @param data Datos para arir el modal
   * @returns Creo que develve un observable
   * @example
   * this.dialog.openDialog({
   *   type: DialogType.YES_NO, // dialogo con botones Sí y No
   *   useDefault: true // Usará un mensaje predefinido
   * }).afterClosed().subscribe((result: DialogActionResult) => { // result permite saber el boton presionado
   *   // luego de presionar algun boton del modal, se ejecutará este callback
   *   if (result == DialogActionResult.CONFIRM) {
   *     //  eliminar
   *   }
   * });
   */
  openDialog(data:DialogData) {
    this.setDefaultDialogData(data);

    // abre el dialogo pasandole los datos
    return this.matDialog.open(DialogConfirmarComponent, {
      data: data
    });
  }

  /**
   * Se se elige usar los mensajes predefinidos, aqui es donde se establecen
   */
  private setDefaultDialogData(data:DialogData) {
    if (data.useDefault == false) return; // no modifico nada

    switch (data.type) {
      case DialogType.INFO:
        if (data.title == undefined) data.title = "Información";
        break;
      case DialogType.ACCEPT_CANCEL:
      case DialogType.YES_NO_CANCEL:
      case DialogType.YES_NO:
        if (data.title == undefined) data.title = "¿Confirmar?";
        if (data.message == undefined) data.message = "¿Realmente desea realizar esta acción?";
        break;
      case DialogType.ERROR:
        if (data.title == undefined) data.title = "Error";
        if (data.message == undefined) data.message = "Ha ocurrido un error al realizar esta acción";
        break;
      case DialogType.ADVERTENCIA:
        if (data.title == undefined) data.title = "Advertencia";
        break;
      case DialogType.CONFIRM_DELETE:

        if (data.title == undefined) data.title = "¿Eliminar?";
        else data.title = "¿Eliminar " + (data.title) + " ?";
        
        if (data.message == undefined) data.message = "¿Realmente desea eliminar?";
        else data.message = "¿Realmente desea eliminar " + (data.message) + " ?";
      
        break;
      default:
        break;
      }
  }

}
// https://stackoverflow.com/questions/57363522/angular-7-modal-dialog-popup-from-service