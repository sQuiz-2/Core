import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Theme from 'App/Models/Theme';
import ThemeValidator from 'App/Validators/ThemeValidator';

export default class ThemesController {
  public async index() {
    return Theme.query().orderBy('id', 'asc');
  }

  public async store({ request }: HttpContextContract) {
    const data = await request.validate(ThemeValidator);
    return Theme.create(data);
  }

  public async update(ctx: HttpContextContract) {
    const { id } = ctx.params;
    const data = await ctx.request.validate(ThemeValidator);
    const theme = await Theme.findOrFail(id);
    theme.merge(data);
    theme.save();
    return theme;
  }

  public async destroy(ctx: HttpContextContract) {
    const { id } = ctx.params;
    const theme = await Theme.findOrFail(id);
    theme.delete();
    return theme;
  }
}
