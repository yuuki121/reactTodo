import React, { useState } from "react";
import "./styles.css";
import {InputTodo} from './components/InputTodo';
import {IncompleteTodos} from './components/IncompleteTodos';
import {CompleteTodos} from './components/CompleteTodos';

export const App = () => {
  const [todoText, settodoText] = useState("");
  const [incompleteTodos, setImcompleteTodos] = useState([]);
  const [completeTodos, setcompleteTodos] = useState([]);
  const onChangetext = (event) => settodoText(event.target.value);

  const onClickAdd = () => {
    if (todoText === "") return;
    const newTodos = [...incompleteTodos, todoText];
    setImcompleteTodos(newTodos);
    settodoText("");
  };

  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1);
    setImcompleteTodos(newTodos);
  };
  const onClickComplete = (index) => {
    const newincompleteTodos = [...incompleteTodos];
    newincompleteTodos.splice(index, 1);

    const newcompleteTodos = [...completeTodos, incompleteTodos[index]];
    setImcompleteTodos(newincompleteTodos);
    setcompleteTodos(newcompleteTodos);
  };

  const onClickBack = (index) => {
    const newcompleteTodos = [...completeTodos];
    newcompleteTodos.splice(index, 1);

    const newincompleteTodos = [...incompleteTodos, completeTodos[index]];
    setImcompleteTodos(newincompleteTodos);
    setcompleteTodos(newcompleteTodos);
  };

  return (
    <>
     <InputTodo todoText = {todoText} onChange = {onChangetext} onClick = {onClickAdd} disabled = {incompleteTodos.length >= 5}/>
     {incompleteTodos.length >= 5 && <p style = {{color:'red'}}>５個以上登録できません</p>}
     <IncompleteTodos todos = {incompleteTodos} onClickComplete = {onClickComplete} onClickDelete = {onClickDelete} />
     <CompleteTodos todos = {completeTodos} onClickBack = {onClickBack} />
    </>
  );
};
