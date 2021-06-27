import { PersonaDTO } from "./persona-dto";

export class UserDTO {
    public id: number | undefined;
    public rol: number | undefined;
    public nickname: string | undefined;
    public email: string | undefined;
    public email_verified_at: string | undefined;
    public persona_id: PersonaDTO | undefined;
}
