export enum Report {
  Question = 'question',
  Answer = 'answer',
  Category = 'category',
  Actualize = 'actualize',
}

export const ReportDetail = [
  {
    type: Report.Question,
    detail: 'Le texte de la question est incorrect',
  },
  {
    type: Report.Answer,
    detail: 'Ma réponse aurait dû être acceptée',
  },
  {
    type: Report.Category,
    detail: 'La catégorie est incorrecte',
  },
  {
    type: Report.Actualize,
    detail: 'La question doit être actualisée',
  },
];
