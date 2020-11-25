import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Logger from '@ioc:Adonis/Core/Logger';
import { Exception } from '@poppinss/utils';

export const enum OAuthExceptionCode {
  oAuhtInvalidClientId = 'OAUTH_INVALID_CLIENT_ID',
  oAuhtMissingClientId = 'OAUTH_MISSING_CLIENT_ID',
  oAuhtInvalidClientSecret = 'OAUTH_INVALID_CLIENT_SECRET',
  oAuhtMissingClientSecret = 'OAUTH_MISSING_CLIENT_SECRET',
  oAuhtInvalidCode = 'OAUTH_INVALID_CODE',
  oAuhtMissingCode = 'OAUTH_MISSING_CODE',
  oAuhtInvalidGrantType = 'OAUTH_INVALID_GRANT_TYPE',
  oAuhtInvalidRedirectUri = 'OAUTH_INVALID_REDIRECT_URI',
  oAuhtMissingRedirectUri = 'OAUTH_MISSING_REDIRECT_URI',
  oAuhtError = 'OAUTH_UNKNOWN',
}

export default class OAuthException extends Exception {
  protected details: any;

  constructor(message: string, code: string, details: string) {
    super(message, 401, code);
    this.details = details;
  }
  public async handle(_error: this, { response }: HttpContextContract) {
    if (this.code === OAuthExceptionCode.oAuhtInvalidCode) {
      response.status(401).send({ errors: [{ message: 'Code invalide' }] });
    } else if (this.code === OAuthExceptionCode.oAuhtError) {
      Logger.error(`${this.name} ${this.details} ${this.stack}`);
      response.status(500).send({ errors: [{ message: this.message }] });
    } else {
      Logger.error(this.stack || this.name);
      response.status(500).send({ errors: [{ message: this.message }] });
    }
  }
}
