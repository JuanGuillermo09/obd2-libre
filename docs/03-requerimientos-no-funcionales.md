# Requerimientos No Funcionales

> **Proyecto:** OBD2 Libre (nombre provisional) · **Versión:** 1.0

**Prioridad (MoSCoW):** **M** = Debe tener · **S** = Debería tener · **C** = Podría tener

---

## 1. Rendimiento

| ID | Requerimiento | Métrica | Prioridad |
|---|---|---|---|
| RNF-01 | La página de una ficha debe cargar rápido en redes móviles lentas. | Contenido visible en < 3 s en 3G; LCP < 2,5 s | M |
| RNF-02 | El peso de una página de ficha debe ser reducido. | < 200 KB sin imágenes (objetivo) | S |
| RNF-03 | La búsqueda debe responder de forma instantánea. | Resultados en < 300 ms | M |
| RNF-04 | El sitio debe aprovechar caché y CDN. | Recursos estáticos con caché de larga duración | S |

## 2. Usabilidad y accesibilidad

| ID | Requerimiento | Métrica | Prioridad |
|---|---|---|---|
| RNF-05 | Diseño **Mobile-First** y responsive. | Funcional desde 320 px de ancho | M |
| RNF-06 | Uso cómodo con una mano y en entornos de taller (manos sucias, poca luz). | Botones táctiles ≥ 44 px; buen contraste; modo oscuro | S |
| RNF-07 | Lenguaje sencillo, en español, evitando tecnicismos innecesarios. | Revisión editorial por ficha | M |
| RNF-08 | Obtener respuesta en pocos pasos. | Código → ficha en máximo 2 interacciones | M |
| RNF-09 | Cumplir pautas básicas de accesibilidad. | WCAG 2.1 nivel AA (objetivo) | S |
| RNF-10 | No exigir registro ni datos personales para consultar. | 0 campos obligatorios | M |

## 3. SEO y visibilidad

| ID | Requerimiento | Métrica | Prioridad |
|---|---|---|---|
| RNF-11 | Cada ficha debe poder ser indexada por buscadores con contenido único. | HTML renderizado en el servidor o generado de forma estática | M |
| RNF-12 | URLs limpias, títulos y meta descripciones únicos por ficha. | 100% de las fichas | M |
| RNF-13 | Datos estructurados y mapa del sitio. | `sitemap.xml`, schema.org cuando aplique | S |
| RNF-14 | Vocabulario regional variado (carro, coche, auto) en el contenido. | Revisión editorial | C |

## 4. Disponibilidad y confiabilidad

| ID | Requerimiento | Métrica | Prioridad |
|---|---|---|---|
| RNF-15 | El sitio debe estar disponible de forma estable. | ≥ 99% mensual (objetivo) | S |
| RNF-16 | No depender de servicios que se "duermen" o pausan por inactividad. | Sin tiempos de arranque en frío perceptibles | M |
| RNF-17 | Debe haber respaldo del contenido. | Contenido versionado en repositorio | M |
| RNF-18 | Idealmente, la consulta básica debe funcionar con conectividad intermitente. | Caché del navegador / PWA (opcional) | C |

## 5. Seguridad y privacidad

| ID | Requerimiento | Métrica | Prioridad |
|---|---|---|---|
| RNF-19 | Todo el tráfico debe usar HTTPS. | 100% | M |
| RNF-20 | Formularios de sugerencias protegidos contra spam y abuso. | Captcha ligero, límite de envíos o validación | M |
| RNF-21 | Panel de administración (si existe) con autenticación y permisos. | Solo personal autorizado | M |
| RNF-22 | Recolectar la mínima información posible. | Sin cuentas; analítica respetuosa de la privacidad | M |
| RNF-23 | Cumplir la normativa colombiana de protección de datos (Ley 1581 de 2012) si se recolectan datos personales. | Política de privacidad | S |
| RNF-24 | Sin publicidad invasiva ni rastreadores de terceros innecesarios. | 0 anuncios intrusivos | M |

## 6. Calidad y confiabilidad del contenido

| ID | Requerimiento | Métrica | Prioridad |
|---|---|---|---|
| RNF-25 | Toda ficha debe seguir la misma plantilla. | Validación automática del esquema | M |
| RNF-26 | Una ficha solo es `revisado` tras validación humana por alguien con experiencia mecánica. | 100% de las marcadas como revisadas | M |
| RNF-27 | El contenido debe ser original y no copiar textos protegidos. | Redacción propia, revisión de fuentes | M |
| RNF-28 | Debe mostrarse un aviso visible de uso orientativo y descargo de responsabilidad. | En todas las fichas | M |
| RNF-29 | Las causas deben ordenarse por frecuencia con un criterio documentado. | Criterio descrito en la guía de contribución | S |

## 7. Legal y licencias

| ID | Requerimiento | Métrica | Prioridad |
|---|---|---|---|
| RNF-30 | Respetar y mostrar la atribución de las licencias de datos utilizadas (ej. MIT de la base de códigos). | Página de créditos y aviso en repositorio | M |
| RNF-31 | Evitar dependencias con licencias que obliguen a cambiar la licencia del proyecto (GPL/AGPL) sin decisión consciente. | Revisión de licencias | M |
| RNF-32 | El proyecto debe declarar su propia licencia (código y contenido). | Archivos `LICENSE` en el repo | M |

## 8. Mantenibilidad y escalabilidad

| ID | Requerimiento | Métrica | Prioridad |
|---|---|---|---|
| RNF-33 | Código y contenido en un repositorio abierto con documentación clara. | README, guía de contribución | M |
| RNF-34 | Agregar una nueva ficha o marca no debe requerir cambios de código. | Solo agregar datos | S |
| RNF-35 | Arquitectura simple y modular para facilitar que otros colaboren. | Pocas piezas y bien documentadas | S |
| RNF-36 | Proceso automatizado de pruebas y despliegue. | CI/CD (GitHub Actions u otro) | C |
| RNF-37 | El sistema debe crecer de cientos a miles de fichas sin degradarse. | Búsqueda y compilación estables con 5.000+ fichas | S |

## 9. Costos

| ID | Requerimiento | Métrica | Prioridad |
|---|---|---|---|
| RNF-38 | Costo operativo cercano a cero. | Alojamiento estático o capas gratuitas | M |
| RNF-39 | Evitar proveedores con riesgo de suspensión o pausa de capas gratuitas para componentes críticos. | Revisión de condiciones | S |

## 10. Compatibilidad

| ID | Requerimiento | Métrica | Prioridad |
|---|---|---|---|
| RNF-40 | Debe funcionar en navegadores móviles y de escritorio modernos. | Chrome, Safari, Firefox, Edge (últimas 2 versiones) | M |
| RNF-41 | Debe funcionar en celulares de gama baja. | Probado en dispositivos Android económicos | S |
