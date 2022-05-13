import {BrowserRouter} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datetime/css/react-datetime.css";
import 'bootstrap/dist/js/bootstrap.min.js';
import { Main } from './components/MainComponent';
import './App.css';
import { Splash } from './components/splash';
import { useState } from 'react';

function App() {
  const [splash,setSplash]=useState("true")
  setTimeout(()=>setSplash(false),3000)
  return (
    <BrowserRouter>
    {
      splash?
      <Splash/>
      :
    <Main/>
    }
    
    </BrowserRouter>
    
  );
}

export default App;
