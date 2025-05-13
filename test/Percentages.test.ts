import { getPercent, getGlobalPercent } from "@/utils/percentages";
import { test, expect, it, describe } from "vitest";
import Questions from '@/constants/Questions.json'

test('calculate global percent correctly', () => {
  const totalQuestions = Object.values(Questions[0].quiz).reduce((acc, questions) => acc + questions.length, 0);
  
  const fakeProgress = {
    html: { hasAnswered: new Array(10).fill(true) },
    css: { hasAnswered: new Array(2).fill(true) },
  };

  const percent = getGlobalPercent(fakeProgress);
  const expected = Math.floor((12 / totalQuestions) * 100);
  
  expect(percent).toBe(expected)
});

describe('calculate individual percent correctly', () => {
  it('returns null if quiz is undefined', () => {
    expect(getPercent(undefined)).toBeNull();
  });
  
   it('returns 100 if all answered', () => {
    const quiz = { hasAnswered: [true, true, true], currentIndex: 3, selectedOptions: [] };
    expect(getPercent(quiz)).toBe(100);
  });

  it('calculates percent if not complete', () => {
    const quiz = { hasAnswered: [true, null, null], currentIndex: 1, selectedOptions: [] };
    expect(getPercent(quiz)).toBe(33);
  });

});