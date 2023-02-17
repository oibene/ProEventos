import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Evento } from '@app/models/Evento';
import { EventoService } from '@app/services/evento.service';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss']
})
export class EventoDetalheComponent {

  evento = { } as Evento; //obj vazio ja inicializada
  modoSalvar = 'post'; //instancia em modo post (novo)

  form!: FormGroup;
  get f(): any{
    return this.form.controls;
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
              private router: ActivatedRoute,
              private eventoService: EventoService,
              private spinner: NgxSpinnerService,
              private toaster: ToastrService)
  {
    this.localeService.use('pt-br');
  }

  //pega o id do evento e copia os items só para alteração
  public carregarEvento(): void{
    const eventoIdParam = this.router.snapshot.paramMap.get('id');

    if(eventoIdParam != null){
      //carregamento
      this.spinner.show();
      this.modoSalvar = 'put'; //quando ele nao é nulo ele vira atualizar

      this.eventoService.getEventosById(+eventoIdParam).subscribe({
        next: (evento: Evento) => {
          this.evento = {... evento};
          this.form.patchValue(this.evento);
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
      imagemURL: ['', Validators.required],
      //['aqui vai o placeholder', Validators.limitadores]
    });
  }

  public resetForm():void{
    this.form.reset();
  }

  public cssValidator(campoForm: FormControl): any {
    return {'is-invalid': campoForm.errors && campoForm.touched}
  }

  public salvarAlteracao(): void {
    this.spinner.show();
    if(this.form.valid){

      this.evento = (this.modoSalvar === 'post') 
                  ? { ... this.form.value}
                  : {id: this.evento.id, ... this.form.value};

      this.eventoService[this.modoSalvar](this.evento).subscribe(
        () => this.toaster.success('Evento salvo com sucesso!', 'Sucesso'),
        (error: any) => {
          console.error(error);
          this.toaster.error('Erro ao salvar evento', 'Erro');
        },
      ).add(() => this.spinner.hide()); //simplica a função, coloca no erro e no next
    }
  }
}
