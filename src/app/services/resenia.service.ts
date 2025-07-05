import {inject, Injectable} from '@angular/core';
import {environment} from '../../Environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Resenia} from '../model/resernia';

@Injectable({
  providedIn: 'root'
})
export class ReseniaService {
  private url = environment.apiUrl + "/api"
  private http: HttpClient = inject(HttpClient); //new HttpClient()
  private listaCambio = new Subject<Resenia[]>();

  constructor() { }

  list(): Observable<any> {
    return this.http.get<Resenia[]>(this.url + "/resenias"); //proveedores url del backend
  }

  listID(id: number): Observable<any> {
    return this.http.get<Resenia[]>(this.url + "/resenia/" + id);
  }

  insert(reserva: Resenia): Observable<any> {
    return this.http.post(this.url + "/resenia", reserva);
  }

  update(reserva: Resenia): Observable<any> {
    return this.http.put(this.url + "/resenia", reserva);
  }

  delete(id: number){
    return this.http.delete(this.url + "/resenia/" + id);
  }

  setList(listaNueva: Resenia[]){
    this.listaCambio.next(listaNueva); //enviar nueva lista a los suscriptores
  }

  getList(){
    return this.listaCambio.asObservable();
  }
}
