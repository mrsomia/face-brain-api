const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// Temp database to use for testing in postman
const database = {
	users : [
	{
		id: 123,
		name: 'John',
		email: 'john@gmail.com',
		entries: 0,
		joined: new Date()
	},
	{
		id: 124,
		name: 'Sally',
		email: 'Sally@gmail.com',
		entries: 0,
		joined: new Date()
	}
	],
	login : [
		{
			id: 987,
			hash: '',
			email: 'john@gmail.com'
		}
	]
}

app.get('/', (req, res) => {
	res.json(database);
})

app.post('/signin', (req, res) => {
	if (req.body.email === database.users[0].email &&
		req.body.password === database.users[0].password) {
			res.json('success');
	} else {
		res.json('error logging in!!');
	}
})

app.post('/register', (req, res) => {
	const {email, name, password } = req.body
	database.users.push({
		id: 125,
		name: name,
		email: email,
		password: password,
		entries: 0,
		joined: new Date()
	})
	res.json(database.users[database.users.length -1])
})

app.get('/profile/:id', (req, res) => {
	const { id } = req.params;
	let found = false;
	database.users.forEach(user =>{
		if (user.id === Number(id)) {
			found = true;
			return res.json(user);
		}
	})
	if (!found) {
		res.status(400).json('not found');
	}

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

/*
/ --> res = this is working
/signin => POST json => res = success/fail
/register => POST => add to database --> return new user object
/profile/:userid --> GET  = user of :userid
/image --> PUT --> (just to update user object with one more image search)

*/