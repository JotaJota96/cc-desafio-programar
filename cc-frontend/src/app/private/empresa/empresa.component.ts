import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { inCardAnimation, inInfoAnimation, inTitleAnimation } from 'src/app/animation';
import { EmpresaDTO } from 'src/app/classes/empresa-dto';
import { DialogService } from 'src/app/services/dialog.service';
import { EmpresaPersonaService } from 'src/app/services/empresa-persona.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { MsgService } from 'src/app/services/msg.service';

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
  id:string | null = null;
  elemento:EmpresaDTO = new EmpresaDTO;
  reqCargar:Promise<any> | null = null;
  noEmpresa:boolean = false;
  constructor(
    private msg: MsgService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    protected dialog: DialogService,
    protected service: EmpresaService
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id') || '';
      if (this.id == '') {
        this.noEmpresa = true;
      } else if (isNaN(parseInt(this.id))) {
        this.id = null;
        this.noEmpresa = true;
        this._snackBar.open(this.msg.txt('noId'),'', { duration: 500 });
      } else {
        this.cargarEmpresa(this.id);
      }
    });
  }

  logo(src:string = '') {
    return src ? src : "assets/images/no-logo.png";
  }
  cargarEmpresa(id:string = '') {
    this.reqCargar = this.service.get(id, { 'full':null })
    this.reqCargar.then((data: any) => {
      if (data) this.elemento = data;
      else this.noEmpresa = true; 
    })
    .catch((error) => {
      this.noEmpresa = true;
      this._snackBar.open(error['error'] ? error['error'].join(", ") : this.msg.txt("falla"),'', { duration: 500 });
    })
    .finally(() => {
      this.reqCargar = null;
    });

  }
}
