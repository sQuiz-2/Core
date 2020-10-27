import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import { DifficultyEnum } from 'App/Enums/Difficulty';
import Game from 'App/Models/Game';
import Round from 'App/Models/Round';
import Theme from 'App/Models/Theme';

export default class DefaultSeeder extends BaseSeeder {
  public async run() {
    await this.Themes();
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

  public async Games() {
    const uniqueKey = 'title';
    await Game.updateOrCreateMany(uniqueKey, [
      {
        title: 'Culture générale',
        difficultyId: DifficultyEnum.Beginner, // Initié
        available: true,
      },
      {
        title: 'Culture générale',
        difficultyId: DifficultyEnum.Intermediate, // Confirmé
        available: true,
      },
      {
        title: 'Culture générale',
        difficultyId: DifficultyEnum.Expert, // Expert
        available: true,
      },
    ]);
  }

  public async Rounds() {
    const rounds = [
      // Initié
      {
        round: {
          question: 'Combien y a-t-il de mois de 31 jours dans une année ?',
          themeId: 1,
          difficultyId: DifficultyEnum.Beginner,
          validated: true,
        },
        answers: [{ answer: '7' }],
      },
      {
        round: {
          question: 'Avec quel pays la Suisse partage-t-elle la plus longue frontière ?',
          themeId: 1,
          difficultyId: DifficultyEnum.Beginner,
          validated: true,
        },
        answers: [{ answer: 'France', prefix: 'La' }],
      },
      {
        round: {
          question: 'La guerre de cent ans a-t-elle duré cent années?',
          themeId: 1,
          difficultyId: 1,
          validated: true,
          maxNumberOfGuesses: 1,
        },
        answers: [{ answer: 'Non' }, { answer: 'No' }],
      },
      // Confirmé
      {
        round: {
          question:
            'En quelle année le premier prototype de la 205 est-il sorti des ateliers Peugeot ?',
          themeId: 1,
          difficultyId: DifficultyEnum.Intermediate,
          validated: true,
        },
        answers: [{ answer: '1981', prefix: 'En' }],
      },
      {
        round: {
          question:
            'Quelle société de production audiovisuelle appartient à Christophe Dechavanne ?',
          themeId: 1,
          difficultyId: DifficultyEnum.Intermediate,
          validated: true,
        },
        answers: [{ answer: 'Coyote' }],
      },
      // Expert
      {
        round: {
          question: 'Quel pays africain est également connu sous le nom de Pays des Braves ?',
          themeId: 1,
          difficultyId: DifficultyEnum.Expert,
          validated: true,
        },
        answers: [{ answer: 'Djibouti' }],
      },
      {
        round: {
          question: 'Qui a incarné avec talent et panache le commissaire Valence à la télévision ?',
          themeId: 1,
          difficultyId: DifficultyEnum.Expert,
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
