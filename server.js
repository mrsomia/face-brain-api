const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');
const profileFetcher = require('./controllers/profileFetcher');
const PORT = process.env.PORT || 7878;
const DATABASE_URL = process.env.DATABASE_URL

const db = knex({
	client: 'pg',
	connection: {
		connectionstring: DATABASE_URL,
		ssl: true
	}
  });

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => res.json('This is working'))

app.post('/signin', signin.handleSignin(db, bcrypt));
app.post('/register', register.handleRegister(db, bcrypt));
app.put('/image', image.handler(db));
app.post('/imageurl', (req, res) => image.handleApiCall(req, res));
app.get('/profile/:id', profileFetcher.handler(db));

app.listen(PORT, () => console.log(`The server is listening on port ${PORT}...`));