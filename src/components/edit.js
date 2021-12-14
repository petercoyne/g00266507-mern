import { Component } from "react"; // we just need Component
import axios from 'axios'; // axios for HTTP requests
import { Viewer } from './viewer' // 3d model viewer component

function importAll(r) {
	return r.keys().map(r); // helper function to break down array of objects
}

// grab a list of files in the /public/3d directory
const models = importAll(require.context('../../public/3d', false, /\.(gltf)$/));
let modelList = []

models.forEach((model, i) => {
	modelList[i] = model.default.slice(14, -14) // Extract just the names into regular array
})

export class Edit extends Component { // component for export

	constructor(props) {
		super(props);

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

	componentDidMount() { // fires when component is mounted
		axios.get(`http://localhost:4000/api/edit/${this.props.match.params.id}`) // get plant from endpoint
		.then(res => {
			console.log(res.data.name); // log the title
			this.setState({ // set the state of this ecomponent to the response from the endpoint
				_id:res.data._id,
				name:res.data.name,
				price:res.data.price,
				description:res.data.description,
				image:res.data.image
			})
		})
		.catch(err => console.log(err)) // log error if it fails

	}

	// onSubmit function
	onSubmit(e) {
		e.preventDefault(); // prevent browser default action
		const newPlant = {
			_id: this.state._id,
			name: this.state.name,
			price: this.state.price,
			description: this.state.description,
			image: this.state.image
		}

		axios.put(`http://localhost:4000/api/edit/${this.state._id}`, newPlant) // 
		.then(res => this.props.history.push("/")) // send user back to list page
		.catch(err => console.log(err))
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
							<label className=" text-gray-600">Name</label>
							<input type="text"
								className="border p-4 text-3xl font-bold rounded-xl"
								value={this.state.name}
								onChange={this.onChangePlantName}
							/>

							<label className="mt-4 text-gray-600">Price</label>
							<input type="number"
								className="border p-4 text-xl font-bold rounded-xl"
								value={this.state.price}
								onChange={this.onChangePlantPrice}
							/>

							<label className="mt-4 text-gray-600">Description</label>
							<textarea
								type="text"
								className="border p-4 rounded-xl"
								value={this.state.description}
								onChange={this.onChangePlantDescription}
							/>

							<label className="mt-4 text-gray-600">Image</label>
							<select
								className="border p-4 rounded-xl"
								value={this.state.image}
								onChange={this.onChangePlantImage}>
								{/* this populates the <select> with the list of 3d models */}
								{modelList.map((item, key) => <option value={item}>{item}</option>)}
							</select>
							
							<input type="submit" value="Save Changes" className="border p-4 rounded-xl bg-blue-600 text-white mt-4"/>
						</div>
						{/* <div><img className="w-64 ml-8 object-contain" alt="preview" src={"/" + this.state.image}/></div> */}
						<div>
							<h4 className="ml-4 text-gray-500">Drag to rotate object</h4>
							<div className="h-96 border border-gray-300 ml-4 rounded-xl">
								<Viewer model={this.state.image} /><br/> {/* bring in our Viewer component */}
							</div>
						</div>
					</div>

				</form>
			</div>
		);
	}
}