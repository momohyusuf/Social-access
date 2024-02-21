import { Outlet } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-200px)]">
        {' '}
        <Outlet />
      </main>
      <footer className="text-center text-gray-500 py-8">
        <p>2024</p>
      </footer>
    </>
  );
};

export default MainLayout;
