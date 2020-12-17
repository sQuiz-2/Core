import BaseSchema from '@ioc:Adonis/Lucid/Schema';
import { ProviderEnum } from '@squiz/shared';

export default class Users extends BaseSchema {
  protected tableName = 'users';

  public async up() {
    this.schema.table(this.tableName, (table) => {
      // Provider used for connection
      table.integer('provider_id').unsigned().defaultTo(ProviderEnum.Twitch);
      table.string('provider_user_id');
      table.string('email').nullable().alter();
      table.dropUnique(['email']);
    });
  }

  public async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('provider_id');
      table.dropColumn('provider_user_id');
      table.string('email').notNullable().unique().alter();
    });
  }
}
