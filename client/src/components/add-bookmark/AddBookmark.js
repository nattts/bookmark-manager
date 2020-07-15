import React, { Component } from 'react';
import Modal from '../modal/Modal';
import auth0Client from '../auth/Auth';
import Request from '../../utils';
import './AddBookmark.css';


class AddBookmark extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user_url: '',
			user_category: '',
			urlError:'',
			response:'',
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleDropdownChange = this.handleDropdownChange.bind(this);
		this.reset = this.reset.bind(this);
		this.baseState = this.state;
	}

reset = async () => await this.setState(this.baseState);

showModal = async () => {
	await this.setState({ show: true });
	await this.props.updateCategories();
}

	hideModal = () => this.setState({ show: false });

	handleDropdownChange(event) {
		const target = event.target;
		this.setState({ user_category: target.value });
	}

	onChageHandler = (event) => {
		event.preventDefault();
		let userUrl = event.target.value;
		this.setState({ user_url: userUrl });
	};

	url_validation = () => {
		let reg = new RegExp(
			"^(http|https|ftp)\://([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&amp;%\$\-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|localhost|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\?\'\\\+&amp;%\$#\=~_\-]+))*$");
		return reg.test(this.state.user_url);
	}

	dropDown_validation = () => !!this.state.user_category;

	serverValidation = async response => {
		await Promise.resolve(response)
			.then(result => result.json())
			.then(async (message) => {
				return this.setState({ response: message, urlError:''});
			});
	}

	saveLink = async () => {
		let token = await auth0Client.getIdToken();
		if (token) {
			const api = 'http://localhost:5000/links';
			const request = new Request('POST', token);
			return await request.makeCall(api, {url: this.state.user_url, category: this.state.user_category})
				.then(response => this.serverValidation(response))
				.catch(err => console.log(err));
		}
	}

	handleSubmit = async () => {
		if (!this.url_validation()) return this.setState({ urlError: 'not valid'});
		if (!this.dropDown_validation()) return this.setState({urlError: 'you have to choose a folder'});
		return await this.saveLink();
	}

	showDropDown = (names) => {
		let arr = [];
		if (names) {
			arr = ['-choose-', ...names];
		}
		return arr.map(name => <option key={name}>{name}</option>);
	}
					
	render() {

		let form =
		<form>
			<label className='url-label' htmlFor="url">url:</label>
			<input
				name="url"
				value={this.state.url}
				onChange={(e) => this.onChageHandler(e)}
			/>
			<label htmlFor="drop">save in category: </label>
			<select
				onChange={(e)=>this.handleDropdownChange(e)}>
				{this.props.categoryNames? this.showDropDown(this.props.categoryNames):null}
			</select>
			<div className='input-rules'>
				<li>*link can be saved only once</li>
			</div>
			<div className="inval-feedback">{this.state.urlError || this.state.response}</div>
			<div className='save-btn btn btn-outline-primary btn-sm' onClick={this.handleSubmit}>save</div>
		</form>;

		return (
			<div>
				<button className='add-bookmark-wrapper btn-outline-info'onClick={() => {this.showModal();}}>add bookmark</button>
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


export default AddBookmark;
