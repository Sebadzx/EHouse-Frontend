import {inject, Injectable} from '@angular/core';
import {Hotel} from '../model/hotel';
import {environment} from '../../Environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {NroHabitaciones} from '../model/NroHabitaciones';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private url = environment.apiUrl + "/api"
  private http: HttpClient = inject(HttpClient); //new HttpClient()
  private listaCambio = new Subject<Hotel[]>();
  constructor() { }

  //Entrega de proveedores
  //Observable -> llamada asincrona a la pagina
  list(): Observable<any> {
    return this.http.get<Hotel[]>(this.url + "/hoteles"); //proveedores url del backend
  }

  listID(id: number): Observable<any> {
    return this.http.get<Hotel[]>(this.url + "/hotel/" + id);
  }

  insert(hotel: Hotel): Observable<any> {
    return this.http.post(this.url + "/hotel", hotel);
  }

  update(hotel: Hotel): Observable<any> {
    return this.http.put(this.url + "/hotel", hotel);
  }

  delete(id: number){
    return this.http.delete(this.url + "/hotel/" + id);
  }

  setList(listaNueva: Hotel[]){
    this.listaCambio.next(listaNueva); //enviar nueva lista a los suscriptores
  }

  getList(){
    return this.listaCambio.asObservable();
  }

  getNumeroHabitaciones(): Observable<NroHabitaciones[]> {
    return this.http.get<NroHabitaciones[]>(this.url + "/nmroHabitaciones");
  }
}
