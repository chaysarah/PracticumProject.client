import './App.css';
import MyRouter from './router';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter> 
      <MyRouter/>
      </BrowserRouter>
    </div>
  );
}

export default App;
