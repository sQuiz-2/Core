import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class ChallengeUsersController {
  public async show({ auth }: HttpContextContract) {
    await auth.user?.load('challenges');
    return auth.user?.challenges;
  }
}
