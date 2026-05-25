# Cambios realizados

## Rediseño visual premium morado

Se ha aplicado una nueva estética inspirada en la referencia aportada, pero reinterpretada para que no sea una copia directa:

- Nueva paleta morada premium con fondos claros, cristal, degradados y sombras suaves.
- Nuevo logo visual de Sitea.ai con icono circular morado y acabado más tecnológico.
- Nuevo hero principal con esfera/orbe generado por CSS, líneas de energía moradas y estructura similar a la referencia.
- Botones rediseñados con efecto cristal, degradado morado y apariencia más premium.
- Cabecera pública rediseñada para mantener la estructura: logo, navegación, precios, FAQ e ir al panel.
- Landing completa actualizada: hero, cómo funciona, ventajas, ejemplos, precios, FAQ y CTA final.
- Página de precios rediseñada con la misma estética.
- Previsualizaciones de webs actualizadas para que encajen mejor con la identidad morada.
- App shell / panel privado actualizado a la nueva estética para que el interior no se vea desconectado de la landing.
- Login, registro y pantallas internas mantienen su estructura funcional, pero reciben la nueva paleta global.

## Elementos mantenidos

- Se mantiene la estructura funcional del proyecto.
- Se mantienen los planes Base, Pro y Premium con sus créditos: 50, 300 y 1000.
- Se mantiene la separación entre creación de webs y publicación opcional.
- Se mantiene la preparación para Supabase, OpenAI, Stripe, dominios y publicación.

## Pendiente externo

Después de instalar esta versión, el siguiente paso sigue siendo conectar Supabase mediante `.env.local` y cargar/validar las tablas necesarias.

## Actualización de previsualizaciones simuladas

Se ha sustituido la miniatura genérica de colores por previsualizaciones simuladas mucho más realistas:

- Cada tarjeta muestra una mini web distinta con cabecera, dominio, navegación, hero, CTA, bloques internos y pie de estado.
- Se han creado previews específicas para yoga, clínica/negocio local, web premium, despacho legal, electricista, estética/reservas, asesoría, entrenador personal y restaurante.
- Las previsualizaciones están hechas con componentes y CSS, sin depender de imágenes externas ni archivos pesados.
- La misma mejora se aplica automáticamente en la landing, página de precios y panel de facturación, porque reutilizan el componente `WebsiteMiniPreview`.

## Corrección apertura de proyectos guardados

- Corregida la lectura de `projectId` en la ruta `/app/generator` para TanStack Router.
- Antes, al abrir un proyecto desde el listado, el generador podía no detectar el `projectId` porque `location.search` llegaba como objeto y no como string.
- Ahora el generador carga correctamente proyectos guardados desde el listado, manteniendo prompt, datos editables, dominio/publicación y previsualización inferida.
