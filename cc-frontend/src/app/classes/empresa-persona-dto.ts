import { EmpresaDTO } from "./empresa-dto"
import { PersonaDTO } from "./persona-dto"
import { TipoRelacionDTO } from "./tipo-relacion-dto"

export class EmpresaPersonaDTO {
    public id: number | undefined;
    public empresa_id: EmpresaDTO | undefined;
    public persona_id: PersonaDTO | undefined;
    public tipo_relacion_id: TipoRelacionDTO | undefined;
}
