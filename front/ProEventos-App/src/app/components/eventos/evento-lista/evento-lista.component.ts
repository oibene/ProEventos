import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Evento } from 'src/app/models/Evento';
import { EventoService } from 'src/app/services/evento.service';

@Component({
  selector: 'app-evento-lista',
  templateUrl: './evento-lista.component.html',
  styleUrls: ['./evento-lista.component.scss']
})

export class EventoListaComponent implements OnInit { 

    modalRef!: BsModalRef;
    eventos: Evento[] = [];
    filterEventos: Evento[] = [];
    private searchList: string = ''
  
    widthImg = 250;
    marginImg = 2;
    public showImg = false;
  
    ngOnInit(): void {
      this.getEventos();
      this.spinner.show();
    }
  
    constructor(private eventoService : EventoService,
      private modalService: BsModalService,
      private toastr: ToastrService,
      private spinner: NgxSpinnerService,
      private router: Router) {}
  
    get search() : string{
      return this.searchList;
    }
    set search(value: string){
      this.searchList = value;
      this.filterEventos = this.searchList ? this.searchEventos(this.searchList) : this.eventos;
    }
    
    showImage(): void{
      this.showImg = !this.showImg;
    }
    searchEventos(searchBy: string): Evento[]{
      searchBy = searchBy.toLocaleLowerCase();
      return this.eventos.filter( e => e.tema?.toLocaleLowerCase().indexOf(searchBy) !== -1 || e.local.toLocaleLowerCase().indexOf(searchBy) !== -1)
    }
  
    getEventos(): void {
      const observer = {
        next: (eventos : Evento[]) => {this.eventos = eventos, this.filterEventos = this.eventos, console.log(this.filterEventos)},
        error: () => {this.spinner.hide(), this.toastr.error('Erro ao carregar Eventos', 'Error!')},
        complete: () => this.spinner.hide()
      };
      this.eventoService.getEventos().subscribe(observer);
    }
  
    // MODAL
    openModal(template: TemplateRef<any>): void {
      this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
    }
   
    confirm(): void { this.modalRef.hide(); this.toastr.success('Evento deletado com sucesso', 'Deletado!'); }
    decline(): void { this.modalRef.hide(); }


    detalheEvento(id: number): void { this.router.navigate([`eventos/detalhe/${id}`]);}
}
