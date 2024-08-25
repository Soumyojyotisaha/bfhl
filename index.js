const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

app.post('/bfhl', (req, res) => {
    const { data } = req.body;
    const user_id = "your_name_ddmmyyyy";  // Replace with actual data
    const email = "your_email@college.com"; // Replace with actual data
    const roll_number = "your_roll_number"; // Replace with actual data

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

app.listen(PORT, () => {
    console.log('Server running on port ${PORT}');
});