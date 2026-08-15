# eCommerce BIU - Panel de Productos

Aplicación administrativa para gestionar productos de un eCommerce, construida con React + CoreUI y conectada a Supabase.

## Menu lateral actual

La sección de navegación del sidebar incluye hasta el momento estas opciones de productos:

- Dashboard
- eCommerce BIU
- Products
  - Catálogo de Productos
  - Agregar Producto
  - Lista de Productos

## Funcionalidades actuales

### Productos
- Catálogo de productos desde Supabase
- Agregar nuevo producto con formulario
- Listado de productos con búsqueda y paginación
- Integración directa con la tabla `productos` en Supabase

## Rutas disponibles

- `/dashboard`
- `/productos/catalogo`
- `/productos/agregar`
- `/productos/lista`

## Tecnologías

- React 19
- Vite
- CoreUI React
- Supabase JS

## Configuración de Supabase

Debes tener definidas estas variables de entorno en tu archivo `.env`:

```env
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_PUBLISHABLE_KEY=tu_clave_publica
```

## Instalación

```bash
npm install
```

## Ejecutar en desarrollo

```bash
npm start
```

## Build de producción

```bash
npm run build
```

## Estructura principal

```text
src/
├── hooks/
│   └── useProductos.js
├── lib/
│   └── supabase.js
├── views/
│   └── productos/
│       ├── Catalogo.jsx
│       ├── AgregarProducto.jsx
│       └── Lista.jsx
├── _nav.jsx
├── routes.js
└── App.jsx
```

## Nota

Por ahora la administración activa está enfocada en la gestión de productos del eCommerce. El menú lateral refleja esa etapa inicial del proyecto.
- [React Spinner](https://coreui.io/react/docs/components/spinner/)
- [React Stepper](https://coreui.io/react/docs/forms/stepper/) **PRO**
- [React Switch](https://coreui.io/react/docs/forms/switch/)
- [React Table](https://coreui.io/react/docs/components/table/)
- [React Textarea](https://coreui.io/react/docs/forms/textarea/)
- [React Time Picker](https://coreui.io/react/docs/forms/time-picker/) **PRO**
- [React Toast](https://coreui.io/react/docs/components/toast/)
- [React Tooltip](https://coreui.io/react/docs/components/tooltip/)

## Versioning

For transparency into our release cycle and in striving to maintain backward compatibility, CoreUI Free Admin Template is maintained under [the Semantic Versioning guidelines](http://semver.org/).

See [the Releases section of our project](https://github.com/coreui/coreui-free-react-admin-template/releases) for changelogs for each release version.

## Creators

**Łukasz Holeczek**

* <https://twitter.com/lukaszholeczek>
* <https://github.com/mrholek>

**Andrzej Kopański**

* <https://github.com/xidedix>

**CoreUI Team**

* <https://twitter.com/core_ui>
* <https://github.com/coreui>
* <https://github.com/orgs/coreui/people>

## Community

Get updates on CoreUI's development and chat with the project maintainers and community members.

- Follow [@core_ui on Twitter](https://twitter.com/core_ui).
- Read and subscribe to [CoreUI Blog](https://coreui.ui/blog/).

## Support CoreUI Development

CoreUI is an MIT-licensed open source project and is completely free to use. However, the amount of effort needed to maintain and develop new features for the project is not sustainable without proper financial backing. You can support development by buying the [CoreUI PRO](https://coreui.io/pricing/?framework=react&src=github-coreui-free-react-admin-template) or by becoming a sponsor via [Open Collective](https://opencollective.com/coreui/).

## Copyright and License

copyright 2026 creativeLabs Łukasz Holeczek.   

Code released under [the MIT license](https://github.com/coreui/coreui-free-react-admin-template/blob/main/LICENSE).