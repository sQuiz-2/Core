import got from 'got';

const API_SECRET = process.env.API_SECRET;

export async function applyBadge(rewardId: string, userId: string, streamerId: string) {
  try {
    await got
      .post('https://back.squiz.gg/badges/twitch-reward', {
        json: {
          userId,
          rewardId,
          streamerId,
        },
        headers: {
          Authorization: 'Bearer ' + API_SECRET,
        },
      })
      .json();
  } catch (error) {
    console.log(JSON.stringify(error));
  }
}
