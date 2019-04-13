const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.send('Hello');
})

app.listen(3000, () => console.log('The server is listening...'));

/*
/ --> res = this is working
/signin => POST json => res = success/fail
/register => POST => add to database --> return new user object
/profile/:userid --> GET  = user of :userid
/image --> PUT --> (just to update user object with one more image search)

*/