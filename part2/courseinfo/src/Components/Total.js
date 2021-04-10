const Total = props => {
  const reducer = (sum, val) => sum + val.exercises;
  return <p style={{ fontWeight: 'bold' }}>total of {props.parts.reduce(reducer, 0)} exercises</p>;
};

export default Total;
