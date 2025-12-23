# PROMPT: Arreglar Botón "Mis Enlaces" que Desaparece en Móvil

## 🚨 PROBLEMA CRÍTICO

**Síntoma:** En dispositivos móviles, cuando el usuario hace clic en el botón "Mis Enlaces" para desplegar el dropdown, el botón **desaparece completamente** de la pantalla. El dropdown se muestra, pero el botón toggle no es visible, impidiendo que el usuario pueda cerrar el menú.

**Ubicación del código:**
- Componente: `/apps/web/src/pages/app/DashboardPage.tsx` (líneas 909-934)
- Estilos: `/apps/web/src/pages/app/Dashboard.css` (líneas 1024-1069)

## 📋 CONTEXTO TÉCNICO

### Estructura Actual

```tsx
<motion.div
  ref={linksSectionRef}
  className="lp-d2-links-section"
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.3 }}
>
  <button
    className="lp-d2-links-toggle"
    onClick={() => setLinksExpanded(!linksExpanded)}
    // ... props
  >
    <LinkIcon size={18} />
    <span>Mis Enlaces</span>
    <span className="lp-d2-links-count">{links.length}</span>
    {linksExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
  </button>

  <AnimatePresence>
    {linksExpanded && (
      <motion.div
        ref={linksDropdownRef}
        className="lp-d2-links-list"
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        // ... animación
      >
        {/* Contenido del dropdown */}
      </motion.div>
    )}
  </AnimatePresence>
</motion.div>
```

### Estilos CSS Actuales

```css
.lp-d2-links-section {
  position: relative;
  z-index: 1;
  overflow: visible;
  overflow-x: hidden;
  /* ... */
}

.lp-d2-links-toggle {
  position: relative;
  z-index: 999;
  visibility: visible !important;
  opacity: 1 !important;
  display: flex !important;
  isolation: isolate;
  /* ... */
}

.lp-d2-links-list {
  position: relative;
  z-index: 1;
  /* ... */
}
```

## 🔍 ANÁLISIS DEL PROBLEMA

### Posibles Causas

1. **Stacking Context Issues:** El `motion.div` padre puede estar creando un nuevo stacking context que afecta el z-index del botón.

2. **Overflow Hidden en Contenedores Padre:** Algún contenedor padre (`.lp-dashboard-2`, `.lp-dashboard-shell`) puede tener `overflow: hidden` que corta el botón.

3. **Animaciones de Framer Motion:** Las animaciones del `motion.div` padre pueden estar afectando la visibilidad del botón hijo.

4. **Transform/Opacity en Animaciones:** Las propiedades `transform` o `opacity` en animaciones pueden crear nuevos stacking contexts.

5. **Mobile-Specific CSS:** Los estilos responsive pueden estar ocultando el botón en móvil.

6. **Height Animation:** La animación `height: 'auto'` del dropdown puede estar causando reflows que ocultan el botón.

## ✅ SOLUCIÓN REQUERIDA

### Requisitos Técnicos

1. **El botón DEBE estar siempre visible:**
   - Antes de abrir el dropdown
   - Durante la animación de apertura
   - Cuando el dropdown está abierto
   - Durante la animación de cierre
   - Después de cerrar el dropdown

2. **Funcionamiento en todos los dispositivos:**
   - Desktop (Chrome, Firefox, Safari)
   - Mobile (iOS Safari, Chrome Mobile)
   - Tablets

3. **No romper funcionalidad existente:**
   - El dropdown debe seguir funcionando correctamente
   - Las animaciones deben seguir siendo suaves
   - El scroll debe funcionar correctamente
   - El cálculo de altura del dashboard debe seguir funcionando

### Estrategias Recomendadas

#### Opción 1: Separar el Botón del Contenedor Animado
```tsx
{/* Botón FUERA del motion.div */}
<button className="lp-d2-links-toggle" ...>
  ...
</button>

<motion.div className="lp-d2-links-section" ...>
  <AnimatePresence>
    {linksExpanded && (
      <motion.div className="lp-d2-links-list" ...>
        ...
      </motion.div>
    )}
  </AnimatePresence>
</motion.div>
```

#### Opción 2: Usar Position Sticky/Fixed para el Botón
```css
.lp-d2-links-toggle {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: rgba(15, 23, 42, 0.95); /* Fondo sólido para que no se vea contenido detrás */
  /* ... */
}
```

#### Opción 3: Eliminar Animaciones del Contenedor Padre
```tsx
{/* Sin animaciones en el contenedor padre */}
<div ref={linksSectionRef} className="lp-d2-links-section">
  <button ...>...</button>
  <AnimatePresence>...</AnimatePresence>
</div>
```

#### Opción 4: Usar Portal para el Botón (último recurso)
Renderizar el botón en un portal fuera del árbol DOM del dropdown.

### Checklist de Verificación

- [ ] El botón es visible en Desktop (Chrome, Firefox, Safari)
- [ ] El botón es visible en Mobile iOS (Safari)
- [ ] El botón es visible en Mobile Android (Chrome)
- [ ] El botón permanece visible cuando el dropdown está abierto
- [ ] El botón funciona correctamente (abre/cierra el dropdown)
- [ ] Las animaciones siguen siendo suaves
- [ ] No hay scroll bleed
- [ ] No hay layout shift
- [ ] El código es limpio y mantenible
- [ ] No hay errores en la consola
- [ ] No hay warnings de React

## 🧪 TESTING

### Casos de Prueba

1. **Abrir dropdown en móvil:**
   - El botón debe permanecer visible
   - El dropdown debe aparecer debajo del botón
   - El usuario debe poder hacer scroll

2. **Cerrar dropdown en móvil:**
   - El botón debe permanecer visible durante la animación
   - El dropdown debe cerrarse correctamente
   - El botón debe seguir visible después de cerrar

3. **Múltiples aperturas/cierres:**
   - El botón debe permanecer visible en todas las iteraciones
   - No debe haber degradación de rendimiento

4. **Diferentes tamaños de pantalla:**
   - iPhone SE (375px)
   - iPhone 12/13/14 (390px)
   - iPhone 14 Pro Max (430px)
   - iPad (768px)
   - Desktop (1920px)

## 📝 NOTAS ADICIONALES

- El proyecto usa **Framer Motion** para animaciones
- El proyecto usa **React 18+**
- El proyecto usa **TypeScript**
- Los estilos están en CSS (no CSS-in-JS)
- Hay un sistema de padding dinámico que extiende el dashboard cuando el dropdown está abierto (líneas 172-247 de DashboardPage.tsx)

## 🎯 CRITERIOS DE ÉXITO

**La solución es exitosa cuando:**
1. El botón "Mis Enlaces" **NUNCA** desaparece en ningún dispositivo
2. El botón funciona correctamente (abre/cierra el dropdown)
3. No se rompe ninguna funcionalidad existente
4. El código es limpio y fácil de mantener
5. No hay regresiones visuales o funcionales

## 🔧 ARCHIVOS A MODIFICAR

1. `/apps/web/src/pages/app/DashboardPage.tsx` (líneas 909-934 aproximadamente)
2. `/apps/web/src/pages/app/Dashboard.css` (líneas 1024-1069 aproximadamente)

## 💡 PISTAS

- Revisa si hay `overflow: hidden` en contenedores padre
- Revisa si hay `transform` o `opacity` que creen nuevos stacking contexts
- Considera usar `position: sticky` para el botón
- Considera separar el botón del contenedor animado
- Usa las DevTools del navegador para inspeccionar el z-index y stacking contexts
- Prueba en dispositivos reales, no solo en el emulador del navegador

---

**Prioridad:** CRÍTICA - Bloquea funcionalidad en móvil
**Tiempo estimado:** 2-4 horas
**Dificultad:** Media-Alta (requiere entender stacking contexts, animaciones CSS, y Framer Motion)
