const { v4: uuidv4 } = require('uuid');
const db = require('../utils/db');

const Account = {
  create: ({ email, name, website }) => {
    return new Promise((resolve, reject) => {
      const accountId = uuidv4();
      const appSecretToken = uuidv4();
      db.run(
        `INSERT INTO accounts (email, account_id, name, app_secret_token, website) VALUES (?, ?, ?, ?, ?)`,
        [email, accountId, name, appSecretToken, website],
        function (err) {
          if (err) return reject(err);
          resolve({ id: this.lastID, email, accountId, name, appSecretToken, website });
        }
      );
    });
  },

  findById: (id) => {
    return new Promise((resolve, reject) => {
      db.get(`SELECT * FROM accounts WHERE id = ?`, [id], (err, row) => {
        if (err) return reject(err);
        resolve(row);
      });
    });
  },

  findByAccountId: (accountId) => {
    return new Promise((resolve, reject) => {
      db.get(`SELECT * FROM accounts WHERE account_id = ?`, [accountId], (err, row) => {
        if (err) return reject(err);
        resolve(row);
      });
    });
  },

  findByAppSecretToken: (token) => {
    return new Promise((resolve, reject) => {
      db.get(`SELECT * FROM accounts WHERE app_secret_token = ?`, [token], (err, row) => {
        if (err) return reject(err);
        resolve(row);
      });
    });
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.run(`DELETE FROM accounts WHERE id = ?`, [id], function (err) {
        if (err) return reject(err);
        resolve(this.changes);
      });
    });
  },
};

module.exports = Account;
