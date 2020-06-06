# server

A aplicação **server** em typescript acessa o banco de dados e disponibiliza os dados via API

## 1 - Inicialização

A aplicação **server** é uma aplicação Node em typescript. Portanto depende do Node e do npx. Tendo essas dependencias, para iniciar um projeto basta seguir os comandos:

```
npm init -y
npm install ts-node -D
npm install ts-node-dev -D
npm install typescript -D
npx tsc --init
```

## 2 - Servidor REST

O servidor REST e toda sua logica de rotas é construido com o [**express**](http://expressjs.com/) e [**cors**](https://expressjs.com/en/resources/middleware/cors.html)

```
npm install express --save
npm install @types/express -D
npm install cors --save
npm install @types/cors -D
```

## 3 - Banco de dado

O acesso a banco de dados é feito com o [**knex**](http://knexjs.org/) que pode se conectar a varios tipos de bancos. Nesse projeto usamos o **sqlite** como banco.

```
npm install knex --save
npm install sqlite3 --save
```

## 4 - Upload de arquivos

Para tratar o upload de arquivos, usamos o [**multer**](https://github.com/expressjs/multer)

```
npm install multer --save
npm install @types/multer -D
```

## 5 - Validação dos dados

Para validar o recebidos, antes de gravar no banco, usamos o [**celebrate**](https://github.com/arb/celebrate)

```
npm install celebrate --save
```
