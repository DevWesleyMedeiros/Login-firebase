// src/Pages/Login.jsx
import React, { useRef, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Usar Link para navegação interna
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@services/firebaseConfig"; // Alias para serviços
import { Loader } from "@components/Loader"; // Alias para componentes
import { useForm } from "@hooks/useForm"; // Alias para hooks
import { validateEmail, validatePassword } from "@utils/validators"; // Alias para utilitários
import { toast } from "react-toastify"; // Importar toast diretamente

const initialLoginValues = {
  email: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();
  const emailInputRef = useRef(null);
  const [viewPassword, setViewPassword] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false); // Estado de loading para Google

  // Função de validação para o useForm
  const validateLogin = (values) => {
    const errors = {};
    if (!validateEmail(values.email)) {
      errors.email = "Por favor, insira um email válido.";
    }
    // A validação de senha aqui é mais sobre o formato,
    // o Firebase tratará se a senha está correta para o usuário.
    if (!values.password) {
      // Simplesmente verifica se não está vazio
      errors.password = "Por favor, insira sua senha.";
    } else if (values.password.length < 8) {
      // Exemplo de verificação mínima
      errors.password = "A senha deve ter pelo menos 8 caracteres.";
    }
    return errors;
  };

  // Função de submissão para o useForm
  const performLogin = async (formValues, setFormErrors) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formValues.email,
        formValues.password
      );
      toast.success("Login bem-sucedido!");
      navigate(
        userCredential.user.photoURL
          ? `/home?uid=${userCredential.user.uid}&photo=${encodeURIComponent(
              userCredential.user.photoURL
            )}`
          : `/home?uid=${userCredential.user.uid}`
      );
    } catch (error) {
      console.error("Erro de autenticação:", error);
      let errorMessage =
        "Ocorreu um erro ao tentar fazer login. Tente novamente.";
      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password" ||
        error.code === "auth/invalid-credential"
      ) {
        errorMessage = "Email ou senha incorretos.";
        // Adicionar erro específico ao formulário ou campos
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          email: " ", // Para marcar o campo de email como inválido visualmente
          password: "Email ou senha incorretos.", // Mensagem no campo de senha
        }));
      } else if (error.code === "auth/too-many-requests") {
        errorMessage =
          "Muitas tentativas de login. Tente novamente mais tarde.";
      }
      toast.error(errorMessage);
      emailInputRef.current?.focus();
      // Limpar apenas a senha em caso de erro
      setValues((prev) => ({ ...prev, password: "" }));
    }
  };

  const {
    values,
    setValues, // Para limpar a senha
    errors,
    isSubmitting,
    handleChange,
    handleBlur, // Para validação ao sair do campo
    handleSubmit,
  } = useForm(initialLoginValues, validateLogin, performLogin);

  // Focar no input de email ao montar o componente
  useEffect(() => {
    emailInputRef.current?.focus();
  }, []);

  const provider = new GoogleAuthProvider();
  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    setIsGoogleLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      toast.success("Login com Google bem-sucedido!");
      navigate(
        `/home?uid=${user.uid}&photo=${encodeURIComponent(user.photoURL || "")}`
      );
    } catch (error) {
      console.error("Erro no login com Google:", error);
      if (error.code === "auth/popup-closed-by-user") {
        toast.info("Login com Google cancelado.");
      } else {
        toast.error("Erro no login com Google: " + error.message);
      }
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const isLoading = isSubmitting || isGoogleLoading;

  return (
    <div className="container-form">
      {" "}
      {/* Adicione suas classes de estilização Tailwind/CSS aqui */}
      {isLoading && <Loader />}
      <h1 className="form-title text-2xl font-bold text-center mb-6">
        Entrar na sua conta
      </h1>
      <form className="form__container space-y-4" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="email-login"
            className="block text-sm font-medium text-gray-700"
          >
            Digite seu Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="seuemail@exemplo.com"
            className={`inputs__form email mt-1 block w-full px-3 py-2 border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            id="email-login"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur} // Validar ao sair do campo
            ref={emailInputRef}
            required
            disabled={isLoading}
            autoComplete="email"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-600">{errors.email}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="password-login"
            className="block text-sm font-medium text-gray-700"
          >
            Digite sua Senha
          </label>
          <div className="relative mt-1">
            <input
              type={viewPassword ? "text" : "password"}
              name="password"
              placeholder="Sua senha"
              className={`inputs__form password block w-full px-3 py-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              id="password-login"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur} // Validar ao sair do campo
              required
              disabled={isLoading}
              autoComplete="current-password"
            />
            <span
              className="view-password btn-view-password absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-500"
              onClick={() => setViewPassword(!viewPassword)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) =>
                e.key === "Enter" && setViewPassword(!viewPassword)
              }
              title={viewPassword ? "Ocultar senha" : "Mostrar senha"}
            >
              {viewPassword ? (
                <i className="fas fa-eye-slash"></i>
              ) : (
                <i className="fas fa-eye"></i>
              )}
            </span>
          </div>
          {errors.password && (
            <p className="mt-1 text-xs text-red-600">{errors.password}</p>
          )}
        </div>

        <div className="container-btn-submit flex flex-col space-y-3">
          <button
            type="submit"
            className="inputs__form input-submit btn__form btn-submit w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            disabled={isLoading}
          >
            {isSubmitting ? "Logando..." : "Logar"}
          </button>
          <button
            type="button"
            className="inputs__form btn__form input-submit btn-submit-google w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            onClick={handleGoogleLogin}
            disabled={isLoading}
          >
            {isGoogleLoading ? "Aguarde..." : "Logar com Google"}{" "}
            <i className="fab fa-google ml-2"></i>
          </button>
        </div>

        <div className="text-center mt-4">
          <Link
            to="/signup"
            className="btn__signup font-medium text-indigo-600 hover:text-indigo-500"
          >
            Não possui conta? Cadastre-se
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
