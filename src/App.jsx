import { useState } from 'react';
import './App.css';
import List from './Employees list/List';
import CreateandUpdate from './CRUD/CreateandUpdate';
import { BrowserRouter, Route ,Routes} from 'react-router-dom';


function App() {
  return (
    <>
     <BrowserRouter>
      <Routes>
       <Route path='/' element={ <List />}/>
       <Route path='/Add-employee' element={ <CreateandUpdate/>}/>
      </Routes>
       </BrowserRouter> 
     
    </>
  );
}

export default App;