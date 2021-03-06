import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { Exception } from '@poppinss/utils';

export default class AdminException extends Exception {
  constructor(message: string) {
    super(message, 403);
  }

  public async handle(error: this, { response }: HttpContextContract) {
    response.status(error.status).send({ errors: [{ message: this.message }] });
  }
}
