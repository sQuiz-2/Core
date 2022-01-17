import got from 'got';

const TOKEN = process.env.TOKEN;

exports.scheduledSortRoundsHandler = async () => {
  try {
    await got('https://backend.squiz.gg/rounds-sort', {
      headers: {
        Authorization: 'Bearer ' + TOKEN,
      },
      responseType: 'json',
    });
  } catch (error) {
    console.error(error.response.body);
  }
};
