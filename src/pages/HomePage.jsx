import React from 'react';
import Hero from '../components/sections/Hero';
import Services from '../components/sections/Services';
import Apps from '../components/sections/Apps';
import Projects from '../components/sections/Projects';
import Gallery from '../components/sections/Gallery';
import Contact from '../components/sections/Contact';

const HomePage = () => (
  <>
    <Hero />
    <Services />
    <Apps />
    <Projects />
    <Gallery />
    <Contact />
  </>
);

export default HomePage;