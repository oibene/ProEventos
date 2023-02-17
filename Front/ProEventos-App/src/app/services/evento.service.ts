import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Evento } from '../models/Evento';

@Injectable()
export class EventoService {
  baseURL = 'https://localhost:5001/api/eventos';

  constructor(private http: HttpClient) { }

  public getEventos(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.baseURL)
              .pipe(take(3)); //só executa 3 vezes depois se desinscreve
  }

  public getEventosByTema(tema : string): Observable<Evento[]> {
    return this.http
                .get<Evento[]>(`${this.baseURL}/${tema}/tema`)
                .pipe(take(3));
  }

  public getEventosById(id : number): Observable<Evento> {
    return this.http
                .get<Evento>(`${this.baseURL}/${id}`)
                .pipe(take(3));
  }



  public post(evento : Evento): Observable<Evento> {
    return this.http
                .post<Evento>(this.baseURL, evento)
                .pipe(take(3));
  }

  public put(evento: Evento): Observable<Evento> {
    return this.http
                .put<Evento>(`${this.baseURL}/${evento.id}`, evento)
                .pipe(take(3)); 
  }

  public deleteEvento(id : number): Observable<any> {
    return this.http
                .delete<string>(`${this.baseURL}/${id}`)
                .pipe(take(3));
  }
}
//encapsulou o http pra chamar depois
