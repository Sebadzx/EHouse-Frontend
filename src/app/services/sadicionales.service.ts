import {inject, Injectable} from '@angular/core';
import {environment} from '../../Environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Sadicionales} from '../model/sadicionales';
import {Reserva} from '../model/reserva';

@Injectable({
  providedIn: 'root'
})
export class SadicionalesService {
  private url = environment.apiUrl + "/api";
  private http: HttpClient = inject(HttpClient);
  private listaCambio = new Subject<Sadicionales[]>();

  constructor() { }

  list(): Observable<any>{
    return this.http.get<Sadicionales[]>(this.url + "/sAdicionales");
  }
  listId(id: number): Observable<any>{
    console.log(this.url + "/sAdicional/" + id)
    return this.http.get<Reserva[]>(this.url + "/sAdicional/" + id);
  }

  setList(listaNueva : Sadicionales[]){
    this.listaCambio.next(listaNueva);//enviar la nueva lista a los suscriptores
  }
  getList():Observable<Sadicionales[]> {
    return this.listaCambio.asObservable();
  }
}
