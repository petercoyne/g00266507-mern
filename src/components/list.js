import { Component } from "react";
import axios from 'axios';
import { Plant } from './plant'

export class List extends Component {

	constructor() {
		super();
		this.loadData = this.loadData.bind(this);
	}

	state = {
		plants: [] // set this.state.plants to blank array
	};

	loadData() {
		axios.get('http://localhost:4000/') // request plants from our backend
			.then((res) => {
				this.setState({ plants: res.data });
			})
			.catch((err) => {
				console.log(err); // else log error
			});
	}

	componentDidMount() { // on mount function
		this.loadData();
		console.log("loading data")
	}

	renderTest() {
		return <h1>Blah</h1>
	}

	render() {
		console.log(this.state.plants)
		return (
			<table className="m-8">
				<tr className="font-light text-sm uppercase text-gray-500 text-left">
					<th></th>
					<th>Name</th>
					<th>Price</th>
					<th>Actions</th>
				</tr>
				{this.state.plants.map((plant) => {
					return <Plant plant={plant}></Plant>
				})}
			</table>
		)
	}
}

export default List;