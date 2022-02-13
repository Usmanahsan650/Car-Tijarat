import {BrowserRouter} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { Main } from './components/MainComponent';
import './App.css';

function App() {
  return (
    <BrowserRouter>
    <Main/>
    </BrowserRouter>
    
  );
}

export default App;
