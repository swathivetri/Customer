const express = require('express');
const { createAccount, getAccountById, deleteAccount } = require('../controllers/accountController');
const { createDestination, getDestinationsByAccountId } = require('../controllers/destinationController');
const { handleIncomingData } = require('../controllers/dataHandlerController');

const router = express.Router();


router.post('/accounts', createAccount);
router.get('/accounts/:id', getAccountById);
router.delete('/accounts/:id', deleteAccount);


router.post('/destinations', createDestination);
router.get('/accounts/:accountId/destinations', getDestinationsByAccountId);


router.post('/server/incoming_data', handleIncomingData);

module.exports = router;
