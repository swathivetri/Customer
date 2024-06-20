const Account = require('../models/accountModel');

const createAccount = async (req, res) => {
  try {
    const { email, name, website } = req.body;
    const account = await Account.create({ email, name, website });
    res.status(201).json(account);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAccountById = async (req, res) => {
  try {
    const account = await Account.findById(req.params.id);
    if (!account) return res.status(404).json({ error: 'Account not found' });
    res.json(account);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const changes = await Account.delete(req.params.id);
    if (changes === 0) return res.status(404).json({ error: 'Account not found' });
    res.json({ message: 'Account deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createAccount, getAccountById, deleteAccount };
