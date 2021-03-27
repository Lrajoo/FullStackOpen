const Total = props => {
  let totalExercises = 0;
  props.parts.map(part => {
    totalExercises += part.exercises;
  });
  return <p>Number of exercises {totalExercises}</p>;
};

export default Total;
