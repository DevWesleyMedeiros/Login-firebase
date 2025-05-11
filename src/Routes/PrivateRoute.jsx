import { Navigate } from "react-router-dom";
// Verifique o nome da pasta: 'Contexts' ou 'contexts'
// Verifique o nome do arquivo: 'AuthContexts.jsx'
// Se o arquivo exporta 'useAuth', está ok.
import { useAuth } from "@contexts/AuthContexts"; // Usando alias e assumindo nome de arquivo AuthContexts.jsx

const PrivateRoute = ({ children }) => {
  const { currentUser, loading } = useAuth(); // Adicionado loading do AuthContext

  // Se ainda estiver carregando o estado de autenticação, pode mostrar um loader
  // ou null para não renderizar nada até que o estado seja conhecido.
  if (loading) {
    return null; // Ou <GlobalLoader /> se tiver um loader global
  }

  return currentUser ? children : <Navigate to="/login" replace />; // Adicionado replace para melhor UX
};

export default PrivateRoute;
