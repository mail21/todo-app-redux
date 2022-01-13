import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Header from '../Header/Header';
import ItemList from '../ItemList/ItemList';
import './Main.css';

const Main = ({ todos, api, get_data, add }) => {
  const [toggle, setToggle] = useState(false);
  const [item, setItem] = useState({});
  const getData = async () => {
    const res = await fetch(api);
    const responseJson = await res.json();
    get_data(responseJson);
  };

  useEffect(() => {
    getData();
  }, []);

  // useEffect(() => {
  //   console.log(todos);
  // }, [todos]);

  const handleChange = (e) => {
    let name = e.target.name;
    if (name === 'title') {
      setItem((prev) => ({ ...prev, title: e.target.value }));
    } else {
      setItem((prev) => ({ ...prev, description: e.target.value }));
    }
  };

  const submitNewTodo = () => {
    const date = new Date();
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Month is 0-based
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hour = String(date.getUTCHours()).padStart(2, '0');
    const minute = String(date.getUTCMinutes()).padStart(2, '0');
    const strDate = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
    add({ id: todos[todos.length - 1].id + 1, ...item, createdAt: strDate, status: 0 });
    setToggle(false);
  };

  return (
    <main>
      <Header number={todos.length} />
      <button onClick={() => setToggle((prev) => !prev)}>Add Todo</button>
      {toggle ? (
        <div className="container__add">
          <input type="text" name="title" placeholder="Title" onChange={handleChange} />
          <input
            type="text"
            name="description"
            placeholder="Description"
            onChange={handleChange}
          />
          <button onClick={submitNewTodo}>submit</button>
        </div>
      ) : (
        <></>
      )}
      <ItemList section="todos" todos={todos} />
      <ItemList section="done" todos={todos} />
    </main>
  );
};

const mapStateToProps = (stateDariRootReducer) => ({
  api: stateDariRootReducer.todoState.api,
  todos: stateDariRootReducer.todoState.todos,
});

const mapDispatch = (dispatch) => {
  return {
    get_data: (payload) => {
      dispatch({ type: 'GET_ALL_DATA', payload });
    },
    add: (payload) => {
      dispatch({ type: 'ADD_TODO', payload });
    },
  };
};

export default connect(mapStateToProps, mapDispatch)(Main);
