import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import LoginValidator from 'App/Validators/LoginValidator';
import PasswordValidator from 'App/Validators/PasswordValidator';

export default class AuthController {
  public async login({ request, auth, response }: HttpContextContract) {
    const { email, password } = await request.validate(LoginValidator);
    try {
      const token = await auth.attempt(email, password);
      return { email, token: token.token };
    } catch (e) {
      response.status(400);
      switch (e.code) {
        case 'E_INVALID_AUTH_PASSWORD':
          return response.json({ errors: [{ message: 'Mot passe invalide', field: 'password' }] });
        default:
          return response.json({
            errors: [{ message: 'The worst has happened ! (An error occurs)' }],
          });
      }
    }
  }

  public async password({ request, auth }: HttpContextContract) {
    const { password } = await request.validate(PasswordValidator);
    const user = auth.user;
    user?.merge({ password });
    return user?.save();
  }
}
