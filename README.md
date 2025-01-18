# Proyecto con Vue 3, Tailwind CSS, Jest y Cypress

Este proyecto es una aplicación desarrollada con **Vue 3**, utilizando **Tailwind CSS** para los estilos, **Jest** para realizar pruebas unitarias y **Cypress** para pruebas end-to-end (E2E).

## **Nota Importante sobre la API de Imágenes**

Inicialmente, la URL para obtener imágenes era `https://jsonplaceholder.typicode.com/photos`, pero actualmente esta URL no funciona o está caída. Por este motivo, se utilizó la API de **Lorem Picsum** (`https://picsum.photos/`) como alternativa para obtener las imágenes.

Si necesitas más información sobre esta API, puedes visitar su [documentación oficial](https://picsum.photos/).

## **Requisitos previos**

Asegúrate de tener instalado en tu sistema:

- [Node.js](https://nodejs.org/) (versión 16 o superior recomendada)
- [npm](https://www.npmjs.com/) o [pnpm](https://pnpm.io/) (el gestor de paquetes utilizado en este proyecto)

## **Instalación**

1. Clona el repositorio en tu máquina local:

```bash
git clone https://github.com/tu-usuario/tu-repositorio.git
```

2. Accede al directorio del proyecto:

```bash
cd tu-repositorio
```

3. Instala las dependencias del proyecto:

```bash
pnpm install
```

## **Cómo levantar el proyecto**

Para ejecutar el proyecto en modo de desarrollo, utiliza el siguiente comando:

```bash
pnpm dev
```
## **Pruebas**
Para ejecutar el proyecto en modo de desarrollo, utiliza el siguiente comando:

```bash
pnpm test
```

## **Pruebas end-to-end con Cypress**
El proyecto incluye pruebas E2E utilizando Cypress. Para ejecutar estas pruebas:

1. Abre la interfaz gráfica de Cypress:
    
```bash
pnpm cypress:open
```
Esto abrirá una ventana donde podrás seleccionar y ejecutar las pruebas E2E.

2. Para ejecutar las pruebas en modo headless (sin interfaz gráfica):
    
```bash
pnpm cypress:run
```

## Tecnologías utilizadas
1. *Vue 3*: Framework progresivo para construir interfaces de usuario.
2. *Tailwind CSS*: Framework de utilidades para diseño y estilos CSS.
3. *Jest*: Framework para pruebas unitarias.
4. *Cypress*: Herramienta para pruebas end-to-end.

Este **README.md** incluye una aclaración clara sobre el cambio de API para las imágenes, junto con la guía completa para levantar el proyecto y realizar pruebas. Además, se incluyen las tecnologías utilizadas en el proyecto.
