import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import auth0Client from '../auth/Auth';
import './Home.css';

class Home extends Component {
	constructor(props) {
		super(props);
	}

	async logIn() {
		await auth0Client.signIn();
		await auth0Client.handleAuthentication();
	}

	componentWillReceiveProps() {
		this.props.history.replace("/dashboard");
	}

	render () {
		if (!auth0Client.isAuthenticated()) {
			return (
				<div>
					<div className="nav-home" to="/"> 
						<h1>
							Bookmark Manager 
							<div className="underline"></div>
						</h1>
						<div className="nav">
							<button className="login-btn btn-dark" onClick={this.logIn}>Log In</button>
						</div>
					</div>
				</div>
			);
		} else {
			return <div>no</div>;
		}

	}
}

export default withRouter(Home);
