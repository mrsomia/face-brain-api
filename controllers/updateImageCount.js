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
  handler
}