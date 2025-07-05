import { Routes } from '@angular/router';
import {HomeComponent} from './componente/home/home.component';
import {UsuarioListarComponent} from './componente/usuario-listar/usuario-listar.component';
import {NewUsuarioComponent} from './componente/new-usuario/new-usuario.component';
import {HotelListarComponent} from './componente/hotel-listar/hotel-listar.component';
import {NewHotelComponent} from './componente/new-hotel/new-hotel.component';
import {ReservaComponent} from './componente/new-reserva/reserva.component';
import {LoginComponent} from './componente/login/login.component';
import {ReservaListarComponent} from './componente/reserva-listar/reserva-listar.component';
import {NewHabitacionComponent} from './componente/new-habitacion/new-habitacion.component';
import {seguridadGuard} from './guard/seguridad.guard';
import {HabitacionListarComponent} from './componente/habitacion-listar/habitacion-listar.component';
import {ReseniaListarComponent} from './componente/resenia-listar/resenia-listar.component';
import {NewReseniaComponent} from './componente/new-resenia/new-resenia.component';
import {
  HotelNumeroHabitacionesComponent
} from './componente/hotel-numero-habitaciones/hotel-numero-habitaciones.component';
import {HabitacionFavComponent} from './componente/habitacion-fav/habitacion-fav.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  //pathmatch : 'full' -> si pone otra direccion siempre lo redirecciona al home
  { path: 'home', component: HomeComponent },
  { path: 'usuarios', component: UsuarioListarComponent},
  //, canActivate: [seguridadGuard]
  { path: 'new-usuario', component: NewUsuarioComponent},
  { path: 'usuario-edit/:id', component: NewUsuarioComponent},
  { path: 'hoteles', component: HotelListarComponent },
  { path: 'new-hotel', component: NewHotelComponent},
  { path: 'new-habitacion/:id', component: NewHabitacionComponent},
  { path: 'habitacion', component: HabitacionListarComponent},
  { path: 'new-habitacion', component: NewHabitacionComponent},
  { path: 'hotel-edit/:id', component: NewHotelComponent},
  { path: 'resenias', component: ReseniaListarComponent },
  { path: 'new-resenia', component: NewReseniaComponent},
  { path: 'resenia-edit/:id', component: NewReseniaComponent},
  { path: 'reservas', component: ReservaListarComponent },
  { path: 'new-reserva', component: ReservaComponent},
  { path: 'new-reserva-listado', component: ReservaListarComponent},
  { path: 'reserva-edit/:id', component: ReservaComponent},
  { path: 'numero-habitaciones', component: HotelNumeroHabitacionesComponent },
  { path: 'habFavorita', component: HabitacionFavComponent },
  { path: 'login', component: LoginComponent}

];
