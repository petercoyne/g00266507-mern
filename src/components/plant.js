import { Component } from "react";
import { Link } from 'react-router-dom';

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
					<img className="h-24 mx-auto" src={"/2d/" + this.props.plant.image + ".webp"} alt="plant"/>
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