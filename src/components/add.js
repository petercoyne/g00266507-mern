import { Component } from "react"; // we just need Component
import axios from 'axios'; // axios for HTTP requests

export class Add extends Component { // component for export

	constructor() {
		// call superclass (Component)
		super();

		// bindings
		this.onSubmit = this.onSubmit.bind(this);
		this.onChangePlantName = this.onChangePlantName.bind(this);
		this.onChangePlantPrice = this.onChangePlantPrice.bind(this);
		this.onChangePlantDescription = this.onChangePlantDescription.bind(this);
		this.onChangePlantImage = this.onChangePlantImage.bind(this);
		
		// set properties of state to empty strings
		this.state = {
			name: ``,
			price: ``,
			description: ``,
			image: ``
		}
	}

	// onSubmit function
	onSubmit(e) {
		e.preventDefault(); // prevent browser default action

		const newPlant = {
			name: this.state.name,
			price: this.state.price,
			description: this.state.description,
			image: this.state.image
		}

		axios.post('http://localhost:4000/', newPlant)
		.then((res) => {console.log(res)})
		.catch((err) => {console.log(err)});
	}

	onChangePlantName(e) { this.setState({ name: e.target.value }) };
	onChangePlantPrice(e) { this.setState({ price: e.target.value }) };
	onChangePlantDescription(e) { this.setState({ description: e.target.value }) };
	onChangePlantImage(e) { this.setState({ image: e.target.value }) };


	render() {
		return ( // return some html
			<div className="App">
				<form onSubmit={this.onSubmit}>

						<label>Plant Name: </label>
						<input type="text"
							value={this.state.name}
							onChange={this.onChangePlantName}
						/>

						<label>Plant Price: </label>
						<input type="number"
							value={this.state.price}
							onChange={this.onChangePlantPrice}
						/>

						<label>Plant Description: </label>
						<textarea
							type="text"
							value={this.state.description}
							onChange={this.onChangePlantDescription}
						/>

						<label>Plant Image URL: </label>
						<input type="text"
							value={this.state.image}
							onChange={this.onChangePlantImage}
						/>

					<input type="submit" value="Add Product" />
				</form>
			</div>
		);
	}
}