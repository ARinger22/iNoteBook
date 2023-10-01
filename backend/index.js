const {connectToMongo, secret} = require('./db')
const express = require('express')
var cors = require('cors')
connectToMongo();
const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send(req.body);
})

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`at the port ${port}`);
})


