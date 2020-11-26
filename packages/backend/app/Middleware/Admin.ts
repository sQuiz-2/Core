import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import AdminException from 'App/Exceptions/AdminException';

export default class Admin {
  public async handle({ auth }: HttpContextContract, next: () => Promise<void>) {
    if (!auth.user?.staff) {
      throw new AdminException('Contenu reservé au staff');
    }
    await next();
  }
}
