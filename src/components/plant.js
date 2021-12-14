import { Component } from "react";
import { Link } from 'react-router-dom';
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

export class Plant extends Component {

    constructor() {
		super();
    }

    DeleteMovie(e) {

    }

    render() {
        return (
			<tr>
				<td className="object-contain pr-4">
					<div className="w-28 h-32">
						<Viewer model={this.props.plant.image} />
					</div>
				</td>
				<td>
                	<h1 className="text-3xl font-bold pr-12">{this.props.plant.name}</h1>
				</td>
                <td className="text-2xl pr-12 text-gray-500">
					<h2>€{this.props.plant.price}</h2>
				</td>
				<td>
					<div className="flex">
						<Link to={"/edit/" + this.props.plant._id}><img src="/icon-edit.svg" alt="edit"/></Link>
						<img src="/icon-delete.svg" alt="delete" className="px-4"/>
						<img src="/icon-info.svg" alt="info"/>
					</div>
				</td>
            </tr>
        );
    }
}