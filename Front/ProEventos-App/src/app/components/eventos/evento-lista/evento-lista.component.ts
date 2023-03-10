import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { Evento } from '@app/models/Evento';
import { EventoService } from '@app/services/evento.service';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-eventos',
  templateUrl: './evento-lista.component.html',
  styleUrls: ['./evento-lista.component.scss'],
})
export class EventoListaComponent implements OnInit{
  //modal
  public modalRef: BsModalRef | undefined;
  public eventoId = 0;

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
              private modalService: BsModalService,
              private toastr: ToastrService,
              private spinner: NgxSpinnerService,
              private router: Router
  ){ }

  public ngOnInit(): void {
    // spinner pra carregar a tela
    this.spinner.show();

    this.getEventos();
  }

  public exibeImg() : void{
    this.exibirImg = !this.exibirImg;
  }

  public retornaImg(imagemURL: string): string{
    return (imagemURL != '') 
    ? `${environment.apiURL}resources/images/${imagemURL}`
    : 'assets/sem-imagem.jpg'
  }

  public getEventos(): void{
    this.eventoService.getEventos().subscribe(
      
      //next
      (e : Evento[]) => { 
          this.eventos = e,
          this.eventosFiltrados = this.eventos //preenche o filtro
        },
      
      //error
      (error: any) => {
        this.spinner.hide();
        this.toastr.error('Erro ao Carregar os Eventos', 'Erro!'),
        console.error(error)
      },

      //complete
      () => this.spinner.hide()
    );
    //pega os dados da url e retorna itens
  }


  openModal(event: any, template: TemplateRef<any>, eventoId: number): void {
    event.stopPropagation();
    this.eventoId = eventoId;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.modalRef?.hide();
    this.spinner.show();

    this.eventoService.deleteEvento(this.eventoId).subscribe(
      (result: any) => {
        if(result.message === 'Deletado'){
          this.toastr.success('O evento foi deletado com sucesso', 'Deletado');
          this.spinner.hide();
          this.getEventos();
        }
      },

      (error: any) => {
        console.error(error);
        this.toastr.error(`Erro ao tentar deletar o evento ${this.eventoId}`)
        
      }
    ).add(() => this.spinner.hide());

  }

  decline(): void {
    this.modalRef?.hide();
  }

  //editar eventos
  detalheEvento(id: number): void {
    this.router.navigate([`eventos/detalhe/${id}`]);
  }
}