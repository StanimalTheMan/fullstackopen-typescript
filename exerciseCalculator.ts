interface ResultObject {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  dailyExerciseHours: Array<number>,
  target: number
): ResultObject => {
  let sum = 0;
  let trainingDays = 0;
  for (const num of dailyExerciseHours) {
    if (num !== 0) {
      trainingDays++;
    }
    sum += num;
  }
  let average = sum / dailyExerciseHours.length;
  return {
    periodLength: dailyExerciseHours.length,
    trainingDays,
    success: average >= target,
    rating: average >= target ? 3 : average !== 0 ? 2 : 1,
    ratingDescription:
      average >= target
        ? "good"
        : average !== 0
        ? "not too bad but could be better"
        : "bad",
    target,
    average,
  };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
