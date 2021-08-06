import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppRouter from "./router";
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

window.globalStr='child'

window.addEventListener('scroll', () => {
  console.log('scroll')
})
console.log(1111, window)

// 数据监听
window.microApp?.addDataListener((data) => {
  console.log("接受数据：", data)
})

setTimeout(() => {
  window.microApp?.dispatch({ name: '来自子应用的数据' })
}, 3000);
