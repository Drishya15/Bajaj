const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Hardcoded user details
const user = {
  full_name: "Drishya Krishnakumar",
  dob: "15.01.2005",
  email: "drishya.k2022@vitstudent.ac.in",
  roll_number: "22BEC0471"
};

app.post('/bfhl', (req, res) => {
  try {
    const inputData = req.body.data;

    if (!Array.isArray(inputData)) {
      return res.status(400).json({ is_success: false, message: "Invalid input" });
    }

    let even = [], odd = [], alphabets = [], specials = [];
    let sum = 0;
    let concatChars = [];

    inputData.forEach(item => {
      if (/^\d+$/.test(item)) {
        const num = parseInt(item);
        if (num % 2 === 0) {
          even.push(item);
        } else {
          odd.push(item);
        }
        sum += num;
      } else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
        concatChars.push(item);
      } else {
        specials.push(item);
      }
    });

    // Create alternating caps reverse string
    let rawStr = concatChars.join('');
    let revStr = rawStr.split('').reverse();
    let formatted = revStr.map((ch, i) =>
      i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()
    ).join('');

    res.status(200).json({
      is_success: true,
      user_id: `${user.full_name.toLowerCase()}_${user.dob}`,
      email: user.email,
      roll_number: user.roll_number,
      odd_numbers: odd,
      even_numbers: even,
      alphabets: alphabets,
      special_characters: specials,
      sum: sum.toString(),
      concat_string: formatted
    });

  } catch (err) {
    res.status(500).json({ is_success: false, message: "Server error", error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
