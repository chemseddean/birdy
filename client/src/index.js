import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

/*
Fichier standard ou j'ai rien a modifier 
en gros React prend le component "App" et
l'injecte dans public/index.html

*/

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// NOPE : 
// import reportWebVitals from './reportWebVitals';
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
