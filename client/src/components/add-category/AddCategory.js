import React, { Component } from 'react';
import auth0Client from '../auth/Auth';
import Modal from '../modal/Modal';
import Request from '../../utils';
import './AddCategory.css';


class AddCategory extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			nameError:'',
			response:'',
		};
		this.validation = this.validation.bind(this);
		this.makeRequest = this.makeRequest.bind(this);
		this.reset = this.reset.bind(this);
		this.baseState = this.state;
	}
	reset = async () => await this.setState(this.baseState);
  showModal = () => this.setState({ show:true });
	hideModal = () => this.setState({ show:false });

	validation = () => {
		let reg = /^[a-z]{3,}$/g;
		return reg.test(this.state.name);
	}


	serverValidation = async response => {
		await Promise.resolve(response)
			.then(result => result.json())
			.then(async (message) => {
				return this.setState({ response: message, nameError:''});
			});
	}

	makeRequest = async () => {
		let token = await auth0Client.getIdToken();
		if (token) {
			const api = 'http://localhost:5000/categories';
			const request = new Request('POST', token);
			return await request.makeCall(api, { category: this.state.name })
				.then(response => this.serverValidation(response))
				.catch(err => console.log(err));
		}
	}

	handleSubmit = async () => {
		if (!this.validation()) return this.setState({ nameError: 'not valid'});
		await this.makeRequest();
		return await this.props.updateCategories();
	}

	onChageHandler = (event) => {
		event.preventDefault();
		let categoryName = event.target.value;
		this.setState({ name: categoryName });
	};

	render () {
		const form =
		<form>
			<label htmlFor="name">category name:</label>
			<input
				name="name"
				value={this.state.name}
				onChange={(e) => this.onChageHandler(e)}
			/>
			<div className='input-rules'>
				<li>*no digits</li>
				<li>*no spaces</li>
				<li>*min. 3 characters</li>
				<li>*one word lower case</li>
			</div>
			<div className="inval-feedback">{this.state.nameError || this.state.response}</div>
			<div className='save-btn btn btn-outline-primary btn-sm' onClick={this.handleSubmit}>save</div>
		</form>;

		return (
			<div>
				<button className='add-category-wrapper btn-outline-info'onClick={() => {this.showModal();}}>add category</button>
				{this.state.show?
					<Modal
						show={this.state.show}
						handleClose={this.hideModal}
						reset={this.reset}
						form={form}>
					</Modal>
					: null}

			</div>
		);
	}
}


export default AddCategory;
