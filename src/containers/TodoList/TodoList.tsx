import { useEffect, useMemo, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Todo from '../../components/Todo/Todo';
import TodoDetail from '../../components/TodoDetail/TodoDetail';
import './TodoList.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchTodos,
  selectTodo,
  deleteTodo,
  toggleDone,
  todoActions,
} from '../../store/slices/todo';
import axios from 'axios';
import { AppDispatch } from '../../store';

interface IProps {
  title: string;
}

type TodoType = { id: number; title: string; content: string; done: boolean };

export default function TodoList(props: IProps) {
  const { title } = props;
  const todoState = useSelector(selectTodo);
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('/api/todo/')
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  });

  useEffect(() => {
    axios
      .get('/api/todoerror')
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  });

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  const clickTodoHandler = (td: TodoType) => {
    navigate('/todos/' + td.id);
  };

  return (
    <div className="TodoList">
      <div className="title">{title}</div>
      <div className="todos">
        {todoState.todos.map((td) => {
          return (
            <Todo
              key={`${td.id}_todo`}
              title={td.title}
              done={td.done}
              clickDetail={() => clickTodoHandler(td)}
              clickDone={() => {
                dispatch(toggleDone(td.id));
              }}
              clickDelete={() => dispatch(deleteTodo(td.id))}
            />
          );
        })}
        {/* {todoDetail} */}
        <NavLink to="/new-todo">New Todo</NavLink>
      </div>
    </div>
  );
}