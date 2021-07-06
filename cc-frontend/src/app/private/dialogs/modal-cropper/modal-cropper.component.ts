import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-modal-cropper',
  templateUrl: './modal-cropper.component.html',
  styleUrls: ['./modal-cropper.component.scss']
})
export class ModalCropperComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalCropperComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { event :any }
  ) {
    this.imageChangedEvent = this.data.event;
  }

  ngOnInit(): void {
  }

  imageChangedEvent: any = '';
  croppedImage: string = '';

  fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
      if (event.base64) this.croppedImage = event.base64;
  }
  imageLoaded(image: any = null) {
      // show cropper
  }
  cropperReady() {
      // cropper ready
  }
  loadImageFailed() {
      // show message
  }
  end(guardar:boolean) {
    this.dialogRef.close(guardar ? this.croppedImage : null);
  }
}
