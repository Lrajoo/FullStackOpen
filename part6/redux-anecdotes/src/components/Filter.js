import React from 'react';
import { useDispatch, connect } from 'react-redux';
import { filterChange } from '../reducers/filterReducer';

const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = event => {
    dispatch(filterChange(event.target.value));
  };
  const style = {
    marginBottom: 10
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

const ConnectedFilter = connect()(Filter);
export default ConnectedFilter;
