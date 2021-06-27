import { LocalidadDTO } from "./localidad-dto";
import { RubroDTO } from "./rubro-dto";

export class EmpresaDTO {
    public id: number | undefined;
    public razon_social: string | undefined;
    public nombre_fantasia: string | undefined;
    public logo: string | undefined;

    public rubro_principal_id: RubroDTO | undefined;
    public rubro_secundaria_id: RubroDTO | undefined;
    
    public nro_rut: string | undefined;
    public nro_bps: string | undefined;
    public nro_referencia: string | undefined;

    public localidad_id: LocalidadDTO | undefined;
    public direccion: string | undefined;

    public email: string | undefined;
    public celular: string | undefined;
    public telefono: string | undefined;

    public fecha_inicio: string | undefined;
    public observaciones: string | undefined;

}
