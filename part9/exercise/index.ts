import express from 'express';
import bodyParser from 'body-parser';
import { parseBmiArgs, calculateBMI } from './bmiCalculator';
import { parseExerciseArguments, exerciseCalculator } from './exerciseCalculator';

const app = express();
app.use(bodyParser.json());

app.get('/', (req: any, res: any) => {
  console.log(req);
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req: any, res: any) => {
  const parsedWeight = req.query.weight;
  const parsedHeight = req.query.height;

  if (!parsedWeight || !parsedHeight) {
    res.status(400);
    res.send({ error: 'missing parameter height or weight' });
  } else {
    try {
      const { height, weight } = parseBmiArgs(Number(parsedHeight), Number(parsedWeight));
      const bmi = calculateBMI(height, weight);
      res.send({
        weight: weight,
        height: height,
        bmi: bmi
      });
    } catch (e) {
      res.status(400);
      res.send({ error: e.message });
    }
  }
});

app.post('/exercises', (req, res) => {
  const dailyExercises = req.body.daily_exercises;
  const dailyTarget = req.body.target;

  if (!dailyExercises || !dailyTarget) {
    res.status(400);
    res.send({ error: 'missing parameter daily_exercises or target' });
  } else {
    try {
      const { target, dailyExerciseHours } = parseExerciseArguments(dailyTarget, dailyExercises);
      res.send(exerciseCalculator(target, dailyExerciseHours));
    } catch (e) {
      res.status(400);
      res.send({ error: e.message });
    }
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
