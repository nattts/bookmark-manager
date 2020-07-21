import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';
import auth0Client from '../auth/Auth';
import './Navbar.css';

class Navbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			items: null,
		};
		this.signOut = this.signOut.bind(this);
	}

	signOut() {
		auth0Client.signOut();
		this.props.history.replace("/");
	}

	import() {}
	export() {}

	render() {
		return (
			<div className="navbar">
				<Link className="navbar-brand" to='#'> BKMRK! </Link>
				<button className="import btn btn-light" onClick={this.import}>import</button>
				<button className="export btn btn-light" onClick={this.export}>export</button>
				<button className="signout btn btn-dark" onClick={this.signOut}>log out</button>
			</div>
		);
	}
}

export default withRouter(Navbar);
