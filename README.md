# Prueba técnica Zapping

## Definición del problema
La prueba consistía en realizar una simulación de livestream, en donde se enviaban los fragmentos de video desde un servidor hacia un frontend (cliente). Además requería de una base de datos donde se pueda crear e identificar usuarios.

## Archivos
Existen 3 microservicios, cada uno en su carpeta correspondiente:
- zapping-test-backend: Es la API encargada de la conexión entre el frontend y la base de datos. Esto se creó con Node/Javascript.
- zapping-test-frontend: Es el encargado del frontend con el cual interactúa el usuario. Esto se creó con React/Javascript.
- zapping-test-hls: Es el encargado del envío de fragmentos de video y de la simulación del livestream. Esto se creó con Node/Javascript.

## Ejecución
Para ejecutar el código es necesario crear su imágen de docker en cada uno de los microservicios. Para realizar esto, se encuentra un ```Dockerfile``` dentro de cada carpeta el cual se ejecuta con los siguiente comandos:
```
docker build -t rodrigocaya/hls-zapping .
docker build -t rodrigocaya/backend-zapping .
docker build -t rodrigocaya/frontend-zapping . 
```

Finalmente, en la carpeta raíz del proyecto, se encuentra el archivo ```docker-compose.yml``` que permite crear el contenedor con el comando:
```
docker-compose -f docker-compose.yml up
```

> **_NOTA:_** El programa corre en el puerto ```3000```.
