import React from 'react';
import { connect } from 'react-redux';
import './Item.css';

function Item({ id, title, status, onClick, todoToggle }) {
  const handleToggle = () => {
    todoToggle({ id, status });
  };

  return (
    <div className="container__item">
      <div onClick={onClick}>
        <b>{title}</b>
      </div>
      <button onClick={handleToggle}>{status ? 'X' : 'O'}</button>
    </div>
  );
}

const mapDispatch = (dispatch) => {
  return {
    todoToggle: (payload) => {
      dispatch({ type: 'TOGGLE_TODO', payload });
    },
  };
};

export default connect(null, mapDispatch)(Item);
