import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../logo.svg';
import './page1.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p clstag="pageclick|keycount|home2013|08a">
          微应用 React@{React.version}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Link to='/page2'>跳转page2</Link>
        <div className='text-color'>我是子应用的文字</div>
      </header>
    </div>
  );
}

export default App;
