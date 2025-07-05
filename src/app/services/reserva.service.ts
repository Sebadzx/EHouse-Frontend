import {inject, Injectable} from '@angular/core';
import {environment} from '../../Environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Reserva} from '../model/reserva';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private url = environment.apiUrl + "/api"
  private http: HttpClient = inject(HttpClient); //new HttpClient()
  private listaCambio = new Subject<Reserva[]>();
  constructor() { }

  //Entrega de proveedores
  //Observable -> llamada asincrona a la pagina
  list(): Observable<any> {
    return this.http.get<Reserva[]>(this.url + "/reservas"); //proveedores url del backend
  }

  listID(id: number): Observable<any> {
    return this.http.get<Reserva[]>(this.url + "/reserva/" + id);
  }

  insert(reserva: Reserva): Observable<any> {
    return this.http.post(this.url + "/reserva", reserva);
  }

  update(reserva: Reserva): Observable<any> {
    return this.http.put(this.url + "/reserva", reserva);
  }

  delete(id: number){
    return this.http.delete(this.url + "/reserva/" + id);
  }

  setList(listaNueva: Reserva[]){
    this.listaCambio.next(listaNueva); //enviar nueva lista a los suscriptores
  }

  getList(){
    return this.listaCambio.asObservable();
  }
}
