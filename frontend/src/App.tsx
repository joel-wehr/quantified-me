import { useEffect } from 'react';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';

function App() {
  useEffect(() => {
    // Initialize feather icons
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/feather-icons/dist/feather.min.js';
    script.async = true;
    script.onload = () => {
      if (window.feather) {
        window.feather.replace();
      }
    };
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <MainLayout>
      <Dashboard />
    </MainLayout>
  );
}

export default App;
