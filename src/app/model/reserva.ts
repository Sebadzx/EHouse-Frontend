import {Habitacion} from './habitacion';
import {Usuario} from './usuario';
import {Sadicionales} from './sadicionales';

export class Reserva {
  idReserva: number = 0;
  cantidadPersonas: number = 0;
  fecha_reserva: Date = new Date();
  fechaInicio: Date = new Date();
  fechaFin: Date = new Date();
  precioTotal: number = 0;
  estadoReserva: string;

  usuario: Usuario;
  habitacion: Habitacion;
  sAdicionales?: Sadicionales | null;
}
