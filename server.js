const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.send('Hello');
})

app.listen(3000, () => console.log('The server is listening...'));