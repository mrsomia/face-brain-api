const handleRegister = (db, bcrypt) => (req, res) => {
	// requires email name and password and outputs the registed user object
	const {email, name, password } = req.body;
	const hash = bcrypt.hashSync(password, 10);
	db.transaction(trx => {
		trx.insert({email, hash})
			.into('login')
			.returning('email')
			.then(loginEmail => {
				return trx('users')
					.returning('*')
					.insert({
						name: name,
						email: loginEmail[0],
						joined: new Date()
					})
					.then(user => res.json(user[0]))
					.catch(err => res.status(400).json('Could not register'));
			})
			.then(trx.commit)
			.catch(trx.rollback)
	})
	.catch(err => res.status(400).json('Error registering'));
}

module.exports = {
  handleRegister
}