import React, { useEffect, useState } from 'react';
import { BarChart3, Globe, Smartphone, Calendar, Loader2, Map, TrendingUp } from 'lucide-react';
import { AnalyticsService } from '../../lib/analyticsService';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export function AnalyticsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const stats = await AnalyticsService.getDashboardData();
        setData(stats || { timeline: [], countries: [], devices: [] });
      } catch (err) { console.error(err); } 
      finally { setLoading(false); }
    };
    load();
  }, []);

  if (loading) return <div style={{height:'80vh', display:'flex', alignItems:'center', justifyContent:'center'}}><Loader2 className="animate-spin text-indigo-600" size={40}/></div>;

  const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  // --- ESTILOS EN LÍNEA PARA GARANTIZAR DISEÑO ---
  const styles = {
    container: { maxWidth: '1200px', margin: '0 auto', paddingBottom: '80px' },
    header: { marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'end' },
    title: { fontSize: '32px', fontWeight: 900, color: '#0F172A', margin: '0 0 8px 0', letterSpacing: '-1px' },
    card: { background: 'white', padding: '32px', borderRadius: '24px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)', marginBottom: '32px' },
    cardHeader: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' },
    iconBox: (color: string, bg: string) => ({ width: '40px', height: '40px', borderRadius: '12px', background: bg, color: color, display: 'flex', alignItems: 'center', justifyContent: 'center' }),
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '32px' }
  };

  return (
    <div className="animate-enter" style={styles.container}>
      <style>{`.animate-spin { animation: spin 1s linear infinite; }`}</style>
      
      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Analytics</h1>
          <p style={{color:'#64748B', fontSize:'16px', margin:0}}>Inteligencia de datos en tiempo real.</p>
        </div>
        <div style={{background:'white', border:'1px solid #E2E8F0', padding:'8px 16px', borderRadius:'12px', fontSize:'12px', fontWeight:800, color:'#475569', display:'flex', alignItems:'center', gap:'8px'}}>
           <div style={{width:'8px', height:'8px', background:'#10B981', borderRadius:'50%', boxShadow:'0 0 0 2px #D1FAE5'}}></div> LIVE DATA
        </div>
      </div>

      {/* GRÁFICA PRINCIPAL */}
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <div style={styles.iconBox('#4F46E5', '#EEF2FF')}><Calendar size={20} /></div>
          <div><h3 style={{fontSize:'18px', fontWeight:800, color:'#0F172A', margin:0}}>Tráfico e Ingresos</h3><p style={{fontSize:'13px', color:'#64748B', margin:0}}>Últimos 30 días</p></div>
        </div>
        
        <div style={{height:'350px', width:'100%'}}>
          {data?.timeline?.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.timeline}>
                <defs>
                  <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94A3B8'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94A3B8'}} />
                <Tooltip contentStyle={{borderRadius:'12px', border:'none', boxShadow:'0 10px 30px -5px rgba(0,0,0,0.1)', fontWeight:'bold'}} />
                <Area type="monotone" dataKey="clicks" stroke="#4F46E5" strokeWidth={3} fillOpacity={1} fill="url(#colorClicks)" />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div style={{height:'100%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', background:'#F8FAFC', borderRadius:'16px', border:'2px dashed #E2E8F0', color:'#94A3B8'}}>
              <BarChart3 size={48} style={{marginBottom:'16px', opacity:0.5}}/>
              <p style={{fontWeight:600}}>Aún no hay suficientes datos.</p>
            </div>
          )}
        </div>
      </div>

      <div style={styles.grid}>
        
        {/* PAÍSES */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <div style={styles.iconBox('#2563EB', '#EFF6FF')}><Globe size={20} /></div>
            <h3 style={{fontSize:'18px', fontWeight:800, color:'#0F172A', margin:0}}>Top Geografías</h3>
          </div>
          
          <div style={{display:'flex', flexDirection:'column', gap:'20px'}}>
            {data?.countries?.length > 0 ? (
              data.countries.map((item: any, index: number) => (
                <div key={index}>
                  <div style={{display:'flex', justifyContent:'space-between', fontSize:'14px', marginBottom:'8px'}}>
                    <span style={{fontWeight:700, color:'#334155', display:'flex', alignItems:'center', gap:'8px'}}>
                       {item.country === 'Unknown' ? '🌍' : <img src={`https://flagcdn.com/20x15/${item.country.toLowerCase()}.png`} style={{borderRadius:'2px'}} />} 
                       {item.country === 'Unknown' ? 'Desconocido' : item.country}
                    </span>
                    <span style={{fontWeight:800, color:'#0F172A'}}>{item.value} clics</span>
                  </div>
                  <div style={{width:'100%', height:'8px', background:'#F1F5F9', borderRadius:'100px', overflow:'hidden'}}>
                    <div style={{height:'100%', width:`${(item.value / data.countries[0].value) * 100}%`, background: COLORS[index % COLORS.length], borderRadius:'100px'}}></div>
                  </div>
                </div>
              ))
            ) : (
              <div style={{padding:'40px', textAlign:'center', color:'#94A3B8', background:'#F8FAFC', borderRadius:'16px'}}>
                <Map size={32} style={{marginBottom:'8px', opacity:0.5, margin:'0 auto'}}/>
                <p>Sin datos geográficos.</p>
              </div>
            )}
          </div>
        </div>

        {/* DISPOSITIVOS */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <div style={styles.iconBox('#EA580C', '#FFF7ED')}><Smartphone size={20} /></div>
            <h3 style={{fontSize:'18px', fontWeight:800, color:'#0F172A', margin:0}}>Dispositivos</h3>
          </div>

          <div style={{height:'250px', position:'relative', display:'flex', justifyContent:'center'}}>
             {data?.devices?.length > 0 ? (
               <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                   <Pie data={data.devices} cx="50%" cy="50%" innerRadius={70} outerRadius={90} paddingAngle={5} dataKey="value" stroke="none">
                     {data.devices.map((entry: any, index: number) => (
                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                     ))}
                   </Pie>
                   <Tooltip />
                 </PieChart>
               </ResponsiveContainer>
             ) : (
               <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', color:'#94A3B8'}}>
                 <Smartphone size={40} style={{marginBottom:'8px', opacity:0.5}}/>
                 <p>Esperando tráfico...</p>
               </div>
             )}
             {data?.devices?.length > 0 && (
               <div style={{position:'absolute', top:'50%', left:'50%', transform:'translate(-50%, -50%)', textAlign:'center'}}>
                 <span style={{display:'block', fontSize:'36px', fontWeight:900, color:'#0F172A', lineHeight:1}}>{data.devices.reduce((a:any, b:any) => a + b.value, 0)}</span>
                 <span style={{fontSize:'11px', color:'#64748B', fontWeight:800, textTransform:'uppercase', letterSpacing:'1px'}}>Total</span>
               </div>
             )}
          </div>
          
          <div style={{display:'flex', justifyContent:'center', gap:'24px', marginTop:'24px', flexWrap:'wrap'}}>
            {data?.devices?.map((entry: any, index: number) => (
              <div key={index} style={{display:'flex', alignItems:'center', gap:'8px', fontSize:'13px', fontWeight:700, color:'#475569'}}>
                <div style={{width:'10px', height:'10px', borderRadius:'50%', background: COLORS[index % COLORS.length]}}></div>
                {entry.device} <span style={{color:'#94A3B8'}}>({entry.value})</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
