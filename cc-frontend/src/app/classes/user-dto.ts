import { PersonaDTO } from "./persona-dto";

export class UserDTO {
    public id?: number;
    public rol: number = 1;
    public password?: string;
    public repassword?: string;
    public nickname?: string;
    public email?: string;
    public email_verified_at?: string;
    public persona_id?: number;
    public persona?: PersonaDTO;
}
