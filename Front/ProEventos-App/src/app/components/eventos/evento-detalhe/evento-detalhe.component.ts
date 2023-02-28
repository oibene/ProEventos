import { Component, TemplateRef } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Evento } from '@app/models/Evento';
import { Lote } from '@app/models/Lote';
import { EventoService } from '@app/services/evento.service';
import { LoteService } from '@app/services/lote.service';

import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss']
})
export class EventoDetalheComponent {

  modalRef: BsModalRef | undefined;
  loteAtual = {id: 0, nome: '', indice: 0};

  evento = { } as Evento; //obj vazio ja inicializada
  eventoId?: number;
  imagemURL = 'assets/upload.png';
  file : File | undefined;

  modoSalvar = 'post'; //instancia em modo post (novo)

  form!: FormGroup;
  get f(): any{
    return this.form.controls;
  }

  get modoEditar(): boolean{
    return this.modoSalvar === 'put';
  }

  get lotes(): FormArray{
    return this.form.get('lotes') as FormArray;
  }

  get bsConfig(): any{
    return {
      adaptivePosition: true,
      dateInputFormat: 'DD/MM/YYYY hh:mm a',
      containerClass: 'theme-default',
      showWeekNumbers: false
    }
  }

  constructor(private fb: FormBuilder,
              private localeService: BsLocaleService,
              private activatedRouter: ActivatedRoute,
              private eventoService: EventoService,
              private loteService: LoteService,
              private spinner: NgxSpinnerService,
              private toaster: ToastrService,
              private router: Router,
              private modalService: BsModalService)
  {
    this.localeService.use('pt-br');
  }

  //pega o id do evento e copia os items só para alteração
  public carregarEvento(): void{
    this.eventoId = +this.activatedRouter.snapshot.paramMap.get('id')!;

    if(this.eventoId != null && this.eventoId != 0){
      //carregamento
      this.spinner.show();
      this.modoSalvar = 'put'; //quando ele nao é nulo ele vira atualizar

      this.eventoService.getEventosById(this.eventoId).subscribe({
        next: (evento: Evento) => {
          this.evento = {... evento};
          this.form.patchValue(this.evento);

          if(this.evento.imagemURL != null){
            this.imagemURL = environment.apiURL +
            'resources/images/' + this.evento.imagemURL;
          }

          this.evento.lotes.forEach(lote => {
            this.lotes.push(this.criarLote(lote));
          });//pega lotes
          
        }, //copia todos os items de evento
        error: (error: any) => {
          this.spinner.hide(),
          this.toaster.error('Erro ao tentar carregar Evento.'),
          console.log(error)
        },
        complete: () => this.spinner.hide()
      });
      // + na frente converte pra int
    }
  }

  ngOnInit(): void{
    this.validation();
    this.carregarEvento();
  }

  public validation(): void{
    this.form = this.fb.group({
      tema: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      local: ['', Validators.required ], 
      dataEvento: ['', Validators.required ],
      qtdPessoas: ['', [Validators.required, Validators.max(120000)]],
      telefone: ['', Validators.required ],
      email: ['',[Validators.required, Validators.email]],
      imagemURL: [''],
      //['aqui vai o placeholder', Validators.limitadores]
      lotes: this.fb.array([]) //recebe um array vazio para validar todos os items
    });
  }


  adicionarLote(): void {
    this.lotes.push(this.criarLote({id: 0} as Lote)); 
  }//envia a lista (PUSH) para o form principal

//retorna os lotes do form
  criarLote(lote: Lote): FormGroup{
    return this.fb.group({
      id: [lote.id, Validators.required],
      nome: [lote.nome, [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      preco: [lote.preco, Validators.required],
      dataInicio: [lote.dataInicio, Validators.required],
      dataFim: [lote.dataFim, Validators.required],
      quantidade: [lote.quantidade, [Validators.required, Validators.max(120000)]]
    })
  }

  public mudarValorData(value: Date, indice: number, campo: string): void{
    this.lotes.value[indice][campo] = value;
  }

  public retornaTituloLote(nome: string): string{
    return nome === null || nome === '' ? 'Nome do Lote' : nome;
  }

  public resetForm():void{
    this.form.reset();
  }

  public cssValidator(campoForm: FormControl | AbstractControl | null): any {
    return {'is-invalid': campoForm?.errors && campoForm?.touched}
  }

  public salvarEventos(): void {
    if(this.form.valid){
      this.spinner.show();

      this.evento = (this.modoSalvar === 'post') 
                  ? { ... this.form.value}
                  : {id: this.evento.id, ... this.form.value};

      this.eventoService[this.modoSalvar](this.evento).subscribe(
        (eventoRetorno: Evento) => {
          this.toaster.success('Evento salvo com sucesso!', 'Sucesso');
          this.router.navigate([`eventos/detalhe/${eventoRetorno.id}`]);
          //ao criar um evento ele atualiza a pagina e chama o evento criado
        },
        (error: any) => {
          console.error(error);
          this.toaster.error('Erro ao salvar evento', 'Erro');
        },

      ).add(() => this.spinner.hide()); //simplica a função, coloca no erro e no next
    }
  }

  public salvarLotes(): void{
    this.spinner.show();
    if(this.form.controls['lotes'].valid){

      this.loteService.saveLote(this.eventoId!,
      this.form.value.lotes).subscribe(
        
        () => {
          this.toaster.success('Lotes salvos com Sucesso!', 'Sucesso!');
          // this.lotes.reset(); //hmmmm
        },
        (error: any) => {
          this.toaster.error('Erro ao tentar salvar lotes.', 'Error');
          console.error(error);
        },
      ).add(()=> this.spinner.hide())
    }
  }

  public removerLote(template: TemplateRef<any>,indice: number):void{
    this.modalRef = this.modalService.show(template, { class:'modal-sm' });

    this.loteAtual.id = this.lotes.get(indice + '.id')?.value;
    this.loteAtual.nome = this.lotes.get(indice + '.nome')?.value;
    this.loteAtual.indice = indice;
  }

  confirmDeleteLote(): void {
    this.modalRef?.hide();
    this.spinner.show();

    this.loteService.deleteLote(this.eventoId!, this.loteAtual.id).subscribe(
      () => {

        this.toaster.success('Lote deletado com sucesso', 'Sucesso');
        this.lotes.removeAt(this.loteAtual.indice);
      },
      (error: any) => {
        this.toaster.error(`Erro ao tentar deletar o Lote ${this.loteAtual.id}`, 'Erro');
        console.error(error);
      },
    ).add(()=> this.spinner.hide())
  }


  declineDeleteLote(): void {
    this.modalRef?.hide();
  }


  onFileChange(ev: any): void{
    const reader = new FileReader();
    
    //sobrescreve o metodo e carrega nossa imagem
    reader.onload = (event: any) => this.imagemURL = event.target.result;

    //carrega a imagem
    this.file = ev.target.files;
    reader.readAsDataURL(this.file![0]);

    this.uploadImg()
  }
  
  uploadImg(): void{
    this.spinner.show();
    this.eventoService.postUpload(this.eventoId!, this.file!).subscribe(
      () => {
        this.carregarEvento();
        this.toaster.success('Imagem atualizada com Sucesso', 'Sucesso!')
      },
      (error: any) => {
        this.toaster.error('Erro ao fazer upload de imagem', 'Erro!');
        console.log(error);
      },
    ).add(() => this.spinner.hide());
  }

}
