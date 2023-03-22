const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 4000;

const configuration = new Configuration({
    organization: "org-55YfEPmI6hLgIro7Nmu1y9YV",
    // Authorization: `Bearer ${process.env.Authorization}`,
    apiKey: "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",
    // apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/api", (req, res) => {
    res.json({
        message: "Hello world",
    });
});

app.post("/convert", async (req, res) => {
    //👇🏻 Destructure the JSON object
    let { value } = req.body;

    //👇🏻 the ChatGPT prompt
    const prompt = `Convert the JSON object into Typescript interfaces \n ${value} Please, I need the only the code, I don't need any explanations.`;

    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
    });
    res.json({
        message: "Successful",
        response: completion.data.choices[0].message.content,
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});