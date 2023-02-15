import { AbstractControl, FormGroup } from "@angular/forms";

export class ValidatorField {
    static MustMatch(controlName: string, matchingControlName:string): any{
        return(group: AbstractControl) =>{
            //pega o form e passa como parametro as duas senhas
            const formGroup = group as FormGroup;
            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matchingControlName];


            if(matchingControl.errors && !matchingControl.errors["mustMatch"]){
                return null;
            }

            if (control.value != matchingControl.value){
                //se as senhas nao batem ele cria um novo erro
                matchingControl.setErrors({ mustMatch: true});
            }
            else {
                matchingControl.setErrors(null);
            }

            return null;
        };
    }
}
