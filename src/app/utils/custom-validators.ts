import {AbstractControl, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";

export class CustomValidators {

  public static readonly NO_LOWER_AND_UPPER_CASE_MESSAGE = "must consist of at least one uppercase and one lowercase character"
  public static readonly INVALID_CHARACTER_COUNT_MESSAGE = "must contain at least 8 characters"
  public static readonly CONTAINS_FIRST_OR_LAST_NAME_MESSAGE = "must not contain first or last name"
  public static readonly INVALID_EMAIL = "email addres should adhere to format henk@gmail.com"

  public static requiredValidator(fieldName: string): ValidatorFn {
    return (control): ValidationErrors | null =>
      control.value ? null : {required: `${fieldName} is required`};
  }

  public static passwordValidator(firstNameControl: AbstractControl, lastNameControl: AbstractControl): ValidatorFn {
    return (control): ValidationErrors | null => {
      const firstName = firstNameControl.value;
      const lastName = lastNameControl.value;
      const password = control.value;

      const errors: ValidationErrors = {};

      if (!CustomValidators.hasLowerAndUpperCase(password)) {
        errors.noLowerAndUpperCase = CustomValidators.NO_LOWER_AND_UPPER_CASE_MESSAGE
      }
      if (!CustomValidators.hasCorrectAmountOfChars(password)) {
        errors.invalidCharacterCount = CustomValidators.INVALID_CHARACTER_COUNT_MESSAGE
      }
      if (!CustomValidators.doesNotContainUserNames(password, firstName, lastName)) {
        errors.containsFirstOrLastName = CustomValidators.CONTAINS_FIRST_OR_LAST_NAME_MESSAGE
      }

      return Object.values(errors).length === 0 ? null : errors
    };
  }

  public static emailValidator(): ValidatorFn {
    return (control): ValidationErrors | null =>
      Validators.email(control) ? {invalidEmail: CustomValidators.INVALID_EMAIL} : null
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
      isValid = !value.toLocaleLowerCase().includes(firstName.toLocaleLowerCase())
    }

    if (lastName && isValid) {
      isValid = !value.toLocaleLowerCase().includes(lastName.toLocaleLowerCase())
    }

    return isValid
  }
}
