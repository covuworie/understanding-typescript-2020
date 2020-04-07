import React from 'react';

import TodoList from './components/TodoList';
import NewTodo from './components/NewTodo';

function App() {
  const todos = [{ id: "t1", text: "Finish the course" }];
  return <div className="App">
    <NewTodo />
    <TodoList items={todos} />
  </div>;
}

export default App;
