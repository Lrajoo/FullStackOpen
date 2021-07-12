interface Results {
  numOfDays: number;
  numOfTrainingDays: number;
  originalTargetValue: any;
  calculatedAverageTime: number;
  success: boolean;
  rating: number;
  ratingExplanation: string;
}

export const exerciseCalculator = (originalTargetValue: number, dailyExerciseHours: any): Results => {
  const numOfDays = dailyExerciseHours.length;
  const numOfTrainingDays = dailyExerciseHours.filter((day: any) => day > 0).length;
  const calculatedAverageTime = dailyExerciseHours.reduce((a: any, b: any) => a + b, 0) / numOfDays;

  const success = calculatedAverageTime >= originalTargetValue ? true : false;

  let rating;
  let ratingExplanation;

  if (calculatedAverageTime < originalTargetValue) {
    rating = 1;
    ratingExplanation = 'not too bad but could be better';
  } else if (calculatedAverageTime === originalTargetValue) {
    rating = 2;
    ratingExplanation = 'good';
  } else {
    rating = 3;
    ratingExplanation = 'very good';
  }
  return {
    numOfDays,
    numOfTrainingDays,
    originalTargetValue,
    calculatedAverageTime,
    success,
    rating,
    ratingExplanation
  };
};

interface ExerciseValues {
  target: number;
  dailyExerciseHours: number[];
}

export const parseExerciseArguments = (target: number, dailyExercises: number[]): ExerciseValues => {
  if (!isNaN(target) && !dailyExercises.some(isNaN)) {
    return {
      target: target,
      dailyExerciseHours: dailyExercises
    };
  } else {
    throw new Error('Values given are not numbers!');
  }
};
