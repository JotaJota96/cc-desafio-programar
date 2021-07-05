import { EmpresaPersonaDTO } from "./empresa-persona-dto";

export class PersonaDTO {
    public id?: number;
    public nombre_1: string = '';
    public nombre_2?: string;
    public apellide_1: string = '';
    public apellide_2?: string;
    public celular?: string;
    public email?: string;
    public empresa_persona?: EmpresaPersonaDTO[];
    
}
