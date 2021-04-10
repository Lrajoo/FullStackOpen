import Part from './Part';

const Content = props => {
  return props.parts.map(c => <Part key={c.id} name={c.name} exercises={c.exercises} />);
};

export default Content;
