import React, { useState } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import Portofolio from './Pages/Portofolio';
import ContactPage from './Pages/Contact';
import ProjectDetails from './components/ProjectDetail';
import Navbar from './components/Navbar';
import AnimatedBackground from './components/Background';
import WelcomeScreen from './Pages/WelcomeScreen';
import NotFoundPage from './Pages/404';
import './index.css';

const MainLayout = () => (
  <>
    <Navbar />
    <AnimatedBackground />
    <main>
      <Outlet />
    </main>
    <footer className="pt-16">
      <center>
        <hr className="my-3 border-gray-400 opacity-15 sm:mx-auto lg:my-6" />
        <span className="block text-sm pb-4 text-gray-500 text-center dark:text-gray-400">
          © 2025 Dhruvil Patel™. All Rights Reserved.
        </span>
      </center>
    </footer>
  </>
);

function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  if (showWelcome) {
    return <WelcomeScreen onLoadingComplete={() => setShowWelcome(false)} />;
  }

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="portfolio" element={<Portofolio />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="project/:id" element={<ProjectDetails />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
