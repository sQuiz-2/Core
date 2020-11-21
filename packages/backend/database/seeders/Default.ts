import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import { DifficultyEnum } from '@squiz/shared';
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
        title: 'télévision',
      },
      {
        title: 'web',
      },
      {
        title: 'sports',
      },
      {
        title: 'animaux',
      },
      {
        title: 'bande dessinée',
      },
      {
        title: 'gastronomie',
      },
      {
        title: 'histoire',
      },
      {
        title: 'informatique',
      },
      {
        title: 'musique',
      },
      {
        title: 'pays du monde',
      },
      {
        title: 'archéologie',
      },
      {
        title: 'arts',
      },
      {
        title: 'cinéma',
      },
      {
        title: 'loisirs',
      },
      {
        title: 'sciences',
      },
      {
        title: 'tourisme',
      },
      {
        title: 'célébrités',
      },
      {
        title: 'culture générale', // Pretty name for the category "other"
      },
      {
        title: 'géographie',
      },
      {
        title: 'littérature',
      },
      {
        title: 'nature',
      },
      {
        title: 'vie quotidienne',
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
          themeId: 18,
          difficultyId: DifficultyEnum.Beginner,
          validated: true,
        },
        answers: [{ answer: '7' }],
      },
      {
        round: {
          question: 'Avec quel pays la Suisse partage-t-elle la plus longue frontière ?',
          themeId: 18,
          difficultyId: DifficultyEnum.Beginner,
          validated: true,
        },
        answers: [{ answer: 'France' }],
      },
      {
        round: {
          question: 'La guerre de cent ans a-t-elle duré cent années?',
          themeId: 18,
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
          themeId: 18,
          difficultyId: DifficultyEnum.Intermediate,
          validated: true,
        },
        answers: [{ answer: '1981' }],
      },
      {
        round: {
          question:
            'Quelle société de production audiovisuelle appartient à Christophe Dechavanne ?',
          themeId: 18,
          difficultyId: DifficultyEnum.Intermediate,
          validated: true,
        },
        answers: [{ answer: 'Coyote' }],
      },
      // Expert
      {
        round: {
          question: 'Quel pays africain est également connu sous le nom de Pays des Braves ?',
          themeId: 18,
          difficultyId: DifficultyEnum.Expert,
          validated: true,
        },
        answers: [{ answer: 'Djibouti' }],
      },
      {
        round: {
          question: 'Qui a incarné avec talent et panache le commissaire Valence à la télévision ?',
          themeId: 18,
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
