import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import User from 'App/Models/User';

export default class UserSeeder extends BaseSeeder {
  public async run() {
    const users = await User.all();
    // Run it only if it's the first user
    if (users.length < 1) {
      await User.create({
        email: 'admin@admin.fr',
        password: 'secret',
      });
    }
  }
}
