const axios = require('axios');
const Account = require('../models/accountModel');
const Destination = require('../models/destinationModel');

const handleIncomingData = async (req, res) => {
  try {
    const appSecretToken = req.header('CL-X-TOKEN');
    if (!appSecretToken) return res.status(401).json({ error: 'Unauthenticated' });

    const account = await Account.findByAppSecretToken(appSecretToken);
    if (!account) return res.status(401).json({ error: 'Unauthenticated' });

    const destinations = await Destination.findByAccountId(account.id);
    const data = req.body;

    for (const dest of destinations) {
    //   console.log('Destination:', dest); // 

      if (!dest.http_method) {
        console.error('Missing http_method in destination:', dest);
        return res.status(400).json({ error: 'Invalid destination configuration' });
      }

      const headers = JSON.parse(dest.headers);
      const method = dest.http_method.toUpperCase();

      if (method === 'GET') {
        const params = new URLSearchParams(data).toString();
        await axios.get(`${dest.url}?${params}`, { headers });
      } else {
        await axios({
          method: method.toLowerCase(),
          url: dest.url,
          data,
          headers,
        });
      }
    }

    res.json({ message: 'Data sent to destinations' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { handleIncomingData };
