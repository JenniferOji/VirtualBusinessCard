import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Templates from './components/Templates';
import Professional from './templates/Professional';
import Portfolio from './components/Portfolio';

import './App.css';

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/signUp" element={<SignUp />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/templates/:id" element={<Templates />}/>
        <Route path="/templates/professional" element={<Professional />}/>
        <Route path="/templates/professional/:id" element={<Professional />}/>
        <Route path="/templates/professional/profile/:id" element={<Professional />}/>
        <Route path="/professional/portfolio/:id" element={<Portfolio />} />
      </Routes>  
    </Router>
  );
}

export default App;
