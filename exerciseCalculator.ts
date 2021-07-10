interface input {
  target: number;
  dailyExerciseHours: Array<number>;
}

const parseArgs = (args: Array<string>): input => {
  if (args.length < 4) throw new Error("Not enough arguments");
  const dailyExerciseHours = [];

  for (let i = 2; i < args.length; i++) {
    if (isNaN(Number(args[i]))) {
      throw new Error("Provided values were not numbers!");
    }
    if (i >= 3) {
      dailyExerciseHours.push(Number(args[i]));
    }
  }

  return {
    target: Number(args[2]),
    dailyExerciseHours,
  };
};

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

try {
  const { dailyExerciseHours, target } = parseArgs(process.argv);
  console.log(calculateExercises(dailyExerciseHours, target));
} catch (e) {
  console.log("Error, something bad happened, message: ", e.message);
}
