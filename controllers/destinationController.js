const Destination = require('../models/destinationModel');

const createDestination = async (req, res) => {
  try {
    const { accountId, url, httpMethod, headers } = req.body;
    const destination = await Destination.create({ accountId, url, httpMethod, headers });
    res.status(201).json(destination);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getDestinationsByAccountId = async (req, res) => {
  try {
    const destinations = await Destination.findByAccountId(req.params.accountId);
    res.json(destinations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createDestination, getDestinationsByAccountId };
