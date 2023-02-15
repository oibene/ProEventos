import { Component } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorField } from '@app/helpers/validator-field';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent {
  form!: FormGroup;

  constructor(private fb: FormBuilder){}

  get f(): any{
    return this.form.controls;
  }

  ngOnInit(): void{
    this.validation();
  }

  private validation(): void{
    const formOptions: AbstractControlOptions = {
      validators: ValidatorField.MustMatch('senha', 'confirmeSenha')
    }; //atribui um validator novo no form group e associa os 2

    this.form = this.fb.group({
      fistname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      desc: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmeSenha:['', Validators.required]
    }, formOptions);
  }
}
