import { combineReducers } from 'redux';
import { TodosTypes } from './types';

const initialState = {
  todos: [],
  api: 'https://virtserver.swaggerhub.com/hanabyan/todo/1.0.0/to-do-list',
};

const todoState = (state = initialState, action) => {
  switch (action.type) {
    case TodosTypes.ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case TodosTypes.EDIT_TODO:
      return {
        ...state,
        todos: state.todos.map((item) => {
          if (item.id === action.payload.id) {
            return action.payload;
          }
          return item;
        }),
      };
    case TodosTypes.DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((item) => item.id !== action.payload),
      };
    case TodosTypes.GET_ALL_DATA:
      return {
        ...state,
        todos: action.payload,
      };
    case TodosTypes.TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map((item) => {
          if (item.id === action.payload.id) {
            if (action.payload.status === 1) {
              return { ...item, status: 0 };
            }
            return { ...item, status: 1 };
          }
          return item;
        }),
      };
    default:
      return state;
  }
};

export default combineReducers({
  todoState,
});
