const Statistic = props => {
  return <>{props.label === 'Positive' ? `${props.operation}%` : props.operation}</>;
};

export default Statistic;
