declare module '@ioc:Adonis/Core/Validator' {
  import { Rule } from '@ioc:Adonis/Core/Validator';

  export interface Rules {
    enumNumber<Options extends AllowedEnumOptions>(options: Options): Rule;
    keyOf(options: object): Rule;
  }
}
