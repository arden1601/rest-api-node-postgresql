const {Router } = require('express');
const controller = require('./controller.js');

const router = Router();

router.get('/', (req, res) => {
    res.send('Welcome to GRB API Route!');
});

router.get('/get/:table', controller.getDataTable);
router.get('/getbyid/:table/:id', controller.getDataTablebyID);
router.post('/addCustomer', controller.addCustomer);
router.post('/addAuthor', controller.addAuthor);
router.post('/addPublisher', controller.addPublisher);
router.post('/addCategory', controller.addCategory);
router.post('/addBooknStock', controller.addBooknStock);
router.put('/updatebyid/:table', controller.updateById);
router.delete('/deleteCustomer/:id', controller.deleteCustomer);

module.exports = router;