import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Signup from './components/Signup'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Footer from './components/Footer'
import PrivacyPolicy from './components/PrivacyPolicy'
import TermsOfService from './components/TermsOfService'
import CookiePolicy from './components/CookiePolicy'
import Guidelines from './components/Guidelines'
import './index.css'

function App() {
  const [view, setView] = useState('home');
  const [user, setUser] = useState(null);

  const onLoginSuccess = (userData) => {
    console.log('Login Success:', userData);
    setUser(userData);
    setView('dashboard');
  };

  return (
    <>
      {view === 'dashboard' && user ? (
        <Dashboard user={user} onLogout={() => { setUser(null); setView('home'); }} />
      ) : (
        <>
          <Navbar setView={setView} />
          {view === 'home' && <Hero setView={setView} />}
          {view === 'signup' && <Signup onLoginSuccess={onLoginSuccess} />}
          {view === 'login' && <Login onLoginSuccess={onLoginSuccess} />}
          {view === 'privacy' && <PrivacyPolicy />}
          {view === 'terms' && <TermsOfService />}
          {view === 'cookies' && <CookiePolicy />}
          {view === 'guidelines' && <Guidelines />}
          <Footer setView={setView} />
        </>
      )}
    </>
  )
}

export default App
