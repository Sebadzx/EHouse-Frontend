import {inject, Injectable} from '@angular/core';
import {environment} from '../../Environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Habitacion} from '../model/habitacion';
import {NroHabitaciones} from '../model/NroHabitaciones';
import {HabitacionFab} from '../model/habitacionFab';

@Injectable({
  providedIn: 'root'
})
export class HabitacionService {
  private url = environment.apiUrl + "/api"
  private http: HttpClient = inject(HttpClient); //new HttpClient()

  private listaCambio = new Subject<Habitacion[]>()
  constructor() { }

  //Entrega de proveedores
  //Observable -> llamada asincrona a la pagina
  list(): Observable<any> {
    return this.http.get<Habitacion[]>(this.url + "/habitaciones"); //proveedores url del backend
  }

  listID(id: number): Observable<any> {
    return this.http.get<Habitacion[]>(this.url + "/habitacion/" + id);
  }

  insert(habitacion: Habitacion): Observable<any> {
    return this.http.post(this.url + "/habitacion", habitacion);
  }

  update(habitacion: Habitacion): Observable<any> {
    return this.http.put(this.url + "/habitacion", habitacion);
  }

  delete(id: number){
    return this.http.delete(this.url + "/habitacion/" + id);
  }

  setList(listaNueva: Habitacion[]){
    this.listaCambio.next(listaNueva); //enviar nueva lista a los suscriptores
  }

  getList(){
    return this.listaCambio.asObservable();
  }

  getHabFav(): Observable<HabitacionFab[]> {
    return this.http.get<HabitacionFab[]>(this.url + "/preferenciahabitacion");
  }
}
