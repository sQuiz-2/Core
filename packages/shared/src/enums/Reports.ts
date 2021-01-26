export enum Report {
  Question = 'question',
  Answer = 'answer',
  Category = 'category',
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
];
