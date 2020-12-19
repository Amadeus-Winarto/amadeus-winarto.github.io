import Main from './components/MainComponent'
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';


function App() {
  return (
    <Router>
    <div>
      <Main />
    </div>
    </Router>
  );
}

export default App;
