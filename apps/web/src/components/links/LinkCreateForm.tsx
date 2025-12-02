import { FormEvent, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useAuth } from '../../context/AuthContext';

type Props = {
  onCreated?: () => void;
};

function randomSlug() {
  return Math.random().toString(36).substring(2, 8);
}

export function LinkCreateForm({ onCreated }: Props) {
  const { user } = useAuth();
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shortUrl, setShortUrl] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setShortUrl(null);

    if (!user) {
      setError('Debes iniciar sesión.');
      return;
    }

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      setError('La URL debe empezar por http:// o https://');
      return;
    }

    setLoading(true);

    try {
      let slug = randomSlug();
      let ok = false;

      // Intentamos hasta que el slug sea único
      for (let i = 0; i < 5; i++) {
        const { error: insertError } = await supabase.from('links').insert({
          user_id: user.id,
          original_url: url,
          slug,
        });

        if (!insertError) {
          ok = true;
          break;
        }

        // si choca el slug, generamos otro
        slug = randomSlug();
      }

      if (!ok) {
        setError('No se ha podido generar un link único. Inténtalo de nuevo.');
        return;
      }

      const origin = window.location.origin;
      const finalShortUrl = `${origin}/l/${slug}`;

      setShortUrl(finalShortUrl);
      setUrl('');

      if (onCreated) {
        onCreated();
      }
    } catch (err: any) {
      console.error(err);
      setError('Ha ocurrido un error al crear el link.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="space-y-1">
        <label className="text-xs font-medium text-gray-600">
          Pega aquí tu enlace original
        </label>
        <input
          type="url"
          required
          placeholder="https://youtu.be/..."
          className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white rounded-lg py-2 text-sm font-medium hover:bg-blue-700 transition disabled:opacity-60"
      >
        {loading ? 'Creando link...' : 'Convertir'}
      </button>

      {shortUrl && (
        <div className="mt-3 border rounded-lg px-3 py-2 bg-slate-50">
          <p className="text-xs text-gray-500 mb-1">Tu link de LinkPay:</p>
          <div className="flex items-center gap-2">
            <input
              readOnly
              className="flex-1 bg-transparent text-xs text-gray-800"
              value={shortUrl}
              onFocus={(e) => e.currentTarget.select()}
            />
            <button
              type="button"
              className="text-xs px-2 py-1 rounded-md border hover:bg-slate-100"
              onClick={() => navigator.clipboard.writeText(shortUrl)}
            >
              Copiar
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
