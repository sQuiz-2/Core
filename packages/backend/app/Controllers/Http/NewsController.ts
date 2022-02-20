import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import News from 'App/Models/News';
import Cache, { CacheKeys } from 'App/Utils/Cache';
import NewsValidator from 'App/Validators/NewsValidator';

export default class ThemesController {
  public async index() {
    const cachedValue = Cache.get(CacheKeys.News);

    if (!cachedValue || cachedValue.isExpired) {
      const news = News.query().orderBy('id', 'desc');
      Cache.set(CacheKeys.News, news);
      return news;
    } else {
      return cachedValue.value;
    }
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
