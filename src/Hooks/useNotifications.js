// src/hooks/useNotifications.js
// Este hook é um wrapper simples para react-toastify.
// Na maioria dos casos, você pode usar o `toast` diretamente do `react-toastify`.
// Mas um hook customizado pode ser útil se você quiser adicionar lógica comum
// ou se preferir uma API mais abstrata.

import { useCallback } from 'react';
import { toast } from 'react-toastify';

export const useNotifications = () => {
  const showSuccessToast = useCallback((message, options) => {
    toast.success(message, options);
  }, []);

  const showErrorToast = useCallback((message, options) => {
    toast.error(message, options);
  }, []);

  const showInfoToast = useCallback((message, options) => {
    toast.info(message, options);
  }, []);

  const showWarningToast = useCallback((message, options) => {
    toast.warn(message, options);
  }, []);

  return {
    showSuccessToast,
    showErrorToast,
    showInfoToast,
    showWarningToast,
  };
};
