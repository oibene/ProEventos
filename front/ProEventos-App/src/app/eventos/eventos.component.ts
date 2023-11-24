import { Component, OnInit, TemplateRef } from '@angular/core';
import { EventoService } from '../services/evento.service';
import { Evento } from '../models/Evento';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})

export class EventosComponent implements OnInit {
  modalRef!: BsModalRef;
  eventos: Evento[] = [];
  filterEventos: Evento[] = [];
  private searchList: string = ''

  widthImg = 250;
  marginImg = 2;
  public showImg = false;

  ngOnInit(): void {
    this.getEventos();
  }

  constructor(private eventoService : EventoService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService) {}

  get search() : string{
    return this.searchList;
  }
  set search(value: string){
    this.searchList = value;
    this.filterEventos = this.searchList ? this.searchEventos(this.searchList) : this.eventos;
  }
  
  showImage(): void{
    this.showImg = !this.showImg;
    this.spinner.show();

    setTimeout(() => {this.spinner.hide();}, 5000);
  }
  searchEventos(searchBy: string): Evento[]{
    searchBy = searchBy.toLocaleLowerCase();
    return this.eventos.filter( e => e.tema?.toLocaleLowerCase().indexOf(searchBy) !== -1 || e.local.toLocaleLowerCase().indexOf(searchBy) !== -1)
  }

  getEventos(): void {
    const observer = {
      next: (eventos : Evento[]) => {this.eventos = eventos, this.filterEventos = this.eventos, console.log(this.filterEventos)},
      error: () => {(error: any) => console.log(error)}
    };
    this.eventoService.getEventos().subscribe(observer);
  }


  // MODAL
  openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
 
  confirm(): void { this.modalRef.hide(); this.toastr.success('Evento deletado com sucesso', 'Deletado!'); }
  decline(): void { this.modalRef.hide(); }
}
