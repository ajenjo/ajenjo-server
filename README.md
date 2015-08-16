# sessioncontrol_back (Ajenjo)

with [Sails](http://sailsjs.org).

## configuraciones Environment

Nos gustar trabajar con variables Environment para editar procesos del sistema, ya sea las configuraciones con la base de datos o la plantilla de vistas que este ocupa.

### Base De Datos

Usando el documento `.env` para poder configurar la base de datos, en donde se definen las opciones para conectarse a la base de datos.

### Templates


## Installar

Instalar repositorios

```bash
$ npm install
$ bower install
```

### Iniciar Servicio.

> **Nota:** Require tener instalado [ForeverJs](https://github.com/foreverjs/forever)

```bash
$ npm start
```


### Detener servicio

```bash
$ npm stop
```


## Docker Servicio

```bash
docker build -t ajenjo .
```

Developr build

```bash
docker create -v $(pwd)/api://ajenjo/api -v $(pwd)/assets://ajenjo/assets -v $(pwd)/config://ajenjo/config -v $(pwd)/views://ajenjo/views -v  $(pwd)/bower_components://ajenjo/bower_components -p 9901:80 --name "ajenjo" ajenjo
```


## License

[MIT License](http://ajenjo.mit-license.org/) Copyright © 2014-2015 Jon Dotsoy. <ajenjo@jon.soy>
