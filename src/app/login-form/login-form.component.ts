import {Component} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {CustomValidators} from "../utils/custom-validators";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

  public readonly firstNameControl = new FormControl(undefined, CustomValidators.requiredValidator("first name"))
  public readonly lastNameControl = new FormControl(undefined, CustomValidators.requiredValidator("last name"))
  public readonly emailControl = new FormControl(undefined, [CustomValidators.requiredValidator("email"), CustomValidators.emailValidator()])
  public readonly passwordControl = new FormControl(
    undefined,
    [CustomValidators.requiredValidator("password"),
      CustomValidators.passwordValidator(this.firstNameControl, this.lastNameControl)]
  )

  public readonly form = new FormGroup({
    firstName: this.firstNameControl,
    lastName: this.lastNameControl,
    email: this.emailControl,
    password: this.passwordControl
  })

  constructor() {
  }

  private static requiredValidator(fieldName: string): ValidatorFn {
    return (control): ValidationErrors | null =>
      control.value ? null : {required: `${fieldName} is required`};
  }
}
