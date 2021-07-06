import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MsgService {

  private _msg:any = {
    falla: "Parece que algo salió mal",
    noSeleccionoDelete: "No ha seleccionado ningún elemento para eliminar",
    noId: "No se recibió un identificador valido",
    noImagen: "No se recibió ninguna imagen",
    noImagenTipo: "No se cargó ningún archivo, o el archivo no es de tipo imagen",
    siCargoImagen: "La imagen se cargó correctamente",
    siGuardoEmpresa: "Se han guardado los cambios correctamente",
    noRecivioPersona: "No se recibió ninguna persona",
    siRecivioPersona: "Se ha recibido los datos de la persona de manera correcta",
    seleccionoTipoRelacion: "Se ha seleccionado el tipo de relación",
    desSeleccionoTipoRelacion: "Se ha deseleccionado el tipo de relación",
    errorPedirTipoRelcaion: "Parece que algo salió mal al intentar obtener los tipos de relación",
    canceladoGuardarTipoRelcaion: "Parece que se canceló el guardado",
    GuardarTipoRelcaion: "El tipo de relación se guardó correctamente",
    seleccionoPersona: "Se ha seleccionado a la persona",
    desSeleccionoPersona: "Se a deseleccionado a la persona",
    errorListadoPersona: "Algo salio mal al autocompletar el listado de personas",
    seleccionoPersonaEmpresa: "Se ha seleccionado una integrante de la empresa para la edición",
    canceloEliminacionPersonaEmpresa: "Se a cancelado la eliminación",
    eliminacionCorrecta: "Se elimino correctamente",
    errorEliminacionPersonaEmpresa: "Algo salio mal en la eliminación",
    noGuardoEmpresaTitulo: "No ha guardado la empresa",
    noGuardoEmpresaText: "Necesita guardar la empresa antes de poder agregar personal",
    noAccessTitulo: 'No tiene acceso',
    noAccessText: 'Su usuario no tiene los permisos para realizar esta acción',

    // Página Departamento
    tituloDepartamento: "Departamentos",
    infoDepartamento: "Los elementos que se crean y editan en esta sección, son las departamentos del país.",

    // Página TiposRelacion
    tituloTiposRelacion: "Tipos de relación",
    infoTiposRelacion: "Los elementos que se crean y editan en esta sección, son los utilizados para definir la relación entre las personas y las empresas",
    attrNombreTipoRelacion: "Nombre del tipo de relación",
    placeholderNombreTipoRelacion: "Empleado, electricista, contador",

    // Página Rubro
    tituloRubro: "Rubros",
    infoRubro: "Los elementos que se crean y editan en esta sección, son los rubros a los que se pueden dedicar las empresas.",
    attrNombreRubro: "Nombre del rubro",
    placeholderNombreRubro: "Tiendas, supermercado, joyería",

    // Página Rubro
    tituloLocalidad: "Localidad",
    infoLocalidad: "Los elementos que se crean y editan en esta sección, son las localidades pertenecientes a cada departamento del país.",
    attrNombreDepartamento: "Departamento al que pertenece",
    placeholderNombreDepartamento: "San Jose, Montevideo...",
    attrNombreLocalidad: "Departamento al que pertenece",
    placeholderNombreLocalidad: "San José, Montevideo...",

    // Página Rubro
    tituloEmpresas: "Empresas",
    tooltipAgregarPersona: "Agregar persona nueva",
    tooltipAgregarTipoRelacion: "Guardar relación",
    tooltipAgregarLogo: "Arrastre una imagen aquí para cambiar el logo",

    // Página Persona
    tituloPersona: "Personas",
    siRecivioUser: "El usuario guardo exitosamente",
    noRecivioUser: "No se recibió ningún cambio",
    formNickname: "Nick",
    formPlaceholderNickname: "Sobre nombre",
    formPassword: "Contraseña",
    formPlaceholderPassword: "************",
    formRepassword: "Repetir contraseña",
    formPlaceholderRepassword: "************",
    formRol: "Rol",
    formPlaceholderRol: "Administrador/Usuario",
    admin: "Administrador",
    user: "Usuario",
    errorRecogePersona: "Algo salió mal no se pudo identificar a la persona",
    infoUser: "Esta sección se encarga de guardar y gestionar los usuarios en el sistema",

    // Páginas Empresa
    noIdentificado: 'No se reconoció el identificador o el elemento fue eliminado',
    subTituloGeneral: "General",
    subTituloContacto: "Contacto",
    subTituloIntegrantes: "Integrantes",
    subTituloObservaciones: "Observaciones",
    keyRubroPincipal: "Rubro Principal",
    keyRubroSecundario: "Rubro Secundario",
    keyFechaInicio: "Fecha de inicio",
    keyRUT: "RUT",
    keyBPS: "BPS",
    keyNroReferencia: "Nro. referencia",
    keyDireccion: "Dirección",
    keyEmail: "Email",
    keyTelefono: "Teléfono",
    keyCelular: "Celular",

    // Página Persona
    tituloUser: "Usuario",
    thNickname: "Nick",
    thRol: "Rol",

    // Atributos de formularios
    formPrimerNombre: "Primer nombre",
    formPlaceholderPrimerNombre: "Mauro, Dayana...",
    formSegundoNombre: "Segundo nombre",
    formPlaceholderSegundoNombre: "Pedro, Pepito...",
    formPrimerApellido: "Primer apellido",
    formPlaceholderPrimerApellido: "Perez, Silva...",
    formSegundoApellido: "Segundo apellido",
    formPlaceholderSegundoApellido: "Correa, Mendaz...",
    formDepartamento: 'Departamento',
    formPlaceholderDepartamento: 'San José, Colonia...',
    formLocalidad: 'Localidad',
    formPlaceholderLocalidad: 'Juan lacaze, Libertad...',
    formRubroPrincipal: 'Rubro Principal',
    formPlaceholderRubroPrincipal: 'Supermercado, Tienda...',
    formRubroSecundario: 'Rubro Secundario',
    formPlaceholderRubroSecundario: 'Herrería, Fontanería...',
    formRazonSocial: 'Razón Social',
    formPlaceholderRazonSocial: '123456789',
    formNombreFantasia: 'Nombre Fantasia',
    formPlaceholderNombreFantasia: 'Copsa, Conaprole...',
    formRUT: 'RUT',
    formPlaceholderRUT: '123456789123...',
    formBPS: 'BPS',
    formPlaceholderBPS: '123456...',
    formNroReferencia: 'Nro Referencia',
    formPlaceholderNroReferencia: '434365858...',
    formFecha: 'Fecha Inicio',
    formPlaceholderFecha: '28/12/2000',
    formDireccion: 'Direccion',
    formPlaceholderDireccion: '25 de agosto N999...',
    formEmail: '*Email',
    formPlaceholderEmail: 'correo@ejemplo.com, a...',
    formCelular: 'Celular',
    formPlaceholderCelular: '098123456, 09...',
    formTelefono: 'Telefono',
    formPlaceholderTelefono: 'Telefono',
    formObservaciones: 'Observaciones',
    formPlaceholderObservaciones: 'La empresa tiene empl...',
    formRelacion: 'Relacion',
    formPlaceholderRelacion: 'Diseñador, Socio...',
    formPersona: 'Persona',
    formPlaceholderPersona: 'Mauro, Maximiliano...',

    // Layout
    tituoDash: "Gestión de asociados",
    navInicio: "Inicio",
    navEmpresas: "Empresas",
    navPersonas: "Personas",
    navUsuarios: "Usuarios",
    navTiposRelaciones: "Tipos de relaciones",
    navRubros: "Rubros",
    navLocalidades: "Localidades",
    navDepartamento: "Departamento",
    navMantenimiento: "Mantenimiento",

    // Genéricos de páginas
    cerrarSesion: "Cerrar sesión",
    vacio: "No hay nada para mostrar",
    cancelar: "Cancelar",
    guardar: "Guardar",
    delete: "Eliminar",
    edit: "Editar / Ver",
    acceso: "Usuario",
    search: "Ver",
    aceptar: "Aceptar",
    confirmar: "Confirmar",
    si: "Sí",
    no: "No",
    crearEditar: "Crear / Editar",
    filtro: "Filtro",
    nuevo: "Nuevo",
    buscar: "Buscar",
    placeholderBuscar: "Buscar",
    errorListado: "Parece que no se pudo obtener el listado",
    thID: "ID",
    thNombre: "Nombre",
    thPrimerNombre: "Primer nombre",
    thSegundoNombre: "Segundo nombre",
    thPrimerApellido: "Primer apellido",
    thSegundoApellido: "Segundo apellido",
    thAcciones: "Acciones",
    thCelular: "Celular",
    thEmail: "Email",
    thDepartamento: "Departamento",
    thCargo: "Cargo",
    thlogo: "Logo",
    thbps: "BPS",
    thrut: "RUT",
  }
  private _error:any = {
    email: "no es un email válido",
    required: "el campo es obligatorio",
    noSonIguales: "Las contraseñas no coinciden"
  }
  private _pattern:any = {
    "/^[0-9]{12}$/": "tiene que ser un número de 12 dígitos",
    "/^[0-9]{9}$/": "tiene que ser un número de 9 dígitos",
    "/^[0-9]{6}$/": "tiene que ser un número de 6 dígitos",
  }

  minlength = (numeri:number = 0) => "tiene que tener al menos " + numeri.toString() + " caracteres" 
  maxlength = (numeri:number = 0) => "no puede tener más de " + numeri.toString() + " caracteres" 
      

  constructor() { }

  txt(key:string) {
    if (this._msg[key]) return this._msg[key];
    return key;
  }
  error(errors: {[key:string]:any}) {
    let msg = []
    for (const key in errors) {
      if (key == "pattern") msg.push(this._pattern[errors['pattern']['requiredPattern']]); 
      else if (key == 'minlength') msg.push(this.minlength(errors['minlength']['requiredLength']));
      else if (key == 'maxlength') msg.push(this.maxlength(errors['maxlength']['requiredLength']));
      else if (this._error[key]) msg.push(this._error[key]);
    }
    return msg.join(", ");
  }
}
