import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Templates from './components/Templates';
import Professional from './templates/Professional';
import Dynamic from './templates/Dynamic';
import './App.css';
import DynamicPortfolio from './Portfolio/DynamicPortfolio';
import ProfessionalPreview from './Previews/ProfessionalPreview';
import QrCodeGenerator from './components/QrCodeGenerator';
import ProfessionalPortfolio from './Portfolio/ProfessionalPortfolio';
import Footer from './components/Footer.js';
import Home from './components/Pages/Home.js';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navigation />
        <div className="main-content">
          <Routes>
            {/* Home page  */}
            <Route path="/" element={<Home />}/>
            {/* credentials page */}
            <Route path="/signUp" element={<SignUp />}/>
            <Route path="/login" element={<Login />}/>

            {/* templates page - dynamic, professional, creative, minimalist */}
            <Route path="/templates/:id" element={<Templates />}/>

            {/* specific templates */}
            <Route path="/templates/professional/:id" element={<Professional />}/>
            <Route path="/templates/dynamic/:id" element={<Dynamic />}/>

            {/* 'type' holding the kind of portfolio - dynamic, professional, creative, minimalist */}
            <Route path="/:type/portfolio/qrCode/:id" element={<QrCodeGenerator />} />

            {/* portfolio previews  */}
            <Route path="/professional/portfolio/preview/:id" element={<ProfessionalPreview />} />

            {/* portfolios from qr code scan  */}
            <Route path="/professional/portfolio/:id" element={<ProfessionalPortfolio />} />
            <Route path="/dynamic/portfolio/:id" element={<DynamicPortfolio />} />
          </Routes>  
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;