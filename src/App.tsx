import React, { useCallback, useReducer, useRef } from 'react';

import './App.css';

interface Todo{
  id:number,
  text:string,
}

type ActionType = {type:"ADD", text:string} | {type:"REMOVE", id:number}



function App() {
  function reducer(state:Todo[], action:ActionType){
    switch(action.type){
      case "ADD":
        return [
          ...state,
          {
            id:state.length,
            text:action.text,
          }
        ];

        case "REMOVE":
          return state.filter(({id})=> id !== action.id)
    }

  }



  const [todos, dispatch]  = useReducer(reducer,[]);

  const newTodoRef = useRef<HTMLInputElement>(null);

  const onAdd= useCallback(()=>{
    if(newTodoRef.current){
      dispatch({
        type:"ADD",
        text:newTodoRef.current.value,
      })
      newTodoRef.current.value=''
    }
  }, [])
  return (
    <div className="App app-design style">
      <h1 className='todo-header'>TODO Application</h1>
     <input type="text" ref={newTodoRef}/>
     <button className='adds' onClick={onAdd}>ADD</button>
     {todos.map((todo)=> (
       <div className='texts' key={todo.id}>  {todo.text}
       <button className='buttons' onClick={()=>dispatch({type:"REMOVE", id: todo.id})}>Remove
       </button>
       </div>
      
     ))}
    
    </div>
  );
}

export default App;
