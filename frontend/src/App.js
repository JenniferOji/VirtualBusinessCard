import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import SignUp from './components/SignUp';
import './App.css';

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
      <Route path="/signUp" element={<SignUp />}/>
      </Routes>  
    </Router>
  );
}

export default App;
