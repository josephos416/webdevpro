import express, { Request, Response } from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/api/song', async (req: Request, res: Response) => {
    const songTitle: string | undefined = req.query.q as string;
    const url: string = `https://api.genius.com/search?q=${encodeURIComponent(songTitle)}`;
    const options = {
        method: 'GET',
        headers: {
            'Authorization': 'jqOJykeJmNc9mv1Dl-anjaYGUyZ0QX4fyPEDu7uvdn-3iozD6e74XVhkwV-2HPNXYu_UXAsB4rzcd20IYUI5Lg'
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Fetch error: ', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
