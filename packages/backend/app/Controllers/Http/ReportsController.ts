import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Report from 'App/Models/Report';

export default class ThemesController {
  public async reset(ctx: HttpContextContract) {
    const { id } = ctx.params;
    const report = await Report.findOrFail(id);
    report.delete();
    return report;
  }
}
