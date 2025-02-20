import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Profile from './components/Profile';
import SignUp from './components/SignUp';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/signUp" element={<SignUp />}/>
      </Routes>  
      <SignUp></SignUp>   
    </Router>
  );
}

export default App;
