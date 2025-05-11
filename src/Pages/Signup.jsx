// src/Pages/Signup.jsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@services/firebaseConfig";
import { Loader } from "@components/Loader";
import { useForm } from "@hooks/useForm";
import {
  validateName,
  validateEmail,
  validatePassword,
} from "@utils/validators";
import { toast } from "react-toastify";

const initialSignupValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Signup = () => {
  const navigate = useNavigate();
  const nameInputRef = useRef(null);
  const [viewPassword, setViewPassword] = useState(false);

  const validateSignup = (values) => {
    const errors = {};
    if (!validateName(values.name)) {
      errors.name = "Nome deve ter pelo menos 3 caracteres.";
    }
    if (!validateEmail(values.email)) {
      errors.email = "Por favor, insira um email válido.";
    }
    if (!validatePassword(values.password)) {
      errors.password =
        "Senha inválida. Deve ter min. 8 caracteres, maiúscula, minúscula, número e especial.";
    }
    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "As senhas não coincidem.";
    }
    return errors;
  };

  const performSignup = async (formValues, setFormErrors) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formValues.email,
        formValues.password
      );
      await updateProfile(userCredential.user, {
        displayName: formValues.name.trim(),
      });
      toast.success("Conta criada com sucesso! Redirecionando para login...");
      setTimeout(() => {
        navigate("/login");
      }, 2500);
    } catch (error) {
      console.error("Erro no cadastro:", error);
      let errorMessage = "Ocorreu um erro ao criar a conta.";
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "Este email já está cadastrado.";
        setFormErrors((prevErrors) => ({ ...prevErrors, email: errorMessage }));
      } else if (error.code === "auth/weak-password") {
        errorMessage = "A senha é muito fraca.";
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          password: errorMessage,
        }));
      }
      toast.error(errorMessage);
    }
  };

  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useForm(initialSignupValues, validateSignup, performSignup);

  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  return (
    <div className="container-form">
      {" "}
      {/* Adicione suas classes de estilização Tailwind/CSS aqui */}
      {isSubmitting && <Loader />}
      <h1 className="form-title text-2xl font-bold text-center mb-6">
        Criar sua conta
      </h1>
      <form className="form__container space-y-4" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="input-name"
            className="block text-sm font-medium text-gray-700"
          >
            Seu nome de usuário:
          </label>
          <input
            type="text"
            name="name"
            className={`inputs__form input-name mt-1 block w-full px-3 py-2 border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            id="input-name"
            placeholder="Nome de usuário"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            ref={nameInputRef}
            required
            disabled={isSubmitting}
            autoComplete="name"
          />
          {errors.name && (
            <p className="mt-1 text-xs text-red-600">{errors.name}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="input-email"
            className="block text-sm font-medium text-gray-700"
          >
            Seu melhor Email:
          </label>
          <input
            type="email"
            name="email"
            placeholder="seuemail@exemplo.com"
            className={`inputs__form email mt-1 block w-full px-3 py-2 border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            id="input-email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            disabled={isSubmitting}
            autoComplete="email"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-600">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="input-password">Sua senha:</label>
          <div className="relative mt-1">
            <input
              type={viewPassword ? "text" : "password"}
              name="password"
              placeholder="Mín. 8 caracteres, com maiúscula, minúscula, número e especial"
              className={`inputs__form password block w-full px-3 py-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              id="input-password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              disabled={isSubmitting}
              maxLength={30}
              autoComplete="new-password"
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

        <div>
          <label
            htmlFor="input-password-match"
            className="block text-sm font-medium text-gray-700"
          >
            Repita sua senha:
          </label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirme sua senha"
            className={`inputs__form password-match mt-1 block w-full px-3 py-2 border ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
            id="input-password-match"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            required
            disabled={isSubmitting}
            autoComplete="new-password"
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-xs text-red-600">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <div className="container-btn-submit mt-6">
          <button
            type="submit"
            className="inputs__form input-submit btn__form btn-submit w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Cadastrando..." : "Cadastrar"}
          </button>
        </div>

        <div className="text-center mt-4">
          <Link
            to="/login"
            className="btn__signup font-medium text-indigo-600 hover:text-indigo-500"
          >
            Já possui conta? Voltar para login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
