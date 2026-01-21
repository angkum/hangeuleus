import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import { Navbar, Footer } from './components/Layout';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Reservation from './pages/Reservation';
import About from './pages/About';
import Location from './pages/Location';
import Admin from './pages/Admin';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Wrapper to handle layout logic
const AppContent = () => {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-950 text-gray-100 font-sans selection:bg-yellow-900 selection:text-white">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/location" element={<Location />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>
  );
}

export default App;