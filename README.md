# TodoApp

Aplicación de gestión de tareas (To-Do List) desarrollada con Angular 13. Incluye autenticación de usuarios (registro/login) y un CRUD completo de tareas.

## Características

- **Autenticación**: Registro e inicio de sesión con validación de formularios.
- **Gestión de tareas**: Crear, listar, editar, eliminar y marcar como completadas.
- **Protección de rutas**: Las tareas solo son accesibles para usuarios autenticados mediante un guard.
- **Persistencia del token**: Almacenamiento en localStorage.
- **Diseño responsive**: Utiliza Bootstrap 5 para una interfaz limpia y adaptable.

## Requisitos previos

- Node.js (versión 14 o superior)
- Angular CLI 13 (`npm install -g @angular/cli@13`)
- Un backend que provea los endpoints de autenticación y tareas (ver sección Backend)

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/AlejandroGlezSan/todo-app.git
   cd todo-app
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura la URL del backend en `src/environments/environment.ts`:
   ```typescript
   export const environment = {
     production: false,
     apiUrl: 'http://localhost:3000/api' // Cambia según tu backend
   };
   ```

4. Inicia el servidor de desarrollo:
   ```bash
   ng serve
   ```

5. Abre `http://localhost:4200` en tu navegador.

## Backend necesario

La aplicación espera un backend REST con los siguientes endpoints:

- `POST /auth/login` - Inicio de sesión (body: `{ username, password }`)
- `POST /auth/register` - Registro (body: `{ username, email, password }`)
- `GET /tasks` - Listar tareas (requiere token en cabecera `Authorization`)
- `POST /tasks` - Crear tarea (body: `{ title, description? }`)
- `PUT /tasks/:id` - Actualizar tarea (body: `{ title, description, completed }`)
- `DELETE /tasks/:id` - Eliminar tarea

Todas las rutas protegidas deben incluir el token JWT en el header `Authorization: Bearer <token>`.

Puedes usar [json-server](https://github.com/typicode/json-server) con un archivo `db.json` para simularlo rápidamente, pero necesitarás implementar la lógica de autenticación o usar un mock más avanzado.

## Estructura del proyecto

```
src/
├── app/
│   ├── _guards/            # Guard de autenticación
│   ├── _services/           # Servicios de autenticación, token y tareas
│   ├── home/                # Componente de inicio
│   ├── login/               # Componente de login
│   ├── register/            # Componente de registro
│   ├── task/                # Componente de tareas (CRUD)
│   ├── models/              # Interfaces User y Task
│   ├── app-routing.module.ts
│   ├── app.module.ts
│   └── app.component.*
├── assets/
├── environments/
└── index.html
```

## Próximos pasos

- Implementar un interceptor HTTP para añadir automáticamente el token a las peticiones.
- Añadir pruebas unitarias y e2e.
- Mejorar la interfaz con Angular Material.
- Conectar a un backend real (Node.js + Express, Firebase, etc.)


## Licencia

MIT