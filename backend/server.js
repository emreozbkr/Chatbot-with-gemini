import { GoogleGenerativeAI } from '@google/generative-ai';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

app.post('/gemini', async (req, res) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const chat = model.startChat({
            history: req.body.history,  
        });

        const result = await chat.sendMessage(req.body.prompt);  
        const response = await result.response;

        const text = await response.text();
        console.log(text);

        res.json({ text });

    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
});

app.listen(8080, () => {
    console.log('Server started at port 8080.');
});