const express = require('express')
const app = express()
const port = 4000
const cors = require('cors') // require cross origin resource sharing npm package
const bodyParser = require('body-parser') // require body parser middleware
const mongoose = require('mongoose') // mongodb package

app.use(cors()); // get express to use cors

app.use(function (req, res, next) { // headers to allow cross origin stuff 
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.listen(port, () => { // default listen function
	console.log(`Example app listening at http://localhost:${port}`)
})

main().catch(err => console.log(err)) // run main(), catch errors and log to console

async function main() { // async function definition, connect to hosted mongodb instance
	await mongoose.connect('mongodb+srv://peter:oo3LSFr1qXPXam1n@cluster0.qg7sc.mongodb.net/plants?retryWrites=true&w=majority');
}

let plantSchema = new mongoose.Schema({ // set up Schema instance
	name:String,
	price:String,
	description:String,
	image:String
})

let plantModel = mongoose.model("plant", plantSchema); // set up model from schema

// Routes

app.get('/api/', (req, res) => { // route for GET on /
	plantModel.find((err, data) => { // find() all data + callback function
		res.json(data); // return data
	})
})

app.post('/api/', (req, res) => { // route for POST on /api/movies
	console.log("Creating new product"); // message to confirm POST request
	console.log(req.body.name); // log the various name/value pairs to console
	console.log(req.body.price);
	console.log(req.body.description);
	console.log(req.body.image);

	plantModel.create({ // create plant object in the database model
		name:req.body.name,
		price:req.body.price,
		description:req.body.description,
		image:req.body.image,
	})

	res.send("Product Created: " + req.body.name) // need this to prevent client timing out
})

app.get('/api/edit/:id', (req,res) => { // route with dynamic :id parameter
	plantModel.findById(req.params.id, (err, data) => { // find by req.params.id
		res.json(data); // return data
	})
})

app.put('/api/edit/:id', (req, res) => { // route for updating movie
	console.log(`Update product: ` + req.params.id); // log movie id
	console.log(req.body); // log movie to be updated

	plantModel.findByIdAndUpdate(req.params.id, req.body, {new:true}, // find by id, replace with req.body
		(err, data) => {
			console.log(data);
			res.send(data);
		}
	)
})

app.delete('/api/:id', (req, res) => { // delete route, takes in :id parameter
	console.log("Delete: " + req.params.id); // log the deletion
	plantModel.findByIdAndDelete(req.params.id, (err, data) => { // this method takes an id which we get via req object
		res.send(data); // this doesn't really matter
	})
})