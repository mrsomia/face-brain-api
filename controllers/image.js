const Clarifai = require('clarifai');

const app = new Clarifai.App({
	apiKey: '405c1ff97b7844d699304026b11ede1d'
 });

const handleApiCall = (req, res) => {
	app.models
		.predict("a403429f2ddf4b49b307e318f00e528b", req.body.input)
		.then(data => res.json(data))
		.catch(err => res.status(400).json('Unable to work with api'))
}

const handler = (db) => (req, res) => {
	// user id in through req body json => user.entries out also in json
	const {id} = req.body;
	db('users')
		.where('id', '=', id)
		.increment('entries', 1)
		.returning('entries')
		.then(entries => res.json(entries[0])) // here you could deal with no entry count being returned
		.catch(err => res.status(400).json('Error updating entry count'));
}

module.exports = {
	handler,
	handleApiCall
}