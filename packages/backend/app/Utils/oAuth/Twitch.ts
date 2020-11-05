import { Exception } from '@poppinss/utils';
import { twitchClientId, twitchClientSecrect, twitchRedirectUri } from 'Config/auth';
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

class Twitch {
  private client_id = twitchClientId;
  private client_secret = twitchClientSecrect;
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
      throw new Exception('La connection a échouée.', 400, 'OAUTH_CONNECTION');
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
    } catch {
      throw new Exception(
        "Une erreur est survenue lors de l'accès à vos donnés.",
        400,
        'OAUTH_INFOS',
      );
    }
  }
}

export default Twitch;
