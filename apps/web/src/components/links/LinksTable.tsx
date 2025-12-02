// src/components/links/LinksTable.tsx
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useAuth } from '../../context/AuthContext';

type LinksTableProps = {
  limit?: number;
};

type LinkRow = {
  id: string;
  slug: string;
  original_url: string;
  created_at: string;
};

export function LinksTable({ limit }: LinksTableProps) {
  const { user } = useAuth();
  const [links, setLinks] = useState<LinkRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLinks = async () => {
      if (!user) return;
      setLoading(true);

      let query = supabase
        .from('links')
        .select('id, slug, original_url, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;

      if (error) {
        console.error(error);
        setLinks([]);
      } else {
        setLinks(data as LinkRow[]);
      }

      setLoading(false);
    };

    fetchLinks();
  }, [user, limit]);

  if (!user) {
    return null;
  }

  if (loading) {
    return <p className="text-sm text-gray-500">Cargando links...</p>;
  }

  if (links.length === 0) {
    return (
      <p className="text-sm text-gray-500">
        Todavía no has creado ningún link. Empieza arriba creando tu primer LinkPay.
      </p>
    );
  }

  const origin = window.location.origin;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left text-xs text-gray-500 border-b">
            <th className="py-2 pr-4">Link original</th>
            <th className="py-2 pr-4">LinkPay</th>
            <th className="py-2 pr-4">Creado</th>
          </tr>
        </thead>
        <tbody>
          {links.map(link => {
            const shortUrl = `${origin}/l/${link.slug}`;
            return (
              <tr key={link.id} className="border-b last:border-b-0">
                <td className="py-2 pr-4 max-w-xs truncate text-gray-700">
                  <a
                    href={link.original_url}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline"
                  >
                    {link.original_url}
                  </a>
                </td>
                <td className="py-2 pr-4 text-blue-600">
                  <button
                    type="button"
                    className="text-xs underline"
                    onClick={() => navigator.clipboard.writeText(shortUrl)}
                  >
                    {shortUrl}
                  </button>
                </td>
                <td className="py-2 pr-4 text-xs text-gray-500">
                  {new Date(link.created_at).toLocaleString()}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
