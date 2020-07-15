import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';


class NotAvailable extends Component {
	constructor(props) {
		super(props);
		
	}


	render() {
		return (
			<div >
				<h1>This app is experiencing downtime. Come back later</h1>
			</div>
		);
	}
}

export default withRouter(NotAvailable);
