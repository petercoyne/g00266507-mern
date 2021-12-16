const express = require('express')
const app = express()
const port = 4000

const bodyParser = require('body-parser') // require body parser middleware
const mongoose = require('mongoose') // mongodb package
const path = require('path')

app.use(express.static(path.join(__dirname, '../build'))) // configure the location of the built file paths
app.use('/static', express.static(path.join(__dirname, 'build/static'))) // configure the location of the static subfolder

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.listen(port, () => { // default listen function
	console.log(`CRUD project listening at http://localhost:${port}`)
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

app.post('/api/', (req, res) => { // route for POST on /api/
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

app.put('/api/edit/:id', (req, res) => { // route for updating product
	console.log(`Update product: ` + req.params.id); // log product id
	console.log(req.body); // log product to be updated

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

app.get('*', (req, res) => { // match all paths except ones we've already defined
	console.log(`Frontend access.`)
	res.sendFile(path.join(__dirname + '/../build/index.html')) // send back the built index.html
})