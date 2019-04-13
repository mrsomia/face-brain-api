const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const database = {
	users : [
	{
		id: 123,
		name: 'John',
		email: 'john@gmail.com',
		password: 'cookies',
		entries: 0,
		joined: new Date()
	},
	{
		id: 124,
		name: 'Sally',
		email: 'Sally@gmail.com',
		password: 'bananas',
		entries: 0,
		joined: new Date()
	}
	]
}

app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.send('this is working');
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

app.listen(3000, () => console.log('The server is listening...'));

/*
/ --> res = this is working
/signin => POST json => res = success/fail
/register => POST => add to database --> return new user object
/profile/:userid --> GET  = user of :userid
/image --> PUT --> (just to update user object with one more image search)

*/