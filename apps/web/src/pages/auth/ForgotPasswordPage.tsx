import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Loader2, CheckCircle } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`, // Importante: Esta ruta debe existir en el router
      });
      if (error) throw error;
      setSent(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl">
        
        <Link to="/login" className="flex items-center gap-2 text-slate-500 text-sm font-bold mb-6 hover:text-indigo-600 transition-colors">
          <ArrowLeft size={16} /> Volver
        </Link>

        <h1 className="text-2xl font-black text-slate-900 mb-2">Recuperar Acceso</h1>
        <p className="text-slate-500 mb-8 text-sm">Te enviaremos un enlace seguro para restablecer tu contraseña.</p>

        {sent ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="text-green-600" size={24} />
            </div>
            <h3 className="font-bold text-green-800 mb-1">¡Correo Enviado!</h3>
            <p className="text-green-700 text-sm">Revisa tu bandeja de entrada (y spam).</p>
          </div>
        ) : (
          <form onSubmit={handleReset} className="space-y-4">
            {error && <div className="text-red-500 text-xs font-bold bg-red-50 p-3 rounded-lg">{error}</div>}
            
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 text-slate-400" size={18} />
                <input 
                  type="email" 
                  required 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  className="w-full pl-12 p-3 bg-slate-50 border border-slate-200 rounded-xl font-bold outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>
            
            <button type="submit" disabled={loading} className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors flex justify-center shadow-lg shadow-indigo-200 disabled:opacity-50">
              {loading ? <Loader2 className="animate-spin" /> : 'Enviar Enlace'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
