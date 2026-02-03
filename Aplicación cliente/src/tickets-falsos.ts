// //API de prueba https://mocki.io/v1/ece1f8be-a878-4547-a9cd-859cc017ec25

// // Primero, los imports/types que necesitas
// import { Incidencia, Peticion, Problema, Cambio, Ticket } from './app/components/cuerpo/tickets/ticket.model';

// export const ticketsFalsos: Ticket[] = [
//   {
//     "idTicket": "INC00892089",
//     "categoriaTicket": "incidencia",
//     "titulo": "Error en servidor Linux - No arranca servicio Apache",
//     "descripcion": "El servidor web Apache en el servidor Linux de producción no inicia después del último reinicio",
//     "fechaApertura": "2024-01-15T09:30:00",
//     "fechaLimite": "2024-01-16T18:00:00",
//     "fechaCierre": "2024-01-15T14:45:00",
//     "abiertoPor": 101,
//     "prioridad": "Crítica",
//     "asignatario": {
//       "id": 200,
//       "username": "pgranados",
//       "full_name": "Administrador de Sistemas",
//       "email": "pgranados@empresa.com",
//       "rol": { "id": 2, "name": "TECNICO" },
//       "created_at": "2024-01-01T08:00:00",
//       "active": true,
//       "grupo": { "id_grupo": 1, "nombre_grupo": "Infraestructura" }
//     },
//     "estado": "En curso",
//     "areaAfectada": "Infraestructura",
//     "comentarioCierre": "",
//     "tipoCierre": ""
//   },
//   {
//     "idTicket": "RF00414377",
//     "categoriaTicket": "petición",
//     "titulo": "Solicitud de instalación de software en equipo nuevo",
//     "descripcion": "Necesito instalación de Office 365, Adobe Reader y VPN client en equipo asignado",
//     "fechaApertura": "2024-01-16T10:15:00",
//     "fechaLimite": "2024-01-18T17:00:00",
//     "fechaCierre": "2024-01-17T11:30:00",
//     "abiertoPor": 102,
//     "prioridad": "Media",
//     "asignatario": {
//       "id": 201,
//       "username": "soporte_win",
//       "full_name": "Técnico Soporte Windows",
//       "email": "soporte.win@empresa.com",
//       "rol": {
//         "id": 2,
//         "name": "TECNICO"
//       },
//       "created_at": "2024-01-03T09:00:00",
//       "active": true,
//       "grupo": {
//         "id_grupo": 3,
//         "nombre_grupo": "Soporte"
//       }
//     },
//     "estado": "En curso",
//     "areaAfectada": "Soporte Usuario",
//     "comentarioCierre": "",
//     "tipoCierre": ""
//   },
//   {
//     "idTicket": "PM00002321",
//     "categoriaTicket": "problema",
//     "titulo": "Caída recurrente del servicio de correo electrónico",
//     "descripcion": "El servicio de Exchange se detiene aleatoriamente 2-3 veces por semana",
//     "fechaApertura": "2024-01-05T11:00:00",
//     "fechaCierre": "2024-01-12T16:30:00",
//     "abiertoPor": 89,
//     "prioridad": "Alta",
//     "fechaLimite": "2024-01-12T18:00:00",
//     "asignatario": {
//       "id": 200,
//       "username": "pgranados",
//       "full_name": "Administrador de Sistemas",
//       "email": "pgranados@empresa.com",
//       "rol": { "id": 2, "name": "TECNICO" },
//       "created_at": "2024-01-01T08:00:00",
//       "active": true,
//       "grupo": { "id_grupo": 1, "nombre_grupo": "Infraestructura" }
//     },
//     "estado": "En curso",
//     "areaAfectada": "Infraestructura",
//     "comentarioCierre": "",
//     "tipoCierre": "",
//     "causa": "Memory leak en proceso de indexación de búsqueda",
//     "solucionTemporal": "Reinicio programado cada 48 horas",
//     "solucionPermanente": ""
//   },
//   {
//     "idTicket": "C00033231",
//     "categoriaTicket": "cambio",
//     //"categoriaCambio": "normal",
//     "titulo": "Actualización de versión del portal de clientes",
//     "descripcion": "Migración del portal de clientes de versión 2.1 a 3.0 con nuevas funcionalidades",
//     "fechaApertura": "2024-01-10T08:00:00",
//     "fechaCierre": "2024-01-12T22:00:00",
//     "prioridad": "Baja",
//     "abiertoPor": 150,
//     "asignatario": {
//       "id": 202,
//       "username": "dev_lead",
//       "full_name": "Líder de Desarrollo",
//       "email": "dev.lead@empresa.com",
//       "rol": {
//         "id": 2,
//         "name": "TECNICO"
//       },
//       "created_at": "2024-01-04T10:00:00",
//       "active": true,
//       "grupo": {
//         "id_grupo": 2,
//         "nombre_grupo": "Desarrollo"
//       }
//     },
//     "estado": "En curso",
//     "areaAfectada": "Desarrollo",
//     "comentarioCierre": "",
//     "tipoCierre": "",
//     "planImplementacion": "Backup completo, despliegue gradual, pruebas de regresión",
//     "planMarchaAtras": "Restaurar versión 2.1 desde backup",
//     "inicioImplementacionProgramado": "2024-01-12T20:00:00",
//     "finImplementacionProgramado": "2024-01-12T22:00:00",
//     "inicioImplementacionReal": "2024-01-12T20:15:00",
//     "finRmplementacionReal": "2024-01-12T21:45:00",
//     //"efectoNoImplementar": "No dispondrían de nuevas funcionalidades de reporting"
//   },
//   {
//     "idTicket": "INC00912045",
//     "categoriaTicket": "incidencia",
//     "titulo": "Acceso denegado a base de datos de producción",
//     "descripcion": "Los usuarios del departamento de contabilidad no pueden acceder a la base de datos SQL Server",
//     "fechaApertura": "2024-01-18T08:15:00",
//     "fechaLimite": "2024-01-18T12:00:00",
//     "fechaCierre": "2024-01-18T10:30:00",
//     "abiertoPor": 110,
//     "prioridad": "Crítica",
//     "asignatario": {
//       "id": 205,
//       "username": "network_admin",
//       "full_name": "Miguel Sánchez",
//       "email": "miguel.sanchez@empresa.com",
//       "rol": {
//         "id": 2,
//         "name": "TECNICO"
//       },
//       "created_at": "2024-01-08T11:10:00",
//       "active": true,
//       "grupo": {
//         "id_grupo": 4,
//         "nombre_grupo": "Redes"
//       }
//     },
//     "estado": "Cerrado",
//     "areaAfectada": "Base de Datos",
//     "comentarioCierre": "Permisos de usuario corregidos, grupo de seguridad actualizado",
//     "tipoCierre": "Resuelto"
//   },
//   {
//     "idTicket": "RF00520189",
//     "categoriaTicket": "petición",
//     "titulo": "Alta de usuario en Active Directory para nuevo empleado",
//     "descripcion": "Crear cuenta para nuevo analista de marketing con acceso a carpetas compartidas y aplicaciones específicas",
//     "fechaApertura": "2024-01-19T14:20:00",
//     "fechaLimite": "2024-01-22T09:00:00",
//     "fechaCierre": undefined,
//     "abiertoPor": 115,
//     "prioridad": "Media",
//     "asignatario": {
//       "id": 210,
//       "username": "sys_admin",
//       "full_name": "Sistemas Administrador",
//       "email": "sys.admin@empresa.com",
//       "rol": {
//         "id": 2,
//         "name": "TECNICO"
//       },
//       "created_at": "2024-01-09T14:30:00",
//       "active": true,
//       "grupo": {
//         "id_grupo": 5,
//         "nombre_grupo": "Base de Datos"
//       }
//     },
//     "estado": "Pendiente",
//     "areaAfectada": "Sistemas",
//     "comentarioCierre": "",
//     "tipoCierre": ""
//   },
//   {
//     "idTicket": "PM00002567",
//     "categoriaTicket": "problema",
//     "titulo": "Lentitud generalizada en red corporativa",
//     "descripcion": "Multiple usuarios reportan lentitud en acceso a recursos de red durante horas pico (10:00-12:00 y 15:00-17:00)",
//     "fechaApertura": "2024-01-17T09:45:00",
//     "fechaCierre": undefined,
//     "abiertoPor": 95,
//     "prioridad": "Alta",
//     "fechaLimite": "2024-01-24T18:00:00",
//     "asignatario": {
//       "id": 215,
//       "username": "network_specialist",
//       "full_name": "Especialista en Redes",
//       "email": "network.specialist@empresa.com",
//       "rol": {
//         "id": 2,
//         "name": "TECNICO"
//       },
//       "created_at": "2024-01-10T16:20:00",
//       "active": true,
//       "grupo": {
//         "id_grupo": 4,
//         "nombre_grupo": "Redes"
//       }
//     },
//     "estado": "Investigación",
//     "areaAfectada": "Redes",
//     "comentarioCierre": "",
//     "tipoCierre": "",
//     "causa": "Posible saturación del enlace principal o comportamiento anómalo de algún dispositivo",
//     "solucionTemporal": "Priorización de tráfico crítico implementada",
//     "solucionPermanente": "En análisis, se considera ampliación de ancho de banda"
//   },
//   {
//     "idTicket": "C00034102",
//     "categoriaTicket": "cambio",
//     //"categoriaCambio": "emergencia",
//     "titulo": "Parche de seguridad crítica para servidores web",
//     "descripcion": "Aplicación inmediata de parche para vulnerabilidad CVE-2024-12345 en servidores IIS",
//     "fechaApertura": "2024-01-20T16:00:00",
//     "fechaCierre": "2024-01-20T19:30:00",
//     "prioridad": "Crítica",
//     "abiertoPor": 155,
//     "asignatario": {
//       "id": 220,
//       "username": "Elena",
//       "full_name": "Elena Torres",
//       "email": "elena.torres@empresa.com",
//       "rol": {
//         "id": 2,
//         "name": "TECNICO"
//       },
//       "created_at": "2024-01-03T16:30:00",
//       "active": true,
//       "grupo": {
//         "id_grupo": 1,
//         "nombre_grupo": "Infraestructura"
//       }
//     },
//     "estado": "Cerrado",
//     "areaAfectada": "Seguridad",
//     "comentarioCierre": "Cambio completado exitosamente, todos los servidores actualizados",
//     "tipoCierre": "Satisfactorio",
//     "planImplementacion": "Despliegue por lotes fuera de horario laboral, validación inmediata",
//     "planMarchaAtras": "Restauración desde snapshot de cada servidor",
//     "inicioImplementacionProgramado": "2024-01-20T18:00:00",
//     "finImplementacionProgramado": "2024-01-20T20:00:00",
//     "inicioImplementacionReal": "2024-01-20T18:05:00",
//     "finRmplementacionReal": "2024-01-20T19:25:00",
//     //"efectoNoImplementar": "Exposición a ataque remoto y posible brecha de datos"
//   },
//   {
//     "idTicket": "INC00923078",
//     "categoriaTicket": "incidencia",
//     "titulo": "Impresora multifunción atascando papel",
//     "descripcion": "La impresora del tercer piso (HP LaserJet MFP) atasca papel en la bandeja de salida",
//     "fechaApertura": "2024-01-21T11:10:00",
//     "fechaLimite": "2024-01-23T17:00:00",
//     "fechaCierre": undefined,
//     "abiertoPor": 120,
//     "prioridad": "Baja",
//     "asignatario": {
//       "id": 225,
//       "username": "soporte_impresoras",
//       "full_name": "Técnico de Impresoras",
//       "email": "impresoras.soporte@empresa.com",
//       "rol": {
//         "id": 2,
//         "name": "TECNICO"
//       },
//       "created_at": "2024-01-11T13:45:00",
//       "active": true,
//       "grupo": {
//         "id_grupo": 3,
//         "nombre_grupo": "Soporte"
//       }
//     },
//     "estado": "Registrado",
//     "areaAfectada": "Soporte Usuario",
//     "comentarioCierre": "",
//     "tipoCierre": ""
//   },
//   {
//     "idTicket": "C00034215",
//     "categoriaTicket": "cambio",
//     //"categoriaCambio": "normal",
//     "titulo": "Migración de servidor de archivos a nueva infraestructura",
//     "descripcion": "Traslado de servidor de archivos departamental a nuevo hardware con actualización de sistema operativo",
//     "fechaApertura": "2024-01-22T10:00:00",
//     "fechaCierre": undefined,
//     "prioridad": "Media",
//     "abiertoPor": 160,
//     "asignatario": {
//       "id": 230,
//       "username": "infra_manager",
//       "full_name": "Gestor de Infraestructura",
//       "email": "infra.manager@empresa.com",
//       "rol": {
//         "id": 2,
//         "name": "TECNICO"
//       },
//       "created_at": "2024-01-06T11:20:00",
//       "active": true,
//       "grupo": {
//         "id_grupo": 1,
//         "nombre_grupo": "Infraestructura"
//       }
//     },
//     "estado": "Registrado",
//     "areaAfectada": "Infraestructura",
//     "comentarioCierre": "",
//     "tipoCierre": "",
//     "planImplementacion": "Copia de datos, migración en fin de semana, validación por usuarios clave",
//     "planMarchaAtras": "Retorno al servidor original si hay problemas",
//     "inicioImplementacionProgramado": "2024-01-27T22:00:00",
//     "finImplementacionProgramado": "2024-01-28T06:00:00",
//     "inicioImplementacionReal": undefined,
//     "finRmplementacionReal": undefined,
//     //"efectoNoImplementar": "Hardware actual alcanzando fin de vida, riesgo de falla"
//   }
// ];
