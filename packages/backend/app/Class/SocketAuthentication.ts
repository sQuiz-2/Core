import ApiToken from 'App/Models/ApiToken';
import User from 'App/Models/User';
import crypto from 'crypto';

class SocketAuthentication {
  private urlDecode(encoded) {
    return Buffer.from(encoded, 'base64').toString('utf-8');
  }

  private generateHash(token) {
    return crypto.createHash('sha256').update(token).digest('hex');
  }

  private parseToken(token) {
    const parts = token.split('.');
    /**
     * Ensure the token has two parts
     */
    if (parts.length !== 2) {
      throw new Error('E_INVALID_API_TOKEN');
    }

    /**
     * Ensure the first part is a base64 encode id
     */
    const tokenId = this.urlDecode(parts[0]);

    if (!tokenId) {
      throw new Error('E_INVALID_API_TOKEN');
    }

    const parsedToken = this.generateHash(parts[1]);
    return {
      token: parsedToken,
      tokenId,
    };
  }

  public async checkToken(token: string): Promise<User> {
    const parsedToken = this.parseToken(token);
    const apiToken = await ApiToken.query()
      .select('userId')
      .where('id', parsedToken.tokenId)
      .andWhere('token', parsedToken.token)
      .preload('user', (query) => {
        query.select('id', 'username', 'staff', 'avatar', 'ban');
      })
      .first();
    if (!apiToken) {
      throw new Error('E_INVALID_API_TOKEN');
    }
    return apiToken.user as User;
  }
}

export default SocketAuthentication;
