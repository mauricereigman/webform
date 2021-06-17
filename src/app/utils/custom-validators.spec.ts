import {CustomValidators} from "./custom-validators";
import {FormControl} from "@angular/forms";

describe("CustomValidators", () => {
  describe("requiredValidator", () => {
    it("should return validation error if control state is empty", () => {
      const value = undefined;
      const control = new FormControl(value, CustomValidators.requiredValidator("undefinedField"))

      expect(control.errors).toBeTruthy()
    })

    it("should return validation error with the correct message if control state is empty", () => {
      const value = undefined;
      const control = new FormControl(value, CustomValidators.requiredValidator("first name"))

      expect(control.errors).toEqual({
        required: `first name is required`
      })
    })

    it("should return null error if control state is empty", () => {
      const value = "not empty";
      const control = new FormControl(value, CustomValidators.requiredValidator("first name"))

      expect(control.errors).toEqual(null)
    })
  })

  describe("passwordValidator", () => {

    let firstNameControl: FormControl;
    let lastNameControl: FormControl;
    const firstName = "Henk";
    const lastName = "Saab"

    beforeEach(() => {
      firstNameControl = new FormControl(firstName)
      lastNameControl = new FormControl(lastName)
    })

    it("should return validation error message if control state does not contain uppercase characters", () => {
      const value = `nouppercase`;
      const control = new FormControl(value, CustomValidators.passwordValidator(firstNameControl, lastNameControl))

      expect(control.errors?.noLowerAndUpperCase).toEqual("must consist of at least one uppercase and one lowercase character")
    })

    it("should return validation error if control state does not contain uppercase characters", () => {
      const value = `nouppercase`;
      const control = new FormControl(value, CustomValidators.passwordValidator(firstNameControl, lastNameControl))

      expect(control.errors?.noLowerAndUpperCase).toBeTruthy()
    })

    it("should return validation error if control state does not contain lowercase characters", () => {
      const value = `NOLOWERCASE`;
      const control = new FormControl(value, CustomValidators.passwordValidator(firstNameControl, lastNameControl))

      expect(control.errors?.noLowerAndUpperCase).toBeTruthy()
    })

    it("should return validation error message if control state does not contain at least 8 characters", () => {
      const value = `meaN`;
      const control = new FormControl(value, CustomValidators.passwordValidator(firstNameControl, lastNameControl))

      expect(control.errors?.invalidCharacterCount).toEqual( "must contain at least 8 characters")
    })

    it("should return validation error message if control state contains first name", () => {
      const value = `Henk`;
      const control = new FormControl(value, CustomValidators.passwordValidator(firstNameControl, firstNameControl))

      expect(control.errors?.containsFirstOrLastName).toEqual( "must not contain first or last name")
    })

    it("should return validation error message if control state contains first name in with different casing", () => {
      const value = `henk`;
      const control = new FormControl(value, CustomValidators.passwordValidator(firstNameControl, firstNameControl))

      expect(control.errors?.containsFirstOrLastName).toEqual( "must not contain first or last name")
    })

    it("should return validation error if control state contains last name", () => {
      const value = `Saab`;
      const control = new FormControl(value, CustomValidators.passwordValidator(firstNameControl, lastNameControl))

      expect(control.errors?.containsFirstOrLastName).toBeTruthy()
    })

    it("should return multiple errors if there are multiple incorrect control states", () => {
      const value = `Henk`;
      const control = new FormControl(value, CustomValidators.passwordValidator(firstNameControl, lastNameControl))

      expect(control.errors?.invalidCharacterCount).toBeTruthy()
      expect(control.errors?.containsFirstOrLastName).toBeTruthy()
    })

    it("should return null if control state is valid", () => {
      const value = `GoodPassword`;
      const control = new FormControl(value, CustomValidators.passwordValidator(firstNameControl, lastNameControl))

      expect(control.errors).toEqual(null)
    })
  })

  describe("emailValidator", () => {
    it("should return validation error message if email is invalid", () => {
      const value = `notvalid$gmail.com`;
      const control = new FormControl(value, CustomValidators.emailValidator())

      expect(control.errors?.invalidEmail).toEqual("email addres should adhere to format henk@gmail.com")
    })

    it("should return null if email is valid", () => {
      const value = `valid@gmail.com`;
      const control = new FormControl(value, CustomValidators.emailValidator())

      expect(control.errors).toEqual(null)
    })
  })

})
