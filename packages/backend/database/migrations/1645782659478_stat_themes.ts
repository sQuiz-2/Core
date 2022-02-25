import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class StatThemes extends BaseSchema {
  protected tableName = 'stat_themes';

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
      table.integer('theme_id').unsigned().references('id').inTable('themes').onDelete('CASCADE');
      table.integer('played').defaultTo(0);
      table.integer('correct').defaultTo(0);
      table.unique(['user_id', 'theme_id']);

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true });
      table.timestamp('updated_at', { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
