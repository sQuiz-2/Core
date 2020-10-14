import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import Difficulty from 'App/Models/Difficulty';
import Game from 'App/Models/Game';
import Round from 'App/Models/Round';
import Theme from 'App/Models/Theme';

export default class DefaultSeeder extends BaseSeeder {
  public async run() {
    await this.Themes();
    await this.Difficulties();
    await this.Games();
    await this.Rounds();
  }

  public async Themes() {
    const uniqueKey = 'title';
    await Theme.updateOrCreateMany(uniqueKey, [
      {
        title: 'culture générale', // Kind of category 'other'
      },
      {
        title: 'littérature',
      },
      {
        title: 'mathématiques',
      },
      {
        title: 'histoire',
      },
      {
        title: 'cinéma',
      },
    ]);
  }

  public async Difficulties() {
    const uniqueKey = 'title';
    await Difficulty.updateOrCreateMany(uniqueKey, [
      {
        title: 'initié',
        level: 1,
      },
      {
        title: 'confirmé',
        level: 2,
      },
      {
        title: 'expert',
        level: 3,
      },
    ]);
  }

  public async Games() {
    const uniqueKey = 'title';
    await Game.updateOrCreateMany(uniqueKey, [
      {
        title: 'Culture générale',
        difficultyId: 1, // Initié
        available: true,
      },
      {
        title: 'Culture générale',
        difficultyId: 2, // Confirmé
        available: true,
      },
      {
        title: 'Culture générale',
        difficultyId: 3, // Expert
        available: true,
      },
    ]);
  }

  public async Rounds() {
    const rounds = [
      // Initié
      {
        round: {
          data: 'Combien y a-t-il de mois de 31 jours dans une année ?',
          themeId: 1,
          difficultyId: 1,
          validated: true,
        },
        answers: [{ answer: '7' }],
      },
      {
        round: {
          data: 'Avec quel pays la Suisse partage-t-elle la plus longue frontière ?',
          themeId: 1,
          difficultyId: 1,
          validated: true,
        },
        answers: [{ answer: 'France', prefix: 'La' }],
      },
      // Confirmé
      {
        round: {
          data:
            'En quelle année le premier prototype de la 205 est-il sorti des ateliers Peugeot ?',
          themeId: 1,
          difficultyId: 2,
          validated: true,
        },
        answers: [{ answer: '1981', prefix: 'En' }],
      },
      {
        round: {
          data: 'Quelle société de production audiovisuelle appartient à Christophe Dechavanne ?',
          themeId: 1,
          difficultyId: 2,
          validated: true,
        },
        answers: [{ answer: 'Coyote' }],
      },
      // Expert
      {
        round: {
          data: 'Quel pays africain est également connu sous le nom de Pays des Braves ?',
          themeId: 1,
          difficultyId: 3,
          validated: true,
        },
        answers: [{ answer: 'Djibouti' }],
      },
      {
        round: {
          data: 'Qui a incarné avec talent et panache le commissaire Valence à la télévision ?',
          themeId: 1,
          difficultyId: 3,
          validated: true,
        },
        answers: [{ answer: 'Bernard Tapie' }, { answer: 'Tapie' }],
      },
    ];
    for (const i of rounds) {
      const round = await Round.create(i.round);
      await round.related('answers').createMany(i.answers);
    }
  }
}
