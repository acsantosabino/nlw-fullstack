# web-app

A aplicação **web-app** em typescript consome a API e tem a função de realizar cadastro de novos dados

## 1 - Inicialização

A aplicação **web-app** é uma aplicação React em typescript. Para iniciar um projeto basta seguir os comandos:

```
npx create-react-app web-app --template=typescript
```

## 2 - Rotas

A logica de rotas é construido com o [**react-router-dom**](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom)

```
npm install react-router-dom --save
npm install @types/react-router-dom -D
```

## 3 - Consumo de API

Para consumir a API e carregar os dados usamos o [**axios**](https://github.com/axios/axios)

```
npm install axios --save
```

## 4 - Icones

O acesso a diversas fontes de icones para serem usados é garantido pelo [**react-icons**](https://react-icons.github.io/react-icons/)

```
npm install react-icons --save
```

## 5 - Mapa

Para apresentar o mapa e apresentar a localização, usamos o [**react-leaflet**](https://react-leaflet.js.org/)

```
npm install react-leaflet --save
npm install leaflet --save
npm install @types/react-leaflet -D
```

Em seguida adicionar no _public/index.html_ as linhas

```
 <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
   integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
   crossorigin=""/>

 <!-- Make sure you put this AFTER Leaflet's CSS -->
 <script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"
   integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew=="
   crossorigin=""></script>
```

## 6 - Dropzone para upload de arquivos

Para fazer o upload de aquivos usamos o componente [**react-dropzone**](https://react-dropzone.js.org/)

```
npm install react-dropzone --save
```
