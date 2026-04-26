import React, { Suspense, lazy } from 'react';
import { BrowserRouter } from "react-router-dom";
import { About, Contact, Experience, Connect, Hero, Navbar, Works } from './components';

const StarsCanvas = lazy(() => import("./components/canvas/Stars"));


const App = () => {

  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar />
          <Hero />

        </div>
        <About />
        <Experience />
        <Works />
        <Connect />
        <div className="relative z-0">
          <Contact />
          <Suspense fallback={null}>
            <StarsCanvas />
          </Suspense>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App;
