import React, { Component } from 'react';
import auth0Client from '../auth/Auth';
import Modal from '../modal/Modal';
import Request from '../../utils';
import './Categories.css';

class Categories extends Component {
	constructor(props) {
		super(props);
		this.state = {
			radioCategory: '',
			response:'',
			error: '',
			newUserCategory: '',
			selected:'',
			clickedRename:'',
			selectedButton: null
		};
		this.categoryClick = this.categoryClick.bind(this);
		this.serverResponse = this.serverResponse.bind(this);
		this.reset = this.reset.bind(this);
		this.baseState = this.state;
		this.rename = this.rename.bind(this);
	}

	reset = async () => await this.setState(this.baseState);
	showModal = async () => await this.setState({ show:true });
	hideModal = async () => await this.setState({ show:false });
	categoryClick = async (category) => await this.props.updateLinksHandler(category);
	radioHandler = (e) => this.setState({ radioCategory: e.target.value, selected: e.target.value });

	renameHandler = (event) => {
		event.preventDefault();
		let newUserCategory = event.target.value;
		this.setState({ newUserCategory: newUserCategory });
	};

	serverResponse = async (response) => {
		await Promise.resolve(response)
			.then(result => result.json())
			.then(async (message) => {
				if (response.status === 201) {
					this.setState({ response: message});
					return await this.props.refreshCategories();
				}
				await this.showModal();
				return this.setState({ error: message});
			});
	}

	delete = async () => {
		if (this.state.selected === '') return;
		let token = await auth0Client.getIdToken();
		if (token) {
			const api = `http://localhost:5000/categories/${this.state.radioCategory}`;
			const request = new Request('DELETE', token);
			return await request.makeCall(api)
				.then(response => this.serverResponse(response))
				.then(() => this.setState({ selected: ''}))
				.catch(err => console.log(err));
		}
	}

		makeRenameRequest = async () => {
			let token = await auth0Client.getIdToken();
			if (token) {
				const api = `http://localhost:5000/categories/${this.state.radioCategory}/${this.state.newUserCategory}`;
				const request = new Request('PUT', token);
				return await request.makeCall(api)
					.then(response => this.serverResponse(response))
					.catch(err => console.log(err));
			}
		}

	rename = async () => {
		if (this.state.selected === '') return;
		this.setState({ clickedRename: true, show:true });
	}

	validation = () => {
		let reg = /^[a-z]{3,}$/g;
		return reg.test(this.state.newUserCategory) && this.state.newUserCategory !== this.state.radioCategory;
	}

	displayCategories(userCategories) {
		return userCategories.map((category) => {
			return <div key={category} className='categ-wrapper'>
				<button className='btn-categories'
					onClick={()=>this.categoryClick(category)}>{category}</button>
				<input className="radio-categories"
					checked={this.state.selected === category}
					onChange={this.radioHandler}
					type="radio"
					value={category}/>
			</div>;
		});
	}

	handleSubmitRename = async () => {
		if (!this.validation()) return this.setState({ error: 'not valid'});
		return await this.makeRenameRequest();
	}

	render() {
		const delete_form = <div className="inval-feedback">{this.state.error}</div>;
		const rename_form =
		<form className='rename-form'>
			<input
				name="new-category"
				value={this.state.newUserCategory}
				onChange={(e) => this.renameHandler(e)}
			/>
			<div className="inval-feedback">{this.state.error || this.state.response}</div>
			<div className='save-btn btn btn-outline-primary btn-sm' onClick={this.handleSubmitRename}>save</div>
		</form>;

		if (this.props.names.length > 0) {
			let userCategories = this.props.names;
			return (
				<div className='categories-wrapper'>
					<div className='edit-wrapper'>
						<button className="rename-btn btn-outline-info" onClick={this.rename}>rename category</button>
						<button className="delete-btn btn-outline-info" onClick={this.delete}>delete category</button>
					</div>
					{this.displayCategories(userCategories)}
					{this.state.show ?
						<Modal
							show={this.state.show}
							handleClose={this.hideModal}
							reset={this.reset}
							form={delete_form}>
						</Modal>
						:null }
					{this.state.clickedRename && this.state.show?
						<Modal
							show={this.state.show}
							handleClose={this.hideModal}
							reset={this.reset}
							form={rename_form}>
						</Modal>
						:null }
				</div>
			);

		} else {
			return <div></div>;
		}
	}
}


export default Categories;
