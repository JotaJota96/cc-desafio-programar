import { Component, OnInit } from '@angular/core';
import { EmpresaDTO } from 'src/app/classes/empresa-dto';
import { ListService } from 'src/app/services/list.service';
import { inCardAnimation, inInfoAnimation, inTitleAnimation } from 'src/app/animation';

@Component({
  selector: 'app-aniversario-empresa',
  templateUrl: './aniversario-empresa.component.html',
  styleUrls: ['./aniversario-empresa.component.scss'],
  animations: [
    inCardAnimation, inInfoAnimation, inTitleAnimation
  ]
})
export class AniversarioEmpresaComponent implements OnInit {

  meses: any[] = [
    
                [1,'Enero'], [2, 'Febrero'], [3, 'Marzo'], [4, 'Abril'],[5, 'Mayo'], [6, 'Junio'],
                [7, 'Julio'], [8, 'Agosto'], [9,'Setiembre'],[10,'Octubre'], [11,'Noviembre'], [12,'Diciembre']];

  tableColumns: string[] = [
    'id', 'logo', 'nombre_fantasia', 'nro_rut', 'nro_bps']; // columnas de la tabla
  aniversario: EmpresaDTO[] = [];

  fecha = new Date();
  mes = this.fecha.getMonth() + 1;
    
  constructor(protected listSvc: ListService) { }
 
  ngOnInit(): void {
    if(this.aniversario.length == 0) this.cargarLista(this.mes)
  }

  cargarLista(num: any){
    this.listSvc.getEmpresasAniversario(num).then((aniv: any)=>{
      this.aniversario = aniv;
      console.log(this.aniversario)
    })
  }

}
