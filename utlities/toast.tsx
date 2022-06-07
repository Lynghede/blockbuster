import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import confetti from "canvas-confetti";

interface Toast {
  key: string;
  message: React.ReactNode;
  appearance: string;
  dismiss(): void;
}

interface ToastContext {
  toasts: Toast[];
  addToast(message: React.ReactNode, props: { appearance: string }): void;
}

const defaultValue: ToastContext = {
  toasts: [],
  addToast: () => {
    throw new Error("No toast context");
  },
};

export const ToastContext = createContext(defaultValue);

export const useToast = (): ToastContext => useContext(ToastContext);

export const ToastProvider: React.FC<any> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const counter = useRef(0);

  const addToast = useCallback<ToastContext["addToast"]>(
    (message, props) => {
      if (props.appearance === "success") confetti();
      const key = `${counter.current++}`;
      const toast = {
        key,
        message,
        appearance: props.appearance,
        dismiss: () =>
          setToasts((toasts) => toasts.filter((toast) => toast.key !== key)),
      };
      setToasts((toasts) => [...toasts, toast]);
    },
    [setToasts]
  );

  const value = { toasts, addToast };

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  );
};
