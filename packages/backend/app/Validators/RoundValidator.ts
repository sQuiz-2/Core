import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema, rules } from '@ioc:Adonis/Core/Validator';
import { DifficultyEnum } from '@squiz/shared';

export default class RoundValidator {
  constructor(private ctx: HttpContextContract) {}

  public schema = schema.create({
    question: schema.string({ trim: true }, [rules.maxLength(500)]),
    answers: schema.array([rules.distinct('answer')]).members(
      schema.object().members({
        answer: schema.string({ trim: true }, [rules.maxLength(80)]),
      }),
    ),
    themeId: schema.number([rules.exists({ table: 'themes', column: 'id' })]),
    difficultyId: schema.number([rules.enumNumber(Object.values(DifficultyEnum))]),
    maxNumberOfGuesses: schema.number.optional([rules.range(1, 4)]),
  });

  public cacheKey = this.ctx.routeKey;

  public messages = {
    'question.required': 'Question manquante',
    'question.maxLength': 'La reponse ne doit pas faire plus de {{ options.maxLength }} caractères',
    'answers.required': 'Réponse manquante',
    'answers.maxLength': 'La reponse ne doit pas faire plus de {{ options.maxLength }} caractères',
    'answers.distinct': 'Les réponses doivent être différentes',
    'answers.*.answer.required': 'Un champ réponse ne peut pas être vide',
    'answers.*.answer.maxLength':
      'Les réponse ne peuvent pas faire plus de {{ options.maxLength }} caractères',
    'themeId.required': 'Thème manquant',
    'themeId.exists': "Le thème sélectionné n'existe pas 🤔",
    'difficultyId.required': 'Difficulté manquante',
    'difficultyId.enumNumber': "La difficulté sélectionnée n'existe pas 🤔",
    'difficultyId.number': 'Ce paramètre doit être un nombre',
    'maxNumberOfGuesses.number': "Le nombre d'essais doit être un nombre",
    'maxNumberOfGuesses.range': "Le nombre d'essais doit être compris entre 1 et 4",
  };
}
