const db = require('../utils/db');

const Destination = {
  create: ({ accountId, url, httpMethod, headers }) => {
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO destinations (account_id, url, http_method, headers) VALUES (?, ?, ?, ?)`,
        [accountId, url, httpMethod, JSON.stringify(headers)],
        function (err) {
          if (err) return reject(err);
          resolve({ id: this.lastID, accountId, url, httpMethod, headers });
        }
      );
    });
  },

  findByAccountId: (accountId) => {
    return new Promise((resolve, reject) => {
      db.all(`SELECT * FROM destinations WHERE account_id = ?`, [accountId], (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  },

  deleteByAccountId: (accountId) => {
    return new Promise((resolve, reject) => {
      db.run(`DELETE FROM destinations WHERE account_id = ?`, [accountId], function (err) {
        if (err) return reject(err);
        resolve(this.changes);
      });
    });
  },
};

module.exports = Destination;
