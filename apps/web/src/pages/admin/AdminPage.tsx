import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  RefreshCcw, 
  Search,
  AlertTriangle,
  DollarSign,
  Users
} from 'lucide-react';
import { AdminService, WithdrawalRequest } from '../../lib/adminService';

// Componente para las Tarjetas de Resumen (KPIs)
const StatCard = ({ title, value, icon: Icon, colorClass }: any) => (
  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
    <div className={`p-3 rounded-lg ${colorClass} bg-opacity-10`}>
      <Icon size={24} className={colorClass.replace('bg-', 'text-')} />
    </div>
    <div>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{title}</p>
      <p className="text-2xl font-black text-slate-900">{value}</p>
    </div>
  </div>
);

export function AdminPage() {
  const [activeTab, setActiveTab] = useState<'withdrawals' | 'users'>('withdrawals');
  const [requests, setRequests] = useState<WithdrawalRequest[]>([]);
  const [stats, setStats] = useState({ pending: 0, processed: 0 });
  const [loading, setLoading] = useState(false);
  const [processingId, setProcessingId] = useState<string | null>(null);

  // Carga inicial
  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    setLoading(true);
    try {
      // Cargamos datos reales del servicio
      const pendingData = await AdminService.getPendingWithdrawals();
      const statsData = await AdminService.getStats();
      
      setRequests(pendingData);
      setStats(statsData);
    } catch (error) {
      console.error("Error cargando dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string, amount: number) => {
    if (!window.confirm(`¿CONFIRMAR PAGO DE €${amount.toFixed(2)}?\nEsta acción notificará al usuario.`)) return;
    
    setProcessingId(id);
    try {
      await AdminService.approveWithdrawal(id);
      // Actualización optimista de la UI (para que se sienta instantáneo)
      setRequests(prev => prev.filter(r => r.id !== id));
      setStats(prev => ({ ...prev, pending: prev.pending - 1, processed: prev.processed + 1 }));
    } catch (err) {
      alert('Error crítico al aprobar. Revisa la consola.');
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (id: string) => {
    const reason = window.prompt("Motivo del rechazo (se enviará al usuario):", "Datos bancarios incorrectos");
    if (!reason) return;

    setProcessingId(id);
    try {
      await AdminService.rejectWithdrawal(id);
      setRequests(prev => prev.filter(r => r.id !== id));
      setStats(prev => ({ ...prev, pending: prev.pending - 1 }));
    } catch (err) {
      alert('Error al rechazar.');
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* --- NAVBAR SUPERIOR STAFF --- */}
      <nav className="bg-slate-900 text-white px-8 py-4 flex justify-between items-center sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-500 p-2 rounded-lg">
            <ShieldCheck size={20} className="text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-tight">LinkPay <span className="text-indigo-400">Admin</span></h1>
            <p className="text-[10px] text-slate-400 font-mono tracking-widest">SECURE ENVIRONMENT</p>
          </div>
        </div>
        
        <div className="flex gap-4 items-center">
          <span className="text-xs font-medium text-slate-400 bg-slate-800 px-3 py-1 rounded-full flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            SYSTEM ONLINE
          </span>
          <button onClick={loadDashboard} className="p-2 hover:bg-slate-800 rounded-full transition-colors" title="Refrescar Datos">
            <RefreshCcw size={18} className={loading ? 'animate-spin text-indigo-400' : 'text-slate-300'} />
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-8">
        
        {/* --- KPI SECTION --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard 
            title="Solicitudes Pendientes" 
            value={stats.pending} 
            icon={Clock} 
            colorClass="bg-yellow-500" 
          />
          <StatCard 
            title="Pagos Procesados" 
            value={stats.processed} 
            icon={CheckCircle2} 
            colorClass="bg-green-500" 
          />
          <StatCard 
            title="Usuarios Totales" 
            value="--" // Conectarás esto cuando tengamos el UserService completo
            icon={Users} 
            colorClass="bg-blue-500" 
          />
        </div>

        {/* --- TABS --- */}
        <div className="flex gap-6 border-b border-slate-200 mb-8">
          <button 
            onClick={() => setActiveTab('withdrawals')}
            className={`pb-4 px-2 text-sm font-bold flex items-center gap-2 transition-colors ${activeTab === 'withdrawals' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <DollarSign size={16} /> Cola de Pagos
            {stats.pending > 0 && <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full">{stats.pending}</span>}
          </button>
          <button 
            onClick={() => setActiveTab('users')}
            className={`pb-4 px-2 text-sm font-bold flex items-center gap-2 transition-colors ${activeTab === 'users' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <Users size={16} /> Gestión de Usuarios
          </button>
        </div>

        {/* --- CONTENIDO PRINCIPAL: TABLA DE RETIROS --- */}
        {activeTab === 'withdrawals' && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            {requests.length === 0 ? (
              <div className="py-20 flex flex-col items-center justify-center text-slate-400">
                <CheckCircle2 size={64} className="mb-4 text-slate-200" />
                <p className="font-medium text-lg">Todo limpio por aquí</p>
                <p className="text-sm">No hay pagos pendientes de revisión.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Fecha / ID</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Método</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Detalles de Cuenta</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Importe</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {requests.map((req) => (
                      <tr key={req.id} className="hover:bg-indigo-50/30 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="font-bold text-slate-700 text-sm">
                            {new Date(req.created_at).toLocaleDateString()}
                          </div>
                          <div className="text-[10px] font-mono text-slate-400 group-hover:text-indigo-400">
                            {req.id.slice(0, 8)}...
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            req.method === 'PayPal' ? 'bg-blue-100 text-blue-800' :
                            req.method === 'Crypto' ? 'bg-orange-100 text-orange-800' :
                            'bg-slate-100 text-slate-800'
                          }`}>
                            {req.method}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 font-mono text-sm text-slate-600 bg-slate-50 px-3 py-1 rounded border border-slate-200 w-fit">
                            {req.account_details}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="text-lg font-black text-slate-900 tracking-tight">
                            €{req.amount.toFixed(2)}
                          </span>
                        </td>
                        <td className="px-6 py-4 flex justify-center gap-2">
                          <button
                            onClick={() => handleApprove(req.id, req.amount)}
                            disabled={processingId === req.id}
                            className="p-2 bg-green-50 text-green-600 rounded-lg border border-green-200 hover:bg-green-600 hover:text-white transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Aprobar Pago"
                          >
                            {processingId === req.id ? <RefreshCcw className="animate-spin" size={18}/> : <CheckCircle2 size={18} />}
                          </button>
                          
                          <button
                            onClick={() => handleReject(req.id)}
                            disabled={processingId === req.id}
                            className="p-2 bg-white text-slate-400 rounded-lg border border-slate-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all shadow-sm disabled:opacity-50"
                            title="Rechazar y devolver saldo"
                          >
                             <XCircle size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* --- TABLA DE USUARIOS (Placeholder para futura implementación) --- */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
            <div className="inline-block p-4 bg-slate-50 rounded-full mb-4">
              <Users size={32} className="text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Gestión de Usuarios</h3>
            <p className="text-slate-500 max-w-md mx-auto mt-2">
              Pronto podrás ver, editar y banear usuarios desde aquí.
              Esta función está en desarrollo en el siguiente sprint.
            </p>
          </div>
        )}

      </main>
    </div>
  );
} 
