import {Habitacion} from './habitacion';

export class Usuario {
  idUsuario: number;
  nombreUsuario: string;
  apellidoUsuario: string;
  telefonoUsuario: string;
  fechaNacimientoUsuario: Date= new Date();
  emailUsuario: string;
  usernameUsuario: string;
  passwordUsuario: string;
  enabledUsuario: boolean;

}
