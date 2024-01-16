import React from 'react';
import './App.css'
import { ChipsComponent } from './components/ChipsComponent'
import { UsersData } from './constants/users';

function App() {
  return (
    <div className='main'>
      <ChipsComponent options={UsersData}/>
    </div>
  )
}

export default App;
