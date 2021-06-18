import {Component} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {CustomValidators} from "../utils/custom-validators";
import {SignUpService} from "../services/sign-up.service";
import {tap} from "rxjs/operators";

@Component({
  selector: 'sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss']
})
export class SignUpFormComponent {

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
  public submitInProgress = false;

  constructor(private readonly signUpService: SignUpService) {
  }

  public signUp(form: FormGroup): void {
    this.submitInProgress = true
    this.signUpService.signUp({
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      email: form.value.email
    }).pipe(
      tap(
        this.handleSignupSuccess(form),
        this.handleSignupError(form)
      )
    ).subscribe()
  }

  private handleSignupSuccess(form: FormGroup): () => void {
    return  () => {
      this.submitted = true
      this.submitInProgress = false
      form.disable()
    }
  }

  private handleSignupError(form: FormGroup): () => void {
    return () => {
      form.setErrors({unknownError: "oh ooh, something went wrong"})
      this.submitInProgress = false
    }
  }

}
