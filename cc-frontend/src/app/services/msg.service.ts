import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MsgService {

  private _msg:any = {
    falla: "Parece que algo salio mal",
    noSeleccionoDelete: "No ha seleccionado ningun elemento para eliminar",
    noId: "No se recivio un identidicador valido",
    noImagen: "No se recibio ninguna imagen",
    noImagenTipo: "No se cargo ningun archivo, o el el archivo no es de tipo imagen",
    siCargoImagen: "la imagen se cargo correctamente",
    siGuardoEmpresa: "Se guardaron los cambios de manera exitosa",
    noRecivioPersona: "No se recibio ninguna persona",
    siRecivioPersona: "Se ha recivido los datos de la persona de manera correcta",
    seleccionoTipoRelacion: "Se ha seleccionado el tipo de relacion",
    desSeleccionoTipoRelacion: "Se ha deseleccionado el tipo de relacion",
    errorPedirTipoRelcaion: "Parece que algo a salido mal al intentar ovtener los tipos de relacion",
    canceladoGuardarTipoRelcaion: "Parece que se cancelo el guardado",
    GuardarTipoRelcaion: "El tipo de relacion se guardo correctamente",
    seleccionoPersona: "Se a seleccionado a la persona",
    desSeleccionoPersona: "Se a deseleccionado a la persona",
    errorListadoPersona: "Algo salio mal al autocopletar el listado de personas",
    seleccionoPersonaEmpresa: "Se ha seleccionado una integrante de la empresa para la edicion",
    canceloEliminacionPersonaEmpresa: "Se a cancelado la eliminacion",
    eliminacionCorrecta: "Se elimino correctamente",
    errorEliminacionPersonaEmpresa: "Algo salio mal en la eliminacion",
    noGuardoEmpresaTitulo: "No ha guardado la empresa",
    noGuardoEmpresaText: "Necesita guardar la empresa antes de poder agregar personal",
    noAccessTitulo: 'No tiene acceso',
    noAccessText: 'Su usuario no tiene los permisos para realisar esta accion',
    // Pagina Departamento
    tituloDepartamento: "Departamentos",
    infoDepartamento: "Los elementos que se crean y editan en esta sección, son las departamentos del país.",
    // Pagina TiposRelacion
    tituloTiposRelacion: "Tipos de relacion",
    infoTiposRelacion: "Los elementos que se crean y editan en esta sección, son los utilizados para definir la relacion entre las personas y las empresas",
    attrNombreTipoRelacion: "Nombre del tipo de relacion",
    placeholderNombreTipoRelacion: "Empleado, electricista, contador",
    // Pagina Rubro
    tituloRubro: "Rubros",
    infoRubro: "Los elementos que se crean y editan en esta sección, son los rubros a los que se pueden dedicar las empresas.",
    attrNombreRubro: "Nombre del rubro",
    placeholderNombreRubro: "Tiendas, supermercado, joyeria",
    // Pagina Rubro
    tituloLocalidad: "Localidad",
    infoLocalidad: "Los elementos que se crean y editan en esta sección, son las localidades pertenecientes a cada departamento del país.",
    attrNombreDepartamento: "Departamento al que pretenece",
    placeholderNombreDepartamento: "San Jose, Montevideo...",
    attrNombreLocalidad: "Departamento al que pretenece",
    placeholderNombreLocalidad: "San Jose, Montevideo...",
    // Pagina Rubro
    tituloEmpresas: "Empresas",
    tooltipAgregarPersona: "Agregar persona nueva",
    tooltipAgregarTipoRelacion: "Guardar relacion",
    tooltipAgregarLogo: "Arrasatre una imagen o clike para cambiar logo",
    // Pagina Persona
    tituloPersona: "Personas",
    siRecivioUser: "El usuario guardo exitosamente",
    noRecivioUser: "No se recibio ningun cambio",
    formNickname: "Nick",
    formPlaceholderNickname: "Sobre nombre",
    formPassword: "Password",
    formPlaceholderPassword: "************",
    formRepassword: "Repetir password",
    formPlaceholderRepassword: "************",
    formRol: "Rol",
    formPlaceholderRol: "Administrador/Usuario",
    admin: "Administrador",
    user: "Usuario",
    errorRecogePersona: "Algo salio mal no se pudo identificar a la persona",
    infoUser: "Esta seccion se encarga de guardar y gestionar los usuarios en el sistema",
    // Paginas Empresa
    noIdentificado: 'No se reconocio el identificador o el elemento fue eliminado',
    subTituloGeneral: "General",
    subTituloContacto: "Contacto",
    subTituloIntegrantes: "Integrantes",
    subTituloObservaciones: "Observaciones",
    keyRubroPincipal: "Rubro Pincipal",
    keyRubroSecundario: "Rubro Secundario",
    keyFechaInicio: "Fecha de inicio",
    keyRUT: "RUT",
    keyBPS: "BPS",
    keyNroReferencia: "Nro. nro_referencia",
    keyDireccion: "Direccion",
    keyEmail: "Email",
    keyTelefono: "Telefono",
    keyCelular: "Celular",
    //Pagina Persona
    tituloUser: "Usuario",
    thNickname: "Nick",
    thRol: "Rol",
    //Atributos de formularios
    formPrimerNombre: "Primer nombre",
    formPlaceholderPrimerNombre: "Mauro, Dayana...",
    formSegundoNombre: "Segundo nombre",
    formPlaceholderSegundoNombre: "Pedro, Pepito...",
    formPrimerApellido: "Primer apellido",
    formPlaceholderPrimerApellido: "Perez, Silva...",
    formSegundoApellido: "Segundo apellido",
    formPlaceholderSegundoApellido: "Correa, Mendez...",
    formDepartamento: 'Departamento',
    formPlaceholderDepartamento: 'San jose, Colonia...',
    formLocalidad: 'Localidad',
    formPlaceholderLocalidad: 'Juan la caze, Libertad...',
    formRubroPrincipal: 'Rubro Principal',
    formPlaceholderRubroPrincipal: 'Supermercado, Tienda...',
    formRubroSecundario: 'Rubro Secundario',
    formPlaceholderRubroSecundario: 'Herreria, Fontaneria...',
    formRazonSocial: 'Razon Social',
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
    formEmail: 'Email',
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
    //Layout
    tituoDash: "Gestion de asociados",
    navInicio: "Inicio",
    navEmpresas: "Empresas",
    navPersonas: "Personas",
    navUsuarios: "Usuarios",
    navTiposRelaciones: "Tipos de relaciones",
    navRubros: "Rubros",
    navLocalidades: "Localidades",
    navDepartamento: "Departamento",
    navMantenimiento: "Mantenimiento",
    
    // Generios de paginas
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
    email: "no es un email valido",
    required: "el campo es obligatorio",
    noSonIguales: "Las contraseñas no coinciden"
  }
  private _pattern:any = {
    "/^[0-9]{12}$/": "tiene que ser un numero de 12 digitos",
    "/^[0-9]{9}$/": "tiene que ser un numero de 9 digitos",
    "/^[0-9]{6}$/": "tiene que ser un numero de 6 digitos",
  }

  minlength = (numeri:number = 0) => "tiene que tener almenos " + numeri.toString() + " caracteres" 
  maxlength = (numeri:number = 0) => "no puede tener mas de " + numeri.toString() + " caracteres" 
      

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
