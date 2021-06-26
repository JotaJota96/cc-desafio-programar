# MER

## Empresa

Son el registro de las empresas que son socias de la institución

- id: ID de la Empresa en el sistema
- razonSocial: Razón Social
- nombreFantasia: Nombre Fantasía
- nroRUT: Número de RUT
- idLocalidad: ID Localidad
- dirección
- email
- celular
- telefono
- nroBPS: Número de BPS
- nroReferencia: Nro Referencia (opcional)
- rubroPrincipal: Rubro de Actividad Principal (Tienda, Supermercado, Joyería, Óptica, etc)
- rubroSecundaria: Rubro de Actividad Secundaria (opcional)
- fechaAfiliacion: Fecha de Afiliación de la empresa a la institución
- fechaInicio: Fecha de inicio de la actividad de la empresa
- borrado: Borrado lógico
- fechaBaja: Fecha de baja del sistema
- observaciones
- logo: Logo de la Empresa (imagen)

## Persona

Pueden ser contactos de la empresa, emprendedores que todavía no tienen empresas, socios colaboradores u otras personas que tenga relación con la institución.

- id: ID de la Persona en el sistema
- nombre1
- nombre2
- apellide1
- apellido2
- email
- celular
- borrado: Borrado lógico

## Empresa - Persona

Son registros que reflejan la relación entre las empresas y las personas que son parte de la misma.
Una empresa puede tener muchas personas relacionadas y una persona puede estar en más de una empresa. Además esta relación debe registrar el tipo de relación

- idEmpresa: ID de la Empresa
- idPersona: ID de la Persona
- idTipoRelacion: ID del tipo de relacion

## Tipo Relacion Empresa Persona

Tipo de relacion entre la persona y la empresa
(Dueño, Gerente, Empleado, Socio, Contacto, etc.)

- id: ID del tipo de relacion en el sistema
- nombre: Nombre de la relación

## Departamento

Departamentos del país

- id: ID del Departamento en el sistema
- nombre

## Localidad

Localidades de cada departamento.

- id: ID de la Localidad en el sistema
- nombre
- idDepartamento: ID del Departamento

## Usuario

Son los usuarios del sistema.

Pueden ser de dos perfiles Administrador o empresa/emprendedor.

- id: ID del Usuario en el sistema
- nickname: Identificador del usuario
- contraseña
- email: Email de recuperacion de contraseña
- rol: Rol del usuario en el sistema (Administrador o empresa/emprendedor)
- idPersona: ID de la Persona
