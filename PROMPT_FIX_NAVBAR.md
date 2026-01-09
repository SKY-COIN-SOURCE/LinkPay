# PROMPT: Arreglar fondo de barra de navegación móvil

## PROBLEMA
La barra de navegación móvil (`.lp-mobile-nav`) tiene un fondo que empieza **antes** que los botones. El fondo debería empezar **exactamente donde terminan los botones** (a ras del borde inferior de los botones), no antes.

**Archivo a modificar:** `apps/web/src/components/layout/AppLayout.tsx`

## CONTEXTO ACTUAL
- `.lp-mobile-nav` está en `position: fixed; bottom: 0;` con `background: transparent`
- `.lp-mobile-nav-inner` tiene:
  - `background: rgba(2, 6, 23, 0.88)`
  - `backdrop-filter: blur(18px)`
  - `padding: 8px 18px calc(env(safe-area-inset-bottom, 14px) + 10px) 18px`
  - `min-height: 64px`
- `.lp-mobile-item` tiene `min-height: 54px` y `padding: 6px 2px`

## PROBLEMA ESPECÍFICO
El `padding-top: 8px` de `.lp-mobile-nav-inner` hace que el fondo empiece 8px antes que los botones. El fondo debería empezar exactamente donde empiezan los botones (sin padding-top que cree espacio antes del fondo).

## SOLUCIÓN REQUERIDA
1. **Eliminar el padding-top** de `.lp-mobile-nav-inner` o reducirlo a 0
2. **Ajustar el padding-bottom** si es necesario para mantener el espaciado correcto
3. **Asegurar que el fondo empiece exactamente donde empiezan los botones** (a ras del borde superior de los botones)
4. **Mantener el safe-area-inset-bottom** para dispositivos con notch/home indicator

## RESULTADO ESPERADO
- El fondo de la barra de navegación empieza exactamente donde empiezan los botones
- No hay espacio visible del fondo antes de los botones
- Los botones mantienen su espaciado y posición correcta
- El safe-area-inset-bottom se respeta

## CÓDIGO ACTUAL (líneas 619-631)
```css
.lp-mobile-nav-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(2, 6, 23, 0.88);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  padding: 8px 18px calc(env(safe-area-inset-bottom, 14px) + 10px) 18px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: none;
  margin: 0;
  min-height: 64px;
}
```

## SOLUCIÓN SUGERIDA
Cambiar el padding para que el fondo empiece exactamente donde empiezan los botones:
- `padding-top: 0` (o eliminar del shorthand)
- Mantener `padding-bottom` con safe-area-inset
- Ajustar `min-height` si es necesario para que coincida con la altura real de los botones

## VERIFICACIÓN
Después del cambio, el fondo debe:
- ✅ Empezar exactamente donde empiezan los botones (sin espacio arriba)
- ✅ Terminar donde terminan los botones (respetando safe-area-inset-bottom)
- ✅ No "comerse" parte de la pantalla arriba de los botones

