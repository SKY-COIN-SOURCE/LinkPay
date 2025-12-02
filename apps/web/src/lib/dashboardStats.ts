// src/lib/dashboardStats.ts
import { supabase } from "./supabaseClient";
import { CPC_EUROS } from "../config/economy";

/**
 * Obtiene estadísticas reales del dashboard para un usuario.
 */
export async function getDashboardStats(userId: string) {
  const today = new Date();
  // Ponemos la hora a las 00:00 para contar solo clics "de hoy"
  today.setHours(0, 0, 0, 0);

  // -----------------------------
  // 1) LINKS ACTIVOS DEL USUARIO
  // -----------------------------
  const { data: links, error: linksError } = await supabase
    .from("links")
    .select("id, slug, original_url, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (linksError) {
    console.error("Error cargando links:", linksError);
  }

  const linkIds = links?.map((l) => l.id) ?? [];

  // -----------------------------
  // 2) CLICS HOY
  // -----------------------------
  let clicksToday = 0;

  if (linkIds.length > 0) {
    const { count, error: clicksError } = await supabase
      .from("clicks")
      .select("*", { count: "exact", head: true })
      .in("link_id", linkIds)
      .gte("created_at", today.toISOString());

    if (clicksError) {
      console.error("Error contando clics:", clicksError);
    }

    clicksToday = count ?? 0;
  }

  // -----------------------------
  // 3) GANANCIAS HOY
  // -----------------------------
  const revenueToday = clicksToday * CPC_EUROS;

  // -----------------------------
  // 4) ÚLTIMOS 5 LINKS
  // -----------------------------
  const lastLinks = links?.slice(0, 5) ?? [];

  return {
    clicksToday,
    revenueToday,
    activeLinks: links?.length ?? 0,
    lastLinks,
  };
}
