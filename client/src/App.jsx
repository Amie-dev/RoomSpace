import { Outlet } from 'react-router-dom';
import { Header, Footer } from './components';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto max-w-4xl px-4 py-8">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;