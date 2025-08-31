import React from 'react';
import { useNavigate } from 'react-router-dom';
import LandingPage from '../components/LandingPage';

const Landing: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = (): void => {
    navigate('/dashboard');
  };

  return <LandingPage onGetStarted={handleGetStarted} />;
};

export default Landing;