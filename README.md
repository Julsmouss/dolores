<h1>PROYECTO INTEGRACIÓN CONTINUA <img src="https://raw.githubusercontent.com/iampavangandhi/iampavangandhi/master/gifs/Hi.gif" width="30px"> 🚀</h1>
<h2>GIT HUB 🎨 DOCKER 📽</h2>

### ESCALABILIDAD DEL PROYECTO
-El factor de escalabilidad se encuentra en la posibilidad de ampliar el catálogo de productos financieros. A medida que se incorporen más bancos y productos, el sitio web podrá adaptarse para ofrecer una gama más amplia de opciones a los usuarios. Además, la internacionalización del sitio podría abrir puertas a nuevos mercados, lo que aumentaría la base de usuarios y la carga en la base de datos


### IMPLEMENTACIÓN PROYECTO
- GitHub
- Estructura de contenedores
- Escalabilidad del Proyecto 
- Creación de Contenedores
- Comunicación entre los dos Contenedores 

### HERRAMIENTAS
  ![Docker](https://img.shields.io/badge/-Docker-blue?style=flat&logo=docker)
  ![JavaScript](https://img.shields.io/badge/-JavaScript-yellow?style=flat&logo=javascript)
  ![GitHub](https://img.shields.io/badge/-GitHub-black?style=flat&logo=GitHub)
  ![HTML5](https://img.shields.io/badge/-HTML5-red?style=flat&logo=HTML5)
  ![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-333333?style=flat&logo=postgresql)
 

### ESTRUCTURA CONTENEDOR
-Contenedor de la Aplicación Web:Maneja la interfaz de usuario y permite interacciones con la base de datos a través de la lógica de la aplicación.![Docker](https://img.shields.io/badge/-Docker-blue?style=flat&logo=docker)

-Contenedor de la Base de Datos: Almacena toda la información sobre los productos financieros, asegurando que los datos estén disponibles para la aplicación web.![Docker](https://img.shields.io/badge/-Docker-blue?style=flat&logo=docker)

### CREACIÓN CONTENEDORES
#### Contenedor de la Aplicación Web 
-Este contenedor alojará el frontend de la aplicación, donde los usuarios podrán filtrar y comparar productos financieros. 

#### Pasos para la creación: 
-Dockerfile: Se necesita un archivo Dockerfile que describa cómo construir la imagen del contenedor. 
-docker-compose.yml: Para facilitar la orquestación de los contenedores 

#### Contenedor de la Base de Datos 
-Este contenedor almacenará la información de los productos financieros. 

#### Pasos para la creación: 
-Dockerfile: Para la base de datos PostgreSQL, no es necesario crear un Dockerfile personalizado, ya que podemos usar la imagen oficial. Solo necesitamos definirlo en docker-compose.yml. 
-docker-compose.yml: Continuando con el archivo anterior, se agregará la configuración para la base de datos .

### INTEGRANTES PROYECTO
- David Leal
- Juliana Gomez
- Camila Burgos
- Daniela Zambrano
- Edelmira Zambrano
-  Pablo Zapata Gómez  


### BASE DE DATOS NORMALIZADA
![image](https://github.com/user-attachments/assets/9536378a-ebf3-4606-a0ee-3aeeed1a361c)





