Examen Urbano
==

La aplicación esta desarrollada con Angular lo que es el frontend y backend com un PHP puro(sin Frameworks) con composer autoload y dos librerías de Symfony (Request y Response) y ORM Doctrine

Pasos para instalar:

1) Hacer git clone del proyecto
2) La estructura de directorios de la app es la siguiente: front, back, sql
3) Se debe instalar Node.js. Url: https://nodejs.org/en/download/
4) Una vez que se haya instalado el NodeJs, en una terminal o consola, hay que pararse en el directorio front y correr "npm install" para instalar todas las librerías.
5) Una vez instalado todas las librerias de node, correr "npm start" para levantar el server de Node. El frontend va a correr en http://localhost:4200
6) Ir a un terminal o consola y pararse en el directorio back
7) Correr "composer install" para instalar las librerías para el backend
8) Con cualquier servidor web, backend tiene que correr en http://localhost (por defecto puerto 80)
9) Entrar a un Mysql por medio de consola o algun IDE y correr el dump que esta dentro del directorio sql, con el nombre de "examen.sql"
10) Configurar el archivo de conexión a la base de datos que esta en back/config/database.json, con sus credenciales.
11) Entrar a un navegador web a la Url http://localhost:4200