import OAuthException, { OAuthExceptionCode } from 'App/Exceptions/OAuthException';
import { twitchClientId, twitchClientSecret, twitchRedirectUri } from 'Config/auth';
import got from 'got';

type TwitchUser = {
  id: string;
  login: string;
  display_name: string;
  type: string;
  broadcaster_type: string;
  description: string;
  profile_image_url: string;
  offline_image_url: string;
  view_count: number;
  email: string;
};

type ResponseToken = {
  access_token: string;
  expires_in: number;
  id_token: string;
  refresh_token: string;
  scope: string[];
  token_type: string;
};

type ResponseUser = {
  data: TwitchUser[];
};

export type oAuthData = {
  token: string;
  refreshToken: string;
  email: string;
  username: string;
  userId: string;
};

const TwitchException = {
  'invalid client': OAuthExceptionCode.oAuhtInvalidClientId,
  'missing client id': OAuthExceptionCode.oAuhtMissingClientId,
  'invalid client secret': OAuthExceptionCode.oAuhtInvalidClientSecret,
  'missing client secret': OAuthExceptionCode.oAuhtMissingClientSecret,
  'Invalid authorization code': OAuthExceptionCode.oAuhtInvalidCode,
  'missing code': OAuthExceptionCode.oAuhtMissingCode,
  'invalid grant type': OAuthExceptionCode.oAuhtInvalidGrantType,
  'Parameter redirect_uri does not match registered URI':
    OAuthExceptionCode.oAuhtInvalidRedirectUri,
  'missing redirect uri': OAuthExceptionCode.oAuhtMissingRedirectUri,
};

class Twitch {
  private client_id = twitchClientId;
  private client_secret = twitchClientSecret;
  private redirect_uri = twitchRedirectUri;
  private token: string | null = null;
  private refreshToken: string | null = null;
  public email: string | null = null;
  public username: string | null = null;
  public userId: string | null = null;

  public async login(code: string): Promise<oAuthData> {
    await this.fetchUserToken(code);
    await this.fetchUserInfo();
    return {
      token: this.token!,
      refreshToken: this.refreshToken!,
      email: this.email!,
      username: this.username!,
      userId: this.userId!,
    };
  }

  public async fetchUserToken(code: string) {
    const params = {
      client_id: this.client_id,
      client_secret: this.client_secret,
      code,
      grant_type: 'authorization_code',
      redirect_uri: this.redirect_uri,
    };
    try {
      const { body: bodyToken } = await got.post<ResponseToken>(
        'https://id.twitch.tv/oauth2/token',
        {
          searchParams: params,
          responseType: 'json',
        },
      );
      this.token = bodyToken.access_token;
      this.refreshToken = bodyToken.refresh_token;
      return { token: this.token, refresh_token: this.refreshToken };
    } catch (e) {
      const errorMessage = e?.response?.body?.message;
      const errorCode = TwitchException[errorMessage] || OAuthExceptionCode.oAuhtError;
      throw new OAuthException('Erreur interne. (Twitch)', errorCode, errorMessage);
    }
  }

  public async fetchUserInfo() {
    try {
      const { body: bodyUser } = await got<ResponseUser>('https://api.twitch.tv/helix/users', {
        headers: {
          Authorization: 'Bearer ' + this.token,
          'Client-Id': twitchClientId,
        },
        responseType: 'json',
      });
      this.email = bodyUser.data[0].email;
      this.username = bodyUser.data[0].display_name;
      this.userId = bodyUser.data[0].id;
      return { email: this.email, username: this.username };
    } catch (e) {
      const errorMessage = e?.response?.body?.message;
      const errorCode = TwitchException[errorMessage] || OAuthExceptionCode.oAuhtError;
      throw new OAuthException('Erreur interne. (Twitch)', errorCode, errorMessage);
    }
  }
}

export default Twitch;
