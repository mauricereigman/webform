import {Component} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

  public readonly firstNameControl = new FormControl(undefined, LoginFormComponent.requiredValidator("first name"))
  public readonly lastNameControl = new FormControl(undefined, LoginFormComponent.requiredValidator("last name"))
  public readonly emailControl = new FormControl(undefined, [LoginFormComponent.requiredValidator("email"), LoginFormComponent.emailValidator()])
  public readonly passwordControl = new FormControl(
    undefined,
    [LoginFormComponent.requiredValidator("password"),
      LoginFormComponent.passwordValidator(this.firstNameControl, this.lastNameControl)]
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

  private static passwordValidator(firstNameControl: AbstractControl, lastNameControl: AbstractControl): ValidatorFn {
    return (control): ValidationErrors | null => {
      const firstName = firstNameControl.value;
      const lastName = lastNameControl.value;
      const password = control.value;

      const errors: ValidationErrors = {};

      if (!LoginFormComponent.hasLowerAndUpperCase(password)) {
        errors.noLowerAndUpperCase = "password must contain lower and upercase characters"
      }
      if (!LoginFormComponent.hasCorrectAmountOfChars(password)) {
        errors.hasCorrectAmountOfChars = "password must consist of at least 8 characters"
      }
      if (!LoginFormComponent.doesNotContainUserNames(password, firstName, lastName)) {
        errors.noLowerAndUpperCase = "password may not contain first or last name"
      }

      return errors.size === 0 ? null : errors
    };
  }

  private static emailValidator(): ValidatorFn {
    return (control): ValidationErrors | null =>
      Validators.email(control) ? {invalidEmail: "email addres is invalid. use format henk@gmail.com"} : null
  }

  private static hasCorrectAmountOfChars(value: string | undefined): boolean {
    return !!value && value.length >= 8
  }

  private static hasLowerAndUpperCase(value: string | undefined): boolean {
    return !!value && new RegExp("(?=.*[a-z])(?=.*[A-Z])")
      .test(value);
  }

  private static doesNotContainUserNames(value: string | undefined, firstName: string | undefined, lastName: string | undefined): boolean {
    if (!value) return true

    let isValid: boolean = true;
    if (firstName) {
      isValid = !value.includes(firstName)
    } else if (lastName) {
      isValid = isValid && !value.includes(lastName)
    }

    return isValid
  }

}
