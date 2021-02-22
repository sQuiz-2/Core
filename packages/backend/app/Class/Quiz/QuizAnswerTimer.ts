class QuizAnswerTimer {
  startTimer: number = 0;

  reset() {
    this.startTimer = Date.now();
  }

  getElapsedTime() {
    return Date.now() - this.startTimer;
  }
}

export default QuizAnswerTimer;
