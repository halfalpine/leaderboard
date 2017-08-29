import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Leaderboard from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Leaderboard />, document.getElementById('root'));
registerServiceWorker();
