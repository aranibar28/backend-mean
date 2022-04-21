# Ecommerce MEAN STACK (API)

Este es proyecto de ecommerce analizado y desarrollado como si fuera para un cliente real, aplicando diversos conocimientos muy útiles desde el análisis del negocio hasta la fase final en producción.

## Características

- Módulo de usuarios y clientes.
- Módulo de productos e inventario.
- Módulo de promociones y cupones.
- Seguridad de API con Tokens JWT.
- Pasarelas de pago con Paypal y Culqi.
- Carrito real time con SocketIO.
- Notificaciones real time.
- Gestión de imágenes y recursos en servidor externo.
- Informes de la tienda con exportación a Excel.
- Reportes gráficos de la tienda (KPI).

## Stack Tecnológico:

- API (MongoDB, Express y Node)
- Panel administrador (Angular +13)
- Ecommerce (Angular +13)

## Instalación de los paquetes

Paquete que servirán para la construcción del Backend hasta su despliegue:

    npm install moment express mongoose jsonwebtoken jwt-simple bcryptjs body-parser connect-multiparty

Paquete exlusivamente para el modo en desarrollo:

    npm install --save-dev nodemon

## Paquetes NPM

- **moment:** Gestor de fechas y horas.
- **express:** Framework para contruir Backend en aplicaciones NodeJS.
- **mongoose:** Modelado del MongoDB.
- **jsonwebtoken:** Generar un Token con data del usuario.
- **jwt-simple:** Decodificar y validar Tokens
- **bcryptjs:** Encriptar contraseñas de usuarios y clientes.
- **body-parser:** Parsear y obtener data.
- **connect-multiparty:** Guardar recursos como imagenes y videos.

## Jerarquía de Carpetas

- **models:** Archivo para modelar los datos.
- **controllers:** Archivo para gestionar las peticiones.
- **routes:** Archivo para contener las rutas de la API.
- **helpers:** Archivo para codificar los Tokens.
- **middlewares:** Archivo para verificar y validar Tokens.
- **uploads:** Archivo para contener los recursos e imagenes.
