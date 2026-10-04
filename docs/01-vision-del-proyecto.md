# Visión del Proyecto

> **Nombre provisional:** OBD2 Libre (puede cambiarse; ver opciones al final)
> **Versión:** 1.0 · **Estado:** Borrador

---

## 1. Resumen

Plataforma web **100% gratuita, de acceso libre y pensada primero para el celular (Mobile-First)** que explica los códigos de falla OBD2 (DTC) **en español claro y práctico ("en cristiano")**, con foco inicial en los vehículos más comunes del parque automotor colombiano.

## 2. El problema

- Los manuales de códigos y el software de diagnóstico profesional son **costosos** y suelen exigir suscripciones.
- La mayoría de la información gratuita está **en inglés** o es demasiado técnica y genérica.
- Mecánicos independientes, estudiantes y aficionados necesitan saber **qué significa un código, qué lo causa y qué revisar primero**, muchas veces de pie junto al carro, con el celular y poca señal.

## 3. La solución

Un sitio donde la persona entra, escribe el código (ej. `P0300`), opcionalmente elige la marca, y obtiene de inmediato:

- Qué significa, en lenguaje sencillo.
- Síntomas típicos.
- Causas probables, ordenadas de la más a la menos frecuente.
- Pasos de diagnóstico sugeridos.
- Gravedad y si **se puede seguir manejando** o no.

Sin registro obligatorio, sin muros de pago y sin publicidad invasiva.

## 4. Público objetivo

| Perfil | Necesidad principal |
|---|---|
| Mecánico independiente | Respuesta rápida y confiable en el taller, desde el celular |
| Estudiante de mecánica | Entender el porqué de cada falla, no solo el nombre |
| Aficionado / dueño de carro | Saber si es grave, qué revisar y cuándo ir al taller |

## 5. Propuesta de valor única

1. **Gratis y libre:** el conocimiento no queda bloqueado por una tarjeta de crédito.
2. **En cristiano:** traduce el lenguaje técnico a explicaciones que cualquiera entiende.
3. **Enfocado en Colombia:** prioriza las marcas y fallas típicas del parque automotor local.
4. **Comunitario y transparente:** cada ficha indica si fue **revisada por un mecánico** o sigue en borrador.
5. **Ligero:** carga rápido incluso con conectividad limitada.

## 6. Alcance

### Dentro del alcance (MVP)
- Códigos **genéricos** (P0xxx) más comunes (200–300), con ficha completa en español.
- Búsqueda por código y una página por código (`/codigos/p0300`).
- Aviso de que la información es orientativa.
- Estado de revisión visible en cada ficha (`borrador` / `revisado`).
- Atribución a las fuentes de datos abiertas utilizadas.

### Fuera del alcance (por ahora)
- Aplicación móvil nativa.
- Lectura directa del carro vía escáner Bluetooth.
- Códigos específicos de fabricante para todas las marcas.
- Cuentas de usuario, foros o chat.
- Venta de productos o publicidad invasiva.

## 7. Principios de contenido

- Las explicaciones son **redacción propia**. No se copian textos de manuales ni de otros sitios.
- La base técnica (código + nombre corto) proviene de fuentes con licencia compatible (ej. MIT) y se **atribuye** al autor.
- Todo borrador generado con ayuda de IA **debe ser revisado por una persona**, idealmente un mecánico, antes de marcarse como `revisado`.
- Los datos de marca provienen de la experiencia de mecánicos o de fuentes con acceso legítimo.

## 8. Sostenibilidad

- **Costo objetivo:** cercano a $0, usando alojamiento estático o capas gratuitas.
- **Donaciones voluntarias:** botón discreto de "Cómprame un café" (Ko-fi o PayPal).
- Posible apoyo de talleres o proveedores del sector sin comprometer la independencia ni la gratuidad (a evaluar más adelante).

## 9. Indicadores de éxito

| Indicador | Meta inicial (6 meses) |
|---|---|
| Fichas completas y revisadas | 100 |
| Fichas publicadas (incluye borradores) | 300 |
| Visitas orgánicas mensuales | Por definir tras el lanzamiento |
| Tiempo de carga en 3G | Menos de 3 s |
| Mecánicos colaboradores activos | 3 a 5 |
| Correcciones o sugerencias recibidas de la comunidad | Medible mensualmente |

## 10. Riesgos y mitigación

| Riesgo | Mitigación |
|---|---|
| Información incorrecta que cause un mal diagnóstico | Revisión por mecánicos, estado visible por ficha, aviso de uso orientativo |
| Falta de colaboradores para las marcas | Empezar por genéricos; reclutar 1–2 mecánicos por marca prioritaria |
| Problemas de derechos de autor | Redacción propia, licencias compatibles, atribución clara |
| Costos de infraestructura crecientes | Sitio estático, caché y capas gratuitas |
| Abandono del proyecto | Código abierto, documentación clara, alcance pequeño |

## 11. Hoja de ruta

- [ ] **Fase 0 — Preparación:** nombre, dominio, repositorio, licencia, plantilla de ficha.
- [ ] **Fase 1 — Datos:** importar lista base de códigos genéricos y definir el modelo de datos.
- [ ] **Fase 2 — Contenido MVP:** redactar y revisar las primeras 50 fichas; luego llegar a 200–300.
- [ ] **Fase 3 — Sitio:** páginas por código, búsqueda, diseño Mobile-First, SEO.
- [ ] **Fase 4 — Lanzamiento:** publicación pública, canal de sugerencias, botón de donación.
- [ ] **Fase 5 — Marcas:** sección "en tu carro" para Chevrolet, Renault, Mazda, Kia, Toyota, etc.
- [ ] **Fase 6 — Comunidad:** contribuciones abiertas y códigos de fabricante por marca.

## 12. Nombre del proyecto (opciones)

CódigoCarro · FallaFácil · DTC Fácil · MecaLibre · OBD en Cristiano · OBD2 Libre

*Antes de decidir: verificar dominio (.co/.com), usuario en GitHub y redes, y que no exista otro proyecto con el mismo nombre.*

---

*Proyecto de código abierto desarrollado por un ingeniero de software para la comunidad automotriz.*
