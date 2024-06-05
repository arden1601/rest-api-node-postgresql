const {Router } = require('express');
const controller = require('./controller.js');

const router = Router();

router.get('/', (req, res) => {
    res.send('Welcome to GRB API Route!');
});

router.get('/get/:table', controller.getDataTable);

module.exports = router;