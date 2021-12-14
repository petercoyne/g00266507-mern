import { Component } from "react"; // we just need Component
import axios from 'axios'; // axios for HTTP requests
import { withRouter } from "react-router-dom";

function importAll(r) {
	return r.keys().map(r); // helper function to break down array of objects
}

// grab a list of files in the /public/3d directory
const models = importAll(require.context('../../public/3d', false, /\.(gltf)$/));
let modelList = []

models.forEach((model, i) => {
	modelList[i] = model.default.slice(14, -14) // Extract just the names into regular array
})

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

		axios.post('http://localhost:4000/api/', newPlant)
		.then((res) => {this.props.history.push("/");}) // redirect home
		.catch((err) => {console.log(err)});
	}

	onChangePlantName(e) { this.setState({ name: e.target.value }) };
	onChangePlantPrice(e) { this.setState({ price: e.target.value }) };
	onChangePlantDescription(e) { this.setState({ description: e.target.value }) };
	onChangePlantImage(e) { this.setState({ image: e.target.value }) };


	render() {
		return ( // return some html
			<div className="App p-8">
				<form onSubmit={this.onSubmit}>
					<div className="flex">
							<div className="flex flex-col max-w-xl">
								<label className="text-gray-600">Plant Name: </label>
								<input type="text"
									className="border p-4 text-3xl font-bold rounded-xl"
									value={this.state.name}
									onChange={this.onChangePlantName}
								/>

								<label className="mt-4 text-gray-600">Plant Price: </label>
								<input type="number"
									className="border p-4 text-xl font-bold rounded-xl"
									value={this.state.price}
									onChange={this.onChangePlantPrice}
								/>

								<label className="mt-4 text-gray-600">Plant Description: </label>
								<textarea type="text"
									className="border p-4 rounded-xl"
									value={this.state.description}
									onChange={this.onChangePlantDescription}
								/>

								<label className="mt-4 text-gray-600">Plant Model: </label>
								<select
									className="border p-4 rounded-xl"
									value={this.state.image}
									onChange={this.onChangePlantImage}>
									{modelList.map((item) => <option value={item}>{item}</option>)}
								</select>

							<input type="submit" value="Add Product"  className="border p-4 rounded-xl bg-blue-600 text-white mt-4"/>
						</div>
					</div>
				</form>
			</div>
		);
	}
}