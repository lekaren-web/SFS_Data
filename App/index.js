import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from '../App';
import { store } from './store';
import { Provider } from 'react-redux';
import DataTable from './components/DataTable'
// import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <DataTable />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
