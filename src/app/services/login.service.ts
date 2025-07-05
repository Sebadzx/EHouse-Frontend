import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import {RequestDto} from '../model/request-dto';
import {map, Observable} from 'rxjs';
import {environment} from '../../Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = environment.apiUrl
  private http: HttpClient = inject(HttpClient);
  constructor() { }


  login(requestDto: RequestDto): Observable<any> {
    console.log("Enviando:", requestDto)
    return this.http.post(this.url + "/authenticate", requestDto,
      {observe: 'response'}).pipe(map((response) => {
        const body = response.body;
        console.log("Body:", body)
        const headers = response.headers;
        const bearerToken = headers.get('Authorization')!;
        const token = bearerToken.replace('Bearer ', '');
        console.log("Authorization:", bearerToken)
        localStorage.setItem('token', token);
        return body;
      }
    ));
  }

  getToken(){
    return localStorage.getItem('token');
  }
}
