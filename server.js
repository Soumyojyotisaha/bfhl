const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const router = express.Router();

router.get('/bfhl', (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

router.post('/bfhl', (req, res) => {
  const { data } = req.body;
  const user_id = "Harsh_Vardhan_12102002";  
  const email = "harshvardhan.shukla2021@vitstudent.ac.in"; 
  const roll_number = "21BCE2236";

  if (!Array.isArray(data)) {
    return res.status(400).json({ is_success: false, message: "Invalid data format" });
  }

  const numbers = data.filter(item => !isNaN(item));
  const alphabets = data.filter(item => isNaN(item));
  const lowerCaseAlphabets = alphabets.filter(char => char >= 'a' && char <= 'z');
  const highest_lowercase_alphabet = lowerCaseAlphabets.length > 0 ? [lowerCaseAlphabets.sort().reverse()[0]] : [];

  res.status(200).json({
    is_success: true,
    user_id,
    email,
    roll_number,
    numbers,
    alphabets,
    highest_lowercase_alphabet
  });
});

app.use('/.netlify/functions/server', router);

module.exports = app;
module.exports.handler = serverless(app);