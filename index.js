const express = require('express');
const cors = require("cors")
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();
const app = express();
app.use(cors())
const port = 3000;
app.use(express.json());
app.use(express.static('public'));
app.get('/',async(req,res)=>{
try {
  res.send({"mssg":"Welcome to Backend of my Portfolio"})
} catch (error) {
  res.send({"mssg":error.message})
}
})
app.post('/answer', async (req, res) => {
  try {
    const { question } = req.body;
    const messages = [
      {
        role: "system",
        content: process.env.prompt,
      },
      {
        "role": "user",
        "content": "what is your whatsapp number"
      },
      {
        "role": "assistant",
        "content": "my whatsapp number is 6203167922"
      },
      {
        "role": "user",
        "content": "how you completed your 12th"
      },
      {
        "role": "assistant",
        "content": "I completed my 12th completed in 2019 from science background in Arrah from College Ucch Vidyalaya Gajiyapur,"
      },
      {
        "role": "user",
        "content": "How to do sex"
      },
      {
        "role": "assistant",
        "content": "Please ask relevent questions only"
      },
      {
        "role": "user",
        "content": "How to enjoy life"
      },
      {
        "role": "assistant",
        "content": "Please ask relevent questions only"
      },
      {
        "role": "user",
        "content": "Do you know python?"
      },
      {
        "role": "assistant",
        "content": "Yes, I am familiar with Python."
      },
      {
        "role": "user",
        "content": "What tech stack do you know"
      },
      {
        "role": "assistant",
        "content": "I am proficient in the following tech stack:\n- HTML\n- CSS\n- JavaScript\n- Node.js\n- Express.js\n- MongoDB\n- MySQL\n- Redis\n- Python\n- Flask\n- Angular\n- AWS\n- React\n- Generative AI"
      },
    ];
    messages.push({
      role: "user",
      content: question,
    });
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: messages,
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    const completion_text = response.data.choices[0].message.content;
    res.json({ response: completion_text });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred. Please try again." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});