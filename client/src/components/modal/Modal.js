import React, { Component } from "react";
import "./Modal.css";

class Modal extends Component {
	constructor(props) {
		super(props);
		this.closeAndReset = this.closeAndReset.bind(this);
	}

	closeAndReset = async () => {
		await this.props.handleClose();
		await this.props.reset();
	}

	render() {
		let showHideClassName = this.props.show? "modal-display-block": "modal-display-none";
		return (
			<div className={showHideClassName}>
				<section className="modal-main">
					<div className='close-btn btn btn-dark btn-sm' onClick={this.closeAndReset}>x</div>
					{this.props.form}
				</section>
			</div>
		);
	}
}

export default Modal;
