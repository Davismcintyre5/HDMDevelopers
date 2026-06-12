import React from 'react';
import { HdmProvider } from './context/HdmContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import AiWidget from './components/ai/AiWidget';

const App = () => (
  <HdmProvider>
    <div className="min-h-screen bg-white">
      <Header />
      <HomePage />
      <Footer />
      <AiWidget />
    </div>
  </HdmProvider>
);

export default App;