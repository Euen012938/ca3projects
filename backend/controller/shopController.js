const db = require('../db');

const sendErrorResponse = (res, error) => {
  console.error('Error:', error);
  res.status(500).json({ error: 'Internal Server Error' });
};



exports.getGifts = async (req, res) => {
  try {
    const giftsQuery = `SELECT * FROM gift`;
    const [rows] = await db.promise().query(giftsQuery);
    res.status(200).json({ gifts: rows });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

exports.getCoins = async (req, res) => {
  try {
    const { username } = req.params;
    const query = 'SELECT coin_balance FROM coin WHERE username = ?';
    const [rows] = await db.promise().query(query, [username]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    const coinBalance = rows[0].coin_balance;
    res.json({ balance: coinBalance });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ... (other imports and code)

exports.redeemGift = async (req, res) => {
  try {
    const { userid, giftname } = req.params;

    // Fetch gift information from the database based on the giftname
    const giftQuery = `SELECT * FROM gift WHERE name = ?`;
    const [giftRows] = await db.promise().query(giftQuery, [giftname]);
    const gift = giftRows[0];

    // Check if the gift exists
    if (!gift) {
      return res.status(400).json({ error: 'Gift not found' });
    }

    // Fetch the user's coin balance from the database based on the userid
    const coinQuery = 'SELECT coin_balance FROM coin WHERE userid = ?';
    const [coinRows] = await db.promise().query(coinQuery, [userid]);
    const coin = coinRows[0];

    // Check if the user has enough coins to redeem the gift
    if (coin.coin_balance < gift.cost) {
      return res.status(400).json({ error: 'Insufficient coins' });
    }

    // Update the user's coin balance after successful redemption
    await db.promise().query(`UPDATE coin SET coin_balance = coin_balance - ? WHERE userid = ?`, [gift.cost, userid]);
    
    // Respond with a success message including the Amazon vouchers link
    const successMessage = 'Gift redeemed successfully! Visit Amazon vouchers page to collect your gift!: https://www.amazon.sg/Amazon-Vouchers-Coupons/b?ie=UTF8&node=8197466051';
    res.json({ message: successMessage });
  } catch (err) {
    // Handle any unexpected errors and respond with an error message
    res.status(500).json({ error: err.message });
  }
};

// ... (other exports)


exports.getQuests = async (req, res) => {
  try {
    const questsQuery = `SELECT * FROM quests`;
    const [rows] = await db.promise().query(questsQuery);
    res.status(200).json({ quests: rows });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

exports.getUsernames = async (req, res) => {
  try {
    const usernamesQuery = `SELECT userid, username, coin_balance FROM coin`;
    const [rows] = await db.promise().query(usernamesQuery);
    const users = rows.map(row => ({
      userid: row.userid,
      username: row.username,
      coin_balance: row.coin_balance
    }));
    res.status(200).json({ users });
  } catch (error) {
    sendErrorResponse(res, error);
  }
};

exports.updateCoins = async (req, res) => {
  try {
    const { username } = req.params;
    const { coin_balance } = req.body;

    const updateQuery = 'UPDATE coin SET coin_balance = ? WHERE username = ?';
    await db.promise().query(updateQuery, [coin_balance, username]);

    res.json({ message: 'Coin balance updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addQuest = async (req, res) => {
  try {
    const { quest, reward } = req.body;

    const insertQuery = 'INSERT INTO quests (quest, reward) VALUES (?, ?)';
    await db.promise().query(insertQuery, [quest, reward]);

    res.json({ message: 'Quest added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.removeQuest = async (req, res) => {
  try {
    const { questId } = req.params;

    const deleteQuery = 'DELETE FROM quests WHERE id = ?';
    await db.promise().query(deleteQuery, [questId]);

    res.json({ message: 'Quest removed successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.removeUser = async (req, res) => {
  try {
    const { username } = req.params;

    const deleteQuery = 'DELETE FROM coin WHERE username = ?';
    await db.promise().query(deleteQuery, [username]);

    res.json({ message: 'User removed successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = exports;