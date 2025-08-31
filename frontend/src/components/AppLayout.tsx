import React from 'react';
import Navigation from './Navigation';
import AlertBanner from './AlertBanner';
import ChatWidget from './ChatWidget';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <>
      <AlertBanner />
      <Navigation />
      {children}
      <ChatWidget />
    </>
  );
};

export default AppLayout;