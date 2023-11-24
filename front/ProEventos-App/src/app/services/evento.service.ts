import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from '../models/Evento';

@Injectable()
export class EventoService {
  public baseURL = 'https://localhost:5001/api/eventos';
  constructor(private http: HttpClient) { }

  public getEventos(): Observable<Evento[]> { return this.http.get<Evento[]>(this.baseURL); }

  public getEventosbyTema(tema: string): Observable<Evento[]> {
     return this.http.get<Evento[]>(`${this.baseURL}/tema/${tema}`);
    }
    public getEventobyId(id: number): Observable<Evento> {
     return this.http.get<Evento>(`${this.baseURL}/${id}`);
    }
}
