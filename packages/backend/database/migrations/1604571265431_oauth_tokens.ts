import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class OauthTokens extends BaseSchema {
  protected tableName = 'oauth_tokens';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
      table.integer('provider_id').unsigned().notNullable();
      /*
        We don't set a maximum size for tokens, read more about it here
        https://stackoverflow.com/questions/4408945/what-is-the-length-of-the-access-token-in-facebook-oauth2
      */
      table.string('token').notNullable();
      table.string('refresh_token').notNullable();
      table.string('provider_user_id');
      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
