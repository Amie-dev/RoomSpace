import { Outlet, useLocation } from 'react-router-dom';
import { Header, Footer } from './components';
import { Toaster } from './components/ui/toaster';

function App() {
  const location = useLocation();
  const isRoomDashboard = location.pathname.startsWith('/app');

  return (
    <div className="flex flex-col min-h-screen">
      {!isRoomDashboard && <Header />}
      <main className={`flex-grow ${isRoomDashboard ? '' : 'px-4 py-8'}`}>
        <Outlet />
      </main>
      {!isRoomDashboard && <Footer />}
      <Toaster />
    </div>
  );
}

export default App;