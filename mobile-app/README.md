# mobile-app

A aplicação **mobile-app** em typescript consome a API e tem a função de apresentar os dados com a possibilidade de filtro

## 1 - Inicialização

A aplicação **mobile-app** é uma aplicação Expo React-native em typescript. Para iniciar um projeto basta seguir os comandos:

```
# Instalando o Expo
npm install expo-cli --global

# Iniciando o projeto
expo init myNewProject
cd myNewProject
expo start
```

## 2 - Rotas

A logica de rotas é construido com o [**react-navigation**](https://reactnavigation.org/)

```
yarn add @react-navigation/native
yarn add @react-navigation/stack

expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
```

## 3 - Consumo de API

Para consumir a API e carregar os dados usamos o [**axios**](https://github.com/axios/axios)

```
npm install axios --save
```

## 4 - Icones

O acesso a diversas fontes de icones para serem usados é garantido pelo [**expo-font**](https://docs.expo.io/versions/latest/sdk/font/)

```
npm install expo-font --save
```

## 5 - Mapa e localização

Para apresentar o mapa e apresentar a localização, usamos o [**react-native-maps**](https://docs.expo.io/versions/latest/sdk/map-view/). Para captutar a localização atual usamos [**expo-location**](https://docs.expo.io/versions/latest/sdk/location/)

```
expo install expo-location
```

## 6 - Para o envio de email

Para enviar um email pelo app usamos o [**expo-mail-composer**](https://docs.expo.io/versions/latest/sdk/mail-composer/)

```
expo install expo-mail-composer
```

## 7 - Componentes extras de view

-   [**react-native-picker-select**](https://github.com/lawnstarter/react-native-picker-select)

```
npm install react-native-picker-select --save
```

-   [**react-native-gesture-handler**](https://github.com/software-mansion/react-native-gesture-handler) - **RectButton**

```
npm install react-native-gesture-handler --save
```

-   [**expo-constants**](https://docs.expo.io/versions/latest/sdk/constants/) - **Constants**

```
expo install expo-constants
```

-   [**react-native-svg**](https://docs.expo.io/versions/latest/sdk/svg/)

```
expo install react-native-svg
```
