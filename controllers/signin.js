const handleSignin = (db, bcrypt) => (req, res) => {
	const {email, password} = req.body;
	db.select('*').from('login').where({email})
		.then(data => {
			const isValid = bcrypt.compareSync(password, data[0].hash);
			if (isValid) {
				return db.select('*').from('users').where({email})
					.then(user => res.json(user[0]))
					.catch(err => res.status(400).json('unable to return user'));
			} else {
				res.status(400).json('Email and Password do not match');
			}
		})
		.catch(err => res.json(400).json('Email and Password do not match'));
}

module.exports ={
  handleSignin
}