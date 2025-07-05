import {inject, Injectable} from '@angular/core';
import {environment} from '../../Environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Usuario} from '../model/usuario';
import {Hotel} from '../model/hotel';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url= environment.apiUrl + "/api"
  private http: HttpClient = inject(HttpClient);
  private listaCambio = new Subject<Usuario[]>();
  constructor() { }

  //Entrega de proveedores
  //Observable -> llamada asincrona a la pagina
  list(): Observable<any> {
    return this.http.get<Usuario[]>(this.url + "/usuarios"); //proveedores url del backend
  }

  listID(id: number): Observable<any> {
    return this.http.get<Usuario[]>(this.url + "/usuario/" + id);
  }

  insert(usuario: Usuario): Observable<any> {
    return this.http.post(this.url + "/usuario", usuario);
  }

  update(usuario: Usuario): Observable<any> {
    return this.http.put(this.url + "/usuario", usuario);
  }

  delete(id: number){
    return this.http.delete(this.url + "/usuario/" + id);
  }

  setList(listaNueva: Usuario[]){
    this.listaCambio.next(listaNueva); //enviar nueva lista a los suscriptores
  }

  getList(){
    return this.listaCambio.asObservable();
  }
}
