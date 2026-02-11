
import React, { useState } from 'react';
import { Page } from './types';
import Layout from './components/Layout';
import ChatWidget from './components/ChatWidget';
import Home from './pages/Home';
import About from './pages/About';
import RequestLyrics from './pages/RequestLyrics';
import PermanentLyricist from './pages/PermanentLyricist';
import MyLibrary from './pages/MyLibrary';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const handleNavigate = (page: Page) => {
    if (page === Page.ADMIN_DASHBOARD && !isAdminAuthenticated) {
      setCurrentPage(Page.ADMIN_LOGIN);
    } else {
      setCurrentPage(page);
    }
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case Page.HOME:
        return <Home onNavigate={handleNavigate} />;
      case Page.ABOUT:
        return <About isAdmin={isAdminAuthenticated} />;
      case Page.REQUEST:
        return <RequestLyrics />;
      case Page.PREMIUM:
        return <PermanentLyricist />;
      case Page.MY_LIBRARY:
        return <MyLibrary />;
      case Page.ADMIN_LOGIN:
        return <AdminLogin onLogin={() => {
          setIsAdminAuthenticated(true);
          setCurrentPage(Page.ADMIN_DASHBOARD);
        }} />;
      case Page.ADMIN_DASHBOARD:
        return <AdminDashboard />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <Layout currentPage={currentPage} onNavigate={handleNavigate}>
      {renderPage()}
      <ChatWidget />
    </Layout>
  );
};

export default App;
