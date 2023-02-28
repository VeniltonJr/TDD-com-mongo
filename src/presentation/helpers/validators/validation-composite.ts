import { Validation } from '../../protocols/validation'

export class ValidationComposite implements Validation{
  private readonly validations: Validation[]

  constructor (validations: Validation[]) {
    this.validations = validations
  }

  validate (imput: any): Error {
    for (const validation of this.validations) {
      const error = validation.validate(imput)
      if (error){
        return error
      }
    }
  }
}