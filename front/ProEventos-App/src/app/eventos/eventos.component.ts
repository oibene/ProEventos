import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})

export class EventosComponent implements OnInit {
  ngOnInit(): void {
    this.getEventos();
  }

  constructor(private http: HttpClient) {}

  public eventos: any = [];
  public filterEventos: any = [];
  private _searchList: string = ''

  widthImg = 250;
  marginImg = 2;
  showImg = false;

  showImage(){
    this.showImg = !this.showImg;
  }

  public get search() : string{
    return this._searchList;
  }
  public set search(value: string){
    this._searchList = value;
    this.filterEventos = this._searchList ? this.searchEventos(this._searchList) : this.eventos;
  }

  searchEventos(searchBy: string): any{
    searchBy = searchBy.toLocaleLowerCase();
    return this.eventos.filter(
      (e: {tema: string; local:string}) =>
       e.tema.toLocaleLowerCase().indexOf(searchBy) !== -1 ||
       e.local.toLocaleLowerCase().indexOf(searchBy) !== -1)
  }

  public getEventos(): void {
    this.http.get('https://localhost:5001/api/eventos').subscribe(
      response => {
        this.eventos = response,
        this.filterEventos = this.eventos
      },
      error => console.log(error)
    )
  }

}
