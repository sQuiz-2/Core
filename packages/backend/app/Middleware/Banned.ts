import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import BanException from 'App/Exceptions/BanException';

export default class Admin {
  public async handle({ auth }: HttpContextContract, next: () => Promise<void>) {
    if (auth.user?.ban === true) {
      throw new BanException('Votre compte est banni');
    }
    await next();
  }
}
