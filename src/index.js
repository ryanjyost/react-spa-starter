import React from 'react';
import ReactDOM from 'react-dom';
import ReactMarkdown from 'react-markdown';
import README from './README.md';

console.log(process.env);
ReactDOM.render(
   <div
      style={{
         display: 'flex',
         flexDirection: 'column',
         alignItems: 'center',
         justifyContent: 'center',
         width: '100%',
         fontFamily: 'sans-serif'
      }}>
      <h2>{`This is the ${process.env.REACT_APP_ENV} environment of react-spa-starter`}</h2>
      <a href="https://github.com/ryanjyost/react-spa-starter">Click here to visit the docs on GitHub</a>
   </div>,
   document.getElementById('root')
);
