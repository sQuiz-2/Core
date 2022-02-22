import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class ChallengeUsers extends BaseSchema {
  protected tableName = 'challenge_user';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
      table
        .integer('challenge_id')
        .unsigned()
        .references('id')
        .inTable('challenges')
        .onDelete('CASCADE');
      table.unique(['user_id', 'challenge_id']);
      table.timestamp('created_at', { useTz: true });
      table.timestamp('updated_at', { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
