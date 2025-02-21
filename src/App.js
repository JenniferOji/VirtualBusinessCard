import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Profile from './components/Profile';
import SignUp from './components/SignUp';
import LogIn from './components/LogIn';
import Navigation from './components/Navigation';
import './App.css';

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/signUp" element={<SignUp />}/>
        <Route path="/logIn" element={<LogIn />}/>
        <Route path="/Profile/:id" element={<Profile />}/>

      </Routes>  
    </Router>
  );
}

export default App;
