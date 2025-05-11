// src/hooks/useForm.js
import { useState, useCallback } from 'react';

/**
 * Hook customizado para gerenciar o estado de formulários, incluindo valores,
 * erros de validação e estado de submissão.
 *
 * @param {Object} initialValues - Valores iniciais para os campos do formulário.
 * @param {function} validate - Uma função que recebe os valores do formulário e retorna um objeto de erros.
 * @param {function} onSubmitCallback - A função a ser chamada quando o formulário é submetido e é válido.
 */
export const useForm = (initialValues, validate, onSubmitCallback) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((event) => {
    const { name, value, type, checked } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Opcional: limpar erro do campo ao digitar
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: undefined,
      }));
    }
  }, [errors]);

  const handleBlur = useCallback((event) => {
    const { name } = event.target;
    const validationErrors = validate(values);
    // Mostrar erro apenas para o campo que perdeu o foco, se houver
    if (validationErrors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: validationErrors[name],
      }));
    }
  }, [validate, values]);

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        await onSubmitCallback(values, setErrors); // Passa setErrors para feedback da API
      } catch (apiError) {
        // Erros da API que não são específicos de campos podem ser tratados aqui
        // ou dentro do onSubmitCallback.
        console.error("API submission error:", apiError);
        // Exemplo: setErrors(prev => ({...prev, form: "Erro ao submeter."}))
      }
    }
    setIsSubmitting(false);
  }, [validate, values, onSubmitCallback]);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setIsSubmitting(false);
  }, [initialValues]);

  return {
    values,
    setValues, // Para manipulação externa, se necessário (ex: limpar senha após erro)
    errors,
    setErrors, // Para definir erros de fora (ex: erros de API)
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
  };
};