import { createContext, useCallback, useMemo, useState } from "react";
import { successToast, errorToast, warningToast, infoToast, closeIcon } from "../utils/Icons";

export const ToastContext = createContext(null);

let toastIdCounter = 0;
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, exiting: true } : t)),
    );
    // Wait for the exit animation to finish before actually removing
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 320);
  }, []);

  const addToast = useCallback(
    (message, options = {}) => {
      const id = ++toastIdCounter;
      const duration = options.duration ?? 4000;
      const type = options.type ?? "info";

      const toast = { id, message, type, duration, exiting: false };
      setToasts((prev) => [...prev, toast]);

      // Auto-close
      if (duration > 0) {
        setTimeout(() => removeToast(id), duration);
      }

      return id;
    },
    [removeToast],
  );

  // Build the toast API as a stable memoized object
  const toast = useMemo(() => ({
    show: (message, options) => addToast(message, options),
    success: (message, opts) => addToast(message, { ...opts, type: "success" }),
    error: (message, opts) => addToast(message, { ...opts, type: "error" }),
    info: (message, opts) => addToast(message, { ...opts, type: "info" }),
    warning: (message, opts) => addToast(message, { ...opts, type: "warning" }),
    dismiss: (id) => removeToast(id),
  }), [addToast, removeToast]);

  return (
    <ToastContext.Provider value={toast}>
      {children}
      {/* Portal-style container rendered at root level */}
      {toasts.length > 0 && <ToastContainer toasts={toasts} onClose={removeToast} />}
    </ToastContext.Provider>
  );
};

/* ── Internals ── */

function ToastContainer({ toasts, onClose }) {
  return (
    <div
      aria-live="polite"
      aria-label="Toast notifications"
      style={{
        position: "fixed",
        top: "1.25rem",
        right: "50%",
        transform: "translateX(50%)",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        gap: "0.625rem",
        maxWidth: "24rem",
        width: "100%",
        pointerEvents: "none",
      }}
    >
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onClose={onClose} />
      ))}
    </div>
  );
}

/* ── Single toast ── */

const ICON_MAP = {
  success: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {successToast}
    </svg>
  ),
  error: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {errorToast}
    </svg>
  ),
  warning: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {warningToast}
    </svg>
  ),
  info: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {infoToast}
    </svg>
  ),
};

const STYLE_MAP = {
  success: {
    bg: "var(--score-high)",
    bgLight: "rgba(16, 185, 129, 0.12)",
    border: "rgba(16, 185, 129, 0.25)",
  },
  error: {
    bg: "var(--score-low)",
    bgLight: "rgba(239, 68, 68, 0.12)",
    border: "rgba(239, 68, 68, 0.25)",
  },
  warning: {
    bg: "var(--score-medium)",
    bgLight: "rgba(245, 158, 11, 0.12)",
    border: "rgba(245, 158, 11, 0.25)",
  },
  info: {
    bg: "var(--primary)",
    bgLight: "rgba(35, 95, 226, 0.12)",
    border: "rgba(35, 95, 226, 0.25)",
  },
};

function ToastItem({ toast, onClose }) {
  const styles = STYLE_MAP[toast.type] || STYLE_MAP.info;

  return (
    <div
      role="alert"
      className={`toast-item ${toast.exiting ? "toast-exit" : "toast-enter"} overflow-hidden relative flex bg-main dark:bg-surface rounded-xl shadow-main shadow-4xl animate-bounce`}
      style={{
        pointerEvents: "auto",
        gap: "0.75rem",
        padding: "0.875rem 1rem",
        boxShadow: "0 8px 30px rgba(0,0,0,.12), 0 2px 8px rgba(0,0,0,.08)",
      }}
    >
      {/* Icon pill */}
      <span
        style={{
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "2rem",
          height: "2rem",
          borderRadius: "0.5rem",
          backgroundColor: styles.bgLight,
          color: styles.bg,
        }}
      >
        {ICON_MAP[toast.type] || ICON_MAP.info}
      </span>

      {/* Message */}
      <span
        style={{
          flex: 1,
          fontSize: "0.875rem",
          lineHeight: 1.5,
          color: "var(--text-main)",
          paddingTop: "0.25rem",
          fontWeight: 400,
        }}
      >
        {toast.message}
      </span>

      {/* Close button */}
      <button
        onClick={() => onClose(toast.id)}
        aria-label="Close notification"
        style={{
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "1.5rem",
          height: "1.5rem",
          borderRadius: "0.375rem",
          border: "none",
          backgroundColor: "transparent",
          color: "var(--text-muted)",
          cursor: "pointer",
          transition: "background-color 0.15s, color 0.15s",
          marginTop: "0.125rem",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "var(--bg-surface)";
          e.currentTarget.style.color = "var(--text-main)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
          e.currentTarget.style.color = "var(--text-muted)";
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          {closeIcon}
        </svg>
      </button>

      {/* Auto-close progress bar */}
      {toast.duration > 0 && (
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            height: "3px",
            backgroundColor: styles.bg,
            borderRadius: "0 0 0.75rem 0.75rem",
            animation: `toast-progress ${toast.duration}ms linear forwards`,
          }}
        />
      )}
    </div>
  );
}
