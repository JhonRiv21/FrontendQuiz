export const feedback = {
  high: "Excellent! You're an accessibility hero! 💪 Your knowledge is spot-on.",
  mid: "Great job! You're on the right track. A bit more polish and you'll master accessibility.",
  low: "Good effort! Accessibility can be tricky — keep learning and try again.",
};

export const getFeedback = (puntuation: number) => {
  if (puntuation <= 5) return feedback.low;
  if (puntuation <= 8) return feedback.mid;
  return feedback.high
}