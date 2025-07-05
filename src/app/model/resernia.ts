import {Usuario} from './usuario';

export class Resenia{
  idResenia: number;
  puntuacion: number;
  fechaResenia: Date = new Date();
  descripcionResenia: string;

  usuario: Usuario;
}
