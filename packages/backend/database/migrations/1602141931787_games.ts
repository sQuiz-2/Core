import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class Games extends BaseSchema {
  protected tableName = 'games';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.string('title', 80).notNullable();
      table.integer('difficulty_id').unsigned();
      table.foreign('difficulty_id').references('difficulties.id').onDelete('CASCADE');
      table.boolean('available').notNullable().defaultTo(false);
      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
