// src/context/DataCacheContext.tsx
// Sistema de caché global para navegación instantánea
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  ReactNode,
} from 'react';
import { supabase } from '../lib/supabaseClient';
import { LinkService, Link } from '../lib/linkService';
import { AnalyticsService, AnalyticsResponse, TimeRange } from '../lib/analyticsService';
import { PayoutService, Transaction } from '../lib/payoutService';

// ═══════════════════════════════════════════════════════════════════════════════
// TIPOS
// ═══════════════════════════════════════════════════════════════════════════════

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  isStale: boolean;
}

interface DashboardData {
  totalRevenue: number;
  linkRevenue: number;
  bioRevenue: number;
  totalClicks: number;
  linkClicks: number;
  bioClicks: number;
  timeline?: any[];
}

interface PayoutsData {
  balance: number;
  history: Transaction[];
}

interface DataCacheContextValue {
  // Links
  links: Link[];
  linksLoading: boolean;
  linksInitialized: boolean;
  refreshLinks: () => Promise<void>;
  
  // Dashboard
  dashboardData: DashboardData | null;
  dashboardLoading: boolean;
  dashboardInitialized: boolean;
  refreshDashboard: () => Promise<void>;
  
  // Analytics
  analyticsData: AnalyticsResponse | null;
  analyticsLoading: boolean;
  analyticsInitialized: boolean;
  analyticsRange: TimeRange;
  setAnalyticsRange: (range: TimeRange) => void;
  refreshAnalytics: () => Promise<void>;
  
  // Payouts
  payoutsData: PayoutsData | null;
  payoutsLoading: boolean;
  payoutsInitialized: boolean;
  refreshPayouts: () => Promise<void>;
  
  // Global
  prefetchAll: () => Promise<void>;
  invalidateAll: () => void;
}

const DataCacheContext = createContext<DataCacheContextValue | undefined>(undefined);

// Tiempo de caché: 5 minutos para considerar "fresco", luego stale-while-revalidate
const CACHE_FRESH_MS = 5 * 60 * 1000;

// ═══════════════════════════════════════════════════════════════════════════════
// PROVIDER
// ═══════════════════════════════════════════════════════════════════════════════

export function DataCacheProvider({ children }: { children: ReactNode }) {
  // ─── LINKS STATE ────────────────────────────────────────────────────────────
  const [links, setLinks] = useState<Link[]>([]);
  const [linksLoading, setLinksLoading] = useState(false);
  const [linksInitialized, setLinksInitialized] = useState(false);
  const linksTimestamp = useRef<number>(0);
  const linksFetching = useRef<boolean>(false);

  // ─── DASHBOARD STATE ────────────────────────────────────────────────────────
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [dashboardLoading, setDashboardLoading] = useState(false);
  const [dashboardInitialized, setDashboardInitialized] = useState(false);
  const dashboardTimestamp = useRef<number>(0);
  const dashboardFetching = useRef<boolean>(false);

  // ─── ANALYTICS STATE ────────────────────────────────────────────────────────
  const [analyticsData, setAnalyticsData] = useState<AnalyticsResponse | null>(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [analyticsInitialized, setAnalyticsInitialized] = useState(false);
  const [analyticsRange, setAnalyticsRangeState] = useState<TimeRange>('30d');
  const analyticsTimestamp = useRef<number>(0);
  const analyticsFetching = useRef<boolean>(false);
  const analyticsRangeRef = useRef<TimeRange>('30d');

  // ─── PAYOUTS STATE ──────────────────────────────────────────────────────────
  const [payoutsData, setPayoutsData] = useState<PayoutsData | null>(null);
  const [payoutsLoading, setPayoutsLoading] = useState(false);
  const [payoutsInitialized, setPayoutsInitialized] = useState(false);
  const payoutsTimestamp = useRef<number>(0);
  const payoutsFetching = useRef<boolean>(false);

  // ═══════════════════════════════════════════════════════════════════════════
  // FETCH FUNCTIONS (con deduplicación y stale-while-revalidate)
  // ═══════════════════════════════════════════════════════════════════════════

  const fetchLinks = useCallback(async (force = false) => {
    // Evitar fetches duplicados
    if (linksFetching.current) return;
    
    const now = Date.now();
    const isFresh = now - linksTimestamp.current < CACHE_FRESH_MS;
    
    // Si tenemos datos frescos y no es forzado, no hacer nada
    if (isFresh && linksInitialized && !force) return;
    
    // Si tenemos datos stale, mostrarlos mientras actualizamos
    const showLoader = !linksInitialized;
    
    try {
      linksFetching.current = true;
      if (showLoader) setLinksLoading(true);
      
      const data = await LinkService.getAll();
      
      setLinks(data || []);
      linksTimestamp.current = Date.now();
      setLinksInitialized(true);
    } catch (error) {
      console.error('[DataCache] Error fetching links:', error);
    } finally {
      linksFetching.current = false;
      setLinksLoading(false);
    }
  }, [linksInitialized]);

  const fetchDashboard = useCallback(async (force = false) => {
    if (dashboardFetching.current) return;
    
    const now = Date.now();
    const isFresh = now - dashboardTimestamp.current < CACHE_FRESH_MS;
    
    if (isFresh && dashboardInitialized && !force) return;
    
    const showLoader = !dashboardInitialized;
    
    try {
      dashboardFetching.current = true;
      if (showLoader) setDashboardLoading(true);
      
      const analyticsData = await AnalyticsService.getDashboardData();
      
      // Obtener links si no los tenemos
      let linksData = links;
      if (!linksInitialized) {
        linksData = await LinkService.getAll() || [];
        setLinks(linksData);
        linksTimestamp.current = Date.now();
        setLinksInitialized(true);
      }
      
      // Calcular stats
      const linkRev = linksData.reduce((acc, l) => acc + (l.earnings || 0), 0);
      const linkClx = linksData.reduce((acc, l) => acc + (l.views || 0), 0);
      const bioRev = (analyticsData as any)?.bioRevenue || 0;
      const bioClx = (analyticsData as any)?.bioClicks || 0;
      
      setDashboardData({
        totalRevenue: linkRev + bioRev,
        linkRevenue: linkRev,
        bioRevenue: bioRev,
        totalClicks: linkClx + bioClx,
        linkClicks: linkClx,
        bioClicks: bioClx,
        timeline: analyticsData?.timeseries || [],
      });
      
      dashboardTimestamp.current = Date.now();
      setDashboardInitialized(true);
    } catch (error) {
      console.error('[DataCache] Error fetching dashboard:', error);
    } finally {
      dashboardFetching.current = false;
      setDashboardLoading(false);
    }
  }, [dashboardInitialized, links, linksInitialized]);

  const fetchAnalytics = useCallback(async (force = false, range?: TimeRange) => {
    if (analyticsFetching.current) return;
    
    const targetRange = range || analyticsRangeRef.current;
    const now = Date.now();
    const isFresh = now - analyticsTimestamp.current < CACHE_FRESH_MS;
    
    // Si cambia el rango, forzar refresh
    if (analyticsData && analyticsData.range !== targetRange) {
      force = true;
    }
    
    if (isFresh && analyticsInitialized && !force) return;
    
    const showLoader = !analyticsInitialized;
    
    try {
      analyticsFetching.current = true;
      if (showLoader) setAnalyticsLoading(true);
      
      const data = await AnalyticsService.getDashboardData(targetRange);
      
      if (data) {
        setAnalyticsData(data);
        analyticsTimestamp.current = Date.now();
        setAnalyticsInitialized(true);
      }
    } catch (error) {
      console.error('[DataCache] Error fetching analytics:', error);
    } finally {
      analyticsFetching.current = false;
      setAnalyticsLoading(false);
    }
  }, [analyticsInitialized, analyticsData]);

  const fetchPayouts = useCallback(async (force = false) => {
    if (payoutsFetching.current) return;
    
    const now = Date.now();
    const isFresh = now - payoutsTimestamp.current < CACHE_FRESH_MS;
    
    if (isFresh && payoutsInitialized && !force) return;
    
    const showLoader = !payoutsInitialized;
    
    try {
      payoutsFetching.current = true;
      if (showLoader) setPayoutsLoading(true);
      
      const [balance, history] = await Promise.all([
        PayoutService.getBalance(),
        PayoutService.getHistory(),
      ]);
      
      setPayoutsData({ balance, history });
      payoutsTimestamp.current = Date.now();
      setPayoutsInitialized(true);
    } catch (error) {
      console.error('[DataCache] Error fetching payouts:', error);
    } finally {
      payoutsFetching.current = false;
      setPayoutsLoading(false);
    }
  }, [payoutsInitialized]);

  // ═══════════════════════════════════════════════════════════════════════════
  // PUBLIC API
  // ═══════════════════════════════════════════════════════════════════════════

  const refreshLinks = useCallback(() => fetchLinks(true), [fetchLinks]);
  const refreshDashboard = useCallback(() => fetchDashboard(true), [fetchDashboard]);
  const refreshAnalytics = useCallback(() => fetchAnalytics(true), [fetchAnalytics]);
  const refreshPayouts = useCallback(() => fetchPayouts(true), [fetchPayouts]);

  const setAnalyticsRange = useCallback((range: TimeRange) => {
    analyticsRangeRef.current = range;
    setAnalyticsRangeState(range);
    fetchAnalytics(true, range);
  }, [fetchAnalytics]);

  const prefetchAll = useCallback(async () => {
    // Prefetch datos críticos en paralelo
    await Promise.all([
      fetchLinks(),
      fetchDashboard(),
    ]);
  }, [fetchLinks, fetchDashboard]);

  const invalidateAll = useCallback(() => {
    linksTimestamp.current = 0;
    dashboardTimestamp.current = 0;
    analyticsTimestamp.current = 0;
    payoutsTimestamp.current = 0;
  }, []);

  // ═══════════════════════════════════════════════════════════════════════════
  // REAL-TIME SUBSCRIPTIONS
  // ═══════════════════════════════════════════════════════════════════════════

  useEffect(() => {
    // Suscribirse a cambios en links para actualizar caché
    const channel = supabase
      .channel('cache-updates')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'links' },
        (payload) => {
          // Actualizar links en caché sin mostrar loading
          if (payload.eventType === 'INSERT') {
            setLinks(prev => [payload.new as Link, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            setLinks(prev => prev.map(l => l.id === (payload.new as Link).id ? payload.new as Link : l));
          } else if (payload.eventType === 'DELETE') {
            setLinks(prev => prev.filter(l => l.id !== (payload.old as any).id));
          }
          
          // Recalcular dashboard data si está inicializado
          if (dashboardInitialized) {
            setDashboardData(prev => {
              if (!prev) return prev;
              // Los links ya están actualizados, recalcular
              return prev; // El useEffect de links lo actualizará
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [dashboardInitialized]);

  // Recalcular dashboard cuando cambien links
  useEffect(() => {
    if (dashboardInitialized && links.length > 0) {
      const linkRev = links.reduce((acc, l) => acc + (l.earnings || 0), 0);
      const linkClx = links.reduce((acc, l) => acc + (l.views || 0), 0);
      
      setDashboardData(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          linkRevenue: linkRev,
          linkClicks: linkClx,
          totalRevenue: linkRev + prev.bioRevenue,
          totalClicks: linkClx + prev.bioClicks,
        };
      });
    }
  }, [links, dashboardInitialized]);

  // ═══════════════════════════════════════════════════════════════════════════
  // AUTO-PREFETCH AL MONTAR (Datos críticos)
  // Optimizado: Se ejecuta de forma asíncrona sin bloquear el render inicial
  // ═══════════════════════════════════════════════════════════════════════════

  useEffect(() => {
    // Verificar si hay sesión antes de prefetch
    // Usar setTimeout para que se ejecute después del primer render
    const timeoutId = setTimeout(async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        // Prefetch en background sin bloquear usando requestIdleCallback
        const requestIdleCallback = window.requestIdleCallback || ((cb: IdleRequestCallback) => {
          const start = Date.now();
          return setTimeout(() => {
            cb({
              didTimeout: false,
              timeRemaining: () => Math.max(0, 50 - (Date.now() - start)),
            });
          }, 1);
        }) as typeof window.requestIdleCallback;

        requestIdleCallback(() => {
          prefetchAll().catch(console.error);
        }, { timeout: 3000 });
      }
    }, 200); // Delay de 200ms para no interferir con la carga inicial
    
    return () => clearTimeout(timeoutId);
  }, [prefetchAll]);

  return (
    <DataCacheContext.Provider
      value={{
        links,
        linksLoading,
        linksInitialized,
        refreshLinks,
        
        dashboardData,
        dashboardLoading,
        dashboardInitialized,
        refreshDashboard,
        
        analyticsData,
        analyticsLoading,
        analyticsInitialized,
        analyticsRange,
        setAnalyticsRange,
        refreshAnalytics,
        
        payoutsData,
        payoutsLoading,
        payoutsInitialized,
        refreshPayouts,
        
        prefetchAll,
        invalidateAll,
      }}
    >
      {children}
    </DataCacheContext.Provider>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// HOOKS
// ═══════════════════════════════════════════════════════════════════════════════

export function useDataCache() {
  const ctx = useContext(DataCacheContext);
  if (!ctx) {
    throw new Error('useDataCache must be used within DataCacheProvider');
  }
  return ctx;
}

// Hook específico para links - Auto-fetch si no está cacheado
export function useCachedLinks() {
  const { links, linksLoading, linksInitialized, refreshLinks } = useDataCache();
  
  useEffect(() => {
    if (!linksInitialized && !linksLoading) {
      refreshLinks();
    }
  }, [linksInitialized, linksLoading, refreshLinks]);
  
  return {
    links,
    loading: linksLoading && !linksInitialized, // Solo loading en primera carga
    isRefreshing: linksLoading && linksInitialized,
    refresh: refreshLinks,
  };
}

// Hook específico para dashboard
export function useCachedDashboard() {
  const { 
    dashboardData, 
    dashboardLoading, 
    dashboardInitialized, 
    refreshDashboard,
    links,
    linksInitialized,
  } = useDataCache();
  
  useEffect(() => {
    if (!dashboardInitialized && !dashboardLoading) {
      refreshDashboard();
    }
  }, [dashboardInitialized, dashboardLoading, refreshDashboard]);
  
  return {
    data: dashboardData,
    links,
    loading: dashboardLoading && !dashboardInitialized,
    isRefreshing: dashboardLoading && dashboardInitialized,
    refresh: refreshDashboard,
  };
}

// Hook específico para analytics
export function useCachedAnalytics() {
  const {
    analyticsData,
    analyticsLoading,
    analyticsInitialized,
    analyticsRange,
    setAnalyticsRange,
    refreshAnalytics,
    links,
    linksInitialized,
  } = useDataCache();
  
  useEffect(() => {
    if (!analyticsInitialized && !analyticsLoading) {
      refreshAnalytics();
    }
  }, [analyticsInitialized, analyticsLoading, refreshAnalytics]);
  
  return {
    data: analyticsData,
    links,
    loading: analyticsLoading && !analyticsInitialized,
    isRefreshing: analyticsLoading && analyticsInitialized,
    range: analyticsRange,
    setRange: setAnalyticsRange,
    refresh: refreshAnalytics,
  };
}

// Hook específico para payouts
export function useCachedPayouts() {
  const {
    payoutsData,
    payoutsLoading,
    payoutsInitialized,
    refreshPayouts,
  } = useDataCache();
  
  useEffect(() => {
    if (!payoutsInitialized && !payoutsLoading) {
      refreshPayouts();
    }
  }, [payoutsInitialized, payoutsLoading, refreshPayouts]);
  
  return {
    balance: payoutsData?.balance ?? 0,
    history: payoutsData?.history ?? [],
    loading: payoutsLoading && !payoutsInitialized,
    isRefreshing: payoutsLoading && payoutsInitialized,
    refresh: refreshPayouts,
  };
}
