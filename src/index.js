import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Leaderboard from './App';
import registerServiceWorker from './registerServiceWorker';
import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Roboto:100,400', 'saxmono', 'sans-serif']
  },
  typekit: {
    id: 'jzo0zgz'
  }
});

ReactDOM.render(<Leaderboard />, document.getElementById('root'));
registerServiceWorker();
