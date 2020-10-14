import Game from 'squiz-api/app/Models/Game';
import Round from 'squiz-api/app/Models/Round';

import request from './axiosWrap';

export async function getGames(): Promise<Game[]> {
  return request({
    url: `/games`,
    method: 'GET',
  });
}

export async function getRandomRounds(difficulties: number[]): Promise<Round[]> {
  return request({
    url: `/rounds/random`,
    method: 'POST',
    data: {
      difficulties,
    },
  });
}
