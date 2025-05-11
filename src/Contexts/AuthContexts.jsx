import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
// Verifique o nome do arquivo de configuração do Firebase e o caminho/alias
// Se o arquivo for firebaseConfig.js (sem o .config no meio do nome para importar)
import { auth } from "@services/firebaseConfig"; // Usando alias

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // Estado de loading é importante

  useEffect(() => {
    // onAuthStateChanged retorna uma função de unsubscribe
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading, // Expor o estado de loading
    // Você pode adicionar mais valores aqui se necessário, como funções de login/logout
  };

  return (
    <AuthContext.Provider value={value}>
      {/* Não renderizar children se loading for true pode ser uma opção,
          mas PrivateRoute já lida com isso. Renderizar children aqui
          permite que componentes não protegidos ainda usem o contexto se necessário.
          A lógica de PrivateRoute decidirá se renderiza a rota protegida ou redireciona.
      */}
      {children}
    </AuthContext.Provider>
  );
}
