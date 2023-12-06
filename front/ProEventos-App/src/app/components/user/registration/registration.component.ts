import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorField } from 'src/app/helpers/ValidatorField';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
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
      userName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPass: ['', Validators.required]
    }, formOptions);
  }

}
