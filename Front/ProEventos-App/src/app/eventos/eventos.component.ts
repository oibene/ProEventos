import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit{
  public eventos: any = []; //declare e atribua valor!!!

  //definindo variaveis de tamanho
  larguraImg: number = 150;
  margemImg: number = 2;

  //outras var
  exibirImg: boolean = true; //colocar tipo fica fofo

  //buscar
  private _filtroLista: string = ''; //privado :0
  public eventosFiltrados : any; //pra nao bugar o filtro/ nao limpar

  //get set
  public get filtroLista(){
    return this._filtroLista;
  }
  public set filtroLista(value: string){
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista
                  ? this.filtrarEventos(this.filtroLista)
                  : this.eventos;
  } //filtra os eventos ou retorna todos

  filtrarEventos(filtrarPor: string): any{
    filtrarPor = filtrarPor.toLowerCase()
    return this.eventos.filter(
      (evento : any) => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1
                      || evento.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    ) //acada evento ele filtra
  }

  //importa o backend
  constructor(private http: HttpClient){ }

  ngOnInit(): void {
    this.getEventos();
  }

  exibeImg(){
    this.exibirImg = !this.exibirImg;
  }

  public getEventos(): void{
    this.http.get('https://localhost:5001/api/eventos').subscribe(
      response =>{
        this.eventos = response,
        this.eventosFiltrados = this.eventos //preenche o filtro
      },

      error => console.log(error)
      );
    //pega os dados da url e retorna itens
  }

}
