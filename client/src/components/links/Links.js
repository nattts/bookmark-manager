import React, { Component } from 'react';
import auth0Client from '../auth/Auth';
import Modal from '../modal/Modal';
import './Links.css';

async function callDeleteAPI (token, api, category, link)  {
	return fetch(api, {
		method: 'DELETE',
		withCredentials: true,
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Authorization': `Bearer ${token}`
		},
		body: JSON.stringify({ category: category, url: link })
	});
}

class Links extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userLink:'',
			error:''
		};
	}

	reset = async () => await this.setState(this.baseState);
	showModal = async () => await this.setState({ show:true });
	hideModal = async () => await this.setState({ show:false });
	delClickHandler = async (e) => {
		e.preventDefault();
		let link = e.target.name;
		this.setState({ userLink: link });
	}

	delete = async (e) => {
		await this.delClickHandler(e);
		let token = await auth0Client.getIdToken();
		if (token) {
			const url = `http://localhost:5000/links`;
			return await callDeleteAPI(token, url, this.props.category, this.state.userLink)
				.then(response => this.serverResponse(response))
				.then(() => this.setState({ selected: ''}))
				.catch(err => console.log(err));
		}
	}

	serverResponse = async (response) => {
		await Promise.resolve(response)
			.then(result => result.json())
			.then(async (message) => {
				if (response.status === 201) {
					await this.setState({ response: message});
					return await this.props.updateLinksHandler(this.props.category);
				}
				if (response.status === 304) {
					await this.showModal();
					return this.setState({ error: message});
				}
				if (response.status !== 304 && response.status !== 201) {
					await this.showModal();
					return this.setState({ error: 'Service Unavailable'});
				}
			});
	}


	displayLinks(arr) {
		return arr.map((link) => {
			return <div key={link} className='link-wrapper'>
				<button className='btn-links' onClick={()=> window.open(link, "_blank")}>
					<h3 className='btn-links-h'>{link}</h3>
				</button>
				<button className='del-links' name={link} onClick={this.delete}>x</button>
			</div>;
		});
	}


	render () {
		const delete_form = <div className="inval-feedback">{this.state.error}</div>;

		if (this.props.links !== null && this.props.links.length > 0) {
			let categories = this.props.links[0];
			let key = Object.keys(categories);
			return (
				<div className='links-wrapper'>{this.displayLinks(categories[key])}
					{this.state.show ?
						<Modal
							show={this.state.show}
							handleClose={this.hideModal}
							reset={this.reset}
							form={delete_form}>
						</Modal>
						:null }
				</div>
			);
		}
		return (
			<div className='links-wrapper'></div>
		);
	}

}


export default Links;
