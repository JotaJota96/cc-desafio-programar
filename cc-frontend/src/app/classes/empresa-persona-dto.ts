import { EmpresaDTO } from "./empresa-dto"
import { PersonaDTO } from "./persona-dto"
import { TipoRelacionDTO } from "./tipo-relacion-dto"

export class EmpresaPersonaDTO {
    public id?: number;
    public empresa_id?: number;
    public persona_id?: number;
    public tipo_relacion_id?: number;
    public empresa?: EmpresaDTO;
    public persona?: PersonaDTO;
    public tipo_relacion?: TipoRelacionDTO;
}
