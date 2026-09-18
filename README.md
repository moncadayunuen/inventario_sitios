# OOH Inventory

Aplicación frontend para la gestión de inventario de sitios publicitarios OOH (Out of Home).

El proyecto fue desarrollado como parte de una prueba técnica de **UX/UI + Frontend**, con el objetivo de diseñar e implementar una interfaz capaz de consultar y administrar un inventario de gran volumen, contemplando distintos perfiles de usuario.

## Características

La aplicación trabaja con un inventario simulado de **40,000 sitios publicitarios** y contempla:

- Consulta de inventario.
- Búsqueda de sitios.
- Filtrado por estatus, tipo de estructura, propietario y estado.
- Filtros activos mediante tags.
- Resumen de sitios por estatus.
- Paginación.
- Alta de nuevos sitios.
- Edición de sitios.
- Eliminación con confirmación.
- Vista adaptada de acuerdo con el rol del usuario.
- Panel lateral de filtros colapsable.
- Diseño responsive.

## Roles

La interfaz contempla tres perfiles:

### Dueño de medios

Consulta y administra su inventario de sitios publicitarios.

### Agencia

Consulta y administra los sitios autorizados disponibles para la agencia.

### Marca

Consulta los sitios publicitarios contratados a través de su agencia.

El inventario recibido por el frontend se considera previamente delimitado de acuerdo con los permisos y alcance del usuario.

Por esta razón, los 40,000 registros simulados representan el inventario que el usuario actual puede consultar y no se realiza un filtrado adicional por rol en el frontend.

## Alta de sitios

El registro de un sitio se divide en cinco pasos para reducir la carga cognitiva del formulario:

1. **Identificación**  
   Información general del sitio y propietario.

2. **Ubicación**  
   Dirección y coordenadas geográficas.

3. **Estructura**  
   Características físicas y técnicas del medio.

4. **Comercial**  
   Configuración del formato publicitario.

5. **Revisión**  
   Confirmación de la información antes del registro.

### Información manejada

#### Identificación

- ID del sitio.
- Nombre.
- Propietario.
- Imágenes del sitio.

#### Ubicación

- Latitud.
- Longitud.
- País.
- Estado.
- Municipio.
- Área metropolitana.
- Dirección.
- Referencias.

#### Estructura

- Tipo de estructura.
- Número de caras.
- Alto.
- Largo.
- Diámetro.
- Iluminación.
- Orientación de calle.
- Bloqueo de visibilidad.

#### Comercial

- Tipo de anuncio.
- Duración por spot.
- Spots por hora.

## Inventario

La vista principal está diseñada para facilitar la consulta de un volumen elevado de información.

Se priorizan en la tabla los datos necesarios para identificar rápidamente cada sitio, mientras que información adicional puede consultarse mediante las acciones disponibles.

El panel lateral permite aplicar filtros sin perder el contexto del inventario y puede ocultarse para ampliar el área disponible para la tabla.

## Decisiones UX/UI

### Jerarquía de información

La interfaz separa las tareas principales en tres niveles:

- Resumen del inventario.
- Herramientas de búsqueda y filtrado.
- Tabla de resultados.

Esto permite identificar rápidamente el estado general del inventario antes de trabajar con registros específicos.

### Formularios por pasos

La creación y edición de sitios utiliza un flujo progresivo en lugar de mostrar todos los campos simultáneamente.

Esto permite agrupar información relacionada y mantener formularios más fáciles de recorrer.

### Filtros

Los filtros se encuentran en un panel lateral independiente de la tabla.

El panel puede mostrarse u ocultarse para aprovechar mejor el espacio disponible, mientras que los filtros activos permanecen visibles mediante tags.

### Roles

La interfaz adapta determinados elementos según el perfil activo.

Por ejemplo, para un dueño de medios no es necesario mostrar el propietario como criterio principal de consulta, mientras que para agencias y marcas este dato aporta contexto al inventario.

## Tecnologías

- React
- TypeScript
- Vite
- RSuite
- SCSS
- BEM
- React Icons
- Faker

## Arquitectura

La interfaz se divide en componentes especializados para mantener responsabilidades claras.

```text
src/
├── components/
│   ├── breadcrumb/
│   ├── commercialStep/
│   ├── deleteSiteModal/
│   ├── identificationStep/
│   ├── inventoryFilters/
│   ├── inventorySummary/
│   ├── inventoryTable/
│   ├── locationStep/
│   ├── pageHeader/
│   ├── reviewStep/
│   └── structureStep/
│
├── data/
│   └── generateSites.ts
│
├── pages/
│   ├── inventory/
│   └── createSite/
│
├── styles/
│   └── partials/
│
└── types/
```

## Datos mock

Para representar un escenario cercano al planteado en el ejercicio, el proyecto genera:

```text
40,000 sitios publicitarios
```

Los registros se generan localmente y permiten probar búsqueda, filtros, paginación y comportamiento de la tabla con un volumen considerable de información.

Los datos no representan información real.

## Instalación

Clona el repositorio:

```bash
git clone <URL_DEL_REPOSITORIO>
```

Entra al proyecto:

```bash
cd <NOMBRE_DEL_PROYECTO>
```

Instala las dependencias:

```bash
npm install
```

Inicia el entorno de desarrollo:

```bash
npm run dev
```

Vite mostrará la URL local desde la que puede abrirse la aplicación.

## Scripts

```bash
npm run dev
```

Inicia el servidor de desarrollo.

```bash
npm run build
```

Genera el build de producción.

```bash
npm run preview
```

Permite visualizar localmente el build generado.

## Consideraciones

El proyecto corresponde a una implementación frontend.

Las operaciones de alta, edición y eliminación utilizan información simulada y no están conectadas a un backend o API persistente.

El selector de roles incluido en la interfaz tiene fines demostrativos y permite visualizar los cambios de presentación asociados a cada perfil.

## Autor

**Yunuen Moncada**

UX/UI Engineer & Frontend Developer