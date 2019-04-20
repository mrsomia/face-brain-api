const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');

const db = knex({
	client: 'pg',
	connection: {
	  host : '127.0.0.1',
	  user : 'sachinsomia',
	  password : '',
	  database : 'smart-brain'
	}
  });

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
	res.json('This is working');
})

app.post('/signin', (req, res) => {
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
})

app.post('/register', (req, res) => {
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
})

app.get('/profile/:id', (req, res) => {
	const {id} = req.params;
	db.select('*').from('users').where({id})
		.then(user => {
			if (user.length) {
				res.json(user[0]);
			} else {
				res.status(400).json('User not found');
			}
		})
		.catch(err => res.status(400).json('error getting user'))
});

app.put('/image', (req, res) => {
	// user id in through req body json => user.entries out also in json
	const {id} = req.body;
	db('users')
		.where('id', '=', id)
		.increment('entries', 1)
		.returning('entries')
		.then(entries => res.json(entries[0])) // here you could deal with no entry count being returned
		.catch(err => res.status(400).json('Error updating entry count'));
})

app.listen(3000, () => console.log('The server is listening on port 3000...'));