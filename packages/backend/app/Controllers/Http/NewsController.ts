import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import News from 'App/Models/News';
import NewsValidator from 'App/Validators/NewsValidator';

export default class ThemesController {
  public async index() {
    return News.query().orderBy('id', 'desc').limit(2);
  }

  public async store({ request }: HttpContextContract) {
    const data = await request.validate(NewsValidator);
    return News.create(data);
  }

  public async update(ctx: HttpContextContract) {
    const { id } = ctx.params;
    const data = await ctx.request.validate(NewsValidator);
    const news = await News.findOrFail(id);
    news.merge(data);
    news.save();
    return news;
  }

  public async destroy(ctx: HttpContextContract) {
    const { id } = ctx.params;
    const news = await News.findOrFail(id);
    news.delete();
    return news;
  }
}
