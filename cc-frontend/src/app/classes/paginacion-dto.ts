import { PersonaDTO } from "./persona-dto";

export class linkDTO {
    public active: Boolean = false;
    public label?: string | null;
    public url?: string | null;
}

export class PaginacionDTO<T> {
    public current_page: number = 1;
    public data:T[] = [];
    public first_page_url?: string | null;
    public from?: number;
    public last_page?: number;
    public last_page_url?: string | null;
    public links?: linkDTO[];
    public next_page_url?: string | null;
    public path?: string;
    public per_page?: number | null;
    public prev_page_url?: number | null;
    public to?: number | null;
    public total?: number | null = 0;
}