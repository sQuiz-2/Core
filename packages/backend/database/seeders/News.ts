import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import Theme from 'App/Models/News';

export default class DefaultSeeder extends BaseSeeder {
  public async run() {
    const uniqueKey = 'content';
    await Theme.updateOrCreateMany(uniqueKey, [
      {
        content:
          "En plus de Twitch, vous pouvez désormais vous connecter via Twitter et Google. Il est d'ailleurs possible de lier plusieurs services sur un même compte via le profil. Les invités ne pourront plus jouer plus que 5 parties publiques. Ils ne pourront plus voter aux sondages, réagir aux actualités et rejoindre des parties privées. Les classements font leur apparition (en bêta : on attend vos retours).",
      },
      {
        content:
          'Un quiz (prononcé « kiz » ou « kouïz ») est un jeu qui consiste en un questionnaire permettant de tester des connaissances générales ou spécifiques ou des compétences.',
      },
    ]);
  }
}
