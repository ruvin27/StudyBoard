const express = require("express");
const cors = require('cors');
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 5000;
const OpenAIApi = require('openai');

const openai = new OpenAIApi({ apiKey: process.env.OPENAI_KEY });




// Middleware
app.use(express.json(),cors({
	origin: '*',
	methods: 'GET,POST,PUT,DELETE', 
	optionsSuccessStatus: 204,
  }));



  app.post("/getresponse", async (req, res) => {
    const {prompt} = req.body;
    console.log(prompt)
    const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: `${prompt} - For the user input given, give me suggestions of predictive text in a javascript list format. The input from user is the words at the start of this prompt until "-". The input is from an input field for sending a recommendation to the instructor. The response should be starting with the given user prompt. Limit to 2 response only and keep the response to next 3 tokens long. I strictly need the response in this format: ["text1", "text2", "text3"]. Do not give me any text explanation. I strictly just need the response in the form of an array` }],
    model: "gpt-4",
  });
  res.send(completion.choices)
  console.log(completion.choices[0]);
  });

app.get('/', (req, res) => {
    res.send("Hello Index"); // Corrected response sending
});



app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
