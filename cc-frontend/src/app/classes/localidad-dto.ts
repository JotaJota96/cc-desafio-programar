import { DepartamentoDTO } from "./departamento-dto"

export class LocalidadDTO {
    public id: number | undefined;
    public nombre: string | undefined;
    public departamento_id: DepartamentoDTO | undefined;
}
