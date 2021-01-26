import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema } from '@ioc:Adonis/Core/Validator';
import { Report } from '@squiz/shared';

const reportRules = {};

/**
 * Assign a validation rule for each keys
 */
Object.values(Report).forEach((reportValue) => {
  reportRules[reportValue] = schema.boolean.optional();
});

export default class ReportValidator {
  constructor(private ctx: HttpContextContract) {}

  public schema = schema.create({
    reports: schema.object().members(reportRules),
  });

  public cacheKey = this.ctx.routeKey;

  public messages = {
    'report.required': 'Un objet reports est requis',
  };
}
