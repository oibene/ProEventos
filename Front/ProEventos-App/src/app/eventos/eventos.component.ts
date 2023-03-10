import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Evento } from '../models/Evento';
import { EventoService } from '../services/evento.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
})
export class EventosComponent implements OnInit{
  //modal
  public modalRef: BsModalRef | undefined;

  public eventos: Evento[] = []; //declare e atribua valor!!!

  //definindo variaveis de tamanho
  public larguraImg: number = 150;
  public margemImg: number = 2;

  //outras var
  public exibirImg: boolean = true; //colocar tipo fica fofo

  //buscar
  private _filtroListado: string = ''; //privado :0
  public eventosFiltrados : Evento[] = []; //pra nao bugar o filtro/ nao limpar

  //get set
  public get filtroLista(){
    return this._filtroListado;
  }
  public set filtroLista(value: string){
    this._filtroListado = value;
    this.eventosFiltrados = this.filtroLista
                  ? this.filtrarEventos(this.filtroLista)
                  : this.eventos;
  } //filtra os eventos ou retorna todos

  filtrarEventos(filtrarPor: string): Evento[]{
    filtrarPor = filtrarPor.toLowerCase()
    return this.eventos.filter(
      (evento : any) => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1
                      || evento.local.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    ); //acada evento ele filtra
  }

  //importa o backend
  constructor(private eventoService: EventoService,
              private modalService: BsModalService
  ){ }

  public ngOnInit(): void {
    this.getEventos();
  }

  public exibeImg() : void{
    this.exibirImg = !this.exibirImg;
  }

  public getEventos(): void{
    this.eventoService.getEventos().subscribe({
      //observer
      next: (e : Evento[]) => {
          this.eventos = e,
          this.eventosFiltrados = this.eventos //preenche o filtro
        },
      error: (error: any) => console.log(error)
    });
    //pega os dados da url e retorna itens
  }


  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.modalRef?.hide();
  }

  decline(): void {
    this.modalRef?.hide();
  }
}
