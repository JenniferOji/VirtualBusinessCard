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

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        {/* credentials page */}
        <Route path="/signUp" element={<SignUp />}/>
        <Route path="/login" element={<Login />}/>

        {/* templates page - dynamic, professional, creative, minimalist*/}
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
    </Router>
  );
}

export default App;
