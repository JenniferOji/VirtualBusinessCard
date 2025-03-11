import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import SignUp from './components/SignUp';
import Login from './components/Login';
import './App.css';

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/signUp" element={<SignUp />}/>
        <Route path="/login" element={<Login />}/>
      </Routes>  
    </Router>
  );
}

export default App;
