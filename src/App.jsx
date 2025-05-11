// src/App.jsx
import "@styles/global.css"; // Seus estilos globais
import "@styles/forms.css"; // Seus estilos para formulários
import "@styles/pages.css"; // Estilos específicos de páginas

import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./Routes/AppRoutes"; // Seu componente de rotas
import { AuthProvider } from "./Contexts/AuthContexts"; // Seu provedor de autenticação

// Importações para react-toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
      {/* Container para as notificações toast. Configure conforme necessário. */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" // Pode ser "light", "dark", ou "colored"
      />
    </BrowserRouter>
  );
}

export default App;
