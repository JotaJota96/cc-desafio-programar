import { UserDTO } from "./user-dto";

export class LoginResponseDTO {
    public token?: string;
    public expires_at?: string;
    public user?: UserDTO;
}
