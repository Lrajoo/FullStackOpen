import React, { useState } from 'react';
import Statistics from './Components/Statistics';
import Button from './Components/Button';
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const increaseGood = () => setGood(good + 1);
  const increaseNeutral = () => setNeutral(neutral + 1);
  const increaseBad = () => setBad(bad + 1);
  const totalFeedback = () => good + bad + neutral;
  const average = () => (good + bad + neutral) / 3;
  const percentagePositiveFeedback = () => (good / (good + bad + neutral)) * 100;
  return (
    <div>
      <h1>Give Feeback</h1>
      <Button label="good" increase={increaseGood} />
      <Button label="neutral" increase={increaseNeutral} />
      <Button label="bad" increase={increaseBad} />
      <h1>Statistics</h1>
      {good + neutral + bad > 0 ? (
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          increaseGood={increaseGood}
          increaseNeutral={increaseNeutral}
          increaseBad={increaseBad}
          totalFeedback={totalFeedback}
          average={average}
          percentagePositiveFeedback={percentagePositiveFeedback}
        />
      ) : (
        'No feedback given'
      )}
    </div>
  );
};

export default App;
