import React, { Component} from 'react';
import { withRouter } from 'react-router-dom';
import auth0Client from '../auth/Auth';
import Navbar from '../navbar/Navbar';
import Categories from '../categories/Categories';
import Links from '../links/Links';
import AddCategory from '../add-category/AddCategory';
import AddBookmark from '../add-bookmark/AddBookmark';
import NotAvailable from '../not-available/NotAvailable';
import Request from '../../utils';
import './Dashboard.css';


class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			categoryNames: null,
			links: null,
			currentCategory: null,
			failed:null
		};
		this.getCategoriesNames = this.getCategoriesNames.bind(this);
		this.categoryClickHandler = this.categoryClickHandler.bind(this);
	}

	componentDidMount = async () => {
		this.props.history.replace("/dashboard");
		await this.getCategoriesNames();
		await this.categoryClickHandler('uncategorized');
	}

	async getCategoriesNames() {
		let token = await auth0Client.getIdToken();
		if (token) {
			const request = new Request('GET', token);
			const api = 'http://localhost:5000/categories';
			return await request.makeCall(api)
				.then(response => response.json())
				.then(json => this.setState({categoryNames: json }))
				.catch((err) => {
					this.setState({failed: true}, () => console.log(err));
				});
		}
	}

	async categoryClickHandler(category) {
		let token = await auth0Client.getIdToken();
		if (token) {
			const api = `http://localhost:5000/links/${category}`;
			const request = new Request('GET', token);
			return await request.makeCall(api)
				.then(response => response.json())
				.then(json => this.setState({links: json, currentCategory: category}))
				.catch(err => console.log(err));
		}
	}


	render() {
		if (this.state.failed) return (<NotAvailable />);
		return (
			<div className='wrapper'>
				<Navbar />
				<div className='middle'>
					<div className="add-category btn">{<AddCategory updateCategories={this.getCategoriesNames}/>}</div>
					<div className="add-bookmark btn">{<AddBookmark
						updateLinksHandler={this.categoryClickHandler}
						updateCategories={this.getCategoriesNames}
						categoryNames={this.state.categoryNames}
						category={this.state.currentCategory}/>}
					</div>
				</div>
				<div className='comp-wrapper'>
					{ this.state.categoryNames?
						<Categories
							names={this.state.categoryNames}
							updateLinksHandler={this.categoryClickHandler}
							refreshCategories={this.getCategoriesNames}
						/>
						: null }
					<Links links={this.state.links} category={this.state.currentCategory} updateLinksHandler={this.categoryClickHandler}/>
				</div>
			</div>
		);
	}

}

export default withRouter(Dashboard);
