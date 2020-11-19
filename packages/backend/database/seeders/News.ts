import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import Theme from 'App/Models/News';

export default class DefaultSeeder extends BaseSeeder {
  public async run() {
    const uniqueKey = 'content';
    await Theme.updateOrCreateMany(uniqueKey, [
      {
        content:
          "Bienvenue sur la pre-Alpha de sQuiz, nous travaillons depuis quelques semaines sur ce projet. Le but de cette version est de trouver les bugs avant la sortie de l'Alpha. Les fonctionnalités telles que les avatars, l'expérience, les statistiques seront ajoutées dans des versions futures, nous tenons à avoir un jeu de base stable avant d'y ajouter de nouvelles fonctionnalités.",
      },
    ]);
  }
}
