const express = require('express');
const Routes = require('./src/routes.js');
const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to GRB API!');
});

app.use('/api/GRB', Routes);

app.listen(PORT, () => {
    console.log(`Server running on port localhost:${PORT}`);
});