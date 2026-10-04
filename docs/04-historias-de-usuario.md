# Historias de Usuario

> **Proyecto:** OBD2 Libre (nombre provisional) · **Versión:** 1.0

**Formato:** *Como [rol], quiero [acción], para [beneficio].*
**Prioridad:** **Alta** = MVP · **Media** = después del MVP · **Baja** = futuro

---

## Roles

| Rol | Descripción |
|---|---|
| **Mecánico** | Trabaja en un taller independiente y consulta desde el celular mientras escanea un carro. |
| **Estudiante** | Aprende mecánica y quiere entender el porqué de cada falla. |
| **Aficionado** | Dueño de un carro que vio una luz de "check engine". |
| **Revisor** | Mecánico con experiencia que valida el contenido. |
| **Colaborador** | Persona que sugiere correcciones o aporta información. |
| **Administrador** | Gestiona el contenido y el sitio. |

---

## Épica 1 — Consultar un código

### HU-01 · Buscar un código
**Como** mecánico, **quiero** escribir un código (ej. P0300) y ver su ficha al instante, **para** diagnosticar sin perder tiempo. · **Prioridad:** Alta

**Criterios de aceptación**
- [ ] Puedo escribir el código en mayúsculas o minúsculas.
- [ ] Veo sugerencias mientras escribo.
- [ ] Llego a la ficha con máximo 2 toques.
- [ ] No me piden registro ni datos personales.

### HU-02 · Entender el código en lenguaje sencillo
**Como** aficionado, **quiero** una explicación "en cristiano", **para** entender qué le pasa a mi carro sin saber de mecánica. · **Prioridad:** Alta

**Criterios de aceptación**
- [ ] La explicación evita tecnicismos o los define en palabras simples.
- [ ] Está escrita en español neutro, comprensible en Colombia.
- [ ] Aparece al inicio de la ficha, antes de los detalles técnicos.

### HU-03 · Saber si puedo seguir manejando
**Como** aficionado, **quiero** saber si es seguro seguir manejando, **para** decidir si voy al taller de inmediato. · **Prioridad:** Alta

**Criterios de aceptación**
- [ ] La ficha muestra un indicador claro: *sí*, *con precaución* o *no*.
- [ ] Se muestra la gravedad (baja, media, alta).
- [ ] Hay una breve justificación del indicador.

### HU-04 · Ver causas ordenadas por frecuencia
**Como** mecánico, **quiero** las causas probables de la más a la menos frecuente, **para** revisar primero lo más probable. · **Prioridad:** Alta

**Criterios de aceptación**
- [ ] Las causas aparecen en una lista ordenada.
- [ ] Cada causa tiene una breve descripción.
- [ ] Se indica el criterio de orden en la guía del sitio.

### HU-05 · Seguir pasos de diagnóstico
**Como** estudiante, **quiero** una secuencia de pasos de diagnóstico, **para** aprender un método ordenado de revisión. · **Prioridad:** Alta

**Criterios de aceptación**
- [ ] Los pasos están numerados y en orden lógico.
- [ ] Cada paso es breve y accionable.
- [ ] Se incluye una advertencia de seguridad cuando aplique.

### HU-06 · Ver los síntomas típicos
**Como** aficionado, **quiero** ver los síntomas asociados al código, **para** confirmar que coinciden con lo que siente mi carro. · **Prioridad:** Alta

**Criterios de aceptación**
- [ ] Se lista al menos 3 síntomas frecuentes (cuando existan).
- [ ] Están escritos en lenguaje cotidiano.

### HU-07 · Buscar por síntoma o palabra clave
**Como** aficionado, **quiero** buscar por palabras como "tironea" o "mezcla pobre", **para** encontrar el código aunque no lo conozca bien. · **Prioridad:** Media

**Criterios de aceptación**
- [ ] La búsqueda acepta palabras en español.
- [ ] Muestra resultados relevantes ordenados.
- [ ] Si no hay resultados, sugiere alternativas.

### HU-08 · Código no encontrado
**Como** mecánico, **quiero** un mensaje claro si el código no está documentado, **para** no perder tiempo y poder pedir que lo agreguen. · **Prioridad:** Alta

**Criterios de aceptación**
- [ ] Se muestra un mensaje amable y claro.
- [ ] Hay un botón para sugerir el código.
- [ ] Se ofrecen códigos parecidos cuando sea posible.

---

## Épica 2 — Confianza en la información

### HU-09 · Ver si la ficha fue revisada
**Como** mecánico, **quiero** ver si un profesional revisó la ficha, **para** saber cuánto puedo confiar en ella. · **Prioridad:** Alta

**Criterios de aceptación**
- [ ] Cada ficha muestra su estado: `borrador` o `revisado`.
- [ ] Se muestra la fecha de última actualización.
- [ ] Las fichas en borrador tienen un aviso visible.

### HU-10 · Ver el aviso de uso orientativo
**Como** usuario, **quiero** saber que la información es orientativa, **para** no tomarla como diagnóstico definitivo. · **Prioridad:** Alta

**Criterios de aceptación**
- [ ] El aviso aparece en todas las fichas.
- [ ] El texto es breve y no ocupa mucho espacio.

---

## Épica 3 — Marcas y vehículos

### HU-11 · Ver causas comunes en mi marca
**Como** mecánico, **quiero** ver las fallas típicas de mi marca para ese código (ej. Chevrolet Spark), **para** acortar el diagnóstico. · **Prioridad:** Media

**Criterios de aceptación**
- [ ] Puedo seleccionar la marca desde la ficha o la búsqueda.
- [ ] Si hay información de la marca, aparece en la sección "En tu carro".
- [ ] Si no la hay, se muestra el contenido general sin errores.

### HU-12 · Saber si mi carro es compatible con OBD2
**Como** aficionado, **quiero** saber si mi carro se puede escanear y con qué escáner, **para** no comprar un equipo equivocado. · **Prioridad:** Media

**Criterios de aceptación**
- [ ] Existe una guía simple, con ejemplos de años y protocolos.
- [ ] La guía indica que carros anteriores a cierta fecha pueden ser distintos.

### HU-13 · Ver códigos específicos de fabricante
**Como** mecánico, **quiero** consultar códigos propios de una marca, **para** entender fallas que no son genéricas. · **Prioridad:** Baja

**Criterios de aceptación**
- [ ] Los códigos de fabricante indican a qué marca pertenecen.
- [ ] Si un código varía entre marcas, se muestran las diferencias.

---

## Épica 4 — Experiencia móvil

### HU-14 · Usarlo bien desde el celular en el taller
**Como** mecánico, **quiero** que el sitio sea rápido y cómodo en mi celular, **para** consultarlo mientras trabajo. · **Prioridad:** Alta

**Criterios de aceptación**
- [ ] Carga en menos de 3 s en una conexión 3G.
- [ ] Los botones son grandes y fáciles de tocar.
- [ ] El texto se lee bien con sol o poca luz (buen contraste).
- [ ] Funciona desde 320 px de ancho.

### HU-15 · Encontrar la ficha desde Google
**Como** aficionado, **quiero** encontrar la explicación al buscar "código P0420 qué significa", **para** llegar directo sin saber que existe el sitio. · **Prioridad:** Alta

**Criterios de aceptación**
- [ ] Cada código tiene una URL única (`/codigos/p0420`).
- [ ] Cada ficha tiene título y descripción únicos.
- [ ] El contenido es visible para los buscadores sin ejecutar scripts pesados.

---

## Épica 5 — Comunidad

### HU-16 · Sugerir una corrección
**Como** colaborador, **quiero** reportar un error o proponer una mejora, **para** que el contenido sea cada vez mejor. · **Prioridad:** Alta

**Criterios de aceptación**
- [ ] Puedo enviar una sugerencia sin crear cuenta (formulario o GitHub).
- [ ] Recibo confirmación de que se envió.
- [ ] El formulario tiene protección contra spam.

### HU-17 · Aportar información de mi marca
**Como** mecánico con experiencia en una marca, **quiero** compartir fallas típicas con mis propias palabras, **para** ayudar a otros. · **Prioridad:** Media

**Criterios de aceptación**
- [ ] Hay una guía clara de cómo redactar un aporte.
- [ ] Se aclara que no deben copiarse textos de manuales protegidos.
- [ ] El aporte pasa por revisión antes de publicarse.

### HU-18 · Reconocimiento a colaboradores
**Como** colaborador, **quiero** que se reconozca mi aporte, **para** sentirme parte del proyecto. · **Prioridad:** Baja

**Criterios de aceptación**
- [ ] Existe una página de agradecimientos o créditos.
- [ ] El colaborador decide si quiere aparecer.

---

## Épica 6 — Revisión y administración

### HU-19 · Revisar y aprobar fichas
**Como** revisor, **quiero** marcar qué está bien, qué está mal y qué falta en una ficha, **para** que pase a estado `revisado`. · **Prioridad:** Alta

**Criterios de aceptación**
- [ ] Puedo ver las fichas en borrador en una lista.
- [ ] Puedo aprobar o devolver una ficha con comentarios.
- [ ] Queda registrado quién la revisó y cuándo.

### HU-20 · Importar la lista base de códigos
**Como** administrador, **quiero** importar los códigos genéricos desde una fuente con licencia compatible, **para** no escribirlos uno por uno. · **Prioridad:** Alta

**Criterios de aceptación**
- [ ] El proceso toma código y nombre técnico de la fuente.
- [ ] Se conserva la atribución al autor original.
- [ ] Se pueden filtrar solo los códigos genéricos.

### HU-21 · Gestionar fichas
**Como** administrador, **quiero** crear, editar y cambiar el estado de las fichas, **para** mantener el contenido actualizado. · **Prioridad:** Media

**Criterios de aceptación**
- [ ] Cada ficha se valida contra la plantilla antes de publicarse.
- [ ] Puedo ocultar una ficha sin borrarla.
- [ ] Los cambios quedan versionados.

### HU-22 · Moderar sugerencias
**Como** administrador, **quiero** revisar las sugerencias recibidas antes de publicarlas, **para** evitar contenido incorrecto o spam. · **Prioridad:** Media

**Criterios de aceptación**
- [ ] Veo una lista de sugerencias pendientes.
- [ ] Puedo aceptar, rechazar o pedir cambios.

---

## Épica 7 — Sostenibilidad y transparencia

### HU-23 · Apoyar el proyecto
**Como** usuario agradecido, **quiero** poder donar de forma voluntaria, **para** ayudar a mantener el sitio gratis. · **Prioridad:** Media

**Criterios de aceptación**
- [ ] Hay un botón discreto de donación (Ko-fi o PayPal).
- [ ] No bloquea ni interrumpe la consulta.
- [ ] Queda claro que el uso del sitio es gratuito.

### HU-24 · Conocer las fuentes y licencias
**Como** colaborador o desarrollador, **quiero** ver de dónde vienen los datos y bajo qué licencia, **para** confiar en el proyecto y poder reutilizarlo. · **Prioridad:** Alta

**Criterios de aceptación**
- [ ] Existe una página de créditos con las fuentes y licencias.
- [ ] El repositorio incluye su propio archivo `LICENSE`.

---

## Resumen de prioridades

| Prioridad | Historias |
|---|---|
| **Alta (MVP)** | HU-01, 02, 03, 04, 05, 06, 08, 09, 10, 14, 15, 16, 19, 20, 24 |
| **Media** | HU-07, 11, 12, 17, 21, 22, 23 |
| **Baja** | HU-13, 18 |
