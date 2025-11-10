import { useEffect, ReactNode } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  useEffect(() => {
    // Initialize Phoenix theme
    const initPhoenix = () => {
      // Load Phoenix main JS if available
      const script = document.createElement('script');
      script.src = '/assets/js/phoenix.min.js';
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    };

    initPhoenix();
  }, []);

  return (
    <main className="main" id="top">
      <Sidebar />
      <div className="content">
        <Navbar />
        {children}
      </div>
    </main>
  );
}
