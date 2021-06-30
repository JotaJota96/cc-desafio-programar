import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogActionResult, DialogData } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-dialog-confirmar',
  templateUrl: './dialog-confirmar.component.html',
  styleUrls: ['./dialog-confirmar.component.scss']
})
export class DialogConfirmarComponent {

  constructor(public dialogRef: MatDialogRef<DialogConfirmarComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close(DialogActionResult.CANCEL);
  }

  action(result: DialogActionResult) {
    this.dialogRef.close(result);
  }

}
