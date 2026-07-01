import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CustomThemeProvider, useThemeContext } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';

function AppContent() {
  const { darkMode } = useThemeContext();

  return (
    <>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? 'dark' : 'light'}
      />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <CustomThemeProvider>
        <AppContent />
      </CustomThemeProvider>
    </BrowserRouter>
  );
}

export default App;
