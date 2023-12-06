import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControlOptions, Validators } from '@angular/forms';
import { ValidatorField } from 'src/app/helpers/ValidatorField';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  form!: FormGroup;

  get f(): any { return this.form.controls; }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.validation();
  }

  validation(): void {
    const formOptions: AbstractControlOptions = { validators: ValidatorField.MustMatch('password','confirmPass')};

    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required], 
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      desc: ['', [Validators.required, Validators.maxLength(75)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPass: ['', Validators.required]
    }, formOptions);
  }

  resetForm(event: any): void { event.preventDefault(); this.form.reset(); }
}
