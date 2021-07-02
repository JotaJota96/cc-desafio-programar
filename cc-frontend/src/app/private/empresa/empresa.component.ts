import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { inCardAnimation, inInfoAnimation, inTitleAnimation } from 'src/app/animation';
import { EmpresaDTO } from 'src/app/classes/empresa-dto';
import { DialogService } from 'src/app/services/dialog.service';
import { EmpresaPersonaService } from 'src/app/services/empresa-persona.service';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.scss'],
  animations: [
    inCardAnimation,
    inTitleAnimation,
    inInfoAnimation
  ]
})
export class EmpresaComponent implements OnInit {
  id:string = '';
  elemento:EmpresaDTO = new EmpresaDTO;
  reqCargar:Promise<any> | null = null;

  constructor(
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    protected dialog: DialogService,
    protected service: EmpresaService
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id') || '';
      this.cargarEmpresa(this.id);
    });
  }

  cargarEmpresa(id:string = '') {
    this.reqCargar = this.service.get(id, { 'full':null })
    this.reqCargar.then((data: any) => {
      this.elemento = data;
    })
    .catch((error) => {
      this._snackBar.open(error['error'] ? error['error'].join(", ") : "Algo ha fallado", 'Undo');
    })
    .finally(() => {
      this.reqCargar = null;
    });

  }
}
