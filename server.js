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
	res.json(database);
})

app.post('/signin', (req, res) => {
	if (req.body.email === database.users[0].email &&
		req.body.password === database.users[0].password) {
			res.json(database.users[0]);
	} else {
		res.json('error logging in!!');
	}
})

app.post('/register', (req, res) => {
	const {email, name, password } = req.body
	db('users')
		.returning('*')
		.insert({
			name: name,
			email: email,
			joined: new Date()})
			.then(user => res.json(user[0]))
			.catch(err => res.status(400).json('Could not register'));
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
	const { id } = req.body;
	let found = false;
	database.users.forEach(user =>{
		if (user.id === Number(id)) {
			found = true;
			user.entries++;
			return res.json(user.entries);
		}
	})
	if (!found) {
		res.status(400).json('not found');
	}
})

app.listen(3000, () => console.log('The server is listening on port 3000...'));