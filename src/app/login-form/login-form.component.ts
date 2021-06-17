import {Component} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {CustomValidators} from "../utils/custom-validators";
import {SignUpService} from "../services/sign-up.service";
import {tap} from "rxjs/operators";

@Component({
  selector: 'login-form',
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

  public submitted: boolean = false;
  public suppressSubmitButton = false;

  constructor(private readonly signUpService: SignUpService) {
  }

  public signUp(form: FormGroup): void {
    this.suppressSubmitButton = true
    this.signUpService.signUp({
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      email: form.value.email
    }).pipe(
      tap(
        res => {
          this.submitted = true
        },
        err => {
          form.setErrors({unknownError: "oh ooh, something went wrong"})
          this.suppressSubmitButton = false
        }
      )
    ).subscribe()
  }

}
