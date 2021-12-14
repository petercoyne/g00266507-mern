import { Component } from "react";
import axios from 'axios';
import { Plant } from './plant'

export class List extends Component {

	constructor() {
		super();
		this.loadData = this.loadData.bind(this);
		this.onChangeFilterName = this.onChangeFilterName.bind(this);
		this.onChangeFilterValue = this.onChangeFilterValue.bind(this);
	}

	state = {
		plants: [], // set this.state.plants to blank array
		filterName: "",
		filterValue: 50
	};


	loadData() {
		console.log("loading data")
		axios.get('http://localhost:4000/api/') // request plants from our backend
			.then((res) => {
				this.setState({ plants: res.data });
			})
			.catch((err) => {
				console.log(err); // else log error
			});
	}

	componentDidMount() { // on mount function
		this.loadData();
	}

	onChangeFilterName(e) {
		this.setState({ filterName: e.currentTarget.value });
	}
	onChangeFilterValue(e) {
		this.setState({ filterValue: e.currentTarget.value });
	}

	render() {
		return (
			<div>
				<div className="flex border-b mb-8 p-8 border-gray-200 bg-gray-50">
					<input name="filter" type="text" placeholder="Filter by name" className="p-2 mb-0 rounded-2xl border border-gray-300"
						value={this.state.filterName}
						onChange={this.onChangeFilterName}></input>
					<div className="flex-grow ml-8 mr-2">
						<h3 className="mb-2 uppercase text-sm text-gray-500">Filter by max price</h3>
						<div>
							<input type="range"	min={0} max={50}
								value={this.state.filterValue}
								onChange={this.onChangeFilterValue}/>
							<span className="p-2 text-gray-500">€{this.state.filterValue}</span>
						</div>
					</div>
				</div>
				<table className="m-8">
					<thead className="font-light text-sm uppercase text-gray-500 text-left">
						<tr>
							<th></th>
							<th>Name</th>
							<th>Price</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{this.state.plants
						.filter((el) => {
							return el.name.toLowerCase().includes(this.state.filterName.toLowerCase()) // return elements if they include the input string
						})
						.filter((el) => {
							return parseInt(el.price) <= this.state.filterValue; // return elements less than max price value
						})
						.map((plant, key) => {
							return <Plant plant={plant} key={key} loadData={this.loadData}></Plant> // return
						})}
					</tbody>
				</table>
			</div>
		)
	}
}

export default List;