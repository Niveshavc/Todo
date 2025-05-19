import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Todo from './TodoList/Todo'
import { Provider } from 'react-redux'
import store from './TodoList/store'


const App = () => {
  return (
    <>
    <Provider store={store}>
    <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<Todo></Todo>}/>
          
        </Routes>
      </BrowserRouter>
    </Provider>
      
    </>
  )
}

export default App
