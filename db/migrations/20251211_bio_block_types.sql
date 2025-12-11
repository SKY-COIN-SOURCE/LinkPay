-- =============================================================================
-- MIGRACIÓN: Añadir block_type y link_type a bio_links
-- Ejecutar en Supabase SQL Editor
-- =============================================================================

-- Añadir columna block_type para bloques especiales (header, divider, spotlight)
ALTER TABLE bio_links 
ADD COLUMN IF NOT EXISTS block_type TEXT DEFAULT 'link';

-- Añadir columna link_type para tipos de monetización
ALTER TABLE bio_links 
ADD COLUMN IF NOT EXISTS link_type TEXT DEFAULT 'normal';

-- Añadir columna thumbnail_url para miniaturas de enlaces
ALTER TABLE bio_links 
ADD COLUMN IF NOT EXISTS thumbnail_url TEXT;

-- Añadir columna icon para iconos de redes sociales
ALTER TABLE bio_links 
ADD COLUMN IF NOT EXISTS icon TEXT;

-- ============================================
-- VERIFICACIÓN
-- ============================================
-- Ejecuta esto para verificar que todo está correcto:

-- SELECT column_name, data_type, column_default
-- FROM information_schema.columns 
-- WHERE table_name = 'bio_links' 
-- AND column_name IN ('block_type', 'link_type', 'thumbnail_url', 'icon');

-- Si todo está bien, deberías ver 4 filas con las columnas añadidas.
