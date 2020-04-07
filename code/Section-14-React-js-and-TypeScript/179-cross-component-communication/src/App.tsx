import React from 'react';

import TodoList from './components/TodoList';
import NewTodo from './components/NewTodo';

function App() {
  const todos = [{ id: "t1", text: "Finish the course" }];

  const todoAddHandler = (text: string) => {
    console.log(text);
  };

  return (
    <div className="App">
      <NewTodo onAddTodo={todoAddHandler} />
      <TodoList items={todos} />
    </div>
  );
}

export default App;
