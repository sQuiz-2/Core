import React from 'react';

import { QuizConainer } from '../GameContainer';
import QuizSound from '../GameSound/QuizSound';
import Timer from '../Timer';

export default function Quiz() {
  return (
    <>
      <Timer />
      <QuizConainer />
      <QuizSound />
    </>
  );
}
