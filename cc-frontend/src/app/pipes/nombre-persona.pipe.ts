import { Pipe, PipeTransform } from '@angular/core';
import { PersonaDTO } from '../classes/persona-dto';

@Pipe({
  name: 'nombrePersona'
})
export class NombrePersonaPipe implements PipeTransform {

  transform(persona: PersonaDTO): unknown {
    let nombre = [];
    if (persona.nombre_1) nombre.push(persona.nombre_1);
    if (persona.nombre_2) nombre.push(persona.nombre_2);
    if (persona.apellide_1) nombre.push(persona.apellide_1);
    if (persona.apellide_2) nombre.push(persona.apellide_2);
    return nombre.join(" ");
  }

}
