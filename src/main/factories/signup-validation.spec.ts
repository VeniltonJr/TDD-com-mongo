import { makeSignUpValidation } from "./signup-validation"
import { ValidationComposite } from "../../presentation/helpers/validators/validation-composite"
import { RequiredFieldsValidation } from '../../presentation/helpers/validators/required-fields-validation'
import { Validation } from "../../presentation/helpers/validators/validation"
import { CompareFieldsValidation } from "../../presentation/helpers/validators/compare-fields-validations"
import { EmailValidation } from "../../presentation/helpers/validators/email-validations"
import { EmailValidator } from "../../presentation/protocols/emailValidator"

jest.mock('../../presentation/helpers/validators/validation-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

describe ('SignUpValidation Factory', () => {
  test('deve chamar ValidationComposite com todas as validações', () => {
    makeSignUpValidation()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldsValidation(field))
    }
    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
    validations.push(new EmailValidation('email', makeEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})