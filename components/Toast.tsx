import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export interface ToastProps {
  id: string;
  message: string;
  type: 'success' | 'error';
  onClose: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ id, message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, 3000);
    return () => clearTimeout(timer);
  }, [id, onClose]);

  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-slate-800 rounded-xl shadow-lg shadow-slate-200/50 dark:shadow-black/50 border border-slate-100 dark:border-slate-700 animate-in slide-in-from-top-2 fade-in duration-300 pointer-events-auto">
      {type === 'success' ? (
        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
      ) : (
        <AlertCircle className="w-5 h-5 text-red-500" />
      )}
      <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{message}</p>
      <button onClick={() => onClose(id)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Toast;