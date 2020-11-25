import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { Exception } from '@poppinss/utils';

export default class AuthenticationException extends Exception {
  constructor(message: string) {
    super(message, 401);
  }

  public async handle(error: this, { response }: HttpContextContract) {
    response.status(error.status).send({ errors: [{ message: this.message, field: 'password' }] });
  }
}
