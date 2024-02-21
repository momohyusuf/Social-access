import ReactDOM from 'react-dom/client';
import './index.css';
import router from './App.jsx';
import { RouterProvider, BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext.jsx';
import App from './App.jsx';
import { ConfigProvider } from 'antd';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <BrowserRouter>
      <ConfigProvider
        theme={{
          token: {
            // Seed Token
            colorPrimary: '#1ea7eb',
            borderRadius: 8,

            // // Alias Token
            // colorBgContainer: '#f6ffed',
          },
        }}
      >
        {' '}
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </AuthContextProvider>
);
