const Button = props => {
  return <button onClick={props.increase}>{props.label}</button>;
};

export default Button;
