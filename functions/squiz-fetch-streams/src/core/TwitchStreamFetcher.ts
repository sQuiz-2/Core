import got from 'got';

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

type TwitchStream = {
  game_id: string;
  game_name: string;
  id: string;
  language: string;
  started_at: string;
  thumbnail_url: string;
  title: string;
  type: string;
  user_id: string;
  user_login: string;
  user_name: string;
  viewer_count: number;
};

type TwitchPagination = {
  cursor?: string;
};

type TwitchStreams = {
  data: TwitchStream[];
  pagination: TwitchPagination;
};

type TwitchAccessToken = {
  access_token: string;
  expires_in: number;
  token_type: string;
};

class TwitchStreamFetcher {
  /**
   * The appAccessToken token is required to make backend to twitch requests
   */
  appAccessToken: string | null = null;

  /**
   * Fetch a new appAccessToken
   */
  async fetchAppAccessToken() {
    try {
      const appAccessToken = await got.post<TwitchAccessToken>(
        'https://id.twitch.tv/oauth2/token',
        {
          json: {
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            grant_type: 'client_credentials',
          },
          responseType: 'json',
        }
      );
      this.appAccessToken = appAccessToken.body.access_token;
    } catch (error) {
      console.error(error.response.body);
    }
  }

  /**
   * Fetch a stream page with a given game
   */
  async fetchStreams({ gameId, after }: { gameId: number; after: string | null }) {
    try {
      const fetchedStreams = await got<TwitchStreams>('https://api.twitch.tv/helix/streams', {
        searchParams: {
          game_id: gameId,
          after,
        },
        headers: {
          'Client-Id': CLIENT_ID,
          Authorization: `Bearer ${this.appAccessToken!}`,
        },
        responseType: 'json',
      });
      return fetchedStreams.body;
    } catch (error) {
      console.error(error.response.body);
    }
    return null;
  }

  /**
   * Fetch all streams currently playing to sQuiz
   */
  async fetchSquizStreams(): Promise<string[]> {
    const streams: TwitchStream[] = [];
    let nextPage = null;

    /**
     * We need an appAccessToken to fetch data from twitch so
     * we fetch it before making any request
     */
    if (this.appAccessToken === null) {
      await this.fetchAppAccessToken();
      if (this.appAccessToken === null) {
        return [];
      }
    }

    /**
     * Twitch give a us a page of streamer, we will fetch all the pages
     */
    while ('we can fetch streams') {
      const fetchedStreams: TwitchStreams | null = await this.fetchStreams({
        gameId: 518233, //494131
        after: nextPage,
      });
      if (!fetchedStreams) break;
      streams.push(...fetchedStreams.data);
      if (fetchedStreams.pagination.cursor) {
        nextPage = fetchedStreams.pagination.cursor;
      } else {
        break;
      }
    }
    return streams.map(({ user_name }) => user_name);
  }
}

export default TwitchStreamFetcher;
