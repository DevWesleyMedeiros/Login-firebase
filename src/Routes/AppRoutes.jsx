// Removido BrowserRouter daqui, pois já está no App.jsx principal
import { Routes, Route } from "react-router-dom";
// Verifique os nomes dos arquivos e se a exportação default está correta em cada um.
// Se Login.jsx exporta 'export default Login', então 'import Login from ...' está correto.
import Login from "@pages/Login"; // Usando alias
import Signup from "@pages/Signup"; // Usando alias (verifique se o nome do arquivo é Signup.jsx e não signup.jsx)
import Home from "@pages/Home"; // Usando alias
import PrivateRoute from "./PrivateRoute"; // Caminho relativo mantido, ou use @routes/PrivateRoute
// AuthProvider já está no App.jsx principal, envolvendo AppRoutes.
// Se precisar dele aqui por alguma razão específica, mantenha, mas geralmente é no nível mais alto.
// Para este exemplo, vou assumir que AuthProvider no App.jsx é suficiente.

// O nome deste componente pode continuar AppRoutes, mas lembre-se que ele é importado em src/App.jsx
// e o componente em src/App.jsx é o que é renderizado em main.jsx
function AppRoutes() {
  return (
    // AuthProvider deve envolver as rotas, o que já é feito no seu src/App.jsx
    // Se você não tiver AuthProvider em src/App.jsx, adicione-o aqui ou lá.
    // <AuthProvider>
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      {/*
        Padronize o nome do arquivo e o import.
        Se o arquivo é Signup.jsx (maiúsculo S), o import deve ser Signup.
        O path da rota pode ser minúsculo.
      */}
      <Route path="/signup" element={<Signup />} />
      {/* Adicionar uma rota para Not Found é uma boa prática */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
    // </AuthProvider>
  );
}

export default AppRoutes;
