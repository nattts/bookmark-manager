import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from "./auth0-spa";


ReactDOM.render(
	<BrowserRouter>
		<React.StrictMode>
			<Auth0Provider
				domain={`${process.env.REACT_APP_AUTH_DOMAIN}`}
				client_id={`${process.env.REACT_APP_CLIENT_ID}`}
				redirect_uri={`${process.env.REACT_APP_REDIRECT}`}
				audience={`${process.env.REACT_APP_AUDIENCE}`}
			>
			</Auth0Provider>
			<App />
		</React.StrictMode>
	</BrowserRouter>,
	document.getElementById('root')
);
