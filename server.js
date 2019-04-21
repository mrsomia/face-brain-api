const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const updateImageCount = require('./controllers/updateImageCount');
const profileFetcher = require('./controllers/profileFetcher');

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

app.post('/signin', signin.handleSignin(db, bcrypt));
app.post('/register', register.handleRegister(db, bcrypt));
app.put('/image', updateImageCount.handler(db));
app.get('/profile/:id', profileFetcher.handler(db));

app.listen(3000, () => console.log('The server is listening on port 3000...'));