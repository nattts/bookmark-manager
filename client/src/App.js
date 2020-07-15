import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import Home from './components/home/Home';
import Dashboard from './components/dashboard/Dashboard';
import auth0Client from './components/auth/Auth';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
	}

	async componentDidMount() {
		try {
			await auth0Client.silentAuth();
			await this.forceUpdate();
		} catch (err) {
			if (err.error !== 'login_required') console.log(err.error);
		}
	}
	render() {
		return (
			<div className="App">
				<Route exact path='/' component={Home}/>
				{auth0Client.isAuthenticated()? <Route exact path='/dashboard' component={Dashboard} />:null}
			</div>
		);
	}
}


export default withRouter(App);
